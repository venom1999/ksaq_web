package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.EmployeeEducationReportT;
import com.kuangshan.riskcontrol.model.EmployeeEducationReportTExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface EmployeeEducationReportTMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    long countByExample(EmployeeEducationReportTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    int deleteByExample(EmployeeEducationReportTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    int insert(EmployeeEducationReportT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    int insertSelective(EmployeeEducationReportT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    List<EmployeeEducationReportT> selectByExample(EmployeeEducationReportTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    int updateByExampleSelective(@Param("record") EmployeeEducationReportT record, @Param("example") EmployeeEducationReportTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table employee_education_report_t
     *
     * @mbg.generated Tue Mar 17 13:22:40 CST 2020
     */
    int updateByExample(@Param("record") EmployeeEducationReportT record, @Param("example") EmployeeEducationReportTExample example);

    List<Map<String, Object>> getOwnTestList(@Param("employee_num")String employee_num);

    //从成绩表中获取不同的考试名称
    List<Map<String, Object>> getDistinctTest();

    int updateGradeInfo(@Param("test_id")Integer test_id);

    int updateByPrimaryKeySelective(@Param("record")EmployeeEducationReportT record);

    int deleteMulGrade(@Param("id_list")List<String>id_list);

    Map<String, Object> getGradeInfo(@Param("id")Integer id);
}