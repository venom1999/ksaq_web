package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.tool.Crypt;
import com.kuangshan.riskcontrol.tool.DBOperator;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleInfo;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
public class RoleService {
    public Map[] getRoleList(String conditions, int index,String username,String institution) throws SQLException {
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
        String sqlQuery="select *,row_number() over(order by RoleID ) rn  from  RoleInfo_t where " + condition;
        String orderby= "order by RoleID";
        DBOperator dbOperator=new DBOperator("");
        return dbOperator.getQueryResult(sqlQuery,index,10,orderby);
        //DBOperator dbOperator = new DBOperator("select *,row_number() over(order by RoleID ) rn  from  RoleInfo_t " + conditions);
        //return dbOperator.getListByPage(index);
    }

    public int getRoleListPageNum(String conditions,String username,String institution) {
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
        String sqlQuery="select *,row_number() over(order by RoleID ) rn  from  RoleInfo_t where " + condition;
        DBOperator dbOperator = new DBOperator(sqlQuery);
        return dbOperator.getListPageNum();
    }

    public Map[] getInstitutionExceptClass()
    {
        String sql = "select institutionNum,institutionName  from institution_t where institutionCategoryNum <= '4 '  and IsDelete = '否' order by institutionCategoryNum";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    public Map[] getAllModuleList(String modulenum)
    {
        String sql = "select *  from moduleinfo_t where ModuleNum in ("+modulenum+") order by ModuleNum";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    public Map[] getSecondModuleList(String InstitutionNum)
    {
        DBOperator db=new DBOperator("select * from ModuleManagement_V where InstitutionNum ='" + InstitutionNum + "'order by ModuleNum ");
        return db.executeQuery();
    }

    public Boolean insertRole(String rolename,String rolememo,String roleright,String roleinstitution,String roleposition)
    {
        DBOperator db=new DBOperator("insert into RoleInfo_T(RoleName,RoleMemo,RoleRight,RoleInstitution,RolePosition) values ('" + rolename + "','" + rolememo + "','" +roleright + "','" + roleinstitution+ "','"+roleposition+"')");
        return db.executeUpdate()>0;
    }

    //根据角色id 查找RoleUserInfo_t,判断是否能删    true，表示没有记录，能删，false，表示有记录不能删
    public Boolean canDeleteRole(String roleIDlist)
    {
        String sql = "select * from RoleUserInfo_T where RoleID in (" + roleIDlist + ")";
        DBOperator db=new DBOperator(sql);
        System.out.println(sql);
        if(db.executeQuery().length>0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    //删除一个角色信息
    public Boolean deleteRole(String roleIDlist)
    {
        String sql = "delete from RoleInfo_T where RoleID in (" + roleIDlist + ")";
        DBOperator db=new DBOperator(sql);
        System.out.println(sql);
        return db.executeUpdate()>0;
    }

    // 根据角色id获得角色信息 from RoleInfo_T
    public Map[] getRoleInfoByID(String roleID)
    {
        String sql = "select * from RoleInfo_T where RoleID='" + roleID + "'";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    //模块收回权限操作
    public Map[] getApproveReturnByRole(String institution, String decrease,String roleID) throws  Exception
    {
        String approveDelete = decrease;

        String[] str = decrease.split(";");
        approveDelete = approveDelete.replace("-2", "-1");
        String[] approveDeleteArray = approveDelete.split(";");
        String sql = "select EmployeeNum,UserRight from userinfo_view where RoleInstitution = '" + institution + "' and RoleID = '"+roleID+"'";
        DBOperator db=new DBOperator(sql);
        Crypt crypt=new Crypt();
        Map[] userinfo=db.executeQuery();
        if (!approveDelete.equals(""))//减少的功能，收回本模块的权限
        {
            for (int i = 0; i <userinfo.length; i++)
            {
                String user = userinfo[i].get("EmployeeNum").toString();
                String right = userinfo[i].get("UserRight").toString();
                if (!right.trim().equals(""))
                {
                    right = crypt.DESDecrypt(right.trim(), "shirleyL");
                }
                for (int j=0; j < approveDeleteArray.length; j++)
                {
                    if (right.contains(approveDeleteArray[j].substring(0,6)))
                    {
                        String tempRight = "";
                        if (right.contains(approveDeleteArray[j].substring(0, 6) + "-1"))
                        {
                            tempRight = approveDeleteArray[j].substring(0, 6) + "-1";
                        }
                        else if(right.contains(approveDeleteArray[j].substring(0, 6) + "-0"))
                        {
                            tempRight = approveDeleteArray[j].substring(0, 6) + "-0";
                        }
                        right = right.replace(tempRight, "");
                    }
                }
                while (right.contains(";;"))
                {
                    right = right.replace(";;", ";");
                }
                if (!right.trim().equals(""))
                {
                    right = right.substring(0, 1).equals(";") ? right.substring(1, right.length()) : right.trim();
                }
                if (!right.trim().equals(""))
                {
                    right = right.substring(right.length() - 1, right.length()).equals(";") ? right.substring(0,right.length() - 1).trim() : right.trim();
                }


                if (!right.equals(""))
                {
                    right = crypt.DESEncrypt(right, "shirleyL");
                }
                userinfo[i].put("UserRight",right.trim());
                //dt.Rows[i]["UserRight"] = right.Trim();

            }
        }

        return userinfo;
    }

    //根据UserNum获得该用户已属于的角色列表 from RoleUserInfo_T
    public Map[] getRoleUserList(String userNum)
    {
        String sql = "select * from RoleUserInfo_T where EmployeeNum='"+userNum+"'";
        DBOperator db=new DBOperator(sql);
        return db.executeQuery();
    }

    //获取本机构除给定角色外的已经授权的模块
    public String getExceptRoleModuleNum(String institution, String roleID) throws  Exception
    {
        Crypt crypt=new Crypt();
        String getmoudule = "";
        String sql = "select EmployeeNum,UserRight from userinfo_view where RoleInstitution = '" + institution + "' and RoleID <> '" + roleID + "'";
        DBOperator db=new DBOperator(sql);
        Map[] dt=db.executeQuery();
        for (int i = 0; i < dt.length; i++)
        {

            String right = dt[i].get("UserRight").toString();
            if (right.trim() != "")
            {
                right = crypt.DESDecrypt(right.trim(), "shirleyL");
            }
            if (right.trim() != "")
            {
                String[] rightArray = right.split(";");
                for (int j = 0; j < rightArray.length;j++)
                {
                    if (rightArray[j].contains("-1"))
                    {
                        getmoudule += rightArray[j].substring(0, 6);
                        if (j < rightArray.length - 1)
                        {
                            getmoudule += ";";
                        }
                    }
                }
            }
        }
        return getmoudule;
    }

}
