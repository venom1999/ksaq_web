<%--
  Created by IntelliJ IDEA.
  User: lirong
  Date: 2020/2/13
  Time: 18:09
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
    <script type="text/javascript" src="js/TestInfoManage.js?<%=Math.random()%>"></script>
</head>
<body class="right_wap">
    <div id="right">
        <el-container>
            <el-header height="48px">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><a href="">考试信息管理</a></el-breadcrumb-item>
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
                                    <el-select v-model="params[2].value" clearable filterable placeholder="请选择成绩提交情况">
                                        <el-option v-for="record in is_submitted_list" :value="record.value"
                                                   :label="record.label"></el-option>
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
                    <div class="list-operation">
                        <el-button <%--class="operation-editable"--%> type="primary" @click="clickAddBtn">添加</el-button>
                        <el-button <%--class="operation-editable"--%> type="primary" @click="_predelete">删除</el-button>
                        <el-button type="primary" @click="_mulreleased">发布</el-button>
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
                                <%--<th width="8%">
                                    <div>
                                        <span>是否机考</span>
                                    </div>
                                </th>--%>
                                <th width="15%">
                                    <div>
                                        <span>考试起始时间</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>考试终止时间</span>
                                    </div>
                                </th>
                                <th width="20%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.test_id" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.test_id" v-model="id_list[index]"></el-checkbox>
                                </td>
                                <td :title="record.test_name">{{record.test_name}}</td>
                                <td :title="record.education_name">{{record.education_name}}</td>
                                <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                                <td :title="record.test_address">{{record.test_address}}</td>
                                <%--<td :title="record.is_online?'机考':'非机考'">{{record.is_online==1?'机考':'非机考'}}</td>--%>
                                <td :title="record.test_start_time">{{record.test_start_time}}</td>
                                <td :title="record.test_end_time">{{record.test_end_time}}</td>
                                <td>
                                    <el-button type="text" @click="_detail(record.test_id)">详细</el-button>
                                    <el-button type="text" @click="_edit(record.test_id)">修改</el-button>
                                    <el-dropdown trigger="hover">
                                        <span class="el-dropdown-link">
                                           更多<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="_enter(record.test_id,record.education_id,record.test_name,record.test_type)">报名
                                            </el-dropdown-item>
                                            <el-dropdown-item @click.native="_makeup(record.test_id, record.education_id)">补考
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
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
                        <el-dialog title="添加考试信息" top="2.5vh" :visible.sync="addDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="50em">
                            <el-form label-position="right" :model="addForm" ref="addForm" :rules="rules" class="">
                                <el-container>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="考试名称：" prop="test_name" size="small">
                                                <el-input type="input" v-model="addForm.test_name" id="bind_train_readonly"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训名称：" prop="education_id" size="small">
                                                <el-select v-model="addForm.education_id" class="test_visibility"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in educationlist"
                                                            :key="item.education_id"
                                                            :label="item.education_name"
                                                            :value="item.education_id">
                                                    </el-option>
                                                </el-select>
                                                <el-input type="input" v-model="addTempForm.education_name" readonly class="makeup_visibility" style="display: none"></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训类型：" prop="edu_category_id" size="small">
                                                <el-select v-model="addForm.edu_category_id" class="test_visibility no_train_visibility"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in categorylist"
                                                            :key="item.edu_category_id"
                                                            :label="item.edu_category_name"
                                                            :value="item.edu_category_id">
                                                    </el-option>
                                                </el-select>
                                                <el-input type="input" v-model="addTempForm.edu_category_name" readonly class="makeup_visibility bind_train_visibility" style="display: none"></el-input>
                                            </el-form-item>
                                            <el-form-item label="考试地点：" prop="test_address" size="small">
                                                <el-input type="input" v-model="addForm.test_address"></el-input>
                                            </el-form-item>
                                            <el-form-item label="考试类型：" prop="test_type" size="small">
                                                <el-input type="input" v-model="addForm.test_type==1?'正常考试':'补考'" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="是否机考：" prop="is_online" size="small">
                                                <el-select v-model="addForm.is_online" class="test_visibility"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in is_online_list"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input type="input" v-model="addTempForm.is_online_name" readonly class="makeup_visibility" style="display: none"></el-input>
                                            </el-form-item>
                                        </div>
                                    </fieldset>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="是否发布：" prop="is_released" size="small">
                                                <el-select v-model="addForm.is_released" placeholder="请选择">
                                                    <el-option
                                                            v-for="item in is_released_list"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="计分方式：" size="small">
                                                <el-select v-model="addForm.score_mode" placeholder="请选择" class="test_visibility">
                                                    <el-option
                                                            v-for="item in score_mode_list"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input type="input" v-model="addTempForm.score_mode_name" readonly class="makeup_visibility" style="display: none"></el-input>
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
                                            <el-form-item label="考试时长(分)：" prop="test_time" size="small">
                                                <el-input type="input" v-model="addForm.test_time" readonly></el-input>
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
                                                <el-input type="input" v-model="detailForm.is_online==1?'机考':'非机考'" readonly></el-input>
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
                    <%--修改页面--%>
                    <div class="edit-dialog loadingover">
                        <el-dialog title="修改考试信息" top="2.5vh" :visible.sync="editDialogVisible" :modal="false" v-loading="dialogLoading"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="50em">
                            <el-form label-position="right" :model="editForm" ref="editForm" :rules="rules" class="">
                                <el-container>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="考试名称：" prop="test_name" size="small">
                                                <el-input type="input" v-model="editForm.test_name"></el-input>
                                            </el-form-item>
                                            <%--<el-form-item label="培训名称：" prop="education_id" size="small" class="is_visable1">
                                                <el-select v-model="editForm.education_id"
                                                           filterable placeholder="请选择"
                                                           clearable>
                                                    <el-option
                                                            v-for="item in educationlist"
                                                            :key="item.education_id"
                                                            :label="item.education_name"
                                                            :value="item.education_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>--%>
                                            <el-form-item label="培训名称：" size="small">
                                                <el-input type="input" v-model="editTemp.education_name" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="培训类型：" size="small">
                                                <el-input type="input" v-model="editTemp.edu_category_name" readonly></el-input>
                                            </el-form-item>
                                            <%--<el-form-item label="培训类型：" prop="edu_category_id" size="small"  class="is_visable1">
                                                <el-select v-model="editForm.edu_category_id"
                                                           filterable placeholder="请选择"
                                                           clearable id="category_select">
                                                    <el-option
                                                            v-for="item in categorylist"
                                                            :key="item.edu_category_id"
                                                            :label="item.edu_category_name"
                                                            :value="item.edu_category_id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>--%>
                                            <el-form-item label="考试地点：" prop="test_address" size="small">
                                                <el-input type="input" v-model="editForm.test_address"></el-input>
                                            </el-form-item>
                                            <el-form-item label="是否机考：" prop="is_online" size="small">
                                                <el-select v-model="editForm.is_online" placeholder="请选择" class="edit_test_visibility">
                                                    <el-option
                                                            v-for="item in is_online_list"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input type="input" v-model="editTemp.is_online_name" readonly class="edit_makeup_visibility" style="display: none"></el-input>
                                            </el-form-item>
                                            <el-form-item label="考试类型：" prop="test_type" size="small">
                                                <el-input type="input" v-model="editTemp.test_type==1?'正常考试':'补考'" readonly></el-input>
                                            </el-form-item>
                                        </div>
                                    </fieldset>
                                    <fieldset class="dialog-fieldset">
                                        <div>
                                            <el-form-item label="是否发布：" prop="is_released" size="small">
                                                <el-input type="input" v-model="editForm.is_released==0?'否':'是'" readonly></el-input>
                                            </el-form-item>
                                            <el-form-item label="计分方式：" size="small">
                                                <el-select v-model="editForm.score_mode" placeholder="请选择" class="edit_test_visibility">
                                                    <el-option
                                                            v-for="item in score_mode_list"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input type="input" v-model="editTemp.score_mode_name" readonly class="edit_makeup_visibility" style="display: none"></el-input>
                                            </el-form-item>
                                            <el-form-item label="起始时间：" prop="test_start_time" size="small">
                                                <el-date-picker
                                                        v-model="editForm.test_start_time"
                                                        align="right"
                                                        type="datetime"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="终止时间：" prop="test_end_time" size="small">
                                                <el-date-picker
                                                        v-model="editForm.test_end_time"
                                                        align="right"
                                                        type="datetime"
                                                        placeholder="选择日期">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item label="考试时长(分)：" prop="test_time" size="small">
                                                <el-input type="input" v-model="editForm.test_time" readonly></el-input>
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
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true" fullscreen="true" @close="handleEnterDialog">
                            <div class="section">
                                <div class="list-operation">
                                    <el-button class="is_operated" type="primary" @click="openAddDialog">添加</el-button>
                                    <el-button class="is_operated" type="primary" @click="deleteEmployee">删除</el-button>
                                    <el-button type="primary" @click="printEmployee">打印名单</el-button>
                                    <el-tag>实际参与考试人数：{{enter_people_num}}</el-tag>
                                </div>
                            </div>
                            <div class="section" id="RecordTable">
                                <div class="list-table">
                                    <table>
                                        <tr>
                                            <th width="10%">
                                                <div>
                                                    <span>#</span>
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
                                            <th width="15%">
                                                <div>
                                                    <span>员工性别</span>
                                                </div>
                                            </th>
                                            <th width="15%">
                                                <div>
                                                    <span>员工职务</span>
                                                </div>
                                            </th>
                                            <th width="15%">
                                                <div>
                                                    <span>员工密码</span>
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
                                            <td :title="record.examinee_pwd">{{record.examinee_pwd}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </el-dialog>
                    </div>
                    <%--添加考核员工--%>
                    <div class="add-employee-dialog">
                        <el-dialog title="添加考核员工" top="2.5vh"
                                   :visible.sync="addEmployeeDialogVisible"
                                   :modal="false" fullscreen="true"
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
                                        <el-button type="primary" @click="addEmployee" >添 加</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="section">
                                <div class="list-table">
                                    <table>
                                        <tr>
                                            <th width="10%">
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
                                            <th width="15%">
                                                <div>
                                                    <span>员工性别</span>
                                                </div>
                                            </th>
                                            <th width="15%">
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
