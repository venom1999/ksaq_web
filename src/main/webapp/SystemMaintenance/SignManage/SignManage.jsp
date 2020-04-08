<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080600</title>
<%--
    <script type="text/javascript" src="../../Scripts/jquery-2.2.4.min.js"></script>
    <script type="text/javascript" src="../../Scripts/vue-js/vue.min.js"></script>

    <script type="text/javascript" src="../../Scripts/layer-js/layer.js"></script>

    <script type="text/javascript"
            src="../../Scripts/bootstrap/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css"
          href="../../Scripts/bootstrap/css/bootstrap.min.css"/>
    <link href="../../Styles/apply.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/right.css"/>

--%>



    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="scripts/SignManage.js"></script>

    <style>

        /*.pop-dialog .el-input { !*输入框 *!
            width: 160px;
        }

        .pop-dialog .el-dialog { !*对话框 *!
            width: 650px;
        }

        .pop-dialog .el-form-item__label { !*文本 *!
            width: 130px;
        }

        .pop-dialog .detail-dialog2 .el-dialog {
            width: 650px;
        }

        .el-dialog__body {
            padding-left: 70px;
        }

        .filter-label {
            line-height: 2.5em;
        }

        .list-filter .el-select {
            width: 50%;
        }*/

        .pop-dialog .el-dialog {
            width: 23em;
        }
    </style>
</head>
<body class="right_wap">
<div id="right">
    <el-container v-loading="tableLoading">
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>签名管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <div class="wrapper">
            <div class="content" v-loading="pageLoading" v-cloak style="display: block">
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[0].value" clearable placeholder="请输入员工编号"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[1].value" clearable placeholder="请输入员工姓名"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" filterable clearable placeholder="请选择">
                                        <el-option value="1" label="账号正常"></el-option>
                                        <el-option value="0" label="暂停账号"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="2">
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="section">
                    <div class="list-operation">
                        <el-button class="operation-editable" type="primary" @click="getTxtUserNum" id="btn_add">添加</el-button>
                        <el-button class="operation-editable" type="primary" id="btn_delete" @click="_delete">删除</el-button>
                    </div>
                </div>
                <div class="section">
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
                                        <span>用户状态</span>
                                    </div>
                                </th>
                                <th width="20%">
                                    <div>
                                        <span>当前岗位</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.RoleID" align="center">
                                <%--<td><el-checkbox size="medium"  @change="checkItems(record.RoleID)"></el-checkbox></td>--%>
                                <td>
                                    <el-checkbox size="medium" :true-label="record.EmployeeNum"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>
                                    <td :title="record.EmployeeID">{{record.EmployeeID}}</td>
                                <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                                <td>{{record.UserState==0?'暂停账号':'账号正常'}}</td>
                                <td :title="record.WorkPositionValue">{{record.WorkPositionValue}}</td>
                                <td>
                                    <el-button class="operation-editable" type="text" @click="_edit(record.EmployeeNum)">修改
                                    </el-button>

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
                    <%--添加界面--%>
                    <div class="add-dialog">
                        <el-dialog title="添加用户信息" v-loading="addLoading" :visible.sync="addDialogVisible" :modal="true"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form :model="addFrom" ref="addRuleFrom"
                                     :rules="rules" class="">
                                <el-form-item label="用户姓名：" prop="UserNum" size="small">
                                    <el-select v-model="addFrom.UserNum" filterable="true" placeholder="请选择">
                                        <el-option v-for="item in TxtUserNumList" :value="item.EmployeeNum"
                                                   :label="item.EmployeeInfo"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="用户签名状态：" prop="UserState" size="small">
                                    <el-select v-model="addFrom.UserState" filterable placeholder="请选择">
                                        <el-option value="1" label="正常账号"></el-option>
                                        <el-option value="0" label="暂停账号"></el-option>
                                    </el-select>
                                </el-form-item>


                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button id="btn-add" :disabled="disabled_add" type="primary" @click="_add();getList(conditions, pageindex);">添 加
                                </el-button>

                                <el-button @click="reset_add">重 置</el-button>
                                <el-button @click="addDialogVisible=false" type="danger">关
                                    闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <%--修改界面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改用户信息" v-loading="editLoading" :visible.sync="editDialogVisible" :modal="true"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form :model="addFrom" ref="addRuleFrom"
                                     :rules="rules" class="">
                                <el-form-item label="用户姓名：" prop="UserNum" size="small">
                                    <el-input type="input" v-model="addFrom.UserName" disabled="true"
                                              clearable></el-input>
                                    <%--<el-select v-model="addFrom.UserName" filterable="true" placeholder="请选择" disabled="true" >
                                        <el-option v-for="item in TxtUserNumList" :value="item.EmployeeNum" :label="item.EmployeeInfo"></el-option>
                                    </el-select>--%>
                                </el-form-item>
                                <el-form-item label="用户签名状态：" prop="UserState" size="small">
                                    <el-select v-model="addFrom.UserState" filterable placeholder="请选择">
                                        <el-option value="1" label="正常账号"></el-option>
                                        <el-option value="0" label="暂停账号"></el-option>
                                    </el-select>
                                </el-form-item>


                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button id="btn-add" :disabled="disabled_edit" type="primary" @click="_save">保存
                                </el-button>
                                <el-button @click="editDialogVisible=false;getList(conditions, pageindex);" type="danger">关
                                    闭
                                </el-button>
                            </div>
                        </el-dialog>
                    </div>

                </div>
            </div>

        </div>


    </el-container>
</div>


<%--<div class="right">
    <div class="right_tltle">
        <ul class="breadcrumb">
            <li>
                <span class="current">签名管理</span>
            </li>
        </ul>
    </div>
    <div class="right_content">
        <!--数据显示-->
        <div class="content" v-loading="pageLoading" v-cloak style="display: block">
            <div class="list-filter">
                <div class="filter-wrapper">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="8">
                            <el-col class="filter-label" :span="8">
                                员工编号
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="params[0].value" clearable placeholder="请输入员工编号"></el-input>
                            </el-col>
                        </el-col>

                        <el-col :span="7">
                            <el-col class="filter-label" :span="8">
                                员工姓名
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="params[1].value" clearable placeholder="请输入员工姓名"></el-input>
                            </el-col>
                        </el-col>

                        <el-col :span="7">
                            <el-col class="filter-label" :span="8">
                                用户状态
                            </el-col>
                            <el-select v-model="params[2].value" filterable placeholder="请选择">
                                <el-option value="1" label="账号正常"></el-option>
                                <el-option value="0" label="暂停账号"></el-option>
                            </el-select>
                        </el-col>


                        <el-col span="2">
                            <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="caozuo">
                <el-button class="operation-editable" type="button" @click="getTxtUserNum" id="btn_add">添加</el-button>
                <el-button class="operation-editable" type="button" id="btn_delete" @click="_delete">删除</el-button>
            </div>
            <div class="clear"></div>
            <div class="list-table" v-loading="tableLoading">
                <table id="table-list" width="100%" border="0" cellspacing="0" cellpadding="0"
                       class="list_title table table-bordered table-striped table-hover">
                    <tr>
                        <th width="10%">
                            <div>
                                <span>#</span>
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
                                <span>用户状态</span>
                            </div>
                        </th>
                        <th width="20%">
                            <div>
                                <span>当前岗位</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>操作</span>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="(record,index) in list" :id="record.RoleID" align="center">
                        &lt;%&ndash;<td><el-checkbox size="medium"  @change="checkItems(record.RoleID)"></el-checkbox></td>&ndash;%&gt;
                        <td>
                            <el-checkbox size="medium" :true-label="record.EmployeeNum"
                                         v-model="id_list[index]"></el-checkbox>
                        </td>
                        <td :title="record.EmployeeNum">{{record.EmployeeNum}}</td>
                        <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                        <td>{{record.UserState==0?'暂停账号':'账号正常'}}</td>
                        <td :title="record.WorkPositionValue">{{record.WorkPositionValue}}</td>
                        <td>
                            <button
                                    class="operation-editable"
                                    type="button" @click="_edit(record.EmployeeNum)" title="修改">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </button>

                        </td>
                    </tr>
                </table>
                <div class="list-pagination">

                    <div class="tip-bar" :style="{display:(pagenum>0?'none':'')}">
                        <span>提示：没有符合条件的记录</span>
                    </div>
                    <div class="page-bar" :style="{display:(pagenum==0?'none':'')}">
                        <nav aria-span="Page navigation" style="float: right">
                            <ul class="pagination pagination-sm">
                                <li>
                                    <a class="page-info" href="javascript:void(0)">
                                        <span>当前页码:[</span>
                                        <span>{{pageindex}}</span>
                                        <span>]&nbsp;&nbsp;每页记录:[10]&nbsp;&nbsp;总页:[</span>
                                        <span>{{pagenum}}</span>
                                        <span>]</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="page-directing" @click="pageindex==1||getList(conditions,1)"
                                       :class="{'a-disabled':pageindex==1}">首页</a>
                                </li>
                                <li>
                                    <a class="page-directing" @click="pageindex==1||getList(conditions,pageindex-1)"
                                       :class="{'a-disabled':pageindex==1}">上一页</a>
                                </li>
                                <li>
                                    <a class="page-directing"
                                       @click="pageindex==pagenum||getList(conditions,pageindex+1)"
                                       :class="{'a-disabled':pageindex==pagenum}">下一页</a>
                                </li>
                                <li>
                                    <a class="page-directing"
                                       @click="pagenum==1||pageindex==pagenum||getList(conditions,pagenum)"
                                       :class="{'a-disabled':pagenum==1||pageindex==pagenum}">末页</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <div class="pop-dialog">
                &lt;%&ndash;添加界面&ndash;%&gt;
                <div class="add-dialog">
                    <el-dialog title="添加用户信息" v-loading="addLoading" :visible.sync="addDialogVisible" :modal="true"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-form :model="addFrom" ref="addRuleFrom"
                                 :rules="rules" class="">
                            <el-form-item label="用户姓名" prop="UserNum" size="small">
                                <el-select v-model="addFrom.UserNum" filterable="true" placeholder="请选择">
                                    <el-option v-for="item in TxtUserNumList" :value="item.EmployeeNum"
                                               :label="item.EmployeeInfo"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="用户签名状态" prop="UserState" size="small">
                                <el-select v-model="addFrom.UserState" filterable placeholder="请选择">
                                    <el-option value="1" label="正常账号"></el-option>
                                    <el-option value="0" label="暂停账号"></el-option>
                                </el-select>
                            </el-form-item>


                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button id="btn-add" :disabled="disabled_add" type="primary" @click="_add">添 加
                            </el-button>

                            <el-button @click="reset_add">重 置</el-button>
                            <el-button @click="addDialogVisible=false;getList(conditions, pageindex);" type="danger">关
                                闭
                            </el-button>
                        </div>
                    </el-dialog>
                </div>

                &lt;%&ndash;修改界面&ndash;%&gt;
                <div class="edit-dialog">
                    <el-dialog title="修改用户信息" v-loading="editLoading" :visible.sync="editDialogVisible" :modal="true"
                               :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-form :model="addFrom" ref="addRuleFrom"
                                 :rules="rules" class="">
                            <el-form-item label="用户姓名" prop="UserNum" size="small">
                                <el-input type="input" v-model="addFrom.UserName" disabled="true"
                                          clearable></el-input>
                                &lt;%&ndash;<el-select v-model="addFrom.UserName" filterable="true" placeholder="请选择" disabled="true" >
                                    <el-option v-for="item in TxtUserNumList" :value="item.EmployeeNum" :label="item.EmployeeInfo"></el-option>
                                </el-select>&ndash;%&gt;
                            </el-form-item>
                            <el-form-item label="用户签名状态" prop="UserState" size="small">
                                <el-select v-model="addFrom.UserState" filterable placeholder="请选择">
                                    <el-option value="1" label="正常账号"></el-option>
                                    <el-option value="0" label="暂停账号"></el-option>
                                </el-select>
                            </el-form-item>


                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button id="btn-add" :disabled="disabled_edit" type="primary" @click="_save">保存
                            </el-button>
                            <el-button @click="editDialogVisible=false;getList(conditions, pageindex);" type="danger">关
                                闭
                            </el-button>
                        </div>
                    </el-dialog>
                </div>

            </div>
        </div>
    </div>
</div>--%>
</body>
</html>

