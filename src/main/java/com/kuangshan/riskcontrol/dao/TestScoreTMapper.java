package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.TestScoreT;
import com.kuangshan.riskcontrol.model.TestScoreTExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TestScoreTMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    long countByExample(TestScoreTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int deleteByExample(TestScoreTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int deleteByPrimaryKey(Integer test_score_id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int insert(TestScoreT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int insertSelective(TestScoreT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    List<TestScoreT> selectByExample(TestScoreTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    TestScoreT selectByPrimaryKey(Integer test_score_id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int updateByExampleSelective(@Param("record") TestScoreT record, @Param("example") TestScoreTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int updateByExample(@Param("record") TestScoreT record, @Param("example") TestScoreTExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int updateByPrimaryKeySelective(TestScoreT record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table test_score_t
     *
     * @mbg.generated Tue Mar 17 12:41:50 CST 2020
     */
    int updateByPrimaryKey(TestScoreT record);

    int deleteByTestID(@Param("test_id")Integer test_id);
}