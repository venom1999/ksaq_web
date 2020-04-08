package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EducationCategoryTMapper;
import com.kuangshan.riskcontrol.dao.EducationResourceTMapper;
import com.kuangshan.riskcontrol.dao.ResourceContentTMapper;
import com.kuangshan.riskcontrol.model.EducationResourceT;
import com.kuangshan.riskcontrol.model.ResourceContentT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OnlineEduResourceService {

    @Resource
    private EducationCategoryTMapper ectm;//资源类别对象
    @Resource
    private EducationResourceTMapper ertm;//资源对象
    @Resource
    private ResourceContentTMapper rctm;//资源内容ID

    //根据查询条件和页数获取满足条件的记录
    public List<Map<String, Object>> getList(String conditions, Integer pageindex)throws SQLException {
        DBo db = new DBo();
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "select row_number() over (order by edu_resource_id desc) as rn,edu_category_id,edu_category_name,edu_resource_id,resource_name,resource_introduction,is_released,resource_credit,EmployeeName,CONVERT(varchar(100), upload_time, 23) as upload_time from education_resource_view " + conditions;
        if(db.getListByPage(sql, pageindex).size()>0){
            result = db.getListByPage(sql, pageindex);
        }
        for(int i=0;i<result.size();i++){
            //获取此条记录的资源内容的所有学分
            result.get(i).put("learning_time",getSumContent(Integer.parseInt(result.get(i).get("edu_resource_id").toString())));
        }
        return result;
    }
    //获取总记录页数
    public int getListPageNum(String conditions) throws SQLException {
        DBo db = new DBo();
        String sql="select row_number() over (order by edu_resource_id desc) as rn,edu_category_id,edu_category_name,edu_resource_id,resource_name,resource_introduction,is_released,resource_credit,EmployeeName from education_resource_view " + conditions;
        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(db.getString(sql,"_sum"));
    }
    //获取全部的培训类型
    public List<Map<String, Object>> getCategory() throws SQLException{
        String sql = "select edu_category_id, edu_category_name from education_category_t where deleted = 0";
        DBo db = new DBo();
        List<Map<String, Object>> result = db.executeQuery(sql);
        return result;
    }
    //获取全部的员工
    public List<Map<String, Object>> getEmployee() throws SQLException{
        String sql = "select EmployeeNum, EmployeeName from Employee_t where IsRetire = '0'";
        DBo db = new DBo();
        List<Map<String, Object>> result = db.executeQuery(sql);
        return result;
    }
    //添加资源
    public boolean insertResource(EducationResourceT ert){
        return ertm.insertSelective(ert)>0;
    }

    //获取新添加资源记录的id
    public Integer getLastResourceID(){
        return ertm.getLastEduResID();
    }
    //添加资源内容
    public boolean insertContent(ResourceContentT rct){
        return rctm.insertSelective(rct)>0;
    }
    //删除资源
    public boolean deleteResource(Integer id){
        return ertm.deleteByPrimaryKey(id)>0;
    }
    //根据资源ID删除资源内容
    public boolean deleteContent(Integer id){
        return rctm.deleteByResID(id)>0;
    }
    //根据资源内容ID删除内容
    public boolean deleteContentByID(Integer id){
        return rctm.deleteByPrimaryKey(id)>0;
    }
    //获取资料的详细信息及其查询条件下的所有记录[上下条]
    public Map<String, Object> getDetail(Integer id, String conditions, Integer pageindex)throws SQLException{
        //获取此条记录的详细信息
        Map<String, Object> resource = getEduResourceByID(id);
        //获取此条记录对应的资源内容的信息
        List<Map<String, Object>> content = getResourceContentByID(id);
        DBo DBo=new DBo();
        List<Map<String, Object>> list=DBo.executeQuery("select edu_resource_id from  education_resource_view\n" +
                conditions +"\n"+
                "ORDER BY [edu_resource_id] desc\n" +
                "  OFFSET "+(pageindex - 1) * 10 +" ROWS FETCH NEXT 10 ROWS ONLY;");
        Map<String,Object> val=new HashMap<>();
        if(list!=null) {
            val.put("list",list);
        }else {
            val.put("list",0);
        }
        val.put("resource",resource);
        val.put("content", content);
        return val;
    }
    //根据获取id获取详细信息
    public Map<String, Object> getEduResourceByID(Integer id)throws SQLException{
        String sql = "select edu_resource_id,edu_category_name,resource_name,resource_introduction,is_released,resource_credit,EmployeeName,upload_time from education_resource_view where edu_resource_id = "+id;
        DBo db = new DBo();
        List<Map<String, Object>> rmap = db.executeQuery(sql);
        return rmap.get(0);//有id则一定存在相关的记录信息与之对应
    }
    //根据资源ID获取内容信息
    public List<Map<String, Object>> getResourceContentByID(Integer id)throws SQLException{
        String sql = "select res_content_id,edu_resource_id,upload_file_name,content_credit,min_learning_time from resource_content_t where edu_resource_id = "+id;
        DBo db = new DBo();
        List<Map<String, Object>> rmaps = db.executeQuery(sql);
        return rmaps;
    }
    //根据获取id获取修改信息
    public Map<String, Object> getEditEduResourceByID(Integer id)throws SQLException{
        String sql = "select edu_resource_id,resource_category,resource_name,resource_introduction,is_released,resource_credit,upload_person,upload_time from education_resource_t where edu_resource_id = "+id;
        DBo db = new DBo();
        List<Map<String, Object>> rmap = db.executeQuery(sql);
        return rmap.get(0);//有id则一定存在相关的记录信息与之对应
    }
    //修改资源
    public boolean editResource(EducationResourceT record){
        return ertm.updateByPrimaryKeySelective(record)>0;
    }
    //修改资源内容
    public boolean editContent(ResourceContentT record){
        return rctm.updateByPrimaryKeySelective(record)>0;
    }
    //判断此资源内容是否已存在
    public boolean isExitContent(Integer content_id, Integer resource_id)throws SQLException{
        boolean exitFlag = false;//假设不存在
        String sql = "select res_content_id from resource_content_t where edu_resource_id = "+resource_id;
        DBo db = new DBo();
        List<Map<String, Object>> lmap = db.executeQuery(sql);
        for (int i=0;i<lmap.size();i++){
            Integer res_content_id = (Integer) lmap.get(i).get("res_content_id");
            System.out.println("数据库id:"+res_content_id+"上传_id:"+content_id);
            if(content_id == res_content_id){
                exitFlag = true;
                break;
            }
        }
        return exitFlag;
    }
    //根据资源ID获取所有资源内容
    public Integer getSumContent(Integer id)throws SQLException{
        DBo db = new DBo();
        Integer sum = 0;
        String sql = "select * from resource_content_t where edu_resource_id = "+id;
        List<Map<String, Object>> result = db.executeQuery(sql);
        for(int k=0;k<result.size();k++){
            sum += Integer.parseInt(result.get(k).get("min_learning_time").toString());
        }
        return sum;
    }
    //判断资源是否已经发布
    public boolean isReleased(List<String> id_list){
        List<Integer> result = ertm.getReleasedStatus(id_list);
        for (int i=0;i<result.size();i++){
            System.out.println("flag:"+result.get(i));
            if(result.get(i).equals(1)){
                return true;
            }
        }
        return false;
    }
    //设置发布为真
    public boolean setIsReleased(Integer id){
        return ertm.setIsReleased(id)>0;
    }
    //多项发布
    public boolean setMulReleased(String id_list)throws SQLException{
        String sql = "update education_resource_t set is_released = 1 where edu_resource_id in ("+id_list+")";
        DBo db = new DBo();
        return db.executeUpdate(sql)>0;
    }
}
