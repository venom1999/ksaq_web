package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class ScoreStatisticService {

    private DBo dbo = new DBo();

    /**
     * 获取各分数段的人数
     * @param test_id 考试iid
     * @return 分数段人数
     */
    public List<Map<String, String>> getScoreDistribution(int test_id) {
        List<Map<String, String>> result = new ArrayList<>();
        Integer[] scoreList = new Integer[] {0, 0, 0, 0, 0};    // 0: 0-60分; 1: 60-70分; 2: 70-80分; 3: 80-90分; 4: 90-100分

        String sql = " SELECT score, score_mode " +
                " FROM employee_education_report_institution_category_view " +
                " WHERE test_id = " + test_id;

        try {
            List<Map<String, Object>> list = dbo.executeQuery(sql);

            if (list.size() != 0) {
                String score_mode = list.get(0).get("score_mode").toString();

                for (int i = 0; i < list.size(); i++) {
                    double score = Float.parseFloat(list.get(i).get("score").toString());    // 分数

                    if ("0".equals(score_mode)) {    // 百分制
                        if (score < 60.00) {
                            scoreList[0] += 1;
                        } else if (score < 70.00) {
                            scoreList[1] += 1;
                        } else if (score < 80.00) {
                            scoreList[2] += 1;
                        } else if (score < 90.00) {
                            scoreList[3] += 1;
                        } else if (score <= 100.00) {
                            scoreList[4] += 1;
                        }

                    } else if ("1".equals(score_mode)) {    // 二分制
                        if (score == 0.0) {    // 合格
                            scoreList[4] += 1;   // 90分
                        } else {
                            scoreList[0] += 1;
                        }

                    } else if ("2".equals(score_mode)) {    // 五分制
                        switch ( String.valueOf(score) ) {
                            case "0.0":    // 不及格
                                scoreList[0] += 1;
                                break;
                            case "1.0":    //  及格
                                scoreList[1] += 1;
                                break;
                            case "2.0":    // 中
                                scoreList[2] += 1;
                                break;
                            case "3.0":    // 良
                                scoreList[3] += 1;
                                break;
                            case "4.0":     // 优
                                scoreList[4] += 1;
                                break;
                        }    // switch end
                    }    // if end

                }    // for end

                String[] score = {"0-60", "60-70", "70-80", "80-90", "90-100"};

                for (int i = 0; i < scoreList.length; i++) {
                    Map<String, String> map = new HashMap<>();
                    map.put("name", score[i]);
                    map.put("value", scoreList[i].toString());
                    result.add(map);
                }

                return result;
            }

        } catch (SQLException e) {
            return null;
        }

        return result;

    }



    public Map<String, List<Double>> getScore(int test_id) {
        Map<String, List<Double>> result = new HashMap<>();
        Set<Double> scoreSet = new HashSet<>();    // 成绩不重复
        List<Double> scoreArr = new ArrayList<>();    // 成绩重复数组

        String sql = " SELECT score, score_mode " +
                " FROM employee_education_report_institution_category_view " +
                " WHERE test_id = " + test_id;

        try {
            List<Map<String, Object>> list = dbo.executeQuery(sql);

            if (list.size() != 0) {
                String score_mode = list.get(0).get("score_mode").toString();

                for (int i = 0; i < list.size(); i++) {
                    double score = Float.parseFloat(list.get(i).get("score").toString());    // 分数

                    if ("0".equals(score_mode)) {    // 百分制
                        scoreSet.add(score);
                        scoreArr.add(score);

                    } else if ("1".equals(score_mode)) {    // 二分制
                        if (score == 0.0) {    // 合格
                            scoreSet.add(90.0);
                            scoreArr.add(90.0);
                        } else {
                            scoreSet.add(50.0);
                            scoreArr.add(50.0);
                        }

                    } else if ("2".equals(score_mode)) {    // 五分制
                        switch ( String.valueOf(score) ) {
                            case "0.0":    // 不及格
                                scoreSet.add(50.0);
                                scoreArr.add(50.0);
                                break;
                            case "1.0":    //  及格
                                scoreSet.add(60.0);
                                scoreArr.add(60.0);
                                break;
                            case "2.0":    // 中
                                scoreSet.add(70.0);
                                scoreArr.add(70.0);
                                break;
                            case "3.0":    // 良
                                scoreSet.add(80.0);
                                scoreArr.add(80.0);
                                break;
                            case "4.0":     // 优
                                scoreSet.add(90.0);
                                scoreArr.add(90.0);
                                break;
                        }    // switch end
                    }    // if end

                }    // for end

                // 对成绩进行排序
                List<Double> scoreList = new ArrayList<>(scoreSet);
                Collections.sort(scoreList);
                Collections.sort(scoreArr);

                result.put("scoreArr", scoreArr);    // 重复的成绩
                result.put("scoreList", scoreList);    // 不重复的成绩
                return result;

            }    // if end

        } catch (SQLException e) {
            return null;
        }

        return null;

    }

}
