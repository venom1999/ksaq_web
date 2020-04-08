<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

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

    <script type="text/javascript" src="<%=request.getContextPath()%>/Scripts/videojs/video.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/Scripts/magnify/js/jquery.magnify.js"></script>
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/Scripts/videojs/video-js.css"/>
    <script type="text/javascript" src='js/TestJudge.js?<%=Math.random()%>'></script>

    <script type="text/javascript" src="<%=request.getContextPath()%>/static/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/ueditor/ueditor.all.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/ueditor/lang/zh-cn/zh-cn.js"></script>

    <%--数学公式插件--%>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/ueditor/kityformula-plugin/addKityFormulaDialog.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/ueditor/kityformula-plugin/getKfContent.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/static/ueditor/kityformula-plugin/defaultFilterFix.js"></script>
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

        /*单选按钮样式*/
        .el-radio__inner {
            margin-left: -100px;
            margin-top: 9px;
        }

        .chooseContent {
            width: 610px;
        }

        .choose {
            margin-top: -2px;
        }

        .detailChoose {
            margin-top: -22px;
            width: 610px;
        }

        .previewChoose {
            margin-top: -38px;
            width: 610px;
        }

        .previewChooseT {
            margin-top: -14px;
            width: 610px;
        }

        .el-radio__label {
            display: none;
        }


    </style>


</head>

<body class="right_wap">
<div style='display: none'>
    <input id="path" value="TestChoose"/>
    <input id="tablename" value="Test_choose"/>
    <input id="idname" value="ChooseID"/>
</div>

<div id="right">
    <el-container>
        <el-header height="48px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>判断题管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>


        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>

                <%--查询--%>
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">

                            <%--培训类型 查询--%>
                            <el-col :span="10">
                                <el-col class="filter-label" :span="7">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[0].value"
                                               filterable
                                               clearable
                                               placeholder="请选择"
                                               @change="getPoint"
                                    >
                                        <el-option
                                            v-for="item in eduCateList"
                                            :key="item.edu_category_name"
                                            :label="item.edu_category_name"
                                            :value="item.edu_category_name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-col>


                            <%--题干 查询   --%>
                            <el-col :span="10">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[2].value" clearable placeholder="请输入题干"></el-input>
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
                        <el-button type="primary" @click="_import">批量</el-button>
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
                                <th width="5%">
                                    <div>
                                        <span>序号</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>培训类型</span>
                                    </div>
                                </th>
                                <th width="50%">
                                    <div>
                                        <span>判断题题干</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>答案</span>
                                    </div>
                                </th>
                                <th width="10%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>

                            <tr v-for="(record,index) in unDeletedList" :id="record.judge_id" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.judge_id"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>
                                <td :title="text_num">{{text_num + index}}</td>
                                <td :title="record.edu_category_name">{{record.edu_category_name}}</td>

                                <td :title="record.judge_content | delHtmlTag">{{record.judge_content | delHtmlTag}}</td>
                                <td :title="record.answer | changeAns">{{record.answer | changeAns}}</td>
                                <td>
                                    <el-button type="text" @click="detailDialogVisible=true;_detail(record.judge_id)">详细</el-button>
                                    <el-button class="operation-editable" type="text" @click="_edit(record.judge_id);closeFrom('editFrom')">修改</el-button>
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
                        <el-dialog title="添加判断题" :visible.sync="addDialogVisible" :modal="false" width="68em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                        >
                            <el-form label-position="right"  :model="addFrom"
                                     ref="addFrom" :rules="rules">
                                <el-row>
                                    <el-col :span="8" :offset="2">
                                        <el-form-item label="培训分类：" prop="edu_category_id" size="small">
                                            <el-select v-model="addFrom.edu_category_id"
                                                       filterable
                                                       clearable
                                                       placeholder="请选择"
                                                       @change="getPoint"
                                            >
                                                <el-option
                                                        v-for="item in eduCateList"
                                                        :key="item.edu_category_name"
                                                        :label="item.edu_category_name"
                                                        :value="item.edu_category_id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8" :offset="3">
                                        <el-form-item label="答案：" prop="answer" size="small">
                                            <el-select v-model="addFrom.answer"
                                                       filterable
                                                       clearable
                                                       placeholder="请选择"
                                            >
                                                <el-option
                                                        v-for="item in answerList"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="24" :offset="2">
                                        <el-form-item label="判断题题干：" prop="judge_content" size="small">
                                            <!-- 加载编辑器的容器 -->
                                            <script id='chooseContent' v-model='addFrom.judge_content' type='text/plain'>
                                            </script>
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="24" :offset="2">
                                        <el-form-item label="答案解析：" prop="explanation" size="small">
                                            <!-- 加载编辑器的容器 -->
                                            <script id='explanation' v-model='addFrom.explanation' type='text/plain'>
                                            </script>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_preview">预览</el-button>
                                <el-button type="primary" @click="_add">添加</el-button>
                                <el-button @click="resetForm('addFrom')">重置</el-button>
                                <el-button type="danger" @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <%--预览页面--%>
                    <div class="preview-dialog">
                        <el-dialog title="预览判断题详细信息" :visible.sync="previewDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="68em">
                            <el-form label-position="right" :model="previewFrom" ref="previewFrom"
                                     :rules="rules" class="">
                                <el-row>

                                    <el-col :span="8" :offset="2">

                                        <el-form-item label="培训分类：" prop="edu_category_id" size="small">
                                            <span>{{addFrom.edu_category_name}}</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8" :offset="3">
                                        <el-form-item label="答案：" prop="answer" size="small">
                                            <span>{{addFrom.answer | changeAns}}</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24" :offset="2">

                                        <el-form-item label="判断题题干：" prop="choose_content" size="small">
                                            <div class="previewChooseT" v-html="addFrom.judge_content"></div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24" :offset="2">

                                        <el-form-item label="答案解析：" prop="explanation" size="small">
                                            <div class="previewChooseT" v-html="addFrom.explanation"></div>
                                        </el-form-item>

                                    </el-col>

                                </el-row>
                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-button
                                        @click="previewDialogVisible=false;closeFrom('previewFrom')"
                                        type="danger">关闭
                                </el-button>

                            </div>

                        </el-dialog>
                    </div>


                    <%--详细页面--%>
                    <div class="detail-dialog">
                        <el-dialog title="查看判断题详细信息" :visible.sync="detailDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
                                   width="66em">
                            <el-form label-position="right" :model="detailFrom" ref="detailFrom"
                                     :rules="rules" class="">
                                <el-row>

                                    <el-col :span="8" :offset="2">

                                        <el-form-item label="培训分类：" prop="edu_category_id" size="small">
                                            <span>{{detailFrom.edu_category_name}}</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8" :offset="3">

                                        <el-form-item label="答案：" prop="answer" size="small">
                                            <span>{{detailFrom.answer | changeAns}}</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24" :offset="2">

                                        <el-form-item label="单选题题干：" prop="judge_content" size="small">
                                            <div class="chooseContent" v-html="detailFrom.judge_content"></div>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24" :offset="2">

                                        <el-form-item label="答案解析：" prop="explanation" size="small">
                                            <div class="chooseContent" v-html="detailFrom.explanation"></div>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-row>
                                    <el-col :span="16" :offset="3">
                                        <el-button type="primary"  :disabled="detailFrom.btnToDisabled0"
                                                   @click="_detail('previous')"
                                                   style="margin-right: 10px;float: left">
                                            上一条
                                        </el-button>
                                        <el-button type="primary" :disabled="detailFrom.btnToDisabled1"
                                                   @click="_detail('next')"
                                                   style="margin-right: 10px;float: left">
                                            下一条
                                        </el-button>

                                        <el-button
                                                @click="detailDialogVisible=false;closeFrom('detailFrom')"
                                                type="danger">关闭
                                        </el-button>
                                    </el-col>

                                </el-row>

                            </div>




                        </el-dialog>
                    </div>


                    <%--修改页面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改判断题信息" :visible.sync="editDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="68em"
                        >
                            <el-form label-position="right" :model="editFrom" ref="editFrom"
                                     :rules="rules" class="">
                                <el-row>

                                    <el-col :span="8" :offset="2">
                                        <el-form-item label="培训分类：" prop="edu_category_id" size="small">
                                            <el-select v-model="editFrom.edu_category_id"
                                                       filterable
                                                       clearable
                                                       placeholder="请选择"
                                                       @change="getPoint"
                                            >
                                                <el-option
                                                        v-for="item in eduCateList"
                                                        :key="item.edu_category_name"
                                                        :label="item.edu_category_name"
                                                        :value="item.edu_category_id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8" :offset="3">
                                        <el-form-item label="答案：" prop="answer" size="small">
                                            <el-select v-model="editFrom.answer"
                                                       filterable
                                                       clearable
                                                       placeholder="请选择"
                                            >
                                                <el-option
                                                        v-for="item in answerList"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24" :offset="2">

                                        <el-form-item label="判断题题干：" prop="judge_content" size="small">
                                            <!-- 加载编辑器的容器 -->
                                            <script id='chooseContentEdit' type='text/plain'>
                                            </script>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="24" :offset="2">

                                        <el-form-item label="答案解析：" prop="explanation" size="small">
                                            <!-- 加载编辑器的容器 -->
                                            <script id='explanationEdit' type='text/plain'>
                                            </script>
                                        </el-form-item>
                                    </el-col>

                                </el-row>


                                </el-row>

                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_submitEdit">保存</el-button>
                                <el-button type="danger" @click="editDialogVisible=false;closeFrom('editFrom')">关闭</el-button>
                            </div>
                        </el-dialog>
                    </div>


                    <%--批量导入界面--%>
                    <div class="import-dialog">
                        <el-dialog title="判断题批量导入" :visible.sync="importDialogVisible" :modal="false" width="26em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form v-loading="dialogLoading" label-position="right"  :model="importFrom"
                                     ref="importFrom" :rules="rules">
                                <el-row>
                                    <el-col :span="24">

                                        <el-form-item label="选择培训类型：" prop="edu_category_name" size="small">
                                            <el-select v-model="importFrom.edu_category_name"
                                                       filterable
                                                       clearable
                                                       placeholder="请选择"
                                            >
                                                <el-option
                                                        v-for="item in eduCateList"
                                                        :key="item.edu_category_name"
                                                        :label="item.edu_category_name"
                                                        :value="item.edu_category_name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="下载模板：" prop="checkPeople" size="small">
                                            <el-button type="primary" @click="download">下载导入模板</el-button>
                                        </el-form-item>

                                        <el-form-item label="上传模板：" prop="file">
                                            <el-upload
                                                    class="upload-demo"
                                                    action="uploadFile"
                                                    :on-preview="handlePreview"
                                                    :on-remove="handleRemove"
                                                    :on-progress="progress"
                                                    :on-success="success"
                                                    multiple="false"
                                                    :limit="1"
                                                    accept=".xls"
                                                    :file-list="fileList2">
                                                <el-button type="primary">&nbsp;&nbsp;&nbsp;&nbsp;点击上传&nbsp;&nbsp;&nbsp;</el-button>
                                            </el-upload>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <div slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="uploadSingleChooseTable">导 入</el-button>
                                    <el-button @click="importDialogVisible=false;importFrom={};" type="danger">关
                                        闭
                                    </el-button>

                                </div>
                            </div>
                        </el-dialog>
                    </div>


                </div>

                <div>

                </div>

            </div>

        </div>

    </el-container>
</div>

</body>
</html>

