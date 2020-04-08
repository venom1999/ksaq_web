<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/9
  Time: 20:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div class="main-content">
    <div class="row">
        <div class="col-md-12 headnav">
            <p>
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 参数管理
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">参数管理</a></span></li>

            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对系统参数（例如预警天数，证书有效期等）的管理操作。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“参数管理”，该模块包括“参数管理”选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><参数管理></span>
                        <p>以记录列表的形式展示系统所有参数信息（例如预警天数，证书有效期等），授权用户可以添加、修改和删除操作，如图1所示。

                        </p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/paraManage/paramain.png" alt="warn">
                            <p>图1 参数管理界面</p>
                        </div>
                        <span>【添加】</span>
                        <p>用于添加参数的相关信息。点击【添加】进入如图2所示的添加界面。依次填入参数编号、参数名称和参数值（其中带*的为必填项），点击【提交】将这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/paraManage/addpara.png" alt="">
                            <p>图2 添加参数</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除参数的相关信息。从参数列表选中一条或多条记录，点击【删除】进入如图3所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/paraManage/delpara.png" alt="">
                            <p>图3 删除参数</p>
                        </div>

                        <span>【修改】</span>
                        <p>用于修改参数的相关信息。从参数列表相应的操作中点击【修改】进入如图3所示的修改界面。根据需要修改相关内容，点击【提交】 将修改内容更新到系统中；点击【重置】将记录重置为未修改前的信息；点击【关闭】则取消本次修改操作。。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/paraManage/modifypara.png" alt="">
                            <p>图4 修改参数</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
