package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.TestQuestionAndAnswerT;

import java.util.List;

public interface TestQuestionAndAnswerTMapper {

    int deleteByPrimaryKey(Integer question_id);


    int insert(TestQuestionAndAnswerT record);


    int insertSelective(TestQuestionAndAnswerT record);


    TestQuestionAndAnswerT selectByPrimaryKey(Integer question_id);


    int updateByPrimaryKeySelective(TestQuestionAndAnswerT record);


    int updateByPrimaryKey(TestQuestionAndAnswerT record);


    /**
     * 获取全部问答题
     * @return 问答题列表
     */
    List<TestQuestionAndAnswerT> selectAll();


    /**
     * 根据培训资源分类获取问答题
     * @param edu_category_id 分类
     * @return 相关的问答题
     */
    List<TestQuestionAndAnswerT> selectByEduCategoryId(Integer edu_category_id);


}