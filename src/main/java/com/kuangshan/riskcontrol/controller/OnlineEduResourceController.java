package com.kuangshan.riskcontrol.controller;

import com.alibaba.fastjson.JSONObject;
import com.kuangshan.riskcontrol.model.EducationResourceT;
import com.kuangshan.riskcontrol.model.ResourceContentT;
import com.kuangshan.riskcontrol.service.EducationTrainService;
import com.kuangshan.riskcontrol.service.OnlineEduResourceService;

import com.kuangshan.riskcontrol.tool.DBo;
import com.kuangshan.riskcontrol.tool.FileIO;
import com.kuangshan.riskcontrol.tool.FileManager;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/OnlineResourceEdu")
public class OnlineEduResourceController {

    @Resource
    private OnlineEduResourceService oers;
    @Resource
    private EducationTrainService ets;

    private String resourceStorePath;
    @RequestMapping("/ListVue")
    public ModelAndView OnlineEduVue(HttpServletRequest request){
        resourceStorePath = request.getServletContext().getRealPath("/") + "upload/OnlineResourceEdu/";
        System.out.println("path:"+request.getServletContext().getRealPath("/"));
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/OnlineResourceEdu/OnlineResourceEdu");
        return mv;
    }

    @RequestMapping("/getList")
    @ResponseBody
    public Map<String, Object> getList(@RequestParam(value = "pageindex", required = false, defaultValue = "1") String pageindex, @RequestParam(value = "conditions", required = false, defaultValue = "")String conditions)throws SQLException {
        if(StringUtils.isNotBlank(conditions)){
            conditions = "where" + conditions;
        }
        List<Map<String, Object>> list = new ArrayList<>();
        int pagenum = 0;
        int topageindex = Integer.parseInt(pageindex);
        System.out.println("conditions:"+conditions+";pageindex:"+topageindex);
        if(oers.getList(conditions, topageindex).size()>0){
            list = oers.getList(conditions, topageindex);
        }
        pagenum = oers.getListPageNum(conditions);
        pagenum= pagenum % 10 == 0 ? pagenum / 10 : pagenum / 10 + 1;
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("pagenum", pagenum);
        return result;
    }

    @RequestMapping("/getCategoryList")
    @ResponseBody
    public Map<String, Object> getCategoryList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("categorylist", oers.getCategory());
        return result;
    }

    @RequestMapping("/getEmployeeList")
    @ResponseBody
    public Map<String, Object> getEmployeeList()throws SQLException{
        Map<String, Object> result = new HashMap<>();
        result.put("employeelist", oers.getEmployee());
        return result;
    }

    @RequestMapping("/uploadMulFile")
    @ResponseBody
    public String uploadMulFile(HttpServletRequest request, @RequestParam("file") MultipartFile file){
        try {
            request.setCharacterEncoding("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String storePath = "";
        storePath = resourceStorePath + "temp/";
        System.out.println("storePath:"+storePath);
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
        return "ok";
    }

    @RequestMapping("/submitAddResource")
    @ResponseBody
    public Map<String, Object> AddResEdu(@RequestParam("formdata") String formdata){

        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        EducationResourceT ert = (EducationResourceT) JSONObject.toJavaObject(jsonObject,EducationResourceT.class);//json对象转换为javabean对象
        Map<String, Object> rmap = new HashMap<>();
        String returntext = "";
        returntext = oers.insertResource(ert)?"success":"error";
        rmap.put("returntext", returntext);
        rmap.put("lastid", oers.getLastResourceID());
        return rmap;
    }

    @RequestMapping("/submitAddContent")
    @ResponseBody
    public String AddContent(@RequestParam("formdata") String formdata)throws Exception{
        String returntext = "success";
        List<ResourceContentT> list = JSONObject.parseArray(formdata, ResourceContentT.class);//获取前端传入的Json字符串，并解析为对象集合进行遍历
        for(int i=0;i<list.size();i++){
            boolean boolresult = oers.insertContent(list.get(i));
            if(!boolresult)
                returntext = "error";
        }
        Integer id = oers.getLastResourceID();
        System.out.println("id:"+id);
        CopyFiles(String.valueOf(id));
        return returntext;
    }
    //判断某资源是否被培训绑定
    @RequestMapping("isReference")
    @ResponseBody
    public String isReference(@RequestParam("id_list")String id_list)throws SQLException{
        String returntext = "";
        List<String> list = Arrays.asList(id_list.split(","));
        //判断这些资源是否已发布，已发布资源不可删除
        if(oers.isReleased(list)){
            returntext = "error1";//有资源已经发布
        }else {
            returntext = ets.isReference(id_list)?"success":"error";
        }
        return returntext;
    }

    @RequestMapping("/deleteResource")
    @ResponseBody
    public String deleteResource(@RequestParam("id_list")String id_list){
        String returntext = "";
        String[] ids = id_list.split(",");//获取被删除的资源ID
        boolean deleteFlag = true;
        for(int i=0;i<ids.length;i++){
            System.out.println(ids[i]);
            //删除其下的资源内容文件
            String sPath = resourceStorePath + ids[i];
            deleteDirectory(sPath);
            //删除数据库的数据记录[资源+资源内容]
            if(!oers.deleteResource(Integer.parseInt(ids[i]))){
                deleteFlag = false;
            }
            if(!oers.deleteContent(Integer.parseInt(ids[i]))){
                deleteFlag = false;
            }
        }
        System.out.println("deleteFlag:"+deleteFlag);
        returntext = deleteFlag?"success":"error";
        return returntext;
    }
    //删除单个文件
    public static boolean deleteFile(String sPath) {
        boolean flag = false;
        File file = new File(sPath);
        // 路径为文件且不为空则进行删除
        if (file.isFile() && file.exists()) {
            file.delete();
            flag = true;
        }
        return flag;
    }
    //删除目录及文件
    public static boolean deleteDirectory(String sPath) {
        //如果sPath不以文件分隔符结尾，自动添加文件分隔符
        if (!sPath.endsWith(File.separator)) {
            sPath = sPath + File.separator;
        }
        File dirFile = new File(sPath);
        //如果dir对应的文件不存在，或者不是一个目录，则退出
        if (!dirFile.exists() || !dirFile.isDirectory()) {
            return false;
        }
        boolean flag = true;
        //删除文件夹下的所有文件(包括子目录)
        File[] files = dirFile.listFiles();
        for (int i = 0; i < files.length; i++) {
            //删除子文件
            if (files[i].isFile()) {
                flag = deleteFile(files[i].getAbsolutePath());
                if (!flag) break;
            } //删除子目录
            else {
                flag = deleteDirectory(files[i].getAbsolutePath());
                if (!flag) break;
            }
        }
        if (!flag) return false;
        //删除当前目录
        if (dirFile.delete()) {
            return true;
        } else {
            return false;
        }
    }

    @RequestMapping("getDetail")
    @ResponseBody
    public Map<String, Object> getDetail(@RequestParam("edu_resource_id")String id, @RequestParam("conditions")String conditions, @RequestParam("pageindex")String pageindex)throws SQLException{
        if(StringUtils.isNotBlank(conditions)){
            conditions = " where " +conditions;
        }
        return oers.getDetail(Integer.parseInt(id),conditions,Integer.parseInt(pageindex));
    }

    /**
     * 查看文件
     *
     * @param filename 文件名称
     * @param id       ID
     *                 返回值 type 预览文件类型 filepath预览文件路径
     */
    @RequestMapping("/viewFile")
    @ResponseBody
    public Map<String, Object> viewFile(@RequestParam(value = "filename", required = false, defaultValue = "-1") String filename,
                         @RequestParam(value = "id", required = false, defaultValue = "") String id) {
        Map<String, Object> rmap = new HashMap<>();
        try {
            //预览文件的类型
            String type = "";
            //原始文件的类型
            String contentType = filename.split("\\.")[filename.split("\\.").length - 1];
            //文件名（不含后缀）
            String name = filename.substring(0, filename.lastIndexOf("."));
            //文件地址
            String filepath = resourceStorePath + id + "/" + filename;
            File prefile = new File(resourceStorePath + id + "/preview");
            System.out.println("filepath:"+filepath+";prefile:"+prefile);
            if (!prefile.exists()) {
                prefile.mkdir();
            }
            if (contentType.equals("xlsx") || contentType.equals("xls")
                    || contentType.equals("doc") || contentType.equals("docx") || contentType.equals("ppt") ||
                    contentType.equals("pptx") || contentType.equals("txt")) {
                //Office转pdf
                type = "pdf";

                name = "/preview/" + name + "." + type;
                String previewPath = resourceStorePath + id + name;
                System.out.println("previewPath:"+previewPath);
                File file = new File(previewPath);
                if (!file.exists()) {
                    FileManager.convert2PDF(filepath, previewPath);
                }
            } else if (contentType.equals("wma") || contentType.equals("ape") || contentType.equals("flac") || contentType.equals("aac") ||
                    contentType.equals("ac3") || contentType.equals("mmf") || contentType.equals("amr") || contentType.equals("m4a") ||
                    contentType.equals("m4r") || contentType.equals("ogg") || contentType.equals("wav") || contentType.equals("wavpack") ||
                    contentType.equals("mp2") || contentType.equals("mp3")) {
                type = contentType;
                name = "/" + name + "." + type;
            } else if (contentType.equals("asx") || contentType.equals("asf") || contentType.equals("mpg") || contentType.equals("wmv") ||
                    contentType.equals("3gp") || contentType.equals("mp4") || contentType.equals("webm") || contentType.equals("mkv") || contentType.equals("avi") ||
                    contentType.equals("flv")) {
                type = contentType;
                name = "/" + name + "." + type;
            } else {
                type = contentType;
                name = "/" + name + "." + type;
            }
            name = "upload/OnlineResourceEdu/" + id + name;
            rmap.put("type",type);
            rmap.put("filepath",name.replace("\\", "\\\\"));
            System.out.println("path:"+name.replace("\\", "\\\\")+";type:"+type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rmap;
    }

    @RequestMapping("/download")
    public void downloadFile(HttpServletResponse response, @RequestParam("filename") String filename, @RequestParam("id") String id) throws Exception {
        System.out.println("path:"+filename);
        String filePath = resourceStorePath + id + "/";
        FileIO.downloadFile(response, filePath, filename);
    }

    @RequestMapping("/getfile")
    @ResponseBody
    public Map<String, Object> getfile(HttpServletResponse response, @RequestParam("id") String id) {
        DBo db = new DBo();
        Map<String, Object> result = new HashMap<>();
        try {
            String sql = "select upload_file_name from resource_content_t where edu_resource_id =" + id;
            List<Map<String, Object>> files = db.executeQuery(sql);
            result.put("filelist", files);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }



    /**
     * 提交时从temp文件夹复制文件至对应记录所在文件夹[单文件]
     */
    private void CopyFile(String id) throws Exception {
        DBo db = new DBo();
        String filenames = db.getString("select upload_file_name from resource_content_t where edu_resource_id =" + id, "upload_file_name");

        System.out.println("filenames:"+filenames);
        if (!filenames.equals("")) {
            for (String filename : filenames.split("\\?")
            ) {
                System.out.println("filename:"+filename);
                String source = resourceStorePath + "temp/" + filename;
                String dest = resourceStorePath + id + "/" + filename;
                FileIO.doCopyFile(source, dest);
            }
        }
    }
    //多文件
    private void CopyFiles(String id) throws Exception {
        DBo db = new DBo();
        String sql = "select upload_file_name from resource_content_t where edu_resource_id =" + id;
        List<Map<String, Object>> lmap = db.executeQuery(sql);
        for(int i=0;i<lmap.size();i++){
            String filename = lmap.get(i).get("upload_file_name").toString();
            String source = resourceStorePath + "temp/" + filename;
            String dest = resourceStorePath + id + "/" + filename;
            FileIO.doCopyFile(source, dest);
        }
    }

    @RequestMapping("getEdit")
    @ResponseBody
    public Map<String, Object> getResourceEdit(@RequestParam("edu_resource_id")String id){
        Map<String, Object> result = new HashMap<>();
        try {
            Map<String, Object> resource = oers.getEditEduResourceByID(Integer.parseInt(id));
            List<Map<String, Object>> content = oers.getResourceContentByID(Integer.parseInt(id));
            result.put("resource", resource);
            result.put("content",content);
        }catch (SQLException e){
            e.printStackTrace();
        }
        return result;
    }

    @RequestMapping("submitEditResource")
    @ResponseBody
    public Map<String, Object> EditResource(@RequestParam("formdata")String formdata){
        Map<String, Object> rmap = new HashMap<>();
        JSONObject jsonObject = JSONObject.parseObject(formdata);//json字符串转换为json对象
        EducationResourceT ert = (EducationResourceT) JSONObject.toJavaObject(jsonObject,EducationResourceT.class);//json对象转换为javabean对象
        String returntext = "";
        returntext = oers.editResource(ert)?"success":"error";
        rmap.put("returntext", returntext);
        rmap.put("lastid", ert.getEdu_resource_id());
        return rmap;
    }

    @RequestMapping("submitEditContent")
    @ResponseBody
    public String EditContent(@RequestParam("formdata")String formdata, @RequestParam("resourceid")String resourceid)throws SQLException{
        String returntext = "success";
        System.out.println("formdata:"+formdata);
        List<ResourceContentT> list = JSONObject.parseArray(formdata, ResourceContentT.class);//获取前端传入的Json字符串，并解析为对象集合进行遍历
        for(int i=0;i<list.size();i++){
            boolean boolresult = true;
            System.out.println("content:"+list.get(i).getRes_content_id()+"resource:"+list.get(i).getEdu_resource_id());
            if(oers.isExitContent(list.get(i).getRes_content_id(),list.get(i).getEdu_resource_id())){//判断此条记录是否已存在数据库中
                boolresult = oers.editContent(list.get(i));
            }else {
                boolresult = oers.insertContent(list.get(i));
            }
            if(!boolresult)
                returntext = "error";
        }
        Integer resource_id = Integer.parseInt(resourceid);
        //删除数据库多余记录
        List<Map<String, Object>> contents = oers.getResourceContentByID(resource_id);

        if(list.size()<contents.size()){//如果上传的文件个数小于数据库中该资源内容的个数：删除
            for(int i=0;i<contents.size();i++){
                Integer temp = (Integer) contents.get(i).get("res_content_id");
                boolean flag = false;
                for (int j=0;j<list.size();j++){
                    if(list.get(j).getRes_content_id()==temp){//数据库中文件记录依然存在
                        flag = true;
                    }
                }
                if(!flag){//若不存在：删除
                    //删除文件
                    String sPath = resourceStorePath + resource_id + "/"+contents.get(i).get("upload_file_name");
                    System.out.println("spath:"+sPath);
                    deleteFile(sPath);
                    //删除数据库记录
                    boolean f = oers.deleteContentByID(temp);
                    if (!f){
                        returntext = "error";
                    }
                }
            }
        }
        try {
            CopyFiles(String.valueOf(resource_id));
        }catch (Exception e){
            e.printStackTrace();
        }
        return returntext;
    }

    @RequestMapping("Export")
    public void ExportResource(@RequestParam("id_list")String id_list, @RequestParam("conditions")String conditions, @RequestParam("exportconditions")String exportconditions, HttpServletResponse response){
        String secondRow = null;
        DBo db = new DBo();

        if (StringUtils.isNotBlank(conditions)) {
            conditions = " where " + conditions;
        }
        secondRow = exportconditions;
        List<Map<String, Object>> list = null;
        try {
            if (StringUtils.isNotBlank(id_list)) {
                String sql = "select edu_category_id,edu_category_name,edu_resource_id,resource_name,resource_introduction,is_released,resource_credit,EmployeeName,CONVERT(varchar(100), upload_time, 23) as upload_time from education_resource_view where edu_resource_id in (" + id_list + ")";
                list = db.executeQuery(sql);
            } else {
                list = oers.getList(conditions, 0);
                if (!StringUtils.isNotBlank(secondRow)) {
                    secondRow = "";
                }
            }
        }catch (SQLException e){
            e.printStackTrace();
        }


        Map<String, String> columnHead = new LinkedHashMap<>();
        columnHead.put("序号", "rn");
        columnHead.put("资源名称", "resource_name");
        columnHead.put("培训类型", "edu_category_name");
        columnHead.put("资源简介", "resource_introduction");
        columnHead.put("资源学分", "resource_credit");
        columnHead.put("上传人", "EmployeeName");
        columnHead.put("上传时间", "upload_time");


        try {
            FileManager.ExportToExcel("在线安全教育资源信息_" + new SimpleDateFormat("yyyy-MM-dd").format(new Date()), "在线安全教育资料信息", secondRow, columnHead, list, response);
            //导出未完成
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    @RequestMapping("setIsReleased")
    @ResponseBody
    public String setIsReleased(@RequestParam("edu_resource_id")String id)throws SQLException{
        String returntext = "";
        returntext = oers.setIsReleased(Integer.parseInt(id))?"success":"error";
        return returntext;
    }

    @RequestMapping("mulReleased")
    @ResponseBody
    public String setMulReleased(@RequestParam("id_list")String id_list)throws SQLException{
        String returntext = "";
        returntext = oers.setMulReleased(id_list)?"success":"error";
        return returntext;
    }
}
