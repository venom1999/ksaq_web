package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.service.OnlineExamService;
import com.kuangshan.riskcontrol.tool.AES;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author liuhaikang
 */
@Controller
@RequestMapping("/OnlineExam")
public class OnlineExamController {
    @Resource
    private OnlineExamService onlineExamService;

    private String requestPath;   // 请求路径
    @RequestMapping("/getSingleChoose")
    @ResponseBody
    public Map<String, Object> getSingleChoose(@RequestParam(value = "number", required = false, defaultValue = "20") String number, @RequestParam(value = "categoryId", required = false, defaultValue = "1")String categoryId) throws Exception {
        List<Map<String, Object>> list = new ArrayList<>();
        list=onlineExamService.getList(number,categoryId);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }
    /**
     * 组成测试试卷
     */
    @RequestMapping(value="/getTestPaper", method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getTestPaper(@RequestParam String chooseCount ,@RequestParam String multiChoiceCount,@RequestParam String judgeCount,@RequestParam String educationCategoryID){
        System.out.println("chooseCount+multiChoiceCount+judgeCount:"+chooseCount+multiChoiceCount+judgeCount+educationCategoryID);
        Map<String, Object> list = new HashMap<>();
        try {
            list=onlineExamService.getRandomPaper(chooseCount,multiChoiceCount,judgeCount,educationCategoryID);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    /**
     * 点击导航栏进入的右侧页面
     * @return 页面
     */
    @RequestMapping("/EduSourceManage/EduSList_vue")
    public String ParameterList(HttpServletRequest request) {
        requestPath = request.getContextPath() + "/upload/SystemMaintenance/EduSourceManage/";
        System.out.println("这是requestPath"+requestPath);
        return requestPath;
    }


    /**
     * 获取考试名称
     */
    @RequestMapping(value="/getExamName", method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getExamName(@RequestParam String id) {
        String name = onlineExamService.getExamName(id);
        System.out.println("考试名称"+name);
        Map<String, Object> result = new HashMap<>();
        result.put("ExamName", name);
        return result;
    }

    /**
     * 获取个人考试列表
     */
    @RequestMapping(value="/getExamList", method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getExamList(@RequestParam String userID) throws Exception {
        List<Map<String, Object>> list;
        Date now = new Date();
        list=onlineExamService.getExamList(userID);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    /**
     * 获取个人考试试卷
     */
    @RequestMapping(value="/getExamDetail", method=RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> getExamDetail(@RequestParam String testID,@RequestParam String userID,@RequestParam String passWord,@RequestParam String eduCategoryId) throws Exception {
        List<Map<String, Object>> list;
        list=onlineExamService.getExamDetail(testID);
        String eduCategoryName = onlineExamService.getEduCategoryName(eduCategoryId);
        String correctPassword = onlineExamService.judgePassword(testID,userID);
        String passwordString = AES.Decrypt(correctPassword,AES.KEY);
        if(!passWord.equals(passwordString)){
            Map<String, Object> result=new HashMap<>();
            result.put("list","wrongPassword");
            return result;
        }
        Integer testNum = list.size();
        int number;
        Random df = new Random();
        //范围是[0，testNum - 1]
        if(testNum == 0){
            Map<String, Object> result=new HashMap<>();
            result.put("list","noPaper");
            return result;
        }else if(testNum == 1){
            number = 0;
        }else{
            number = df.nextInt(testNum);
        }
        Map<String, Object> testPaper = list.get(number);
        String single_choose = (String) testPaper.get("single_choose");
        String multi_choice = (String) testPaper.get("multi_choice");
        String judge = (String) testPaper.get("judge");
        String totalScore = testPaper.get("total_score").toString();
        String single_choose_score = testPaper.get("single_choose_score").toString();
        String multi_choice_score = testPaper.get("multi_choice_score").toString();
        String judge_score = testPaper.get("judge_score").toString();
        String single_choose_num = testPaper.get("single_choose_num").toString();
        String multi_choice_num = testPaper.get("multi_choice_num").toString();
        String judge_num = testPaper.get("judge_num").toString();
        Map<String, Object> testPaperDetail = onlineExamService.getPaper(single_choose,multi_choice,judge);
        testPaperDetail.put("totalScore",totalScore);
        testPaperDetail.put("single_choose_score",single_choose_score);
        testPaperDetail.put("multi_choice_score",multi_choice_score);
        testPaperDetail.put("judge_score",judge_score);
        testPaperDetail.put("single_choose_num",single_choose_num);
        testPaperDetail.put("multi_choice_num",multi_choice_num);
        testPaperDetail.put("judge_num",judge_num);
        testPaperDetail.put("eduCategoryName",eduCategoryName);
        Map<String, Object> result=new HashMap<>();
        result.put("list",testPaperDetail);
        return result;
    }


    /*
    客观题提交成绩
     */

    @RequestMapping("/submitScore")
    @ResponseBody
    public Map<String, Object> submitScore(@RequestParam("testID") String testID,@RequestParam("userID") String userID,@RequestParam("score") String score,@RequestParam("testType") String testType){
//        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
//        EducationResourceT ert = (EducationResourceT) JSONObject.toJavaObject(jsonObject,EducationResourceT.class);//json对象转换为javabean对象
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String testSubmitTime=df.format(new Date());// new Date()为获取当前系统时间
        Map<String, Object> rmap = new HashMap<>();
        String returntext = "";
        try {
            returntext =  onlineExamService.submitScore( testID,userID,score,testSubmitTime,testType)>0?"success":"error";
        } catch (Exception e) {
            e.printStackTrace();
        }
        rmap.put("returntext", returntext);
        return rmap;
    }

    /**
     * 获取页面的数据
     * @return 返回数据
     */
    @RequestMapping("/GetTCList_vue")
    @ResponseBody
    public Map<String, Object> GetTCList_vue(){
        Map<String, Object> result = new HashMap<>();
        result.put("eduCateList", onlineExamService.selectAll());
        return result;
    }
}
