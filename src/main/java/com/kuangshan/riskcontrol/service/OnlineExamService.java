package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EducationCategoryTMapper;
import com.kuangshan.riskcontrol.dao.EducationInfoTMapper;
import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.TestSingleChooseT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class OnlineExamService {
    @Autowired
    private EducationCategoryTMapper ectMapper;    // 培训资源分类dao

    //根据查询条件和页数获取满足条件的记录
    public List<Map<String, Object>> getList(String number, String categoryId) throws Exception {
        DBo db = new DBo();
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "select top "+number+" * from test_single_choose_t where edu_category_id = "+categoryId+" order by NEWID()";
        result=db.executeQuery(sql);
        return result;
    }

    public List<Map<String, Object>>  getExamList(String userID) throws Exception{
        DBo db = new DBo();
        List<Map<String, Object>> result;
        String sql = "select * from test_info_t where test_id in (select test_id from roll_education_t where employee_num = '"+userID+"') and test_start_time <getdate() and test_end_time >getdate()";
        result=db.executeQuery(sql);
        return result;
    }


    public Map<String,Object>  getRandomPaper(String chooseCount,String multiChoiceCount,String judgeCount,String educationCategoryID) throws SQLException {
        DBo db = new DBo();
        String chooseSql = "select top "+chooseCount+"* from edu_question_view where edu_category_id = "+educationCategoryID+" and question_type = 1 and deleted = 0  order by NEWID()";
        String multipleChooseSql = "select top  "+multiChoiceCount+"* from edu_question_view where edu_category_id = "+educationCategoryID+" and question_type = 2 and deleted = 0 order by NEWID()";
        String judgeSql = "select top "+judgeCount+"* from edu_question_view where edu_category_id = "+educationCategoryID+" and question_type = 3 and deleted = 0 order by NEWID()";

        Map<String, Object> result = new HashMap<>();
        result.put("choose",db.executeQuery(chooseSql));
        result.put("multipleChoose",db.executeQuery(multipleChooseSql));
        result.put("judge",db.executeQuery(judgeSql));
        return result;
    }

    public String getExamName(String id) {
        DBo db = new DBo();
        String chooseSql = "select * from education_category_t where edu_category_id = "+id;
        String result = "考试";
        try {
            result=db.getString(chooseSql ,"edu_category_name" );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return result;
    }


    public List<Map<String, Object>> getExamDetail(String testID) throws Exception{
        DBo db = new DBo();
        List<Map<String, Object>> result;
        String sql = "select * from offline_test_paper_t where test_id = '"+testID+"'";
        result=db.executeQuery(sql);
        return result;
    }
    public String getEduCategoryName(String eduCategoryId) throws Exception{
        DBo db = new DBo();
        String sql1 = "select * from education_category_t where edu_category_id = '"+eduCategoryId+"'";
        return db.getString(sql1,"edu_category_name");
    }

    //判斷密碼是否正確
    public String judgePassword(String testID,String userID) throws Exception{
        DBo db = new DBo();
        String sql1 = "select * from roll_education_t where test_id = '"+testID+"' and employee_num = '"+userID+"'";
        return db.getString(sql1,"examinee_pwd");
    }

    public Map<String,Object>  getPaper(String single_choose,String multi_choice,String judge) throws SQLException {
        DBo db = new DBo();
        Map<String, Object> result = new HashMap<>();
        if(!"".equals(single_choose)){
            String chooseSql = "select * from edu_question_view where question_type = 1 and id in ("+single_choose+") and deleted = 0 ";
            result.put("choose",db.executeQuery(chooseSql));
        }
        if(!"".equals(multi_choice)){
            String multipleChooseSql = "select * from edu_question_view where question_type = 2 and id in ("+multi_choice+") and deleted = 0 ";
            result.put("multipleChoose",db.executeQuery(multipleChooseSql));
        }
        if(!"".equals(judge) ){
            String judgeSql = "select * from edu_question_view where question_type = 3 and id in ("+multi_choice+") and deleted = 0 ";
            result.put("judge",db.executeQuery(judgeSql));
        }
        return result;
    }

    public int submitScore(String testID,String userID, String score, String testSubmitTime, String testType) throws Exception{
        DBo db = new DBo();
        String sql = "";
        //正常考试
        if("1".equals(testType)){
            sql = "UPDATE roll_education_t SET score = '"+score+"', test_submit_time = '"+testSubmitTime+"' WHERE test_id = '"+testID+"' AND employee_num = '"+userID+"'";
        }else{
            sql = "UPDATE roll_education_t SET makeup_grade = '"+score+"', makeup_submit_time = '"+testSubmitTime+"' WHERE test_id = '"+testID+"' AND employee_num = '"+userID+"'";
        }
        return db.executeUpdate(sql);
    }

    /**
     * 获取数据库中对应表的全部信息
     * @return 信息
     */
    public List<EducationCategoryT> selectAll () {
        return ectMapper.selectAll();
    }
}

