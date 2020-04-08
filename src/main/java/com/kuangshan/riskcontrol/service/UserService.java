package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.tool.Crypt;
import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.DBo;
import com.kuangshan.riskcontrol.tool.SHA1;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    public Map[] getUserList(String conditions, int index, String username, String institution) throws SQLException {
        String condition="";
        if(username.equals("admin"))
        {
            condition += "  RolePosition like '%领导%'";
        }
        else if(username.equals("kuang"))
        {
            condition += "  RolePosition like '%'";
        }
        else
        {
            condition += "  RolePosition not like '%领导%' and RoleInstitution = '" + institution + "'";
        }
        if(!conditions.equals(""))
        {
            condition=condition+" and "+conditions;
        }
        String sqlQuery="select *,row_number()  over(order by EmployeeNum ) rn from  (select distinct EmployeeNum,EmployeeID,EmployeeName,UserState,LastModifyPsdTime,RegisterTime,LoginTimes,LastLoginTime,LoginTime from (select *,row_number()  over(order by EmployeeNum ) rn from UserInfo_view where " + condition + ")as t)as UserInfo";
        String orderby= "order by EmployeeNum";
        DBOperator dbOperator=new DBOperator("");
        return dbOperator.getQueryResult(sqlQuery,index,10,orderby);
    }

    public int getUserListPageNum(String conditions,String username,String institution) {
        String condition="";
        if(username.equals("admin"))
        {
            condition += "  RolePosition like '%领导%'";
        }
        else if(username.equals("kuang"))
        {
            condition += "  RolePosition like '%'";
        }
        else
        {
            condition += " RolePosition not like '%领导%' and RoleInstitution = '" + institution + "'";
        }
        if(!conditions.equals(""))
        {
            condition=condition+" and "+conditions;
        }
        String sqlQuery="select *,row_number()  over(order by EmployeeNum ) rn from  (select distinct EmployeeNum,EmployeeID,EmployeeName,UserState,LastModifyPsdTime,RegisterTime,LoginTimes,LastLoginTime,LoginTime from (select *,row_number()  over(order by EmployeeNum ) rn from UserInfo_view where " + condition + ")as t)as UserInfo";
        DBOperator dbOperator = new DBOperator(sqlQuery);
        return dbOperator.getListPageNum();
    }

    // 通过机构获取公司、承包商所有员工的信息--带搜索的下拉框
    public Map[] getAllComConEmployeeInfoByIns(String InstitutionNum)
    {
        String sql = "select RTRIM(EmployeeName)+ '-' + RTRIM(EmployeeID) mytext,EmployeeNum  from employee_t e inner join institution_t a on (a.InstitutionNum like '" + InstitutionNum + "' or a.InstitutionPrefix like '" + InstitutionNum + "') and a.InstitutionNum=e.InstitutionNum and OutCompanyOrNot<>'1' union select RTRIM(EmployeeName) + '-' + RTRIM(EmployeeID) mytext,EmployeeNum from ContractorEmployee_t where InstitutionNum like '" + InstitutionNum + "' and OutCompanyOrNot <> '1' order by EmployeeNum";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    /// 获取公司、承包商所有员工的信息--带搜索的下拉框
    public Map[] getAllComConEmployeeInfo()
    {
        String sql = "select RTRIM(EmployeeName)+ '-' + RTRIM(EmployeeID) mytext,EmployeeNum  from employee_t where OutCompanyOrNot<>'1' union select RTRIM(EmployeeName) + '-' + RTRIM(EmployeeID) mytext,EmployeeNum from ContractorEmployee_t where OutCompanyOrNot <> '1' order by EmployeeNum";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    //根据UserNum查找公司和承包商Employee表，得到所在机构
    public String getComConEmployeeInstitution(String employeeNum) throws Exception
    {
        DBo dbo =new DBo();
        String sql = "select * from Employee_t where EmployeeNum='" + employeeNum + "'";
   /*     DBOperator db=new DBOperator(sql);
        Map[] list=db.executeQuery();*/
        List<Map<String,Object>> list=dbo.executeQuery(sql);
        String institution = "";
        if (list.size() > 0)      //如果是公司员工
        {
            institution = list.get(0).get("InstitutionNum").toString();
        }
        else
        {
            sql = "select * from ContractorEmployee_t where EmployeeNum='" + employeeNum + "'";      //如果是承包商员工
            list=dbo.executeQuery(sql);
            if (list.size() > 0)
            {
                institution =  list.get(0).get("InstitutionNum").toString();
            }
            else
            {
                sql = "select * from SinosteelEmp_T where SinosteelEmpNum='" + employeeNum + "'";
                list=dbo.executeQuery(sql);
                if (list.size() > 0)
                {
                    institution = list.get(0).get("InstitutionNum").toString();
                }
            }
        }
        return institution;
    }

    //获得所有角色列表 from RoleInfo_T
    public Map[] getRoleList(String roleInstitution ,String userName) throws Exception
    {
        String sql = "";
        if (userName.equals("admin"))
        {
            if (!roleInstitution.equals(""))
            {
                sql = "select * from RoleInfo_T where RoleInstitution='" + roleInstitution + "' and RolePosition  like '%领导%'  ";
            }
            else
            {
                sql = "select * from RoleInfo_T where RolePosition  like '%领导%' ";
            }
        }
        else if(userName == "kuang")
        {
            if (!roleInstitution.equals(""))
            {
                sql = "select * from RoleInfo_T where RoleInstitution='" + roleInstitution + "' and RolePosition  like '%'  ";
            }
            else
            {
                sql = "select * from RoleInfo_T RolePosition  like '%' ";
            }
        }
        else
        {
            if (!roleInstitution.equals(""))
            {
                DBo dbo =new DBo();
                List<Map<String ,Object>> list = dbo.executeQuery("select * from institution_t where InstitutionNum='"+roleInstitution+"' and InstitutionPrefix is not null");
                if(list.size()>0)
                {
                    roleInstitution=list.get(0).get("InstitutionPrefix").toString();
                }

                sql = "select * from RoleInfo_T where RoleInstitution='" + roleInstitution + "' and RolePosition not like '%领导%'  ";
            }
            else
            {
                sql = "select * from RoleInfo_T RolePosition  like '%领导%' ";
            }
        }
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    //根据角色id获得角色所在机构信息
    public String getRoleInstitution(String roleID)
    {
        String sql = "select * from RoleInfo_T where RoleID='" + roleID + "'";
        DBOperator db=new DBOperator(sql);
        Map[] list=db.executeQuery();
        if (list.length >= 0)
            return list[0].get("RoleInstitution").toString();
        else
            return "";
    }

    // 通过视图查询公司员工详细信息
    public Map[] getEmployeeDetailByView(String num)
    {
        String sql = "select * from employee_institution_datadictionaryView where employeeNum='" + num + "' union select * from Contractor_employee_institution_datadictionaryView where employeeNum='" + num + "'";
        DBOperator db=new DBOperator("");
        return db.getTableByOneProc("commonQueryProc", sql);
    }

     //判断能否进行那个插入操作,如果有用户，则进行操作，如果没有用户，则不进行操作
    public Boolean CanInsert(String userNum)
    {
        String sql = "select * from UserInfo_T where EmployeeNum='" + userNum + "'";
        DBOperator db=new DBOperator(sql);
        Map[] list=db.executeQuery();
        if (list.length > 0)
            return false;
        else
            return true;
    }

    // 插入一条用户角色记录到RoleUserInfo_t中
    public Boolean insertRoleUser(String employeeNum,String roleID)
    {
        String sql = "insert into RoleUserInfo_t(RoleID,EmployeeNum)values(" + roleID + ",'" + employeeNum + "')";
        DBOperator db = new DBOperator(sql);
        return db.executeUpdate()>0;
    }

    //插入一条用户记录到UserInfo_t中
    public Boolean insertUser(String EmployeeNum, String Userstate, String Password, String LastModifyPsdTime,String RegisterTime,int LoginTimes,String EmployeeName,String UserRight)
    {
        String sql = "insert into UserInfo_t(EmployeeNum,Userstate,Password,LastModifyPsdTime,RegisterTime,LoginTimes,EmployeeName,UserRight)values('";
        sql += EmployeeNum + "','";
        sql += Userstate + "','";
        sql += Password + "','";
        sql += LastModifyPsdTime + "','";
        sql += RegisterTime + "',";
        sql += LoginTimes + ",'";
        sql += EmployeeName + "','";
        sql += UserRight + "')";
        DBOperator db=new DBOperator(sql);
        return db.executeUpdate()>0;
    }

    //获取用户写权限
    public String getWriteRight(String employeeNum) throws Exception
    {
        String userRight = "";
        String rightApprove = "";
        Crypt crypt=new Crypt();
        String sql = "select UserRight from UserInfo_T where EmployeeNum='" + employeeNum + "'";
        DBOperator db=new DBOperator(sql);
        Map[] dt = db.executeQuery();
        if (!dt[0].get("UserRight").toString().trim().equals(""))
            userRight = crypt.DESDecrypt(dt[0].get("UserRight").toString(), "shirleyL");

        if(userRight.trim()!="")
        {
            String[] str=userRight.split(";");
            for (int i = 0; i < str.length; i++)
            {
                if (str[i].contains("-1"))
                {
                    rightApprove += str[i] + ";";
                }
            }
            if(rightApprove!="")
            {
                rightApprove = rightApprove.substring(0,rightApprove.length()-1);
            }
        }
        return rightApprove;
    }

    //根据employeeID获取EmployeeNum
    public Map[] getEmployeeNum(String employeeID)
    {
        String sql = "select employeeNum from employee_t where EmployeeID='"+employeeID+"' union select employeeNum from ContractorEmployee_t where EmployeeID='"+employeeID+"'";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    //根据UserNum获得该用户信息 from UserInfo_T
    public Map[] getUserInfo(String userNum)
    {
        String sql = "select * from UserInfo_T  inner join employee_t on UserInfo_T.EmployeeNum='"+userNum+"' and UserInfo_T.EmployeeNum=employee_t.EmployeeNum union select * from UserInfo_T inner join ContractorEmployee_t on  UserInfo_T.EmployeeNum='"+userNum+"'  and UserInfo_T.EmployeeNum=ContractorEmployee_t.EmployeeNum";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    //根据EmployeeNum获得所有已选的角色列表 from RoleInfo_T & RoleUserInfo_T
    public Map[] getSelectRoleList(String userid)
    {
        String sql = "select * from RoleInfo_T, RoleUserInfo_T where RoleInfo_T.RoleID=RoleUserInfo_T.RoleID and RoleUserInfo_T.EmployeeNum='" + userid + "'";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    public List<Map<String,Object>> getRoleList(String userid) throws Exception
    {
        DBo dbo =new DBo();
        String sql = "select * from RoleInfo_T, RoleUserInfo_T where RoleInfo_T.RoleID=RoleUserInfo_T.RoleID and RoleUserInfo_T.EmployeeNum='" + userid + "'";
        //DBOperator db=new DBOperator(sql);
        return dbo.executeQuery(sql);
    }

     // 获取机构可操作的模块
    public Map[] getCandoModule(String institution)
    {
        String sql = "select * from ModuleInstitution_T where InstitutionNum = '"+institution+"'";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }


    ///
    public Map[] getModuleInstitution(String institutionNum)
    {
        String sql = "select * from ModuleInstitution_t where InstitutionNum = '" + institutionNum + "'";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    public List<Map<String,Object>> getInstitutionSelectedModulelist(String institutionNum) throws Exception
    {
        DBo dbo =new DBo();
        return dbo.executeQuery("select * from ModuleInstitution_t where InstitutionNum = '" + institutionNum + "'");
    }

    //根据UserNum更新UserState from UserInfo_T
    public Boolean updateUser(String UserState,String UserRight,String EmployeeNum)
    {
        String sql = "update  UserInfo_T set UserState='"+UserState+"',UserRight='" + UserRight + "' where EmployeeNum='" + EmployeeNum + "'";
        DBOperator db=new DBOperator(sql);
        return db.executeUpdate()>0;
    }

    //根据EmployeeNum删除该用户已经选取的角色记录   RoleUserInfo_t中
    public Boolean deleteRoleUser(String employeeNum)
    {
        String sql = "delete from RoleUserInfo_T where EmployeeNum='"+employeeNum+"'";
        DBOperator db=new DBOperator(sql);
        return db.executeUpdate()>0;
    }

    //根据UserNum重置密码 from UserInfo_T
    public Boolean setPWD(String EmployeeNum) throws Exception
    {
//        Crypt crypt=new Crypt();
//        String Password = crypt.DESEncrypt("111111","shirleyL");
        String Password = SHA1.encode("Aa111111");
        String sql = "update  UserInfo_T set Password='" + Password  + "' where EmployeeNum='" + EmployeeNum + "'";
        DBOperator db=new DBOperator(sql);
        return db.executeUpdate()>0;
    }
}
