package com.kuangshan.riskcontrol.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.kuangshan.riskcontrol.model.*;
import com.kuangshan.riskcontrol.service.*;
import com.kuangshan.riskcontrol.tool.*;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 自动组卷控制器
 */
@Controller
@RequestMapping("/AutoGenerateTestPaper")
public class AutoGenerateTestPaperController {

    @Autowired
    private AutoGenerateTestPaperService agtpS;    // 自动组卷服务

    @Autowired
    private TestInfoService tiS;    // 考试信息服务

    @Autowired
    private TestSingleChooseService tscS;    // 单选题服务

    @Autowired
    private TestMultiChoiceService tmcS;    // 多选题服务

    @Autowired
    private TestJudgeService tjS;    // 判断题服务

    @Autowired
    private TestFillInBlanksService tfibS;    // 填空题服务

    @Autowired
    private TestQuestionAndAnswerService tqaaS;    // 问答题服务


    /**
     * 点击导航栏进入的右侧页面
     * @return 页面
     */
    @RequestMapping("/AutoGTPList_vue")
    public ModelAndView ParameterList() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/AutoGenerateTestPaper/AutoGenerateTestPaper");
        return mv;
    }


    /**
     * 获取表数据
     * @param pageindex 页数
     * @param conditions 查询条件
     * @return map
     */
    @RequestMapping("/getList")
    @ResponseBody
    public Map<String, Object> getList(
            @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
            @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions
    ) throws SQLException {
        Map<String, Object> result = new HashMap<>();
        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }

        List<Map<String, Object>> list = agtpS.getList(conditions, pageindex);
        int pageNum = agtpS.getListPageNum(conditions);
        pageNum = (pageNum % 10 == 0)? pageNum / 10 : pageNum / 10 + 1;

        result.put("list", list);
        result.put("pageNum", pageNum);
        return result;
    }


    /**
     * 获取考试信息
     * @return 考试信息
     */
    @RequestMapping("/getTestInfo")
    @ResponseBody
    public List<TestInfoT> getAll() {
        return tiS.selectAll();
    }


    /**
     * 通过培训分类获取题目
     * @param edu_category_id 分类id
     * @return 相应题目
     */
    @RequestMapping("/getExamByCategory")
    @ResponseBody
    public Map<String, List> getExamByCategory(@RequestParam("edu_category") int edu_category_id) {
        Map<String, List> result = new HashMap<>();

        List<TestSingleChooseT> singleChooseList = tscS.selectByEduCategoryId(edu_category_id);
        List<TestMultiChoiceT> multiChoiceList = tmcS.selectByEduCategoryId(edu_category_id);
        List<TestJudgeT> judgeList = tjS.selectByEduCategoryId(edu_category_id);

        List<TestFillInBlanksT> fillInBlanksList = tfibS.selectByEduCategoryId(edu_category_id);
        List<TestQuestionAndAnswerT> questionAndAnswerList = tqaaS.selectByEduCategoryId(edu_category_id);

        result.put("singleChooseList", singleChooseList);
        result.put("multiChoiceList", multiChoiceList);
        result.put("judgeList", judgeList);

        result.put("fillInBlanksList", fillInBlanksList);
        result.put("questionAndAnswerList", questionAndAnswerList);
        return result;
    }


    /**
     * 保存卷纸题型和分值，不组卷
     * @param paper 卷纸
     * @return 是否成功
     */
    @RequestMapping("/save")
    @ResponseBody
    public Map<String, String> save(@RequestBody OfflineTestPaperT paper) {
        Map<String, String> result = new HashMap<>();
        String record = agtpS.save(paper) > 0? "success" : "fail";

        result.put("record", record);
        return result;
    }


    /**
     * 删除试卷
     * @param id_list 删除列表
     * @return 是否成功
     */
    @RequestMapping("/Delete")
    @ResponseBody
    public Map<String, Object> delete(
            @RequestParam("id_list") String id_list
    ) {
        boolean flag = true;

        for (String id : id_list.split(",")) {
            flag = flag && agtpS.deleteById(Integer.parseInt(id));
        }

        String returntext = flag ? "success" : "error";
        Map<String, Object> result = new HashMap<>();
        result.put("record", returntext);
        return result;
    }


    /**
     * 根据是否有id更改/插入试卷信息
     * @param paper 卷纸
     * @return 是否成功
     */
    @RequestMapping("/editPart")
    @ResponseBody
    public Map<String, String> editPart(@RequestBody OfflineTestPaperT paper) {
        Map<String, String> result = new HashMap<>();
        String record;


        if (paper.getPaper_id() != null) {
            record = agtpS.editPart(paper) > 0? "success" : "fail";
        } else {
            record = agtpS.save(paper) > 0? "success" : "fail";
        }

        result.put("record", record);
        return result;
    }


    /**
     * 根据id获取相应题目
     * @param single 单选题
     * @param multi 多选题
     * @param judge 判断题
     * @param question 问答题
     * @param blanks_test 填空题
     * @return 题目列表
     */
    @RequestMapping("/getExamPaper")
    @ResponseBody
    public Map<String, List> getExamPaper(
            @RequestParam("single_choose") String single,
            @RequestParam("multi_choice") String multi,
            @RequestParam("judge") String judge,
            @RequestParam("question") String question,
            @RequestParam("blanks_test") String blanks_test
    ) {
        Map<String, List> result = new HashMap<>();

        List singleList = new LinkedList();
        if (!single.isEmpty()) {
            for (String id : single.split(",")) {
                singleList.add(tscS.selectByID(Integer.parseInt(id)));
            }
        }
        result.put("single_choose", singleList);

        List multiList = new LinkedList();
        if (!multi.isEmpty()) {
            for (String id : multi.split(",")) {
                multiList.add(tmcS.selectByID(Integer.parseInt(id)));
            }
        }
        result.put("multi_choice", multiList);

        List judgeList = new LinkedList();
        if (!judge.isEmpty()) {
            for (String id : judge.split(",")) {
                judgeList.add(tjS.selectByID(Integer.parseInt(id)));
            }
        }
        result.put("judge", judgeList);

        List questionList = new LinkedList();
        if (!question.isEmpty()) {
            for (String id : question.split(",")) {
                questionList.add(tqaaS.selectByID(Integer.parseInt(id)));
            }
        }
        result.put("question", questionList);

        List blankList = new LinkedList();
        if (!blanks_test.isEmpty()) {
            for (String id : blanks_test.split(",")) {
                blankList.add(tfibS.selectByID(Integer.parseInt(id)));
            }
        }
        result.put("blanks_test", blankList);

        return result;
    }


    /**
     * 生成word卷纸
     * @param params 压缩后的信息
     * @param request 请求
     * @param response 返回
     * @throws Exception 异常
     */
    @RequestMapping("/createPaper")
    public void createPaper(
            @RequestParam("params") String params,
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {

        // 解压
        try {

            String servletPath = request.getServletContext().getRealPath("/");    // 服务器地址，即target目录下的kuangshanJava根目录
            byte[] bytes = params.getBytes("iso-8859-1");    // 获取压缩的字节数组 并对数组进行解压
            params = GZIPUtils.uncompress(bytes, "iso-8859-1");

            if (params != null && params.trim().length() > 0) {
                params = URLDecoder.decode(params, "utf-8");    // 因为前台对参数进行了url编码,在此进行解码
                JSONObject json = JSON.parseObject(params);         // 将解码后的参数转换为 json 对象
                String paper_id = json.getString("id");         // 解析json字符串，并生成word文档

                // 获取相应题目
                String single_choose = json.getString("single_choose");
                String multi_choice = json.getString("multi_choice");
                String judge = json.getString("judge");
                String blanks_test = json.getString("blanks_test");
                String question = json.getString("question");

                // 获取相应题目列表
                List<TestSingleChooseT> singleList = JSON.parseArray(single_choose, TestSingleChooseT.class);
                List<TestMultiChoiceT> multiList = JSON.parseArray(multi_choice, TestMultiChoiceT.class);
                List<TestJudgeT> judgeList = JSON.parseArray(judge, TestJudgeT.class);
                List<TestQuestionAndAnswerT> questionList = JSON.parseArray(question, TestQuestionAndAnswerT.class);
                List<TestFillInBlanksT> blanksList = JSON.parseArray(blanks_test, TestFillInBlanksT.class);

                // 根据id获取试卷
                List<Map<String, Object>> paper = agtpS.getViewById(Integer.parseInt(paper_id));

                // 设置word参数
                FreemarkerUtil fu = new FreemarkerUtil();
                SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd HH:mm");  //设置日期格式
                String test_type = "1".equals(paper.get(0).get("test_type"))? "正常考试" : "补考";

                Map<String, Object> dataMap = new HashMap<String, Object>();
                dataMap.put("test_name", paper.get(0).get("test_name"));
                dataMap.put("test_type", test_type);
                dataMap.put("test_time", df.format(paper.get(0).get("test_start_time"))
                        + "-" + df.format(paper.get(0).get("test_end_time")));

                dataMap.put("test_address", paper.get(0).get("test_address"));
                dataMap.put("total_score", paper.get(0).get("total_score"));

                // 创建存储图片的列表
                List<Map<String, String>> imgList = new ArrayList<>();

                // 新建使用的工具类
                MatcherString matcherString = new MatcherString();

                // 获取单选题
                String singleTitle = "";
                List<Map<String, Object>> tempSingleList = new ArrayList<>();    // 临时储存选择题的列表
                if (!singleList.isEmpty()) {
                    float score = Float.parseFloat(paper.get(0).get("single_choose_score").toString());
                    BigDecimal bd = new BigDecimal(score);
                    score = bd.setScale(2).floatValue();

                    int num = Integer.parseInt(paper.get(0).get("single_choose_num").toString());
                    singleTitle = "一、单选题（每题" + score + "分*" + num + "=" + score * num + "分）";

                    for (int i = 0; i < singleList.size(); i++) {
                        Map<String, Object> listItem = new HashMap<>();
                        int number = i + 1;
                        listItem.put("number", number);

                        // 如果包含图片，则将图片放到图片列表中
                        if (singleList.get(i).getChoose_content().contains("<img src")) {
                            List<String> src = matcherString.getSrc(singleList.get(i).getChoose_content());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题题干的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("content", changeStr(singleList.get(i).getChoose_content()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (singleList.get(i).getSingle_choose_a().contains("<img src")) {
                            List<String> src = matcherString.getSrc(singleList.get(i).getSingle_choose_a());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项A的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseA", "A." + changeStr(singleList.get(i).getSingle_choose_a()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (singleList.get(i).getSingle_choose_b().contains("<img src")) {
                            List<String> src = matcherString.getSrc(singleList.get(i).getSingle_choose_b());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项B的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseB", "B." + changeStr(singleList.get(i).getSingle_choose_b()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (singleList.get(i).getSingle_choose_c().contains("<img src")) {
                            List<String> src = matcherString.getSrc(singleList.get(i).getSingle_choose_c());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项C的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseC", "C." + changeStr(singleList.get(i).getSingle_choose_c()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (singleList.get(i).getSingle_choose_d().contains("<img src")) {
                            List<String> src = matcherString.getSrc(singleList.get(i).getSingle_choose_d());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项D的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseD", "D." + changeStr(singleList.get(i).getSingle_choose_d()));
                        tempSingleList.add(listItem);
                    }

                }

                // 获取多选题
                String multiTitle = "";
                List<Map<String, Object>> tempMultiList = new ArrayList<>();    // 临时储存选择题的列表
                if (!multiList.isEmpty()) {
                    float score = Float.parseFloat(paper.get(0).get("multi_choice_score").toString());
                    BigDecimal bd = new BigDecimal(score);
                    score = bd.setScale(2).floatValue();

                    int num = Integer.parseInt(paper.get(0).get("multi_choice_num").toString());
                    if (singleList.isEmpty()) {
                        multiTitle = "一、多选题（每题" + score + "分*" + num + "=" + score * num + "分）";
                    } else {
                        multiTitle = "二、多选题（每题" + score + "分*" + num + "=" + score * num + "分）";
                    }

                    for (int i = 0; i < multiList.size(); i++) {
                        Map<String, Object> listItem = new HashMap<>();
                        int number = i + 1 + singleList.size();
                        listItem.put("number", number);

                        // 如果包含图片，则将图片放到图片列表中
                        if (multiList.get(i).getMulti_choice_content().contains("<img src")) {
                            List<String> src = matcherString.getSrc(multiList.get(i).getMulti_choice_content());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题题干的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("content", changeStr(multiList.get(i).getMulti_choice_content()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (multiList.get(i).getMulti_choice_a().contains("<img src")) {
                            List<String> src = matcherString.getSrc(multiList.get(i).getMulti_choice_a());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项A的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseA", "A." + changeStr(multiList.get(i).getMulti_choice_a()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (multiList.get(i).getMulti_choice_b().contains("<img src")) {
                            List<String> src = matcherString.getSrc(multiList.get(i).getMulti_choice_b());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项B的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseB", "B." + changeStr(multiList.get(i).getMulti_choice_b()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (multiList.get(i).getMulti_choice_c().contains("<img src")) {
                            List<String> src = matcherString.getSrc(multiList.get(i).getMulti_choice_c());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项C的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseC", "C." + changeStr(multiList.get(i).getMulti_choice_c()));

                        // 如果包含图片，则将图片放到图片列表中
                        if (multiList.get(i).getMulti_choice_d().contains("<img src")) {
                            List<String> src = matcherString.getSrc(multiList.get(i).getMulti_choice_d());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题选项D的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("chooseD", "D." + changeStr(multiList.get(i).getMulti_choice_d()));
                        tempMultiList.add(listItem);
                    }

                }

                // 获取判断题
                String judgeTitle = "";
                List<Map<String, Object>> tempJudgeList = new ArrayList<>();    // 临时储存选择题的列表
                if (!judgeList.isEmpty()) {
                    float score = Float.parseFloat(paper.get(0).get("judge_score").toString());
                    BigDecimal bd = new BigDecimal(score);
                    score = bd.setScale(2).floatValue();

                    int num = Integer.parseInt(paper.get(0).get("judge_num").toString());
                    if (singleList.isEmpty() && multiList.isEmpty()) {
                        judgeTitle = "一、判断题（每题" + score + "分*" + num + "=" + score * num + "分）";
                    } else if (singleList.isEmpty() && !multiList.isEmpty()
                            || !singleList.isEmpty() && multiList.isEmpty()){
                        judgeTitle = "二、判断题（每题" + score + "分*" + num + "=" + score * num + "分）";
                    } else {
                        judgeTitle = "三、判断题（每题" + score + "分*" + num + "=" + score * num + "分）";
                    }

                    for (int i = 0; i < judgeList.size(); i++) {
                        Map<String, Object> listItem = new HashMap<>();
                        int number = i + 1 + singleList.size() + multiList.size();
                        listItem.put("number", number);

                        // 如果包含图片，则将图片放到图片列表中
                        if (judgeList.get(i).getJudge_content().contains("<img src")) {
                            List<String> src = matcherString.getSrc(judgeList.get(i).getJudge_content());
                            for (int j = 0; j < src.size(); j++) {
                                Map<String, String> map = new HashMap<>();
                                map.put("img", ImageUtils.getImageString(servletPath + src.get(j)));
                                map.put("num", "第" + number + "题题干的图片");
                                imgList.add(map);
                            }
                        }
                        listItem.put("content", changeStr(judgeList.get(i).getJudge_content()));

                        tempJudgeList.add(listItem);
                    }

                }

                dataMap.put("singleTitle", singleTitle);
                dataMap.put("singleList", tempSingleList);

                dataMap.put("multiTitle", multiTitle);
                dataMap.put("multiList", tempMultiList);

                dataMap.put("judgeTitle", judgeTitle);
                dataMap.put("judgeList", tempJudgeList);

                dataMap.put("imgList", imgList);

                dataMap.put("filename", paper.get(0).get("test_name") + ".doc");
                dataMap.put("ftlname", "testPaper-word2003.ftl");
                fu.createWord(dataMap, request, response);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * 将试题中的图片/音频/视频更换文字展示，后去掉HTNL标签
     * @param str 试题字符串
     * @return 改变后的题目
     */
    private String changeStr(String str) {
        MatcherString ms = new MatcherString();
        if (str.contains("<img src")) {
            return ms.delHtmlTag(ms.replaceImg(str));

        } else if (str.contains("<audio class") || str.contains("<video class")) {
            return ms.delHtmlTag(ms.replaceVA(str));

        } else {
            return ms.delHtmlTag(str);
        }
    }



}
