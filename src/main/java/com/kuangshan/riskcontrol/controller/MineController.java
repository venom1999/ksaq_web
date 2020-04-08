package com.kuangshan.riskcontrol.controller;


import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/mobile/Me")
public class MineController {

    @RequestMapping("/getExamScore")
    @ResponseBody
    public Map getExamScore(@RequestParam("userId")String userId) throws SQLException {
//        String sql = "SELECT a.* ,b.score as score,b.score_mode as score_mode\n" +
//                "FROM test_info_t as a\n" +
//                "LEFT JOIN \n" +
//                "(SELECT roll_education_t.score,roll_education_t.score_mode,roll_education_t.test_id FROM roll_education_t \n" +
//                "WHERE roll_education_t.employee_num = '"+userId+"' and roll_education_t.is_finished = 1) as b\n" +
//                "on a.test_id = b.test_id";
        String sql = "select test_name,score,makeup_grade,score_mode from employee_education_report_t where employee_num="+userId;
        System.out.println(sql);
        DBo db = new DBo();
        Map<String, Object> result = new HashMap<>();
        result.put("testScoreList",db.executeQuery(sql));
        return result;
    }
}
