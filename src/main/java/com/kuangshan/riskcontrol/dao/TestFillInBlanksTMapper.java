package com.kuangshan.riskcontrol.dao;

import com.kuangshan.riskcontrol.model.TestFillInBlanksT;

import java.util.List;

public interface TestFillInBlanksTMapper {

    int deleteByPrimaryKey(Integer blank_id);


    int insert(TestFillInBlanksT record);


    int insertSelective(TestFillInBlanksT record);


    TestFillInBlanksT selectByPrimaryKey(Integer blank_id);


    int updateByPrimaryKeySelective(TestFillInBlanksT record);


    int updateByPrimaryKey(TestFillInBlanksT record);


    /**
     * 获取全部填空题
     * @return 填空题列表
     */
    List<TestFillInBlanksT> selectAll();


    /**
     * 根据培训资源分类获取填空题
     * @param edu_category_id 分类
     * @return 相关的填空题
     */
    List<TestFillInBlanksT> selectByEduCategoryId(Integer edu_category_id);
}