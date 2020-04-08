package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EducationInfoTMapper;
import com.kuangshan.riskcontrol.dao.RollEducationTMapper;
import com.kuangshan.riskcontrol.model.EducationInfoT;
import com.kuangshan.riskcontrol.model.RollEducationT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EducationTrainService {

    @Resource
    private EducationInfoTMapper eitm;
    @Resource
    private RollEducationTMapper retm;
    //获取机构列表
    public List<Map<String, Object>> getInstitution()throws SQLException {
        String sql = "select InstitutionNum, InstitutionName from institution_t where IsDelete = '否' and InstitutionCategoryNum = 3 or InstitutionCategoryNum = 4";
        DBo db = new DBo();
        return db.executeQuery(sql);
    }
    //获取资源列表
    public List<Map<String, Object>> getResource()throws SQLException{
        String sql = "select edu_resource_id, resource_name from education_resource_t where is_released = 1";//获取已发布的资源
        DBo db = new DBo();
        return db.executeQuery(sql);
    }
    //获取职位列表
    public List<Map<String, Object>> getPosition()throws SQLException{
        String sql = "select DDItemID,DDItemValue from datadictionary_t where DDCategoryNum = 'WorkPositionNum'";
        DBo db = new DBo();
        return db.executeQuery(sql);
    }
    //根据查询条件和页数获取满足条件的记录
    public List<Map<String, Object>> getList(String conditions, Integer pageindex)throws SQLException {
        DBo db = new DBo();
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "select row_number() over (order by education_id desc) as rn,education_id,education_num,education_name,InstitutionName,edu_category_name,education_content,education_number,CONVERT(varchar(100), start_time, 23) as start_time,CONVERT(varchar(100), end_time, 23) as end_time, education_address,is_released from education_info_category_institution_view " + conditions;
        if(db.getListByPage(sql, pageindex).size()>0){
            result = db.getListByPage(sql, pageindex);
        }
        return result;
    }
    //获取总记录页数
    public int getListPageNum(String conditions) throws SQLException {
        DBo db = new DBo();
        String sql = "select row_number() over (order by education_id desc) as rn,education_id,education_num,education_name,InstitutionName,edu_category_name,education_content,education_number,CONVERT(varchar(100), start_time, 23) as start_time,CONVERT(varchar(100), end_time, 23) as end_time, education_address,is_released from education_info_category_institution_view " + conditions;
        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(db.getString(sql,"_sum"));
    }
    //添加培训明细信息
    public boolean addEducationTrain(EducationInfoT record){
        return eitm.insertSelective(record)>0;
    }
    //获取培训明细的详细信息及其查询条件下的所有记录[上下条]
    public Map<String, Object> getDetail(Integer id, String conditions, Integer pageindex)throws SQLException{
        //获取此条记录的详细信息
        Map<String, Object> educationtrain = getEducationTrainByID(id);
        DBo DBo=new DBo();
        List<Map<String, Object>> list=DBo.executeQuery("select education_id from  education_info_category_institution_view\n" +
                conditions +"\n"+
                "ORDER BY [education_id] desc\n" +
                "  OFFSET "+(pageindex - 1) * 10 +" ROWS FETCH NEXT 10 ROWS ONLY;");
        Map<String,Object> val=new HashMap<>();
        if(list!=null) {
            val.put("list",list);
        }else {
            val.put("list",0);
        }
        val.put("educationtrain",educationtrain);
        return val;
    }
    //判断培训是否已经报名
    public boolean isEnrolled(Integer id){
        Long enrolled_num = retm.getCountByEID(id);
        if(enrolled_num>0){
            return true;//已经报名
        }else {
            return false;
        }
    }
    //判断培训是否结束
    public boolean isFinished(Integer id){
        if(eitm.getFinishedStatus(id)==0){
            return false;//还未结束
        }else {
            return true;//已经结束
        }
    }
    //获取培训明细的详细信息
    public Map<String, Object> getEducationTrainByID(Integer id)throws SQLException{
        String sql = "select education_id,education_num,education_name,institution_name,InstitutionName,edu_category_id,edu_category_name,education_content,education_number,education_type,education_tutor,education_material,education_budget,education_period,online_edu_res_idset,CONVERT(varchar(100), start_time, 23) as start_time,CONVERT(varchar(100), end_time, 23) as end_time, education_address,is_released from education_info_category_institution_view where education_id = "+id;
        DBo db = new DBo();
        return db.executeQuery(sql).get(0);
    }
    //修改培训明细
    public boolean submitEditEducationTrain(EducationInfoT record){
        return eitm.updateByPrimaryKeySelective(record)>0;
    }
    //判断培训是否已绑定考试
    public boolean isHaveTest(List<String> id_list){
        List<RollEducationT> ret = retm.getTestIDByEID(id_list);
        for (int i=0;i<ret.size();i++){
            if(ret.get(i).getTest_id()!=null){
                return true;//绑定考试
            }
        }
        return false;
    }
    //删除培训明细
    public boolean deleteEducationTrain(List<String> idlist){
        return eitm.deleteMulEducation(idlist)>0;
    }
    //删除培训的报名名单
    public boolean deleteEnterForm(List<String> idlist){
        return retm.deleteEnterForm(idlist)>0;
    }
    //判断是否被培训计划引用
    public boolean isReference(String resource_id_list)throws SQLException{
        String sql = "select online_edu_res_idset from education_info_t";
        DBo db = new DBo();
        List<Map<String,Object>> list = db.executeQuery(sql);
        String[] resource_ids = resource_id_list.split(",");
        boolean flag = false;
        for (int i=0;i<list.size();i++){
            //System.out.println("idset:"+list.get(i).get("online_edu_res_idset").toString());
            String[] ids = list.get(i).get("online_edu_res_idset").toString().split(",");
            for (int k=0;k<ids.length;k++){
                for (int j=0;j<resource_ids.length;j++){
                    //System.out.println("resource_ids:"+resource_ids[j]+";ids:"+ids[k]);
                    if(ids[k].equals(resource_ids[j])){
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    break;
                }
            }
            if(flag){
                break;
            }
        }
        return flag;
    }
    //获取培训名单
    public List<Map<String, Object>> getTrainRoll(Integer id)throws SQLException{
        String sql = "select roll_education_id,education_id,EmployeeName,EmployeeSex,EmployeeID,EmployeeNum,InstitutionNum,InstitutionName,WorkPositionNum,WorkPositionValue from roll_employee_view where education_id = "+id;
        DBo db = new DBo();
        List<Map<String, Object>> list = db.executeQuery(sql);
        return list;
    }
    //获取未参与培训名单
    public List<Map<String, Object>> getNotTrainRoll(String condition, Integer education_id)throws SQLException{
        String sql = "select EmployeeNum,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionPrefix,InstitutionName,WorkPositionNum,WorkPositionValue from (select distinct EmployeeNum,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionPrefix,InstitutionName,WorkPositionNum,WorkPositionValue from employee_institution_datadictionaryView "+condition+") as c where (select count(1) as num from roll_education_t where roll_education_t.employee_num = c.EmployeeNum and education_id="+education_id+") = 0";
        DBo db = new DBo();
        List<Map<String, Object>> list = db.executeQuery(sql);
        return list;
    }
    //添加培训员工
    public boolean addEmployee(String insertstr)throws SQLException{
        String sql = "insert into roll_education_t(employee_num,education_id,test_id,is_finished) values "+insertstr;
        DBo db = new DBo();
        return db.executeUpdate(sql)>0;
    }
    //删除培训员工
    public boolean deleteMulEmployee(List<String> id_list)throws SQLException{
        return retm.deleteMulEmployee(id_list)>0;
    }
    //设置培训中相关联的考试ID
    public boolean setTestID(Integer test_id, Integer education_id){
        return retm.setTestID(test_id, education_id)>0;
    }
    //设置发布为真
    public boolean setIsReleased(Integer id){
        return eitm.setIsReleased(id)>0;
    }
    //多项发布
    public boolean setMulReleased(List<String> id_list)throws SQLException{
        return eitm.setMulReleased(id_list)>0;
    }
    //设置预设培训人数
    public boolean setEmployeeNumber(Integer number, Integer id)throws SQLException{
        String sql = "update education_info_t set education_number ="+number+" where education_id = "+id;
        DBo db = new DBo();
        return db.executeUpdate(sql)>0;
    }
    //根据查询条件和页数获取满足条件的记录
    public List<Map<String, Object>> getNoticeList(String conditions, Integer pageindex)throws SQLException {
        DBo db = new DBo();
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "select row_number() over (order by education_id desc) as rn,education_id,education_num,education_name,InstitutionName,edu_category_name,education_content,education_number,CONVERT(varchar(100), start_time, 23) as start_time,CONVERT(varchar(100), end_time, 23) as end_time, education_address,is_released from education_info_category_institution_view where is_released = '1' and start_time >= getdate() " + conditions;
        if(db.getListByPage(sql, pageindex).size()>0){
            result = db.getListByPage(sql, pageindex);
        }
        return result;
    }
    //获取总记录页数
    public int getNoticeListPageNum(String conditions) throws SQLException {
        DBo db = new DBo();
        String sql = "select row_number() over (order by education_id desc) as rn,education_id,education_num,education_name,InstitutionName,edu_category_name,education_content,education_number,CONVERT(varchar(100), start_time, 23) as start_time,CONVERT(varchar(100), end_time, 23) as end_time, education_address,is_released from education_info_category_institution_view where is_released = '1' and start_time >= getdate() " + conditions;
        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(db.getString(sql,"_sum"));
    }
    //判断某员工是否已经报名
    public boolean isEnter(Integer education_id, String employee_num)throws SQLException{
        String sql = "select roll_education_id from roll_employee_view where education_id = "+education_id+" and is_finished = 0 and employee_num = "+employee_num;
        DBo db = new DBo();
        List<Map<String, Object>> result = db.executeQuery(sql);
        if(result.size()>0){
            return true;
        }
        return false;
    }
    //单个员工报名参与培训
    public boolean addSingleEmployee(RollEducationT record){
        return retm.insertSelective(record)>0;
    }
    /*//获取某员工的参与培训的记录【未开始的培训】
    public List<Map<String, Object>> getEnterecords(String employee_num)throws SQLException{
        String sql = "select education_name,edu_category_name,education_tutor,education_address,education_material, from roll_employee_view where employee_num = "+employee_num + " and start_time>=getdate()";
        DBo db = new DBo();
        return db.executeQuery(sql);
    }*/
    //个人报名时判断是否名额已满
    public boolean isFull(Integer id){
        Long entered_num = retm.getCountByEID(id);
        System.out.println("entered_num:"+entered_num);
        Integer expect_num = eitm.getEducationNumberByID(id);
        System.out.println("epect_num:"+expect_num);
        if(entered_num<expect_num){//还有名额
            return false;
        }
        return true;
    }
    //判断是否已经开始培训
    public boolean isTrainStart(Integer id)throws SQLException{
        String sql = "select education_id from education_info_t where education_id ="+id+" and start_time<getdate()";
        DBo db = new DBo();
        if(db.executeQuery(sql).size()>0){//有培训在当前已经开始，则不允许报名
            return true;
        }
        return false;
    }
    //判断多项培训是否已经发布
    public boolean isMulReleased(List<String> list){
        List<Integer> result = eitm.getMulReleasedStatus(list);
        for (int i=0;i<result.size();i++){
            System.out.println("flag:"+result.get(i));
            if(result.get(i).equals(1)){
                return true;
            }
        }
        return false;
    }
    //判断培训是否已经发布
    public String isReleased(Integer id){
        return eitm.getReleasedStatus(id);//1:已发布
    }
    //根据ID获取名称和类型
    public Map<String, Object> getNameAndCategoryByID(Integer id){
        return eitm.getNameAndCategoryByID(id);
    }

    //设置培训已绑定考试
    public boolean setIsFinishedByID(Integer education_id){
        return eitm.setIsFinishedByID(education_id)>0;
    }

    //手动设置培训已经完全结束
    public boolean setMulFinished(List<String> list){
        return eitm.setMulFinished(list)>0;
    }
}
