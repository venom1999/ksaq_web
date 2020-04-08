package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.service.InstitutionService;
import com.kuangshan.riskcontrol.service.RoleService;
import com.kuangshan.riskcontrol.service.UserService;
import com.kuangshan.riskcontrol.tool.*;
import com.sun.xml.bind.v2.model.core.ID;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import com.kuangshan.riskcontrol.tool.RequestParam;
@Controller
@RequestMapping("/SystemMaintenance")
public class UserController {
    @Resource
    private UserService us;

    @Resource
    private RoleService rs;

    @Resource
    private InstitutionService Is;

    //用户管理主页面
    @RequestMapping(value = "/UserManage/UserList_vue")
    public ModelAndView showRoleList() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/UserManage/UserManage");
        return mv;
    }

    //角色管理主页面信息加载
    @RequestMapping("/UserManage/UserList")
    @ResponseBody
    public Map<String, Object> UserList(@RequestParam(value = "conditions", required = false, defaultValue = "") String conditions, @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex, HttpSession session) throws SQLException {
        String right = session.getAttribute("UserRight").toString();
        String username = session.getAttribute("UserNum").toString();
        String Institution = session.getAttribute("UserInstitution").toString();
        System.out.println(conditions);
        Map[] list = us.getUserList(conditions, pageindex, username, Institution);
        int pagenum = us.getUserListPageNum(conditions, username, Institution);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }

    //添加用户界面——信息加载
    @RequestMapping("/UserManage/getTxtUserNum")
    @ResponseBody
    public Map<String, Object> getTxtUserNum(HttpSession session) {
        String username = session.getAttribute("UserNum").toString();
        String institution = "%";
        if (!username.equals("admin") && !username.equals("kuang")) {
            institution = session.getAttribute("UserInstitution").toString();
        }
        Map[] list = us.getAllComConEmployeeInfoByIns(institution);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    @RequestMapping("/UserManage/getRoleList")
    @ResponseBody
    public Map<String, Object> getRoleList(HttpSession session, HttpServletRequest request) throws Exception {
        String username = session.getAttribute("UserNum").toString();
        String InstitutionNum = us.getComConEmployeeInstitution(request.getParameter("employeenum"));
        Map[] rolelist = us.getRoleList(InstitutionNum, username);
        Map<String, Object> result = new HashMap<>();
        result.put("list", rolelist);
        return result;
    }

    //添加用户界面——保存功能
    @RequestMapping("/UserManage/submitAdd")
    @ResponseBody
    public String submitAdd(HttpServletRequest request) throws Exception {
        String EmployeeNum = request.getParameter("EmployeeNum");
        String InstitutionNum = us.getComConEmployeeInstitution(EmployeeNum);
        String[] RoleList = request.getParameter("RoleList").split(",");
        String Userstate = request.getParameter("State");
        Boolean flag = false;
        String returntext = "";
        //获得抉择所在的机构
        for (int i = 0; i < RoleList.length; i++) {
            String roleID = RoleList[i];
            String roleInstitution = us.getRoleInstitution(roleID);
            if (roleInstitution.equals("")) {
            } else if (!InstitutionNum.equals(roleInstitution)) {
                DBo dbo = new DBo();
                List<Map<String, Object>> list = dbo.executeQuery("select * from institution_t where InstitutionNum='" + InstitutionNum + "' and InstitutionPrefix is not null");
                if (list.size() > 0 && list.get(0).get("InstitutionPrefix").toString().equals(roleInstitution)) {
                } else {
                    flag = true;//发现不一致的机构
                    break;
                }
            }
        }

        if (flag) {
            returntext = "differ";

        } else {
            Crypt crypt = new Crypt();
            Date date = new Date();
            String Password = crypt.DESEncrypt("111111", "shirleyL");
            SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy", java.util.Locale.US);
            //Date LastModifyPsdTime = sdf.parse(date.toString());
            String LastModifyPsdTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(sdf.parse(date.toString()));
            String RegisterTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(sdf.parse(date.toString()));
            int LoginTimes = 0;
            String UserRight = "";
            String EmployeeName = us.getEmployeeDetailByView(EmployeeNum)[0].get("EmployeeName").toString();

            if (us.CanInsert(EmployeeNum)) {
                Boolean successFlag = false;
                for (int i = 0; i < RoleList.length; i++) {
                    String roleID = RoleList[i];
                    successFlag = us.insertRoleUser(EmployeeNum, roleID);        //插入角色用户表，一个用户，可以对应多个角色

                    //构造用户权限
                    Map[] roleInfoDt = rs.getRoleInfoByID(RoleList[i]);
                    String roleRight = roleInfoDt[0].get("RoleRight").toString();
                    roleRight = Crypt.DESDecrypt(roleRight, "shirleyL");
                    String[] roleRightStr = roleRight.split(";");
                    for (int k = 0; k < roleRightStr.length; k++) {
                        if (roleRightStr[k].contains("090100") || roleRightStr[k].contains("090300") || roleRightStr[k].contains("090400") || roleRightStr[k].contains("090500") )
                            roleRightStr[k] = roleRightStr[k].replace("-0", "-1");
                        if (!roleRightStr[k].trim().equals("") && !roleRightStr[k].equals(";") && !UserRight.contains(roleRightStr[k]))      //对于不同role，不插入重复数据
                            UserRight += roleRightStr[k] + ";";
                    }
                    if (!successFlag) break;
                }
                UserRight = Crypt.DESEncrypt(UserRight, "shirleyL");//加密

                if (successFlag)
                    successFlag = us.insertUser(EmployeeNum, Userstate, Password, LastModifyPsdTime, RegisterTime, LoginTimes, EmployeeName, UserRight);
                if (successFlag) {
                    returntext = "success";

                } else {
                    returntext = "error";

                }
            } else {
                returntext = "repeat";
             ;
            }
        }
        return returntext;
    }

    //删除
    @RequestMapping("/UserManage/deleteUser")
    @ResponseBody
    public String deleteRole(HttpServletRequest request) throws Exception {
        String[] IDList = request.getParameter("IDList").split(",");
        String rightReturn = "";
        boolean flag = true;
        String returntext = "";
                DBOperator db = new DBOperator("");
        for (int i = 0; i < IDList.length; i++) {
            rightReturn = us.getWriteRight(IDList[i]);
            if (!db.DeleteUser("LC_DeleteUser", IDList[i], rightReturn)) {
                flag = false;
               returntext = "error";
                break;
            }
        }
        if (flag) {
            returntext = "success";
        }
        return returntext;
    }

    //用户详细页面
    @RequestMapping(value = "/UserManage/DetailUser_vue")
    public ModelAndView DetailUser() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/UserManage/UserDetail");
        return mv;
    }

    //获取用户详细信息
    @RequestMapping("/UserManage/userInfoList")
    @ResponseBody
    public Map<String, Object> userInfoList(HttpSession session, HttpServletRequest request) throws Exception {
        Crypt crypt = new Crypt();
        DBo dbo = new DBo();
        Map<String, String> List = new HashMap<>();
        List<Map<String, String>> infoList = new ArrayList<Map<String, String>>();

        String EmployeeNum = request.getParameter("EmployeeNum");
        //获取用户信息
        Map[] userinfo = us.getUserInfo(EmployeeNum);
        List.put("username", userinfo[0].get("EmployeeName").toString() + "-" + userinfo[0].get("EmployeeID").toString());
        if (userinfo[0].get("UserState").toString().equals("1")) {
            List.put("userstate", "账号正常");
        } else {
            List.put("userstate", "账号异常");
        }


        String InstitutionNum = us.getComConEmployeeInstitution(EmployeeNum);
        List.put("InstitutionNum", InstitutionNum);

        String InstitutionName = "";
        String InstitutionCategoryNum = dbo.getString("select InstitutionCategoryNum from Institution_t where InstitutionNum ='" + InstitutionNum + "'", "InstitutionCategoryNum");
        if (InstitutionCategoryNum.equals("5")) {
            InstitutionName = dbo.getString("select (RTRIM(b.InstitutionName)+'-'+RTRIM(a.InstitutionName)) InstitutionName from Institution_t as a \n" +
                    "inner join Institution_t as b \n" +
                    "on a.InstitutionNum ='" + InstitutionNum + "' and a.InstitutionPrefix=b.InstitutionNum", "InstitutionName");

            InstitutionNum = dbo.getString("select b.InstitutionNum from Institution_t as a \n" +
                    "inner join Institution_t as b \n" +
                    "on a.InstitutionNum ='" + InstitutionNum + "' and a.InstitutionPrefix=b.InstitutionNum", "InstitutionNum");

        } else {
            InstitutionName = dbo.getString("select InstitutionName from institution_t where InstitutionNum = '" + InstitutionNum + "'", "InstitutionName");

            // String InstitutionName = Is.getInstitutionName(InstitutionNum)[0].get("InstitutionName").toString();
        }
        List.put("InstitutionName", InstitutionName);


        //获取该单位所对应的模块列表
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

        Map<String, String> selectedlist = new HashMap<>();
        List<Map<String, String>> selectedModulelist = new ArrayList<Map<String, String>>();
        String txtrole = "";
        if (userinfo.length > 0) {
            String userRight = userinfo[0].get("UserRight").toString();
            List<Map<String, Object>> SelectedRoleList = us.getRoleList(EmployeeNum);
            for (int m = 0; m < SelectedRoleList.size(); m++) {
                txtrole += SelectedRoleList.get(m).get("RoleName").toString() + "  ";
            }


            /*//在列表中显示角色已有的权限，且让他们不可修改
            Map[] SelectedRoleList = us.getSelectRoleList(EmployeeNum);
            for (int m = 0; m < SelectedRoleList.length; m++) {
                txtrole += SelectedRoleList[m].get("RoleName").toString() + "   ";
                String roleID = SelectedRoleList[m].get("RoleID").toString();
                //获取角色信息
                Map[] roleinfo = rs.getRoleInfoByID(roleID);

                //获取该角色已经选取的模块列表
                String roleRight = roleinfo[0].get("RoleRight").toString();
                if (roleRight.trim() != "") {
                    roleRight = crypt.DESDecrypt(roleRight.trim(), "shirleyL");
                }
                String[] rightarry = roleRight.split(";");

                for (int i = 0; i < rightarry.length; i++) {
                    selectedlist.put("modulenum", rightarry[i]);
                    selectedModulelist.add(selectedlist);
                    selectedlist = new HashMap<>();
                    selectedlist.put("Opera",rightarry[i].substring(7,8));
                    selectedModulelist.add(selectedlist);
                    selectedlist = new HashMap<>();
                }
            }*/

            if (!userRight.equals(""))//已经设置了额外权限，则显示
            {
                //获取该角色已经选取的模块列表
                String UserRight = userinfo[0].get("UserRight").toString();
                if (!UserRight.trim().equals("")) {
                    UserRight = crypt.DESDecrypt(UserRight.trim(), "shirleyL");
                }
                String[] rightarry = UserRight.split(";");
                for (int i = 0; i < rightarry.length; i++) {
                    selectedlist.put("modulenum", rightarry[i]);
                    selectedModulelist.add(selectedlist);
                    selectedlist = new HashMap<>();
                }
            }
        }
        List.put("txtrole", txtrole);
        infoList.add(List);
        Map<String, Object> result = new HashMap<>();
        result.put("UserInfoList", infoList);
        result.put("Firstmodulelist", Firstmodulelist);
        result.put("Secondmodulelist", Secondmodulelist);
        result.put("selectedModulelist", selectedModulelist);
        return result;
    }

    //用户授权页面
    @RequestMapping(value = "/UserManage/Authorization_vue")
    public ModelAndView Authorization() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/SystemMaintenance/UserManage/UserApprove");
        return mv;
    }


    //授权——获取角色详细信息
    @RequestMapping("/UserManage/userInfoListForApprove")
    @ResponseBody
    public Map<String, Object> userInfoListForApprove(HttpServletRequest request) throws Exception {
        Crypt crypt = new Crypt();
        String EmployeeNum = request.getParameter("EmployeeNum");
        String InstitutionNum = us.getComConEmployeeInstitution(EmployeeNum);
        //String InstitutionName = Is.getInstitutionName(InstitutionNum)[0].get("InstitutionName").toString();
        Map<String, Object> result = new HashMap<>();
        DBo dbo = new DBo();
        List<Map<String, Object>> list = dbo.executeQuery("select * from institution_t where InstitutionNum='" + InstitutionNum + "' and InstitutionPrefix is not null");
        if (list.size() > 0) {
            InstitutionNum = list.get(0).get("InstitutionPrefix").toString();
        }

        Map[] selectCandoModule = us.getCandoModule(InstitutionNum);
        if (selectCandoModule.length == 0) {

            result.put("state", "error");
        } else {
            Map<String, String> List = new HashMap<>();
            List<Map<String, String>> infoList = new ArrayList<Map<String, String>>();
            List.put("InstitutionNum", InstitutionNum);
            //List.put("InstitutionName", InstitutionName);

            //获取该单位所对应的模块列表
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

            Map<String, String> selectedlist = new HashMap<>();
            List<Map<String, String>> selectedModulelist = new ArrayList<Map<String, String>>();
            String txtrole = "";
            //获取用户信息
            Map[] userinfo = us.getUserInfo(EmployeeNum);
            if (userinfo.length > 0) {
                List.put("username", userinfo[0].get("EmployeeName").toString() + "-" + userinfo[0].get("EmployeeID").toString());
                if (userinfo[0].get("UserState").toString().equals("1")) {
                    List.put("userstate", "账号正常");
                } else {
                    List.put("userstate", "账号异常");
                }

                String userRight = userinfo[0].get("UserRight").toString();
                List<Map<String, Object>> SelectedRoleList = us.getRoleList(EmployeeNum);
                for (int m = 0; m < SelectedRoleList.size(); m++) {
                    txtrole += SelectedRoleList.get(m).get("RoleName").toString() + "  ";
                }
                //在列表中显示角色已有的权限
               // Map[] SelectedRoleList = us.getSelectRoleList(EmployeeNum);
                List<Map<String,Object>> InstitutionSelectedModulelist = us.getInstitutionSelectedModulelist(InstitutionNum);
                result.put("InstitutionSelectedModulelist",InstitutionSelectedModulelist);


            /*    for (int m = 0; m < SelectedRoleList.length; m++) {
                    txtrole += SelectedRoleList[m].get("RoleName").toString() + "   ";
                    String RoleRight = SelectedRoleList[m].get("RoleRight").toString();
                    if (!RoleRight.trim().equals("")) {
                        RoleRight = crypt.DESDecrypt(RoleRight.trim(), "shirleyL");
                    }
                    selectedlist.put("RoleRight", RoleRight);
                    selectedModulelist.add(selectedlist);
                    selectedlist = new HashMap<>();

                }

                result.put("RoleSelectedModulelist", selectedModulelist);*/


                if (!userRight.equals(""))//已经设置了额外权限，则显示
                {
                    //获取该角色已经选取的模块列表
                    String UserRight = userinfo[0].get("UserRight").toString();
                    if (!UserRight.trim().equals("")) {
                        UserRight = crypt.DESDecrypt(UserRight.trim(), "shirleyL");
                    }
                    String[] rightarry = UserRight.split(";");
                    for (int i = 0; i < rightarry.length; i++) {
                        selectedlist.put("modulenum", rightarry[i]);
                        selectedModulelist.add(selectedlist);
                        selectedlist = new HashMap<>();
                    }
                }


              /*  if (!userRight.equals(""))//已经设置了额外权限，则显示
                {
                    if (!userRight.trim().equals("")) {
                        userRight = crypt.DESDecrypt(userRight.trim(), "shirleyL");
                    }
                    userselectedlist.put("userRight", userRight);
                    userselectedModulelist.add(userselectedlist);
                }*/
                //result.put("userselectedModulelist", userselectedModulelist);

            }
            List.put("txtrole", txtrole);
            infoList.add(List);

            result.put("state", "success");
            result.put("UserInfoList", infoList);
            result.put("Firstmodulelist", Firstmodulelist);
            result.put("Secondmodulelist", Secondmodulelist);
            result.put("selectedModulelist", selectedModulelist);


        }
        return result;
    }

    //授权页面保存
    @RequestMapping("/UserManage/submitSaveApprove")
    @ResponseBody
    public String submitSaveApprove(HttpServletRequest request) throws Exception {
        Crypt crypt = new Crypt();
        String[] TxtUserNum = request.getParameter("EmployeeID").split("-");
        String EmployeeNum = us.getEmployeeNum(TxtUserNum[1])[0].get("EmployeeNum").toString();
        String InstitutionNum = request.getParameter("InstitutionNum");
        String[] cbList = request.getParameter("cbList").split(",");
        String[] cboList = request.getParameter("cboList").split(",");
        //Map[] userinfo = us.getUserInfo(EmployeeNum);
        //String Right = userinfo[0].get("UserRight").toString();

        //提取角色所负责的模块信息,构造userRight字符串
        String userRight = "";
        String changeCando = "";
        String tempCando = "";//保存当没有额外权限的时候的对模块的操作
        for (int i = 0; i < cbList.length; i++) {
            String opera = "";
            for (int j = 0; j < cboList.length; j++) {
                if (cbList[i].equals(cboList[j])) {
                    opera = "1";
                    tempCando += cboList[j] + "-" + "2" + ";";
                }
            }
            if (opera.equals("")) {
                opera = "0";
            }
            userRight += cbList[i] + "-" + opera + ";";
        }

        String UserRight = "";
        if (userRight != "") {
            UserRight = crypt.DESEncrypt(userRight, "shirleyL");
        } else {
            UserRight = "";
        }

        //更新权限信息
        //DBOperator db = new DBOperator("");
        DBo dbo = new DBo();
        String returntext = dbo.executeUpdate("update UserInfo_t set UserRight='" + UserRight + "' where EmployeeNum='" + EmployeeNum + "'") > 0 ? "success" : "error";
        //db.updateUser(EmployeeNum, InstitutionNum, UserRight, changeCando) > 0 ? "success" : "error";
        return returntext;

        /*//获取模快修改权限的变动
        if (Right != "") {
           *//* DBOperator db = new DBOperator(" select * from UserInfo_T where EmployeeNum='" + EmployeeNum + "'");
            Map[] selectModuleNC = db.executeQuery();
            String Right = selectModuleNC[0].get("UserRight").toString();*//*
            String[] rightarry = {};
            if (!Right.trim().equals("")) {
                Right = crypt.DESDecrypt(Right.trim(), "shirleyL");
                rightarry = Right.split(";");
            }

            if ((!userRight.equals("")) && (userRight.substring(userRight.length() - 1, userRight.length()).equals(";"))) {
                userRight = userRight.substring(0, userRight.length() - 1);
            }
            String[] strRight = userRight.split(";");

            for (int i = 0, j = 0; i < rightarry.length; i++) {
                String moduleNum = rightarry[i].substring(0, 6);
                String Cando = rightarry[i].substring(7, 8);
                if (!strRight[0].equals("") && strRight[0] != null) {
                    for (j = 0; j < strRight.length; j++) {
                        if (moduleNum.equals(strRight[j].substring(0, 6))) {
                            if (!Cando.equals(strRight[j].substring(7, 8))) {
                                if (Cando.equals("1")) {
                                    changeCando += moduleNum + "-1" + ";";
                                } else {
                                    changeCando += moduleNum + "-2" + ";";
                                }
                            }
                            break;
                        }
                    }
                } else {
                    j = 1;
                }
                if (j >= strRight.length) {
                    if (Cando.equals("1")) {
                        changeCando += moduleNum + "-1" + ";";
                    }
                }
            }
            if (!strRight[0].equals("") && strRight[0] != null) {
                for (int i = 0, j = 0; i < strRight.length; i++) {

                    for (j = 0; j < rightarry.length; j++) {
                        String moduleNum = rightarry[j].substring(0, 6);
                        String Cando = rightarry[j].substring(7, 8);
                        if (moduleNum.equals(strRight[i].substring(0, 6))) {
                            if (!Cando.equals(strRight[i].substring(7, 8))) {
                                if (Cando.equals("1")) {
                                    changeCando += moduleNum + "-1" + ";";
                                } else {
                                    changeCando += moduleNum + "-2" + ";";
                                }
                            }
                            break;
                        }
                    }
                    if (j >= rightarry.length) {
                        if (strRight[i].substring(7, 8).equals("1")) {
                            changeCando += strRight[i].substring(0, 6) + "-2" + ";";
                        }
                    }
                }
            }
        } else {
            changeCando = tempCando;
        }
        if (!changeCando.equals("")) {
            changeCando = changeCando.substring(0, changeCando.length() - 1);
        }*/

    }

    //修改页面——信息加载
    @RequestMapping("/UserManage/getTxtUserNumForEdit")
    @ResponseBody
    public Map<String, Object> getTxtUserNumForEdit(HttpServletRequest request, HttpSession session) throws Exception {
        String EmployeeNum = request.getParameter("EmployeeNum").toString();
        Map[] userinfo = us.getUserInfo(EmployeeNum);
        String InstitutionNum = us.getComConEmployeeInstitution(EmployeeNum);
        String userName = session.getAttribute("UserNum").toString();
        Map[] roleSourcelist = us.getRoleList(InstitutionNum, userName);
        Map[] roleTargetlist = us.getSelectRoleList(EmployeeNum);

        Map<String, Object> result = new HashMap<>();
        result.put("userinfo", userinfo);
        result.put("roleSourcelist", roleSourcelist);
        result.put("roleTargetlist", roleTargetlist);
        return result;
    }

    //修改用户界面——保存功能
    @RequestMapping("/UserManage/submitSave")
    @ResponseBody
    public String submitSave(HttpServletRequest request) throws Exception {
        String[] TxtUserNum = request.getParameter("TxtUserNum").split("-");
        String EmployeeNum = us.getEmployeeNum(TxtUserNum[1])[0].get("EmployeeNum").toString();
        String InstitutionNum = us.getComConEmployeeInstitution(EmployeeNum);
        String editType = request.getParameter("editType");
        String[] RoleList = request.getParameter("RoleList").split(",");
        String[] oldRoleList = request.getParameter("oldRoleList").split(",");
        String[] AddedRoleList = request.getParameter("AddedRoleList").split(",");
        String Userstate = request.getParameter("State");
        Boolean flag = false;
        String returntext = "";
        Boolean result = false;     //更新用户信息成功与否
        Crypt crypt = new Crypt();
        //获得抉择所在的机构
        for (int i = 0; i < RoleList.length; i++) {
            String roleID = RoleList[i];
            String roleInstitution = us.getRoleInstitution(roleID);
            if (roleInstitution.equals("")) {
            } else if (!InstitutionNum.equals(roleInstitution)) {
                DBo dbo = new DBo();
                List<Map<String, Object>> list = dbo.executeQuery("select * from institution_t where InstitutionNum='" + InstitutionNum + "' and InstitutionPrefix is not null");
                if (list.size() > 0 && list.get(0).get("InstitutionPrefix").toString().equals(roleInstitution)) {
                } else {
                    flag = true;//发现不一致的机构
                    break;
                }
            }
        }

        if (flag) {
            returntext = "differ";

        } else if (editType.equals("2"))     //没有做任何修改
        {
            returntext = "success";

        } else if (editType.equals("0"))     //增加了某个角色
        {
            for (int i = 0; i < AddedRoleList.length; i++) {

                try {
                    String oldUserRight = crypt.DESDecrypt(us.getUserInfo(EmployeeNum)[0].get("UserRight").toString(), "shirleyL");
                    String newRoleRight = crypt.DESDecrypt(rs.getRoleInfoByID(AddedRoleList[i])[0].get("RoleRight").toString(), "shirleyL");
                    String[] newRoleRightArr = newRoleRight.split(";");
                    for (int j = 0; j < newRoleRightArr.length; j++) {
                        if (!oldUserRight.contains(newRoleRightArr[j].split("-")[0] + "-0") && !oldUserRight.contains(newRoleRightArr[j].split("-")[0] + "-1"))       //原来的用户权限中没有该模块的查看或增删改权限
                        {
                            if(!oldUserRight.equals(""))
                            {
                                if (!oldUserRight.substring(oldUserRight.length() - 1).equals(";")) {
                                    oldUserRight += ";";
                                }
                            }
                            oldUserRight += newRoleRightArr[j] + ";";
                        }
                    }
                    String UserRight = crypt.DESEncrypt(oldUserRight, "shirleyL");
                    if (us.updateUser(Userstate, UserRight, EmployeeNum)) {
                        result = us.insertRoleUser(EmployeeNum, AddedRoleList[i]);
                    }        //更新用户权限和roleuser表
                    if (!result) {
                        UserRight = Crypt.DESEncrypt(oldUserRight, "shirleyL");
                        result = us.updateUser(Userstate, UserRight, EmployeeNum);
                    }
                    if (result) {
                        returntext = "success";

                    } else {
                        returntext = "error";

                    }
                } catch (Exception e) {
                    returntext = "error";

                }
            }
        } else if (editType.equals("1"))     //修改角色，清空用户权限
        {
            //更新用户权限
            try {
                String oldUserRight = crypt.DESDecrypt(us.getUserInfo(EmployeeNum)[0].get("UserRight").toString(), "shirleyL");
                String newRoleRight = crypt.DESDecrypt(rs.getRoleInfoByID(RoleList[0])[0].get("RoleRight").toString(), "shirleyL");
                for (int i = 1; i < RoleList.length; i++) {
                    String[] roleRightArr = Crypt.DESDecrypt(rs.getRoleInfoByID(RoleList[i])[0].get("RoleRight").toString(), "shirleyL").split(";");
                    for (int j = 0; j < roleRightArr.length; j++) {
                        if (!newRoleRight.substring(newRoleRight.length() - 1).equals(";")) {
                            newRoleRight += ";";
                        }
                        if (!newRoleRight.contains(roleRightArr[j])) {
                            newRoleRight += roleRightArr[j] + ";";
                        }
                    }
                }


                //删除原roleuser
                us.deleteRoleUser(EmployeeNum);
                //添加新的角色信息
                for (int i = 0; i < RoleList.length; i++) {
                    us.insertRoleUser(EmployeeNum, RoleList[i]);
                }
                String UserRight = Crypt.DESEncrypt(newRoleRight, "shirleyL");
                result = us.updateUser(Userstate, UserRight, EmployeeNum);
                if (!result) {
                    UserRight = Crypt.DESEncrypt(oldUserRight, "shirleyL");
                    result = us.updateUser(Userstate, UserRight, EmployeeNum);
                }
                if (result) {
                    returntext = "success";

                } else {
                    returntext = "error";

                }
            } catch (Exception e) {
                returntext = "error";

            }

        } else {
            returntext = "error";

        }
        return returntext;

    }


    //密码重置
    @RequestMapping("/UserManage/resetPassword")
    @ResponseBody
    public String resetPassword(HttpServletRequest request) throws Exception {
        String EmployeeNum = request.getParameter("EmployeeNum");
        String returntext = "";
        if (us.setPWD(EmployeeNum)) {
            returntext = "success";

        } else {
            returntext = "error";

        }
        return returntext;
    }


    //修改密码——界面
    @RequestMapping(value = "/UserManage/getUserState")
    @ResponseBody
    public Map<String, Object> ChangePassword_vue(HttpSession session) throws Exception {
        String usernum = session.getAttribute("UserNum").toString();
        DBo dbo = new DBo();
        ModelAndView mv = new ModelAndView();
        String userState = dbo.getString("select UserState from SignatureInfo_T where EmployeeNum='" + usernum + "'", "UserState");
        Map<String, Object> result = new HashMap<>();
        result.put("userState", userState);
        /*if (userSate.equals("1")) {
            mv.setViewName("/SystemMaintenance/UserManage/ChangePasswordAndSign");
        } else {
            mv.setViewName("/SystemMaintenance/UserManage/ChangePassword");
        }*/

        return result;
    }

    //修改密码——信息加载（含签名照）
    @RequestMapping("/UserManage/Info_ChangePWD_1")
    @ResponseBody
    public Map<String, Object> Info_ChangePWD_1(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        String dir = request.getSession().getServletContext().getRealPath("/");
        String usernum = session.getAttribute("UserNum").toString();
        DBo dbo = new DBo();
        String sql = "select * from SignatureInfo_T where EmployeeNum='" + usernum + "' ";
        String photoName = dbo.getString(sql, "SignPath") == null ? "" : dbo.getString(sql, "SignPath");

        String EmployeeID = dbo.getString("select EmployeeID from Employee_t where EmployeeNum = '" + usernum + "'", "EmployeeID");
        String oldPassword = dbo.getString("select Password from userinfo_t where EmployeeNum = '" + usernum + "'", "Password");
        Crypt crypt = new Crypt();
        oldPassword = crypt.DESDecrypt(oldPassword, "shirleyL");

        List<Map<String, Object>> RoleNameList = dbo.executeQuery("select RoleName from roleinfo_t where RoleID in( select RoleID from  roleuserinfo_t  where EmployeeNum ='" + session.getAttribute("UserNum").toString() + "')");
        Map<String, Object> result = new HashMap<>();
        //result.put("path", path);
        result.put("name", photoName);
        result.put("EmployeeID", EmployeeID);
        result.put("EmployeeName", session.getAttribute("UserName").toString());
        result.put("UserInstitutionName", session.getAttribute("UserInstitutionName").toString());
        result.put("RoleNameList", RoleNameList);
        result.put("oldPassword", oldPassword);
        return result;
    }

    //修改密码——信息加载（不含签名照）
    @RequestMapping("/UserManage/Info_ChangePWD_2")
    @ResponseBody
    public Map<String, Object> Info_ChangePWD_2(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {

        String usernum;
        if (request.getParameter("tag").equals("Mobile")) {
            usernum = request.getParameter("UserNum").toString();
        } else {
            usernum = session.getAttribute("UserNum").toString();
        }
        DBo dbo = new DBo();
        String EmployeeID = dbo.getString("select EmployeeID from Employee_t where EmployeeNum = '" + usernum + "'", "EmployeeID");
        String oldPassword = dbo.getString("select Password from userinfo_t where EmployeeNum = '" + usernum + "'", "Password");
        Crypt crypt = new Crypt();
        oldPassword = crypt.DESDecrypt(oldPassword, "shirleyL");
        List<Map<String, Object>> RoleNameList = dbo.executeQuery("select RoleName from roleinfo_t where RoleID in( select RoleID from  roleuserinfo_t  where EmployeeNum ='" + session.getAttribute("UserNum").toString() + "')");

        Map<String, Object> result = new HashMap<>();
        result.put("EmployeeID", EmployeeID);
        result.put("EmployeeName", session.getAttribute("UserName").toString());
        result.put("UserInstitutionName", session.getAttribute("UserInstitutionName").toString());
        result.put("RoleNameList", RoleNameList);
        result.put("oldPassword", oldPassword);
        return result;
    }

    //上传照片
    @RequestMapping("/UserManage/uploadPhoto")
    @ResponseBody
    public Map<String, Object> fileUpload2(@RequestParam("file") CommonsMultipartFile[] file, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        String dir = request.getSession().getServletContext().getRealPath("/");
        String usernum = session.getAttribute("UserNum").toString();
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");

        String originalFileName = file[0].getOriginalFilename();
        String type = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        if (type.equals("PNG")) {
            type = "png";
        } else if (type.equals("JPG")) {
            type = "jpg";
        } else if (type.equals("jpeg")) {
            type = "jpg";
        }
        String photoName = usernum + formatter.format(currentTime) + "." + type;
        String path = dir + "upload/SystemMan/UserMan/SignaturePhoto/" + photoName;
        File newFile = new File(path);
        if (!newFile.getParentFile().exists()) {
            newFile.getParentFile().mkdirs();//如果目录不存在，创建目录
        }
        file[0].transferTo(newFile);


        System.out.println(photoName);

        String sql = "update SignatureInfo_T set SignPath = '" + "upload/SystemMan/UserMan/SignaturePhoto/" + photoName + "',WaterMarkSignPath='" + "upload/SystemMan/UserMan/SignaturePhoto/" + photoName + "'  where EmployeeNum = '" + usernum + "';";
        DBo dbo = new DBo();
        String returntext = dbo.executeUpdate(sql) > 0 ? "success" : "error";


        Map<String, Object> result = new HashMap<>();
        result.put("name", "../../upload/SystemMan/UserMan/SignaturePhoto/" + photoName);
        result.put("text", returntext);
        return result;
    }

    //删除照片
    @RequestMapping("/UserManage/deletePhoto")
    public void deletePhoto(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        String dir = request.getSession().getServletContext().getRealPath("/");
        String usernum = session.getAttribute("UserNum").toString();
        DBo dbo = new DBo();

        String SignPath = dbo.getString("select SignPath from SignatureInfo_T where EmployeeNum = '" + usernum + "'", "SignPath");
        String sql = "update SignatureInfo_T set SignPath = '',WaterMarkSignPath=''  where EmployeeNum = '" + usernum + "';";

        String returntext = dbo.executeUpdate(sql) > 0 ? "success" : "error";
        try {
            File file = new File(dir + "/" + SignPath);
            if (file.exists() && file.isFile()) {
                file.delete();
            }
        } catch (Exception e) {

        }


      /*  String photoName = usernum + formatter.format(currentTime) + "." + type;
        String path = dir + "Image/SystemMan/UserMan/" + photoName;
        File newFile = new File(path);
        if (!newFile.getParentFile().exists()) {
            newFile.getParentFile().mkdirs();//如果目录不存在，创建目录
        }
        file[0].transferTo(newFile);


        System.out.println(photoName);

        String sql = "update SignatureInfo_T set SignPath = '" + "Image/SystemMan/UserMan/" + photoName + "',WaterMarkSignPath='" + "Image/SystemMan/UserMan/" + photoName + "'  where EmployeeNum = '" + usernum + "';";
        DBo dbo = new DBo();
        String returntext = dbo.executeUpdate(sql) > 0 ? "success" : "error";*/

        response.setContentType("charset=utf-8");
        response.getWriter().write(returntext);
    }


    //修改密码——保存功能(含签名照)
    @RequestMapping("/UserManage/Save_ChangePWD_1")
    public void Save(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        Crypt crypt = new Crypt();
        String employeeNum = session.getAttribute("UserNum").toString();
        String newPassword = crypt.DESEncrypt(request.getParameter("pass"), "shirleyL");


      /*  String imageName = request.getParameter("imageName");
        if (!imageName.contains("../../")) {
            imageName += "../../Image/SystemMan/UserMan/" + imageName;
        }*/

        String sql = "update userinfo_t set Password = '" + newPassword + "' where EmployeeNum = '" + employeeNum + "'";
        DBo dbo = new DBo();
        String returntext = dbo.executeUpdate(sql) > 0 ? "success" : "error";
        response.setContentType("charset=utf-8");
        response.getWriter().write(returntext);
    }

    //修改密码——保存功能（不含签名照）
    @RequestMapping("/UserManage/Save_ChangePWD_2")
    @ResponseBody
    public String Save2(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        String employeeNum = "";
        if (!request.getParameter("tag").equals("Mobile")) {
            employeeNum = session.getAttribute("UserNum").toString();
        } else {
            employeeNum = request.getParameter("UserNum");
        }
        String newPassword = SHA1.encode(request.getParameter("pass"));

        String sql = "update userinfo_t set Password = '" + newPassword + "' where EmployeeNum = '" + employeeNum + "'";
        DBo dbo = new DBo();
        String returntext = dbo.executeUpdate(sql) > 0 ? "success" : "error";
//        response.setContentType("charset=utf-8");
//        response.getWriter().write(returntext);
        return returntext;
    }

    DBo dbo = new DBo();

    //获取num
    @RequestMapping("/UserManage/getNum")
    @ResponseBody
    public String getNum(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String ID = request.getParameter("id");
        String sql = "select EmployeeNum  from Employee_t WHERE EmployeeID='" + ID + "'";
        String returntext = dbo.getString(sql, "EmployeeNum");
//        response.setContentType("charset=utf-8");
//        response.getWriter().write(returntext);
        return returntext;
    }

    //获取ID
    @RequestMapping("/UserManage/getID")
    @ResponseBody
    public Map<String, Object> getID(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String usernum;

        usernum = request.getParameter("UserNum").toString();

        String EmployeeID = dbo.getString("select EmployeeID from Employee_t where EmployeeNum = '" + usernum + "'", "EmployeeID");
        String oldPassword = dbo.getString("select Password from userinfo_t where EmployeeNum = '" + usernum + "'", "Password");
        Crypt crypt = new Crypt();
//        oldPassword = crypt.DESDecrypt(oldPassword, "shirleyLshirLeyL");
        List<Map<String, Object>> RoleNameList = dbo.executeQuery("select RoleName from roleinfo_t where RoleID in( select RoleID from  roleuserinfo_t  where EmployeeNum ='" + usernum + "')");
        String RoleName = "";


        for (Map<String, Object> map : RoleNameList) {
            RoleName += map.get("RoleName") + " ";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("EmployeeID", EmployeeID);
        result.put("RoleNameList", RoleName);

//        response.setContentType("charset=utf-8");
//        response.getWriter().write(JSONArray.fromObject(result).toString());
         return result;
    }

}
