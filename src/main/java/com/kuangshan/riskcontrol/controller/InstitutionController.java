package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.model.InstitutionT;
import com.kuangshan.riskcontrol.service.InstitutionService;
import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.DBo;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/SystemMaintenance")
public class InstitutionController {
	@Resource
	private InstitutionService Is;

	DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");



	//机构管理主页面机构信息加载
	@RequestMapping("/institutionManager/InstitutionList")
	@ResponseBody
	public Map<String,Object> InstitutionList_vue(@RequestParam(value = "conditions", required = false, defaultValue = "") String conditions, @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex) throws  Exception {
		System.out.println(conditions);
		Map[] list = Is.getAll(conditions,pageindex);
		Map[] InstitutionCategoryList =  Is.getInstitutionCategoryList();
		DBOperator db = new DBOperator("");
		Map[] InstitutionList = db.getTableByProc("Institution_Proc");            /*绑定机构编号*/
		int pagenum = Is.getInstitutionListPageNum(conditions);
		Map<String,Object> result=new HashMap<>();
		result.put("list",list);
		result.put("InstitutionCategoryList",InstitutionCategoryList);
		result.put("InstitutionList",InstitutionList);
		result.put("pagenum",pagenum);
		return result;
	}

	//机构管理主页面
	@RequestMapping(value = "/institutionManager/InstitutionList_vue")
	public ModelAndView InstitutionList() {
		//SetSession_vue(session);
		ModelAndView mv=new ModelAndView();
		mv.setViewName("/SystemMaintenance/institutionManager/InstitutionManage");
		return mv;
	}

	//添加界面——信息加载
	@RequestMapping("/institutionManager/getInfoForAdd")
	@ResponseBody
	public Map<String, Object> getInfoForAdd(HttpSession session) {

		Map[] PeopleInChargeList =  Is.getPeopleInChargeList();
		Map[] InstitutionCategoryList =  Is.getInstitutionCategoryList();
		Map<String, Object> result = new HashMap<>();
		result.put("PeopleInChargeList", PeopleInChargeList);
		result.put("InstitutionCategoryList",InstitutionCategoryList);
		return result;
	}

	//获取所属机构信息
	@RequestMapping("/institutionManager/getInstitutionPrefix")
	@ResponseBody
	public Map<String, Object> getInstitutionPrefix(HttpServletRequest request, HttpServletResponse response)
	{
		String category=request.getParameter("category");
		Map<String, Object> result = new HashMap<>();
		result.put("InstitutionPrefixList",Is.getInstitutionPrefixList(category));
		return result;
	}

	// 添加数据前需要检测是否该机构编号已存在
	@RequestMapping("/institutionManager/IsInstitutionNumExist")
	public void IsInstitutionNumExist(HttpServletRequest request, HttpServletResponse response) {
		try {

			String institutionNum = request.getParameter("InstitutionNum");
			String returntext;
			String sql = "select * from institution_t where InstitutionNum='" + institutionNum + "'";
			DBOperator db=new DBOperator("");
			if (db.getTableByOneProc("commonQueryProc",sql).length>0)
			{
				returntext = "error";
			}
			else {
				returntext = "success";
			}
			response.setContentType("charset=utf-8");
			response.getWriter().write(returntext);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 添加数据
	@RequestMapping("/institutionManager/SubmitAdd")
	@ResponseBody
	public Map<String, Object> addInstitutionManger(@RequestParam(value = "InstitutionNum", required = false, defaultValue = "") String InstitutionNum,
													@RequestParam(value = "InstitutionName", required = false, defaultValue = "") String InstitutionName,
													@RequestParam(value = "InstitutionAbbr", required = false, defaultValue = "") String InstitutionAbbr,
													@RequestParam(value = "peopleInCharge", required = false, defaultValue = "") String PeopleInCharge,
													@RequestParam(value = "SecurityOfficer", required = false, defaultValue = "") String SecurityOfficer,
													@RequestParam(value = "category", required = false, defaultValue = "") String Category,
													@RequestParam(value = "institutionCategory", required = false, defaultValue = "") String institutionCategory,
													@RequestParam(value = "InstitutionPrefix", required = false, defaultValue = "") String InstitutionPrefix) {
		Map<String, Object> result = new HashMap<>();
		try {
//			String InstitutionNum = request.getParameter("InstitutionNum");
//			String InstitutionName = request.getParameter("InstitutionName");
//			String InstitutionAbbr = request.getParameter("InstitutionAbbr");
//			String PeopleInCharge = request.getParameter("peopleInCharge");
//			String SecurityOfficer =request.getParameter("SecurityOfficer");
//			String Category = request.getParameter("category");
//			String institutionCategory = request.getParameter("institutionCategory");
//			String InstitutionPrefix = request.getParameter("InstitutionPrefix");
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy", java.util.Locale.US);
			String EstablishTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(sdf.parse(date.toString()));
			DBOperator db;
			String sql;
			String returntext;
			if(InstitutionPrefix.equals("")) {
				sql = "insert into institution_t(InstitutionNum,InstitutionName,PeopleInCharge,IsDelete,EstablishTime,DeleteTime,Category,InstitutionCategoryNum,SecurityOfficer,InstitutionAbbr) values('" + InstitutionNum + "','" + InstitutionName + "','" + PeopleInCharge + "','" + "否" + "','" + EstablishTime + "','" + "1970-01-01" + "','" +Category+ "','" + institutionCategory+ "','"+SecurityOfficer+"','"+InstitutionAbbr+"')";
			} else {
				sql = "insert into institution_t(InstitutionNum,InstitutionName,PeopleInCharge,IsDelete,EstablishTime,DeleteTime,Category,InstitutionCategoryNum,InstitutionPrefix,SecurityOfficer,InstitutionAbbr) values('" + InstitutionNum + "','" + InstitutionName + "','" + PeopleInCharge + "','" + "否" + "','" +EstablishTime + "','" + "1970-01-01" + "','" + Category+ "','" + institutionCategory+ "','" + InstitutionPrefix+ "','"+SecurityOfficer+"','"+InstitutionAbbr+"')";
			}

			db=new DBOperator(sql);
			if (db.executeUpdate()>0)
			{
				returntext = "success";
			}
			else {
				returntext = "error";
			}
//			response.setContentType("charset=utf-8");
//			response.getWriter().write(returntext);
			result.put("result", returntext);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}


	// 编辑页面
	@RequestMapping("/institutionManager/Edit")
	@ResponseBody
	public Map<String, Object> InstitutionManagerEdit(HttpServletRequest request)  {
		String InstitutionNum = request.getParameter("institutionNum");
		Map[] PeopleInChargeList =  Is.getPeopleInChargeListbyInstitutionNum(InstitutionNum);
		Map[] InstitutionCategoryList =  Is.getInstitutionCategoryList();
		String sql = "select convert(nvarchar(10),EstablishTime,23) as EstablishDate,convert(nvarchar(10),DeleteTime,23) as DeleteDate,* from institution_t where InstitutionNum='" + InstitutionNum + "'";
		DBOperator db= new DBOperator("");
		Map[] InstitutionInfo = db.getTableByOneProc("commonQueryProc", sql);
		Map<String, Object> result = new HashMap<>();
		result.put("PeopleInChargeList", PeopleInChargeList);
		result.put("InstitutionCategoryList",InstitutionCategoryList);
		result.put("InstitutionInfo",InstitutionInfo);
		return result;
	}

	// 修改数据
	@RequestMapping("/institutionManager/Submitupdate")
	@ResponseBody
	public Map<String, Object> updateInstitutionManger(@RequestParam("InstitutionNum") String InstitutionNum,
													   @RequestParam("InstitutionName") String InstitutionName,
													   @RequestParam("InstitutionAbbr") String InstitutionAbbr,
													   @RequestParam("peopleInCharge") String PeopleInCharge,
													   @RequestParam("SecurityOfficer") String SecurityOfficer,
													   @RequestParam("category") String Category,
													   @RequestParam("institutionCategory") String institutionCategory,
													   @RequestParam("InstitutionPrefix") String InstitutionPrefix,
													   @RequestParam("establishDate") String EstablishTime,
													   @RequestParam("deleteDate") String DeleteTime,
													   @RequestParam("isDelete") String IsDelete) {
		System.out.println("Submitupdate  "+InstitutionNum+" "+IsDelete);

		Map<String, Object> result = new HashMap<>();
		try {
			EstablishTime = EstablishTime.equals("") ? "1970-01-01" : EstablishTime;
			DeleteTime = DeleteTime.equals("") ? "1970-01-01" : DeleteTime;
//			String InstitutionNum = request.getParameter("InstitutionNum");
//			String InstitutionName = request.getParameter("InstitutionName");
//			String InstitutionAbbr = request.getParameter("InstitutionAbbr");
//			String PeopleInCharge = request.getParameter("peopleInCharge");
//			String SecurityOfficer =request.getParameter("SecurityOfficer");
//			String Category = request.getParameter("category");
//			String institutionCategory = request.getParameter("institutionCategory");
//			String InstitutionPrefix = request.getParameter("InstitutionPrefix");
//			String EstablishTime = request.getParameter("establishDate").equals("")?"1970-01-01":request.getParameter("establishDate");
//			String DeleteTime= request.getParameter("deleteDate").equals("")?"1970-01-01":request.getParameter("DeleteTime");
//			String IsDelete =request.getParameter("isDelete");
			if(IsDelete.equals("否"))
			{
				DeleteTime = "1970-01-01";
			}
			DBOperator db;
			String sql;
			if (InstitutionPrefix.equals("")) {
				sql = "update institution_t set InstitutionName='" + InstitutionName + "',PeopleInCharge='" + PeopleInCharge + "',SecurityOfficer='"+SecurityOfficer+"',Category ='" + Category + "',InstitutionCategoryNum='" + institutionCategory + "',EstablishTime='" + EstablishTime + "',DeleteTime='" + DeleteTime + "', IsDelete='" + IsDelete + "',InstitutionAbbr='"+InstitutionAbbr+"' where InstitutionNum='" + InstitutionNum + "'";
			} else {
				sql = "update institution_t set InstitutionName='" + InstitutionName + "',PeopleInCharge='" + PeopleInCharge + "',SecurityOfficer='"+SecurityOfficer+"',Category ='" + Category + "',InstitutionCategoryNum='" + institutionCategory + "',EstablishTime='" + EstablishTime + "',DeleteTime='" + DeleteTime + "', InstitutionPrefix = '" + InstitutionPrefix +  "', IsDelete='" + IsDelete + "','"+InstitutionAbbr+"' where InstitutionNum='" + InstitutionNum + "'";
			}

			db=new DBOperator(sql);
			String returntext = db.executeUpdate()>0 ? "success" : "error";
//			response.setContentType("charset=utf-8");
//			response.getWriter().write(returntext);
			result.put("result", returntext);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 删除数据前需要检测角色是否存在
	@RequestMapping("/institutionManager/IsRoleExist")
	@ResponseBody
	public Map<String,Object> deleteIsRoleExist(@RequestParam("InstitutionNumList") String id_list) {
		Map<String, Object> result = new HashMap<>();
		try {
			boolean flag = true;
			for (String id : id_list.split(",")) {
				List<InstitutionT> rolelist = Is.isRoleExist(id);
				if (rolelist.size() != 0) {
					flag = false;
				}
			}
//			response.setContentType("charset=utf-8");
//			response.getWriter().write(flag ? "success" : "RoleNotNull");
			String returntext = flag ? "success" : "RoleNotNull";
			result.put("result", returntext);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	// 删除数据
	@RequestMapping("/institutionManager/Delete")
	@ResponseBody
	public Map<String,Object> deleteDualpreventionmechanism(@RequestParam("InstitutionNumList") String id_list) {
		Map<String, Object> result = new HashMap<>();
		try {
			boolean flag = true;
			for (String id : id_list.split(",")) {
				Date deletetime = new Date();
				flag = flag && Is.deleteByNum(id, deletetime);
				System.out.println(flag);
			}
//			response.setContentType("charset=utf-8");
//			response.getWriter().write(flag ? "success" : "error");
			String returntext = flag ? "success" : "RoleNotNull";
			result.put("result", returntext);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}




	// 机构模块管理页面
	@RequestMapping("/institutionManager/InstitutionModuleManager")
	public ModelAndView InstitutionModuleManager() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/SystemMaintenance/institutionManager/InstitutionModuleManager");
		return mv;
	}

    //机构模块页面——数据加载
    @RequestMapping("/institutionManager/getList_InstitutionModule")
    @ResponseBody
    public Map<String, Object> getList_InstitutionModule(HttpSession session) throws Exception {

        Map<String, Object> result = new HashMap<>();
        result.put("InstitutionList",Is.getInstitutionExceptClassList());
        result.put("Firstmodulelist", Is.getFirstModule());
        result.put("Secondmodulelist",Is.getSecondModule());
        return result;

    }


    //机构模块管理界面中切换机构名称的响应事件
	@RequestMapping("/institutionManager/loaddataforModule")
	@ResponseBody
	public Map<String,Map<String, String>> loaddataforModule(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String InstitutionNum=request.getParameter("Institution");
		Map<String,String> module_ids = new HashMap<>();         //用于存储二级模块及其对应的权限  0—仅查询、1—具有增删改和查询功能
		DBOperator db=new DBOperator("select * from ModuleManagement_V where InstitutionNum ='" + InstitutionNum + "'order by ModuleNum ");
		Map[] modulelist=db.executeQuery();
		for(int i=0;i<modulelist.length;i++)
		{
			module_ids.put(modulelist[i].get("ModuleNum").toString(),modulelist[i].get("CanDo").toString());
		}
		Map<String, Map<String, String>> map = new HashMap<String,Map<String, String>>();
		map.put("mapList", module_ids);
		return map;

	}

	//机构模块管理页面中的保存事件
	@RequestMapping("/institutionManager/updatePermissions")
	@ResponseBody
	public Map<String,Object> UpdatePermissions( @RequestParam("InstitutionNum") String InstitutionNum,
												 @RequestParam("roleRight") String roleRight) throws Exception
	{
		Map<String, Object> result = new HashMap<>();
		Boolean exist=false;
		System.out.println(roleRight);
		if (roleRight.length() > 1)
            roleRight = roleRight.substring(0, roleRight.length()-1);
		DBOperator db = new DBOperator("select * from ModuleInstitution_T where InstitutionNum ='" + InstitutionNum + "'order by ModuleNum");
		Map[] list = db.executeQuery();
		if(list.length>0)
		{
			exist=true;
		}
        String nochange = "";
        String approveChange = "";
        String decrease = "";//减少的权限
        String change = "";//权限的改变
        String increase = "";//新增的权限
        String userNum="";
        String userright ="";
        String roleID = "";
        String roleIDRight = "";

        if(exist)   //如果是修改权限，则以下
        {
        	//获取修改权限字符串
        	for(int i=0;i<list.length;i++)
        	{
        		nochange += list[i].get("ModuleNum") + "-" + list[i].get("CanDo") + ";";
        	}
        	if (!nochange.equals(""))
            {
                nochange = nochange.substring(0,nochange.length()-1);
            }
        	if (!roleRight.equals(""))
            {
                String[] roleRightArray = roleRight.split(";");
                for (int i = 0; i < roleRightArray.length; i++)
                {
                	if (nochange.contains(roleRightArray[i].substring(0, 6))&&!nochange.contains(roleRightArray[i].substring(0, 8)))
                	{
                        String temp = roleRightArray[i].substring(0, 6) + "-1";
                        //如果原有权限包含该权限，但是，权限有更改,0-1,1-0,2-0，2-1权限不改变
                            if (roleRightArray[i].substring(7, 8).equals("1"))//0-1，2-1
                            {
                                if (!nochange.contains(temp))//0-1,权限改变，同时移除原有权限和现有权限
                                {
                                    change += roleRightArray[i] + ";";
                                    nochange = nochange.replace(roleRightArray[i].substring(0, 6) + "-0", "");
                                    roleRight = roleRight.replace(roleRightArray[i], "");
                                }
                                else//2-1权限不改变,权限没有更改，则移除该权限    
                                {
                                    nochange=nochange.replace(temp, "");
                                     roleRight= roleRight.replace(roleRightArray[i], "");

                                }
                            }
                            else if (roleRightArray[i].substring(7, 8).equals("0"))//2-0,1-0
                            {
                                change += roleRightArray[i] + ";";
                                if (nochange.contains(temp))//1-0
                                {
                                    approveChange += roleRightArray[i] + ";";
                                    nochange = nochange.replace(temp, "");
                                    roleRight = roleRight.replace(roleRightArray[i], "");
                                }
                                else if (nochange.contains(roleRightArray[i].substring(0, 6) + "-1"))
                                {
                                    nochange = nochange.replace(roleRightArray[i].substring(0, 6) + "-1", "");
                                    roleRight = roleRight.replace(roleRightArray[i], "");
                                }
                            }
                	}
                	else if(nochange.contains(roleRightArray[i].substring(0, 8)))//如果原有权限包含该权限，但是，权限没有更改，则移除该权限
                    {
                        nochange=nochange.replace(roleRightArray[i], "");//剩下的是减少的权限，
                        roleRight=roleRight.replace(roleRightArray[i], "");//剩下的是增加的权限
                    }
                }
                
            }
        	if (!change.equals(""))
            {
                change = change.substring(change.length() - 1, change.length()).equals(";") ? change.substring(0,change.length()-1) : change;
            }
            if (!approveChange.equals(""))
            {
                approveChange = approveChange.substring(approveChange.length() - 1, approveChange.length()).equals(";") ? approveChange.substring(0,approveChange.length()-1) : approveChange;
            }
            while (nochange.contains(";;"))
            {
                nochange = nochange.replace(";;", ";");
            }
            if (!nochange.equals(""))
            {
                if (nochange.substring(0, 1).equals(";"))
                {
                    nochange = nochange.substring(1, nochange.length());
                }
                if (!nochange.equals(""))
                {
                    decrease = nochange.substring(nochange.length() - 1).equals(";") ? nochange.substring(0,nochange.length()-1) : nochange;
                }
             }
            while (roleRight.contains(";;"))
            {
                roleRight = roleRight.replace(";;", ";");
            }
            if (!roleRight.equals(""))
            {
                if (roleRight.substring(0, 1).equals(";"))
                {
                    roleRight = roleRight.substring(1, roleRight.length());
                }
                if (!roleRight.equals(""))
                {
                    increase = roleRight.substring(roleRight.length() - 1).equals(";") ? roleRight.substring(0,roleRight.length()-1) : roleRight;
                }
            }
            //用户权限
            Map[] ApproveList=Is.getApproveReturn(InstitutionNum, approveChange, decrease);
            for(int i=0;i<ApproveList.length;i++)
            {
            	userNum+=ApproveList[i].get("EmployeeNum").toString()+";";
            	if(ApproveList[i].get("UserRight").toString().trim()!="")
            	{
            		userright+=ApproveList[i].get("UserRight").toString()+";";
            	}
            	else
            	{
            		userright += ";";
            	}
            }
            if (!userNum.equals(""))
            {
                userNum = userNum.substring(userNum.length() - 1, userNum.length()).equals(";") ? userNum.substring(0, userNum.length() - 1) : userNum;
            }
            if (!userright.equals(""))
            {
                userright = userright.substring(userright.length() - 1, userright.length()).equals(";") ? userright.substring(0, userright.length() - 1) : userright;
            }
            //角色权限
			System.out.println("test rolelist");
            Map[]  RoleList=Is.getRoleReturn(InstitutionNum, decrease);
            for (int i = 0; i < RoleList.length; i++)
            {
                roleID += RoleList[i].get("RoleID").toString() + ";";
                if (RoleList[i].get("RoleRight").toString().trim() != "")
                {
                    roleIDRight += RoleList[i].get("RoleRight").toString() + ";";
                }
                else
                {
                    roleIDRight += ";";
                }
            }
            if (!roleID.equals(""))
            {
                roleID = roleID.substring(roleID.length() - 1, roleID.length()).equals(";") ? roleID.substring(0,roleID.length() - 1) : roleID;
            }
            if (!roleIDRight.equals(""))
            {
                roleIDRight = roleIDRight.substring(roleIDRight.length() - 1, roleIDRight.length()).equals(";") ? roleIDRight.substring(0,roleIDRight.length() - 1) : roleIDRight;
            }
			if(decrease.equals("")&&change.equals("")&&increase.equals("")&&userNum.equals("")&&userright.equals("")&&roleID.equals("")&&roleIDRight.equals(""))
			{
//				response.setContentType("charset=utf-8");
//				response.getWriter().write("success");
				result.put("result", "success");
			}
			else {
				DBOperator dbOperator=new DBOperator("");
				int val=dbOperator.updateModuleInstitution_T(InstitutionNum,decrease,change,increase,userNum,userright,roleID,roleIDRight);
				if(val>0)
				{
//					response.setContentType("charset=utf-8");
//					response.getWriter().write("success");
					result.put("result", "success");
				}
				else
				{
//					response.setContentType("charset=utf-8");
//					response.getWriter().write("error");
					result.put("result", "success");
				}
			}

        }
        else                 //更新角色信息，提交
        {
			DBOperator dbO=new DBOperator("");
			int val=dbO.InsertModuleInstitution_T(InstitutionNum,roleRight);
			if(val>0)
			{
//				response.setContentType("charset=utf-8");
//				response.getWriter().write("success");
				result.put("result", "success");
			}
			else
			{
//				response.setContentType("charset=utf-8");
//				response.getWriter().write("error");
				result.put("result", "error");
			}
        }
		return result;
	}
	

	// 机构指定页面
	@RequestMapping("/institutionManager/InstitutionAssign")
	public ModelAndView InstitutionAssign() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/SystemMaintenance/institutionManager/InstitutionAssign");
		return mv;
	}

	//机构指定页面——数据加载
	@RequestMapping("/institutionManager/getList_InstitutionAssign")
	@ResponseBody
	public Map<String, Object> getList_InstitutionAssign(HttpSession session) throws Exception {
		List<Map<String,Object>> list = Is.getInstitutionExceptClassList();
		List<Map<String ,Object>> AssignedInstitutionList = Is.getAssignedInstitution();
		Map<String, Object> result = new HashMap<>();
		result.put("InstitutionAssignList", list);
		result.put("AssignedInstitutionList",AssignedInstitutionList);
		return result;

	}

	// 机构指定页面中的保存事件
	@RequestMapping("/institutionManager/insertInsTochecktable")
	public void insertInsTochecktable(HttpServletRequest request, HttpServletResponse response) {
		String returntext ="";
		try {
			DBo dBo = new DBo();
			//DBOperator db=new DBOperator("truncate table InstitutionToChecktable_T");  ////首先清空表InstitutionToChecktable_T里的数据
			dBo.executeUpdate("truncate table InstitutionToChecktable_T");
			String selectedValuesArr=request.getParameter("arr").toString();
			String[] arr=selectedValuesArr.split(";");
			 for (int i = 0; i <arr.length; i++)
	            {
	                if (arr[i] == "")
	                { }
	                else
	                {
	                    //添加数据
						dBo.executeUpdate("insert into InstitutionToChecktable_T(InsNum) values('"+arr[i]+"')");
	                }
	            }
			returntext="success";
			response.setContentType("charset=utf-8");
			response.getWriter().write(returntext);
		} catch (Exception e) {
			returntext="error";
			e.printStackTrace();
		}
	}
}
