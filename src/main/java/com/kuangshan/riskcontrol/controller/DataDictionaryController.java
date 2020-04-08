package com.kuangshan.riskcontrol.controller;

import com.kuangshan.riskcontrol.model.DatadictionaryT;
import com.kuangshan.riskcontrol.model.DirectoryofitemT;
import com.kuangshan.riskcontrol.service.DataDictionaryService;
import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.ReturnPost;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
import com.kuangshan.riskcontrol.tool.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/SystemMaintenance/DataDictionary")
public class DataDictionaryController {
    @Resource
    DataDictionaryService dataDictionaryService;
    ReturnPost returnPost = new ReturnPost();

    @RequestMapping(value = "DirectoryCategory")
    public ModelAndView DirectoryCategory(@RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
                                          @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions,
                                          HttpSession session) {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("DirectoryCategory");

        return mv;
    }

    @RequestMapping(value = "DatadictionaryMange")
    public ModelAndView DatadictionaryMange(@RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
                                            @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions,
                                            HttpSession session) {
        ModelAndView mv = new ModelAndView();

        //   List<DirectoryofitemT> datadictionaryTS=dataDictionaryService.selectDirectoryofitemByPage(pageindex);
        // mv.addObject("data",dataDictionaryService.selectDirectoryofitemByPage(pageindex));
        mv.setViewName("DatadictionaryMange");

        return mv;
    }

    //修改数据字典
    @RequestMapping(value = "DatadictionaryEdit")
    @ResponseBody
    public Map<String, Object> DatadictionaryEdit(@RequestParam(value = "DDItemID", required = false, defaultValue = "") String DDItemID, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        DatadictionaryT datadictionaryT = new DatadictionaryT();
        datadictionaryT = dataDictionaryService.selectByPrimaryKey1(Integer.parseInt(DDItemID));
        result.put("datadictionaryT", datadictionaryT);
        return result;
    }

    //修改字典类别管理 传递需要进行修改的字典的信息
    @RequestMapping(value = "DirectoryCategoryEdit")
    @ResponseBody
    public Map<String, Object> DirectoryCategoryEdit(@RequestParam(value = "DDCategoryNum", required = false, defaultValue = "") String DDCategoryNum, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        DirectoryofitemT directoryofitemT = new DirectoryofitemT();
        directoryofitemT = dataDictionaryService.selectByPrimaryKey(DDCategoryNum);
        result.put("directoryofitemT", directoryofitemT);
        return result;
    }

    //数据字典操作
    //字典类别管理执行添加
    @RequestMapping(value = "Add1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> addDataDirectory(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "ddcategory") String DDCategory,
                                 @RequestParam(value = "dditemnum") String DDItemNum, @RequestParam(value = "dditemvalue") String DDItemValue) {
        //   DirectoryofitemT directoryofitemT=new DirectoryofitemT();
        DatadictionaryT datadictionaryT = new DatadictionaryT();

        datadictionaryT.setIsdelete("否");
        datadictionaryT.setDdcategorynum(DDCategory);
        datadictionaryT.setDditemnum(DDItemNum);
        datadictionaryT.setDditemvalue(DDItemValue);

        int num = dataDictionaryService.insert1(datadictionaryT);
        Map<String, String> result = new HashMap<>();
        if (num == 1) {
            result.put("data", "success");
            return result;
        } else {
            result.put("data", "fail");
            return result;
        }

    }

    //字典类别管理执行删除
    @RequestMapping(value = "Delete1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> deleteDataDirectory(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "DDItemID") String DDItemID) {
        DBOperator dbOperator = new DBOperator("update datadictionary_t set isdelete='是' where DDITEMID IN (" + DDItemID + ")");
        dbOperator.executeUpdate();

        Map<String, String> result = new HashMap<>();
        int num = 1;
        if (num == 1) {
            result.put("data", "success");
            return result;
        } else {
            result.put("data", "fail");
            return result;
        }
    }

    //字典类别管理修改保存
    @RequestMapping(value = "Update1", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> updateDataDirectory(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "DDItemID") String DDItemID, @RequestParam(value = "ddcategory") String DDCategory, @RequestParam(value = "dditemnum") String DDItemNum, @RequestParam(value = "dditemvalue") String DDItemValue, @RequestParam(value = "isdelete") String isdelete) {

        DatadictionaryT datadictionaryT = new DatadictionaryT();
        datadictionaryT.setDditemid(Integer.parseInt(DDItemID));
        datadictionaryT.setIsdelete(isdelete);
        datadictionaryT.setDdcategorynum(DDCategory);
        datadictionaryT.setDditemnum(DDItemNum);
        datadictionaryT.setDditemvalue(DDItemValue);
        int num = dataDictionaryService.updateByPrimaryKeySelective1(datadictionaryT);

        Map<String, String> result = new HashMap<>();

        if (num == 1) {
            result.put("data", "success");
            return result;
        } else {
            result.put("data", "fail");
            return result;
        }

    }


    //字典类别管理执行添加

    @RequestMapping(value = "Add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> addDirectoryCategory(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "DDCategoryNum") String DDCategoryNum, @RequestParam(value = "DDCategoryName") String DDCategoryName) {

        DirectoryofitemT directoryofitemT = new DirectoryofitemT();
        directoryofitemT.setDdcategorynum(DDCategoryNum);
        directoryofitemT.setDdcategoryname(DDCategoryName);
        directoryofitemT.setIsdelete("否");
        int num = dataDictionaryService.insert(directoryofitemT);

        Map<String, String> result = new HashMap<>();

        if (num == 1) {
            result.put("data", "success");
            return result;
        } else {
            result.put("data", "fail");
            return result;
        }
    }
    //字典类别管理执行删除

    @RequestMapping(value = "Delete", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> deleteDirectoryCategory(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "DDCategoryNum") String DDCategoryNum) {

        String re = "";
        DBOperator dbOperator = new DBOperator("update directoryOfItem_t set isdelete='是' where DDCategoryNum IN ('" + DDCategoryNum + "')");
        dbOperator.executeUpdate();

        Map<String, String> result = new HashMap<>();
        int num = 1;
        if (num == 1) {
            result.put("data", "success");
            return result;
        } else {
            result.put("data", "fail");
            return result;
        }
      /*  DirectoryofitemT directoryofitemT=new DirectoryofitemT();
        directoryofitemT.setDdcategorynum(DDCategoryNum);
        // directoryofitemT.setDdcategoryname(DDCategoryName);
        directoryofitemT.setIsdelete("是");
        int num=  dataDictionaryService.updateByPrimaryKeySelective(directoryofitemT);
        Map<String,Object> result=new HashMap<>();
        result.put("re",num);
        return result;*/
    }

    //字典类别管理修改
    @RequestMapping(value = "Update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> updateDirectoryCategory(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "DDCategoryNum") String DDCategoryNum, @RequestParam(value = "DDCategoryName") String DDCategoryName, @RequestParam(value = "isdelete") String IsDelete) {

        DirectoryofitemT directoryofitemT = new DirectoryofitemT();
        directoryofitemT.setDdcategorynum(DDCategoryNum);
        directoryofitemT.setDdcategoryname(DDCategoryName);
        directoryofitemT.setIsdelete(IsDelete);
        int num = dataDictionaryService.updateByPrimaryKeySelective(directoryofitemT);

        Map<String, String> result = new HashMap<>();

        if (num == 1) {
            result.put("data", "success");
            return result;
        } else {
            result.put("data", "fail");
            return result;
        }
    }

    //字典类别管理获取list
    @RequestMapping(value = "getList")
    @ResponseBody
    public Map<String, Object> getlist(@RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
                                       @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions,
                                       HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        List<DirectoryofitemT> datadictionaryTS = dataDictionaryService.selectDirectoryofitemByPage(pageindex);
        int pagenum = (dataDictionaryService.selectAllPageNum() - 1) / 10 + 1;
        result.put("list", datadictionaryTS);
        result.put("pageNum", pagenum);
        return result;
    }

    //数据字典管理获取list
    @RequestMapping(value = "getlistdata")
    @ResponseBody
    public Map<String, Object> getlistdata(@RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
                                           @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions,
                                           HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        //  List<DirectoryofitemT> datadictionaryTS=dataDictionaryService.selectDirectoryofitemByPage(pageindex);
        if (!conditions.equals("")) {
            conditions = " and " + conditions;
        }
        DBOperator dbOperator = new DBOperator("select a.DDItemID,a.DDItemNum,a.DDItemValue,a.IsDelete,b.DDCategoryName from DataDictionary_T as a ,DirectoryOfItem_T as b  where a.DDCategoryNum=b.DDCategoryNum\n" +
                conditions + "\n" +
                "ORDER BY a.DDItemID,a.DDItemNum,a.DDItemValue,a.IsDelete,b.DDCategoryName\n" +
                "OFFSET " + (pageindex - 1) * 10 + " ROWS\n" +
                "FETCH NEXT 10 ROWS ONLY;");
        Map[] data = dbOperator.executeQuery();
        dbOperator = new DBOperator("select count(*) as _sum  from DataDictionary_T as a ,DirectoryOfItem_T as b  where a.DDCategoryNum=b.DDCategoryNum\n" +
                conditions + "\n");

        String allpagenum = dbOperator.getString("_sum");
        List<DirectoryofitemT> directoryofitemTList = dataDictionaryService.selectAllDirectoryofitem();
        result.put("options", directoryofitemTList);
        result.put("list", data);
        result.put("pageNum", (Integer.parseInt(allpagenum) - 1) / 10 + 1);
        return result;
    }


}
