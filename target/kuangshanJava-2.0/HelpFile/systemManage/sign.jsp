<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/9
  Time: 20:38
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
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 签名管理
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">签名管理</a></span></li>

            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对系统签名信息进行管理。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“签名管理”。该模块包括“签名管理”选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><签名管理></span>
                        <p>以记录列表的形式展示所有系统签名信息，授权用户可以进行添加、修改、删除和查询操作，如图1所示。在本系统的权限管理中，只有管理员和领导可以进行这部分的操作。其中管理员可以对领导签名进行管理操作，而领导用户可以对普通用户和部门管理员签名进行管理操作，不同的用户登录会看到不同的签名列表。管理员用户登录，则只能看到领导签名的列表；领导用户登录，则只能看到该领导负责的部门的普通用户和部门管理员签名列表。图1显示了管理员用户登录后，看到的签名列表。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/signManage/signmain.png" alt="warn">
                            <p>图1 签名管理界面</p>
                        </div>
                        <span>【添加】</span>
                        <p>用于添加签名的相关信息。点击【添加】进入如图2所示的添加界面。依次填入用户姓名，用户签名状态（其中带*的为必填项），点击【添加】将这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/signManage/addsign.png" alt="">
                            <p>图2 添加签名</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除签名的相关信息。从签名列表选中一条或多条记录，点击【删除】进入如图4所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/signManage/delsign.png" alt="">
                            <p>图3 删除签名</p>
                        </div>

                        <span>【修改】</span>
                        <p>用于修改签名的相关信息。从签名列表相应的操作中点击【修改】进入如图4所示的修改界面。根据需要修改相关内容，点击【保存】 将修改内容更新到系统中；点击【关闭】则取消本次修改操作。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/signManage/modifysign.png" alt="">
                            <p>图4 修改签名</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
