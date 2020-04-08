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
    <script type="text/javascript" src='js/EduSourceManage.js?<%=Math.random()%>'></script>
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
                <el-breadcrumb-item>培训资源类型管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>

        <div class="wrapper">
            <div class="content" v-loading="tableLoading" v-cloak>

                <%--查询--%>
                <div class="section">
                    <div class="list-filter">
                        <el-row style="margin-bottom: 15px">

                            <%--类型名称 查询--%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="7">
                                    {{params[0].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-input v-model="params[0].value" clearable placeholder="请输入类型名称"></el-input>
                                </el-col>
                            </el-col>

                            <%--创建时间 查询   --%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[1].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-date-picker
                                            v-model="params[1].value"
                                            type="daterange"
                                            clearable
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-col>
                            </el-col>

                            <%--是否弃用 查询   --%>
                            <el-col :span="7">
                                <el-col class="filter-label" :span="6">
                                    {{params[2].label}}
                                </el-col>
                                <el-col :span="16">
                                    <el-select v-model="params[2].value" filterable clearable placeholder="请选择">
                                        <el-option v-for="record in deletedList"
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
                                <th width="30%">
                                    <div>
                                        <span>培训类型名称</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>培训类型图标</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>删除否</span>
                                    </div>
                                </th>
                                <th width="20%">
                                    <div>
                                        <span>创建时间</span>
                                    </div>
                                </th>
                                <th width="15%">
                                    <div>
                                        <span>操作</span>
                                    </div>
                                </th>
                            </tr>

                            <tr v-for="(record,index) in unDeletedList" :id="record.edu_category_id" align="center">
                                <td>
                                    <el-checkbox size="medium" :true-label="record.edu_category_id"
                                                 v-model="id_list[index]"></el-checkbox>
                                </td>

                                <td :title="record.edu_category_name">{{record.edu_category_name}}</td>
                                <td :title="record.logo"><img :src="record.logo" width="28px" height="28px"/></td>
                                <td :title="record.deleted">{{record.deleted | formatDel }}</td>
                                <td :title="record.creat_time">{{record.creat_time | formatDate}}</td>

                                <td>
                                    <el-button class="operation-editable" type="text" @click="_edit(record.edu_category_id);closeFrom('editFrom')">修改</el-button>
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
                        <el-dialog title="添加培训资源类型" :visible.sync="addDialogVisible" :modal="false" width="26em"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                            <el-form label-position="right"  :model="addFrom"
                                     ref="addFrom" :rules="rules">
                                <el-row>
                                    <el-col :span="24">

                                        <el-form-item label="培训类型名称：" prop="edu_category_name" size="small">
                                            <el-input type="input"
                                                      v-model="addFrom.edu_category_name"
                                                      clearable
                                                      placeholder="请输入培训类型名称">
                                            </el-input>
                                        </el-form-item>

                                        <el-form-item label="培训类型图标：" prop="logo" size="small">
                                            <el-upload
                                                    ref="my-upload"
                                                    class="avatar-uploader"
                                                    action="uploadLogo"
                                                    list-type="picture"
                                                    :on-success="handleAvatarSuccess"
                                                    limit="1"
                                            >
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_add">添加</el-button>
                                <el-button @click="resetForm('addFrom')">重置</el-button>
                                <el-button type="danger" @click="addDialogVisible=false;closeFrom('addFrom')">关闭</el-button>
                            </div>
                        </el-dialog>
                    </div>


                    <%--修改页面--%>
                    <div class="edit-dialog">
                        <el-dialog title="修改培训资源类型" :visible.sync="editDialogVisible" :modal="false"
                                   :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="26em">
                            <el-form label-position="right" :model="editFrom" ref="editFrom"
                                     :rules="rules" class="">
                                <el-row>
                                    <el-col :span="24">

                                        <el-form-item label="培训类型名称：" prop="edu_category_name" size="small">
                                            <el-input type="input"
                                                      v-model="editFrom.edu_category_name"
                                                      clearable
                                                      placeholder="请输入培训类型名称">
                                            </el-input>
                                        </el-form-item>

                                        <el-form-item label="删除否：" prop="deleted" size="small">
                                            <el-select v-model="editFrom.deleted" filterable clearable placeholder="请选择">
                                                <el-option v-for="record in deletedList"
                                                           :value="record.key"
                                                           :label="record.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>

                                        <el-form-item label="培训类型图标：" prop="logo" size="small">
                                            <el-upload
                                                    ref="my-upload"
                                                    class="avatar-uploader"
                                                    action="uploadLogo"
                                                    list-type="picture"
                                                    :file-list="fileList"
                                                    :on-success="editHandleAvatarSuccess"
                                                    limit="1"
                                            >
                                                <el-button size="small" type="primary">点击上传</el-button>
                                            </el-upload>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                            </el-form>

                            <div slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="_submitEdit">保存</el-button>
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
</body>
</html>

