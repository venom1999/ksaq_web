package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.service.EduSourceManageService;
import com.kuangshan.riskcontrol.tool.DBo;
import com.kuangshan.riskcontrol.tool.FileIO;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * 系统维护下的培训资源分类控制器
 */
@Controller
@RequestMapping("/SystemMaintenance")
public class EduSourceManageController {

    @Autowired
    private EduSourceManageService esmS;    // 培训资源分类服务

    private DBo dBo = new DBo();                // 工具类
    private String uploadPath;    // 上传文件路径
    private String requestPath;   // 请求路径

    /**
     * 点击导航栏进入的右侧页面
     * @return 页面
     */
    @RequestMapping("/EduSourceManage/EduSList_vue")
    public ModelAndView ParameterList(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        uploadPath = request.getSession().getServletContext().getRealPath("/")
            + "upload/SystemMaintenance/EduSourceManage/";
        requestPath = request.getContextPath() + "/upload/SystemMaintenance/EduSourceManage/";

        mv.setViewName("/SystemMaintenance/EduSourceManage/EduSourceManage");
        return mv;
    }


    /**
     * 获取表数据
     * @param pageindex 页数
     * @param conditions 查询条件
     * @return map
     */
    @RequestMapping(value = "/EduSourceManage/getList")
    @ResponseBody
    public Map<String, Object> getList(
            @RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
            @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions
    ) {
        Map<String, Object> result = new HashMap<>();
        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }

        List<EducationCategoryT> list = esmS.getParameterList(conditions, pageindex);
        int pageNum = esmS.getParameterPageNum(conditions);

        result.put("list", list);
        result.put("logoPath", requestPath);
        result.put("pageNum", pageNum);
        return result;
    }


    /**
     * 添加
     * @param record 数据
     * @return 是否成功
     * @throws Exception 文件异常
     */
    @RequestMapping(value = "/EduSourceManage/SubmitAddESM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> SubmitAddESM (
            @RequestBody EducationCategoryT record
    ) throws Exception {
        String result = esmS.insert(record)? "success" : "fail";
        Map<String, String> map = new HashMap<>();
        map.put("record", result);

        int id = record.getEdu_category_id();
        CopyFile(String.valueOf(id));
        return map;
    }

    /**
     * 提交时从temp文件夹复制文件至对应记录所在文件夹
     * @param id id
     */
    private void CopyFile(String id) throws Exception {
        String filenames = dBo.getString(
                "select logo from education_category_t " +
                        "where edu_category_id="
                        + id, "logo"
        );

        System.out.println("CopyFile: " + filenames);

        if (!"".equals(filenames)) {
            for (String filename : filenames.split("\\?")) {
                String source = uploadPath + "temp/" + filename;
                String dest = uploadPath + id + "/" + filename;
                FileIO.doCopyFile(source, dest);
            }
        }

    }


    /**
     * 上传图片
     * @param request 请求
     * @param file 文件
     * @return 是否成功
     */
    @RequestMapping("/EduSourceManage/uploadLogo")
    @ResponseBody
    public String uploadLogo(
            HttpServletRequest request,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            request.setCharacterEncoding("utf-8");
            if(!FileIO.isLegalFile(file)){
                return "error";
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        String storePath = uploadPath +  "temp/";

        if (!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            File filepath = new File(storePath, fileName);

            if (!filepath.getParentFile().exists()) {
                filepath.getParentFile().mkdirs();//如果目录不存在，创建目录
            }
            try {
                //把文件写入目标文件地址
                file.transferTo(new File(storePath + File.separator + fileName));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return "";
    }


    /**
     * 逻辑删除
     * @param id_list 删除列表id
     * @return 是否成功
     */
    @RequestMapping("/EduSourceManage/DeleteESM")
    @ResponseBody
    public Map<String, String> DeleteESM(
            @RequestParam("id_list") String id_list
    ) {
        Map<String, String> result = new HashMap<>();
        Boolean flag = false;

        for (String id : id_list.split(",")) {
            EducationCategoryT ec = new EducationCategoryT();
            ec.setEdu_category_id(Integer.parseInt(id));
            ec.setDeleted(1);

            flag = esmS.DeleteESM(ec);
        }

        if (flag) {
            result.put("result", "success");
        } else {
            result.put("result", "error");
        }
        return result;

    }


    /**
     * 详细信息
     * @param id id
     * @return 详细信息
     */
    @RequestMapping("/EduSourceManage/DetailESM")
    @ResponseBody
    public Map<String, Object> EPDetail(
            @RequestParam("edu_category_id") String id
    ) {
        Map<String, Object> result = new HashMap<>();
        result.put("record", esmS.getDetail(Integer.parseInt(id)));
        result.put("logoPath", requestPath);
        return result;
    }


    @RequestMapping(value = "/EduSourceManage/SubmitEditESM", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> updateEP(
            @RequestBody EducationCategoryT record
    ) {
        try {
            String id = String.valueOf(record.getEdu_category_id());
            Map<String, String> map = new HashMap<>();
            String result =  esmS.DeleteESM(record) ? "success" : "error";

            CopyFile(id);
            map.put("record", result);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



}
