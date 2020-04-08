package com.kuangshan.riskcontrol.controller;

import com.alibaba.fastjson.JSONObject;
import com.kuangshan.riskcontrol.model.TestInfoT;
import com.kuangshan.riskcontrol.service.EducationTrainService;
import com.kuangshan.riskcontrol.service.OnlineEduResourceService;
import com.kuangshan.riskcontrol.service.TestInfoService;
import com.kuangshan.riskcontrol.tool.AES;
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
import java.sql.SQLException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("TestInfo")
public class TestInfoController {

    @Resource
    private TestInfoService tis;
    @Resource
    private OnlineEduResourceService oers;//在线教育资料service类
    @Resource
    private EducationTrainService ets;//培训service类

    @RequestMapping("/ManageListVue")
    public ModelAndView ListVue(){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("TestInfoManage");
        return mav;
    }

    @RequestMapping("/getCategoryList")
    @ResponseBody
    public Map<String, Object> getCategoryList()throws SQLException {
        Map<String, Object> result = new HashMap<>();
        result.put("categorylist", oers.getCategory());
        return result;
    }

    @RequestMapping("/getEducationList")
    @ResponseBody
    public Map<String, Object> getEducationList()throws SQLException {
        Map<String, Object> result = new HashMap<>();
        result.put("educationlist", tis.getEducation());
        return result;
    }

    @RequestMapping("/getInstitutionList")
    @ResponseBody
    public Map<String, Object> getInstitutionList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("institutionlist", ets.getInstitution());
        return result;
    }

    @RequestMapping("/getPositionList")
    @ResponseBody
    public Map<String, Object> getPositionList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("positionlist",ets.getPosition());
        return result;
    }

    @RequestMapping("/getList")
    @ResponseBody
    public Map<String, Object> getList(@RequestParam(value = "pageindex", required = false, defaultValue = "1") String pageindex, @RequestParam(value = "conditions", required = false, defaultValue = "")String conditions)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = "where" + conditions;
        }
        List<Map<String, Object>> list = new ArrayList<>();
        int pagenum = 0;
        int topageindex = Integer.parseInt(pageindex);
        list = tis.getList(conditions, topageindex);//测试这有没有异常？？？
        pagenum = tis.getListPageNum(conditions);
        pagenum= pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }
    //添加考试信息
    @RequestMapping("/submitAdd")
    @ResponseBody
    public String addSubmit(@RequestParam("formdata")String formdata)throws Exception{
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        TestInfoT tit = (TestInfoT) JSONObject.toJavaObject(jsonObject,TestInfoT.class);//json对象转换为javabean对象
        String returntext = "";
        tit.setIs_submitted(0);
        returntext = tis.insert(tit)?"success":"error";
        System.out.println("education_id of added information:"+tit.getEducation_id());
        if(tit.getEducation_id()!=0&&returntext.equals("success")){//考试绑定培训且添加此条考试记录成功
            //设置培训信息表中is_finished=1
            boolean set_flag = ets.setIsFinishedByID(tit.getEducation_id());
            System.out.println("the result of train that is finished:"+set_flag);
            //获取添加的考试id
            //获取数据库中此时考试信息ID最大的记录id
            Integer last_id = tis.getLastTestID();
            System.out.println("just added_test_id:"+last_id);
            if(tit.getTest_type().equals("1")){//正常考试
                //考试教育名单中设置test_id
                if(ets.setTestID(last_id,tit.getEducation_id())){//考试信息表中对应的培训记录中设置了考试id
                    if(tit.getIs_online().equals("1")){//机考:设置考生密码
                        if(!tis.setExamineePwd(last_id,tit.getEducation_id())){
                            returntext = "error";//存在密码设置不成功的情况（此时并非所有的密码都设置了）
                        }
                    }
                }
            }
        }
        return returntext;
    }
    //单项发布
    @RequestMapping("/setIsReleased")
    @ResponseBody
    public String setIsReleased(@RequestParam("test_id")String id)throws SQLException{
        String returntext = "";
        returntext = tis.setIsReleased(Integer.parseInt(id))?"success":"error";
        return returntext;
    }
    //多项发布
    @RequestMapping("/setMulReleased")
    @ResponseBody
    public String setMulReleased(@RequestParam("id_list")String id_list)throws SQLException{
        String returntext = "";
        List<String> list = Arrays.asList(id_list.split(","));
        returntext = tis.setMulReleased(list)?"success":"error";
        return returntext;
    }
    //删除考试信息前的判断
    @RequestMapping("/preDelete")
    @ResponseBody
    public Map<String, Object> deleteTest(@RequestParam("id_list")String id_list){
        String returntext = "";
        List<Map<String, Object>> returntestlist = new ArrayList<>();
        Map<String, Object> result = new HashMap<>();
        String[] ids = id_list.split(",");
        List<String> resultList = new ArrayList<>(ids.length);
        for (String s : ids) {
            resultList.add(s);
        }
        //获取即将删除的考试信息的信息
        List<Map<String, Object>> multest = tis.getMulInfoByIDlist(resultList);
        for (int i=0;i<multest.size();i++){
            Map<String, Object> test = multest.get(i);
            Integer test_id = Integer.parseInt(test.get("test_id").toString());
            if(test.get("is_online").equals("1")){//机考
                //比较时间
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                ParsePosition pos = new ParsePosition(0);
                /*System.out.println("test_start_time:"+test.get("test_start_time")+";test_end_time:"+test.get("test_end_time"));*/
                Date test_start_time = formatter.parse(test.get("test_start_time").toString(), pos);
                ParsePosition pos1 = new ParsePosition(0);
                Date test_end_time = formatter.parse(test.get("test_end_time").toString(), pos1);
                String dateString = formatter.format(new Date());
                ParsePosition pos2 = new ParsePosition(0);
                Date current_time = formatter.parse(dateString, pos2);
                System.out.println("test_start_time:"+test_start_time+"test_end_time:"+test_end_time+"current_time:"+current_time);
                if(current_time.before(test_start_time)){//系统时间小于考试开始时间
                    returntext = "before";
                }else if(current_time.before(test_end_time)&&current_time.after(test_start_time)){//系统时间介于考试开始时间和考试结束时间
                    returntext = "between";
                }else {//系统时间大于考试结束时间：考试结束
                    //判断是考试还是补考
                    if(test.get("test_type").equals("1")){//正常考试
                        if(test.get("is_submitted").equals("0")){//成绩未提交
                            returntext = "nosubmit";
                        }else {//成绩已提交
                            try {
                                //int related_test_id = tis.getRelatedTestIDByTID(test_id);
                                List<Map<String, Object>> makeuproll = tis.getMakeUpEnroll(test_id);
                                if(makeuproll.size()>0){//存在补考名单
                                    returntext = "makeup";
                                }else {//考试成绩全部合格的
                                    returntext = "allpass";
                                }
                            } catch (SQLException e) {
                                e.printStackTrace();
                            }
                        }
                    }else {//补考
                        if(test.get("is_submitted").equals("0")){//成绩未提交
                            returntext = "makeupnosubmit";
                        }else {
                            returntext = "makeupsubmit";
                        }
                    }
                }
            }else {//非机考
                if(test.get("test_type").equals("1")) {//正常考试
                    if(test.get("is_submitted").equals("0")){//成绩未提交
                        returntext = "unonline_nosubmit";
                    }else {//成绩已提交
                        try {
                            List<Map<String, Object>> makeuproll = tis.getMakeUpEnroll(test_id);
                            if(makeuproll.size()>0){//存在补考名单
                                returntext = "unonline_makeup";
                            }else {//考试成绩全部合格的
                                returntext = "unonline_allpass";
                            }
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                    }
                }else {//补考
                    if(test.get("is_submitted").equals("0")){//成绩未提交
                        returntext = "unonline_makeupnosubmit";
                    }else {
                        returntext = "unonlne_makeupsubmit";
                    }
                }
            }
            Map<String, Object> temp = new HashMap<>();
            temp.put("returntext",returntext);
            temp.put("test_id",test_id);
            temp.put("test_name",test.get("test_name").toString());
            returntestlist.add(temp);
        }
        result.put("returnlist", returntestlist);
        return result;
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String deleteMulTest(@RequestParam("id_list")String id_list) {
        String returntext = "";
        List<Map<String, Object>> returntestlist = new ArrayList<>();
        Map<String, Object> result = new HashMap<>();
        String[] ids = id_list.split(",");
        List<String> resultList = new ArrayList<>(ids.length);
        for (String s : ids) {
            resultList.add(s);
        }
        //获取即将删除的考试信息的信息
        List<Map<String, Object>> multest = tis.getMulInfoByIDlist(resultList);
        for (int i=0;i<multest.size();i++){
            Map<String, Object> test = multest.get(i);
            Integer test_id = Integer.parseInt(test.get("test_id").toString());
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            ParsePosition pos = new ParsePosition(0);
            /*System.out.println("test_start_time:"+test.get("test_start_time")+";test_end_time:"+test.get("test_end_time"));*/
            Date test_start_time = formatter.parse(test.get("test_start_time").toString(), pos);
            ParsePosition pos1 = new ParsePosition(0);
            Date test_end_time = formatter.parse(test.get("test_end_time").toString(), pos1);
            String dateString = formatter.format(new Date());
            ParsePosition pos2 = new ParsePosition(0);
            Date current_time = formatter.parse(dateString, pos2);
            System.out.println("test_start_time:"+test_start_time+"test_end_time:"+test_end_time+"current_time:"+current_time);
            if(current_time.before(test_start_time)){//系统时间小于考试开始时间
                tis.deleteOneTest(test_id);//删除考试信息
                tis.cleanRollInfo(test_id);//清除与此考试有关的报名员工
                tis.deleteTestPaperInfo(test_id);//删除此考试已经生成的试卷
                tis.cleanEducationFinished(test_id);//如果绑定培训，设置培训is_finished=0
                returntext = "success";
            }else {
                returntext = "after";
            }
        }
        return returntext;
    }

    //删除考试信息
    @RequestMapping("/deleteTestInfo")
    @ResponseBody
    public String deleteTestInfo(@RequestParam("test_id")String test_id){
        String returntext = "";
        returntext = tis.deleteOneTest(Integer.parseInt(test_id))?"success":"error";
        return returntext;
    }
    //删除考试和其补考


    //报名表中进行清除
    @RequestMapping("/cleanRollInfo")
    @ResponseBody
    public String cleanRollInfo(@RequestParam("test_id")String test_id){
        String returntext = "success";
        //报名表中进行清除工作：如果绑定培训，则清空test_id,examinee_pwd；未绑定培训直接删除所有报名信息
        tis.cleanRollInfo(Integer.parseInt(test_id));
        return returntext;
    }

    //删除为此考试组卷信息
    @RequestMapping("/deleteTestPaperInfo")
    @ResponseBody
    public String deleteTestPaperInfo(@RequestParam("test_id")String test_id){
        String returntext = "success";
        tis.deleteTestPaperInfo(Integer.parseInt(test_id));
        return returntext;
    }

    //删除此考试的答题情况
    @RequestMapping("/deleteTestScoreInfo")
    @ResponseBody
    public String deleteTestScoreInfo(@RequestParam("test_id")String test_id){
        String returntext = "success";
        tis.deleteTestScoreInfo(Integer.parseInt(test_id));
        return returntext;
    }

    //成绩表中进行删除
    @RequestMapping("/updateGradeInfo")
    @ResponseBody
    public String updateGradeInfo(@RequestParam("test_id")String test_id){
        String returntext = "success";
        returntext = tis.updateGradeInfo(Integer.parseInt(test_id))?"success":"error";
        return returntext;
    }

    //判断是否可以添加补考
    @RequestMapping("/isMakeUp")
    @ResponseBody
    public Map<String, Object> isMakeUp(@RequestParam("test_id")String test_id, @RequestParam("education_id")String education_id){
        Map<String, Object> result = new HashMap<>();
        //判断是否为补考
        String returntext = "";
        System.out.println("education_id:"+education_id);
        String flag = tis.isMakeUpHasET(Integer.parseInt(test_id),Integer.parseInt(education_id));
        if(flag.equals("is")){
            returntext = "is";
        }else if (flag.equals("have")){
            returntext = "have";
        }else {
            //判断是否考试已经提交成绩
            if(!tis.isSubmitted(Integer.parseInt(test_id))){
                returntext = "nosubmit";
            }else {
                //判读是否有补考名单
                try {
                    if(tis.getMakeUpEnroll(Integer.parseInt(test_id)).size()>0){
                        returntext = "success";
                    }else {
                        returntext = "noneed";
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        /*if(StringUtils.isNotBlank(education_id)){
            String flag = tis.isMakeUpHasET(Integer.parseInt(test_id),Integer.parseInt(education_id));
            if(flag.equals("is")){
                returntext = "error1";
            }else if (flag.equals("have")){
                returntext = "error2";
            }else {
                returntext = "success";
            }
        }else {
            String flag = tis.isMakeUpNoET(Integer.parseInt(test_id));
            if(flag.equals("is")){
                returntext = "error1";
            }else if (flag.equals("have")){
                returntext = "error2";
            }else {
                returntext = "success";
            }
        }*/
        result.put("returntext", returntext);

        return result;
    }

    //获取补考信息中不需要填写的数据
    @RequestMapping("/getMakeUpData")
    @ResponseBody
    public  Map<String, Object> getMakeUpData(@RequestParam("test_id")String test_id){
        Map<String, Object> result = new HashMap<>();
        //获取相关联考试的考试名称、培训名称、类型
        Map<String, Object> rmap = tis.getPartInfoByID(Integer.parseInt(test_id));
        Map<String, Object> tmap = new HashMap<>();
        tmap.put("education_name",rmap.get("education_name"));
        tmap.put("edu_category_name",rmap.get("edu_category_name"));
        if(rmap.get("is_online").equals("1")){
            tmap.put("is_online_name","机考");
        }else {
            tmap.put("is_online_name","非机考");
        }
        if(rmap.get("score_mode").equals("0")){
            tmap.put("score_mode_name","百分制");
        }else if(rmap.get("score_mode").equals("1")){
            tmap.put("score_mode_name","二分制");
        }else {
            tmap.put("score_mode_name","五分制");
        }
        rmap.remove("education_name");
        rmap.remove("edu_category_name");
        result.put("rmap",rmap);
        result.put("tmap",tmap);
        return result;
    }

    //添加补考信息
    @RequestMapping("/submitMakeup")
    @ResponseBody
    public String makeupSubmit(@RequestParam("formdata")String formdata){
        String returntext = "";
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        TestInfoT tit = (TestInfoT) JSONObject.toJavaObject(jsonObject,TestInfoT.class);//json对象转换为javabean对象
        returntext = tis.insert(tit)?"success":"error";
        return returntext;
    }

    @RequestMapping("/getDetail")
    @ResponseBody
    public Map<String, Object> getDetailTestInfo(@RequestParam("test_id")String id, @RequestParam("conditions")String conditions, @RequestParam("pageindex")String pageindex)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where " +conditions;
        }
        return tis.getDetail(Integer.parseInt(id),conditions,Integer.parseInt(pageindex));
    }
    //判断考试是否已经开始
    @RequestMapping("/isTestStart")
    @ResponseBody
    public String isTestStart(@RequestParam("test_id")String id){
        String returntext = "";
        try {
            returntext = tis.getReleasedStatus(Integer.parseInt(id)).equals("0")?"error1":"";//error1表示未发布
            returntext = tis.isTestStart(Integer.parseInt(id))?"success":"error";
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return returntext;
    }
    @RequestMapping("/getEdit")
    @ResponseBody
    public Map<String, Object> getEdit(@RequestParam("test_id")String id){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> rmap = new HashMap<>();
        Map<String, Object> tmap = new HashMap<>();
        try {
             rmap = tis.getTestInfoByID(Integer.parseInt(id));
        }catch (SQLException e){
            e.printStackTrace();
        }
        if(rmap.get("is_online").equals("1")){
            tmap.put("is_online_name","机考");
        }else{
            tmap.put("is_online_name","非机考");
        }
        if(rmap.get("score_mode").equals("0")){
            tmap.put("score_mode_name","百分制");
        }else if(rmap.get("score_mode").equals("1")){
            tmap.put("score_mode_name","二分制");
        }else {
            tmap.put("score_mode_name","五分制");
        }
        tmap.put("education_name",rmap.get("education_name"));
        tmap.put("edu_category_name",rmap.get("edu_category_name"));
        rmap.remove("education_name");
        rmap.remove("edu_category_name");
        result.put("rmap",rmap);
        result.put("tmap",tmap);
        return result;
    }

    @RequestMapping("/submitEdit")
    @ResponseBody
    public String SubmitEditTestInfo(@RequestParam("formdata")String formdata){
        String returntext = "";
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        TestInfoT tit = (TestInfoT) JSONObject.toJavaObject(jsonObject,TestInfoT.class);//json对象转换为javabean对象
        returntext = tis.submitEditTestInfo(tit)?"success":"error";
        return returntext;
    }

    @RequestMapping("/export")
    @ResponseBody
    public void exportTestInfo(@RequestParam("id_list")String id_list, @RequestParam("conditions")String conditions, @RequestParam("exportconditions")String exportconditions, HttpServletResponse response){
        String secondRow = null;
        DBo db = new DBo();

        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }
        secondRow = exportconditions;
        List<Map<String, Object>> list = null;
        try {
            if (StringUtils.isNotBlank(id_list)) {
                list = db.executeQuery("select test_id,education_id,test_name,education_name,edu_category_id,test_address,edu_category_name,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time, test_time,is_online,test_type,is_submitted from test_info_education_category_view where test_id in (" + id_list + ")");
            } else {
                list = tis.getList(conditions, 0);
                if (!StringUtils.isNotBlank(secondRow)) {
                    secondRow = "";
                }
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        for (Map r:list){
            if(r.get("test_type").equals("1")){
                r.put("test_type","正常考试");
            }else {
                r.put("test_type","补考");
            }
            if(r.get("is_online").equals("1")){
                r.put("is_online","机考");
            }else {
                r.put("is_online","非机考");
            }
        }
        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("考试名称", "test_name");
        columnHead.put("培训名称", "education_name");
        columnHead.put("培训类型", "edu_category_name");
        columnHead.put("考试地点", "test_address");
        columnHead.put("考试类型","test_type");
        columnHead.put("是否机考", "is_online");
        columnHead.put("考试起始时间","test_start_time");
        columnHead.put("考试终止时间","test_end_time");
        columnHead.put("考试时长", "test_time");
        try {
            FileManager.ExportToExcel("考试信息_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), "考试信息", secondRow, columnHead, list, response);
            //导出未完成
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    //获取已报名名单
    @RequestMapping("/getEnteredRoll")
    @ResponseBody
    public Map<String, Object> getEnteredRoll(@RequestParam("test_id")String test_id)throws SQLException{
        Map<String, Object> result = new HashMap<>();
        List<Map<String, Object>> roll = new ArrayList<>();
        if(tis.isMakeUpByTID(Integer.parseInt(test_id))){//补考:test_id为补考id
            Integer related_test_id = tis.getRelatedTestIDByTID(Integer.parseInt(test_id));//获取补考所关联的考试ID
            roll = tis.getMakeUpEnroll(related_test_id);
        }else {
            roll = tis.getTrainRoll(Integer.parseInt(test_id));
        }
        //考生密码解密
        for (Map<String, Object> r : roll){
            try {
                if(r.get("examinee_pwd")!=null){
                    r.put("examinee_pwd", AES.Decrypt(r.get("examinee_pwd").toString(),"shirleyLshirleyL"));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        result.put("roll",roll);
        return result;
    }
    //获取未参与考试培训名单
    @RequestMapping("/getNotEnterRoll")
    @ResponseBody
    public Map<String, Object> getNotEnterRoll(@RequestParam("institution_list")String institution_num_list, @RequestParam("test_id")String test_id)throws SQLException{
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
        result.put("notroll",tis.getNotTrainRoll(condition,Integer.parseInt(test_id)));
        return result;
    }
    //添加考试员工
    @RequestMapping("/addEmployee")
    @ResponseBody
    public String addEmployee(@RequestParam("test_id")String test_id, @RequestParam("employee_num")String employee_num_list)throws Exception{
        String returntext = "";
        /*RollEducationT ret = new RollEducationT();
        ret.setEducation_id(Integer.parseInt(education_id));
        ret.setEmployee_num(employee_num);*/
        String[] employee_num = employee_num_list.split(",");//获取所有需要添加的员工编号
        StringBuilder insertstr = new StringBuilder();
        //根据test_id获取计分方式
        String score_mode = tis.getScoreModeByID(Integer.parseInt(test_id));
        System.out.println("score_mode:"+score_mode);
        for (int i=0;i<employee_num.length-1;i++){
            Integer randNum = (int)(Math.random()* (999999)+1);//产生(0,999999]之间的随机数
            String workPassWord = String.format("%06d",randNum);//进行六位数补全
            String store_pwd = AES.Encrypt(workPassWord,"shirleyLshirleyL");
            insertstr.append("(");insertstr.append(employee_num[i]);insertstr.append(",0,");insertstr.append(test_id);insertstr.append(",'");insertstr.append(store_pwd);insertstr.append("',");insertstr.append(score_mode);insertstr.append("),");

        }
        //设置考试密码
        Integer randNum = (int)(Math.random()* (999999)+1);//产生(0,999999]之间的随机数
        String workPassWord = String.format("%06d",randNum);//进行六位数补全
        String store_pwd = AES.Encrypt(workPassWord,"shirleyLshirleyL");
        insertstr.append("(");insertstr.append(employee_num[employee_num.length-1]);insertstr.append(",0,");insertstr.append(test_id);insertstr.append(",'");insertstr.append(store_pwd);insertstr.append("',");insertstr.append(score_mode);insertstr.append(")");
        System.out.println("str:"+insertstr.toString());
        returntext = tis.addEmployee(insertstr.toString())?"success":"error";
        return returntext;
    }
    //从报名名单中删除选入员工
    @RequestMapping("/deleteEmployee")
    @ResponseBody
    public String deleteEmployee(@RequestParam("id_list")String id_list)throws SQLException{
        String returntext = "";
        returntext = tis.deleteEmployee(id_list)?"success":"error";
        return returntext;
    }
    //根据培训ID获取培训名称
    @RequestMapping("/getNameAndCategoryByID")
    @ResponseBody
    public Map<String, Object> getNameByID(@RequestParam("education_id")String education_id){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> info = ets.getNameAndCategoryByID(Integer.parseInt(education_id));
        String education_name = info.get("education_name").toString();
        Integer edu_category_id = Integer.parseInt(info.get("edu_category_id").toString());
        result.put("education_name",education_name);
        result.put("edu_category_id", edu_category_id);
        result.put("edu_category_name",info.get("edu_category_name").toString());
        return result;
    }

    //考试信息公告主页面
    @RequestMapping("/NoticeListVue")
    public ModelAndView TestNoticeVue(HttpServletRequest request){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("TestInfoNotice");
        return mv;
    }

    @RequestMapping("/getNoticeList")
    @ResponseBody
    public Map<String, Object> getTestNoticeList(@RequestParam(value = "pageindex", required = false, defaultValue = "1") String pageindex, @RequestParam(value = "conditions", required = false, defaultValue = "")String conditions)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where is_released = '1' and test_start_time>getdate() and" + conditions;
        }else {
            conditions = " where is_released = '1' and test_start_time>getdate()";
        }
        List<Map<String, Object>> list = new ArrayList<>();
        int pagenum = 0;
        int topageindex = Integer.parseInt(pageindex);
        if(tis.getList(conditions, topageindex).size()>0){
            list = tis.getList(conditions, topageindex);
        }
        pagenum = tis.getListPageNum(conditions);
        pagenum= pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }
    @RequestMapping("/getNoticeDetail")
    @ResponseBody
    public Map<String, Object> getNoticeDetailTestInfo(@RequestParam("test_id")String id, @RequestParam("conditions")String conditions, @RequestParam("pageindex")String pageindex)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where is_released = '1' and test_start_time>getdate() and " +conditions;
        }else {
            conditions = " where is_released = '1' and test_start_time>getdate()";
        }
        return tis.getDetail(Integer.parseInt(id),conditions,Integer.parseInt(pageindex));
    }

    @RequestMapping("/printEmployee")
    @ResponseBody
    public void printEmployee(@RequestParam("test_id")String test_id, @RequestParam("test_name")String test_name, HttpServletResponse response)throws SQLException{
        Integer id = Integer.parseInt(test_id);
        List<Map<String, Object>> makeuproll = new ArrayList<>();
        //判断是否为补考
        if(tis.isMakeUpByTID(id)){
            //补考则从补考的关联考试ID中获取补考名单
            //获取其关联考试ID
            int related_test_id = tis.getRelatedTestIDByTID(id);
            makeuproll = tis.getMakeUpEnroll(related_test_id);
        }else {
            //正常考试则直接从报名表中根据test_id获取名单
            makeuproll = tis.getTrainRoll(id);
        }
        String secondRow = "";
        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("所属机构", "InstitutionName");
        columnHead.put("员工编号", "EmployeeID");
        columnHead.put("员工姓名", "EmployeeName");
        columnHead.put("员工性别", "EmployeeSex");
        columnHead.put("员工职务","WorkPositionValue");
        //如果为机考，增加考生密码列
        if(tis.isOnline(Integer.parseInt(test_id))){
            columnHead.put("员工密码", "examinee_pwd");
            //解密考生密码
            for (Map<String, Object> map : makeuproll){
                try {
                    map.put("examinee_pwd", AES.Decrypt(map.get("examinee_pwd").toString(),"shirleyLshirleyL"));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        try {
            FileManager.ExportToExcel(test_name+"名单_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), test_name+"名单", secondRow, columnHead, makeuproll, response);
            //导出未完成
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
