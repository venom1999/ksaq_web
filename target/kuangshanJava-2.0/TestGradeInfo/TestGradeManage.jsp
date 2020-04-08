<%--
  Created by IntelliJ IDEA.
  User: lirong
  Date: 2020/3/2
  Time: 18:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Title</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="js/TestGradeManage.js?<%=Math.random()%>"></script>
    <style type="text/css">
        .warning-row {
            background: oldlace;
        }

        .success-row {
            background: #f0f9eb;
        }
    </style>
</head>
<body class="right_wap">
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a href="">考试成绩管理</a></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
    </el-container>
    <div class="wrapper">
        <%--<div class="content" v-loading="tableLoading" v-cloak>
            <div class="section">
                <div class="list-filter">
                    <el-row style="margin-bottom: 15px">
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[0].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-input v-model="params[0].value" clearable placeholder="请输入考试名称"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[1].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-date-picker
                                        v-model="params[1].value"
                                        type="datetimerange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[2].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-date-picker
                                        v-model="params[2].value"
                                        type="datetimerange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-col>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" style="float: right" @click="filter" >查 询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-container style="height: 578px">
                <el-aside style="height: 100%;width: 200px">
                    <!--单个激活 并以 index 作为 path 进行路由跳转-->
                    <el-menu default-active="0" @select="selectHandle"  style="height: 100%">
                        <div class="navigation-title" v-for="(item,index) in list">
                            <el-menu-item :index="index+''">
                                <span slot="title">{{item.test_name}}</span>
                            </el-menu-item>
                        </div>
                    </el-menu>
                </el-aside>
                <el-container>

                    <el-main>
                        <el-button type="primary" @click="_export">导出成绩</el-button>
                        <el-table :data="roll_data" height="90%">
                            <el-table-column prop="EmployeeID" label="员工编号" align="center">
                            </el-table-column>
                            <el-table-column prop="EmployeeName" label="员工姓名" align="center">
                            </el-table-column>
                            <el-table-column prop="score" label="考试成绩" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.is_set">
                                        <el-input size="mini" v-model="scope.row.score" style="width: 80px;"></el-input>
                                    </span>
                                    <span v-else>{{ scope.row.score }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="makeup_grade" label="补考成绩" align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.is_set">
                                        <el-input size="mini" v-model="scope.row.makeup_grade" style="width: 80px;"></el-input>
                                    </span>
                                    <span v-else>{{ scope.row.makeup_grade }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="test_result"
                                    label="考核结果"
                                    :filters="[{ text: '不通过', value: '不通过' }, { text: '通过', value: '通过' }]"
                                    :filter-method="filterTag"
                                    filter-placement="bottom-end"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-tag
                                            :type="scope.row.test_result === '不通过' ? 'primary' : 'success'"
                                            disable-transitions>{{scope.row.test_result}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="_editGrade(scope.row)" type="text" size="mini" style="margin-right: auto" v-if="!scope.row.is_set">修改</el-button>
                                    <el-button @click.native.prevent="_submitGrade(scope.row, scope.$index)" type="text" size="mini" style="margin-right: auto" v-else>保存</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>

                </el-container>
            </el-container>--%>
        <div class="content" v-loading="tableLoading" v-cloak>
            <!--查询框-->
            <div class="section">
                <div class="list-filter">
                    <el-row style="margin-bottom: 15px">
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[0].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-input v-model="params[0].value" clearable placeholder="请输入员工姓名"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[1].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="params[1].value" clearable filterable placeholder="请选择所在机构">
                                    <el-option v-for="record in institution_list" :value="record.InstitutionNum"
                                               :label="record.InstitutionName"></el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[2].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="params[2].value" clearable filterable placeholder="请选择培训类型">
                                    <el-option v-for="record in edu_category_list" :value="record.edu_category_id"
                                               :label="record.edu_category_name"></el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" style="float: right" @click="filter" >查 询</el-button>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 15px">
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[3].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="params[3].value" clearable filterable placeholder="请选择考试名称">
                                    <el-option v-for="record in test_name_list" :value="record.test_name"
                                               :label="record.test_name"></el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[4].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-date-picker
                                        v-model="params[4].value"
                                        type="datetimerange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[5].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-date-picker
                                        v-model="params[5].value"
                                        type="datetimerange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-col>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!--数据列表-->
            <div class="section">
                <div class="list-operation">
                    <el-button type="primary" @click="addDialogVisible=true">添加</el-button>
                    <el-button type="primary" @click="addMulDialogVisible=true">批量导入</el-button>
                    <el-button type="primary" @click="_delete">删除</el-button>
                    <el-button type="primary" @click="_export">导出</el-button>
                </div>
            </div>
            <div class="section">
                <div class="list-table">
                    <table>
                        <tr>
                            <th width="8%">
                                <div>
                                    <span>#</span>
                                </div>
                            </th>
                            <th width="10%">
                                <div>
                                    <span>员工编号</span>
                                </div>
                            </th>
                            <%--<th width="8%">
                                <div>
                                    <span>是否机考</span>
                                </div>
                            </th>--%>
                            <th width="15%">
                                <div>
                                    <span>员工名称</span>
                                </div>
                            </th>
                            <th width="15%">
                                <div>
                                    <span>所在部门</span>
                                </div>
                            </th>
                            <th width="17%">
                                <div>
                                    <span>公司职位</span>
                                </div>
                            </th>
                            <th width="15%">
                                <div>
                                    <span>考试名称</span>
                                </div>
                            </th><%--
                            <th width="10%">
                                <div>
                                    <span>培训类型</span>
                                </div>
                            </th>--%>
                            <th width="10%">
                                <div>
                                    <span>考试结果</span>
                                </div>
                            </th>
                            <%--<th width="10%">
                                <div>
                                    <span>补考成绩</span>
                                </div>
                            </th>--%>
                            <th width="10%">
                                <div>
                                    <span>操作</span>
                                </div>
                            </th>
                        </tr>
                        <tr v-for="(record,index) in list" :id="record.employee_edu_report_id" align="center">
                            <td>
                                <el-checkbox size="medium" :true-label="record.employee_edu_report_id" v-model="id_list[index]"></el-checkbox>
                            </td>
                            <td v-if="record.test_result==1" :title="record.EmployeeID">{{record.EmployeeID}}</td>
                            <td v-else :title="record.EmployeeID" style="color: red">{{record.EmployeeID}}</td>
                            <td v-if="record.test_result==1" :title="record.EmployeeName">{{record.EmployeeName}}</td>
                            <td v-else :title="record.EmployeeName" style="color: red">{{record.EmployeeName}}</td>
                            <td v-if="record.test_result==1" :title="record.InstitutionName">{{record.InstitutionName}}</td>
                            <td v-else :title="record.InstitutionName" style="color: red">{{record.InstitutionName}}</td>
                            <td v-if="record.test_result==1" :title="record.DDItemValue">{{record.DDItemValue}}</td>
                            <td v-else :title="record.DDItemValue" style="color: red">{{record.DDItemValue}}</td>
                            <td v-if="record.test_result==1" :title="record.test_name">{{record.test_name}}</td>
                            <td v-else :title="record.test_name" style="color: red">{{record.test_name}}</td>
                            <td v-if="record.test_result==1" :title="record.test_result==1?'通过':'不通过'">{{record.test_result==1?'通过':'不通过'}}</td>
                            <td v-else :title="record.test_result==1?'通过':'不通过'" style="color: red">{{record.test_result==1?'通过':'不通过'}}</td>
                            <%--<td :title="record.makeup_grade">{{record.makeup_grade}}</td>--%>
                            <td>
                                <el-button type="text" @click="_detail(record.employee_edu_report_id)">详细</el-button>
                                <el-button type="text" @click="_edit(record.employee_edu_report_id)">修改</el-button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="clearfloat"></div>

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
                <div class="add-dialog loadingover">
                    <el-dialog title="添加考试成绩信息" top="2.5vh" :visible.sync="addDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               width="50em">
                        <el-form label-position="right" :model="addForm" ref="addForm" :rules="rules" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="考试名称：" prop="test_name" size="small">
                                            <el-input type="input" v-model="addForm.test_name" placeholder="请输入考试名称"></el-input>
                                        </el-form-item>
                                        <el-form-item label="培训类型：" prop="edu_category_id" size="small">
                                            <el-select v-model="addForm.edu_category_id"
                                                       filterable placeholder="请选择"
                                                       clearable>
                                                <el-option
                                                        v-for="item in edu_category_list"
                                                        :key="item.edu_category_id"
                                                        :label="item.edu_category_name"
                                                        :value="item.edu_category_id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="考试地点：" prop="test_address" size="small">
                                            <el-input type="input" v-model="addForm.test_address"></el-input>
                                        </el-form-item>
                                        <el-form-item label="起始时间：" prop="test_start_time" size="small">
                                            <el-date-picker
                                                    v-model="addForm.test_start_time"
                                                    align="right"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="终止时间：" prop="test_end_time" size="small">
                                            <el-date-picker
                                                    v-model="addForm.test_end_time"
                                                    align="right"
                                                    type="datetime"
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="所在机构：" prop="institution_num" size="small">
                                            <el-select v-model="addForm.institution_num"
                                                       filterable placeholder="请选择所属机构"
                                                       clearable>
                                                <el-option
                                                        v-for="item in institution_list"
                                                        :key="item.InstitutionNum"
                                                        :label="item.InstitutionName"
                                                        :value="item.InstitutionNum">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="员工姓名：" prop="employee_num" size="small">
                                            <el-select v-model="addForm.employee_num"
                                                       filterable placeholder="请选择公司员工"
                                                       clearable>
                                                <el-option
                                                        v-for="item in employee_list"
                                                        :key="item.EmployeeNum"
                                                        :label="item.EmployeeMark"
                                                        :value="item.EmployeeNum">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="计分方式：" size="small">
                                            <el-select v-model="addForm.score_mode" placeholder="请选择计分方式" clearable filterable>
                                                <el-option
                                                        v-for="item in score_mode_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="考试成绩：" prop="score" size="small">
                                            <el-input type="input" v-model="addForm.score" palceholder="请输入考试成绩" class="add_hundred_visible"></el-input>
                                            <el-select v-model="addForm.score" filterable placeholder="请选择成绩等级" clearable style="display: none" class="add_two_visible">
                                                <el-option
                                                        v-for="item in two_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="addForm.score" filterable placeholder="请选择" clearable style="display: none" class="add_five_visible">
                                                <el-option
                                                        v-for="item in five_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="补考成绩：" prop="makeup_grade" size="small">
                                            <el-input type="input" v-model="addForm.makeup_grade" palceholder="请输入补考成绩" class="add_hundred_visible"></el-input>
                                            <el-select v-model="addForm.makeup_grade" filterable placeholder="请选择成绩等级" clearable style="display: none" class="add_two_visible">
                                                <el-option
                                                        v-for="item in two_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="addForm.makeup_grade" filterable placeholder="请选择" clearable style="display: none" class="add_five_visible">
                                                <el-option
                                                        v-for="item in five_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                            </el-container>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="_add('addForm')">添加</el-button>
                            <el-button @click="resetForm('addForm')">重置</el-button>
                            <el-button type="danger" @click="addDialogVisible=false;closeForm('addForm')">关闭
                            </el-button>
                        </div>

                    </el-dialog>
                </div>
                <%--详细页面--%>
                <div class="detail-dialog loadingover">
                    <el-dialog title="考试成绩信息详情" top="2.5vh" :visible.sync="detailDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               width="50em">
                        <el-form label-position="right" :model="detailForm" ref="detailForm" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="考试名称：" prop="test_name" size="small">
                                            <el-input type="input" v-model="detailForm.test_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="培训类型：" prop="edu_category_name" size="small">
                                            <el-input type="input" v-model="detailForm.edu_category_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试地点：" prop="test_address" size="small">
                                            <el-input type="input" v-model="detailForm.test_address"></el-input>
                                        </el-form-item>
                                        <el-form-item label="起始时间：" prop="test_start_time" size="small">
                                            <el-date-picker
                                                    v-model="detailForm.test_start_time"
                                                    align="right"
                                                    type="datetime"
                                                    readonly
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="终止时间：" prop="test_end_time" size="small">
                                            <el-date-picker
                                                    v-model="detailForm.test_end_time"
                                                    align="right"
                                                    type="datetime"
                                                    readonly
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="所在机构：" prop="InstitutionName" size="small">
                                            <el-input type="input" v-model="detailForm.InstitutionName" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工姓名：" prop="employee_name" size="small">
                                        <el-input type="input" v-model="detailForm.EmployeeName" readonly></el-input>
                                    </el-form-item>
                                        <el-form-item label="计分方式：" prop="score_mode_name" size="small">
                                            <el-input type="input" v-model="detailForm.score_mode_name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试成绩：" prop="score" size="small">

                                            <el-input v-if="detailForm.score_mode_name=='百分制'" type="input" v-model="detailForm.score" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='二分制'&&detailForm.score=='0'" type="input" v-model="two_score_list[0].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='二分制'&&detailForm.score=='1'" type="input" v-model="two_score_list[1].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.score=='0'" type="input" v-model="five_score_list[0].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.score=='1'" type="input" v-model="five_score_list[1].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.score=='2'" type="input" v-model="five_score_list[2].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.score=='3'" type="input" v-model="five_score_list[3].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.score=='4'" type="input" v-model="five_score_list[4].label" readonly></el-input>
                                            <el-input v-else type="input" v-model="detailForm.score" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="补考成绩：" prop="makeup_grade" size="small">
                                            <el-input v-if="detailForm.score_mode_name=='百分制'" type="input" v-model="detailForm.makeup_grade" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='二分制'&&detailForm.makeup_grade=='0'" type="input" v-model="two_score_list[0].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='二分制'&&detailForm.makeup_grade=='1'" type="input" v-model="two_score_list[1].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.makeup_grade=='0'" type="input" v-model="five_score_list[0].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.makeup_grade=='1'" type="input" v-model="five_score_list[1].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.makeup_grade=='2'" type="input" v-model="five_score_list[2].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.makeup_grade=='3'" type="input" v-model="five_score_list[3].label" readonly></el-input>
                                            <el-input v-else-if="detailForm.score_mode_name=='五分制'&&detailForm.makeup_grade=='4'" type="input" v-model="five_score_list[4].label" readonly></el-input>
                                            <el-input v-else type="input" v-model="detailForm.makeup_grade" readonly></el-input>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                            </el-container>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" :disabled="detailForm.btnToDisabled0"
                                       @click="_detail('previous')"
                                       style="margin-right: 10px;float: left">
                                上一条
                            </el-button>
                            <el-button type="primary" :disabled="detailForm.btnToDisabled1"
                                       @click="_detail('next')"
                                       style="margin-right: 10px;float: left">
                                下一条
                            </el-button>
                            <el-button
                                    @click="detailDialogVisible=false;closeForm('detailForm')"
                                    type="danger">关闭
                            </el-button>
                        </div>

                    </el-dialog>
                </div>
                <%--修改页面--%>
                <div class="edit-dialog loadingover">
                    <el-dialog title="修改考试成绩信息" top="2.5vh" :visible.sync="editDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="50em">
                        <el-form label-position="right" :model="editForm" ref="editForm" :rules="rules" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="考试名称：" prop="test_name" size="small">
                                            <el-input type="input" v-model="editForm.test_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="培训类型：" size="small">
                                            <el-input type="input" v-model="editTemp.edu_category_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试地点：" prop="test_address" size="small">
                                            <el-input type="input" v-model="editForm.test_address" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="起始时间：" prop="test_start_time" size="small">
                                            <el-date-picker
                                                    v-model="editForm.test_start_time"
                                                    align="right"
                                                    type="datetime"
                                                    readonly
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="终止时间：" prop="test_end_time" size="small">
                                            <el-date-picker
                                                    v-model="editForm.test_end_time"
                                                    align="right"
                                                    type="datetime"
                                                    readonly
                                                    placeholder="选择日期">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="所在机构：" prop="InstitutionName" size="small">
                                            <el-input type="input" v-model="editTemp.InstitutionName" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="员工姓名：" prop="employee_name" size="small">
                                            <el-input type="input" v-model="editTemp.EmployeeName" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="计分方式：" prop="score_mode_name" size="small">
                                            <el-input type="input" v-model="editTemp.score_mode_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试成绩：" prop="score" size="small">
                                            <el-input type="input" v-model="editForm.score" class="edit_hundred_visible"></el-input>
                                            <el-select v-model="editForm.score" filterable placeholder="请选择成绩等级" clearable style="display: none" class="edit_two_visible">
                                                <el-option
                                                        v-for="item in two_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="editForm.score" filterable placeholder="请选择" clearable style="display: none" class="edit_five_visible">
                                                <el-option
                                                        v-for="item in five_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="补考成绩：" prop="makeup_grade" size="small">
                                            <el-input type="input" v-model="editForm.makeup_grade" class="edit_hundred_visible"></el-input>
                                            <el-select v-model="editForm.makeup_grade" filterable placeholder="请选择成绩等级" clearable style="display: none"  class="edit_two_visible">
                                                <el-option
                                                        v-for="item in two_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="editForm.makeup_grade" filterable placeholder="请选择" clearable style="display: none" class="edit_five_visible">
                                                <el-option
                                                        v-for="item in five_score_list"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                            </el-container>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="_submitEdit('editForm')">保存</el-button>
                            <el-button @click="resetForm('editForm')">重置</el-button>
                            <el-button type="danger" @click="editDialogVisible=false;closeForm('editForm')">关闭
                            </el-button>
                        </div>

                    </el-dialog>
                </div>
                <%--批量导入页面--%>
                <div class="addmul-dialog loadingover">
                    <el-dialog title="批量导入考试成绩信息" top="2.5vh" :visible.sync="addMulDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-form label-position="right">
                            <el-container>
                                <div>
                                    <%--<el-form-item label="考试名称：" prop="test_name" size="small">
                                        <el-input type="input" v-model="addMulForm.test_name" placeholder="请输入考试名称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="培训类型：" prop="edu_category_id" size="small">
                                        <el-select v-model="addMulForm.edu_category_id" filterable placeholder="请选择" clearable>
                                            <el-option
                                                    v-for="item in edu_category_list"
                                                    :key="item.edu_category_id"
                                                    :label="item.edu_category_name"
                                                    :value="item.edu_category_id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="考试地点：" prop="test_address" size="small">
                                        <el-input type="input" v-model="addMulForm.test_address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="计分方式：" size="small">
                                        <el-select v-model="addMulForm.score_mode" placeholder="请选择计分方式" clearable filterable>
                                            <el-option
                                                    v-for="item in score_mode_list"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="起始时间：" prop="test_start_time" size="small">
                                        <el-date-picker
                                                v-model="addMulForm.test_start_time"
                                                align="right"
                                                type="datetime"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="终止时间：" prop="test_end_time" size="small">
                                        <el-date-picker
                                                v-model="addMulForm.test_end_time"
                                                align="right"
                                                type="datetime"
                                                placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>--%>
                                    <el-form-item label="注意事项：" size="small">
                                        <span>请严格按照模板要求填写！</span>
                                    </el-form-item>
                                    <el-form-item label="请下载模板：" size="small">
                                        <el-button type="primary" @click="_download">点击下载</el-button>
                                    </el-form-item>
                                    <el-form-item label="上传模板：" size="small">
                                        <el-upload class="upload" ref="upload" action="JustifyUploadFile" :show-file-list="true" :auto-upload="false" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList">
                                            <el-button size="small" type="primary">上传模板</el-button>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </el-container>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="_import">提交</el-button>
                            <el-button type="danger" @click="addMulDialogVisible=false;">关闭
                            </el-button>
                        </div>

                    </el-dialog>
                </div>
            </div>
        </div>
    </div>

</div>
</body>
</html>
