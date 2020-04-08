package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

/**
 * 部门分数统计
 */
@Service
public class RateStatisticService {

    private DBo dbo = new DBo();


    /**
     * 获取本次考试参与的部门
     * @param test_id 考试id
     * @return 部门列表
     */
    public List<String> getDepartment(int test_id) {
        List<String> departList = new ArrayList<>();
        String sql = " SELECT DISTINCT InstitutionNum, InstitutionName " +
                " FROM employee_education_report_institution_category_view " +
                " WHERE test_id = " + test_id;

        try {
            List<Map<String, Object>> list = dbo.executeQuery(sql);
            if (list.size() != 0) {
                for (int i = 0; i < list.size(); i++) {
                    departList.add(list.get(i).get("InstitutionName").toString());
                }
            }

            return departList;
        } catch (SQLException e) {
            return null;
        }

    }


    /**
     * 获取已有成绩的考试
     * @return 考试名列表
     */
    public List<Map<String, String>> getTest() {
        List<Map<String, String>> list = new ArrayList<>();
        String sql = "SELECT DISTINCT test_name, test_id" +
                " FROM employee_education_report_t";

        try {
            List<Map<String, Object>> testNameList = dbo.executeQuery(sql);
            if (testNameList.size() > 0) {
                for (int i = 0; i < testNameList.size(); i++) {
                    Map<String, String> map = new HashMap<>();
                    map.put("test_id", testNameList.get(i).get("test_id").toString());
                    map.put("test_name", testNameList.get(i).get("test_name").toString());
                    list.add(map);
                }
            }

        } catch (SQLException e) {
            return null;
        }

        return list;
    }


    /**
     * 获取部门的分数段人数
     * @param department
     * @return
     */
    public List<Integer> getDepartScore(String department, int test_id) {
        List<Integer> result = new ArrayList<>();
        int F1 = 0;    // 0-60分
        int F2 = 0;    // 60-70分

        int F3 = 0;    // 70-80分
        int F4 = 0;    // 80-90分
        int F5 = 0;    // 90-100分


        String sql = " SELECT score, score_mode " +
                " FROM employee_education_report_institution_category_view " +
                " WHERE InstitutionName = '" + department + "' AND test_id = " + test_id;

        try {
            List<Map<String, Object>> list = dbo.executeQuery(sql);

            if (list.size() != 0) {
                String score_mode = list.get(0).get("score_mode").toString();

                for (int i = 0; i < list.size(); i++) {
                    double score = Float.parseFloat(list.get(i).get("score").toString());    // 分数

                    if ("0".equals(score_mode)) {    // 百分制
                        if (score < 60.00) {
                            F1 += 1;
                        } else if (score < 70.00) {
                            F2 += 1;
                        } else if (score < 80.00) {
                            F3 += 1;
                        } else if (score < 90.00) {
                            F4 += 1;
                        } else if (score <= 100.00) {
                            F5 += 1;
                        }

                    } else if ("1".equals(score_mode)) {    // 二分制
                        if (score == 0.0) {    // 合格
                            F5 += 1;    // 90分
                        } else {
                            F1 += 1;
                        }

                    } else if ("2".equals(score_mode)) {    // 五分制
                        switch ( String.valueOf(score) ) {
                            case "0.0":    // 不及格
                                F1 += 1;
                                break;
                            case "1.0":    //  及格
                                F2 += 1;
                                break;
                            case "2.0":    // 中
                                F3 += 1;
                                break;
                            case "3.0":    // 良
                                F4 += 1;
                                break;
                            case "4.0":     // 优
                                F5 += 1;
                                break;
                        }    // switch end
                    }    // if end

                }    // for end

                result.add(F1);
                result.add(F2);
                result.add(F3);

                result.add(F4);
                result.add(F5);
                return result;
            }

        } catch (SQLException e) {
            return null;
        }

        return result;

    }


}
