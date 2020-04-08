<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>080400</title>

    <script type="text/javascript">
        if (window.ActiveXObject || "ActiveXObject" in window) {
            var polyfill = document.createElement("script");
            polyfill.setAttribute("src", "<%=request.getContextPath()%>/static/js/polyfill.min.js");
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
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/systemFile.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/common.js"></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/Scripts/videojs/video.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/Scripts/magnify/js/jquery.magnify.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/Scripts/videojs/video-js.css"/>

    <script type="text/javascript" src='js/AutoGenerateTestPaper.js?<%=Math.random()%>'></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/js/pako_deflate.min.js"></script>
    <style type="text/css">

        .pop-dialog .el-form-item__label {
            width: 9em;
        }

        .el-dialog__body .el-container .dialog-fieldset2 {
            /* padding-top: 20px; */
            border: none;

        }
        .edit-dialog .el-dialog .el-table__row .el-button + .el-button {
            margin-left: 0px;
        }
        .edit-dialog .el-dialog .el-table__row .el-button{
            padding: 6px 6px;
        }

        .add_table {
            width: 60%;
            position: absolute;
            top: 46%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .table_label {
            height: 54px;
            font-size: 16px;
        }
        .adjustwidth .el-form-item__label{
            width:auto;
        }
        .adjustwidth{
            margin-left: -9px;
        }
    </style>


</head>

<body class="right_wap">
<div style='display: none'>
    <input id="path" value="EduSourceManage"/>
    <input id="tablename" value="education_category_t"/>
    <input id="idname" value="edu_category_id"/>
</div>

<div id="right">
    <el-container>

        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>自动组卷</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>

                <%--查询--%>
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">

                            <%--考试名称 查询--%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="7">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[0].value" clearable placeholder="请输入考试名称"></el-input>
                                </el-col>
                            </el-col>

                            <%--培训类型 查询   --%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[1].value" clearable placeholder="请输入培训类型"></el-input>
                                </el-col>
                            </el-col>

                            <%--考试类型 查询   --%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="record in isOnlineList"
                                                   :value="record.key"
                                                   :label="record.value">
                                        </el-option>
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
                        <el-button class="operation-editable" type="primary" @click="addDialogVisible=true;closeFrom('addFrom')">添加</el-button>
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

                                <th width="8%">
                                    <div>
                                        <span>考试名称</span>
                                    </div>
                                </th>

                                <th width="7%">
                                    <div>
                                        <span>培训类型</span>
                                    </div>
                                </th>

                                <th width="5%">
                                    <div>
                                        <span>总分</span>
                                    </div>
                                </th>

                                <th width="6%">
                                    <div>
                                        <span>单选题小分</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>单选题个数</span>
                                    </div>
                                </th>

                                <th width="6%">
                                    <div>
                                        <span>多选题小分</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>多选题个数</span>
                                    </div>
                                </th>

                                <th width="6%">
                                    <div>
                                        <span>判断题小分</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>判断题个数</span>
                                    </div>
                                </th>

                                <th width="6%">
                                    <div>
                                        <span>填空题小分</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>填空题个数</span>
                                    </div>
                                </th>

                                <th width="6%">
                                    <div>
                                        <span>问答题小分</span>
                                    </div>
                                </th>
                                <th width="6%">
                                    <div>
                                        <span>问答题个数</span>
                                    </div>
                                </th>

                                <th width="15%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>

                            <tr v-for="(record,index) in OnlineList" :id="record.paper_id" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.paper_id"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>

                                <td :title="record.test_name">{{record.test_name}}</td>
                                <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                                <td :title="record.total_score">{{record.total_score}}</td>

                                <td :title="record.single_choose_score">{{record.single_choose_score}}</td>
                                <td :title="record.single_choose_num">{{record.single_choose_num}}</td>

                                <td :title="record.multi_choice_score">{{record.multi_choice_score}}</td>
                                <td :title="record.multi_choice_num">{{record.multi_choice_num}}</td>

                                <td :title="record.judge_score">{{record.judge_score}}</td>
                                <td :title="record.judge_num">{{record.judge_num}}</td>

                                <td :title="record.question_score">{{record.question_score}}</td>
                                <td :title="record.question_num">{{record.question_num}}</td>

                                <td :title="record.blanks_test_score">{{record.blanks_test_score}}</td>
                                <td :title="record.blanks_test_num">{{record.blanks_test_num}}</td>

                                <td v-if="record.paper === 0">
                                    <el-button type="text" @click="_generate(record.paper_id)">组卷</el-button>
                                    <el-button class="operation-editable" type="text" @click="_editPart(record.paper_id);closeFrom('editFrom')">修改</el-button>
                                </td>

                                <td v-else-if="record.paper === 1">
                                    <el-button type="text" @click="_detail(record.paper_id)">详情</el-button>
                                    <el-button class="operation-editable" type="text" @click="_editPaper(record.paper_id);closeFrom('editFrom')">修改</el-button>
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
                        <el-dialog title="自动组卷" :visible.sync="addDialogVisible" :modal="false" width="26em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   fullscreen="true">
                            <el-form label-position="right" :model="addFrom" ref="addFrom" :rules="rules">
                                <el-container>
<%--                                    <fieldset class="dialog-fieldset">--%>
                                        <div style="margin-left:auto;">
                                            <el-form-item label="考试编号及名称：" prop="test_id" size="small" class="adjustwidth">
                                                <el-select v-model="addFrom.test_id" filterable clearable placeholder="请选择" size="mini">
                                                    <el-option v-for="record in testInfoList" :value="record.test_id" :label="record.test_id + '-' + record.test_name"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="单选题个数：" prop="single_choose_num" size="small">
                                                <el-input v-model="addFrom.single_choose_num" clearable placeholder="请输入单选题个数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="多选题个数：" prop="multi_choice_num" size="small">
                                                <el-input v-model="addFrom.multi_choice_num" clearable placeholder="请输入多选题个数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="判断题个数：" prop="judge_num" size="small">
                                                <el-input v-model="addFrom.judge_num" clearable placeholder="请输入判断题个数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="填空题个数：" prop="blanks_test_num" size="small">
                                                <el-input v-model="addFrom.blanks_test_num" clearable placeholder="请输入填空题个数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="问答题个数：" prop="question_num" size="small">
                                                <el-input v-model="addFrom.question_num" clearable placeholder="请输入填问答题个数" size="mini"/>
                                            </el-form-item>
                                        </div>
<%--                                    </fieldset>--%>
<%--                                    <fieldset class="dialog-fieldset">--%>
                                        <div style="margin-right:auto;">
                                            <el-form-item label="考试总分：" prop="total_score" size="small">
                                                <el-input v-model="addFrom.total_score" readonly size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="单选题小分：" prop="single_choose_score" size="small">
                                                <el-input v-model="addFrom.single_choose_score" clearable placeholder="请输入每个单选题分数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="多选题小分：" prop="multi_choice_score" size="small">
                                                <el-input v-model="addFrom.multi_choice_score" clearable placeholder="请输入每个多选题分数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="判断题小分：" prop="judge_score" size="small">
                                                <el-input v-model="addFrom.judge_score" clearable placeholder="请输入每个判断题分数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="填空题小分：" prop="blanks_test_score" size="small">
                                                <el-input v-model="addFrom.blanks_test_score" clearable placeholder="请输入每个填空题分数" size="mini"/>
                                            </el-form-item>
                                            <el-form-item label="问答题小分：" prop="question_score" size="small">
                                                <el-input v-model="addFrom.question_score" clearable placeholder="请输入每个问答题分数" size="mini"/>
                                            </el-form-item>
                                        </div>
<%--                                    </fieldset>--%>
                                </el-container>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_add">组卷</el-button>
                                <el-button type="primary" @click="_save">保存</el-button>
                                <el-button type="danger" @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>
                            </div>
<%--                            <table class="add_table">--%>
<%--                                <caption style="text-align:center;font-size:28px;font-weight: bold;margin-bottom: 40px;">自动组卷</caption>--%>
<%--                                <tr height="40px" align="center">--%>
<%--                                    <td align="right" class="table_label">--%>
<%--                                        考试编号及名称：--%>
<%--                                    </td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-select v-model="addFrom.test_id"--%>
<%--                                                   filterable clearable placeholder="请选择"--%>
<%--                                                   size="mini">--%>
<%--                                            <el-option v-for="record in testInfoList"--%>
<%--                                                       :value="record.test_id"--%>
<%--                                                       :label="record.test_id + '-' + record.test_name">--%>
<%--                                            </el-option>--%>
<%--                                        </el-select>--%>
<%--                                    </td>--%>

<%--                                    <td align="right" class="table_label">考试总分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.total_score" readonly size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">单选题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.single_choose_num" clearable placeholder="请输入单选题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">单选题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.single_choose_score" clearable placeholder="请输入每个单选题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">多选题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.multi_choice_num" clearable placeholder="请输入多选题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">多选题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.multi_choice_score" clearable placeholder="请输入每个多选题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">判断题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.judge_num" clearable placeholder="请输入判断题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">判断题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.judge_score" clearable placeholder="请输入每个判断题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">填空题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.blanks_test_num" clearable placeholder="请输入填空题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">填空题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.blanks_test_score" clearable placeholder="请输入每个填空题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">问答题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.question_num" clearable placeholder="请输入填问答题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">问答题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="addFrom.question_score" clearable placeholder="请输入每个问答题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="160px">--%>
<%--                                    <td colspan="4" align="right" >--%>
<%--                                        <el-button type="primary" @click="_add">组卷</el-button>--%>
<%--                                        <el-button type="primary" @click="_save">保存</el-button>--%>
<%--                                        <el-button type="danger" @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                            </table>--%>

                        </el-dialog>
                    </div>


                    <%--修改页面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改题型与小分" :visible.sync="editPartDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="26em"
                                   fullscreen="true">
                            <el-form label-position="right" :model="editFrom" ref="editFrom" :rules="rules">
                                <el-container>
                                    <div style="margin-left:auto;">
                                        <el-form-item label="考试编号及名称：" prop="test_id" size="small" class="adjustwidth">
                                            <el-select v-model="editFrom.test_id" filterable clearable placeholder="请选择" size="mini">
                                                <el-option v-for="record in testInfoList" :value="record.test_id" :label="record.test_id + '-' + record.test_name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="单选题个数：" prop="single_choose_num" size="small">
                                            <el-input v-model="editFrom.single_choose_num" clearable placeholder="请输入单选题个数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="多选题个数：" prop="multi_choice_num" size="small">
                                            <el-input v-model="editFrom.multi_choice_num" clearable placeholder="请输入多选题个数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="判断题个数：" prop="judge_num" size="small">
                                            <el-input v-model="editFrom.judge_num" clearable placeholder="请输入判断题个数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="填空题个数：" prop="blanks_test_num" size="small">
                                            <el-input v-model="editFrom.blanks_test_num" clearable placeholder="请输入填空题个数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="问答题个数：" prop="question_num" size="small">
                                            <el-input v-model="editFrom.question_num" clearable placeholder="请输入填问答题个数" size="mini"/>
                                        </el-form-item>
                                    </div>
                                    <div style="margin-right:auto;">
                                        <el-form-item label="考试总分：" prop="total_score" size="small">
                                            <el-input v-model="editFrom.total_score" readonly size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="单选题小分：" prop="single_choose_score" size="small">
                                            <el-input v-model="editFrom.single_choose_score" clearable placeholder="请输入每个单选题分数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="多选题小分：" prop="multi_choice_score" size="small">
                                            <el-input v-model="editFrom.multi_choice_score" clearable placeholder="请输入每个多选题分数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="判断题小分：" prop="judge_score" size="small">
                                            <el-input v-model="editFrom.judge_score" clearable placeholder="请输入每个判断题分数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="填空题小分：" prop="blanks_test_score" size="small">
                                            <el-input v-model="editFrom.blanks_test_score" clearable placeholder="请输入每个填空题分数" size="mini"/>
                                        </el-form-item>
                                        <el-form-item label="问答题小分：" prop="question_score" size="small">
                                            <el-input v-model="editFrom.question_score" clearable placeholder="请输入每个问答题分数" size="mini"/>
                                        </el-form-item>
                                    </div>
                                </el-container>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_submitEditPart">保存</el-button>
                                <el-button @click="resetForm('editFrom')">重置</el-button>
                                <el-button type="danger" @click="editPartDialogVisible=false">关闭</el-button>
                            </div>
<%--                            <table class="add_table">--%>
<%--                                <caption style="text-align:center;font-size:28px;font-weight: bold;margin-bottom: 40px;">自动组卷</caption>--%>
<%--                                <tr height="40px" align="center">--%>
<%--                                    <td align="right" class="table_label">--%>
<%--                                        考试编号及名称：--%>
<%--                                    </td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-select v-model="editFrom.test_id"--%>
<%--                                                   filterable clearable placeholder="请选择"--%>
<%--                                                   size="mini">--%>
<%--                                            <el-option v-for="record in testInfoList"--%>
<%--                                                       :value="record.test_id"--%>
<%--                                                       :label="record.test_id + '-' + record.test_name">--%>
<%--                                            </el-option>--%>
<%--                                        </el-select>--%>
<%--                                    </td>--%>

<%--                                    <td align="right" class="table_label">考试总分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.total_score" readonly size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">单选题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.single_choose_num" clearable placeholder="请输入单选题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">单选题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.single_choose_score" clearable placeholder="请输入每个单选题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">多选题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.multi_choice_num" clearable placeholder="请输入多选题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">多选题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.multi_choice_score" clearable placeholder="请输入每个多选题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">判断题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.judge_num" clearable placeholder="请输入判断题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">判断题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.judge_score" clearable placeholder="请输入每个判断题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">填空题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.blanks_test_num" clearable placeholder="请输入填空题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">填空题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.blanks_test_score" clearable placeholder="请输入每个填空题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="40px">--%>
<%--                                    <td align="right" class="table_label">问答题个数：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.question_num" clearable placeholder="请输入填问答题个数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                    <td align="right" class="table_label">问答题小分：</td>--%>
<%--                                    <td align="left">--%>
<%--                                        <el-input v-model="editFrom.question_score" clearable placeholder="请输入每个问答题分数" size="mini"/>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                                <tr height="160px">--%>
<%--                                    <td colspan="4" align="right" >--%>
<%--                                        <el-button type="primary" @click="_submitEditPart">保存</el-button>--%>
<%--                                        <el-button @click="resetForm('editFrom')">重置</el-button>--%>
<%--                                        <el-button type="danger" @click="editPartDialogVisible=false">关闭</el-button>--%>
<%--                                    </td>--%>
<%--                                </tr>--%>

<%--                            </table>--%>

                        </el-dialog>
                    </div>


                    <%--详细页面--%>
                    <div class="detail-dialog">
                        <el-dialog title="试卷详情" :visible.sync="detailDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="26em"
                                   fullscreen="true">

                            <table style="width: 80%; margin: 0 auto;">
                                <caption style="text-align:center;font-size:24px; height: 60px">{{detailFrom.test_name}}</caption>

                                <tr height="40px" align="center">
                                    <td width="50%">
                                        考试类型：<span v-if="detailFrom.test_type == 1">正常考试</span>
                                        <span v-else>补考</span>
                                    </td>

                                    <td width="50%">
                                        考试时间：{{detailFrom.test_start_time | formatDate}}
                                        -- {{detailFrom.test_end_time | formatDate}}
                                    </td>

                                </tr>

                                <tr height="40px" align="center">
                                    <td width="50%">
                                        考试地点：{{ detailFrom.test_address }}
                                    </td>

                                    <td width="50%">
                                        考试总分：{{ detailFrom.total_score }}
                                    </td>

                                </tr>
                            </table>

                            <%-----------------   单选题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.single_choose !== ''"
                            >
                                <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                    一、单选题（每题{{detailFrom.single_choose_score}}分*
                                    {{detailFrom.single_choose_num}}={{detailFrom.single_choose_score*
                                    detailFrom.single_choose_num}}分）;
                                </div>

                                <table style="width: 80%;" v-for="(record, index) in paperSingleList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.choose_content" ></span>
                                            <span></span>
                                        </td>
                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            A、<span v-html="record.single_choose_a" />
                                        </td>

                                        <td width="50%">
                                            B、<span v-html="record.single_choose_b" />
                                        </td>

                                    </tr>

                                    <tr align="left">

                                        <td width="50%">
                                            C、<span v-html="record.single_choose_c" />
                                        </td>

                                        <td width="50%">
                                            D、<span v-html="record.single_choose_d" />
                                        </td>

                                    </tr>

                                </table>

                            </div>
                            <%-----------------   /单选题 -----------------%>

                            <%-----------------   多选题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.multi_choice !== ''"
                            >
                                <%--单选题不为空--%>
                                <div style="width: 80%;" v-if="detailFrom.single_choose !== ''">
                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、多选题（每题{{detailFrom.multi_choice_score}}分*
                                        {{detailFrom.multi_choice_num}}={{detailFrom.multi_choice_score*
                                        detailFrom.multi_choice_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空--%>
                                <div style="width: 80%;" v-else>
                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、多选题（每题{{detailFrom.multi_choice_score}}分*
                                        {{detailFrom.multi_choice_num}}={{detailFrom.multi_choice_score*
                                        detailFrom.multi_choice_num}}分）;
                                    </div>
                                </div>

                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperMultiList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.multi_choice_content" ></span>
                                            <span></span>
                                        </td>
                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            A、<span v-html="record.multi_choice_a" />
                                        </td>

                                        <td width="50%">
                                            B、<span v-html="record.multi_choice_b" />
                                        </td>

                                    </tr>

                                    <tr align="left">

                                        <td width="50%">
                                            C、<span v-html="record.multi_choice_c" />
                                        </td>

                                        <td width="50%">
                                            D、<span v-html="record.multi_choice_d" />
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /多选题 -----------------%>

                            <%-----------------   判断题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.judge !== ''"
                            >
                                <%--单选题、多选题不为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose !== '' && detailFrom.multi_choice !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、判断题（每题{{detailFrom.judge_score}}分*
                                        {{detailFrom.judge_num}}={{detailFrom.judge_score*
                                        detailFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空、多选题不为空 或者 单选题不为空，多选题为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                      && detailFrom.multi_choice !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、判断题（每题{{detailFrom.judge_score}}分*
                                        {{detailFrom.judge_num}}={{detailFrom.judge_score*
                                        detailFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空、多选题为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === '' && detailFrom.multi_choice === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、判断题（每题{{detailFrom.judge_score}}分*
                                        {{detailFrom.judge_num}}={{detailFrom.judge_score*
                                        detailFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperJudgeList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length + paperMultiList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.judge_content" ></span>
                                        </td>
                                        <td align="right">(&nbsp&nbsp&nbsp)</td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /判断题 -----------------%>

                            <%-----------------   填空题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.blanks_test !== ''"
                            >
                                <%--单选题、多选题、判断题不为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose !== ''
                                     && detailFrom.multi_choice !== ''
                                     && detailFrom.judge !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        四、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%-- 前三者有一个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice === ''
                                      && detailFrom.judge !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%-- 前三者有两个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%--单选题、多选题、判断题为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                 && detailFrom.multi_choice === ''
                                 && detailFrom.judge === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>


                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperBlanksList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length
                                            + paperMultiList.length + paperJudgeList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.question_content" ></span>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /填空题 -----------------%>

                            <%-----------------   问答题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.question !== ''"
                            >
                                <%-- 四者都不为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose !== ''
                                     && detailFrom.multi_choice !== ''
                                     && detailFrom.judge !== ''
                                     && detailFrom.blanks_test !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        五、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有一个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge !== ''
                                      && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice === ''
                                      && detailFrom.judge !== ''
                                      && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge === ''
                                      && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge !== ''
                                      && detailFrom.blanks_test === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        四、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有两个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有三个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者都为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                 && detailFrom.multi_choice === ''
                                 && detailFrom.judge === ''
                                 && detailFrom.blanks_test === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>


                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperQuestionList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length
                                            + paperMultiList.length + paperJudgeList.length
                                            + paperBlanksList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.question_content" ></span>
                                        </td>
                                    </tr>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </table>

                            </div>
                            <%-----------------   /问答题 -----------------%>



                            <div width="100%" style="position: relative; float: right; margin: 10px 0;">
                                <el-button type="primary" @click="_seeAnswer">查看答案</el-button>
                                <el-button type="primary" @click="_createWord" v-if="detailFrom.is_online == 0">
                                    生成文档
                                </el-button>
                                <el-button type="danger" @click="detailDialogVisible=false">关闭</el-button>
                            </div>


                        </el-dialog>
                    </div>


                    <%--答案页面--%>
                    <div class="detail-dialog">
                        <el-dialog title="试卷答案" :visible.sync="answerDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="26em"
                                   fullscreen="true">

                            <table style="width: 80%; margin: 0 auto;">
                                <caption style="text-align:center;font-size:24px; height: 60px">{{detailFrom.test_name}}</caption>

                                <tr height="40px" align="center">
                                    <td width="50%">
                                        考试类型：<span v-if="detailFrom.test_type == 1">正常考试</span>
                                        <span v-else>补考</span>
                                    </td>

                                    <td width="50%">
                                        考试时间：{{detailFrom.test_start_time | formatDate}}
                                        -- {{detailFrom.test_end_time | formatDate}}
                                    </td>

                                </tr>

                                <tr height="40px" align="center">
                                    <td width="50%">
                                        考试地点：{{ detailFrom.test_address }}
                                    </td>

                                    <td width="50%">
                                        考试总分：{{ detailFrom.total_score }}
                                    </td>

                                </tr>
                            </table>

                            <%-----------------   单选题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.single_choose !== ''"
                            >
                                <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                    一、单选题（每题{{detailFrom.single_choose_score}}分*
                                    {{detailFrom.single_choose_num}}={{detailFrom.single_choose_score*
                                    detailFrom.single_choose_num}}分）;
                                </div>

                                <table style="width: 80%;" v-for="(record, index) in paperSingleList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            <span style="color: red">({{record.answer}})</span>
                                            {{index + 1}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.choose_content" ></span>
                                            <span></span>
                                        </td>
                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            A、<span v-html="record.single_choose_a" />
                                        </td>

                                        <td width="50%">
                                            B、<span v-html="record.single_choose_b" />
                                        </td>

                                    </tr>

                                    <tr align="left">

                                        <td width="50%">
                                            C、<span v-html="record.single_choose_c" />
                                        </td>

                                        <td width="50%">
                                            D、<span v-html="record.single_choose_d" />
                                        </td>

                                    </tr>

                                </table>

                            </div>
                            <%-----------------   /单选题 -----------------%>

                            <%-----------------   多选题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.multi_choice !== ''"
                            >
                                <%--单选题不为空--%>
                                <div style="width: 80%;" v-if="detailFrom.single_choose !== ''">
                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、多选题（每题{{detailFrom.multi_choice_score}}分*
                                        {{detailFrom.multi_choice_num}}={{detailFrom.multi_choice_score*
                                        detailFrom.multi_choice_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空--%>
                                <div style="width: 80%;" v-else>
                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、多选题（每题{{detailFrom.multi_choice_score}}分*
                                        {{detailFrom.multi_choice_num}}={{detailFrom.multi_choice_score*
                                        detailFrom.multi_choice_num}}分）;
                                    </div>
                                </div>

                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperMultiList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            <span style="color: red">({{record.answer}})</span>
                                            {{index + 1 + paperSingleList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.multi_choice_content" ></span>
                                            <span></span>
                                        </td>
                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            A、<span v-html="record.multi_choice_a" />
                                        </td>

                                        <td width="50%">
                                            B、<span v-html="record.multi_choice_b" />
                                        </td>

                                    </tr>

                                    <tr align="left">

                                        <td width="50%">
                                            C、<span v-html="record.multi_choice_c" />
                                        </td>

                                        <td width="50%">
                                            D、<span v-html="record.multi_choice_d" />
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /多选题 -----------------%>

                            <%-----------------   判断题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.judge !== ''"
                            >
                                <%--单选题、多选题不为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose !== '' && detailFrom.multi_choice !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、判断题（每题{{detailFrom.judge_score}}分*
                                        {{detailFrom.judge_num}}={{detailFrom.judge_score*
                                        detailFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空、多选题不为空 或者 单选题不为空，多选题为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                      && detailFrom.multi_choice !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、判断题（每题{{detailFrom.judge_score}}分*
                                        {{detailFrom.judge_num}}={{detailFrom.judge_score*
                                        detailFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空、多选题为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === '' && detailFrom.multi_choice === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、判断题（每题{{detailFrom.judge_score}}分*
                                        {{detailFrom.judge_num}}={{detailFrom.judge_score*
                                        detailFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperJudgeList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length + paperMultiList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.judge_content" ></span>
                                        </td>
                                        <td align="right" style="color: red">(&nbsp&nbsp {{record.answer | changeAns }} &nbsp&nbsp)</td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /判断题 -----------------%>

                            <%-----------------   填空题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.blanks_test !== ''"
                            >
                                <%--单选题、多选题、判断题不为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose !== ''
                                     && detailFrom.multi_choice !== ''
                                     && detailFrom.judge !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        四、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%-- 前三者有一个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice === ''
                                      && detailFrom.judge !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%-- 前三者有两个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%--单选题、多选题、判断题为空--%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                 && detailFrom.multi_choice === ''
                                 && detailFrom.judge === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、填空题（每题{{detailFrom.blanks_test_score}}分*
                                        {{detailFrom.blanks_test_num}}={{detailFrom.blanks_test_score*
                                        detailFrom.blanks_test_num}}分）;
                                    </div>
                                </div>


                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperBlanksList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length
                                            + paperMultiList.length + paperJudgeList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.question_content" ></span>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /填空题 -----------------%>

                            <%-----------------   问答题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="detailFrom.question !== ''"
                            >
                                <%-- 四者都不为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose !== ''
                                     && detailFrom.multi_choice !== ''
                                     && detailFrom.judge !== ''
                                     && detailFrom.blanks_test !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        五、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有一个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge !== ''
                                      && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice === ''
                                      && detailFrom.judge !== ''
                                      && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge === ''
                                      && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                      && detailFrom.multi_choice !== ''
                                      && detailFrom.judge !== ''
                                      && detailFrom.blanks_test === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        四、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有两个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有三个为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test !== '' || detailFrom.single_choose !== ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice === ''
                                  && detailFrom.judge !== ''
                                  && detailFrom.blanks_test === '' || detailFrom.single_choose === ''
                                  && detailFrom.multi_choice !== ''
                                  && detailFrom.judge === ''
                                  && detailFrom.blanks_test === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者都为空 --%>
                                <div style="width: 80%;"
                                     v-if="detailFrom.single_choose === ''
                                 && detailFrom.multi_choice === ''
                                 && detailFrom.judge === ''
                                 && detailFrom.blanks_test === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、问答题（每题{{detailFrom.question_score}}分*
                                        {{detailFrom.question_num}}={{detailFrom.question_score*
                                        detailFrom.question_num}}分）;
                                    </div>
                                </div>


                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperQuestionList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length
                                            + paperMultiList.length + paperJudgeList.length
                                            + paperBlanksList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.question_content" >
                                            </span>
                                        </td>
                                    </tr>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </table>

                            </div>
                            <%-----------------   /问答题 -----------------%>





                            <div width="100%" style="position: relative; float: right; margin: 10px 0;">
                                <el-button type="danger" @click="answerDialogVisible=false">关闭</el-button>
                            </div>


                        </el-dialog>
                    </div>


                    <%--修改试卷页面--%>
                    <div class="editPaper-dialog">
                        <el-dialog title="修改试卷题目" :visible.sync="editPaperDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="26em"
                                   fullscreen="true">

                            <table style="width: 80%; margin: 0 auto;">
                                <caption style="text-align:center;font-size:24px; height: 60px">{{editFrom.test_name}}</caption>

                                <tr height="40px" align="center">
                                    <td width="50%">
                                        考试类型：<span v-if="editFrom.test_type == 1">正常考试</span>
                                        <span v-else>补考</span>
                                    </td>

                                    <td width="50%">
                                        考试时间：{{editFrom.test_start_time | formatDate}}
                                        -- {{editFrom.test_end_time | formatDate}}
                                    </td>

                                </tr>

                                <tr height="40px" align="center">
                                    <td width="50%">
                                        考试地点：{{ editFrom.test_address }}
                                    </td>

                                    <td width="50%">
                                        考试总分：{{ editFrom.total_score }}
                                    </td>

                                </tr>
                            </table>



                            <%-----------------   单选题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="editFrom.single_choose !== ''"
                            >
                                <div style="font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                    一、单选题（每题{{editFrom.single_choose_score}}分*
                                    {{editFrom.single_choose_num}}={{editFrom.single_choose_score*
                                    editFrom.single_choose_num}}分）;
                                </div>

                                <div style="width: 80%; margin: 20px 0px;">
                                    <div class="list-operation">
                                        <el-button class="operation-editable" type="primary" @click="_editAdd('single')">添加</el-button>
                                        <el-button class="operation-editable" type="primary" @click="_editDelete('single')">删除</el-button>
                                    </div>
                                </div>

                                <table style="width: 80%;"
                                       v-for="(record, index) in paperSingleList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            <el-checkbox size="medium" :true-label="record.single_choose_id"
                                                         v-model="single_id_list[index]"></el-checkbox>
                                            {{index + 1}}、
                                            <span style="font-size: 16px; font-weight: bold"
                                                  v-html="record.choose_content" >
                                        </span>
                                        </td>
                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            A、<span v-html="record.single_choose_a" />
                                        </td>
                                        <td width="50%">
                                            B、<span v-html="record.single_choose_b" />
                                        </td>

                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            C、<span v-html="record.single_choose_c" />
                                        </td>
                                        <td width="50%">
                                            D、<span v-html="record.single_choose_d" />
                                        </td>

                                    </tr>

                                </table>

                            </div>
                            <%-----------------   /单选题 -----------------%>

                            <%-----------------   多选题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="editFrom.multi_choice !== ''"
                            >
                                <%--单选题不为空--%>
                                <div style="width: 80%;" v-if="editFrom.single_choose !== ''">
                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、多选题（每题{{editFrom.multi_choice_score}}分*
                                        {{editFrom.multi_choice_num}}={{editFrom.multi_choice_score*
                                        editFrom.multi_choice_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空--%>
                                <div style="width: 80%;" v-else>
                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、多选题（每题{{editFrom.multi_choice_score}}分*
                                        {{editFrom.multi_choice_num}}={{editFrom.multi_choice_score*
                                        editFrom.multi_choice_num}}分）;
                                    </div>
                                </div>

                                <div style="width: 80%; margin: 20px 0px;">
                                    <div class="list-operation">
                                        <el-button class="operation-editable" type="primary" @click="_editAdd('multi')">添加</el-button>
                                        <el-button class="operation-editable" type="primary" @click="_editDelete('multi')">删除</el-button>
                                    </div>
                                </div>

                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperMultiList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            <el-checkbox size="medium" :true-label="record.multi_choice_id"
                                                         v-model="multi_id_list[index]"></el-checkbox>
                                            {{index + 1 + paperSingleList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.multi_choice_content" ></span>
                                            <span></span>
                                        </td>
                                    </tr>

                                    <tr align="left">
                                        <td width="50%">
                                            A、<span v-html="record.multi_choice_a" />
                                        </td>

                                        <td width="50%">
                                            B、<span v-html="record.multi_choice_b" />
                                        </td>

                                    </tr>

                                    <tr align="left">

                                        <td width="50%">
                                            C、<span v-html="record.multi_choice_c" />
                                        </td>

                                        <td width="50%">
                                            D、<span v-html="record.multi_choice_d" />
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /多选题 -----------------%>

                            <%-----------------   判断题 -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="editFrom.judge !== ''"
                            >
                                <%--单选题、多选题不为空--%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose !== '' && editFrom.multi_choice !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、判断题（每题{{editFrom.judge_score}}分*
                                        {{editFrom.judge_num}}={{editFrom.judge_score*
                                        editFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空、多选题不为空 或者 单选题不为空，多选题为空--%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                      && editFrom.multi_choice !== '' || editFrom.single_choose !== ''
                                      && editFrom.multi_choice === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、判断题（每题{{editFrom.judge_score}}分*
                                        {{editFrom.judge_num}}={{editFrom.judge_score*
                                        editFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <%--单选题为空、多选题为空--%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === '' && editFrom.multi_choice === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、判断题（每题{{editFrom.judge_score}}分*
                                        {{editFrom.judge_num}}={{editFrom.judge_score*
                                        editFrom.judge_num}}分）;
                                    </div>
                                </div>

                                <div style="width: 80%; margin: 20px 0px;">
                                    <div class="list-operation">
                                        <el-button class="operation-editable" type="primary" @click="_editAdd('judge')">添加</el-button>
                                        <el-button class="operation-editable" type="primary" @click="_editDelete('judge')">删除</el-button>
                                    </div>
                                </div>

                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperJudgeList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            <el-checkbox size="medium" :true-label="record.judge_id"
                                                         v-model="judge_id_list[index]"></el-checkbox>
                                            {{index + 1 + paperSingleList.length + paperMultiList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.judge_content" ></span>
                                        </td>
                                        <td align="right">(&nbsp&nbsp&nbsp)</td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /判断题 -----------------%>

                            <%-----------------   填空题(待修改) -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="editFrom.blanks_test !== ''"
                            >
                                <%--单选题、多选题、判断题不为空--%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose !== ''
                                     && editFrom.multi_choice !== ''
                                     && editFrom.judge !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        四、填空题（每题{{editFrom.blanks_test_score}}分*
                                        {{editFrom.blanks_test_num}}={{editFrom.blanks_test_score*
                                        editFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%-- 前三者有一个为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                      && editFrom.multi_choice !== ''
                                      && editFrom.judge !== '' || editFrom.single_choose !== ''
                                      && editFrom.multi_choice === ''
                                      && editFrom.judge !== '' || editFrom.single_choose !== ''
                                      && editFrom.multi_choice !== ''
                                      && editFrom.judge === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、填空题（每题{{editFrom.blanks_test_score}}分*
                                        {{editFrom.blanks_test_num}}={{editFrom.blanks_test_score*
                                        editFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%-- 前三者有两个为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge !== '' || editFrom.single_choose !== ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge === '' || editFrom.single_choose === ''
                                  && editFrom.multi_choice !== ''
                                  && editFrom.judge === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、填空题（每题{{editFrom.blanks_test_score}}分*
                                        {{editFrom.blanks_test_num}}={{editFrom.blanks_test_score*
                                        editFrom.blanks_test_num}}分）;
                                    </div>
                                </div>

                                <%--单选题、多选题、判断题为空--%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                 && editFrom.multi_choice === ''
                                 && editFrom.judge === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、填空题（每题{{editFrom.blanks_test_score}}分*
                                        {{editFrom.blanks_test_num}}={{editFrom.blanks_test_score*
                                        editFrom.blanks_test_num}}分）;
                                    </div>
                                </div>


                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperBlanksList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length
                                            + paperMultiList.length + paperJudgeList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.question_content" ></span>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                            <%-----------------   /填空题 -----------------%>

                            <%-----------------   问答题(待修改) -----------------%>
                            <div style="width: 80%; margin: 10px auto;"
                                 v-if="editFrom.question !== ''"
                            >
                                <%-- 四者都不为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose !== ''
                                     && editFrom.multi_choice !== ''
                                     && editFrom.judge !== ''
                                     && editFrom.blanks_test !== '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        五、问答题（每题{{editFrom.question_score}}分*
                                        {{editFrom.question_num}}={{editFrom.question_score*
                                        editFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有一个为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                      && editFrom.multi_choice !== ''
                                      && editFrom.judge !== ''
                                      && editFrom.blanks_test !== '' || editFrom.single_choose !== ''
                                      && editFrom.multi_choice === ''
                                      && editFrom.judge !== ''
                                      && editFrom.blanks_test !== '' || editFrom.single_choose !== ''
                                      && editFrom.multi_choice !== ''
                                      && editFrom.judge === ''
                                      && editFrom.blanks_test !== '' || editFrom.single_choose !== ''
                                      && editFrom.multi_choice !== ''
                                      && editFrom.judge !== ''
                                      && editFrom.blanks_test === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        四、问答题（每题{{editFrom.question_score}}分*
                                        {{editFrom.question_num}}={{editFrom.question_score*
                                        editFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有两个为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge !== ''
                                  && editFrom.blanks_test !== '' || editFrom.single_choose === ''
                                  && editFrom.multi_choice !== ''
                                  && editFrom.judge === ''
                                  && editFrom.blanks_test !== '' || editFrom.single_choose === ''
                                  && editFrom.multi_choice !== ''
                                  && editFrom.judge !== ''
                                  && editFrom.blanks_test === '' || editFrom.single_choose !== ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge === ''
                                  && editFrom.blanks_test !== '' || editFrom.single_choose !== ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge !== ''
                                  && editFrom.blanks_test === '' || editFrom.single_choose !== ''
                                  && editFrom.multi_choice !== ''
                                  && editFrom.judge === ''
                                  && editFrom.blanks_test === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        三、问答题（每题{{editFrom.question_score}}分*
                                        {{editFrom.question_num}}={{editFrom.question_score*
                                        editFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者有三个为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge === ''
                                  && editFrom.blanks_test !== '' || editFrom.single_choose !== ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge === ''
                                  && editFrom.blanks_test === '' || editFrom.single_choose === ''
                                  && editFrom.multi_choice === ''
                                  && editFrom.judge !== ''
                                  && editFrom.blanks_test === '' || editFrom.single_choose === ''
                                  && editFrom.multi_choice !== ''
                                  && editFrom.judge === ''
                                  && editFrom.blanks_test === ''">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        二、问答题（每题{{editFrom.question_score}}分*
                                        {{editFrom.question_num}}={{editFrom.question_score*
                                        editFrom.question_num}}分）;
                                    </div>
                                </div>

                                <%-- 四者都为空 --%>
                                <div style="width: 80%;"
                                     v-if="editFrom.single_choose === ''
                                 && editFrom.multi_choice === ''
                                 && editFrom.judge === ''
                                 && editFrom.blanks_test === '' ">

                                    <div style="width: 80%; font-size: 22px; font-weight: bold; margin-bottom: 20px; margin-top: 20px;">
                                        一、问答题（每题{{editFrom.question_score}}分*
                                        {{editFrom.question_num}}={{editFrom.question_score*
                                        editFrom.question_num}}分）;
                                    </div>
                                </div>


                                <%-- 题目列表 --%>
                                <table style="width: 80%;" v-for="(record, index) in paperQuestionList">
                                    <tr>
                                        <td colspan="2" style="padding-bottom: 10px; padding-top: 10px;">
                                            {{index + 1 + paperSingleList.length
                                            + paperMultiList.length + paperJudgeList.length
                                            + paperBlanksList.length}}、
                                            <span style="font-size: 16px;"
                                                  v-html="record.question_content" ></span>
                                        </td>
                                    </tr>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                </table>

                            </div>
                            <%-----------------   /问答题 -----------------%>


                            <div width="100%" style="position: relative; float: right; margin: 10px 0;">
                                <el-button type="primary" @click="_submitEditPaper">保存</el-button>
                                <el-button type="danger" @click="editPaperDialogVisible=false">关闭</el-button>
                            </div>


                        </el-dialog>
                    </div>


                    <%--添加单选题试题--%>
                    <div class="editAddPaper-dialog">
                        <el-dialog title="添加试题" :visible.sync="editAddDialogVisible" :modal="false" width="80em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                        >
                            <el-row>
                                <el-col :span="8" :offset="7">
                                    <label style="font-size: 16px;">{{editAddFrom.filterName}}：</label>
                                    <el-input clearable placeholder="请输入题干" v-model="editAddFrom.title"></el-input>
                                </el-col>
                                <el-button type="primary" @click="_editAddFilter">查询</el-button>
                            </el-row>

                            <div class="section">
                                <div class="list-table">

                                    <table v-if="editAddFrom.type === 'single'">
                                        <tr>
                                            <th width="5%">
                                                <div>
                                                    <span>#</span>
                                                </div>
                                            </th>
                                            <th width="5%">
                                                <div>
                                                    <span>题号</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>培训类型</span>
                                                </div>
                                            </th>
                                            <th width="40%">
                                                <div>
                                                    <span>单选题题干</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项A</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项B</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项C</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项D</span>
                                                </div>
                                            </th>
                                        </tr>

                                        <tr v-for="(record,index) in editAddFrom.list" :id="record.single_choose_id" align="center">
                                            <td>
                                                <el-checkbox size="medium" :true-label="record.single_choose_id"
                                                             v-model="id_list[index]"></el-checkbox>
                                            </td>
                                            <td :title="record.single_choose_id">{{record.single_choose_id}}</td>
                                            <td :title="editFrom.edu_category_name">{{editFrom.edu_category_name}}</td>

                                            <td :title="record.choose_content | delHtmlTag">{{record.choose_content | delHtmlTag}}</td>
                                            <td :title="record.single_choose_a | delHtmlTag">{{record.single_choose_a | delHtmlTag}}</td>
                                            <td :title="record.single_choose_b | delHtmlTag">{{record.single_choose_b | delHtmlTag}}</td>

                                            <td :title="record.single_choose_c | delHtmlTag">{{record.single_choose_c | delHtmlTag}}</td>
                                            <td :title="record.single_choose_d | delHtmlTag">{{record.single_choose_d | delHtmlTag}}</td>
                                        </tr>

                                    </table>

                                    <table v-if="editAddFrom.type === 'multi'">
                                        <tr>
                                            <th width="5%">
                                                <div>
                                                    <span>#</span>
                                                </div>
                                            </th>
                                            <th width="5%">
                                                <div>
                                                    <span>题号</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>培训类型</span>
                                                </div>
                                            </th>
                                            <th width="40%">
                                                <div>
                                                    <span>多选题题干</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项A</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项B</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项C</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>选择项D</span>
                                                </div>
                                            </th>
                                        </tr>

                                        <tr v-for="(record,index) in editAddFrom.list" :id="record.multi_choice_id" align="center">
                                            <td>
                                                <el-checkbox size="medium" :true-label="record.multi_choice_id"
                                                             v-model="id_list[index]"></el-checkbox>
                                            </td>
                                            <td :title="record.multi_choice_id">{{record.multi_choice_id}}</td>
                                            <td :title="editFrom.edu_category_name">{{editFrom.edu_category_name}}</td>

                                            <td :title="record.multi_choice_content | delHtmlTag">{{record.multi_choice_content | delHtmlTag}}</td>
                                            <td :title="record.multi_choice_a | delHtmlTag">{{record.multi_choice_a | delHtmlTag}}</td>
                                            <td :title="record.multi_choice_b | delHtmlTag">{{record.multi_choice_b | delHtmlTag}}</td>

                                            <td :title="record.multi_choice_c | delHtmlTag">{{record.multi_choice_c | delHtmlTag}}</td>
                                            <td :title="record.multi_choice_d | delHtmlTag">{{record.multi_choice_d | delHtmlTag}}</td>
                                        </tr>

                                    </table>

                                    <table v-if="editAddFrom.type === 'judge'">
                                        <tr>
                                            <th width="5%">
                                                <div>
                                                    <span>#</span>
                                                </div>
                                            </th>
                                            <th width="5%">
                                                <div>
                                                    <span>题号</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>培训类型</span>
                                                </div>
                                            </th>
                                            <th width="70%">
                                                <div>
                                                    <span>判断题题干</span>
                                                </div>
                                            </th>
                                            <th width="10%">
                                                <div>
                                                    <span>答案</span>
                                                </div>
                                            </th>
                                        </tr>

                                        <tr v-for="(record,index) in editAddFrom.list" :id="record.judge_id" align="center">
                                            <td>
                                                <el-checkbox size="medium" :true-label="record.judge_id"
                                                             v-model="id_list[index]"></el-checkbox>
                                            </td>
                                            <td :title="record.judge_id">{{record.judge_id}}</td>
                                            <td :title="editFrom.edu_category_name">{{editFrom.edu_category_name}}</td>

                                            <td :title="record.judge_content | delHtmlTag">{{record.judge_content | delHtmlTag}}</td>
                                            <td :title="record.answer | changeAns">{{record.answer | changeAns}}</td>
                                        </tr>

                                    </table>



                                </div>
                            </div>

                            <div class="section">
                                <div class="list-pagination">
                                    <el-pagination
                                            v-if="editAddFrom.pagenum > 0"
                                            background
                                            page-size="5"
                                            layout="prev, pager, next"
                                            @current-change="getSingleList"
                                            :current-page="editAddFrom.pageindex"
                                            :total="editAddFrom.pagenum*5">
                                    </el-pagination>
                                    <div class="list-hint" v-else>提示：列表中无数据</div>
                                </div>
                            </div>

                            <el-row>
                                <el-col :span="24">
                                    <div>
                                        <el-input style="width: 100%;" readonly v-model="editAddFrom.added">
                                            <template slot="prepend">已添加题号：</template>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>

                            <div slot="footer" class="dialog-footer" v-if="editAddFrom.type === 'single'">
                                <el-button type="primary" @click="_editAddTest('single')">添加</el-button>
                                <el-button type="primary" @click="_editSaveTest('single')">保存</el-button>
                                <el-button type="danger" @click="editAddDialogVisible=false;clearObj('editAddFrom')">关闭</el-button>
                            </div>

                            <div slot="footer" class="dialog-footer" v-if="editAddFrom.type === 'multi'">
                                <el-button type="primary" @click="_editAddTest('multi')">添加</el-button>
                                <el-button type="primary" @click="_editSaveTest('multi')">保存</el-button>
                                <el-button type="danger" @click="editAddDialogVisible=false;clearObj('editAddFrom')">关闭</el-button>
                            </div>

                            <div slot="footer" class="dialog-footer" v-if="editAddFrom.type === 'judge'">
                                <el-button type="primary" @click="_editAddTest('judge')">添加</el-button>
                                <el-button type="primary" @click="_editSaveTest('judge')">保存</el-button>
                                <el-button type="danger" @click="editAddDialogVisible=false;clearObj('editAddFrom')">关闭</el-button>
                            </div>

                        </el-dialog>
                    </div>


                </div>

            </div>

        </div>

    </el-container>
</div>
</body>
</html>

<script>
    import Table from "../Scripts/iview-3.x/iview";
    export default {
        components: {Table}
    }
</script>