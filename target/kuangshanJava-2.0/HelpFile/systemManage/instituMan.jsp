<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/5
  Time: 20:47
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
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 机构管理
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">机构管理</a></span></li>
                <li><span><a href="#tab2" class="thirdMenu">机构模块管理</a></span></li>
            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对系统机构信息进行管理。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“机构管理”。该模块包括“机构管理”和“机构模块管理”两个选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><机构管理></span>
                        <p>以记录列表的形式展示企业所有机构信息，授权用户可以进行添加、删除、修改和查询操作，如图1所示。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/instiManage/instimain.png" alt="warn">
                            <p>图1 机构管理界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加机构的相关信息。点击【添加】进入如图2所示的添加界面。依次填入机构编号，机构名称，负责人等（其中带*的为必填项），点击【添加】将这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/instiManage/addinsti.png" alt="">
                            <p>图2 添加机构</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除机构的相关信息。从机构列表选中一条或多条记录，点击【删除】进入如图3所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/instiManage/delinsti.png" alt="">
                            <p>图3 删除机构</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改机构的相关信息。在机构列表中相应的操作中点击【修改】进入如图4所示的修改界面。根据需要修改相关内容，点击【保存】将修改内容更新到系统中；点击【关闭】则结束本次修改操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/instiManage/modifyinsti.png" alt="">
                            <p>图4 修改机构</p>
                        </div>
                    </div>
                    <div id="tab2">
                        <span><机构模块管理></span>
                        <p>以Excel表的形式展示企业各部门权限分配信息，如图5所示。通过将整个系统的功能模块与负责操作此模块的机构相关联，完成其添加、修改、删除、浏览和查询的功能。一个模块可以由几个部门操作，同样，一个部门可以操作若干模块。</p>
                        <p>首先选中一机构名称，然后通过勾选设置权限（选中代表可以操作此模块，未选中代表不可以操作此模块），最后点击【保存】完成权限设置。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/instiManage/instimodule.png" alt="">
                            <p>图5 机构模块管理界面（一）</p>
                        </div>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/instiManage/instimodule2.png" alt="">
                            <p>图6 机构模块管理界面（二）</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
