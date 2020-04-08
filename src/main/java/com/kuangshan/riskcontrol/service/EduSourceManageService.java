package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.EducationCategoryTMapper;
import com.kuangshan.riskcontrol.model.EducationCategoryT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

/**
 * 系统维护下的培训资源分类服务
 */

@Service
public class EduSourceManageService {

    @Autowired
    private EducationCategoryTMapper ectMapper;    // 培训资源分类dao


    /**
     * 根据条件和页码获取数据
     * @param conditions 条件
     * @param index 页码
     * @return 数据列表
     */
    public List<EducationCategoryT> getParameterList(String conditions, int index){
        return ectMapper.selectAllByPage(conditions, (index-1)*10, 10);
    }


    /**
     * 根据条件获取页面数据总数
     * @param conditions 条件
     * @return 总数
     */
    public int getParameterPageNum(String conditions){
        int count = ectMapper.selectAllNum(conditions);
        return count % 10 == 0 ? count / 10 : count / 10 + 1;
    }


    /**
     * 添加一条记录
     * @param record 记录
     * @return 是否成功
     */
    public Boolean insert(EducationCategoryT record) {
        return ectMapper.insert(record)>0;
    }


    /**
     * 逻辑删除
     * @param record 记录
     * @return 是否成功
     */
    public Boolean DeleteESM(EducationCategoryT record) {
        return ectMapper.updateByPrimaryKeySelective(record) > 0;
    }

    /**
     * 详细信息
     * @param id id
     * @return 详细信息
     */
    public EducationCategoryT getDetail(int id) {
        return ectMapper.selectByPrimaryKey(id);
    }


    /**
     * 获取数据库中对应表的全部信息
     * @return 信息
     */
    public List<EducationCategoryT> selectAll () {
        return ectMapper.selectAll();
    }


}
