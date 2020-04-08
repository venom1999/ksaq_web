package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.ParameterT;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ParameterTMapper {



    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table parameter_t
     *
     * @mbg.generated Sun Oct 14 11:04:55 CST 2018
     */
    int deleteByPrimaryKey(Integer parameterid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table parameter_t
     *
     * @mbg.generated Sun Oct 14 11:04:55 CST 2018
     */
    int insert(ParameterT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table parameter_t
     *
     * @mbg.generated Sun Oct 14 11:04:55 CST 2018
     */
    int insertSelective(ParameterT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table parameter_t
     *
     * @mbg.generated Sun Oct 14 11:04:55 CST 2018
     */

    ParameterT selectByPrimaryKey(Integer parameterid);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table parameter_t
     *
     * @mbg.generated Sun Oct 14 11:04:55 CST 2018
     */
    int updateByPrimaryKeySelective(ParameterT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table parameter_t
     *
     * @mbg.generated Sun Oct 14 11:04:55 CST 2018
     */
    int updateByPrimaryKey(ParameterT record);
    
    List<ParameterT> selectAllByPage(@Param("conditions") String conditions, @Param("start") int start, @Param("limit") int limit);

    int selectAllNum(@Param("conditions") String conditions);
    
    public ParameterT selectByInfo(Integer ParameterID);

    ParameterT selectByItem(String ParameterItem);
}