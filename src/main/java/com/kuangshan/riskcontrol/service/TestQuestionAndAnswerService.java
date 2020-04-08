package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.TestQuestionAndAnswerTMapper;
import com.kuangshan.riskcontrol.model.TestQuestionAndAnswerT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * 问答题服务
 */

@Service
public class TestQuestionAndAnswerService {

    @Autowired
    private TestQuestionAndAnswerTMapper tqaaMapper;


    /**
     * 获取全部记录
     * @return 全部记录
     */
    public List<TestQuestionAndAnswerT> selectAll() {
        return tqaaMapper.selectAll();
    }


    /**
     * 根据培训资源分类获取问答题
     * @param edu_category_id 分类
     * @return 相关的问答题
     */
    public List<TestQuestionAndAnswerT> selectByEduCategoryId(int edu_category_id) {
        return tqaaMapper.selectByEduCategoryId(edu_category_id);
    }


    /**
     * 通过id 获取model
     * @param id 主键
     * @return model
     */
    public TestQuestionAndAnswerT selectByID(int id) {
        return tqaaMapper.selectByPrimaryKey(id);
    }


}
