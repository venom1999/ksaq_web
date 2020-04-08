package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.TestFillInBlanksTMapper;
import com.kuangshan.riskcontrol.model.TestFillInBlanksT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 填空题服务
 */
@Service
public class TestFillInBlanksService {

    @Autowired
    private TestFillInBlanksTMapper tfibMapper;


    /**
     * 获取全部记录
     * @return 全部记录
     */
    public List<TestFillInBlanksT> selectAll() {
        return tfibMapper.selectAll();
    }


    /**
     * 根据培训资源分类获取填空题
     * @param edu_category_id 分类
     * @return 相关的填空题
     */
    public List<TestFillInBlanksT> selectByEduCategoryId(int edu_category_id) {
        return tfibMapper.selectByEduCategoryId(edu_category_id);
    }


    /**
     * 通过id 获取model
     * @param id 主键
     * @return model
     */
    public TestFillInBlanksT selectByID(int id) {
        return tfibMapper.selectByPrimaryKey(id);
    }

}
