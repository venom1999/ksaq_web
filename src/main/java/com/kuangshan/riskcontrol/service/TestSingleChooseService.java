package com.kuangshan.riskcontrol.service;

import com.kuangshan.riskcontrol.dao.TestSingleChooseTMapper;
import com.kuangshan.riskcontrol.model.EducationCategoryT;
import com.kuangshan.riskcontrol.model.TestSingleChooseT;
import com.kuangshan.riskcontrol.tool.DBo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 单选题服务
 */
@Service
public class TestSingleChooseService {

    private DBo DBo=new DBo();

    @Resource
    private TestSingleChooseTMapper tcMapper;

    // 通过页面获取列表
    public List<Map<String, Object>> getListByPage(String conditions, int index) throws SQLException {

        return DBo.getListByPage(
                "select row_number() over (order by single_choose_id asc) as rn,* " +
                        "from ts_choose_edu_v " + conditions, index
        );
    }

    // 获取列表页数
    public int getListPageNum(String conditions) throws SQLException {
        String sql="select row_number() over (order by single_choose_id asc) as rn,* " +
                "from ts_choose_edu_v " + conditions;

        sql="select count(*) as _sum from (" + sql + ") A;";
        return Integer.parseInt(DBo.getString(sql,"_sum"));
    }

    /**
     * 插入数据
     * @return 成功返回插入的条数，否则0
     */
    public int addTC(TestSingleChooseT record) {
        return tcMapper.insertSelective(record);
    }

    /**
     * 通过id 获取model
     * @param id 主键
     * @return model
     */
    public TestSingleChooseT selectByID(int id) {
        return tcMapper.selectByPrimaryKey(id);
    }

    /**
     * 通过id删除记录
     * @param id 主键
     * @return 是否成功过
     * @throws SQLException SQL异常
     */
    public boolean deleteById(int id) {
        return tcMapper.deleteByPrimaryKey(id) > 0;
    }

    /**
     * 获取全部记录
     * @return 全部记录
     */
    public List<TestSingleChooseT> selectAll() {
        return tcMapper.selectAll();
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
     * 获取详细内容
     * @param id   id
     * @param pageIndex 页码数
     * @param conditions 查询条件
     * @return 所要对象
     * @throws SQLException SQL异常
     */
    public Map<String, Object> getDetail(int id, int pageIndex, String conditions) throws SQLException {
        List<Map<String, Object>> record = DBo.executeQuery(
                "select * from ts_choose_edu_v where single_choose_id=" + id
        );

        List<Map<String, Object>> list = DBo.executeQuery(
                "select single_choose_id from  ts_choose_edu_v\n" +
                        conditions +"\n"+
                        "ORDER BY [single_choose_id] asc\n" +
                        "OFFSET "+ (pageIndex - 1) * 10 +" ROWS FETCH NEXT 10 ROWS ONLY;");

        Map<String,Object> val = new HashMap<>();
        if (list != null) {
            val.put("list", list);
        } else {
            val.put("list", 0);
        }

        val.put("record", record.get(0));
        return val;
    }

    /**
     * 更新内容
     * @param record 内容对象
     * @return 是否成功
     */
    public boolean update(TestSingleChooseT record) {
        return tcMapper.updateByPrimaryKey(record) > 0;
    }


    /**
     * 根据对应表格批量导入题目
     * @param datas 表格数据
     * @param ekps 对应表
     * @return 是否成功
     */
    public boolean importData(List<List<String>> datas, List<EducationCategoryT> ekps) {
        boolean flag = false;
        TestSingleChooseT tc = new TestSingleChooseT();

        for (List<String> data : datas) {
            tc.setEdu_category_id(getEduCategoryIDByName(ekps, data.get(0)));
            if (data.get(1) != null) {
//                tc.setEdu_knowledge_point_id(getEduKnowledgePointIDByName(ekps, data.get(1)));
            }
            tc.setChoose_content(data.get(2));

            tc.setSingle_choose_a(data.get(3));
            tc.setSingle_choose_b(data.get(4));
            tc.setSingle_choose_c(data.get(5));

            tc.setSingle_choose_d(data.get(6));
            tc.setAnswer(data.get(7));
            tc.setExplanation(data.get(8));

            flag = (addTC(tc) > 0) ? true : false;
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

    // 获取知识点id
    private Integer getEduKnowledgePointIDByName(List<Map<String, Object>> ekps, String name) {
            for (Map<String, Object> ekp : ekps) {
                if (name.equals(ekp.get("knowledgePointName"))) {
                    return Integer.parseInt(ekp.get("eduKnowledgePointID").toString());
                }
            }
            return null;
    }




    /**
     * 根据培训资源分类获取单选题
     * @param edu_category_id 分类
     * @return 相关的单选题
     */
    public List<TestSingleChooseT> selectByEduCategoryId(int edu_category_id) {
        return tcMapper.selectByEduCategoryId(edu_category_id);
    }

}



// 给导入进的题目加上p标签 废弃
//    private String addPTag(String str) {
//        StringBuilder sb = new StringBuilder();
//        sb.append("<P>");
//        sb.append(str);
//        sb.append("</p>");
//        return sb.toString();
//    }