package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.TestMultiChoiceT;
import com.kuangshan.riskcontrol.service.EduSourceManageService;
import com.kuangshan.riskcontrol.service.TestMultiChoiceService;
import com.kuangshan.riskcontrol.tool.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/ExamQuestionManage")
public class TestMultiChoiceController {

    @Autowired
    private TestMultiChoiceService tmcS;    // 多选题服务器

    @Autowired
    private EduSourceManageService esmS;

    private String realPath;    // 部署后的地址

    /**
     * 打开多选题的界面
     */
    @RequestMapping("/Multi/List_vue")
    public ModelAndView TCList_vue(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/ExamQuestionManage/Multi/TestMultiChoice");
        realPath = request.getServletContext().getRealPath("/");
        return mv;
    }


    /**
     * 获取多选题页面的数据
     * @param pageindex  页码
     * @param conditions 查询条件
     * @return 返回数据
     */
    @RequestMapping("/Multi/GetList_vue")
    @ResponseBody
    public Map<String, Object> GetList_vue(
            @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
            @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions
    ) throws SQLException {

        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }
        List<Map<String, Object>> list = tmcS.getListByPage(conditions, pageindex);
        int pagenum = tmcS.getListPageNum(conditions);

        pagenum = pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        Map<String, Object> result = new HashMap<>();

        result.put("list", list);//数据
        result.put("pagenum", pagenum);//总页码

        result.put("eduCateList", esmS.selectAll());
        return result;
    }


    /**
     * 添加功能
     * @param record 添加对象
     * @return success / fail
     * @throws Exception 文件复制的异常
     */
    @RequestMapping("/Multi/SubmitAdd")
    @ResponseBody
    public Map<String, String> addTC(
            @RequestBody TestMultiChoiceT record
    ) throws Exception {

        MatcherString ms = new MatcherString();
        List<String> tempList = ms.getSrc(record.toString());
        if (!tempList.isEmpty()) {
            List<String> newList = ms.delTemp(tempList);
            if (!newList.isEmpty()) {
                CopyFile(tempList, newList);
            }
        }

        delTempFile();
        delTemp(record);

        String result = (tmcS.add(record) > 0)? "success" : "fail";
        Map<String, String> map = new HashMap<>();
        map.put("record", result);

        return map;

    }


    /**
     * 提交时从temp文件夹复制文件至对应记录所在文件夹
     */
    private void CopyFile(List<String> tempList, List<String> newList) throws Exception {

        for (int i = 0; i < tempList.size(); i++) {
            System.out.println("CopyFile: " + realPath + tempList.get(i) + "to: " + realPath + newList.get(i));
            FileIO.doCopyFile(realPath + tempList.get(i), realPath + newList.get(i));
        }
    }


    /**
     * 删除/temp/字段
     * @param record 对象
     */
    private void delTemp(TestMultiChoiceT record) {
        String target = "/temp/";
        if (record.getMulti_choice_content().contains(target)) {
            record.setMulti_choice_content(record.getMulti_choice_content().replace(target, "/"));
        }
        if (record.getMulti_choice_a().contains(target)) {
            record.setMulti_choice_a(record.getMulti_choice_a().replace(target, "/"));
        }
        if (record.getMulti_choice_b().contains(target)) {
            record.setMulti_choice_b(record.getMulti_choice_b().replace(target, "/"));
        }
        if (record.getMulti_choice_c().contains(target)) {
            record.setMulti_choice_c(record.getMulti_choice_c().replace(target, "/"));
        }
        if (record.getMulti_choice_d().contains(target)) {
            record.setMulti_choice_d(record.getMulti_choice_d().replace(target, "/"));
        }
    }

    /**
     * 删除临时文件
     */
    private void delTempFile() {
        String srcA = realPath + "/upload/ueditor/image/temp";
        String srcB = realPath + "/upload/ueditor/video/temp";
        File fileA = new File(srcA);
        File fileB = new File(srcB);

        if (fileA.exists() || fileB.exists()) {
            FileIO.deleteDirectory(srcA);
            FileIO.deleteDirectory(srcB);
        }

    }


    /**
     * 删除（逻辑删除）
     * @param id_list
     * @return 是否成功
     */
    @RequestMapping("/Multi/Delete")
    @ResponseBody
    public String delete(
            @RequestParam("id_list") String id_list
    ) {
        boolean flag = true;
        for (String id : id_list.split(",")) {
            TestMultiChoiceT tmc = tmcS.selectByID(Integer.parseInt(id));
            if (tmcS != null) {
                tmc.setDeleted(1);
                System.out.println(tmc.toString());
                flag = tmcS.update(tmc);
            }
        }

        return flag? "success" : "error";
    }


    /**
     * 修改信息
     * @param record 是否成功
     */
    @RequestMapping("/Multi/SubmitEdit")
    @ResponseBody
    public Map<String, String> update(
            @RequestBody TestMultiChoiceT record
    ) throws Exception {

        MatcherString ms = new MatcherString();
        List<String> tempList = ms.getSrc(record.toString());
        TestMultiChoiceT old = tmcS.selectByID(record.getMulti_choice_id());

        List<String> oldList = ms.getSrc(old.toString());

        if (!tempList.isEmpty()) {
            for (String list : tempList) {
                System.out.println("list: " + list);

                if (!oldList.isEmpty()) {
                    if (!oldList.contains(list)) {
                        if (list.contains("/temp/")) {
                            String newSrc = list.replace("/temp/", "/");
                            FileIO.doCopyFile(realPath + list, realPath + newSrc);
                        }
                    }
                } else {
                    if (list.contains("/temp/")) {
                        String newSrc = list.replace("/temp/", "/");
                        FileIO.doCopyFile(realPath + list, realPath + newSrc);
                    }
                }
            }
        }

        delTempFile();
        delTemp(record);
        Map<String, String> map = new HashMap<>();

        String result = tmcS.update(record)? "success" : "error";

        if ("success".equals(result) && !oldList.isEmpty()) {
            List<TestMultiChoiceT> allTc = tmcS.selectAll();
            List<String> allList = ms.getSrc(allTc.toString());
            if (!allList.isEmpty()) {
                for (String src : oldList) {
                    if (!allList.contains(src)) {
                        tmcS.deleteFile(realPath + src);
                    }
                }
            }
        }

        map.put("record", result);
        return map;

    }


    /**
     * 导出导入模板
     * @param eduCategoryName 培训分类
     * @param eduKnowPList 知识点列表
     * @param response 回应
     * @throws Exception 异常
     */
    @RequestMapping("/Multi/downExcelMould")
    public void downExcelMould(
            @RequestParam("eduCategoryName") String eduCategoryName,
            @RequestParam("eduKnowPList") String[] eduKnowPList,
            HttpServletResponse response
    ) throws Exception{
        String fileName = "多选题导入模板_" + eduCategoryName + "_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        String[] headerValue = {"培训类型", "知识点", "选择题题干", "选择项A", "选择项B", "选择项C", "选择项D", "答案", "答案解析"};
        String[] answer = {"A", "B", "C", "D", "A,B", "A,C", "A,D", "B,C", "B,D", "C,D", "A,B,C", "A,B,D", "A,C,D", "B,C,D", "A,B,C,D"};

        // 设置第几列是需要选择的
        List<Character> col = new ArrayList<>();
        List<String[]> strA = new ArrayList<>();

        col.add('A');
        strA.add(new String[] {eduCategoryName});

        col.add('B');
        strA.add(null);

        col.add('H');
        strA.add(answer);
        FileManager.ExportToExcelForTest(fileName, headerValue, col, strA, response);
    }


    /**
     * 上传模板文件
     * @param file 模板文件
     * @param request 请求
     * @return 返回
     * @throws IOException IO异常
     */
    @RequestMapping("/Multi/uploadFile")
    @ResponseBody
    public Map<String, Object> fileUpload(
            @RequestParam("file") CommonsMultipartFile[] file,
            HttpServletRequest request
    ) throws IOException {

        try {
            request.setCharacterEncoding("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        String dir = request.getSession().getServletContext().getRealPath("/");     // 存储文件的根目录
        String storeRoot = dir + "upload/Testxls/";          // 相对目录
        String fileName = file[0].getOriginalFilename();    // 文件名

        File folder = new File( storeRoot);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        File newFile = new File(storeRoot + fileName);
        file[0].transferTo(newFile);
        Map<String, Object> result = new HashMap<>();

        result.put("name", fileName);
        result.put("text", "success");
        return result;
    }


    // 导入数据
    @RequestMapping("/Multi/uploadTable")
    @ResponseBody
    public String uploadTable(
            @RequestParam("files") String files,
            HttpServletRequest request
    ) throws Exception {
        // MultipartFile是对当前上传的文件的封装，当要同时上传多个文件时，可以给定多个MultipartFile参数
        String returnText = "";

        String dir = request.getSession().getServletContext().getRealPath("/");
        files = dir + "upload/Testxls/" + files;

        File file = new File(files);
        if (!file.exists()) {
            returnText = "error";
            return returnText;
        }

        PoiReadExcel readExcel = new PoiReadExcel(files);
        List<List<String>> lists = readExcel.readExcelContent();
        List<EducationCategoryT> ekps = esmS.selectAll();       // 获取培训分类和知识点的视图

        if (tmcS.importData(lists, ekps)) {
            returnText = "success";
        } else {
            returnText = "error";
        }

        return returnText;
    }



}
