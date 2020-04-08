package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.TestJudgeT;

import java.util.List;

public interface TestJudgeTMapper {

    int deleteByPrimaryKey(Integer judge_id);


    int insert(TestJudgeT record);


    int insertSelective(TestJudgeT record);


    TestJudgeT selectByPrimaryKey(Integer judge_id);


    int updateByPrimaryKeySelective(TestJudgeT record);


    int updateByPrimaryKey(TestJudgeT record);


    /**
     * 获取全部判断题
     * @return 判断题列表
     */
    List<TestJudgeT> selectAll();


    /**
     * 根据培训资源分类获取判断题
     * @param edu_category_id 分类
     * @return 相关的判断题
     */
    List<TestJudgeT> selectByEduCategoryId(Integer edu_category_id);
}