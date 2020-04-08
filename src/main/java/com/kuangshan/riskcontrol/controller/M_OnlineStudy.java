package com.kuangshan.riskcontrol.controller;


import com.kuangshan.riskcontrol.model.EducationResourceT;
import com.kuangshan.riskcontrol.model.OnlineEduTimeT;
import com.kuangshan.riskcontrol.service.M_OnlineStudtService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import com.kuangshan.riskcontrol.tool.RequestParam;

import org.springframework.web.bind.annotation.ResponseBody;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/mobile/OnlineStudy")
public class M_OnlineStudy {
    @Resource
    M_OnlineStudtService os;

    @RequestMapping("/test1")
    @ResponseBody
    public Map getEmployeeList1(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println(request.getParameter("firstParam"));
        System.out.println(request.getParameter("secondParam"));
        Map<String, Object> result = new HashMap<>();
        result.put("status", "ok");
        return result;
    }
    @RequestMapping("/test2")
    @ResponseBody
    public Map<String, String> getEmployeeList2(@RequestBody Map map){
        System.out.println(map.get("firstParam").toString());
        Map<String, String> result = new HashMap<>();
        result.put("status", "ok");
        return result;
    }
    @RequestMapping("/test3")
    @ResponseBody
    public Map<String, String>  getEmployeeList3(@RequestParam("firstParam") String id1,@RequestParam("secondParam") String id2){
        System.out.println(id1);
        System.out.println(id2);
        Map<String, String> result = new HashMap<>();
        result.put("status", id1);
        return result;
    }
    @RequestMapping("/getResourceList")
    @ResponseBody
    public Map getResourceList(@RequestParam("userID") String userID){
        List<Map<String,Object>> list = os.getResourceList(userID);
        //记录自增二级列表key值
        int count = 1;
        for (int i = 0; i < list.size(); ++i) {
            //用于自增二级文件key
            list.get(i).put("key", count++);
            list.get(i).put("show",true);
            //处理一个资源对应多个培训的情况
            List cultivateList = os.getCultivate(Integer.parseInt(list.get(i).get("resId").toString()));
            if (!cultivateList.isEmpty()) {
                list.get(i).put("cultivate",cultivateList);
            }
            List tempList = os.getScondItem(Integer.parseInt(list.get(i).get("resId").toString()));
            list.get(i).put("data", tempList);
        }
        Map<String, Object> result = new HashMap<>(3);
        result.put("status", "ok");
        result.put("resList", list);
        return result;
    }
    @RequestMapping("/getResCategory")
    @ResponseBody
    public Map getResCategory() {
        Map<String, Object> result = new HashMap<>();
        List<Map> list = os.getResCategory();
        Map temp = new HashMap();
        temp.put("id", "全部培训类型");
        list.add(0, temp);
        result.put("status", "ok");
        result.put("resList", list);
        return result;
    }

    @RequestMapping("/getStudyTime")
    @ResponseBody
    public void getStudyTime(@RequestParam("empNum") String empNum,
                            @RequestParam("edu_resource_id") String resId,
                            @RequestParam("upload_file_name") String fileName,
                            @RequestParam("total_time") String totalTime) {
        System.out.println(empNum+" "+resId+" "+fileName+" "+totalTime);
        if (os.hasRecord(fileName,Integer.parseInt(resId))) {
            //有记录，时间累加
            os.updateTotalTIme(fileName, Double.valueOf(totalTime).intValue());
        } else {
            //无记录，inset
            OnlineEduTimeT record = new OnlineEduTimeT();
            List<Map> info = os.getCultivateInfo(Integer.parseInt(resId));
            if (!info.isEmpty()) {
                //有对应培训
                String education_id = "";
                String education_name = "";
                for (int i = 0; i < info.size(); ++i) {
                    education_id = i == info.size() - 1 ? (education_id + info.get(i).get("education_id")) : (education_id + info.get(i).get("education_id") + ";");
                    education_name = i == info.size() - 1 ? (education_name + info.get(i).get("education_name")) : (education_name + info.get(i).get("education_name") + ";");
                }
                record.setEducation_id(education_id);
                record.setEducation_name(education_name);
            }
            record.setEmployee_num(empNum);
            record.setOnline_edu_res_id(Integer.parseInt(resId));
            record.setUpload_file_name(fileName);
            record.setTotal_time(Double.valueOf(totalTime).intValue());
            os.insertSelective(record);
        }

    }
    @RequestMapping("/getCultivatePoint")
    @ResponseBody
    public Map getCultivatePoint (@RequestParam("userID") String userID){
        Map<String, Object> result = new HashMap<>();
        List<Map<String,Object>> listTemp = os.getCultivateNowPoint(userID);
        List<Map<String,Object>> listReal = new ArrayList<>();
        for (int i = 0; i < listTemp.size(); ++i) {
            if (listTemp.get(i).get("title").toString().contains(";")) {
                String str = listTemp.get(i).get("title").toString();
                for (String retval: str.split(";")){
                    Map map = new HashMap();
                    map.put("title", retval);
                    map.put("grad", listTemp.get(i).get("grad"));
                    listReal.add(map);
                }
            } else {
                listReal.add(listTemp.get(i));
            }
        }
        listReal=os.sumKey(listReal);
        for (int i = 0; i < listReal.size(); ++i) {
            listReal.get(i).put("totalGrad", os.getCultivateTotalPoint(listReal.get(i).get("title").toString()));
        }
        System.out.println(listReal);
        result.put("resList", listReal);
        return result;
    }

    @RequestMapping("/getSelfStudyPoint")
    @ResponseBody
    public Map getSelfStudyPoint(@RequestParam("userID") String userID) {
        Map<String, Object> result = new HashMap<>();
        result.put("resList", os.getSelfStudyPoint(userID));
        return result;
    }
}
