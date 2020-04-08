package com.kuangshan.riskcontrol.controller;

import com.alibaba.fastjson.JSONObject;
import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.EmployeeEducationReportT;
import com.kuangshan.riskcontrol.service.EducationTrainService;
import com.kuangshan.riskcontrol.service.EmployeeService;
import com.kuangshan.riskcontrol.service.OnlineEduResourceService;
import com.kuangshan.riskcontrol.service.TestGradeService;
import com.kuangshan.riskcontrol.tool.DBo;
import com.kuangshan.riskcontrol.tool.FileManager;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Pattern;

@Controller
@RequestMapping("TestGradeInfo")
public class TestGradeController {
    @Resource
    TestGradeService tgs;
    @Resource
    private OnlineEduResourceService oers;//在线教育资料service类
    @Resource
    private EducationTrainService ets;//培训service类
    @Resource
    private EmployeeService es;

    @RequestMapping("ManageListVue")
    public ModelAndView TestGradeManageVue(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("TestGradeManage");
        return mv;
    }
    @RequestMapping("/getCategoryList")
    @ResponseBody
    public Map<String, Object> getCategoryList()throws SQLException {
        Map<String, Object> result = new HashMap<>();
        result.put("edu_category_list", oers.getCategory());
        return result;
    }
    @RequestMapping("/getInstitutionList")
    @ResponseBody
    public Map<String, Object> getInstitutionList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("institution_list", ets.getInstitution());
        return result;
    }
    @RequestMapping("getTestList")
    @ResponseBody
    public Map<String, Object> getTestList(){
        Map<String, Object> result = new HashMap<>();
        result.put("test_name_list", tgs.getTestList());
        return result;
    }
    @RequestMapping("/getEmployeeList")
    @ResponseBody
    public Map<String, Object> getEmployeeList()throws SQLException {
        Map<String, Object> result = new HashMap<>();
        result.put("employee_list", es.getEmployeeList());
        return result;
    }

    @RequestMapping("getEmployeeListByInstitutionNum")
    @ResponseBody
    public Map<String, Object> getEmployeeListByInstitutionNum(@RequestParam("institution_num")String institution_num){
        Map<String, Object> result = new HashMap<>();
        result.put("employee_list", es.getEmployeeByInstitutionNum(institution_num));
        return result;
    }

    @RequestMapping("getList")
    @ResponseBody
    public Map<String, Object> getManageList(@RequestParam(value = "conditions",defaultValue = "",required = false)String condition,@RequestParam(value = "pageindex",defaultValue = "",required = false)String pageindex)throws SQLException {
        Map<String, Object> result = new HashMap<>();
        if(StringUtils.isNotBlank(condition)){
            condition = "where "+condition;
        }
        int pagenum = 0;
        int topageindex = Integer.parseInt(pageindex);
        List<Map<String, Object>> list = tgs.getList(condition,topageindex);
        pagenum = tgs.getListPageNum(condition);
        //String employee_num = session.getAttribute("UserNum").toString();
        //System.out.println("employee_num:"+employee_num);
        /*result.put("list", list);
        List<Map<String, Object>> first_roll = new ArrayList<>();*/
        //获取第一个考试的成绩名单
        if(list.size()>0){
            /*System.out.println("first_name:"+list.get(0).get("test_name").toString());
            first_roll = tgs.getGradeRollByTestName(list.get(0).get("test_name").toString());*/
            for(Map m : list){
                /*m.put("is_set", false);//设置为不可编辑*/
                if(m.get("score_mode").toString().equals("0")){//百分制
                    if(Float.parseFloat(m.get("score").toString())>60){
                        m.put("test_result","1");
                    }else {
                        if(m.get("makeup_grade")!=null &&Float.parseFloat(m.get("makeup_grade").toString())>60){
                            m.put("test_result","1");
                        }else {
                            m.put("test_result","0");
                        }
                    }
                }else {//二分制+五分制
                    if(Float.parseFloat(m.get("score").toString())>0){
                        m.put("test_result","1");
                    }else {
                        if(m.get("makeup_grade")!=null &&Float.parseFloat(m.get("makeup_grade").toString())>0){
                            m.put("test_result","1");
                        }else {
                            m.put("test_result","0");
                        }
                    }
                }
            }
        }
        pagenum= pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        result.put("list",list);
        result.put("pagenum",pagenum);
        return result;
    }

    //根据考试名称获取考试成绩名单
    @RequestMapping("getRollData")
    @ResponseBody
    public Map<String, Object> getRollData(@RequestParam("test_name")String test_name, HttpServletResponse response)throws SQLException{
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> roll_data = tgs.getGradeRollByTestName(test_name);
        for(Map m : roll_data){
            m.put("is_set", false);//设置为不可编辑
            if(m.get("score_mode").equals("0")){//百分制
                if(Float.parseFloat(m.get("score").toString())>60.0f){
                    m.put("test_result","通过");
                }else {
                    if(m.get("makeup_grade")!=null &&Float.parseFloat(m.get("makeup_grade").toString())>60.0f){
                        m.put("test_result","通过");
                    }else {
                        m.put("test_result","不通过");
                    }
                }
            }else if(m.get("score_mode").equals("1")){//二分制

            }else {//五分制

            }
        }
        result.put("roll_data", roll_data);
        return result;
    }

    //根据考试名称导出成绩
    @RequestMapping("export")
    public void export(@RequestParam("id_list")String id_list,@RequestParam("conditions")String conditions,@RequestParam("exportconditions")String exportconditions,HttpServletResponse response)throws SQLException{
        String secondRow = "";
        DBo db = new DBo();
        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }
        secondRow = exportconditions;
        System.out.print("exportconditions:"+exportconditions);
        List<Map<String, Object>> roll = new ArrayList<>();
        try {
            if (StringUtils.isNotBlank(id_list)) {
                roll = db.executeQuery("select employee_edu_report_id,edu_category_id,edu_category_name,EmployeeID,employee_num,EmployeeName,test_id,test_name,test_address,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time,score,makeup_grade,score_mode,InstitutionNum,InstitutionName,DDItemValue from employee_education_report_institution_category_view where employee_edu_report_id in (" + id_list + ")");
            } else {
                roll = tgs.getList(conditions, 0);
                if (!StringUtils.isNotBlank(secondRow)) {
                    secondRow = "";
                }
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        for(Map<String, Object> r : roll){
            if(r.get("score_mode").toString().equals("0")){
                r.put("score_mode_name","百分制");
                //进行分数的等价替换
                if(r.get("score")!=null){
                    r.put("score_format",r.get("score").toString());
                }else {
                    r.put("score_format","");
                }
                if(r.get("makeup_grade")!=null){
                    r.put("makeup_grade_format",r.get("makeup_grade").toString());
                }else {
                    r.put("makeup_grade_format","");
                }

            }else if(r.get("score_mode").toString().equals("1")){
                r.put("score_mode_name","二分制");
                if(r.get("score")!=null){
                    r.put("score_format",r.get("score").toString().equals("0.0")?"不及格":"及格");
                }else {
                    r.put("score_format","");
                }
                if(r.get("makeup_grade")!=null){
                    r.put("makeup_grade_format",r.get("makeup_grade").toString().equals("0.0")?"不及格":"及格");
                }else {
                    r.put("makeup_grade_format","");
                }
            }else {
                r.put("score_mode_name","五分制");
                if(r.get("score")!=null){
                    r.put("score_format",getFiveScoreName(r.get("score").toString()));
                }else {
                    r.put("score_format","");
                }
                if(r.get("makeup_grade")!=null){
                    r.put("makeup_grade_format",getFiveScoreName(r.get("makeup_grade").toString()));
                }else {
                    r.put("makeup_grade_format","");
                }
            }
        }
        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("考试名称", "test_name");
        columnHead.put("培训类型", "edu_category_name");
        columnHead.put("员工编号", "EmployeeID");
        columnHead.put("员工姓名", "EmployeeName");
        columnHead.put("所在机构", "InstitutionName");
        columnHead.put("公司职位", "DDItemValue");
        columnHead.put("考试地点", "test_address");
        columnHead.put("考试开始时间", "test_start_time");
        columnHead.put("考试结束时间", "test_end_time");
        columnHead.put("考试成绩", "score_format");
        columnHead.put("补考成绩", "makeup_grade_format");
        columnHead.put("计分方式", "score_mode_name");
        try {
            FileManager.ExportToExcel("考试成绩单_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), "考试成绩单", secondRow, columnHead, roll, response);
            //导出未完成
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    //根据分数获取所在分制表示
    public String getFiveScoreName(String score){
        String score_format = "";
        if(score.equals("0.0")){
            score_format = "不及格";
        }else if(score.equals("1.0")){
            score_format = "及格";
        }else if(score.equals("2.0")){
            score_format = "中";
        }else if(score.equals("3.0")){
            score_format = "良";
        }else{
            score_format = "优";
        }
        return score_format;
    }
    //修改某条记录[某员工的成绩]
    @RequestMapping("editRow")
    @ResponseBody
    public String editRow(@RequestParam("test_name")String test_name, @RequestParam("employee_num")String employee_num,@RequestParam("score")String score,@RequestParam(value = "makeup_grade", defaultValue = "",required = false)String makeup_grade)throws SQLException{
        BigDecimal score_t = new BigDecimal(score);
        String returntext = "";
        if(StringUtils.isNotBlank(makeup_grade)){
            BigDecimal makeup_grade_t = new BigDecimal(makeup_grade);
            returntext = tgs.editRow(test_name,employee_num,score_t,makeup_grade_t)?"success":"error";
        }else {
            returntext = tgs.editRow1(test_name,employee_num,score_t)?"success":"error";
        }
        return returntext;
    }

    //添加公司外组织的考试成绩信息
    @RequestMapping("submitAdd")
    @ResponseBody
    public String submitAddGrade(@RequestParam("formdata")String formdata){
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        EmployeeEducationReportT eert = (EmployeeEducationReportT) JSONObject.toJavaObject(jsonObject, EmployeeEducationReportT.class);//json对象转换为javabean对象
        String returntext = "";
        returntext = tgs.submitAddGrade(eert)?"success":"error";
        return returntext;
    }

    //获取考试成绩信息
    @RequestMapping("getDetail")
    @ResponseBody
    public Map<String, Object> getDetail(@RequestParam("employee_edu_report_id")String id, @RequestParam("conditions")String conditions, @RequestParam("pageindex")String pageindex)throws SQLException{
            if(StringUtils.isNotBlank(conditions)){
                conditions = " where " +conditions;
            }
            return tgs.getDetail(Integer.parseInt(id),conditions,Integer.parseInt(pageindex));
    }

    //获取考试成绩信息修改
    @RequestMapping("getEdit")
    @ResponseBody
    public Map<String, Object> getEdit(@RequestParam("employee_edu_report_id")String id)throws SQLException{
        Map<String, Object> result = new HashMap<>();
        Map<String,Object> editForm = tgs.getEmployeeGradeByID(Integer.parseInt(id));
        if(editForm.get("score_mode").toString().equals("0")){
            editForm.put("score_mode_name"," 百分制");
        }else if(editForm.get("score_mode").toString().equals("1")){
            editForm.put("score_mode_name"," 二分制");
        }else {
            editForm.put("score_mode_name"," 五分制");
        }
        result.put("list", editForm);
        return result;
    }
    //修改考试成绩信息
    @RequestMapping("submitEdit")
    @ResponseBody
    public String submitEditGrade(@RequestParam("formdata")String formdata){
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        EmployeeEducationReportT eert = (EmployeeEducationReportT) JSONObject.toJavaObject(jsonObject, EmployeeEducationReportT.class);//json对象转换为javabean对象
        String returntext = "";
        returntext = tgs.submitEditGrade(eert)?"success":"error";
        return returntext;
    }

    //删除员工考试成绩信息
    @RequestMapping("submitDelete")
    @ResponseBody
    public String submitDeleteGrade(@RequestParam("id_list")String id_list){

        List<String> list = Arrays.asList(id_list.split(","));
        String returntext = "";
        returntext = tgs.submitDeleteGrade(list)?"success":"error";
        return returntext;
    }

    //下载模板表
    @RequestMapping("download")
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response){
        String dir = request.getSession().getServletContext().getRealPath("/");
        DataInputStream in = null;
        OutputStream out = null;
        try {
            response.reset();// 清空输出流

            String resultFileName = "考试成绩模板表" + ".xlsx";
            resultFileName = URLEncoder.encode(resultFileName, "UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-disposition", "attachment; filename=" + resultFileName);// 设定输出文件头
            response.setContentType("application/msexcel");// 定义输出类型
            //输入流：本地文件路径
            in = new DataInputStream(
                    new FileInputStream(new File(dir + "ftl/" + "考试成绩模板表.xlsx")));
            //输出流
            out = response.getOutputStream();
            //输出文件
            int bytes = 0;
            byte[] bufferOut = new byte[1024];
            while ((bytes = in.read(bufferOut)) != -1) {
                out.write(bufferOut, 0, bytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.reset();
        } finally {
            if (null != in) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != out) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    //上传文件
    @RequestMapping("JustifyUploadFile")
    @ResponseBody
    public Map<String, Object> JustifyUploadFile(HttpServletRequest request, @RequestParam("file")MultipartFile file){
        String returntext = "";
        Map<String, Object> result = new HashMap<>();
        try {
            request.setCharacterEncoding("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //进行文件格式的验证:有一个不符合要求则进行提示"填写数据有问题"
        HashMap<String, ArrayList<String[]>> hashMap = null;
        try {
            hashMap = analysisFile(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        ArrayList<String[]> arrayList = hashMap.get("OK");
        if(arrayList == null){//空表
            result.put("result","error");
            return result;
        }
        //验证员工编号是否符合规定
        for (int i=0;i<arrayList.size();i++){
            //判断0，1，2，4，5，6，7，8是否为空（为空进行提示）
            System.out.print("length:"+arrayList.get(i).length);
            for(int j=0;j<arrayList.get(i).length-1;j++){
                if(!StringUtils.isNotBlank(arrayList.get(i)[j])){//现在还没有判断是否为“非法字符”“未知类型”
                    switch (j){
                        case 0:returntext = "id_null";break;
                        case 1:returntext = "name_null";break;
                        case 2:returntext = "test_name_null";break;
                        case 4:returntext = "address_null";break;
                        case 5:returntext = "start_time_null";break;
                        case 6:returntext = "end_time_null";break;
                        case 7:returntext = "mode_null";break;
                        case 8:returntext = "score_null";break;
                    }
                }
            }
            if(StringUtils.isNotBlank(returntext)){
                return result;
            }
            //员工编号规则验证
            String pattern = "^[a-zA-Z]\\d{5}$";//员工编号规则：字母（首）+5位数字
            boolean ID_isMatch = Pattern.matches(pattern, arrayList.get(i)[0]);
            if(!ID_isMatch){
                returntext = "id_error";
                result.put("result",returntext);
                return result;
            }else {
                //根据员工ID获取员工num
                Map<String, Object> employee = tgs.getEmployeeNumByID(arrayList.get(i)[0]);
                if(employee.get("EmployeeName").toString().equals(arrayList.get(i)[1])){
                    arrayList.get(i)[0] = employee.get("EmployeeNum").toString();//arrayList最后一列给employee_num
                }else {
                    result.put("result","name_no_id");
                    return result;
                }
            }
            //培训类型如果填写则需要验证是否为已有类型;
            List<EducationCategoryT> categories = tgs.getCategories();
            boolean category_flag = false;
            for (int k=0;k<categories.size();k++){
                if(StringUtils.isNotBlank(arrayList.get(i)[3])){
                    if(arrayList.get(i)[3].equals(categories.get(k).getEdu_category_name())){
                        category_flag = true;
                        arrayList.get(i)[3] = categories.get(k).getEdu_category_id().toString();//arrayList倒数第二列给edu_category_id
                        break;
                    }
                }else {
                    arrayList.get(i)[3] = "0";
                }
            }
            if(!category_flag){
                result.put("result","category_none_exit");
                return result;
            }
            //验证考试开始和结束时间是否满足格式要求
            String time_pattern = "^[1-9]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\\s+(20|21|22|23|[0-1]\\d):[0-5]\\d$";
            if(!Pattern.matches(time_pattern, arrayList.get(i)[5])){
                result.put("result","start_time_error");
                return result;
            }else {
                arrayList.get(i)[5] = arrayList.get(i)[5] + ":00";
            }
            if(!Pattern.matches(time_pattern, arrayList.get(i)[6])){
                result.put("result","end_time_error");
                return result;
            }else {
                arrayList.get(i)[6] = arrayList.get(i)[6] + ":00";
            }
            //验证计分方式是否为三种之一
            if(!(arrayList.get(i)[7].equals("百分制")||arrayList.get(i)[7].equals("二分制")||arrayList.get(i)[7].equals("五分制"))){
                result.put("result","mode_error");
                return result;
            }else {
                //验证计分方式是否与考试成绩表示一致
                if(arrayList.get(i)[7].equals("百分制")){
                    arrayList.get(i)[7] = "0";//倒数第三列给score_mode
                    String score_pattern = "^(0|[1-9][0-9]?|100)(\\.[0-9])?$";
                    boolean score_isMatch = Pattern.matches(score_pattern, arrayList.get(i)[8]);
                    boolean makeup_isMatch = true;
                    if(StringUtils.isNotBlank(arrayList.get(i)[9])){
                        makeup_isMatch = Pattern.matches(score_pattern, arrayList.get(i)[9]);
                    }else {
                        arrayList.get(i)[9] = "";
                    }
                    if(!score_isMatch){
                        result.put("result","score_error");
                        return result;
                    }else {
                        arrayList.get(i)[8] = arrayList.get(i)[8];
                    }
                    if(!makeup_isMatch){
                        result.put("result","makeup_error");
                        arrayList.get(i)[9] = arrayList.get(i)[9];
                        return result;
                    }
                }else if(arrayList.get(i)[7].equals("二分制")){
                    arrayList.get(i)[7] = "1";
                    if(!(arrayList.get(i)[8].equals("不及格")||arrayList.get(i)[8].equals("及格"))){
                        result.put("result","score_error");
                        return result;
                    }else if(arrayList.get(i)[8].equals("不及格")){
                        arrayList.get(i)[8] = "0";
                    }else {
                        arrayList.get(i)[8] = "1";
                    }
                    if(StringUtils.isNotBlank(arrayList.get(i)[9])){
                        if(!(arrayList.get(i)[9].equals("不及格")||arrayList.get(i)[9].equals("及格"))){
                            result.put("result","makeup_error");
                            return result;
                        }else if(arrayList.get(i)[9].equals("不及格")){
                            arrayList.get(i)[9] = "0";
                        }else {
                            arrayList.get(i)[9] = "1";
                        }
                    }else {
                        arrayList.get(i)[9] = "";
                    }
                }else {
                    arrayList.get(i)[7] = "2";
                    if(!(arrayList.get(i)[8].equals("不及格")||arrayList.get(i)[8].equals("及格")||arrayList.get(i)[8].equals("中")||arrayList.get(i)[8].equals("良")||arrayList.get(i)[8].equals("优"))){
                        result.put("result","score_error");
                        return result;
                    }else if(arrayList.get(i)[8].equals("不及格")){
                        arrayList.get(i)[8] = "0";
                    }else if(arrayList.get(i)[8].equals("及格")){
                        arrayList.get(i)[8] = "1";
                    }else if(arrayList.get(i)[8].equals("中")){
                        arrayList.get(i)[8] = "2";
                    }else if(arrayList.get(i)[8].equals("良")){
                        arrayList.get(i)[8] = "3";
                    }else {
                        arrayList.get(i)[8] = "4";
                    }
                    if(StringUtils.isNotBlank(arrayList.get(i)[9])){
                        if(!(arrayList.get(i)[9].equals("不及格")||arrayList.get(i)[9].equals("及格")||arrayList.get(i)[9].equals("中")||arrayList.get(i)[9].equals("良")||arrayList.get(i)[9].equals("优"))){
                            result.put("result","makeup_error");
                            return result;
                        }else if(arrayList.get(i)[9].equals("不及格")){
                            arrayList.get(i)[9] = "0";
                        }else if(arrayList.get(i)[9].equals("及格")){
                            arrayList.get(i)[9] = "1";
                        }else if(arrayList.get(i)[9].equals("中")){
                            arrayList.get(i)[9] = "2";
                        }else if(arrayList.get(i)[9].equals("良")){
                            arrayList.get(i)[9] = "3";
                        }else {
                            arrayList.get(i)[9] = "4";
                        }
                    }else {
                        arrayList.get(i)[9] = "";
                    }
                }
            }
        }
        if(!StringUtils.isNotBlank(returntext)){//如果returntext为空，说明上传的文件格式全部正确
            //导入数据
            try {
                returntext = tgs.insertMulGrade(arrayList)?"success":"error";
            } catch (SQLException e) {
                e.printStackTrace();
            }
            result.put("returntext",returntext);
        }

        return result;
    }


    //解析excel文件
    public static HashMap<String, ArrayList<String[]>> analysisFile(MultipartFile file) throws IOException {
        HashMap<String, ArrayList<String[]>> hashMap = new HashMap<>();
        //获取workbook对象
        Workbook workbook = null;
        String filename = file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();
        //根据后缀名是否excel文件
        if(filename.endsWith("xls")){
            //2003
            workbook = new HSSFWorkbook(inputStream);
        }else if(filename.endsWith("xlsx")){
            //2007
            workbook = new XSSFWorkbook(inputStream);
        }

        //创建对象，把每一行作为一个String数组，所以数组存到集合中
        ArrayList<String[]> arrayList = new ArrayList<>();
        if(workbook != null){
            //循环sheet,现在是单sheet
            for(int sheetNum = 0;sheetNum < workbook.getNumberOfSheets();sheetNum++){
                //获取第一个sheet
                Sheet sheet = workbook.getSheetAt(sheetNum);
                if(sheet == null){//空sheet
                    hashMap.put("文件sheet为空!",arrayList);
                    return hashMap;
                }
                //获取当前sheet开始行和结束行
                int firstRowNum = sheet.getFirstRowNum();
                int lastRowNum = sheet.getLastRowNum();

                //循环开始，除了前两行
                for(int rowNum = firstRowNum + 1;rowNum <= lastRowNum;rowNum++){
                    //获取当前行
                    Row row = sheet.getRow(rowNum);
                    //获取当前行的开始列和结束列
                    short firstCellNum = row.getFirstCellNum();
                    short lastCellNum = row.getLastCellNum();
                    if(lastCellNum-firstCellNum<9){
                        lastCellNum = 9;
                    }
                    //获取总行数
                    int lastCellNum2 = row.getPhysicalNumberOfCells();
                    System.out.println("firstCellNum:"+firstCellNum+";lastCellNum:"+lastCellNum);
                    if(lastCellNum2<10){
                        lastCellNum2 = 10;
                    }
                    String[] strings = new String[lastCellNum2];
                    //循环当前行
                    for(int cellNum = firstCellNum;cellNum < lastCellNum;cellNum++){
                        Cell cell = row.getCell(cellNum);
                        boolean blank_flag = false;//单元格不为空
                        if( cell == null || "".equals(cell) ||cell.getCellType()==CellType.BLANK){
                            /*hashMap.put("第"+(rowNum+1)+"行,第"+(cellNum+1)+"列为空",arrayList);
                            return hashMap;*/
                            blank_flag = true;
                        }
                        String  cellValue = "";
                        cellValue = blank_flag?"":getCellValue(cell);
                        strings[cellNum] = cellValue;
                    }
                    arrayList.add(strings);

                }
            }
        }
        inputStream.close();
        hashMap.put("OK",arrayList);
        return hashMap;
    }
    //把每一个cell转换为string
    public static String getCellValue(Cell cell){
        String cellValue = "";
        if(cell == null){
            return cellValue;
        }
        //把数字转换成string，防止12.0这种情况
        if(cell.getCellType() == CellType.NUMERIC){
            cell.setCellType(CellType.STRING);
        }
        //判断数据的类型
        switch (cell.getCellType()) {
            case NUMERIC: //数字0
                cellValue = String.valueOf(cell.getNumericCellValue());
                break;
            case STRING: //字符串1
                cellValue = String.valueOf(cell.getStringCellValue());
                break;
            case BOOLEAN: //Boolean
                cellValue = String.valueOf(cell.getBooleanCellValue());
                break;
            case FORMULA: //公式
                //cellValue = String.valueOf(cell.getCellFormula());
                try {
                    cellValue = String.valueOf(cell.getNumericCellValue());
                } catch (IllegalStateException e) {
                    cellValue = String.valueOf(cell.getRichStringCellValue());
                }
                break;
            case BLANK: //空值
                cellValue = "";
                break;
            case ERROR: //故障
                cellValue = "非法字符";
                break;
            default:
                cellValue = "未知类型";
                break;
        }
        return cellValue;
    }
    public static boolean isValidDate(String str) {
        boolean convertSuccess=true;
        // 指定日期格式为四位年/两位月份/两位日期，注意yyyy/MM/dd区分大小写；
        SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        try {
            //设置lenient为false. 否则SimpleDateFormat会比较宽松地验证日期，比如2007/02/29会被接受，并转换成2007/03/01
            format.setLenient(true);
            format.parse(str);
            System.out.println("date:"+format.parse(str));
        } catch (ParseException e) {
            // 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
            convertSuccess=false;
        }
        return convertSuccess;
    }
}
