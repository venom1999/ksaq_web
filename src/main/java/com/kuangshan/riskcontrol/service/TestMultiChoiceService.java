package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.TestMultiChoiceTMapper;
import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.TestMultiChoiceT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class TestMultiChoiceService {

    private DBo DBo=new DBo();

    @Autowired
    private TestMultiChoiceTMapper tmcMapper;


    /**
     * 获取全部记录
     * @return 全部记录
     */
    public List<TestMultiChoiceT> selectAll() {
        return tmcMapper.selectAll();
    }


    /**
     * 根据培训资源分类获取多选题
     * @param edu_category_id 分类
     * @return 相关的多选题
     */
    public List<TestMultiChoiceT> selectByEduCategoryId(int edu_category_id) {
        return tmcMapper.selectByEduCategoryId(edu_category_id);
    }


    /**
     * 通过id 获取model
     * @param id 主键
     * @return model
     */
    public TestMultiChoiceT selectByID(int id) {
        return tmcMapper.selectByPrimaryKey(id);
    }


    // 通过页面获取列表
    public List<Map<String, Object>> getListByPage(String conditions, int index) throws SQLException {

        return DBo.getListByPage(
                "select row_number() over (order by multi_choice_id asc) as rn,* " +
                        "from tm_choice_v " + conditions, index
        );
    }


    // 获取列表页数
    public int getListPageNum(String conditions) throws SQLException {
        String sql="select row_number() over (order by multi_choice_id asc) as rn,* " +
                "from tm_choice_v " + conditions;

        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(DBo.getString(sql,"_sum"));
    }


    /**
     * 插入数据
     * @return 成功返回插入的条数，否则0
     */
    public int add(TestMultiChoiceT record) {
        return tmcMapper.insertSelective(record);
    }


    /**
     * 更新内容
     * @param record 内容对象
     * @return 是否成功
     */
    public boolean update(TestMultiChoiceT record) {
        return tmcMapper.updateByPrimaryKey(record) > 0;
    }


    /**
     * 删除文件
     * @param src
     * @return
     */
    public boolean deleteFile(String src) {
        boolean flag = false;
        File file = new File(src);
        if (!file.exists()) {
            return flag;
        } else {
            file.delete();
            flag = true;
            return flag;
        }
    }


    /**
     * 根据对应表格批量导入题目
     * @param datas 表格数据
     * @param ekps 对应表
     * @return 是否成功
     */
    public boolean importData(List<List<String>> datas, List<EducationCategoryT> ekps) {
        boolean flag = false;
        TestMultiChoiceT tmc = new TestMultiChoiceT();

        for (List<String> data : datas) {
            tmc.setEdu_category_id(getEduCategoryIDByName(ekps, data.get(0)));
            tmc.setMulti_choice_content(data.get(2));
            tmc.setMulti_choice_a(data.get(3));

            tmc.setMulti_choice_b(data.get(4));
            tmc.setMulti_choice_c(data.get(5));
            tmc.setMulti_choice_d(data.get(6));

            tmc.setAnswer(data.get(7));
            tmc.setExplanation(data.get(8));
            flag = (add(tmc) > 0) ? true : false;
        }

        return flag;
    }


    // 获取培训分类id
    private Integer getEduCategoryIDByName(List<EducationCategoryT> ekps, String name) {
        for (EducationCategoryT ekp : ekps) {
            if (name.equals(ekp.getEdu_category_name())) {
                return Integer.parseInt(ekp.getEdu_category_id().toString());
            }
        }
        return null;
    }


}
