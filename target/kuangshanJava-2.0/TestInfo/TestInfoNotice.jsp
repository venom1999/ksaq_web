<%--
  Created by IntelliJ IDEA.
  User: lirong
  Date: 2020/2/13
  Time: 18:10
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
    <script type="text/javascript" src="js/TestInfoNotice.js?<%=Math.random()%>"></script>
</head>
<body class="right_wap">
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a href="">考试信息公告</a></el-breadcrumb-item>
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
                                <el-select v-model="params[1].value" clearable filterable placeholder="请选择考试类型">
                                    <el-option v-for="record in test_type_list" :value="record.value"
                                               :label="record.label"></el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[2].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-select v-model="params[2].value" clearable filterable placeholder="请选择培训名称">
                                    <el-option v-for="record in educationlist" :value="record.education_id"
                                               :label="record.education_name"></el-option>
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
                                <el-select v-model="params[3].value" clearable filterable placeholder="请选择">
                                    <el-option v-for="record in is_online_list" :value="record.value"
                                               :label="record.label"></el-option>
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
                <div class="list-table">
                    <table>
                        <tr>
                            <th width="10%">
                                <div>
                                    <span>考试名称</span>
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
                            <th width="15%">
                                <div>
                                    <span>考试地点</span>
                                </div>
                            </th>
                            <th width="10%">
                                <div>
                                    <span>是否机考</span>
                                </div>
                            </th>
                            <th width="20%">
                                <div>
                                    <span>考试起始时间</span>
                                </div>
                            </th>
                            <th width="20%">
                                <div>
                                    <span>考试终止时间</span>
                                </div>
                            </th>
                            <th width="5%">
                                <div>
                                    <span>操作</span>
                                </div>
                            </th>
                        </tr>
                        <tr v-for="(record,index) in list" :id="record.test_id" align="center">
                            <td :title="record.test_name">{{record.test_name}}</td>
                            <td :title="record.education_name">{{record.education_name}}</td>
                            <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                            <td :title="record.test_address">{{record.test_address}}</td>
                            <td :title="record.is_online?'机考':'非机考'">{{record.is_online==1?'机考':'非机考'}}</td>
                            <td :title="record.test_start_time">{{record.test_start_time}}</td>
                            <td :title="record.test_end_time">{{record.test_end_time}}</td>
                            <td>
                                <el-button type="text" @click="_detail(record.test_id)">详细</el-button>
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
                    <el-dialog title="考试信息详情" top="2.5vh" :visible.sync="detailDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               width="50em">
                        <el-form label-position="right" :model="detailForm" ref="detailForm" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="考试名称：" prop="test_name" size="small">
                                            <el-input type="input" v-model="detailForm.test_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="培训名称：" prop="education_name" size="small">
                                            <el-input type="input" v-model="detailForm.education_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="培训类型：" prop="edu_category_name" size="small">
                                            <el-input type="input" v-model="detailForm.edu_category_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试地点：" prop="test_address" size="small">
                                            <el-input type="input" v-model="detailForm.test_address" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="考试类型：" prop="test_type" size="small">
                                            <el-input type="input" v-model="detailForm.test_type==1?'正常考试':'补考'" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否机考：" prop="is_online" size="small">
                                            <el-input type="input" v-model="detailForm.is_online==0?'机考':'非机考'" readonly></el-input>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <div>
                                        <el-form-item label="是否发布：" prop="is_released" size="small">
                                            <el-input type="input" v-model="detailForm.is_released==0?'否':'是'" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="计分方式：" prop="is_released" size="small">
                                            <el-input type="input" v-model="detailForm.score_mode" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="起始时间：" prop="test_start_time" size="small">
                                            <el-date-picker
                                                    v-model="detailForm.test_start_time"
                                                    align="right"
                                                    type="datetime"
                                                    placeholder="选择日期"
                                                    readonly>
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
                                        <el-form-item label="考试时长(分)：" prop="test_time" size="small">
                                            <el-input type="input" v-model="detailForm.test_time" readonly></el-input>
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
            </div>
        </div>
    </div>
</div>
</body>
</html>
