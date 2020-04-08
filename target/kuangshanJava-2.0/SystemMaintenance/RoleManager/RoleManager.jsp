<%@ page language="java" import="java.util.*,java.text.SimpleDateFormat"
         contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080200</title>
    <script type="text/javascript">
        //使ie支持es6语法，针对使用iview控件的页面
        if (window.ActiveXObject || "ActiveXObject" in window) {
            var polyfill = document.createElement("script");
            polyfill.setAttribute("src", "../../Scripts/vue-js/polyfill.min.js");
            polyfill.setAttribute("type", "text/javascript");
            document.head.appendChild(polyfill);
        }
    </script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="scripts/rolemanager.js?<%=Math.random()%>"></script>


</head>
<body>
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">

                             <el-col :span="7" :offset="7">
                                 <el-col class="filter-label" :span="6">
                                     {{params[0].label}}
                                 </el-col>
                                 <el-col :span="16">
                                     <el-input v-model="params[0].value" clearable placeholder="请输入角色名称"></el-input>
                                 </el-col>
                             </el-col>

                            <el-col :span="2" :offset="7">
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="section">
                    <div class="list-operation">
                        <el-button class="operation-editable" type="primary" @click="_add" id="btn_add">添加</el-button>
                        <el-button class="operation-editable" type="primary" @click="_delete()" id="btn_export">删除</el-button>
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
                                <th width="30%">
                                    <div>
                                        <span>角色编号</span>
                                    </div>
                                </th>
                                <th width="30%">
                                    <div>
                                        <span>角色名称</span>
                                    </div>
                                </th>
                                <th width="30%">
                                    <div>
                                        <span>备注</span>
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
                                    <el-checkbox size="medium" :true-label="record.RoleID"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>
                                <td :title="record.RoleID">{{record.RoleID}}</td>
                                <td :title="record.RoleName">{{record.RoleName}}</td>
                                <td :title="record.RoleMemo">{{record.RoleMemo}}</td>
                                <td>
                                    <el-button type="text" @click="_detail(record.RoleID)">详细</el-button>
                                    <el-button class="operation-editable" type="text" @click="_edit(record.RoleID)">修改</el-button>

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
                <span class="current">角色管理</span>
            </li>
        </ul>
    </div>
    <div class="right_content">
        <!--数据显示-->
        <div class="content" v-loading="pageLoading" v-cloak  style="display: block">
            <div class="list-filter">
                <div class="filter-wrapper">
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-col :span="4">
                        </el-col>
                        <el-col span="12">
                            <el-col class="filter-label" :span="12">
                                角色名称
                            </el-col>
                            <el-col :span="6">
                                <el-input v-model="params[0].value" clearable placeholder="请输入角色名称"></el-input>
                            </el-col>
                        </el-col>

                        <el-col span="8">
                            <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="caozuo">
                &lt;%&ndash;<button type="button" id="btn_check" @click="_check">详细</button>&ndash;%&gt;
                <el-button type="button" @click="_add" id="btn_add">添加</el-button>
                &lt;%&ndash;<button type="button" id="btn_export" @click="_export">修改</button>&ndash;%&gt;
                <el-button type="button" id="btn_delete" @click="_delete">删除</el-button>
            </div>
            <div class="clear"></div>
            <div class="list-table" v-loading="tableLoading">
                <table id="table-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="list_title table table-bordered table-striped table-hover">
                    <tr>
                        <th width="10%">
                            <div>
                                <span>#</span>
                            </div>
                        </th>
                        <th width="30%">
                            <div>
                                <span>角色编号</span>
                            </div>
                        </th>
                        <th width="30%">
                            <div>
                                <span>角色名称</span>
                            </div>
                        </th>
                        <th width="30%">
                            <div>
                                <span>备注</span>
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
                        <td><el-checkbox size="medium" :true-label="record.RoleID" v-model="id_list[index]" ></el-checkbox></td>
                        <td :title="record.RoleID">{{record.RoleID}}</td>
                        <td :title="record.RoleName">{{record.RoleName}}</td>
                        <td :title="record.RoleMemo">{{record.RoleMemo}}</td>
                        <td>
                            <button
                                    class="btn btn-sm btn-default"
                                    type="button" @click="_detail(record.RoleID)" title="详细">
                                <span class="glyphicon glyphicon-align-justify"></span>
                            </button>
                            <button
                                    class="btn btn-sm btn-default edit"
                                    type="button" @click="_edit(record.RoleID)" title="修改">
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
                                    <a class="page-directing" @click="pageindex==1||getList(conditions,1)" :class="{'a-disabled':pageindex==1}">首页</a>
                                </li>
                                <li>
                                    <a class="page-directing" @click="pageindex==1||getList(conditions,pageindex-1)" :class="{'a-disabled':pageindex==1}">上一页</a>
                                </li>
                                <li>
                                    <a class="page-directing" @click="pageindex==pagenum||getList(conditions,pageindex+1)" :class="{'a-disabled':pageindex==pagenum}">下一页</a>
                                </li>
                                <li>
                                    <a class="page-directing" @click="pagenum==1||pageindex==pagenum||getList(conditions,pagenum)" :class="{'a-disabled':pagenum==1||pageindex==pagenum}">末页</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>--%>
</html>

