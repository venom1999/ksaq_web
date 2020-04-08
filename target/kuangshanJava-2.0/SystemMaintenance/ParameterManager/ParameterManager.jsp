<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>080700</title><%--
<script type="text/javascript" src="../../Scripts/bootstrap/js/jquery-2.1.3.min.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/apply.css"/>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/bootstrap/css/bootstrap.min.css"/>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/iview/styles/iview.css"/>

	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/iview/iview.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/axios.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/layer-js/layer.js"></script>--%>
<%-- 保存行号 --%>
<%--<script type="text/javascript" src="../../Scripts/saveSelectedRowNumber.js"></script>--%>



	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

	<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
<script type="text/javascript" src="scripts/ParameterEvents.js"></script>
<%--<style type="text/css">
.auto-style1 {
	height: 30px;
}
</style>--%>
</head>
<body class="right_wap">
<%--<div style='display: none'>
    <input id="path" value="DualPreventionMechanism"/>
    <input id="tablename" value="DualPreventionMechanism_T"/>
    <input id="idname" value="DualPreventionMechanismID"/>
</div>--%>

<div id="right">
	<el-container>
		<el-header height="48px">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>参数管理</el-breadcrumb-item>
			</el-breadcrumb>
		</el-header>

		<div class="wrapper">
			<div class="content" v-loading="tableLoading" v-cloak>
				<div class="section">
					<div class="list-operation">
						<el-button class="operation-editable" type="primary" @click="addDialogVisible=true">添加</el-button>
						<el-button class="operation-editable" type="primary" @click="_delete">删除</el-button>
					</div>
				</div>
				<div class="section">
					<div class="list-table">
						<table>
							<tr>
								<th width="5%">
									<div>
										<span>#</span>
									</div>
								</th>
								<th width="10%">
									<div>
										<span>参数编号</span>
									</div>
								</th>
								<th width="15%">
									<div>
										<span>参数名称</span>
									</div>
								</th>
								<th width="10%">
									<div>
										<span>参数值</span>
									</div>
								</th>
								<th width="10%">
									<div>
										<span>操作</span>
									</div>
								</th>
							</tr>
							<tr v-for="(record,index) in list" :id="record.parameterid" align="center">
								<td>
									<el-checkbox size="medium" :true-label="record.parameterid"
												 v-model="id_list[index]"></el-checkbox>
									<%--<input type="checkbox" :checked="id_list.indexOf(record.parameterid)>=0"
										   @click="checkItems(record.parameterid)"/>--%>
								</td>
								<td :title="record.parameteritem">{{record.parameteritem}}</td>
								<td :title="record.parametername">{{record.parametername}}</td>
								<td :title="record.parametervalue">{{record.parametervalue}}</td>
								<td>
									<el-button class="operation-editable" type="text" @click="editDialogVisible=true; _edit(record.parameterid)">修改</el-button>
								</td>
							</tr>
						</table>
					</div>
				</div>

				<div class="section">
					<div class="list-pagination">
						<el-pagination
								v-if="pagenum>0"
								background
								page-size="10"
								layout="prev, pager, next"
								@current-change="getList"
								:current-page="pageindex"
								:total="pagenum*10">
						</el-pagination>
						<div class="list-hint" v-else>提示：列表中无数据</div>
					</div>
				</div>

				<div class="pop-dialog">
					<%--添加页面--%>
					<div class="add-dialog">
						<el-dialog title="添加字典类别" :visible.sync="addDialogVisible" :modal="false" :close-on-click-modal="false"
								   :close-on-press-escape="false" :show-close="false">
							<el-form label-position="right" :model="addFrom" status-icon :rules="rules" ref="addFrom"
									 class="ruleForm">
								<el-form-item label="参数编号：" prop="parameteritem">
									<el-input type="input" v-model="addFrom.parameteritem" autocomplete="off"
											  clearable></el-input>
								</el-form-item>
								<el-form-item label="参数名称：" prop="parametername">
									<el-input type="input" v-model="addFrom.parametername" autocomplete="off"
											  clearable></el-input>
								</el-form-item>
								<el-form-item label="参数值：" prop="parametervalue">
									<el-input type="input" v-model="addFrom.parametervalue" autocomplete="off"
											  clearable></el-input>
								</el-form-item>
								<%--<el-form-item>
									<el-button type="primary" @click="_add">提交</el-button>
									<el-button @click="resetForm('addFrom')">重置</el-button>
									<el-button @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>
								</el-form-item>--%>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button type="primary" @click="_add">提交</el-button>
								<el-button @click="resetForm('addFrom')">重置</el-button>
								<el-button type="danger" @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>
							</div>
						</el-dialog>
					</div>
					<%--修改页面--%>
					<div class="edit-dialog">
						<el-dialog title="修改数据字典信息" :visible.sync="editDialogVisible" :modal="false"
								   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
							<el-form label-position="right" :model="editFrom" status-icon :rules="rules" ref="editFrom"
									 class="demo-ruleForm">
								<el-form-item label="参数编号：" prop="parameteritem">
									<el-input type="input" v-model="editFrom.parameteritem" autocomplete="off"
											  clearable></el-input>
								</el-form-item>
								<el-form-item label="参数名称：" prop="parametername">
									<el-input type="input" v-model="editFrom.parametername" autocomplete="off"
											  clearable></el-input>
								</el-form-item>
								<el-form-item label="参数值：" prop="parametervalue">
									<el-input type="input" v-model="editFrom.parametervalue" autocomplete="off"
											  clearable></el-input>
								</el-form-item>

							<%--	<el-form-item>
									<el-button type="primary" @click="_saveedit">提交</el-button>
									<el-button @click="resetForm('editFrom')">重置</el-button>
									<el-button @click="editDialogVisible=false;closeFrom('editFrom')">关闭</el-button>
								</el-form-item>--%>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button type="primary" @click="_saveedit">提交</el-button>
								<el-button @click="resetForm('editFrom')">重置</el-button>
								<el-button type="danger" @click="editDialogVisible=false;closeFrom('editFrom')">关闭</el-button>
							</div>
						</el-dialog>
					</div>
				</div>
			</div>

		</div>

	</el-container>
</div>

<%--<div id="right">
	<div class="right_tltle">

		<ul class="breadcrumb">
			<li>
				<span class="current">参数管理</span>
			</li>

		</ul>
	</div>
	<div class="right_content">

		<!--数据显示-->
		<div class="content" style="display: block">

			<div class="caozuo">
				&lt;%&ndash;<button type="button" id="btn_add" @click="_add">添加</button>

                <button type="button" id="btn_check" @click="_delete">删除</button>&ndash;%&gt;
				<el-button type="primary" @click="addDialogVisible=true">添加</el-button>
				<el-button type="primary" @click="_delete">删除</el-button>
			</div>
			<div class="clear"></div>
			<div class="list">
				<table id="table-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
					<tr>
						<th width="5%">
							<div>
								<span>#</span>
							</div>
						</th>
						<th width="10%">
							<div>
								<span>参数编号</span>
							</div>
						</th>
						<th width="15%">
							<div>
								<span>参数名称</span>
							</div>
						</th>
						<th width="10%">
							<div>
								<span>参数值</span>
							</div>
						</th>
						<th width="10%">
							<div>
								<span>操作</span>
							</div>
						</th>
					</tr>
					<tr v-for="record in list" :id="record.parameterid" align="center">
						<td>
							<input type="checkbox" :checked="id_list.indexOf(record.parameterid)>=0"
								   @click="checkItems(record.parameterid)"/>
						</td>
						<td :title="record.parameteritem">{{record.parameteritem}}</td>
						<td :title="record.parametername">{{record.parametername}}</td>
						<td :title="record.parametervalue">{{record.parametervalue}}</td>
						<td>
							<button @click=" editDialogVisible=true; _edit(record.parameterid)"
									class="btn btn-sm btn-default edit"
									type="button" title="修改">
								<span class="glyphicon glyphicon-pencil"></span>
							</button>
						</td>
					</tr>
				</table>
			</div>
			<div id="fy">

				<div id="tipbar" :style="{display:(pagenum>0?'none':'')}">
					<span>提示：没有符合条件的记录</span>
				</div>
				<div id="pagebar" :style="{display:(pagenum==0?'none':'')}" style="text-align: right;float: right;">
					<nav aria-span="Page navigation" style="float: right">
						<ul class="pagination pagination-sm">
							<li style="margin-right: 20px;">
								<a href="#" style="border: none; background-color: white; margin-right: 20px;">
									<span>当前页码:[</span>
									<span id="pageindex">{{pageindex}}</span>
									<span>]&nbsp;&nbsp;每页记录:[10]&nbsp;&nbsp;总页:[</span>
									<span id="pagenum">{{pagenum}}</span>
									<span>]</span></a>
							</li>
							<li><a style="text-decoration: none;" id="lnkbtnFirst"
								   @click="getList(1,conditions,pageindex==1)" :class="{'aspNetDisabled':pageindex==1}">首页</a>
							</li>
							<li><a style="text-decoration: none;" id="lnkbtnPrevious"
								   @click="getList(pageindex-1,conditions,pageindex==1)"
								   :class="{'aspNetDisabled':pageindex==1}">上一页</a>
							</li>
							<li><a style="text-decoration: none;" id="lnkbtnNext"
								   @click="getList(pageindex+1,conditions,pageindex==pagenum)"
								   :class="{'aspNetDisabled':pageindex==pagenum}">下一页</a>
							</li>
							<li><a style="text-decoration: none;" id="lnkbtnLast"
								   @click="getList(pagenum,conditions,pagenum==1||pageindex==pagenum)"
								   :class="{'aspNetDisabled':pagenum==1||pageindex==pagenum}">末页</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		<!-- 分页 -->


		<div class="pop-dialog">
			&lt;%&ndash;添加页面&ndash;%&gt;
			<div class="add-dialog">
				<el-dialog title="添加字典类别" :visible.sync="addDialogVisible" :modal="false" :close-on-click-modal="false"
						   :close-on-press-escape="false" :show-close="false">
					<el-form :model="addFrom" status-icon :rules="rules" ref="addFrom" label-width="100px"
							 class="ruleForm">
						<el-form-item label="参数编号" prop="parameteritem">
							<el-input type="input" v-model="addFrom.parameteritem" autocomplete="off"
									  clearable></el-input>
						</el-form-item>
						<el-form-item label="参数名称" prop="parametername">
							<el-input type="input" v-model="addFrom.parametername" autocomplete="off"
									  clearable></el-input>
						</el-form-item>
						<el-form-item label="参数值" prop="parametervalue">
							<el-input type="input" v-model="addFrom.parametervalue" autocomplete="off"
									  clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="_add">提交</el-button>
							<el-button @click="resetForm('addFrom')">重置</el-button>
							<el-button @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
			</div>
			&lt;%&ndash;修改页面&ndash;%&gt;
			<div class="edit-dialog">
				<el-dialog title="修改数据字典信息" :visible.sync="editDialogVisible" :modal="false"
						   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
					<el-form :model="editFrom" status-icon :rules="rules" ref="editFrom" label-width="100px"
							 class="demo-ruleForm">
						<el-form-item label="参数编号" prop="parameteritem">
							<el-input type="input" v-model="editFrom.parameteritem" autocomplete="off"
									  clearable></el-input>
						</el-form-item>
						<el-form-item label="参数名称" prop="parametername">
							<el-input type="input" v-model="editFrom.parametername" autocomplete="off"
									  clearable></el-input>
						</el-form-item>
						<el-form-item label="参数值" prop="parametervalue">
							<el-input type="input" v-model="editFrom.parametervalue" autocomplete="off"
									  clearable></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" @click="_saveedit">提交</el-button>
							<el-button @click="resetForm('editFrom')">重置</el-button>
							<el-button @click="editDialogVisible=false;closeFrom('editFrom')">关闭</el-button>
						</el-form-item>
					</el-form>
				</el-dialog>
			</div>
		</div>
	</div>

</div>--%>
</body>

</html>
