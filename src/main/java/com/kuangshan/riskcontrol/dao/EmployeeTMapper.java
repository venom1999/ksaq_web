package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.EmployeeT;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface EmployeeTMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee_t
     *
     * @mbg.generated Mon Oct 21 21:14:05 CST 2019
     */
    int deleteByPrimaryKey(String employeeNum);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee_t
     *
     * @mbg.generated Mon Oct 21 21:14:05 CST 2019
     */
    int insert(EmployeeT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee_t
     *
     * @mbg.generated Mon Oct 21 21:14:05 CST 2019
     */
    int insertSelective(EmployeeT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee_t
     *
     * @mbg.generated Mon Oct 21 21:14:05 CST 2019
     */
    EmployeeT selectByPrimaryKey(String employeeNum);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee_t
     *
     * @mbg.generated Mon Oct 21 21:14:05 CST 2019
     */
    int updateByPrimaryKeySelective(EmployeeT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table Employee_t
     *
     * @mbg.generated Mon Oct 21 21:14:05 CST 2019
     */
    int updateByPrimaryKey(EmployeeT record);

    List<EmployeeT> getEmployee();
    List<EmployeeT> getEmployeeByID(@Param("condition")String condition);
    List<Map<String, Object>> getEmployeeByInstitutionNum(@Param("institution_num")String institution_num);
    Map<String, Object> getEmployeeNumByID(@Param("employee_id")String id);
}