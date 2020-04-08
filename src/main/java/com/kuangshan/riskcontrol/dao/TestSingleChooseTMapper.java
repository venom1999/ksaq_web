package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.TestSingleChooseT;

import java.util.List;

public interface TestSingleChooseTMapper {

    int deleteByPrimaryKey(Integer single_choose_id);


    int insert(TestSingleChooseT record);


    int insertSelective(TestSingleChooseT record);


    TestSingleChooseT selectByPrimaryKey(Integer single_choose_id);


    int updateByPrimaryKeySelective(TestSingleChooseT record);


    int updateByPrimaryKey(TestSingleChooseT record);


    /**
     * 获取全部单选题
     * @return 单选题列表
     */
    List<TestSingleChooseT> selectAll();


    /**
     * 根据培训资源分类获取单选题
     * @param edu_category_id 分类
     * @return 相关的单选题
     */
    List<TestSingleChooseT> selectByEduCategoryId(Integer edu_category_id);


}