package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.service.DataStatisticsService;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 统计分析控制器
 */
@Controller
@RequestMapping("/ExamSourcesManage")
public class DataStatisticsController {

    @Autowired
    private DataStatisticsService dataSS;    // 统计分析服务

    /**
     * 点击导航栏进入个人成绩统计
     * @return 页面
     */
    @RequestMapping("/dataStatistics/List_vue")
    public ModelAndView List_vue() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/ExamSourcesManage/dataStatistics/dataStatistics");
        return mv;
    }

    /**
     * 点击进入考核成绩统计
     * @return 页面
     */
    @RequestMapping("/dataStatistics/score_vue")
    public ModelAndView score_vue() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/ExamSourcesManage/dataStatistics/scoreStatistics");
        return mv;
    }

    /**
     * 点击进入考核合格率统计
     * @return 页面
     */
    @RequestMapping("/dataStatistics/rate_vue")
    public ModelAndView rate_vue() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/ExamSourcesManage/dataStatistics/rateStatistics");
        return mv;
    }


    /**
     * 个人考试情况统计
     * @param session session
     * @return 统计数据
     */
    @RequestMapping("/dataStatistics/getScoreByUser")
    @ResponseBody
    public Map<String, List<String>> getScoreByUser(
            @RequestParam("userNum") String userNum,
            HttpSession session) {

        if ("".equals(userNum)) {
            userNum = session.getAttribute("UserNum").toString();
        }

        return dataSS.getScoreByUser(userNum);
    }


    @RequestMapping("/dataStatistics/getRight")
    @ResponseBody
    public Map<String, Object> getInstitution(HttpSession session) {
        String currUserNum = session.getAttribute("UserNum").toString();
        Map<String, Object> result = new HashMap<>();

        if ("admin".equals(currUserNum)) {
            result.put("right", "0");
            return result;
        }

        Map<String, String> inst = dataSS.getInsNumByUser(currUserNum);

        // 如果是安全员，返回所在部门集齐下属部门的员工列表
        if (inst != null) {
            List<Map<String, Object>> memberList = dataSS.getMemberByInsNum(inst.get("InstitutionNum"));
            result.put("memberList", memberList);
            result.put("right", "1");

        } else {  // 不是安全员，则获取其所在部门
            if (dataSS.isAQB(currUserNum)) {    // 如果是安全员，则返回全部员工列表
                List<Map<String, Object>> staffList = dataSS.getAllStaff();
                result.put("staffList", staffList);
                result.put("right", "2");
            } else {
                result.put("right", "0");    // 没有权限查询
            }
        }

        return result;
    }


}
