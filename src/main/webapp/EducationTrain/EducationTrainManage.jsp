<%--
  Created by IntelliJ IDEA.
  User: lirong
  Date: 2020/2/1
  Time: 11:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>010200</title>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="js/EducationTrainManage.js?<%=Math.random()%>"></script>
    <style type="text/css">
        .adjustcss .el-form-item__label{
            width: 121px;
        }
        .adjustcss .el-form-item__content{
            left: -10px;
        }
    </style>
</head>
<body class="right_wap">
    <div id="right">
        <el-container>
            <el-header height="48px">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><a href="">培训信息管理</a></el-breadcrumb-item>
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
                <!--数据列表-->
                <div class="section">
                    <div class="list-operation">
                        <el-button <%--class="operation-editable"--%> type="primary" @click="getCurrentTime">添加</el-button>
                        <el-button <%--class="operation-editable"--%> type="primary" @click="_delete">删除</el-button>
                        <el-button type="primary" @click="_mulreleased">发布</el-button>
                        <el-button type="primary" @click="_setFinished">结束</el-button>
                        <el-button type="primary" @click="_export">导出</el-button>
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
                                        <span>培训编号</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>培训名称</span>
                                    </div>
                                </th>
                                <th width="10%">
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
                                <th width="15%">
                                    <div>
                                        <span>培训地点</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>培训起始时间</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>培训终止时间</span>
                                    </div>
                                </th>
                                <th width="20%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.education_id" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.education_id" v-model="id_list[index]"></el-checkbox>
                                </td>
                                <td :title="record.education_num">{{record.education_num}}</td>
                                <td :title="record.education_name">{{record.education_name}}</td>
                                <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                                <td :title="record.InstitutionName">{{record.InstitutionName}}</td>
                                <td :title="record.education_address">{{record.education_address}}</td>
                                <%--<td :title="record.education_content">{{record.education_content}}</td>--%>
                                <td :title="record.start_time">{{record.start_time}}</td>
                                <td :title="record.end_time">{{record.end_time}}</td>
                                <td>
                                    <el-button type="text" @click="_detail(record.education_id)">详细</el-button>
                                    <el-button type="text" @click="_edit(record.education_id)">修改</el-button>
                                    <el-button type="text" @click="_enter(record.education_id,record.education_number)">报名</el-button>
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
                        <el-dialog title="添加培训计划明细" top="2.5vh" :visible.sync="addDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="50em">
                            <el-form label-position="right" :model="addForm" ref="addForm"
                                     :rules="rules" class="">
                                <el-container>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="培训编号：" prop="education_num" size="small">
                                                <el-input type="input" v-model="addForm.education_num"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训名称：" prop="education_name" size="small">
                                                <el-input type="input" v-model="addForm.education_name"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训人数：" prop="education_number" size="small">
                                                <el-input type="input" v-model="addForm.education_number" onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训学时：" prop="education_period" size="small">
                                                <el-input type="input" v-model="addForm.education_period" onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训地点：" prop="education_address" size="small">
                                                <el-input type="input" v-model="addForm.education_address"></el-input>
                                            </el-form-item>
                                            <el-form-item label="授课老师：" prop="education_tutor" size="small">
                                                <el-input type="input" v-model="addForm.education_tutor"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训方式：" prop="education_type" size="small">
                                                <el-select v-model="addForm.education_type"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in educationtypelist"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="大纲及教材：" prop="education_material" size="small" class="adjustcss">
                                                <el-input type="input" v-model="addForm.education_material"></el-input>
                                            </el-form-item>
                                        </div>
                                    </fieldset>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="机构名称：" prop="institution_name" size="small">
                                                <el-select v-model="addForm.institution_name"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in institutionlist"
                                                            :key="item.InstitutionNum"
                                                            :label="item.InstitutionName"
                                                            :value="item.InstitutionNum">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="培训类型：" prop="edu_category_id" size="small">
                                                <el-select v-model="addForm.edu_category_id"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in categorylist"
                                                            :key="item.edu_category_id"
                                                            :label="item.edu_category_name"
                                                            :value="item.edu_category_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="培训资源：" prop="online_edu_res_idset" size="small">
                                                <el-select v-model="addForm.online_edu_res_idset"
                                                           filterable placeholder="请选择" multiple
                                                           clearable>
                                                    <el-option
                                                            v-for="item in resourcelist"
                                                            :key="item.edu_resource_id"
                                                            :label="item.resource_name"
                                                            :value="item.edu_resource_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="是否发布：" prop="is_released" size="small">
                                                <el-select v-model="addForm.is_released" placeholder="请选择">
                                                    <el-option
                                                            v-for="item in releasedlist"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="经费(万元)：" prop="education_budget" size="small">
                                                <el-input type="input" v-model="addForm.education_budget" clearable onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训内容：" prop="education_content" size="small">
                                                <el-input type="textarea" v-model="addForm.education_content" :rows="2"></el-input>
                                            </el-form-item>
                                            <el-form-item label="起始时间：" prop="start_time" size="small" class="adjustcss">
                                                <el-date-picker
                                                        v-model="addForm.start_time"
                                                        align="right"
                                                        type="date"
                                                        value-format="yyyy-MM-dd"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="终止时间：" prop="end_time" size="small" class="adjustcss">
                                                <el-date-picker
                                                        v-model="addForm.end_time"
                                                        align="right"
                                                        type="date"
                                                        value-format="yyyy-MM-dd"
                                                        placeholder="选择日期">
                                                </el-date-picker>
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
                        <el-dialog title="培训计划明细详情" top="2.5vh" :visible.sync="detailDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="50em">
                            <el-form label-position="right" :model="detailForm" ref="detailForm"
                                     :rules="rules" class="">
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
                                            <el-form-item label="是否发布：" prop="is_released" size="small">
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
                    <%--修改页面--%>
                    <div class="edit-dialog loadingover">
                        <el-dialog title="修改培训计划明细" top="2.5vh" :visible.sync="editDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="50em">
                            <el-form label-position="right" :model="editForm" ref="editForm"
                                     :rules="rules" class="">
                                <el-container>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="培训编号：" prop="education_num" size="small">
                                                <el-input type="input" v-model="editForm.education_num"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训名称：" prop="education_name" size="small">
                                                <el-input type="input" v-model="editForm.education_name"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训人数：" prop="education_number" size="small">
                                                <el-input type="input" v-model="editForm.education_number" onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训学时：" prop="education_period" size="small">
                                                <el-input placeholder="请输入数字值" type="input" v-model="editForm.education_period" onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训地点：" prop="education_address" size="small">
                                                <el-input type="input" v-model="editForm.education_address"></el-input>
                                            </el-form-item>
                                            <el-form-item label="授课老师：" prop="education_tutor" size="small">
                                                <el-input type="input" v-model="editForm.education_tutor"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训方式：" prop="education_type" size="small">
                                                <el-select v-model="editForm.education_type"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in educationtypelist"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="大纲及教材：" prop="education_material" size="small">
                                                <el-input type="input" v-model="editForm.education_material"></el-input>
                                            </el-form-item>
                                        </div>
                                    </fieldset>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="机构名称：" prop="institution_name" size="small">
                                                <el-select v-model="editForm.institution_name"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in institutionlist"
                                                            :key="item.InstitutionNum"
                                                            :label="item.InstitutionName"
                                                            :value="item.InstitutionNum">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="培训类型：" prop="edu_category_id" size="small">
                                                <el-select v-model="editForm.edu_category_id"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in categorylist"
                                                            :key="item.edu_category_id"
                                                            :label="item.edu_category_name"
                                                            :value="item.edu_category_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="培训资源：" prop="online_edu_res_idset" size="small">
                                                <el-select v-model="editForm.online_edu_res_idset"
                                                           filterable placeholder="请选择" multiple
                                                           clearable>
                                                    <el-option
                                                            v-for="item in resourcelist"
                                                            :key="item.edu_resource_id"
                                                            :label="item.resource_name"
                                                            :value="item.edu_resource_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="是否发布：" prop="is_released" size="small">
                                                <el-input type="input" v-model="editForm.is_released==0?'否':'是'" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="经费(万元)：" prop="education_budget" size="small">
                                                <el-input type="input" v-model="editForm.education_budget" clearable onkeyup="this.value=this.value.replace(/[^\d]/g,'');"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训内容：" prop="education_content" size="small">
                                                <el-input type="textarea" v-model="editForm.education_content" :rows="2"></el-input>
                                            </el-form-item>
                                            <el-form-item label="起始时间：" prop="start_time" size="small">
                                                <el-date-picker
                                                        v-model="editForm.start_time"
                                                        align="right"
                                                        type="date"
                                                        value-format="yyyy-MM-dd"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="终止时间：" prop="end_time" size="small">
                                                <el-date-picker
                                                        v-model="editForm.end_time"
                                                        align="right"
                                                        type="date"
                                                        value-format="yyyy-MM-dd"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                        </div>
                                    </fieldset>
                                </el-container>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_submitEdit('editForm')">保存</el-button>
                                <el-button type="primary" @click="_released">发布</el-button>
                                <el-button @click="resetForm('editForm')">重置</el-button>
                                <el-button type="danger" @click="editDialogVisible=false;closeForm('editForm')">关闭
                                </el-button>
                            </div>

                        </el-dialog>
                    </div>
                    <%--报名页面--%>
                    <div class="enter-dialog loadingover">
                        <el-dialog title="报名培训管理" top="2.5vh" :visible.sync="enterDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true" fullscreen="true" @close="closeEnterDialog">
                            <div class="section">
                                <div class="list-operation">
                                    <el-button class="is_operated" type="primary" @click="openAddDialog">添加</el-button>
                                    <el-button class="is_operated" type="primary" @click="deleteEmployee">删除</el-button>
                                    <el-button type="primary" @click="printEmployee">打印名单</el-button>
                                    <el-tag>实际参与培训人数：{{enter_people_num}}</el-tag>
                                </div>
                            </div>
                            <div class="section" id="RecordTable" style="display: none">
                                <div class="list-table">
                                    <table>
                                        <tr>
                                            <th width="10%">
                                                <div>
                                                    <span>#</span>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div>
                                                    <span>所属机构</span>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div>
                                                    <span>员工编号</span>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div>
                                                    <span>员工姓名</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>员工性别</span>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div>
                                                    <span>员工职务</span>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr v-for="(record,index) in EmployeeList" align="center">
                                            <td>
                                                <el-checkbox size="medium" :true-label="record.roll_education_id"
                                                             v-model="id_list_add[index]"></el-checkbox>
                                            </td>
                                            <td :title="record.InstitutionName">{{record.InstitutionName}}</td>
                                            <td :title="record.EmployeeID">{{record.EmployeeID}}</td>
                                            <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                                            <td :title="record.EmployeeSex">{{record.EmployeeSex}}</td>
                                            <td :title="record.WorkPositionValue">{{record.WorkPositionValue}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <%--<div slot="footer" class="dialog-footer" id="bottom-footer">
                                <el-button type="primary" @click="enterTrain" :disabled="disabled_showRecord">保存</el-button>
                                <el-button @click="enterDialogVisible=false" type="danger">返回</el-button>
                            </div>--%>
                        </el-dialog>
                    </div>
                    <%--添加考核员工--%>
                    <div class="add-employee-dialog">
                        <el-dialog title="添加考核员工" top="2.5vh"
                                   :visible.sync="addEmployeeDialogVisible"
                                   :modal="false" fullscreen="true" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true" @close="handleClose('addEmployeeForm')">
                            <div class="list-filter">
                                <el-form :inline="true" :model="addEmployeeForm" ref="addEmployeeForm" class="demo-form-inline">
                                    <el-form-item label="所在机构" prop="enter_institution_list">
                                        <el-select v-model="addEmployeeForm.enter_institution_list" clearable filterable multiple collapse-tags placeholder="请选择所在机构">
                                            <el-option v-for="record in institutionlist" :value="record.InstitutionNum"
                                                       :label="record.InstitutionName">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="screen" >查 询</el-button>
                                        <el-button type="primary" @click="addEmployee()" >添 加</el-button>
                                    </el-form-item>
                                </el-form>
                                <%--<el-row style="margin-bottom: 15px">
                                    <el-col :span="6">
                                        <el-col class="filter-label" :span="6">
                                            {{addparams[0].label}}
                                        </el-col>
                                        <el-col :span="12">
                                            <el-select v-model="addparams[0].value" clearable filterable multiple collapse-tags placeholder="请选择所属机构">
                                                <el-option v-for="record in institutionlist" :value="record.InstitutionNum"
                                                           :label="record.InstitutionName">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="primary" @click="screen" >查 询</el-button>
                                        <el-button type="primary" style="float: right" @click="addEmployee" >添 加</el-button>
                                    </el-col>
                                </el-row>--%>
                            </div>
                            <div class="section">
                                <div class="list-table">
                                    <table style="display: block">
                                        <tr>
                                            <th width="11%">
                                                <div>
                                                    <el-input
                                                            v-model="search" style="text-align: center"
                                                            size="mini"
                                                            placeholder="输入员工编号或姓名搜索"
                                                            @input="searchEmployee">
                                                    </el-input>
                                                </div>
                                            </th>
                                            <th width="15%">
                                                <div>
                                                    <span>所属机构</span>
                                                </div>
                                            </th>
                                            <th width="15%">
                                                <div>
                                                    <span>员工编号</span>
                                                </div>
                                            </th>
                                            <th width="15%">
                                                <div>
                                                    <span>员工姓名</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>员工性别</span>
                                                </div>
                                            </th>
                                            <th width="20%">
                                                <div>
                                                    <span>员工职务</span>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr v-for="(record,index) in EmployeeListExceptPrincipal" align="center">
                                            <td>
                                                <%--<el-button
                                                        size="mini"
                                                        type="text"
                                                        @click="addEmployee(record,index)">添加
                                                </el-button>--%>
                                                <el-checkbox size="medium" :true-label="record.EmployeeNum" v-model="id_list_add[index]"></el-checkbox>
                                            </td>
                                            <td :title="record.InstitutionName">{{record.InstitutionName}}</td>
                                            <td :title="record.EmployeeID">{{record.EmployeeID}}</td>
                                            <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                                            <td :title="record.EmployeeSex">{{record.EmployeeSex}}</td>
                                            <td :title="record.WorkPositionValue">{{record.WorkPositionValue}}</td>
                                        </tr>
                                    </table>

                                </div>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
