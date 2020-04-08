package com.kuangshan.riskcontrol.controller;

//import com.alibaba.fastjson.JSONObject;
import com.kuangshan.riskcontrol.tool.RequestParam;
import com.kuangshan.riskcontrol.tool.Crypt;
import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.DBo;
import net.sf.json.JSONObject;
import com.kuangshan.riskcontrol.service.RoleService;
import org.apache.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/SystemMaintenance")
public class RoleController {
    DBo dBo = new DBo();
    @Resource
    private RoleService rs;

    //角色管理主页面
    @RequestMapping(value = "/RoleManager/RoleList_vue")
    public ModelAndView showRoleList() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/RoleManager/RoleManager");
        return mv;
    }

    //角色管理主页面信息加载
    @RequestMapping("/RoleManager/RoleList")
    @ResponseBody
    public Map<String, Object> RoleList(@RequestParam(value = "conditions", required = false, defaultValue = "") String conditions, @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex, HttpSession session) throws SQLException {
        String username = session.getAttribute("UserNum").toString();
        String Institution = session.getAttribute("UserInstitution").toString();
        System.out.println(conditions);
        Map[] list = rs.getRoleList(conditions, pageindex, username, Institution);
        int pagenum = rs.getRoleListPageNum(conditions, username, Institution);
        //System.out.println(list.length);
        //System.out.println(pagenum);
        //System.out.println(list[0].get("Category"));
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }

    //添加角色页面
    @RequestMapping(value = "/RoleManager/AddRole_vue")
    public ModelAndView AddRole() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/RoleManager/RoleAdd");
        return mv;
    }

    //添加角色界面——机构名称加载
    @RequestMapping("/RoleManager/InstitutionList")
    @ResponseBody
    public Map<String, Object> InstitutionList(HttpSession session) {
        String username = session.getAttribute("UserNum").toString();
        String Institution = session.getAttribute("UserInstitution").toString();
        Map<String, Object> roletypelist = new HashMap<>();    //存储 角色类型 下拉列表中的值
        List<Map<String, Object>> typelist = new ArrayList<Map<String, Object>>();

        if (username.equals("admin")) {
            roletypelist.put("value", "矿级领导");
            typelist.add(roletypelist);
            roletypelist = new HashMap<>();
            roletypelist.put("value", "部门领导");
            typelist.add(roletypelist);
        } else if (username.equals("kuang")) {
            roletypelist.put("value", "矿级领导");
            typelist.add(roletypelist);
            roletypelist = new HashMap<>();
            roletypelist.put("value", "部门领导");
            typelist.add(roletypelist);
            roletypelist = new HashMap<>();
            roletypelist.put("value", "管理员");
            typelist.add(roletypelist);
            roletypelist = new HashMap<>();
            roletypelist.put("value", "普通用户");
            typelist.add(roletypelist);
        } else {
            roletypelist.put("value", "管理员");
            typelist.add(roletypelist);
            roletypelist = new HashMap<>();
            roletypelist.put("value", "普通用户");
            typelist.add(roletypelist);
        }

        Map[] Institutionlist = rs.getInstitutionExceptClass();
        Map<String, Object> result = new HashMap<>();
        result.put("list", Institutionlist);
        result.put("typeList", typelist);
        result.put("username", username);
        result.put("Institution", Institution);
        return result;
    }

    //添加角色界面--modulelist加载
    @RequestMapping("/RoleManager/addmoduleList")
    @ResponseBody
    public Map<String, Object> addmoduleList(HttpServletRequest request) {
        String InstitutionNum = request.getParameter("InstitutionNum");
        Map[] Secondmodulelist = rs.getSecondModuleList(InstitutionNum);
        String modulenum = "";
        for (int i = 0, j = 0; i < Secondmodulelist.length; i++) {
            while ((i + 1 < Secondmodulelist.length) && (Secondmodulelist[i].get("ModuleNum").toString().substring(0, 2).equals(Secondmodulelist[i + 1].get("ModuleNum").toString().substring(0, 2)))) {
                //modulenum+=Secondmodulelist[i].get("ModuleNum").toString()+",";
                i++;
            }
            //modulenum+=Secondmodulelist[i].get("ModuleNum").toString()+",";
            modulenum += Secondmodulelist[i].get("ModuleNum").toString().substring(0, 2) + "0000" + ",";
            j++;
        }
        if (modulenum.length() > 0) {
            modulenum = modulenum.substring(0, modulenum.length() - 1);
        }
        //System.out.println(modulenum);
        Map[] Firstmodulelist = null;
        if (!modulenum.equals("")) {
            Firstmodulelist = rs.getAllModuleList(modulenum);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("Firstmodulelist", Firstmodulelist);
        result.put("Secondmodulelist", Secondmodulelist);
        return result;
    }

    //添加角色界面——保存功能
    @RequestMapping("/RoleManager/submitAdd")
    @ResponseBody
    public String submitAdd(HttpServletRequest request) throws Exception {
        Crypt crypt = new Crypt();
        String returntext="";
        String rolename = request.getParameter("RoleName");
        if(dBo.executeQuery("select * from RoleInfo_T where RoleName = '"+rolename+"'").size()>0)   //角色名称有重复
        {
            returntext="exist";

        }
        else
        {
            String rolememo = request.getParameter("RoleMemo");
            String RoleInstitution = request.getParameter("RoleInstitution");
            String RolePosition = request.getParameter("RolePosition");
            String[] IDList = request.getParameter("IDList").split(",");
            //System.out.println("rolename:" + rolename + "    rolememo:" + rolememo + "      RoleInstitution:" + RoleInstitution + "     RolePosition:" + RolePosition + "       IDList:" + IDList.length);
            String roleright = "";
            if (!IDList[0].equals("")) {
                for (int i = 0; i < IDList.length; i++) {
                    if (IDList[i].toString().equals("090100") || IDList[i].toString().equals("090300") || IDList[i].toString().equals("090400") || IDList[i].toString().equals("090500")) {
                        roleright += IDList[i].toString() + "-1;";
                    } else {
                        roleright += IDList[i].toString() + "-0;";
                    }

                }
            }
            //System.out.println(roleright);
            if (!roleright.equals("")) {
                roleright = crypt.DESEncrypt(roleright, "shirleyL");
            }
            returntext = rs.insertRole(rolename, rolememo, roleright, RoleInstitution, RolePosition) ? "success" : "error";

        }
        return returntext;
    }

    @RequestMapping("/RoleManager/deleteRole")
    @ResponseBody
    public String deleteRole(HttpServletRequest request) throws Exception {
        String[] IDList = request.getParameter("IDList").split(",");
        String idlist = "";
        String returntext = "";
        for (int i = 0; i < IDList.length; i++) {
            idlist += IDList[i] + ",";
        }
        if (idlist.length() > 0) {
            idlist = idlist.substring(0, idlist.length() - 1);
        }
        if (rs.canDeleteRole(idlist)) {
            if (rs.deleteRole(idlist)) {
                returntext = "success";

            } else {
                returntext = "error";

            }
        } else {
            returntext = "unable";

        }
        return returntext;
    }

    //角色详细页面
    @RequestMapping("/RoleManager/DetailRole_vue")
    public ModelAndView DetailRole(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/RoleManager/RoleDetail");
        return mv;
    }

    //获取角色详细信息
    @RequestMapping("/RoleManager/roleInfoList")
    @ResponseBody
    public Map<String, Object> roleInfoList(HttpServletRequest request) throws Exception {
        //String InstitutionName = session.getAttribute("UserInstitutionName").toString();
        Crypt crypt = new Crypt();
        String roleID = request.getParameter("roleID");
        //获取角色信息
        Map[] roleinfo = rs.getRoleInfoByID(roleID);

        DBo dbo = new DBo();
        String InstitutionName = dbo.executeQuery("select InstitutionName from Institution_t where InstitutionNum = '" + roleinfo[0].get("RoleInstitution").toString() + "'").get(0).get("InstitutionName").toString();

        //获取该单位所对应的模块列表
        Map[] Secondmodulelist = rs.getSecondModuleList(roleinfo[0].get("RoleInstitution").toString());
        String modulenum = "";
        for (int i = 0, j = 0; i < Secondmodulelist.length; i++) {
            while ((i + 1 < Secondmodulelist.length) && (Secondmodulelist[i].get("ModuleNum").toString().substring(0, 2).equals(Secondmodulelist[i + 1].get("ModuleNum").toString().substring(0, 2)))) {
                //modulenum+=Secondmodulelist[i].get("ModuleNum").toString()+",";
                i++;
            }
            //modulenum+=Secondmodulelist[i].get("ModuleNum").toString()+",";
            modulenum += Secondmodulelist[i].get("ModuleNum").toString().substring(0, 2) + "0000" + ",";
            j++;
        }
        if (modulenum.length() > 0) {
            modulenum = modulenum.substring(0, modulenum.length() - 1);
        }
        //System.out.println(modulenum);
        Map[] Firstmodulelist = null;
        if (!modulenum.equals("")) {
            Firstmodulelist = rs.getAllModuleList(modulenum);
        }

        //获取该角色已经选取的模块列表
        String roleRight = roleinfo[0].get("RoleRight").toString();
        String[] rightarry = {};
        if (roleRight.trim() != "") {
            roleRight = crypt.DESDecrypt(roleRight.trim(), "shirleyL");
            rightarry = roleRight.split(";");
        }
        Map<String, String> selectedlist = new HashMap<>();
        List<Map<String, String>> selectedModulelist = new ArrayList<Map<String, String>>();
        if (!rightarry[0].equals("")) {
            for (int i = 0; i < rightarry.length; i++) {
                selectedlist.put("modulenum", rightarry[i].substring(0, 6));
                selectedModulelist.add(selectedlist);
                selectedlist = new HashMap<>();
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("RoleInfoList", roleinfo);
        result.put("InstitutionName", InstitutionName);
        result.put("Firstmodulelist", Firstmodulelist);
        result.put("Secondmodulelist", Secondmodulelist);
        result.put("selectedModulelist", selectedModulelist);
        return result;
    }

    //角色修改页面
    @RequestMapping(value = "/RoleManager/EditRole_vue")
    public ModelAndView EditRole() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/RoleManager/RoleEdit");
        return mv;
    }

    //角色修改页面——保存功能
    @RequestMapping("/RoleManager/submitSave")
    @ResponseBody
    public String submitSave(HttpServletRequest request) throws Exception {
        Crypt crypt = new Crypt();
        String roleID = request.getParameter("roleID");
        String rolename = request.getParameter("RoleName");
        String returntext="";
        if(dBo.executeQuery("select * from RoleInfo_T where RoleName = '"+rolename+"' and RoleID<>'"+roleID+"'").size()>0)   //角色名称有重复
        {
            returntext="exist";

        }
        else
        {

            String rolememo = request.getParameter("RoleMemo");
            String RoleInstitution = request.getParameter("RoleInstitution");
            String RolePosition = request.getParameter("RolePosition");
            String[] IDList = request.getParameter("IDList").split(",");
            System.out.println("rolename:" + rolename + "    rolememo:" + rolememo + "      RoleInstitution:" + RoleInstitution + "     RolePosition:" + RolePosition + "       IDList:" + IDList.length);
            String roleRight = "";
            String decreaseRole = "";//减少的角色操作模块
            String userNum = "";
            String userright = "";
            String NochangeRoleRight = "";

            //构造roleright字符串
            if(!IDList[0].equals("")) {
                for (int i = 0; i < IDList.length; i++) {
                    if (IDList[i].toString().equals("090100") || IDList[i].toString().equals("090300") || IDList[i].toString().equals("090400") || IDList[i].toString().equals("090500")) {
                        roleRight += IDList[i].toString() + "-1;";
                    } else {
                        roleRight += IDList[i].toString() + "-0;";
                    }

                    //roleRight += IDList[i].toString() + "-0;";
                }
            }
            //System.out.println(roleright);
            if (!roleRight.equals("")) {
                roleRight = crypt.DESEncrypt(roleRight, "shirleyL");
            }

            NochangeRoleRight = "";

            //获取该角色已经选取的模块列表
            Map[] roleinfo = rs.getRoleInfoByID(roleID);
            String Right = roleinfo[0].get("RoleRight").toString();
            if (!Right.trim().equals("")) {
                Right = crypt.DESDecrypt(Right.trim(), "shirleyL");
            }
            String[] rightarry = Right.split(";");
            if (!rightarry[0].equals("")) {
                for (int i = 0; i < rightarry.length; i++) {
                    if (rightarry[i].substring(0, 6).equals("090100") || rightarry[i].substring(0, 6).equals("090300") || rightarry[i].substring(0, 6).equals("090400") ) {
                        NochangeRoleRight += rightarry[i].substring(0, 6) + "-1";
                    } else {
                        NochangeRoleRight += rightarry[i].substring(0, 6) + "-0";
                    }
                    if (i < rightarry.length - 1) {
                        NochangeRoleRight += ";";
                    }
                }
            }
            if (!NochangeRoleRight.equals(""))//获取减少的模块
            {
                if (!roleRight.equals("")) {
                    String[] rolerightArray = Crypt.DESDecrypt(roleRight, "shirleyL").split(";");
                    for (int i = 0; i < rolerightArray.length; i++) {
                        if (NochangeRoleRight.contains(rolerightArray[i])) {
                            NochangeRoleRight = NochangeRoleRight.replace(rolerightArray[i], "");
                        }
                    }
                    while (NochangeRoleRight.contains(";;")) {
                        NochangeRoleRight = NochangeRoleRight.replace(";;", ";");
                    }

                    if (!NochangeRoleRight.equals("")) {
                        NochangeRoleRight = NochangeRoleRight.substring(0, 1).equals(";") ? NochangeRoleRight.substring(1, NochangeRoleRight.length()) : NochangeRoleRight;
                        if (!NochangeRoleRight.equals("")) {
                            NochangeRoleRight = NochangeRoleRight.substring(NochangeRoleRight.length() - 1, NochangeRoleRight.length()).equals(";") ? NochangeRoleRight.substring(0, NochangeRoleRight.length() - 1) : NochangeRoleRight;
                        }
                    }
                }
                decreaseRole = NochangeRoleRight;
            }

            Map[] userinfo = rs.getApproveReturnByRole(RoleInstitution, decreaseRole, roleID);

            for (int i = 0; i < userinfo.length; i++) {
                userNum += userinfo[i].get("EmployeeNum").toString() + ";";
                String tmpUserRight = "";
                if (!userinfo[i].get("UserRight").toString().trim().equals("")) {
                    tmpUserRight += userinfo[i].get("UserRight").toString();

                    if (!tmpUserRight.equals("")) {
                        tmpUserRight = Crypt.DESDecrypt(tmpUserRight, "shirleyL");

                        //获取增加了的角色权限，然后赋给用户
                        String[] roleRightArr = Crypt.DESDecrypt(roleRight, "shirleyL").split(";");
                        for (int j = 0; j < roleRightArr.length; j++) {
                            //添加新增的查看权限
                            if (!roleRightArr[j].equals("") && !roleRightArr[j].equals(";") && !tmpUserRight.contains(roleRightArr[j].substring(0, 6))) {
                                if (roleRightArr[j].contains("090100") || roleRightArr[j].contains("090300") || roleRightArr[j].contains("090400") || roleRightArr[j].contains("090500") )
                                {
                                    roleRightArr[j] = roleRightArr[j].replace("-0", "-1");
                                }
                                tmpUserRight += ";" + roleRightArr[j];
                            }
                        }

                        //对于有多个角色的用户，当前角色取消了A模块的查看权限，如果另一个角色拥有A模块的查看权限，那么这个用户仍然有该模块的查看权限
                        Map[] otherRoleDt = rs.getRoleUserList(userinfo[i].get("EmployeeNum").toString());
                        if (otherRoleDt.length > 1) {
                            for (int m = 0; m < otherRoleDt.length; m++) {
                                String tmpRoleID = otherRoleDt[m].get("RoleID").toString();
                                String tmpRoleRight = rs.getRoleInfoByID(tmpRoleID)[0].get("RoleRight").toString();
                                if (tmpRoleID.equals(roleID)) continue;
                                tmpRoleRight = Crypt.DESDecrypt(tmpRoleRight, "shirleyL");
                                String[] tmpRoleRightArr = tmpRoleRight.split(";");

                                for (int n = 0; n < tmpRoleRightArr.length; n++) {
                                    //不包含另一个角色中对于A模块的查看或增删改的权限
                                    if (!tmpRoleRightArr[n].trim().equals("") && !tmpRoleRightArr[n].equals(";") && !tmpUserRight.contains(tmpRoleRightArr[n]) && !tmpUserRight.contains(tmpRoleRightArr[n].substring(0, 6) + "-1")) {
                                        tmpUserRight += ";" + tmpRoleRightArr[n];
                                    }
                                }
                            }
                        }

                        tmpUserRight = Crypt.DESEncrypt(tmpUserRight, "shirleyL");
                    }

                    userright += tmpUserRight + ";";       //加密后;分割不同的用户
                    tmpUserRight = "";
                } else {
                    if(IDList[0].equals(""))     //权限全部收回
                    {
                        userright +=";";    //分割不同的用户
                    }
                    else
                    {
                        userright +=roleRight+ ";";    //分割不同的用户
                    }
                }


            }

            if (!userNum.equals("")) {
                userNum = userNum.substring(userNum.length() - 1, userNum.length()).equals(";") ? userNum.substring(0, userNum.length() - 1) : userNum;
            }

            if (userright != "") {
                userright = userright.substring(userright.length() - 1, userright.length()).equals(";") ? userright.substring(0, userright.length() - 1) : userright;
            }


            //rr.RoleRight = roleRight;

            String RoleExceptRight = rs.getExceptRoleModuleNum(RoleInstitution, roleID);
            String tempuserright = userright;
            while (tempuserright.contains(";"))
            {
                tempuserright = tempuserright.replace(";", "");
            }

            if(tempuserright.equals("")&&IDList[0].equals(""))
            {
                try {
                    String[] tempusernum = userNum.split(";");
                    for(int i = 0;i<tempusernum.length;i++)
                    {
                        dBo.executeUpdate(" update  userinfo_t set UserRight=''  where EmployeeNum = '"+tempusernum[i]+"'");
                    }
                    //更新角色信息
                    DBOperator db = new DBOperator("");
                    returntext = db.updateRole(roleID, rolename, roleRight, rolememo, RoleInstitution, RolePosition, userNum, userright, decreaseRole, RoleExceptRight) > 0 ? "success" : "error";

                }
                catch (Exception e)
                {
                    returntext="error";
                }
            }
            else
            {
                //更新角色信息
                DBOperator db = new DBOperator("");
                returntext = db.updateRole(roleID, rolename, roleRight, rolememo, RoleInstitution, RolePosition, userNum, userright, decreaseRole, RoleExceptRight) > 0 ? "success" : "error";

            }



        }
        return returntext;
        }



}
