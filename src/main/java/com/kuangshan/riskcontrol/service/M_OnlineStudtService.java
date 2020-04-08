package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EducationResourceTMapper;
import com.kuangshan.riskcontrol.dao.OnlineEduTimeTMapper;
import com.kuangshan.riskcontrol.model.OnlineEduTimeT;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service
public class M_OnlineStudtService {
    @Resource
    EducationResourceTMapper et;
    @Resource
    OnlineEduTimeTMapper ot;

    public int insertSelective(OnlineEduTimeT record) {
        return ot.insertSelective(record);
    }

    public List<Map<String,Object>> getResourceList(String userID) {
        return et.getResourceList(userID);
    }

    public List<Map> getResCategory() {
        return et.getResCategory();
    }

    public List<Map> getScondItem(Integer resID) {
        return et.getScondItem(resID);
    }

    public List<Map> getCultivateInfo(Integer resID) {
        return ot.getCultivateInfo(resID);
    }

    public boolean hasRecord(String upload_file_name,Integer resId) {
        return ot.hasRecord(upload_file_name,resId)>0;
    }

    public int updateTotalTIme(String upload_file_name, Integer total_time) {
        return ot.updateTotalTIme(upload_file_name, total_time);
    }

    public List<String> getCultivate(Integer resID) {
        return et.getCultivate(resID);
    }

    public List<Map<String,Object>> getCultivateNowPoint(String userID) {
        return ot.getCultivateNowPoint(userID);
    }

    public int getCultivateTotalPoint(String educationName) {
        return ot.getCultivateTotalPoint(educationName);
    }

    public List<Map<String,Object>> sumKey(List<Map<String,Object>> oldList) {
        Map<String, Map<String, Object>> result = new HashMap<String, Map<String,Object>>();
        List<Map<String,Object>>  allList = new ArrayList<>();
        for(Map<String, Object> map : oldList){
            String educationName = map.get("title").toString();
            Long value = Long.parseLong(map.get("grad").toString());
            if(result.containsKey(educationName)){
                Long temp = Long.parseLong(result.get(educationName).get("grad").toString());
                value += temp;
                result.get(educationName).put("grad", value);
                continue;
            }
            result.put(educationName, map);
            allList.add(map);
        }
        return allList;
    }

    public List<Map<String, Object>> getSelfStudyPoint(String userID) {
        return ot.getSelfStudyPoint(userID);
    }
}
