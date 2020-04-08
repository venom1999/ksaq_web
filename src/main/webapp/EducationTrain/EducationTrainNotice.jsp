<%--
  Created by IntelliJ IDEA.
  User: lirong
  Date: 2020/2/22
  Time: 13:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="js/EducationTrainNotice.js?<%=Math.random()%>"></script>
</head>
<body class="right_wap">
    <div id="right">
        <el-container>
            <el-header height="48px">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><a href="">培训信息公告</a></el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
        </el-container>
        <div class="wrapper">
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
                                    <el-select v-model="params[0].value" clearable filterable placeholder="请选择培训类型">
                                        <el-option v-for="record in categorylist" :value="record.edu_category_id"
                                                   :label="record.edu_category_name"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[1].value" clearable placeholder="请输入培训名称"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" clearable filterable placeholder="请选择机构名称">
                                        <el-option v-for="record in institutionlist" :value="record.InstitutionNum"
                                                   :label="record.InstitutionName"></el-option>
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
                                    <el-input v-model="params[3].value" clearable placeholder="请输入培训内容"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[4].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-date-picker
                                            v-model="params[4].value"
                                            type="daterange"
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
                                            type="daterange"
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
                <!--操作列表-->
                <%--<div class="section">
                    <div class="list-operation">
                        <el-button &lt;%&ndash;class="operation-editable"&ndash;%&gt; type="primary" @click="getEnterRecords">报名的培训</el-button>
                    </div>
                </div>--%>
                <!--数据列表-->
                <div class="section">
                    <div class="list-table">
                        <table>
                            <tr>
                                <th width="10%">
                                    <div>
                                        <span>培训编号</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>培训名称</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>培训类型</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>机构名称</span>
                                    </div>
                                </th>
                                <%--<th width="15%">
                                    <div>
                                        <span>培训内容</span>
                                    </div>
                                </th>--%>
                                <th width="10%">
                                    <div>
                                        <span>培训地点</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>培训起始时间</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>培训终止时间</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.education_id" align="center">
                                <td :title="record.education_num">{{record.education_num}}</td>
                                <td :title="record.education_name">{{record.education_name}}</td>
                                <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                                <td :title="record.InstitutionName">{{record.InstitutionName}}</td>
                                <%--<td :title="record.education_content">{{record.education_content}}</td>--%>
                                <td :title="record.education_address">{{record.education_address}}</td>
                                <td :title="record.start_time">{{record.start_time}}</td>
                                <td :title="record.end_time">{{record.end_time}}</td>
                                <td>
                                    <el-button type="text" @click="_detail(record.education_id)">详细</el-button>
                                    <%--<el-button type="text" @click="_notice_enter(record.education_id)">报名</el-button>--%>
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
                    <%--详细页面--%>
                    <div class="detail-dialog loadingover">
                        <el-dialog title="培训计划明细详情" top="2.5vh" :visible.sync="detailDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="50em">
                            <el-form label-position="right" :model="detailForm" ref="detailForm" class="">
                                <el-container>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="培训编号：" prop="education_num" size="small">
                                                <el-input type="input" v-model="detailForm.education_num" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训名称：" prop="education_name" size="small">
                                                <el-input type="input" v-model="detailForm.education_name" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训人数：" prop="education_number" size="small">
                                                <el-input type="input" v-model="detailForm.education_number" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训学时：" prop="education_period" size="small">
                                                <el-input type="input" v-model="detailForm.education_period" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训地点：" prop="education_address" size="small">
                                                <el-input type="input" v-model="detailForm.education_address" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="授课老师：" prop="education_tutor" size="small">
                                                <el-input type="input" v-model="detailForm.education_tutor" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训方式：" prop="education_type" size="small">
                                                <el-input type="input" v-model="detailForm.education_type" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="大纲及教材：" prop="education_material" size="small">
                                                <el-input type="input" v-model="detailForm.education_material" readonly></el-input>
                                            </el-form-item>
                                        </div>
                                    </fieldset>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="机构名称：" prop="InstitutionName" size="small">
                                                <el-input type="input" v-model="detailForm.InstitutionName" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训类型：" prop="edu_category_name" size="small">
                                                <el-input type="input" v-model="detailForm.edu_category_name" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训资源：" prop="online_edu_res_idset" size="small">
                                                <el-select v-model="detailForm.online_edu_res_idset"
                                                           filterable placeholder="请选择" multiple
                                                           clearable disabled="true">
                                                    <el-option
                                                            v-for="item in resourcelist"
                                                            :key="item.edu_resource_id"
                                                            :label="item.resource_name"
                                                            :value="item.edu_resource_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="发布否：" prop="is_released" size="small">
                                                <el-input type="input" v-model="detailForm.is_released==0?'否':'是'" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="经费(万元)：" prop="education_budget" size="small">
                                                <el-input type="input" v-model="detailForm.education_budget" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训内容：" prop="education_content" size="small">
                                                <el-input type="textarea" v-model="detailForm.education_content" :rows="2" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="起始时间：" prop="start_time" size="small">
                                                <el-input type="input" v-model="detailForm.start_time" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="终止时间：" prop="end_time" size="small">
                                                <el-input type="input" v-model="detailForm.end_time" readonly></el-input>
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
                    <%--参与培训的记录
                    <div class="detail-dialog loadingover">
                        <el-dialog title="培训计划明细详情" top="2.5vh" :visible.sync="detailDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-table
                                    :data="enter_records"
                                    style="width: 100%">
                                <el-table-column
                                        prop="education_name"
                                        label="培训名称"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="edu_category_name"
                                        label="培训类型"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="education_address"
                                        label="培训地点"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="education_material"
                                        label="大纲及教材"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="education_tutor"
                                        label="授课老师"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="start_time"
                                        label="培训起始时间"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="end_time"
                                        label="培训结束时间"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="last_time"
                                        label="距今剩余时间"
                                        width="180">
                                </el-table-column>
                        </el-dialog>
                    </div>--%>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
