package com.kuangshan.riskcontrol.service;


import com.kuangshan.riskcontrol.dao.DatadictionaryTMapper;
import com.kuangshan.riskcontrol.dao.DirectoryofitemTMapper;
import com.kuangshan.riskcontrol.model.DatadictionaryT;
import com.kuangshan.riskcontrol.model.DirectoryofitemT;
import com.kuangshan.riskcontrol.tool.DBOperator;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
public class DataDictionaryService {
    @Resource
    private DirectoryofitemTMapper dir;
    @Resource
    private DatadictionaryTMapper datadictionaryTMapper;
    public List<DirectoryofitemT> selectDirectoryofitemByPage(int pagenum) {
        return dir.selectByPage(pagenum);
    }

    public int selectAllPageNum() {
        return dir.selectAllPageNum();
    }

    public int deleteByPrimaryKey(String ddcategorynum) {
        return dir.deleteByPrimaryKey(ddcategorynum);
    }


    public int insert(DirectoryofitemT record) {
        return dir.insert(record);
    }


    public int insertSelective(DirectoryofitemT record) {
        return dir.insertSelective(record);
    }

    public DirectoryofitemT selectByPrimaryKey(String ddcategorynum) {
        return dir.selectByPrimaryKey(ddcategorynum);
    }


    public int updateByPrimaryKeySelective(DirectoryofitemT record) {
        return dir.updateByPrimaryKeySelective(record);
    }


    public int updateByPrimaryKey(DirectoryofitemT record) {
        return dir.updateByPrimaryKey(record);
    }
    public List<DirectoryofitemT> selectAllDirectoryofitem(){
        return dir.selectAll();
    }


    public   int deleteByPrimaryKey1(Integer dditemid){
        return datadictionaryTMapper.deleteByPrimaryKey(dditemid);
    }


    public  int insert1(DatadictionaryT record){
        return datadictionaryTMapper.insert(record);
    }


    public  int insertSelective1(DatadictionaryT record){
        return datadictionaryTMapper.insertSelective(record);
    }


    public  DatadictionaryT selectByPrimaryKey1(Integer dditemid){
      return   datadictionaryTMapper.selectByPrimaryKey(dditemid);
    }


    public  int updateByPrimaryKeySelective1(DatadictionaryT record){
        return datadictionaryTMapper.updateByPrimaryKeySelective(record);
    }


    public  int updateByPrimaryKey1(DatadictionaryT record){
        return datadictionaryTMapper.updateByPrimaryKey(record);
    }
    public Map[] getAccidentCategory(){
        DBOperator dbOperator=new DBOperator("select DDItemValue,DDItemID from datadictionary_t where DDCategoryNum = 'AccidentCategoryNum';");
        return dbOperator.executeQuery();
    }

    public List<DatadictionaryT> getAccidentName(String accidentname){
        List<DatadictionaryT> accidents=datadictionaryTMapper.getAccidentName(accidentname);
        return accidents;
    }

    public List<DatadictionaryT> getDataByDictionary(String DDCategoryNum) {
        return datadictionaryTMapper.getDDItemValueByCategoryNum(DDCategoryNum);
    }

}
