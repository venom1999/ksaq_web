package com.kuangshan.riskcontrol.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kuangshan.riskcontrol.dao.ParameterTMapper;
import com.kuangshan.riskcontrol.model.InstitutionT;
import com.kuangshan.riskcontrol.model.ParameterT;
import com.kuangshan.riskcontrol.tool.DBOperator;
import org.springframework.stereotype.Service;

@Service
public class ParameterService {
	@Resource
	private ParameterTMapper Pm;

	public List<ParameterT> getParameterList(String conditions,int index){
		return Pm.selectAllByPage(conditions, (index-1)*10, 10);
	}
	
	public int getParameterPageNum(String conditions){
		int count=Pm.selectAllNum(conditions);
		return count % 10 == 0 ? count / 10 : count / 10 + 1;
	}
	
	public ParameterT getInfoList(Integer ParameterID){
		return Pm.selectByInfo(ParameterID);
	}
	
	public Boolean insert(ParameterT record)
	{
		return Pm.insert(record)>0;
	}
	
	public Boolean update(ParameterT record)
	{
		return Pm.updateByPrimaryKey(record)>0;
	}
	
	public Boolean delete(Integer parameterid)
	{
		return Pm.deleteByPrimaryKey(parameterid)>0;
	}

	public ParameterT selectByItem(String ParameterItem) {
		return Pm.selectByItem(ParameterItem);
	}

}
