package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.OfflineTestPaperTMapper;
import com.kuangshan.riskcontrol.model.OfflineTestPaperT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 自动组卷服务
 */
@Service
public class AutoGenerateTestPaperService {


    @Autowired
    private OfflineTestPaperTMapper otpMapper;

    private DBo DBo = new DBo();

    /**
     * 根据条件和页码获取数据
     * @param conditions 条件
     * @param index 页码
     * @return 数据列表
     */
    public List<Map<String, Object>> getList(String conditions, int index) throws SQLException {
        return DBo.getListByPage(
                "select row_number() over (order by paper_id desc) as rn, * from edu_test_paper_v "
                        + conditions, index
        );
    }


    /**
     * 获取总页数
     * @param conditions 查询条件
     * @return 总页数
     * @throws SQLException 异常
     */
    public int getListPageNum(String conditions) throws SQLException {
        String sql="select row_number() over (order by paper_id desc) as rn, * from edu_test_paper_v "
                + conditions;
        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(DBo.getString(sql,"_sum"));
    }


    /**
     * 只保存，不组卷
     * @param paper 试卷题型
     * @return 插入条数
     */
    public int save(OfflineTestPaperT paper) {
        return otpMapper.insertSelective(paper);
    }


    /**
     * 根据id删除试卷
     * @param id id
     * @return 成功与否
     */
    public Boolean deleteById(Integer id) {
        return otpMapper.deleteByPrimaryKey(id) > 0;
    }


    /**
     * 修改题型和小分
     * @param paper 试卷
     * @return 更改个数
     */
    public int editPart(OfflineTestPaperT paper) {
        return otpMapper.updateByPrimaryKeySelective(paper);
    }


    /**
     * 根据id获取paper
     * @param id id
     * @return paper
     */
    public OfflineTestPaperT getById(Integer id) {
        return otpMapper.selectByPrimaryKey(id);
    }


    public List<Map<String, Object>> getViewById(int id) throws SQLException {
        return DBo.executeQuery(
                "select *  from edu_test_paper_v  where paper_id = " + id
        );
    }

}
