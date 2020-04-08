package com.kuangshan.riskcontrol.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kuangshan.riskcontrol.tool.DBOperator;
import com.kuangshan.riskcontrol.tool.ReturnPost;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kuangshan.riskcontrol.model.ParameterT;
import com.kuangshan.riskcontrol.service.ParameterService;
import com.kuangshan.riskcontrol.tool.RequestParam;

@Controller
@RequestMapping("/SystemMaintenance")
public class ParameterController {
	@Resource
	private ParameterService Ps;
	ReturnPost returnPost = new ReturnPost();
	// 主页面
	@RequestMapping(value = "/ParameterManager/List")
	public ModelAndView ParameterList(
			@RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
			@RequestParam(value = "conditions", required = false, defaultValue = "") String conditions,
			HttpSession session) {
		ModelAndView mv = new ModelAndView();

//		session.setAttribute("pageindex", pageindex);
//		session.setAttribute("UserNum", "552528");

		mv.setViewName("/SystemMaintenance/ParameterManager/ParameterManager");
		return mv;
	}


	//字典类别管理获取list
	@RequestMapping(value = "/ParameterManager/getList")
	@ResponseBody
	public Map<String, Object> getlist(@RequestParam(value = "pageindex", required = false, defaultValue = "1") Integer pageindex,
									   @RequestParam(value = "conditions", required = false, defaultValue = "") String conditions,
									   HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		List<ParameterT> list = Ps.getParameterList(conditions, pageindex);
		int pagenum = Ps.getParameterPageNum(conditions);
		result.put("list", list);
		result.put("pageNum", pagenum);
		return result;
	}

	// 添加页面
	@RequestMapping("/ParameterManager/Add")
	public ModelAndView InstitutionManagerAdd() {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("ParameterAdd");
		return mv;
	}

	// 编辑页面
	@RequestMapping("/ParameterManager/Edit")
	@ResponseBody
	public Map<String, Object>  InstitutionManagerEdit(HttpServletRequest request) {
		Map<String, Object> result = new HashMap<>();
		ParameterT parameterT=Ps.getInfoList(Integer.parseInt(request.getParameter("parameterid")));
		result.put("parameterT", parameterT);
		return result;
	}

	// 添加数据
	@RequestMapping(value = "/ParameterManager/SubmitAdd",method = RequestMethod.POST)
    @ResponseBody
	public Map<String, String> addParameterManger(HttpServletRequest request, HttpServletResponse response,
								   @RequestParam(value = "parameteritem") String parameteritem,
								   @RequestParam(value = "parametername") String parametername,
								   @RequestParam(value = "parametervalue") String parametervalue) {
		ParameterT record= new ParameterT();
		record.setParameteritem(parameteritem);
		record.setParametername(parametername);
		record.setParametervalue(Double.valueOf(parametervalue));

		Map<String, String> result = new HashMap<>();

		try {
			String returntext = Ps.insert(record) ? "success" : "error";
			result.put("data", returntext);
			return result;
		} catch (Exception e) {
            result.put("data", "error");
            return result;
		}
	}

	// 修改数据
	@RequestMapping(value = "/ParameterManager/Submitupdate",method = RequestMethod.POST)
    @ResponseBody
	public Map<String, String> updateParameterManger(HttpServletRequest request, HttpServletResponse response,
									  @RequestParam(value = "parameterid") String parameterid,
									  @RequestParam(value = "parameteritem") String parameteritem,
									  @RequestParam(value = "parametername") String parametername,
									  @RequestParam(value = "parametervalue") String parametervalue) {
		ParameterT record= new ParameterT();
		record.setParameteritem(parameteritem);
		record.setParametername(parametername);
		record.setParametervalue(Double.valueOf(parametervalue));
		record.setParameterid(Integer.parseInt(parameterid));

        Map<String, String> result = new HashMap<>();

		try {
			String returntext = Ps.update(record) ? "success" : "error";
			result.put("data", returntext);
			return result;
		} catch (Exception e) {
            result.put("data", "error");
            return result;
		}
	}

	// 删除数据
	@RequestMapping("/ParameterManager/Delete")
    @ResponseBody
	public Map<String, String> deleteParameter(HttpServletRequest request, HttpServletResponse response,@RequestParam(value = "parameterid") String parameterid) {
        Map<String, String> result = new HashMap<>();
	    try {
			DBOperator dbOperator=new DBOperator("delete from parameter_t where parameterid in ("+parameterid+")");
			dbOperator.executeUpdate();
			/*String returntext = Ps.delete(Integer.parseInt(request.getParameter("ParameterID"))) ? "success" : "error";*/
            result.put("data", "success");
            return result;
		} catch (Exception e) {
            result.put("data", "error");
            return result;
		}
	}

}
