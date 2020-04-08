package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EmployeeEducationReportTMapper;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DataStatisticsService {

    @Autowired
    private EmployeeEducationReportTMapper eerMapper;

    private DBo dBo = new DBo();


    /**
     * 根据员工编号获取考试成绩数据
     * @param userNum 员工编号
     * @return 数据
     */
    public Map<String, List<String>> getScoreByUser(String userNum) {
        Map<String, List<String>> record = new HashMap<>();
        List<Map<String, Object>> list = eerMapper.getOwnTestList(userNum);

        List<String> scoreList = new ArrayList<>();    // 考试分数列表
        List<String> testNameList = new ArrayList<>();    // 考试名称列表
        List<String> scoreModeList = new ArrayList<>();    // 考试分数类型

        for (int i = 0; i < list.size(); i++) {
            testNameList.add(list.get(i).get("test_name").toString());
            scoreModeList.add(list.get(i).get("score_mode").toString());

            // 如果有补考，显示补考成绩，没有的话显示原成绩
            if (list.get(i).get("makeup_grade") == null) {
                scoreList.add(list.get(i).get("score").toString());
            } else {
                scoreList.add(list.get(i).get("makeup_grade").toString());
            }

        }

        record.put("testNameList", testNameList);
        record.put("scoreList", scoreList);
        record.put("scoreModeList", scoreModeList);

        return  record;
    }


    /**
     * 根据员工编号获取部门安全员
     * @param userNum 员工编号
     * @return 安全员所在的部门编号
     */
    public Map<String, String> getInsNumByUser(String userNum) {
        Map<String, String> result = new HashMap<>();
        String sql = "SELECT InstitutionNum FROM emp_insti_security_v " +
                "where EmployeeNum='" + userNum + "' AND IsRetire=0";
        if ("admin".equals(userNum)) {
            return null;
        }
        try {
            List<Map<String, Object>> list = dBo.executeQuery(sql);
            if (list.size() == 0) {
                result = null;

            } else {
                result.put("InstitutionNum", list.get(0).get("InstitutionNum").toString());
            }

        } catch (SQLException e) {
            return null;
        }

        return result;
    }


    /**
     * 根据部门编号获取部门及下属部门员工
     * @param insNum 部门编号
     * @return 员工列表
     */
    public List<Map<String, Object>> getMemberByInsNum(String insNum) {
        List<Map<String, Object>> list = new ArrayList<>();
        String sql = "SELECT EmployeeNum, EmployeeName, EmployeeID FROM emp_insti_prefix_v " +
                "where InstitutionNum='" + insNum + "' OR InstitutionPrefix='" + insNum + "'";

        try {
            list = dBo.executeQuery(sql);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }


    /**
     * 判断员工是否是安全部的人
     * @param userNum 员工编号
     * @return 是或否
     */
    public Boolean isAQB(String userNum) {
        String sql = "SELECT InstitutionNum FROM emp_insti_prefix_v " +
                "where EmployeeNum='" + userNum + "'";

        try {
            List<Map<String, Object>> list = dBo.executeQuery(sql);
            if (list.size() != 0) {
                if ("AQB".equals(list.get(0).get("InstitutionNum").toString())) {
                    return true;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }


    /**
     * 获取全部员工
     * @return 员工列表
     */
    public List<Map<String, Object>> getAllStaff() {
        List<Map<String, Object>> list = new ArrayList<>();
        String sql = "SELECT EmployeeNum, EmployeeName, EmployeeID FROM emp_insti_prefix_v ";

        try {
            list = dBo.executeQuery(sql);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return list;
    }

}
