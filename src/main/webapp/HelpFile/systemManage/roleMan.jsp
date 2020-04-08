<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/6
  Time: 9:39
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
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 角色管理
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">角色管理</a></span></li>
            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对系统角色信息进行管理。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“角色管理”。该模块包括“角色管理”选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><角色管理></span>
                        <p>以记录列表的形式展示所有系统角色信息，授权用户可以进行详细、添加、修改、删除和查询操作，如图1所示。在本系统的权限管理中，只有管理员和领导可以进行这部分的操作。其中管理员可以对领导角色进行管理操作，而领导用户可以对普通用户和部门管理员角色进行管理操作，不同的用户登录会看到不同的角色列表。管理员用户登录，则只能看到领导角色的列表；领导用户登录，则只能看到该领导负责的部门的普通用户和部门管理员角色列表。图1，显示了管理员用户登录后，看到的角色列表。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/roleManage/rolemain.png" alt="warn">
                            <p>图1 角色管理界面</p>
                        </div>

                        <span>【添加】</span>
                        <p> 用于添加角色的相关信息。点击【添加】进入如图2所示的添加界面。首先输入角色的基本信息，包括机构名称、角色类型等（其中带*的为必填项）。如果是管理员用户登录，则角色类型为矿级领导和部门领导；如果是领导用户登录，则角色类型为普通用户和部门管理员；角色名称的默认值是机构名称+角色类型，但也可以直接输入角色名称。当选定机构名称后，系统会自动显示该机构可以操作的功能模块，用户可以在下面的模块列表中勾选出该角色可以操作的模块，最后，点击【添加】将这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。说明：“是否查看”表示该用户是否对该模块具有查看权限，则设置角色时，只设置该角色的是否具有查看权限，增删改的权限先不开放。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/roleManage/addrole.png" alt="">
                            <p>图2 添加角色</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除角色的相关信息。从角色列表选中一条或多条记录，点击【删除】进入如图3所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/roleManage/delrole.png" alt="">
                            <p>图3 删除角色</p>
                        </div>
                        <span>【详细】</span>
                        <p> 用于查看角色的详细信息。在角色列表相应的操作中点击【详细】进入如图4所示的详细界面，就可以查看该条角色的详细信息。点击【关闭】结束本次查看操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/roleManage/roledetail.png" alt="">
                            <p>图4 角色详细</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改角色的相关信息。在角色列表相应的操作中点击【修改】进入如图5所示的修改界面。根据需要修改相关内容，点击【保存】将修改内容更新到系统中；点击【关闭】则结束本次修改操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/roleManage/modifyrole.png" alt="">
                            <p>图5 修改角色</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
