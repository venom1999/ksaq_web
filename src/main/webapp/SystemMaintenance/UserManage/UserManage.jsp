<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080300</title>
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

    <script type="text/javascript" src="scripts/UserManageEvents.js?<%=Math.random()%>"></script>
    <style>
        .el-dialog__body .el-transfer {
            margin-left: 8.3em;
            padding-bottom: 2em;
        }
    </style>

</head>
<body>
<div id="right">
    <el-container v-loading="tableLoading">
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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
                                    <el-input v-model="params[0].value" clearable placeholder="请输入用户姓名"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-date-picker v-model="params[1].value" type="daterange" clearable></el-date-picker>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" filterable clearable placeholder="请选择">
                                        <el-option value="1" label="账号正常"></el-option>
                                        <el-option value="0" label="账号异常"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="2" >
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="section">
                    <div class="list-operation">
                        <el-button class="operation-editable" type="primary" @click="getTxtUserNum" id="btn_add">添加</el-button>
                        <el-button class="operation-editable" type="primary" @click="_delete" id="btn_export">删除</el-button>
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
                                        <span>员工编号</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>员工姓名</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>用户状态</span>
                                    </div>
                                </th>
                                <th width="22%">
                                    <div>
                                        <span>密码上次修改时间</span>
                                    </div>
                                </th>
                                <th width="22%">
                                    <div>
                                        <span>注册时间</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>登录次数</span>
                                    </div>
                                </th>
                                <th width="22%">
                                    <div>
                                        <span>最后一次登录时间</span>
                                    </div>
                                </th>
                                <th width="20%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.EmployeeNum" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.EmployeeNum"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>
                                <td :title="record.EmployeeID">{{record.EmployeeID}}</td>
                                <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                                <td >{{record.UserState == '1'?'账号正常':'账号异常'}}</td>
                                <td >{{record.LastModifyPsdTime | formatDate}}</td>
                                <td :title="record.RegisterTime | formatDate">{{record.RegisterTime | formatDate}}</td>
                                <td :title="record.LoginTimes">{{record.LoginTimes}}</td>
                                <td >{{record.LastLoginTime=='1900-01-01'?'':record.LastLoginTime}}</td>
                                <td>
                                    <el-button type="text" @click="_detail(record.EmployeeNum)">详细</el-button>
                                    <el-button class="operation-editable" type="text" @click="getTxtUserNumForEdit(record.EmployeeNum)">修改</el-button>
                                    <el-dropdown class="operation-editable" trigger="hover">
                                    <span class="el-dropdown-link">
                                       更多<i class="el-icon-arrow-down el-icon--right"></i>
                                   </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="_authorization(record.EmployeeNum)">授权</el-dropdown-item>
                                            <el-dropdown-item @click.native="_resetPassword(record.EmployeeNum)">密码重置</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
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
                        <el-dialog title="添加用户信息" :visible.sync="addDialogVisible" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="50em" >
                            <el-form label-position="right" v-loading="addDialogLoading">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="用户姓名：" prop="TxtUserNumSelected">
                                            <el-select v-model="TxtUserNumSelected" filterable="true" placeholder="请选择" @change="TxtUserNumSelectedIndexChanged">
                                                <el-option v-for="item in TxtUserNumList" :value="item.EmployeeNum" :label="item.mytext"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="用户状态：" prop="TxtUserStateSelected">
                                            <el-select v-model="TxtUserStateSelected" filterable placeholder="请选择">
                                                <el-option  value="1" label="正常账号"></el-option>
                                                <el-option  value="0" label="暂停账号"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>


                            <el-transfer v-model="rightRoleList" :data="leftRoleData" :titles="['待选角色列表', '已选角色列表']"  :button-texts="['移出', '选入']"></el-transfer>
                            <div slot="footer" class="dialog-footer">
                                <el-button id="btn-add" :disabled="disabled_add" type="primary" @click="submitAdd">添 加</el-button>

                                <el-button @click="reset_add">重 置</el-button>
                                <el-button @click="addDialogVisible=false" type="danger">关 闭</el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <%--修改界面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改用户信息"  v-loading="editLoading" :visible.sync="editDialogVisible" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="50em">
                            <el-form label-position="right" >
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="用户姓名：" prop="TxtUserNumSelected">
                                            <el-input v-model="TxtUserNum" :disabled="true"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="用户状态：" prop="TxtUserStateSelected">
                                            <el-select v-model="TxtUserStateSelected" :disabled="true" filterable placeholder="请选择">
                                                <el-option  value="1" label="正常账号"></el-option>
                                                <el-option  value="0" label="暂停账号"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>

                            <%--<el-transfer v-model="rightRoleList" :data="leftRoleData" :titles="['待选角色列表', '已选角色列表']"></el-transfer>--%>
                            <template>
                                <el-transfer v-model="rightRoleList" :data="leftRoleData" :titles="['待选角色列表', '已选角色列表']" :button-texts="['移出', '选入']"></el-transfer>
                            </template>
                            <div slot="footer" class="dialog-footer">
                                <el-button id="btn-add" :disabled="disabled_edit" type="primary" @click="submitSave();getList(pageindex,conditions );">保存</el-button>
                                <el-button @click="editDialogVisible=false" type="danger">关 闭</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </div>

        </div>


    </el-container>
</div>
</body>
<%--<body class="right_wap">

<div class="right">
    <div class="right_tltle">
        <ul class="breadcrumb">
            <li>
                <span class="current">用户管理</span>
            </li>
        </ul>
    </div>
    <div class="right_content">
        <!--数据显示-->
        <div class="content" v-loading="pageLoading" v-cloak style="display: block">
            <div class="list-filter">
                <div class="filter-wrapper">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="4">
                        </el-col>
                        <el-col :span="10">
                            <el-col class="filter-label" :span="8">
                                员工编号
                            </el-col>
                            <el-col :span="10">
                                <el-input v-model="params[0].value" clearable placeholder="请输入员工编号"></el-input>
                            </el-col>
                        </el-col>
                        <el-col span="10">
                            <el-col class="filter-label" :span="4">
                                注册时间
                            </el-col>
                            <el-col :span="16">
                                <el-date-picker v-model="params[1].value" type="daterange" clearable></el-date-picker>
                            </el-col>
                        </el-col>

                        <el-col span="8">
                            <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="caozuo">
                <el-button type="button" @click="getTxtUserNum" id="btn_add">添加</el-button>
                <el-button type="button" id="btn_delete" @click="_delete">删除</el-button>
            </div>
            <div class="clear"></div>
            <div class="list-table" v-loading="tableLoading">
                <table id="table-list" width="100%" border="0" cellspacing="0" cellpadding="0"
                       class="list_title table table-bordered table-striped table-hover">
                    <tr>
                        <th width="5%">
                            <div>
                                <span>#</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>员工编号</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>员工姓名</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>用户状态</span>
                            </div>
                        </th>
                        <th width="22%">
                            <div>
                                <span>密码上次修改时间</span>
                            </div>
                        </th>
                        <th width="22%">
                            <div>
                                <span>注册时间</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>登录次数</span>
                            </div>
                        </th>
                        <th width="22%">
                            <div>
                                <span>最后一次登录时间</span>
                            </div>
                        </th>
                        <th width="20%">
                            <div>
                                <span>操作</span>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="(record,index) in list" :id="record.EmployeeNum" align="center">
                        <td>
                            <el-checkbox size="medium" :true-label="record.EmployeeNum"
                                         v-model="id_list[index]"></el-checkbox>
                        </td>
                        <td :title="record.EmployeeID">{{record.EmployeeID}}</td>
                        <td :title="record.EmployeeName">{{record.EmployeeName}}</td>
                        <td :title="record.UserState">{{record.UserState == '1'?'账号正常':'账号异常'}}</td>
                        <td :title="record.LastModifyPsdTime | formatDate">{{record.LastModifyPsdTime | formatDate}}</td>
                        <td :title="record.RegisterTime | formatDate">{{record.RegisterTime | formatDate}}</td>
                        <td :title="record.LoginTimes">{{record.LoginTimes}}</td>
                        <td :title="record.LastLoginTime | formatDate">{{record.LastLoginTime | formatDate}}</td>
                        <td>
                            <button
                                    class="btn btn-sm btn-default"
                                    type="button" @click="_detail(record.EmployeeNum)" title="详细">
                                <span class="glyphicon glyphicon-align-justify"></span>
                            </button>
                            <button
                                    class="btn btn-sm btn-default edit"
                                    type="button" @click="getTxtUserNumForEdit(record.EmployeeNum)" title="修改">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </button>
                            <button
                                    class="btn btn-sm btn-default "
                                    type="button" @click="_authorization(record.EmployeeNum)" title="授权">
                                <span class="glyphicon glyphicon-check"></span>
                            </button>
                            <button
                                    class="btn btn-sm btn-default "
                                    type="button" @click="_resetPassword(record.EmployeeNum)" title="密码重置">
                                <span class="glyphicon glyphicon-lock"></span>
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
                    <el-dialog title="添加用户信息" :visible.sync="addDialogVisible" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-row type="flex" class="row-bg2" justify="center">
                            <el-col :span="12">
                                <el-col class="filter-label" :span="7">
                                    用户姓名
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="TxtUserNumSelected" filterable="true" placeholder="请选择" @change="TxtUserNumSelectedIndexChanged">
                                        <el-option v-for="item in TxtUserNumList" :value="item.EmployeeNum" :label="item.mytext"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="12">
                                <el-col class="filter-label" :span="7">
                                    用户状态
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="TxtUserStateSelected" filterable placeholder="请选择">
                                        <el-option  value="1" label="正常账号"></el-option>
                                        <el-option  value="0" label="暂停账号"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-transfer v-model="rightRoleList" :data="leftRoleData" :titles="['待选角色列表', '已选角色列表']"></el-transfer>
                        <div slot="footer" class="dialog-footer">
                            <el-button id="btn-add" :disabled="disabled_add" type="primary" @click="submitAdd">添 加</el-button>

                            <el-button @click="reset_add">重 置</el-button>
                            <el-button @click="addDialogVisible=false;getList(conditions, pageindex);" type="danger">关 闭</el-button>
                        </div>
                    </el-dialog>
                </div>

                &lt;%&ndash;修改界面&ndash;%&gt;
                <div class="edit-dialog">
                    <el-dialog title="修改用户信息"  v-loading="editLoading" :visible.sync="editDialogVisible" :modal="true" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                        <el-row type="flex" class="row-bg2" justify="center">
                            <el-col :span="12">
                                <el-col class="filter-label" :span="7">
                                    用户姓名
                                </el-col>
                                <el-col :span="10">
                                    <el-input v-model="TxtUserNum" :disabled="true"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="12">
                                <el-col class="filter-label" :span="7">
                                    用户状态
                                </el-col>
                                <el-col :span="10">
                                    <el-select v-model="TxtUserStateSelected" :disabled="true" filterable placeholder="请选择">
                                        <el-option  value="1" label="正常账号"></el-option>
                                        <el-option  value="0" label="暂停账号"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </el-row>
                        &lt;%&ndash;<el-transfer v-model="rightRoleList" :data="leftRoleData" :titles="['待选角色列表', '已选角色列表']"></el-transfer>&ndash;%&gt;
                        <template>
                            <el-transfer v-model="rightRoleList" :data="leftRoleData"></el-transfer>
                        </template>
                        <div slot="footer" class="dialog-footer">
                            <el-button id="btn-add" :disabled="disabled_edit" type="primary" @click="submitSave">保存</el-button>
                            <el-button @click="editDialogVisible=false;getList(conditions, pageindex);" type="danger">关 闭</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</div>
</body>--%>
</html>

