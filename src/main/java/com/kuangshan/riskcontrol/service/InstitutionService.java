package com.kuangshan.riskcontrol.service;

import java.sql.SQLException;
import java.util.Date;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;

 
import javax.crypto.*;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
 
import java.security.Key;
import java.security.spec.AlgorithmParameterSpec;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import com.kuangshan.riskcontrol.dao.InstitutionTMapper;
import com.kuangshan.riskcontrol.dao.ModuleinfoTMapper;
import com.kuangshan.riskcontrol.model.InstitutionT;
import com.kuangshan.riskcontrol.model.ModuleinfoT;
import com.kuangshan.riskcontrol.tool.*;

@Service
public class InstitutionService {
	@Resource
	private InstitutionTMapper Im;
	@Resource
	private ModuleinfoTMapper Mm;

    public Map[] getAll(String conditions,int index) throws SQLException {
        String sqlQuery="select row_number() over(order by InstitutionNum) rn,* from AllInstitution_View";
       // String sqlQuery="select row_number() over(order by i.InstitutionNum) rn, i.InstitutionNum,i.InstitutionName,c.EmployeeName as PeopleInCharge,d.EmployeeName as SecurityOfficer,(case i.Category when 1 then '公司' when 2 then '承包商' end)Category,DDItemValue as InstitutionCategory,convert(varchar(19),EstablishTime,20)EstablishTime,convert(varchar(19),DeleteTime,20)DeleteTime,i.IsDelete from institution_t as i left join datadictionary_t on InstitutionCategoryNum = DDItemID left join ComConEmployee_View as c on c.EmployeeNum = PeopleInCharge  left join ComConEmployee_View as d on d.EmployeeNum=SecurityOfficer";
        String orderby= "order by InstitutionNum";
        if(!conditions.equals(""))
        {
            sqlQuery+=" where "+conditions;
        }
        DBOperator dbOperator=new DBOperator("");
        return dbOperator.getQueryResult(sqlQuery,index,10,orderby);
    }

    public int getInstitutionListPageNum(String conditions) {
        String sqlQuery="select * from institution_t ";
        if(!conditions.equals(""))
        {
            sqlQuery+=" where "+conditions;
        }
        DBOperator dbOperator = new DBOperator(sqlQuery);
        return dbOperator.getListPageNum();
    }

/*    public Map[] getInstitutionList(String conditions, int index) {
        DBOperator dbOperator = new DBOperator("select row_number() over (order by EstablishTime desc) as rn,* from allinstitutionInfo_V " + conditions);
        return dbOperator.getListByPage(index);
    }

    public int getInstitutionListPageNum(String conditions) {
        DBOperator dbOperator = new DBOperator("select row_number() over (order by EstablishTime desc) as rn,* from allinstitutionInfo_V " + conditions);
        return dbOperator.getListPageNum();
    }*/

    public Map[] getPeopleInChargeList(){
        DBOperator dbOperator=new DBOperator("select * from EmployeeInfo_V");
        return dbOperator.executeQuery();
    }

    public Map[] getPeopleInChargeListbyInstitutionNum(String InstitutionNum)
    {
        DBOperator dbOperator=new DBOperator("select * from EmployeeInfo_V where InstitutionNum = '"+InstitutionNum+"' ");
        return dbOperator.executeQuery();
    }

    public Map[] getInstitutionCategoryList(){
        DBOperator dbOperator=new DBOperator("select * from datadictionary_t where DDCategoryNum = 'InstitutionCategoryNum' and IsDelete = '否'");
        return dbOperator.executeQuery();
    }

    public Map[] getInstitutionName(String InstitutionNum){
        DBOperator dbOperator=new DBOperator("select InstitutionName from institution_t where InstitutionNum = '"+InstitutionNum+"'");
        return dbOperator.executeQuery();
    }

/*	public List<InstitutionT> getInstitutionList(String conditions,int index){
		return Im.selectAllByPage(conditions, (index-1)*10, 10);
	}*/

	/*public List<InstitutionT> getPeopleInChargeList(){
		return Im.selectByPeopleInCharge(null);
	}*/
	public List<InstitutionT> getInstitutionPrefixList(String category){
		return Im.selectByCategory(category);
	}
	/*public List<InstitutionT> getInstitutionCategoryList(){
		return Im.selectByInstitutionCategory(null);
	}*/
	public InstitutionT getInfoList(String InstitutionNum){
		return Im.selectByInfo(InstitutionNum);
	}
	public List<Map<String,Object>> getInstitutionExceptClassList() throws  Exception {
	    DBo dbo = new DBo();
	    String sql="select institutionNum,institutionName  from institution_t where institutionCategoryNum <= '4 '  and IsDelete = '否' order by institutionCategoryNum";
		return dbo.executeQuery(sql);
	}
    public List<Map<String,Object>> getAssignedInstitution() throws  Exception {
        DBo dbo = new DBo();
        String sql="select * from InstitutionToChecktable_T";
        return dbo.executeQuery(sql);
    }


    public List<Map<String,Object>> getAllModule() throws  Exception {
        DBo dbo = new DBo();
        String sql="select * from moduleinfo_t order by ModuleNum";
        return dbo.executeQuery(sql);
    }

    public List<Map<String,Object>> getFirstModule() throws  Exception {
        DBo dbo = new DBo();
        String sql="select * from ModuleInfo_T where ModuleNum like '%0000' order by ModuleNum";
        return dbo.executeQuery(sql);
    }

    public List<Map<String,Object>> getSecondModule() throws  Exception {
        DBo dbo = new DBo();
        String sql="select * from moduleinfo_t where ModuleNum not like '%0000' order by ModuleNum";
        return dbo.executeQuery(sql);
    }

/*	public int getInstitutionPageNum(String conditions){
		int count=Im.selectAllNum(conditions);
		return count % 10 == 0 ? count / 10 : count / 10 + 1;
	}*/
	
	public Boolean insert(InstitutionT record) {
		return Im.insertSelective(record)>0;
	}
	public Boolean update(InstitutionT record) {
		return Im.updateByPrimaryKeySelective(record)>0;
	}

	public List<InstitutionT> isRoleExist(String InstitutionNum)
	{
		return Im.checkIsRoleExist(InstitutionNum);
	}
	
	public Boolean deleteByNum(String InstitutionNum,Date deletetime)
	{
		return Im.deleteInstitutionByNum(InstitutionNum,deletetime)>0;
	}
	
/*	public List<ModuleinfoT> getAllModule()
	{
		return Mm.selectAllModule();
	}*/

/*	public List<ModuleinfoT> getFirstModule()
	{
		return Mm.selectFirstModule();
	}*/
	
/*	public List<ModuleinfoT> getSecondModule()
	{
		return Mm.selectSecondModule();
	}*/
	
	public Map[] getApproveReturn(String institution, String approveChange,String decrease) throws Exception
    {
		Crypt crypt=new Crypt();
        String approveDelete=decrease;
        String[] approveChangeArray = approveChange.replace("-0","-1").split(";");
        String[] str=decrease.split(";");
     
        approveDelete = approveDelete.replace("-2","-1");
        String[] approveDeleteArray = approveDelete.split(";");
        DBOperator db = new DBOperator("select EmployeeNum,UserRight from userinfo_view where RoleInstitution = '" + institution + "'");
		Map[] list = db.executeQuery();
		if(!approveDelete.equals(""))//减少的功能，收回本模块的权限
		{
			for(int i = 0; i < list.length; i++)
			{
				String user=list[i].get("EmployeeNum").toString();
				String right=list[i].get("UserRight").toString();
				if (!right.trim().equals(""))
                {
                    right = crypt.DESDecrypt(right.trim(), "shirleyL");
                }
				for (int j=0; j < approveDeleteArray.length; j++)
                {
                    System.out.println("test:"+approveDeleteArray[j].toString());
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
                    right = right.substring(right.length() - 1,right.length()).equals(";") ? right.substring(0,right.length() - 1).trim() : right.trim();
                }
                if (!right.equals(""))
                {
                    right = crypt.DESEncrypt(right, "shirleyL");
                }
                list[i].put("UserRight", right.trim());
			}
		}
		if (!approveChange.equals(""))//模块由可以增删改，变为不能增删改，收回用户的权限
		{
			for (int i = 0 ; i < approveChangeArray.length; i++)
            {
				for(int j = 0; j < list.length; j++)
				{
					String user=list[j].get("EmployeeNum").toString();
					String right=list[j].get("UserRight").toString();
					if (!right.equals(""))
                    {
                        right = crypt.DESDecrypt(right, "shirleyL");
                    }
                 
                    if (right.contains(approveChangeArray[i]))
                    {
                        right = right.replace(approveChangeArray[i],approveChangeArray[i].substring(0,6)+ "-0");
                        right = crypt.DESEncrypt(right, "shirleyL");
                        list[j].put("UserRight", right);
                        break;
                    }
				}
            }
		}
        for(int i=0;i<list.length;i++)
        {
        	if(list[i].get("UserRight").toString().contains(";"))
        	{
        		list[i].put("UserRight", list[i].get("UserRight").toString().replace(";", ""));
        	}
        	
        }
        return list;
    }
	
	public Map[] getRoleReturn(String institution,  String decrease) throws Exception
    {
		Crypt crypt=new Crypt();
        String approveDelete = decrease;
        approveDelete = approveDelete.replace("-2", "-0");
        approveDelete = approveDelete.replace("-1", "-0");
        String[] approveDeleteArray = approveDelete.split(";");
        DBOperator db = new DBOperator("select RoleID,RoleRight from roleinfo_t where RoleInstitution = '" + institution + "'");
		Map[] list = db.executeQuery();
        if (!approveDelete.equals(""))//鍑忓皯鐨勫姛鑳斤紝鏀跺洖鏈ā鍧楃殑鏉冮檺
        {
            for (int i = 0 ; i <  list.length; i++)
            {
                String roleid = list[i].get("RoleID").toString();
                String right = list[i].get("RoleRight").toString();
                if (!right.trim().equals(""))
                {
                    right = crypt.DESDecrypt(right.trim(), "shirleyL");
                }
                else
                    continue;
                for (int j = 0; j < approveDeleteArray.length; j++)
                { 

                    if (right.contains(approveDeleteArray[j].substring(0,6)))
                    {
                        String modulenum =approveDeleteArray[j].substring(0,6);
                        if(modulenum.equals("090100")||modulenum.equals("090300")||modulenum.equals("090400")||modulenum.equals("090500"))
                        {
                            right = right.replace(modulenum+"-1", "");
                        }
                        else {
                            right = right.replace(approveDeleteArray[j], "");
                        }

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
                    right = crypt.DESEncrypt(right, "shirleyL");
                }
                list[i].put("RoleRight", right.trim());
            }
        }
       
        return list;
    }
    public Map[] getInstitutionList(){
        DBOperator dbOperator=new DBOperator("select InstitutionNum,InstitutionName from institution_t where (InstitutionCategoryNum=3 or InstitutionCategoryNum=4) and Category=1 and IsDelete ='否';");
        return dbOperator.executeQuery();
    }
    public List<InstitutionT> getInstitutionByID(String num){
        return Im.getInstitutionByID(num);
    }

    public List<InstitutionT> selectAll() { return Im.selectAll();}
}
