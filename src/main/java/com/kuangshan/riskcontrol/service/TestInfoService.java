package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.*;
import com.kuangshan.riskcontrol.model.RollEducationT;
import com.kuangshan.riskcontrol.model.TestInfoT;
import com.kuangshan.riskcontrol.tool.AES;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TestInfoService {

    @Autowired
    private TestInfoTMapper tiMapper;
    @Resource
    private EducationInfoTMapper eiMapper;
    @Resource
    private RollEducationTMapper rtMapper;
    @Resource
    OfflineTestPaperTMapper otptMapper;
    @Resource
    TestScoreTMapper tstMapper;
    @Resource
    EmployeeEducationReportTMapper eertMapper;

    /**
     * 获取全部记录
     * @return 全部记录
     */
    public List<TestInfoT> selectAll() {
        return tiMapper.selectAll();
    }

    //根据查询条件和页数获取满足条件的记录
    public List<Map<String, Object>> getList(String conditions, Integer pageindex)throws SQLException {
        DBo db = new DBo();
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "select row_number() over (order by test_id desc) as rn,test_id,education_id,test_name,education_name,edu_category_id,test_address,edu_category_name,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time, test_time,is_online,test_type,is_submitted from test_info_education_category_view " + conditions;
        if(db.getListByPage(sql, pageindex).size()>0){
            result = db.getListByPage(sql, pageindex);
        }
        return result;
    }
    //获取总记录页数
    public int getListPageNum(String conditions) throws SQLException {
        DBo db = new DBo();
        String sql = "select row_number() over (order by test_id desc) as rn,test_id,education_id,test_name,education_name,edu_category_id,test_address,edu_category_name,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time, test_time,is_online,test_type,is_submitted from test_info_education_category_view " + conditions;
        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(db.getString(sql,"_sum"));
    }
    //获取培训名称
    public List<Map<String, Object>> getEducation()throws SQLException {
        String sql = "select education_id,education_num,education_name from education_info_t where is_finished = 0";
        DBo db = new DBo();
        return db.executeQuery(sql);
    }
    //添加考试信息
    public boolean insert(TestInfoT record){
        return tiMapper.insertSelective(record)>0;
    }
    //获取最新添加的考试ID（test_id最大的）
    public Integer getLastTestID(){
        return tiMapper.getLastTestID();
    }
    //删除多项考试信息
    public boolean deleteMulTest(List<String> id_list){
        return tiMapper.deleteMulTest(id_list)>0;
    }
    //删除某项考试信息及其补考信息
    public boolean deleteOneTest(Integer test_id){
        return tiMapper.deleteOneTest(test_id)>0;
    }
    //修改多项名单信息根据考试ID
    public boolean updateMulTestID(List<String> id_list){
        return rtMapper.updateMulTestID(id_list)>0;
    }
    //获取考试信息的详细信息及其查询条件下的所有记录[上下条]
    public Map<String, Object> getDetail(Integer id, String conditions, Integer pageindex)throws SQLException{
        //获取此条记录的详细信息
        Map<String, Object> testinfo = getTestInfoByID(id);
        DBo DBo=new DBo();
        List<Map<String, Object>> list=DBo.executeQuery("select test_id from  test_info_education_category_view\n" +
                conditions +"\n"+
                "ORDER BY [test_id] desc\n" +
                "  OFFSET "+(pageindex - 1) * 10 +" ROWS FETCH NEXT 10 ROWS ONLY;");
        Map<String,Object> val=new HashMap<>();
        if(list!=null) {
            val.put("list",list);
        }else {
            val.put("list",0);
        }
        val.put("testinfo",testinfo);
        return val;
    }
    //获取考试信息的详细信息
    public Map<String, Object> getTestInfoByID(Integer id)throws SQLException{
        String sql = "select test_id,education_id,test_name,education_name,edu_category_id,test_address,score_mode,edu_category_name,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time, test_time,is_online,test_type,is_submitted,is_released from test_info_education_category_view where test_id = "+id;
        DBo db = new DBo();
        return db.executeQuery(sql).get(0);
    }
    //提交修改
    public boolean submitEditTestInfo(TestInfoT record){
        return tiMapper.updateByPrimaryKeySelective(record)>0;
    }

    //获取培训名单
    public List<Map<String, Object>> getTrainRoll(Integer id)throws SQLException{
        String sql = "select roll_education_id,education_id,EmployeeName,EmployeeSex,EmployeeID,EmployeeNum,InstitutionNum,InstitutionName,WorkPositionNum,WorkPositionValue,examinee_pwd from roll_employee_view where test_id = "+id;
        DBo db = new DBo();
        List<Map<String, Object>> list = db.executeQuery(sql);
        return list;
    }
    //获取未参与培训名单
    public List<Map<String, Object>> getNotTrainRoll(String condition, Integer test_id)throws SQLException{
        String sql = "select EmployeeNum,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionPrefix,InstitutionName,WorkPositionNum,WorkPositionValue from (select distinct EmployeeNum,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionPrefix,InstitutionName,WorkPositionNum,WorkPositionValue from employee_institution_datadictionaryView "+condition+") as c where (select count(1) as num from roll_education_t where roll_education_t.employee_num = c.EmployeeNum and test_id="+test_id+") = 0";
        DBo db = new DBo();
        List<Map<String, Object>> list = db.executeQuery(sql);
        return list;
    }
    //根据Test_id获取计分方式
    public String getScoreModeByID(Integer test_id){
        return tiMapper.getSomeInfoByID(test_id).get("score_mode").toString();
    }
    //添加考试员工
    public boolean addEmployee(String insertstr)throws SQLException{
        String sql = "insert into roll_education_t(employee_num,education_id,test_id,examinee_pwd,score_mode) values "+insertstr;
        DBo db = new DBo();
        return db.executeUpdate(sql)>0;
    }
    //删除考试员工
    public boolean deleteEmployee(String id_list)throws SQLException{
        String sql = "delete from roll_education_t where roll_education_id in ("+id_list+")";
        DBo db = new DBo();
        return db.executeUpdate(sql)>0;
    }
    //设置发布为真
    public boolean setIsReleased(Integer id){
        return tiMapper.setIsReleased(id)>0;
    }
    //多项发布
    public boolean setMulReleased(List<String> id_list)throws SQLException{
        return tiMapper.setMulReleased(id_list)>0;
    }
    //判断多个考试是否已经发布
    public boolean isMulReleased(List<String> list){
        List<Integer> result = tiMapper.getMulReleasedStatus(list);
        for (int i=0;i<result.size();i++){
            System.out.println("flag:"+result.get(i));
            if(result.get(i).equals(1)){
                return true;
            }
        }
        return false;
    }
    //判断单个考试是否已经发布
    public String getReleasedStatus(Integer id){
        return tiMapper.getReleasedStatus(id);
    }
    //判断是否已经开始考试
    public boolean isTestStart(Integer id)throws SQLException{
        String sql = "select test_id from test_info_t where test_id ="+id+" and test_start_time<getdate()";
        DBo db = new DBo();
        if(db.executeQuery(sql).size()>0){//有考试在当前已经开始，则不允许报名
            return true;
        }
        return false;
    }
    //判断此项考试是否可以添加补考
    public String isMakeUpHasET(Integer test_id, Integer education_id){
        String flag = "";
        if(tiMapper.isMakeUpByECID(test_id, education_id)>0){
            flag = "is";//本身是补考
        }else if(tiMapper.hasMakeUpByECID(test_id,education_id)>0){
            flag = "have";//已经设置补考
        }else {
            flag = "no";//还未设置补考
        }
        return flag;
    }
    //判断此项考试(未绑定培训)是否可以添加补考
    public String isMakeUpNoET(Integer test_id){
        String flag = "";
        if(tiMapper.isMakeUpByTID(test_id)>0){
            flag = "is";
        }else if(tiMapper.hasMakeUpByRTID(test_id)>0){
            flag = "have";
        }else {
            flag = "no";
        }
        return flag;
    }
    //判断此项考试是否已设置补考
    public boolean isSetMakeUpTest(Integer test_id){
        return tiMapper.hasMakeUpByRTID(test_id)>0;//已设置补考
    }
    //判断考试是否为机考
    public boolean isOnline(Integer test_id){
        String online_state = tiMapper.getSomeInfoByID(test_id).get("is_online").toString();
        if(online_state.equals("1")){
            return true;
        }else
            return false;
    }
    //判断考试是否为机考（多个考试）
    public List<Map<String,Object>> getMulInfoByIDlist(List<String> list){
        return tiMapper.getMulInfo(list);
    }
    //判断考试是否提交成绩
    public boolean isSubmitted(Integer test_id){
        int submitted_result = Integer.parseInt(tiMapper.getSomeInfoByID(test_id).get("is_submitted").toString());
        if(submitted_result==1){
            return true;//已经导入成绩
        }else {
            return false;//未导入成绩
        }
    }
    //根据ID获取考试的相关信息（考试名称、培训名称、培训类型）
    public Map<String, Object> getPartInfoByID(Integer test_id){
        return tiMapper.getPartInfoByID(test_id);
    }

    //获取补考名单
    public List<Map<String, Object>> getMakeUpEnroll(Integer test_id)throws SQLException{
        String sql = "";
        String score_mode = getScoreModeByID(test_id);
        if(score_mode.equals("0")){//百分制
            sql = "select roll_education_id,employee_num,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionName,WorkPositionNum,WorkPositionValue,InstitutionPrefix,examinee_pwd from roll_employee_view where (score<60 or score is null) and score_mode=0 and test_id = "+test_id;
        }else if(score_mode.equals("1")){//二分制
            sql = "select roll_education_id,employee_num,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionName,WorkPositionNum,WorkPositionValue,InstitutionPrefix,examinee_pwd from roll_employee_view where (score=0 or score is null) and score_mode=1 and test_id = "+test_id;
        }else {
            sql = "select roll_education_id,employee_num,EmployeeID,EmployeeName,EmployeeSex,InstitutionNum,InstitutionName,WorkPositionNum,WorkPositionValue,InstitutionPrefix,examinee_pwd from roll_employee_view where (score=0 or score is null) and score_mode=2 and test_id = "+test_id;
        }
        DBo db = new DBo();
        List<Map<String, Object>> result = db.executeQuery(sql);
        return result;
    }
    //判断是否为补考：true补考；false正常考试
    public boolean isMakeUpByTID(Integer test_id){
        return tiMapper.isMakeUpByTID(test_id)>0;
    }
    //获取补考的而关联考试ID
    public Integer getRelatedTestIDByTID(Integer test_id){
        return Integer.parseInt(tiMapper.getSomeInfoByID(test_id).get("related_test_id").toString());
    }
    //获取某场培训的所有员工信息
    public boolean setExamineePwd(Integer test_id, Integer education_id)throws Exception{
        List<RollEducationT> records = rtMapper.getRollInfoByEID(test_id,education_id);
        boolean flag = true;
        for (RollEducationT r : records){
            Integer randNum = (int)(Math.random()* (999999)+1);//产生(0,999999]之间的随机数
            String workPassWord = String.format("%06d",randNum);//进行六位数补全
            String store_pwd = AES.Encrypt(workPassWord,"shirleyLshirleyL");
            r.setExaminee_pwd(store_pwd);
            if(rtMapper.updateByPrimaryKeySelective(r)<=0){
                flag = false;
                return flag;
            }
        }
        System.out.println("flag:"+flag);
        return  flag;
    }
    //清理报名表中的报名信息
    public void cleanRollInfo(Integer test_id){
        int delete_num = rtMapper.deleteRollInfo(test_id);
        int update_num = rtMapper.updateRollInfo(test_id);
        System.out.println("roll_delete_num:"+delete_num+";roll_update_num:"+update_num);
    }
    //删除试卷信息
    public void deleteTestPaperInfo(Integer test_id){
        int delete_num = otptMapper.deleteByTestID(test_id);
        //判断是否有补考
        List<Map<String, Object>> makeuptest = tiMapper.getMakeUpTestID(test_id);
        if(makeuptest.size()>0){//有补考信息
            for (int i=0;i<makeuptest.size();i++){
                otptMapper.deleteByTestID(Integer.parseInt(makeuptest.get(i).get("test_id").toString()));
                delete_num++;
            }
        }
        System.out.println("paper_delete_num:"+delete_num);
    }
    //删除答题情况
    public void deleteTestScoreInfo(Integer test_id){
        int delete_num = tstMapper.deleteByTestID(test_id);
        //判断是否有补考
        List<Map<String, Object>> makeuptest = tiMapper.getMakeUpTestID(test_id);
        if(makeuptest.size()>0){//有补考信息
            for (int i=0;i<makeuptest.size();i++){
                tstMapper.deleteByTestID(Integer.parseInt(makeuptest.get(i).get("test_id").toString()));
                delete_num++;
            }
        }
        System.out.println("score_delete_num:"+delete_num);
    }
    //设置考试相关的培训is_finished=0
    public boolean cleanEducationFinished(Integer id){
        //查询是否有绑定培训
        Integer education_id = tiMapper.getEIDByTestID(id);
        System.out.println("education_id:"+education_id);
        if(education_id!=0){
            //如有，则进行设置
            System.out.println("education_id:"+education_id);
            return eiMapper.setNonFinished(id)>0;
        }
        return true;
    }
    //修订考试成绩
    public boolean updateGradeInfo(Integer test_id){//考试信息已删除，则成绩表中的test_id设为0？？？
        return eertMapper.updateGradeInfo(test_id)>0;
    }
}
