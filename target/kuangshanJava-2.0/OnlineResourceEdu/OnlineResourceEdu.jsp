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
    <script type="text/javascript" src="js/OnlineResourceEdu.js?<%=Math.random()%>"></script>
    <style>
        .itemStyle .el-form-item__label{
            margin-left: -45px;
            margin-right: -100px;
        }
        .itemStyle .el-form-item__content span{
            margin-left: 70px;
        }
        .itemStyle .el-form-item__content{
            width: 100%;
        }
        .secondStyle .el-form-item__label{
            margin-left: -45px;
            margin-right: -100px;
        }
        .secondStyle .el-form-item__content input{
            margin-left: 70px;
        }
        .secondStyle .el-form-item__content{
            width: 100%;
        }
        .el-scrollbar__wrap{
            overflow-x: hidden;
        }
        .itemStyle{
            margin-bottom: 2px;
        }

        .el-scrollbar__bar.is-horizontal{
            display:none;
        }
        .spanStyle{
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space:nowrap;
            width:240px;
            height:30px;
            display:block;
        }
    </style>

</head>
<body class="right_wap">
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a href="">在线安全教育资料</a></el-breadcrumb-item>
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
                                <el-input v-model="params[1].value" clearable placeholder="请输入资源名称"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="7">
                            <el-col class="filter-label" :span="6">
                                {{params[2].label}}
                            </el-col>
                            <el-col :span="16">
                                <el-input v-model="params[2].value" clearable placeholder="请输入资源内容"></el-input>
                            </el-col>
                        </el-col>
                        <el-col :span="2">
                            <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!--数据列表-->
            <div class="section">
                <div class="list-operation">
                    <el-button <%--class="operation-editable"--%> type="primary" @click="addDialogVisible=true">添加
                    </el-button>
                    <el-button <%--class="operation-editable"--%> type="primary" @click="_delete">删除</el-button>
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
                                    <span>培训类型</span>
                                </div>
                            </th>
                            <th width="15%">
                                <div>
                                    <span>资源名称</span>
                                </div>
                            </th>
                            <th width="10%">
                                <div>
                                    <span>资源学分</span>
                                </div>
                            </th>
                            <th width="10%">
                                <div>
                                    <span>学习时间</span>
                                </div>
                            </th>
                            <th width="20%">
                                <div>
                                    <span>资源简介</span>
                                </div>
                            </th>
                            <th width="10%">
                                <div>
                                    <span>上传人</span>
                                </div>
                            </th>
                            <th width="20%">
                                <div>
                                    <span>操作</span>
                                </div>
                            </th>
                        </tr>
                        <tr v-for="(record,index) in list" :id="record.edu_resource_id" align="center">
                            <td>
                                <el-checkbox size="medium" :true-label="record.edu_resource_id" v-model="id_list[index]"></el-checkbox>
                            </td>
                            <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                            <td :title="record.resource_name">{{record.resource_name}}</td>
                            <td :title="record.resource_credit">{{record.resource_credit}}</td>
                            <td :title="record.learning_time">{{record.learning_time}}</td>
                            <td :title="record.resource_introduction">{{record.resource_introduction}}</td>
                            <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                            <td>
                                <el-button type="text" @click="_detail(record.edu_resource_id)">详细</el-button>
                                <el-button type="text" @click="_edit(record.edu_resource_id)">修改</el-button>
                                <el-dropdown trigger="hover">
                                <span class="el-dropdown-link">
                                   更多<i class="el-icon-arrow-down el-icon--right"></i>
                               </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="_view(record.edu_resource_id)">浏览</el-dropdown-item>
                                        <el-dropdown-item @click.native="_download(record.edu_resource_id)">下载</el-dropdown-item>
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
                    <el-dialog title="添加在线安全教育资料" top="2.5vh" :visible.sync="addDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               width="50em">
                        <el-form label-position="right" :model="addForm" ref="addForm"
                                 :rules="rules" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <legend>基本信息</legend>
                                    <div>
                                        <el-form-item label="培训类型：" prop="resource_category" size="small">
                                            <el-select v-model="addForm.resource_category"
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
                                        <el-form-item label="资源名称：" prop="resource_name" size="small">
                                            <el-input type="input" v-model="addForm.resource_name" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="资源简介：" prop="resource_introduction" size="small">
                                            <el-input type="textarea" v-model="addForm.resource_introduction"
                                                      clearable autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="发布否：" prop="is_released" size="small">
                                            <el-select v-model="addForm.is_released" placeholder="请选择">
                                                <el-option
                                                        v-for="item in released_options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="资源学分：" prop="resource_credit" size="small">
                                            <el-input type="input" v-model="addForm.resource_credit" clearable
                                                      autocomplete="off" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="上传人：" prop="upload_person" size="small">
                                            <el-select v-model="addForm.upload_person='${sessionScope.UserNum}'" disabled="true">
                                                <el-option
                                                        v-for="item in employeelist"
                                                        :key="item.EmployeeNum"
                                                        :label="item.EmployeeName"
                                                        :value="item.EmployeeNum">
                                                </el-option>
                                            </el-select>

                                        </el-form-item>
                                        <el-form-item label="上传时间：" prop="upload_time" size="small">
                                            <el-date-picker
                                                    v-model="addForm.upload_time"
                                                    align="right"
                                                    type="datetime"
                                                    format="yyyy-MM-dd"
                                                    placeholder="选择日期"
                                                    disabled="true">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <legend>相关文件</legend>
                                    <div>
                                        <el-upload
                                                class="upload"
                                                ref="upload"
                                                action="uploadMulFile"
                                                :on-change="handleChange"
                                                :show-file-list="false"
                                                :auto-upload="false">
                                            <el-button size="small" type="primary">上传</el-button>
                                        </el-upload>
                                       <%--<el-table
                                                :data="addForm.mulfileform"
                                                border stripe
                                                style="width: 100%;margin-top:5px;"
                                                max-height="300">
                                            <el-table-column prop="upload_file_name" label="文件名">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.upload_file_name}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="content_credit" label="学分">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.content_credit" style="width: auto"></el-input>
                                                </template>
                                            </el-table-column>
                                           <el-table-column prop="min_learning_time" label="最小学习时间">
                                               <template slot-scope="scope">
                                                   <el-input v-model="scope.row.min_learning_time" style="width: auto"></el-input>
                                               </template>
                                           </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button @click.native.prevent="deleteFileForm(scope.$index, addForm.mulfileform)" type="text" size="small">删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>--%>
                                        <el-scrollbar style="width: 100%;height:330px">
                                            <div v-for="(file,index) in addForm.mulfileform">
                                                <el-row>
                                                    <el-col :span="18" style="width: 100%">
                                                        <el-form-item label="文件名:" :prop="'mulfileform.'+index +'.upload_file_name'" class="itemStyle">
                                                            <el-popover placement="bottom" trigger="hover" effect="dark">
                                                                <div>{{file.upload_file_name}}</div>
                                                                <span class="spanStyle" slot="reference">{{ file.upload_file_name }}</span>
                                                            </el-popover>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="150" style="border-bottom: 1px solid  #e6e6e6;margin-top: -15px;">
                                                    <el-col :span="8">
                                                        <el-form-item label="学分:" :prop="'mulfileform.'+index +'.content_credit'" class="secondStyle">
                                                            <el-input v-model="file.content_credit" style="width: 50px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <el-form-item label="最小学习时间:" :prop="'mulfileform.'+index +'.min_learning_time'" class="secondStyle">
                                                            <el-input v-model="file.min_learning_time" style="width: 50px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="2" style="padding-left: 45px">
                                                        <el-form-item>
                                                            <el-button @click="deleteFile(file,index,'addForm')" icon="el-icon-delete" circle style="border: none"></el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-scrollbar>
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
                    <el-dialog title="在线安全教育资料详细" top="2.5vh" :visible.sync="detailDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               width="50em">
                        <el-form label-position="right" :model="detailForm" ref="detailForm"
                                 :rules="rules" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <legend>基本信息</legend>
                                    <div>
                                        <el-form-item label="培训类型：" prop="edu_category_name" size="small">
                                            <el-input type="input" v-model="detailForm.edu_category_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="资源名称：" prop="resource_name" size="small">
                                            <el-input type="input" v-model="detailForm.resource_name" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="资源简介：" prop="resource_introduction" size="small">
                                            <el-input type="textarea" v-model="detailForm.resource_introduction" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="发布否：" prop="is_released" size="small">
                                            <el-input type="input" v-model="detailForm.is_released==0?'否':'是'" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="资源学分：" prop="resource_credit" size="small">
                                            <el-input type="input" v-model="detailForm.resource_credit" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="上传人：" prop="EmployeeName" size="small">
                                            <el-input type="input" v-model="detailForm.EmployeeName" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="上传时间：" prop="upload_time" size="small">
                                            <el-date-picker
                                                    v-model="detailForm.upload_time"
                                                    align="right"
                                                    type="datetime"
                                                    format="yyyy-MM-dd"
                                                    placeholder="选择日期"
                                                    readonly>
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <legend>相关文件</legend>
                                    <div>
                                        <%--<el-table
                                                :data="detailForm.mulfileform"
                                                border stripe
                                                style="width:100%;"
                                                max-height="300" class="hu">
                                            <el-table-column prop="upload_file_name" label="文件名">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.upload_file_name}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="content_credit" label="学分">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.content_credit}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="min_learning_time" label="最小学习时间">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.min_learning_time}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button @click.native.prevent="_viewFile(detailForm.edu_resource_id, scope.row.upload_file_name)" type="text" size="mini" style="margin-right: auto">浏览</el-button>
                                                    <el-button @click.native.prevent="_downloadone(detailForm.edu_resource_id, scope.row.upload_file_name)" type="text" size="mini" style="margin-left: auto">下载</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>--%>
                                            <el-scrollbar style="width: 100%;height:330px;">
                                                <div v-for="(file,index) in detailForm.mulfileform">
                                                    <el-row>
                                                        <el-col :span="18" style="width: 100%">
                                                            <el-form-item label="文件名:" :prop="'mulfileform.'+index +'.upload_file_name'" class="itemStyle">
                                                                <el-popover placement="bottom" trigger="hover" effect="dark">
                                                                    <div>{{file.upload_file_name}}</div>
                                                                    <span class="spanStyle" slot="reference">{{ file.upload_file_name }}</span>
                                                                </el-popover>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row :gutter="150" style="border-bottom: 1px solid #e6e6e6">
                                                        <el-col :span="8">
                                                            <el-form-item label="学分:" :prop="'mulfileform.'+index +'.content_credit'" class="secondStyle">
                                                                <el-input v-model="file.content_credit" style="width: 50px"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-form-item label="最小学习时间:" :prop="'mulfileform.'+index +'.min_learning_time'" class="secondStyle">
                                                                <el-input v-model="file.min_learning_time" style="width: 50px"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="2" style="padding-left: 35px">
                                                            <el-form-item>
                                                                <el-tooltip content="浏览" placement="bottom" effect="light">
                                                                    <el-button @click.native.prevent="_viewFile(detailForm.edu_resource_id, file.upload_file_name)" circle style="border: none;margin-right: -10px;" size="medium" icon="el-icon-view"></el-button>
                                                                </el-tooltip>
                                                                <el-tooltip content="下载" placement="bottom" effect="light">
                                                                    <el-button @click.native.prevent="_downloadone(detailForm.edu_resource_id, file.upload_file_name)" circle style="border: none;margin-left: 10px;" size="medium" icon="el-icon-download"></el-button>
                                                                </el-tooltip>
                                                            </el-form-item>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </el-scrollbar>
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

                <div class="filedetail-dialog">
                    <el-dialog title="文件信息" :visible.sync="filedetailDialogVisible" :modal="false" top="2.5vh"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               :center="true">
                        <el-form class="">
                            <el-container>
                                <%--<el-container>--%>
                                <fieldset class="dialog-fieldset2">
                                    <div>
                                        <el-table :data="filetable">
                                            <el-table-column
                                                    prop="upload_file_name"
                                                    label="文件名称"
                                                    width="50%">
                                            </el-table-column>
                                            <el-table-column
                                                    label="操作"
                                                    width="50%">
                                                <template slot-scope="scope">
                                                    <el-button
                                                            @click="_viewFile(resource_id,scope.row.upload_file_name)"
                                                            type="text" size="small">浏览
                                                    </el-button>

                                                    <el-button
                                                            @click="_downloadone(resource_id,scope.row.upload_file_name)"
                                                            type="text" size="small">下载
                                                    </el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </fieldset>
                                <%--</el-container>--%>
                            </el-container>
                            <%-- <el-container>
                                 &lt;%&ndash;<el-button-group>&ndash;%&gt;
                                 &lt;%&ndash;<el-button type="primary" icon="arrow-left" :disabled="detailFrom.btnToDisabled0"&ndash;%&gt;
                                 &lt;%&ndash;@click="_detail('previous')">上一条&ndash;%&gt;
                                 &lt;%&ndash;</el-button>&ndash;%&gt;
                                 &lt;%&ndash;<el-button type="primary" :disabled="detailFrom.btnToDisabled1"&ndash;%&gt;
                                 &lt;%&ndash;@click="_detail('next')">下一条<i&ndash;%&gt;
                                 &lt;%&ndash;class="el-icon-arrow-right el-icon--right"></i></el-button>&ndash;%&gt;
                                 &lt;%&ndash;</el-button-group>&ndash;%&gt;
                                 <el-form-item style="margin-left: 13%">

                                     <el-button @click="filedetailDialogVisible=false;">关闭</el-button>
                                 </el-form-item>
                             </el-container>--%>
                        </el-form>
                        <div slot="footer" class="dialog-footer" style="text-align: -webkit-right">
                            <el-button type="danger" @click="filedetailDialogVisible=false;">关闭</el-button>
                        </div>
                    </el-dialog>
                </div>
                <%--修改页面--%>
                <div class="edit-dialog loadingover">
                    <el-dialog title="修改在线安全教育资料" top="2.5vh" :visible.sync="editDialogVisible" :modal="false" v-loading="dialogLoading"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                               width="50em">
                        <el-form label-position="right" :model="editForm" ref="editForm"
                                 :rules="rules" class="">
                            <el-container>
                                <fieldset class="dialog-fieldset">
                                    <legend>基本信息</legend>
                                    <div>
                                        <el-form-item label="培训类型：" prop="resource_category" size="small">
                                            <el-select v-model="editForm.resource_category"
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
                                        <el-form-item label="资源名称：" prop="resource_name" size="small">
                                            <el-input type="input" v-model="editForm.resource_name" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="资源简介：" prop="resource_introduction" size="small">
                                            <el-input type="textarea" v-model="editForm.resource_introduction"
                                                      clearable autocomplete="off"></el-input>
                                        </el-form-item>
                                        <el-form-item label="发布否：" prop="is_released" size="small">
                                            <el-input type="input" v-model="editForm.is_released==0?'否':'是'" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="资源学分：" prop="resource_credit" size="small">
                                            <el-input type="input" v-model="editForm.resource_credit" clearable
                                                      autocomplete="off" readonly></el-input>
                                        </el-form-item>
                                        <el-form-item label="上传人：" prop="upload_person" size="small">
                                            <el-select v-model="editForm.upload_person='${sessionScope.UserNum}'" disabled="true">
                                                <el-option
                                                        v-for="item in employeelist"
                                                        :key="item.EmployeeNum"
                                                        :label="item.EmployeeName"
                                                        :value="item.EmployeeNum">
                                                </el-option>
                                            </el-select>

                                        </el-form-item>
                                        <el-form-item label="上传时间：" prop="upload_time" size="small">
                                            <el-date-picker
                                                    v-model="editForm.upload_time"
                                                    align="right"
                                                    type="datetime"
                                                    format="yyyy-MM-dd"
                                                    placeholder="选择日期"
                                                    readonly>
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </fieldset>
                                <fieldset class="dialog-fieldset">
                                    <legend>相关文件</legend>
                                    <div>
                                        <el-upload
                                                class="upload"
                                                ref="upload"
                                                action="uploadMulFile"
                                                :on-change="handleEditChange"
                                                :show-file-list="false"
                                                :auto-upload="false">
                                            <el-button size="small" type="primary">上传</el-button>
                                        </el-upload>
                                        <%--<el-table
                                                :data="editForm.mulfileform"
                                                border stripe
                                                style="width: 100%"
                                                max-height="300">
                                            <el-table-column prop="upload_file_name" label="文件名">
                                                <template slot-scope="scope">
                                                    <span>{{scope.row.upload_file_name}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="content_credit" label="学分">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.content_credit" style="width: auto"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="min_learning_time" label="最小学习时间">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.min_learning_time" style="width: auto"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button @click.native.prevent="deleteFileForm(scope.$index, editForm.mulfileform)" type="text" size="small">删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>--%>
                                        <el-scrollbar style="width: 100%;height:330px">
                                            <div v-for="(file,index) in editForm.mulfileform">
                                                <el-row>
                                                    <el-col :span="18" style="width: 100%">
                                                        <el-form-item label="文件名:" :prop="'mulfileform.'+index +'.upload_file_name'" class="itemStyle">
                                                            <%--<span>{{file.upload_file_name | ellipsis}}</span>--%>
                                                            <el-popover placement="bottom" trigger="hover" effect="dark">
                                                                <div>{{file.upload_file_name}}</div>
                                                                <span class="spanStyle" slot="reference">{{ file.upload_file_name }}</span>
                                                            </el-popover>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="150" style="border-bottom: 1px solid  #e6e6e6">
                                                    <el-col :span="8">
                                                        <el-form-item label="学分:" :prop="'mulfileform.'+index +'.content_credit'" class="secondStyle">
                                                            <el-input v-model="file.content_credit" style="width: 50px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="8">
                                                        <el-form-item label="最小学习时间:" :prop="'mulfileform.'+index +'.min_learning_time'" class="secondStyle">
                                                            <el-input v-model="file.min_learning_time" style="width: 50px" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"></el-input>
                                                        </el-form-item>
                                                    </el-col>
                                                    <el-col :span="2" style="padding-left: 45px">
                                                        <el-form-item>
                                                            <el-button @click="deleteFile(file,index,'editForm')" icon="el-icon-delete" circle style="border: none"></el-button>
                                                        </el-form-item>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </el-scrollbar>
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
            </div>

            <div class="view-dialog0 viewbady">
                <el-dialog title="查看在线安全教育资源信息" top="2.5vh" :visible.sync="viewDialogVisible0" :modal="false"
                           width="100%"
                           :close-on-click-modal="true" :close-on-press-escape="true" :show-close="true"
                           :fullscreen="true">
                    <div style="height: 100%">
                        <iframe id="pdfRead" :src="filePath" width="100%" height="100%">
                        </iframe>

                    </div>

                </el-dialog>
            </div>
            <div class="view-dialog1 viewbady">
                <el-dialog id="videodia" title="查看在线安全教育资源信息" top="2.5vh" :visible.sync="viewDialogVisible1"
                           :modal="false" width="100%"
                           :close-on-click-modal="true" :close-on-press-escape="true" :show-close="true"
                           :fullscreen="true" @close="closevideoDialog">

                    <div id="mydiv" style="height: 100%;height: 100%">
                        <video id="videoex" class="video-js vjs-default-skin" controls preload="none" width="100%"
                               height="100%">
                            <source :src="filePath">
                        </video>
                    </div>

                </el-dialog>
            </div>
            <div class="audio-dialog audiobady">
                <el-dialog id="picview" :visible.sync="audioDialogVisible"
                           :modal="false" width="27%" height="20%"
                           :modal-append-to-body="true"
                           :center="true"
                           :close-on-click-modal="false" :close-on-press-escape="false" :show-close="true"
                           @close="closevideoDialog1"
                >
                    <audio id="audio" controls>
                        <source :src="filePath" :type="filetype">

                    </audio>

                </el-dialog>
            </div>
            <div class="picview-dialog viewbady">
                <el-dialog id="picview" title="查看在线安全教育资源信息" top="2.5vh" :visible.sync="picviewDialogVisible"
                           :modal="false" width="100%"
                           :close-on-click-modal="true" :close-on-press-escape="true" :show-close="true"
                           :fullscreen="true">
                    <div id="mydiv" style="height: 100%;height: 100%">
                        <img :src="filePath" style="margin-left: auto;
    margin-right:auto;
    display:block;" height="100%"/>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</div>
</body>
</html>
