package com.kuangshan.riskcontrol.controller;

import com.alibaba.fastjson.JSONObject;
import com.kuangshan.riskcontrol.model.EducationInfoT;
import com.kuangshan.riskcontrol.model.RollEducationT;
import com.kuangshan.riskcontrol.service.EducationTrainService;
import com.kuangshan.riskcontrol.service.OnlineEduResourceService;
import com.kuangshan.riskcontrol.tool.DBo;
import com.kuangshan.riskcontrol.tool.FileManager;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("EducationTrain")
public class EducationTrainController {
    @Resource
    private EducationTrainService ets;//培训明细service类
    @Resource
    private OnlineEduResourceService oers;//在线教育资料service类

    @RequestMapping("/ManageListVue")
    public ModelAndView EducationTrainManageVue(){
        ModelAndView mv = new ModelAndView();
        /*mv.setViewName("EducationTrainManage");*/
        mv.setViewName("EducationTrainManage");
        return mv;
    }

    @RequestMapping("/getCategoryList")
    @ResponseBody
    public Map<String, Object> getCategoryList()throws SQLException {
        Map<String, Object> result = new HashMap<>();
        result.put("categorylist", oers.getCategory());
        return result;
    }

    @RequestMapping("/getInstitutionList")
    @ResponseBody
    public Map<String, Object> getInstitutionList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("institutionlist", ets.getInstitution());
        return result;
    }

    @RequestMapping("/getResourceList")
    @ResponseBody
    public Map<String, Object> getRessourceList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("resourcelist", ets.getResource());
        return result;
    }

    @RequestMapping("/getList")
    @ResponseBody
    public Map<String, Object> getEduTrainList(@RequestParam(value = "pageindex", required = false, defaultValue = "1") String pageindex, @RequestParam(value = "conditions", required = false, defaultValue = "")String conditions)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = "where" + conditions;
        }
        System.out.println("condition:"+conditions+";pageindex:"+pageindex);
        List<Map<String, Object>> list = new ArrayList<>();
        int pagenum = 0;
        int topageindex = Integer.parseInt(pageindex);
        if(ets.getList(conditions, topageindex).size()>0){
            list = ets.getList(conditions, topageindex);
        }
        pagenum = ets.getListPageNum(conditions);
        pagenum= pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }

    @RequestMapping("/submitAdd")
    @ResponseBody
    public String AddEducationTain(@RequestParam("formdata") String formdata){
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        EducationInfoT eit = (EducationInfoT) JSONObject.toJavaObject(jsonObject,EducationInfoT.class);//json对象转换为javabean对象
        String returntext = "";
        Date current = new Date();
        if(current.after(eit.getEnd_time())){//超过培训截止时间：培训结束
            eit.setIs_finished(1);
        }else {
            eit.setIs_finished(0);
        }
        returntext = ets.addEducationTrain(eit)?"success":"error";
        return returntext;
    }

    @RequestMapping("/getDetail")
    @ResponseBody
    public Map<String, Object> getDetailEducationTrain(@RequestParam("education_id")String id, @RequestParam("conditions")String conditions, @RequestParam("pageindex")String pageindex)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where " +conditions;
        }
        return ets.getDetail(Integer.parseInt(id),conditions,Integer.parseInt(pageindex));
    }
    //判断是否已经报名
    @RequestMapping("isEnrolled")
    @ResponseBody
    public String isEnrolled(@RequestParam("education_id")String education_id){
        String returntext = "";
        returntext = ets.isEnrolled(Integer.parseInt(education_id))?"success":"error";
        return returntext;
    }
    @RequestMapping("/getEdit")
    @ResponseBody
    public Map<String, Object> getEdit(@RequestParam("education_id")String id){
        Map<String, Object> education = new HashMap<>();
        try {
            education = ets.getEducationTrainByID(Integer.parseInt(id));
        }catch (SQLException e){
            e.printStackTrace();
        }
        return education;
    }

    @RequestMapping("/submitEdit")
    @ResponseBody
    public String SubmitEditEducationTrain(@RequestParam("formdata")String formdata){
        String returntext = "";
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        EducationInfoT eit = (EducationInfoT) JSONObject.toJavaObject(jsonObject,EducationInfoT.class);//json对象转换为javabean对象
        returntext = ets.submitEditEducationTrain(eit)?"success":"error";
        return returntext;
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String deleteEducationTrain(@RequestParam("id_list")String idlist){
        String returntext = "";
        String[] ids = idlist.split(",");
        List<String> resultList = new ArrayList<>(ids.length);
        for (String s : ids) {
            System.out.println("s:"+s);
            resultList.add(s);
        }

        if(ets.isMulReleased(resultList)){//判断培训是否已经发布
            returntext = "error1";
        }else if(ets.isHaveTest(resultList)){//判断培训是否已经绑定考试
            returntext = "error2";
        }else {
            //删除培训明细且删除培训的报名人员名单
            returntext = ets.deleteEducationTrain(resultList)?"success":"error";
            if(returntext == "success"){
                ets.deleteEnterForm(resultList);
            }
        }
        return returntext;
    }

    @RequestMapping("/export")
    @ResponseBody
    public void exportEducationTrain(@RequestParam("id_list")String id_list, @RequestParam("conditions")String conditions, @RequestParam("exportconditions")String exportconditions, HttpServletResponse response){
        String secondRow = null;
        DBo db = new DBo();

        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }
        secondRow = exportconditions;
        List<Map<String, Object>> list = null;
        try {
            if (StringUtils.isNotBlank(id_list)) {
                list = db.executeQuery("select education_id,education_num,education_name,InstitutionName,edu_category_name,education_content,CONVERT(varchar(100), start_time, 23) as start_time,CONVERT(varchar(100), end_time, 23) as end_time, education_address from education_info_category_institution_view where education_id in (" + id_list + ")");
            } else {
                list = ets.getList(conditions, 0);
                if (!StringUtils.isNotBlank(secondRow)) {
                    secondRow = "";
                }
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("培训编号", "education_num");
        columnHead.put("培训名称", "education_name");
        columnHead.put("培训类型", "edu_category_name");
        columnHead.put("机构名称", "InstitutionName");
        columnHead.put("培训内容","education_content");
        columnHead.put("培训起始时间","start_time");
        columnHead.put("培训终止时间","end_time");
        columnHead.put("培训地点", "education_address");
        try {
            FileManager.ExportToExcel("培训明细信息_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), "培训明细信息", secondRow, columnHead, list, response);
            //导出未完成
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    //获取已参加培训名单
    @RequestMapping("/getEnteredRoll")
    @ResponseBody
    public Map<String, Object> getEnteredRoll(@RequestParam("education_id")String education_id)throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("roll",ets.getTrainRoll(Integer.parseInt(education_id)));
        result.put("is_start",ets.isTrainStart(Integer.parseInt(education_id)));
        result.put("is_released",ets.isReleased(Integer.parseInt(education_id)));
        return result;
    }
    //获取未参与培训名单
    @RequestMapping("/getNotEnterRoll")
    @ResponseBody
    public Map<String, Object> getNotEnterRoll(@RequestParam("institution_list")String institution_num_list, @RequestParam("education_id")String education_id)throws SQLException{
        Map<String, Object> result = new HashMap<>();
        String condition = "";
        System.out.println("institution_num:"+institution_num_list);
        //institution_num_list = institution_num_list.substring(1,institution_num_list.length()-1);
        if(StringUtils.isNotBlank(institution_num_list)&&!institution_num_list.equals("[]")){
            institution_num_list = institution_num_list.substring(1,institution_num_list.length()-1);
            institution_num_list = institution_num_list.replace("\"","\'");
            condition = "where InstitutionNum in ("+institution_num_list+") or InstitutionPrefix in ("+institution_num_list+")";
            //condition = "and "+condition;
        }
        System.out.println("condition:"+condition);
        result.put("notroll",ets.getNotTrainRoll(condition,Integer.parseInt(education_id)));
        return result;
    }
    //添加培训员工
    @RequestMapping("/addEmployee")
    @ResponseBody
    public String addEmployee(@RequestParam("education_id")String education_id, @RequestParam("employee_num")String employee_num_list)throws SQLException{
        String returntext = "";
        /*RollEducationT ret = new RollEducationT();
        ret.setEducation_id(Integer.parseInt(education_id));
        ret.setEmployee_num(employee_num);*/
        String[] employee_num = employee_num_list.split(",");//获取所有需要添加的员工编号
        String insertstr = "";
        for (int i=0;i<employee_num.length-1;i++){
            insertstr += "("+employee_num[i]+","+education_id+",0,0),";
        }
        insertstr += "("+employee_num[employee_num.length-1]+","+education_id+",0,0)";
        System.out.println("str:"+insertstr);
        returntext = ets.addEmployee(insertstr)?"success":"error";
        return returntext;
    }

    //修改预设培训人数
    @RequestMapping("/setEmployeeNumber")
    @ResponseBody
    public String setEmployeeNumber(@RequestParam("employee_number")String employee_number,@RequestParam("education_id")String education_id)throws SQLException {
        String returntext = "";
        returntext = ets.setEmployeeNumber(Integer.parseInt(employee_number), Integer.parseInt(education_id))?"success":"error";
        return returntext;
    }

    //从报名名单中删除选入员工
    @RequestMapping("/deleteEmployee")
    @ResponseBody
    public String deleteEmployee(@RequestParam("id_list")String id_list)throws SQLException{
        String returntext = "";
        List<String> list = Arrays.asList(id_list.split(","));
        returntext = ets.deleteMulEmployee(list)?"success":"error";
        return returntext;
    }
    //单项发布
    @RequestMapping("/setIsReleased")
    @ResponseBody
    public String setIsReleased(@RequestParam("education_id")String id)throws SQLException{
        String returntext = "";
        returntext = ets.setIsReleased(Integer.parseInt(id))?"success":"error";
        return returntext;
    }
    //多项发布
    @RequestMapping("/setMulReleased")
    @ResponseBody
    public String setMulReleased(@RequestParam("id_list")String id_list)throws SQLException{
        String returntext = "";
        List<String> list = Arrays.asList(id_list.split(","));
        returntext = ets.setMulReleased(list)?"success":"error";
        return returntext;
    }
    //设置培训终止，不再继续为之添加考试
    @RequestMapping("setFinished")
    @ResponseBody
    public String setFinished(@RequestParam("id_list")String id_list){
        String returntext = "";
        List<String> list = Arrays.asList(id_list.split(","));
        returntext = ets.setMulFinished(list)?"success":"error";
        return returntext;
    }
    //培训信息公告主页面
    @RequestMapping("/NoticeListVue")
    public ModelAndView EducationTrainNoticeVue(HttpServletRequest request){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("EducationTrainNotice");
        return mv;
    }

    @RequestMapping("/getNoticeList")
    @ResponseBody
    public Map<String, Object> getEduTrainNoticeList(@RequestParam(value = "pageindex", required = false, defaultValue = "1") String pageindex, @RequestParam(value = "conditions", required = false, defaultValue = "")String conditions)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where is_released = '1' and start_time>getdate() and " + conditions;
        }else {
            conditions = " where is_released = '1' and start_time>getdate() ";
        }
        List<Map<String, Object>> list = new ArrayList<>();
        int pagenum = 0;
        int topageindex = Integer.parseInt(pageindex);
        if(ets.getList(conditions, topageindex).size()>0){
            list = ets.getList(conditions, topageindex);
        }
        pagenum = ets.getListPageNum(conditions);
        pagenum= pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }

    @RequestMapping("/getNoticeDetail")
    @ResponseBody
    public Map<String, Object> getNoticeDetailEducationTrain(@RequestParam("education_id")String id, @RequestParam("conditions")String conditions, @RequestParam("pageindex")String pageindex)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where is_released = '1' and start_time>getdate() and " +conditions;
        }else {
            conditions = " where is_released = '1' and start_time>getdate()";
        }
        return ets.getDetail(Integer.parseInt(id),conditions,Integer.parseInt(pageindex));
    }

    //判断是否报名人数已满
    @RequestMapping("/isFull")
    @ResponseBody
    public String isFull(@RequestParam("education_id") String id){
        String returntext = "";
        returntext = ets.isFull(Integer.parseInt(id))?"success":"error";
        return returntext;
    }
    //判断培训是否已经开始，已经开始不能报名
    @RequestMapping("/isTrainStart")
    @ResponseBody
    public String isTrainStart(@RequestParam("education_id")String education_id)throws SQLException{
        String returntext = "";
        returntext = ets.isTrainStart(Integer.parseInt(education_id))?"success":"error";
        return returntext;
    }
    //个人报名
    @RequestMapping("/enterSingle")
    @ResponseBody
    public String enterSingle(HttpSession session, @RequestParam("education_id")String education_id)throws SQLException{
        String returntext = "";
        String employee_num = session.getAttribute("UserNum").toString();
        System.out.println("employee_num:"+employee_num);
        if(ets.isFull(Integer.parseInt(education_id))){
            returntext = "error2";//名额已满
        }else {
            //报名之前先判断是否已经报名
            if(ets.isEnter(Integer.parseInt(education_id),employee_num)){
                returntext = "error1";
            }else {
                RollEducationT record = new RollEducationT();
                record.setEducation_id(Integer.parseInt(education_id));
                record.setEmployee_num(employee_num);
                record.setIs_finished(0);
                returntext = ets.addSingleEmployee(record)?"success":"error";
            }
        }
        return returntext;
    }

    /*@RequestMapping("getEnterRecord")
    @ResponseBody
    public Map<String,Object> getEnterRecords(HttpSession session){
        String employee_num = session.getAttribute("UserNum").toString();
        Map<String, Object> result = new HashMap<>();
        return result;
    }*/

    @RequestMapping("/printEmployee")
    @ResponseBody
    public void printEmployee(@RequestParam("education_id")String education_id, HttpServletResponse response)throws SQLException{
        Integer id = Integer.parseInt(education_id);
        List<Map<String, Object>> roll = new ArrayList<>();
        roll = ets.getTrainRoll(Integer.parseInt(education_id));
        String secondRow = "";
        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("所属机构", "InstitutionName");
        columnHead.put("员工编号", "EmployeeID");
        columnHead.put("员工姓名", "EmployeeName");
        columnHead.put("员工性别", "EmployeeSex");
        columnHead.put("员工职务","WorkPositionValue");
        try {
            FileManager.ExportToExcel("培训名单_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), "培训报名名单", secondRow, columnHead, roll, response);
            //导出未完成
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
