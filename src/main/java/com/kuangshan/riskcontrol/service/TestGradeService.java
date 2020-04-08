package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EducationCategoryTMapper;
import com.kuangshan.riskcontrol.dao.EmployeeEducationReportTMapper;
import com.kuangshan.riskcontrol.dao.EmployeeTMapper;
import com.kuangshan.riskcontrol.dao.TestInfoTMapper;
import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.EmployeeEducationReportT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TestGradeService {

    @Resource
    TestInfoTMapper tiMapper;
    @Resource
    EmployeeEducationReportTMapper eerMapper;
    @Resource
    EducationCategoryTMapper ectMapper;
    @Resource
    EmployeeTMapper etMapper;

    //获取自己参与的考试记录（不获取培训类型名称）
    public List<Map<String, Object>> getOwnManageList(String employee_num) {
        List<Map<String, Object>> rmap = eerMapper.getOwnTestList(employee_num);
        return rmap;
    }

    //获取已经提交成绩的考试成绩列表
    public List<Map<String, Object>> getList(String conditions, Integer pageindex) throws SQLException {
        DBo db = new DBo();
        List<Map<String, Object>> result = new ArrayList<>();
        String sql = "select row_number() over (order by employee_edu_report_id desc) as rn,employee_edu_report_id,edu_category_id,edu_category_name,EmployeeID,employee_num,EmployeeName,test_id,test_name,test_address,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time,score,makeup_grade,score_mode,InstitutionNum,InstitutionName,DDItemValue from employee_education_report_institution_category_view " + conditions;
        System.out.print("sql:" + sql);
        result = db.getListByPage(sql, pageindex);
        return result;
    }

    //获取总记录页数
    public int getListPageNum(String conditions) throws SQLException {
        DBo db = new DBo();
        String sql = "select row_number() over (order by employee_edu_report_id desc) as rn,employee_edu_report_id,edu_category_id,edu_category_name,EmployeeID,employee_num,EmployeeName,test_id,test_name,test_address,CONVERT(varchar(100), test_start_time, 20) as test_start_time,CONVERT(varchar(100), test_end_time, 20) as test_end_time,score,makeup_grade,score_mode,InstitutionNum,InstitutionName,DDItemValue from employee_education_report_institution_category_view " + conditions;
        sql = "select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(db.getString(sql, "_sum"));
    }

    public List<Map<String, Object>> getTestList() {
        List<Map<String, Object>> list = eerMapper.getDistinctTest();
        return list;
    }

    //获取考试信息（获取培训类型名称）
    public List<Map<String, Object>> getOwnManageList1(Integer test_id) throws SQLException {
        String sql = "select test_name,edu_category_name,edu_category_id,employee_num,EmployeeName,EmployeeID,test_start_time,test_end_time,test_address,score,makeup_grade,score_mode from employee_education_report_institution_category_view where test_id = " + test_id;
        DBo db = new DBo();
        return db.executeQuery(sql);
    }

    //根据考试名称获取考试成绩名单
    public List<Map<String, Object>> getGradeRollByTestName(String test_name) throws SQLException {
        String sql = "select test_name,edu_category_name,edu_category_id,employee_num,EmployeeName,EmployeeID,test_start_time,test_end_time,test_address,score,makeup_grade,score_mode from employee_education_report_institution_category_view where test_name = '" + test_name + "'";
        DBo db = new DBo();
        return db.executeQuery(sql);
    }

    //修改某条记录的成绩
    public boolean editRow(String test_name, String employee_num, BigDecimal score, BigDecimal makeup_grade) throws SQLException {
        String sql = "update employee_education_report_t set score=" + score + ",makeup_grade=" + makeup_grade + " where test_name='" + test_name + "' and employee_num=" + employee_num;
        DBo db = new DBo();
        return db.executeUpdate(sql) > 0;
    }

    public boolean editRow1(String test_name, String employee_num, BigDecimal score) throws SQLException {
        String sql = "update employee_education_report_t set score=" + score + " where test_name='" + test_name + "' and employee_num=" + employee_num;
        DBo db = new DBo();
        return db.executeUpdate(sql) > 0;
    }

    //添加员工公司外考试成绩
    public boolean submitAddGrade(EmployeeEducationReportT record) {
        return eerMapper.insertSelective(record) > 0;
    }

    //获取考试成绩信息的详细信息及其查询条件下的所有记录[上下条]
    public Map<String, Object> getDetail(Integer id, String conditions, Integer pageindex) throws SQLException {
        //获取此条记录的详细信息
        Map<String, Object> record = getEmployeeGradeByID(id);
        DBo DBo = new DBo();
        List<Map<String, Object>> list = DBo.executeQuery("select employee_edu_report_id from  employee_education_report_institution_category_view\n" +
                conditions + "\n" +
                "ORDER BY [employee_edu_report_id] desc\n" +
                "  OFFSET " + (pageindex - 1) * 10 + " ROWS FETCH NEXT 10 ROWS ONLY;");
        Map<String, Object> val = new HashMap<>();
        if (list != null) {
            val.put("list", list);
        } else {
            val.put("list", 0);
        }
        if (record.get("score_mode").toString().equals("0")) {
            record.put("score_mode_name", " 百分制");
        } else if (record.get("score_mode").toString().equals("1")) {
            record.put("score_mode_name", " 二分制");
        } else {
            record.put("score_mode_name", " 五分制");
        }
        val.put("record", record);
        return val;
    }

    //获取此条考试成绩信息
    public Map<String, Object> getEmployeeGradeByID(Integer id) {
        Map<String, Object> record = eerMapper.getGradeInfo(id);
        return record;
    }

    //修改员工考试成绩（公司内和外）
    public boolean submitEditGrade(EmployeeEducationReportT record) {
        return eerMapper.updateByPrimaryKeySelective(record) > 0;
    }

    //删除员工考试成绩（公司内和外）
    public boolean submitDeleteGrade(List<String> id_list) {
        return eerMapper.deleteMulGrade(id_list) > 0;
    }

    //获取现存的培训类型
    public List<EducationCategoryT> getCategories() {
        List<EducationCategoryT> result = ectMapper.selectAll();
        return result;
    }

    //批量插入数据
    public boolean insertMulGrade(ArrayList<String[]> arrayList) throws SQLException {
        String sql = " insert into employee_education_report_t (employee_num,test_id,test_name,edu_category_id,test_address,test_start_time,test_end_time,score_mode,score,makeup_grade) values ";

        for (int n = 0; n < arrayList.size(); n++) {
            String[] str = arrayList.get(n);
            sql += " ( ";
            for (int num = 0; num < str.length; num++) {
                if (num == 1) {
                    sql += "-1,";
                } else if (num == str.length - 1) {
                    if("".equals(str[num])){
                        sql += null;
                    }else {
                        sql += str[num];
                    }
                } else {
                    sql += "'" + str[num] + "',";
                }
            }
            if (n != arrayList.size() - 1) {
                sql += " ),";
            } else {
                sql += " )";
            }
        }
        System.out.println("sql:"+sql);
        DBo db = new DBo();
        return db.executeUpdate(sql)>0;
    }
    //根据员工ID获取员工num
    public Map<String, Object> getEmployeeNumByID(String employee_id){
        return etMapper.getEmployeeNumByID(employee_id);
    }
}
