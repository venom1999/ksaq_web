package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.service.RateStatisticService;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 部门分数统计
 */
@Controller
@RequestMapping("/ExamSourcesManage")
public class RateStatisticController {

    @Autowired
    private RateStatisticService rsS;    // 部门分数统计服务

    /**
     * 根据考试id获取部门分数段
     * @param test_id 考试id
     * @return 部门分数段
     */
    @RequestMapping("/dataStatistics/getDepartment")
    @ResponseBody
    public Map<String, Object> getDepartment(
            @RequestParam("test_id") String test_id
    ) {
        Map<String, Object> map = new HashMap<>();
        List<List<Integer>> list = new ArrayList<>();

        List<String> departList = rsS.getDepartment(Integer.parseInt(test_id));    // 获取此次考试部门列表
        map.put("departList", departList);

        for (int i = 0; i < departList.size(); i++) {
            List<Integer> departScore = rsS.getDepartScore(departList.get(i), Integer.parseInt(test_id));
            list.add(departScore);
        }
        map.put("departScore", list);

        return map;
    }


    @RequestMapping("/dataStatistics/getTest")
    @ResponseBody
    public List<Map<String, String>> getTest() {
        return rsS.getTest();
    }




}
