package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.TestMultiChoiceT;

import java.util.List;

public interface TestMultiChoiceTMapper {

    int deleteByPrimaryKey(Integer multi_choice_id);


    int insert(TestMultiChoiceT record);


    int insertSelective(TestMultiChoiceT record);


    TestMultiChoiceT selectByPrimaryKey(Integer multi_choice_id);


    int updateByPrimaryKeySelective(TestMultiChoiceT record);


    int updateByPrimaryKey(TestMultiChoiceT record);


    /**
     * 获取全部多选题
     * @return 多选题列表
     */
    List<TestMultiChoiceT> selectAll();


    /**
     * 根据培训资源分类获取单选题
     * @param edu_category_id 分类
     * @return 相关的单选题
     */
    List<TestMultiChoiceT> selectByEduCategoryId(Integer edu_category_id);


}