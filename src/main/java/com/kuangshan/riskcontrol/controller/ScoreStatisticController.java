package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.service.ScoreStatisticService;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/ExamSourcesManage")
public class ScoreStatisticController {

    @Autowired
    private ScoreStatisticService ssS;    // 服务


    /**
     * 根据考试获取分数段的饼图数据
     * @param test_id 考试id
     * @return 数据
     */
    @RequestMapping("/dataStatistics/getScoreDistribution")
    @ResponseBody
    public List<Map<String, String>> getScoreDistribution(
            @RequestParam("test_id") String test_id
    ) {
        return ssS.getScoreDistribution(Integer.parseInt(test_id));
    }



    @RequestMapping("/dataStatistics/getScoreFre")
    @ResponseBody
    public Map<String, Object> getScoreFre(
            @RequestParam("test_id") String test_id
    ) {
        Map<String, Object> result = new HashMap<>();
        Map<String, List<Double>> score = ssS.getScore(Integer.parseInt(test_id));


        List<Double> scoreArr = score.get("scoreArr");    // 重复的成绩
        List<Double> scoreList = score.get("scoreList");    // 不重复的成绩
        int[] frequency = new int[scoreList.size()];    // 各成绩的频率

        for (int i = 0; i < scoreList.size(); i++) {
            for (int j = 0; j < scoreArr.size(); j++) {
                if (scoreArr.get(j).equals(scoreList.get(i))) {
                    frequency[i] += 1;
                } else if (scoreArr.get(j) > scoreList.get(i)) {
                    break;
                }
            }
        }

        result.put("xaxis", score.get("scoreList"));    // 排序无重复的成绩为x轴
        result.put("yaxis", frequency);
        return result;
    }




}
