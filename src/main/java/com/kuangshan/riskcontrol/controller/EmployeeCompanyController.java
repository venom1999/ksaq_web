package com.kuangshan.riskcontrol.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kuangshan.riskcontrol.model.EmployeeInstitutionDatadictionaryview;
import com.kuangshan.riskcontrol.model.EmployeeT;
import com.kuangshan.riskcontrol.service.EmployeeService;
import com.kuangshan.riskcontrol.tool.AES;
import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.DBo;
import com.kuangshan.riskcontrol.tool.FileManager;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;
import com.kuangshan.riskcontrol.tool.RequestParam;
@Controller
@RequestMapping("/EmployeeManagement")
public class EmployeeCompanyController {
    DBo dBo = new DBo();
    @Resource
    private EmployeeService es;

    private String key = "shirleyLshirleyL";

    //公司员工管理主页面
    @RequestMapping(value = "/EmployeeMan/EmployeeList_vue")
    public ModelAndView showEmployeeList() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/EmployeeManagement/EmployeeMan/EmployeeCompanyMan");
        return mv;
    }

    //绑定数据
    @RequestMapping("/EmployeeMan/getInfoList")
    @ResponseBody
    public Map<String, Object> getInfoList() {
        DBOperator db = new DBOperator("");
        Map[] InstitutionList = db.getTableByProc("Institution_Proc");            /*绑定机构编号*/
        /*db = new DBOperator("");
        Map[] CurrentWorkList = db.getOneItemByName("CurrentWorkNum");            //绑定当前工种编号*/
        db = new DBOperator("");
        Map[] WorkStyle = db.getOneItemByName("WorkStyleNum");                    //绑定用工形式
        db = new DBOperator("");
        Map[] WorkPosition = db.getOneItemByName("WorkPositionNum");              //绑定当前岗位
        /*db = new DBOperator("");
        Map[] WorkType = db.getOneItemByName("WorkTypeNum");                      //绑定员工职务*/
        Map<String, Object> result = new HashMap<>();
        result.put("InstitutionList", InstitutionList);
       // result.put("CurrentWorkList", CurrentWorkList);
        result.put("WorkStyle", WorkStyle);
        result.put("WorkPosition", WorkPosition);
        //result.put("WorkType", WorkType);
        return result;
    }

    //主界面——绑定机构数据
    @RequestMapping("/EmployeeMan/EmployeeList")
    @ResponseBody
    public Map<String, Object> EmployeeList(@RequestParam(value = "conditions", required = false, defaultValue = "") String conditions, @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex, HttpSession session) throws Exception {
        String username = session.getAttribute("UserNum").toString();
        String UserInstitution = session.getAttribute("UserInstitution").toString();
        List<Map<String,Object>> institutionLevel = dBo.executeQuery("select * from institution_t where InstitutionNum='"+UserInstitution+"'");
        String requirement = "";
        //默认条件：只显示本部门及本部门下属机构的员工
        if(institutionLevel.size()>0)
        {
            if(institutionLevel.get(0).get("InstitutionCategoryNum").equals(4))
            {
                requirement ="(InstitutionNum = '" +UserInstitution +"' or InstitutionPrefix= '"+UserInstitution+"')";
            }
            else if(institutionLevel.get(0).get("InstitutionCategoryNum").equals(5))
            {
                requirement ="(InstitutionNum = '"+UserInstitution+"' and InstitutionPrefix= '"+institutionLevel.get(0).get("InstitutionPrefix").toString()+"')";
            }
        }


        if (StringUtils.isNotBlank(conditions)) {
            if(requirement.equals(""))
            {
                conditions = " where " + conditions;
            }
            else
            {
                conditions = " where " + conditions +" and "+ requirement;
            }
        }
        else if(!requirement.equals(""))
        {
            conditions =" where "+requirement;
        }
        List<EmployeeInstitutionDatadictionaryview> employeeList = es.getEmployeeInfo(conditions,pageindex);
        //解密
        for (EmployeeInstitutionDatadictionaryview e : employeeList){
            e.setEmployeeBirth(AES.Decrypt(e.getEmployeeBirth(), key));
            e.setEmployeeIDNum(AES.Decrypt(e.getEmployeeIDNum(), key));
            e.setEmployeeTel(AES.Decrypt(e.getEmployeeTel(), key));
        }
        List<EmployeeInstitutionDatadictionaryview> allList = es.getAll(conditions);
        for (EmployeeInstitutionDatadictionaryview e : allList){
            e.setEmployeeBirth(AES.Decrypt(e.getEmployeeBirth(), key));
            e.setEmployeeIDNum(AES.Decrypt(e.getEmployeeIDNum(), key));
            e.setEmployeeTel(AES.Decrypt(e.getEmployeeTel(), key));
        }
        int count =es.getEmployeeInfoNum(conditions);

    /*    Map[] employeeList = es.getAllEmployeeInfo(conditions, pageindex, username, Institution);
        Map[] allemployeeList =es.getAllEmployee(conditions);
        int pagenum ;
        if(allemployeeList==null)
        {
            pagenum=0;
        }
        else
        {
            pagenum= allemployeeList.length % 10 == 0 ? allemployeeList.length / 10 : allemployeeList.length / 10 + 1;
        }*/
        //int pagenum = es.getEmployeeListPageNum(conditions, username, Institution);
        Map<String, Object> result = new HashMap<>();
        result.put("employeeList", employeeList);
        result.put("allEmployeeList", allList);
        result.put("pagenum", count);
        return result;
    }

    //上传照片
    @RequestMapping("/EmployeeMan/uploadPhoto")
    @ResponseBody
    public Map<String, Object> fileUpload2(@RequestParam("file") CommonsMultipartFile[] file, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String dir = request.getSession().getServletContext().getRealPath("/");
        Random random = new Random();
        Date currentTime = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String photoName = formatter.format(currentTime) + random.nextInt(1000) + file[0].getOriginalFilename();
        if (photoName.split("\\.")[1].equals("PNG")) {
            photoName = photoName.split("\\.")[0] + ".png";
        } else if (photoName.split("\\.")[1].equals("JPG")) {
            photoName = photoName.split("\\.")[0] + ".jpg";
        } else if (photoName.split("\\.")[1].equals("jpeg")) {
            photoName = photoName.split("\\.")[0] + ".jpg";
        }
        String path = dir + "EmployeePhoto/" + photoName;
        File newFile = new File(path);
        if (!newFile.getParentFile().exists()) {
            newFile.getParentFile().mkdirs();//如果目录不存在，创建目录
        }
        file[0].transferTo(newFile);

        System.out.println(photoName);
        Map<String, Object> result = new HashMap<>();
        result.put("name", photoName);
        result.put("text", "success");
        return result;
    }

    //验证员工编号是否唯一
    @RequestMapping("/EmployeeMan/IsEmployeeNumExist")
    @ResponseBody
    public Map<String, Object> IsEmployeeNumExist(HttpServletRequest request) throws Exception {
        String EmployeeID = request.getParameter("EmployeeID").toString();
        String returntext = "";
        DBOperator db = new DBOperator("select employeeNum from employee_t where employeeID='" + EmployeeID + "' union select  employeeNum from Contractoremployee_t where employeeID='" + EmployeeID + "'");
        if (db.executeQuery().length > 0) {
            returntext = "error";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("result", returntext);
        return result;
    }

    //添加员工
    @RequestMapping("/EmployeeMan/submitAdd")
    @ResponseBody
    public Map<String, Object> submitAdd(@RequestBody EmployeeT record, HttpServletResponse response) throws Exception {
        /*SimpleDateFormat sdf = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss z", java.util.Locale.US);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String EmployeeID = request.getParameter("EmployeeID");
        String EmployeeName = request.getParameter("EmployeeName");
        String EmployeeSex = request.getParameter("EmployeeSex");
        String EmployeeIDNum = request.getParameter("EmployeeIDNum");
        java.sql.Date EmployeeBirth = new java.sql.Date(formatter.parse(request.getParameter("EmployeeBirth") + " 00:00:00").getTime());
        String EmployeeTel = request.getParameter("EmployeeTel");
        String InstitutionNum = request.getParameter("InstitutionNum");
        java.sql.Date JoinCompanyDate = new java.sql.Date(formatter.parse(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(sdf.parse(request.getParameter("JoinCompanyDate").replace("GMT", "").replaceAll("\\(.*\\)", ""))).equals("") ? "1970-01-01" : new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(sdf.parse(request.getParameter("JoinCompanyDate").replace("GMT", "").replaceAll("\\(.*\\)", "")))).getTime());
        String OnState = request.getParameter("OnState");
        //int CurrentWorkNum = request.getParameter("CurrentWorkNum").equals("") ? 0 : Integer.parseInt(request.getParameter("CurrentWorkNum"));
        //int WorkType = request.getParameter("WorkType").equals("") ? 0 : Integer.parseInt(request.getParameter("WorkType"));
        int WorkPositionNum = request.getParameter("WorkPositionNum").equals("") ? 0 : Integer.parseInt(request.getParameter("WorkPositionNum"));
        int WorkStyleNum = request.getParameter("WorkStyleNum").equals("") ? 0 : Integer.parseInt(request.getParameter("WorkStyleNum"));
        //String OutCompanyOrNot = request.getParameter("OutCompanyOrNot");
        java.sql.Date OutCompanyDate = new java.sql.Date(formatter.parse("1970-01-01 00:00:00").getTime());
        java.sql.Date InStationDate = new java.sql.Date(formatter.parse("1970-01-01 00:00:00").getTime());
        java.sql.Date OutStationDate = new java.sql.Date(formatter.parse("1970-01-01 00:00:00").getTime());
        java.sql.Date InsuredTime = new java.sql.Date(formatter.parse("1970-01-01 00:00:00").getTime());
        String InsuranceNum = "";
        String HomeAddress = request.getParameter("HomeAddress");
        //String imageName = request.getParameter("imageUrl");
        String imageName = request.getParameter("imageName");
        String threeEdu = request.getParameter("ThreeFlag");
        DBo dbo =new DBo();
        String employeeNumMax=dbo.getString("select max(CAST(EmployeeNum as int)) employeeNum  from Employee_t ","employeeNum");
        String newEmployeeNum= String.valueOf( Integer.parseInt(employeeNumMax)+1);
        String sql="insert into employee_t(employeeNum,EmployeeID,employeeName,employeeSex,employeeBirth,Photo,EmployeeIDNum," +
        "EmployeeTel,InstitutionNum,CurrentWorkNum,WorkStyleNum,WorkPositionNum,InStationDate,OutStationDate,WorkType," +
        "HomeAddress,JoinCompanyDate,OutCompanyDate,Onstate,OutCompanyOrNot,InsuranceNum,InsuredTime,IsRetire,RetireTime) \n" +
        "\tvalues('"+newEmployeeNum+"','"+EmployeeID+"','"+EmployeeName+"','"+EmployeeSex+"','"+EmployeeBirth+"','"+imageName+"','"+EmployeeIDNum+"','"+EmployeeTel+"'," +
        "'"+InstitutionNum+"','"+0+"','"+WorkStyleNum+"','"+WorkPositionNum+"','"+"1970-01-01 00:00:00"+"','"+"1970-01-01 00:00:00"+"','"+0+"','"+HomeAddress+"','"+JoinCompanyDate+"','"+OutCompanyDate+"'," +
        "'"+OnState+"','0','','"+"1970-01-01 00:00:00"+"','0','"+"1970-01-01 00:00:00"+"');\n";
        String returntext=dbo.executeUpdate(sql) > 0 ? "success" : "error";

       *//* DBOperator db = new DBOperator("");
        String returntext = db.insertEmployee(EmployeeID, EmployeeName, EmployeeSex, EmployeeBirth, imageName, EmployeeIDNum, EmployeeTel, InstitutionNum,
                0, WorkStyleNum, WorkPositionNum, InStationDate, OutStationDate, 0, HomeAddress, JoinCompanyDate,
                OutCompanyDate, OnState, InsuranceNum, InsuredTime, threeEdu) > 0 ? "success" : "error";*/
        String returntext = "";
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            DBo dbo =new DBo();
            String employeeNumMax=dbo.getString("select max(CAST(EmployeeNum as int)) employeeNum  from Employee_t ","employeeNum");
            String newEmployeeNum= String.valueOf( Integer.parseInt(employeeNumMax)+1);
            record.setEmployeeNum(newEmployeeNum);
            java.sql.Date outCompanyDate = new java.sql.Date(formatter.parse("1970-01-01 00:00:00").getTime());
            record.setOutCompanyDate(outCompanyDate);
            java.sql.Date retireTime = new java.sql.Date(formatter.parse("1970-01-01 00:00:00").getTime());
            record.setRetireTime(retireTime);
            //加密
            record.setEmployeeBirth(AES.Encrypt(record.getEmployeeBirth(), key));
            record.setEmployeeIDNum(AES.Encrypt(record.getEmployeeIDNum(), key));
            record.setEmployeeTel(AES.Encrypt(record.getEmployeeTel(), key));

            returntext = es.submitAddEmployeeInfo(record)?"success":"error";

        } catch (Exception e) {
            e.printStackTrace();
        }
        Map<String,Object> result = new HashMap<>();
        result.put("result", returntext);
        return result;
    }

    //修改员工——加载信息
    @RequestMapping(value = "/EmployeeMan/getInfoForEdit", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getInfoForEdit(HttpServletRequest request)throws Exception {
        String employeeNum = request.getParameter("employeeNum");
        List<Map<String, Object>> EmployeeList = es.getEmployeeDetailByView(employeeNum);
        Map<String, Object> result = new HashMap<>();
        if(EmployeeList.size()>0){
            Map<String, Object> employee = EmployeeList.get(0);
            employee.put("EmployeeIDNum", AES.Decrypt(employee.get("EmployeeIDNum").toString(), key));
            employee.put("EmployeeTel", AES.Decrypt(employee.get("EmployeeTel").toString(), key));
            employee.put("EmployeeBirth", AES.Decrypt(employee.get("EmployeeBirth").toString(), key));
            result.put("EmployeeList", employee);
        }
        return result;
    }

    //修改员工——判断是否有对应的用户
    @RequestMapping("/EmployeeMan/SelectUser")
    @ResponseBody
    public Map<String, Object> SelectUser(HttpServletRequest request) throws Exception {
        String EmployeeID = request.getParameter("EmployeeID");

        String sql = "select * from userinfo_t where EmployeeNum  in (select EmployeeNum from employee_t where EmployeeID='"+EmployeeID+"')";
        DBOperator db = new DBOperator(sql);
        String returntext = "";
        if (db.executeQuery().length > 0) {
            returntext = "yes";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("result", returntext);
        return result;
    }

    //修改员工
    @RequestMapping("/EmployeeMan/submitSave")
    @ResponseBody
    public Map<String, Object> submitSave(@RequestBody EmployeeT record) throws Exception {
        record.setEmployeeTel(AES.Encrypt(record.getEmployeeTel(), key));
        record.setEmployeeIDNum(AES.Encrypt(record.getEmployeeIDNum(), key));
        record.setEmployeeBirth(AES.Encrypt(record.getEmployeeBirth(), key));
        String returntext = es.submitEditEmployeeInfo(record)?"success":"error";
        Map<String, Object> result = new HashMap<>();
        result.put("result", returntext);
        return result;
    }

    //详细
    @RequestMapping("/EmployeeMan/getInfoForDetail")
    @ResponseBody
    public Map<String, Object> getInfoForDetail(HttpServletRequest request) throws Exception{
        String EmployeeNum = request.getParameter("EmployeeNum");
        List<Map<String,Object>> EmployeeList = es.getEmployeeDetailByView(EmployeeNum);
        Map<String, Object> result = new HashMap<>();
        if(EmployeeList.size()>0){
            Map<String, Object> employee = EmployeeList.get(0);
            employee.put("EmployeeIDNum", AES.Decrypt(employee.get("EmployeeIDNum").toString(), key));
            employee.put("EmployeeTel", AES.Decrypt(employee.get("EmployeeTel").toString(), key));
            employee.put("EmployeeBirth", AES.Decrypt(employee.get("EmployeeBirth").toString(), key));
            result.put("EmployeeList", employee);
        }
        return result;
    }

    //证书
    @RequestMapping("/EmployeeMan/getCertificate")
    @ResponseBody
    public Map<String, Object> getCertificate(HttpServletRequest request) {
        String EmployeeNum = request.getParameter("EmployeeNum");
        String EmployeeName = request.getParameter("EmployeeName");
        Map<String, Object> result = new HashMap<>();
        //特种作业人员
        Map[] special = es.getTableSp(EmployeeName);
        DBOperator db;
        if(special.length>0)
        {
            result.put("specialSum",special.length);
            String sql= "select * from ComConEmployee_View where EmployeeNum ='" + special[0].get("UploadPerson").toString() + "'";
            db=new DBOperator(sql);
            Map[] file=db.executeQuery();
            String specialID=file[0].get("SpecialID").toString();
            String filename = file[0].get("seluploadfilename").toString();
            result.put("specialList",special);
        }
        else
        {
           result.put("specialSum",0);
        }

        //showSpecialDetail();

        //安全管理人员
        Map[] security = es.getTableSe(EmployeeNum);
        if(security.length>0)
        {
            result.put("securitySum",security.length);
            result.put("securityList",security);
        }
        else
        {
            result.put("securitySum",0);
        }
        //showDetail();
        return result;
    }

    //导出
    @RequestMapping("/EmployeeMan/Export")
    public void export0(String conditions, String exportsconditions,HttpServletRequest request,HttpServletResponse response) throws Exception{


        String sql="";
        if(conditions.equals("")){
            sql= "select *,row_number() over(order by employeeNum) rn  from  employee_institution_datadictionaryView";
        }
        else{
            sql= "select *,row_number() over(order by employeeNum) rn  from employee_institution_datadictionaryView where "+conditions;

        }
        String secondRow = exportsconditions;
        Map[] list=new DBOperator(sql).executeQuery();
        for(int i = 0;i<list.length;i++){
            /*System.out.println("info1:"+list[i].get("EmployeeNum")+";"+list[i].get("EmployeeName"));
            System.out.println("info:"+list[i].get("EmployeeIDNum")+";"+list[i].get("EmployeeTel")+";"+list[i].get("EmployeeBirth"));*/
            if(list[i].get("EmployeeIDNum")!=null){
                list[i].put("EmployeeIDNum", AES.Decrypt(list[i].get("EmployeeIDNum").toString(),"shirleyLshirleyL"));
            }
            if(list[i].get("EmployeeTel")!=null){
                list[i].put("EmployeeTel", AES.Decrypt(list[i].get("EmployeeTel").toString(),"shirleyLshirleyL"));
            }
            if(list[i].get("EmployeeBirth")!=null){
                list[i].put("EmployeeBirth", AES.Decrypt(list[i].get("EmployeeBirth").toString(),"shirleyLshirleyL"));
            }
        }
        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("员工编号", "EmployeeID");
        columnHead.put("员工姓名", "EmployeeName");
        columnHead.put("员工性别", "EmployeeSex");
        columnHead.put("出生日期", "EmployeeBirth");
        columnHead.put("员工身份证号", "EmployeeIDNum");
        columnHead.put("员工电话", "EmployeeTel");
        columnHead.put("机构名称", "InstitutionName");
        columnHead.put("家庭地址", "HomeAddress");
        columnHead.put("进公司日期", "JoinCompanyDate");
        columnHead.put("在岗状态", "Onstate");
        //columnHead.put("当前工种", "CurrentWorkValue");
        columnHead.put("当前岗位", "WorkPositionValue");
        columnHead.put("用工形式", "WorkStyleValue");
        //columnHead.put("员工职务", "workTypevalue");
        columnHead.put("离职否", "OutCompanyOrNot");
        columnHead.put("离职时间", "OutCompanyDate");
        columnHead.put("退休否", "IsRetire");
        columnHead.put("退休时间", "RetireTime");

        try {
            es.export("公司员工基本信息_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), "公司员工基本信息", secondRow, columnHead, list, response);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    //获取员工证书信息
    @RequestMapping("/EmployeeMan/getInfoForCertificate")
    @ResponseBody
    public Map<String, Object> getInfoDetailSpecialEquip(@RequestParam("EmployeeNum")String employeenum)throws SQLException{
        System.out.println("getInfoForCertificate:");
        List<Map<String, Object>> specialequip = es.getSpecialEquip(employeenum);
        List<Map<String, Object>> specialman = es.getSpecialMan(employeenum);
        List<Map<String, Object>> securityman = es.getSecurityMan(employeenum);
        Map<String, Object> val = new HashMap<>();
        int certificatenums = 0;
        if(specialequip.size()>0){
            certificatenums += 1;
            val.put("specialequip", specialequip);
            val.put("specialequipnum", specialequip.size());
        }else {
            val.put("specialequip",null);
            val.put("specialequipnum", 0);
        }
        if(specialman.size()>0){
            certificatenums += 1;
            val.put("specialman", specialman);
            val.put("specialmannum", specialman.size());
        }else {
            val.put("specialman",null);
            val.put("specialmannum", 0);
        }
        if(securityman.size()>0){
            certificatenums += 1;
            val.put("securityman", securityman);
            val.put("securitymannum", securityman.size());
        }else {
            val.put("securityman",null);
            val.put("securitymannum", 0);
        }
        val.put("certificatenums", certificatenums);
        return val;
    }
}
