<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080400</title>
<%--
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/apply.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/iview/styles/iview.css"/>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/iview/iview.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/axios.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/layer-js/layer.js"></script>--%>



    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/element/element-ui.css"/>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/static/css/module.css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/vue.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/element/element-ui.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/moment.js"></script>
    <script type="text/javascript" src="js/DirectoryCategory.js"></script>
    <%--<script type="text/javascript" src="js/list-vue.js"></script>--%>

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
                <el-breadcrumb-item>字典类别管理</el-breadcrumb-item>
                <el-breadcrumb-item><a href="DatadictionaryMange">数据字典表管理</a></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>
                <%--<div class="section">
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
                </div>--%>
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
                                <th width="10%">
                                    <div>
                                        <span>字典类别编号</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>字典类别名称</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>删除否</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>
                            <tr v-for="(record,index) in list" :id="record.ddcategorynum" align="center">
                                <td v-if="record.isdelete=='否'">
                                    <el-checkbox size="medium" :true-label="record.ddcategorynum"
                                                 v-model="id_list[index]"></el-checkbox>

                                   <%-- <input type="checkbox" :checked="id_list.indexOf(record.ddcategorynum)>=0"
                                           @click="checkItems(record.ddcategorynum)"/>--%>
                                </td>
                                <td v-else="record.isdelete!='否'">
                                    <el-checkbox size="medium" :true-label="record.ddcategorynum"
                                                 v-model="id_list[index]" disabled="disabled"></el-checkbox>

                                    <%--<input type="checkbox" :checked="id_list.indexOf(record.ddcategorynum)>=0"
                                           @click="checkItems(record.ddcategorynum)" disabled="disabled"/>--%>
                                </td>

                                <td :title="record.ddcategorynum">{{record.ddcategorynum}}</td>
                                <td :title="record.ddcategoryname">{{record.ddcategoryname}}</td>
                                <td :title="record.isdelete">{{record.isdelete}}</td>
                                <td>
                                    <el-button class="operation-editable" type="text" @click="editDialogVisible=true; _edit(record.ddcategorynum)">修改</el-button>
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
                            <el-dialog title="添加字典类别" :visible.sync="addDialogVisible" :modal="false" :close-on-click-modal="false"
                                       :close-on-press-escape="false" :show-close="false">
                                <el-form label-position="right"  :model="addFrom" status-icon :rules="rules" ref="addFrom"
                                         class="demo-ruleForm">
                                    <el-form-item label="字典项编号：" prop="DDCategoryNum">
                                        <el-input type="input" v-model="addFrom.DDCategoryNum" autocomplete="off"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="字典项名称：" prop="DDCategoryName">
                                        <el-input type="input" v-model="addFrom.DDCategoryName" autocomplete="off"
                                                  clearable></el-input>
                                    </el-form-item>

                                    <%--<el-form-item>
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
                            <el-dialog title="修改数据字典信息" :visible.sync="editDialogVisible" :modal="false"
                                       :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                                <el-form label-position="right"  :model="editFrom" status-icon :rules="rules" ref="editFrom"
                                         class="demo-ruleForm">
                                    <el-form-item label="字典项编号：" prop="DDCategoryNum">
                                        <el-input type="input" v-model="editFrom.DDCategoryNum" autocomplete="off"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="字典项名称：" prop="DDCategoryName">
                                        <el-input type="input" v-model="editFrom.DDCategoryName" autocomplete="off"
                                                  clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否删除：" prop="isdelete">
                                        <el-select v-model="editFrom.isdelete" filterable placeholder="请选择">
                                            <el-option
                                                    v-for="item in options2"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <%--<el-form-item>
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

<%--<div id="right">
    <div class="right_tltle">

        <ul class="breadcrumb">
            <li>
                <span class="current">字典类别管理</span>
            </li>
            <li>
                <span>
                    <a href="DatadictionaryMange">数据字典管理</a>
                </span>
            </li>
        </ul>
    </div>
    <div class="right_content">

        <!--数据显示-->
        <div class="content" style="display: block">

            <div class="caozuo">
                &lt;%&ndash;<button type="button" id="btn_add" @click="_add">添加</button>

                <button type="button" id="btn_check" @click="_delete">删除</button>&ndash;%&gt;
                <el-button type="primary" @click="addDialogVisible=true">添加</el-button>
                <el-button type="primary" @click="_delete">删除</el-button>
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
                        <th width="10%">
                            <div>
                                <span>字典类别编号</span>
                            </div>
                        </th>
                        <th width="15%">
                            <div>
                                <span>字典类别名称</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>删除否</span>
                            </div>
                        </th>
                        <th width="10%">
                            <div>
                                <span>操作</span>
                            </div>
                        </th>
                    </tr>
                    <tr v-for="record in list" :id="record.ddcategorynum" align="center">
                        <td v-if="record.isdelete=='否'">
                            <input type="checkbox" :checked="id_list.indexOf(record.ddcategorynum)>=0"
                                   @click="checkItems(record.ddcategorynum)"/>
                        </td>
                        <td v-else="record.isdelete!='否'">
                            <input type="checkbox" :checked="id_list.indexOf(record.ddcategorynum)>=0"
                                   @click="checkItems(record.ddcategorynum)" disabled="disabled"/>
                        </td>

                        <td :title="record.ddcategorynum">{{record.ddcategorynum}}</td>
                        <td :title="record.ddcategoryname">{{record.ddcategoryname}}</td>
                        <td :title="record.isdelete">{{record.isdelete}}</td>
                        <td>
                            <button @click=" editDialogVisible=true; _edit(record.ddcategorynum)"
                                    class="btn btn-sm btn-default edit"
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
                <el-dialog title="添加字典类别" :visible.sync="addDialogVisible" :modal="false" :close-on-click-modal="false"
                           :close-on-press-escape="false" :show-close="false">
                    <el-form :model="addFrom" status-icon :rules="rules" ref="addFrom" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="字典项编号" prop="DDCategoryNum">
                            <el-input type="input" v-model="addFrom.DDCategoryNum" autocomplete="off"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="字典项名称" prop="DDCategoryName">
                            <el-input type="input" v-model="addFrom.DDCategoryName" autocomplete="off"
                                      clearable></el-input>
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
                <el-dialog title="修改数据字典信息" :visible.sync="editDialogVisible" :modal="false"
                           :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                    <el-form :model="editFrom" status-icon :rules="rules" ref="editFrom" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="字典项编号" prop="DDCategoryNum">
                            <el-input type="input" v-model="editFrom.DDCategoryNum" autocomplete="off"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="字典项名称" prop="DDCategoryName">
                            <el-input type="input" v-model="editFrom.DDCategoryName" autocomplete="off"
                                      clearable></el-input>
                        </el-form-item>
                        <el-form-item label="是否删除" prop="isdelete">
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

</div>--%>
</body>
</html>

