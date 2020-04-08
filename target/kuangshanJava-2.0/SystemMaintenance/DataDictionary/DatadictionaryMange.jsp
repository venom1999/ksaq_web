<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080400</title>
    <%--<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/apply.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/iview/styles/iview.css"/>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/iview/iview.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/axios.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/layer-js/layer.js"></script>
    <script type="text/javascript"
            src="<%=request.getContextPath()%>/static/uploadify/jquery.uploadify.min.js"></script>--%>
    <%--<script type="text/javascript" src="<%=request.getContextPath()%>/static/js/systemFile.js"></script>--%>


    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="js/DatadictionaryMange.js"></script>
    <style type="text/css">
        .list-filter .filter-label {
            text-align: right;
            line-height: 2.2em;
            font-size: 0.85em;
            /* padding-right: 1em; */
        }

        .pop-dialog .el-form-item__label {
            width: 9em;
        }
    </style>
</head>
<body class="right_wap">
<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><a href="DirectoryCategory">字典类别管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>数据字典表管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[0].value" clearable placeholder="请输入数据字典ID"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[1].value" filterable placeholder="请选择">
                                        <el-option v-for="record in options" :value="record.ddcategorynum"
                                                   :label="record.ddcategoryname"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[2].value" clearable placeholder="请输入字典条目编号"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="2">
                                <el-button @click="filter" type="primary" style="float: right">查 询</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[3].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[3].value" clearable placeholder="请输入字典条目值"></el-input>
                                </el-col>
                            </el-col>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[4].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[4].value" filterable placeholder="请选择">
                                        <el-option v-for="record in options2" :value="record.value"
                                                   :label="record.label"></el-option>
                                    </el-select>
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </div>
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
                                <th width="9%">
                                    <div>
                                        <span>数据字典ID</span>
                                    </div>
                                </th>
                                <th width="9%">
                                    <div>
                                        <span>字典项名称</span>
                                    </div>
                                </th>
                                <th width="12%">
                                    <div>
                                        <span>字典条目编号</span>
                                    </div>
                                </th>
                                <th width="8%">
                                    <div>
                                        <span>字典条目值</span>
                                    </div>
                                </th>
                                <th width="9%">
                                    <div>
                                        <span>删除否</span>
                                    </div>
                                </th>
                                <th width="9%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                                <%-- <th width="18%">
                                     <div>
                                         <span>操作</span>
                                     </div>
                                 </th>--%>

                            </tr>
                            <tr  v-for="(record,index) in list" :id="record.DDItemID" align="center">
                                <td v-if="record.IsDelete=='否'">
                                    <el-checkbox size="medium" :true-label="record.DDItemID"
                                                 v-model="id_list[index]"></el-checkbox>

                                    <%--<input type="checkbox" :checked="id_list.indexOf(record.DDItemID)>=0"
                                           @click="checkItems(record.DDItemID)"/>--%>
                                </td>
                                <td v-else="record.IsDelete!='否'">
                                    <el-checkbox size="medium" :true-label="record.DDItemID"
                                                 v-model="id_list[index]" disabled="disabled"></el-checkbox>

                                    <%--<input type="checkbox" :checked="id_list.indexOf(record.DDItemID)>=0"
                                           @click="checkItems(record.DDItemID)" disabled="disabled"/>--%>
                                </td>
                                <td :title="record.DDItemID">{{record.DDItemID}}</td>
                                <td :title="record.DDCategoryName">{{record.DDCategoryName}}</td>
                                <td :title="record.DDItemNum">{{record.DDItemNum}}</td>
                                <td :title="record.DDItemValue">{{record.DDItemValue}}</td>
                                <td :title="record.IsDelete">{{record.IsDelete}}</td>

                                <td>
                                    <el-button class="operation-editable" type="text" @click="editDialogVisible=true; _edit(record.DDItemID)">修改</el-button>
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
                        <el-dialog title="添加数据字典信息" :visible.sync="addDialogVisible" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" >
                            <el-form label-position="right" :model="addFrom" status-icon :rules="rules" ref="addFrom"  class="demo-ruleForm">
                                <el-form-item label="字典项：" prop="DDCategory" >
                                    <el-select v-model="addFrom.ddcategory" filterable placeholder="请选择">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.ddcategorynum"
                                                :label="item.ddcategoryname"
                                                :value="item.ddcategorynum">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="字典条目编号：" prop="dditemnum" >
                                    <el-input type="input" v-model="addFrom.dditemnum" autocomplete="off" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="字典条目值：" prop="dditemvalue">
                                    <el-input type="input" v-model="addFrom.dditemvalue" clearable></el-input>
                                </el-form-item>
                               <%-- <el-form-item>
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
                        <el-dialog  title="修改数据字典信息" :visible.sync="editDialogVisible" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" >
                            <el-form label-position="right" :model="editFrom" status-icon :rules="rules" ref="editFrom"  class="demo-ruleForm">
                                <el-form-item label="字典项：" prop="DDCategory" >
                                    <el-select v-model="editFrom.ddcategory" filterable placeholder="请选择">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.ddcategorynum"
                                                :label="item.ddcategoryname"
                                                :value="item.ddcategorynum">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="字典条目编号：" prop="dditemnum"  size="small">
                                    <el-input type="input" v-model="editFrom.dditemnum" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="字典条目值：" prop="dditemvalue" >
                                    <el-input  v-model="editFrom.dditemvalue" clearable size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="是否删除：" prop="isdelete" >
                                    <el-select v-model="editFrom.isdelete" filterable placeholder="请选择">
                                        <el-option
                                                v-for="item in options2"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                               <%-- <el-form-item>
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

<%--<form id="DualPreventionMechanism">

    <div id="right">
        <div class="right_tltle">


            <ul class="breadcrumb">
                <li>
                    <span>
                        <a href="DirectoryCategory" target="_self" style="cursor: pointer;" class="thirdMenu">字典类别管理</a>
					</span>
                </li>
                <li class="thirdMenu current">
                    <span>数据字典表管理</span>
                    <em></em>
                </li>


            </ul>
        </div>
            <div class="right_content">



            <!--数据显示-->
            <div class="content" style="display: block">
                <div class="search">
                    <!--使用iview控件-->
                    <Row>
                        <i-col span="8">
                            <i-col class="search-label" span="6">数据字典ID：</i-col>
                            <i-col span="14">
                                <i-input v-model="search.DDItemID" clearable placeholder="请输入数据字典ID"></i-input>
                            </i-col>
                        </i-col>

                        <i-col span="8">
                            <i-col class="search-label" span="6">字典项名称：</i-col>
                            <i-col span="14">
                                <i-select v-model="search.DDCategoryNum"  placeholder="请选择" clearable>
                                    <i-option v-for="record in options" :value="record.ddcategorynum">{{ record.ddcategoryname }}</i-option>
                                </i-select>
                                &lt;%&ndash;<Date-picker v-model="search.DDCategoryNum" placeholder="请输入字典项名称" type="daterange"></Date-picker>&ndash;%&gt;
                            </i-col>
                           &lt;%&ndash; <el-select v-model="search.DDCategoryNum" filterable placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.ddcategorynum"
                                        :label="item.ddcategoryname"
                                        :value="item.ddcategorynum">
                                </el-option>
                            </el-select>&ndash;%&gt;
                        </i-col>
                        <i-col span="8">
                            <i-col class="search-label" span="6">字典条目编号：</i-col>
                            &lt;%&ndash;<i-col span="14">
                                <Date-picker v-model="search.DDItemNum" placeholder="请输入字典条目编号" type="daterange"></Date-picker>
                            </i-col>&ndash;%&gt;
                            <i-col span="14">
                                <i-input v-model="search.DDItemNum" clearable placeholder="请输入字典条目值"></i-input>
                            </i-col>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="8">
                            <i-col class="search-label" span="6">字典条目值：</i-col>
                            <i-col span="14">
                                <i-input v-model="search.DDItemValue" clearable placeholder="请输入字典条目值"></i-input>
                            </i-col>
                        </i-col>

                        <i-col span="8">
                            <i-col class="search-label" span="6">删除否：</i-col>
                            <i-col span="14">
                                <i-select v-model="search.IsDelete" placeholder="请选择"  clearable>
                                    <i-option v-for="record in options2" :value="record.value">{{ record.label }}</i-option>
                                </i-select>
                            </i-col>
                        </i-col>

                    </Row>
                    <Row type="flex" justify="end">
                        <i-col span="2">
                            <el-button type="primary"  @click="id_list=[];getList(1,getConditions())">查询</el-button>
                            &lt;%&ndash;<button class="" style="margin-right: 1em;float: right" @click="">查询</button>&ndash;%&gt;
                        </i-col>
                        <i-col span="1"></i-col>
                    </Row>
                </div>

                <div class="list-operation">
                    <el-button type="primary" @click="addDialogVisible=true">添加</el-button>
                    <el-button type="primary" @click="_delete">删除</el-button>

                    &lt;%&ndash;<button type="button" id="btn_check" @click="_delete">删除</button>&ndash;%&gt;
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
                            <th width="9%">
                                <div>
                                    <span>数据字典ID</span>
                                </div>
                            </th>
                            <th width="9%">
                                <div>
                                    <span>字典项名称</span>
                                </div>
                            </th>
                            <th width="12%">
                                <div>
                                    <span>字典条目编号</span>
                                </div>
                            </th>
                            <th width="8%">
                                <div>
                                    <span>字典条目值</span>
                                </div>
                            </th>
                            <th width="9%">
                                <div>
                                    <span>删除否</span>
                                </div>
                            </th>
                            <th width="9%">
                                <div>
                                    <span>操作</span>
                                </div>
                            </th>
                           &lt;%&ndash; <th width="18%">
                                <div>
                                    <span>操作</span>
                                </div>
                            </th>&ndash;%&gt;

                        </tr>
                        <tr  v-for="record in list" :id="record.DDItemID" align="center">
                            <td v-if="record.IsDelete=='否'">
                                <input type="checkbox" :checked="id_list.indexOf(record.DDItemID)>=0"
                                       @click="checkItems(record.DDItemID)"/>
                            </td>
                            <td v-else="record.IsDelete!='否'">
                                <input type="checkbox" :checked="id_list.indexOf(record.DDItemID)>=0"
                                       @click="checkItems(record.DDItemID)" disabled="disabled"/>
                            </td>
                            <td :title="record.DDItemID">{{record.DDItemID}}</td>
                            <td :title="record.DDCategoryName">{{record.DDCategoryName}}</td>
                            <td :title="record.DDItemNum">{{record.DDItemNum}}</td>
                            <td :title="record.DDItemValue">{{record.DDItemValue}}</td>
                            <td :title="record.IsDelete">{{record.IsDelete}}</td>

                            <td>
                                <button @click=" editDialogVisible=true; _edit(record.DDItemID)" class="btn btn-sm btn-default edit"
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
                    <el-dialog title="添加数据字典信息" :visible.sync="addDialogVisible" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" >
                        <el-form :model="addFrom" status-icon :rules="rules" ref="addFrom" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="字典项" prop="DDCategory" >
                                <el-select v-model="addFrom.ddcategory" filterable placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.ddcategorynum"
                                            :label="item.ddcategoryname"
                                            :value="item.ddcategorynum">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="字典条目编号" prop="dditemnum" >
                                <el-input type="input" v-model="addFrom.dditemnum" autocomplete="off" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="字典条目值" prop="dditemvalue">
                                <el-input type="input" v-model="addFrom.dditemvalue" clearable></el-input>
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
                    <el-dialog  title="修改数据字典信息" :visible.sync="editDialogVisible" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" >
                        <el-form :model="editFrom" status-icon :rules="rules" ref="editFrom" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="字典项" prop="DDCategory" label-width="30%">
                                <el-select v-model="editFrom.ddcategory" filterable placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.ddcategorynum"
                                            :label="item.ddcategoryname"
                                            :value="item.ddcategorynum">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="字典条目编号" prop="dditemnum" label-width="30%" size="small">
                                <el-input type="input" v-model="editFrom.dditemnum" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="字典条目值" prop="dditemvalue" label-width="30%">
                                <el-input  v-model="editFrom.dditemvalue" clearable size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="是否删除" prop="isdelete" label-width="30%">
                                <el-select v-model="editFrom.isdelete" filterable placeholder="请选择">
                                    <el-option
                                            v-for="item in options2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
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

    </div>
</form>--%>
</body>
</html>

