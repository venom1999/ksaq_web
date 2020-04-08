package com.kuangshan.riskcontrol.controller;


import com.kuangshan.riskcontrol.model.TestInfoT;
import com.kuangshan.riskcontrol.service.TestInfoService;
import com.kuangshan.riskcontrol.tool.AES;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mobile/Test")
public class M_TestInfoController {
    @Resource
    private TestInfoService tis;

    @RequestMapping("/getAllTestData")
    @ResponseBody
    public Map getAllTestData(@RequestParam("userId")String userId)throws Exception {
        String sql = "SELECT a.* ,b.test_id as is_singup\n" +
                "FROM test_info_t as a\n" +
                "LEFT JOIN \n" +
                "(SELECT roll_education_t.test_id FROM roll_education_t WHERE roll_education_t.employee_num = '"+userId+"') as b\n" +
                "on a.test_id = b.test_id where a.test_start_time > GETDATE()";
        System.out.println(sql);
        DBo db = new DBo();
        Map<String, Object> result = new HashMap<>();
        result.put("testList",db.executeQuery(sql));
        return result;
    }

    @RequestMapping("/getAllEducationData")
    @ResponseBody
    public Map getAllEducationData(@RequestParam("userId") String userId) throws Exception {
        String sql = "SELECT a.* ,b.education_id as is_singup\n" +
                "FROM education_info_t as a\n" +
                "LEFT JOIN \n" +
                "(SELECT roll_education_t.education_id FROM roll_education_t \n" +
                "WHERE roll_education_t.employee_num = '"+userId+"') as b\n" +
                "on a.education_id = b.education_id where a.start_time > GETDATE()";
        System.out.println(sql);
        DBo db = new DBo();

        Map<String, Object> result = new HashMap<>();
        result.put("educationList",db.executeQuery(sql));
        return result;
    }

    @RequestMapping("/signUpExam")
    @ResponseBody
    public Map signUpExam(@org.springframework.web.bind.annotation.RequestParam("testId")String testId, @org.springframework.web.bind.annotation.RequestParam("userId")String userId) throws Exception{
        System.out.println("4444");
        String score_mode = tis.getScoreModeByID(Integer.parseInt(testId));

        Integer randNum = (int)(Math.random()* (999999)+1);//产生(0,999999]之间的随机数
        String workPassWord = String.format("%06d",randNum);//进行六位数补全
        String store_pwd = AES.Encrypt(workPassWord,"shirleyLshirleyL");

        StringBuilder insertStr = new StringBuilder("(");

        insertStr.append(userId);
        insertStr.append(",0,");
        insertStr.append(testId);
        insertStr.append(",'");
        insertStr.append(store_pwd);
        insertStr.append("',");
        insertStr.append(score_mode);
        insertStr.append(")");

        System.out.println("str:"+insertStr.toString());
        String returnText = tis.addEmployee(insertStr.toString())?"报名成功":"报名失败，请稍后再试";

        Map<String, Object> result = new HashMap<>();
        result.put("status",returnText);
        return result;
    }


    @RequestMapping("/signUpEducation")
    @ResponseBody
    public Map signUpEducation(@RequestParam("educationId")String educationId, @RequestParam("userId")String userId) throws SQLException {
        String sql = "insert into roll_education_t(employee_num,education_id) values ("+userId+","+educationId+")";
        DBo db = new DBo();
        String returnText = db.executeUpdate(sql)>0?"报名成功":"报名失败，请稍后再试";
        Map<String, Object> result = new HashMap<>();
        result.put("status",returnText);
        return result;
    }
}
