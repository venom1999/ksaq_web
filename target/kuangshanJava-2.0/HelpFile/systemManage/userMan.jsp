<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/6
  Time: 9:58
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
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 用户管理
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">用户管理</a></span></li>
            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对系统用户信息进行管理。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“用户管理”。该模块包括“用户管理”选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><用户管理></span>
                        <p>以记录列表的形式展示所有系统用户信息，授权用户可以进行详细、添加、修改、删除、授权、密码重置和查询操作中的几项，如图1所示。在本系统的权限管理中，只有管理员和领导可以进行这部分的操作。其中管理员可以对领导用户进行管理操作，而领导用户可以对普通用户和部门管理员用户进行管理操作，不同的用户登录会看到不同的用户列表。管理员用户登录，则只能看到领导用户的列表；领导用户登录，则只能看到该领导负责的部门的普通用户和部门管理员的用户列表。图1，显示了管理员用户登录后，看到的用户列表。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/usermain.png" alt="warn">
                            <p>图1 用户管理界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加用户的相关信息。点击【添加】进入如图2所示的添加界面。首先选择用户姓名和用户状态，会在下方左边的角色列表中，显示该用户可能担当的角色。（例如，一个用户如果是安全环保部的员工，则这里就不可能出现“采矿车间领导”这种角色,但是会出现不属于任何机构的角色，比如说超级管理员和普通用户）选择相应的角色，点击【选入>】，将该角色添加已选角色列表（即右边的角色列表）中，如果不需要某角色，可以在已选角色列表中，点击【< 移出】，该角色又将回到初始角色列表中。角色选定完毕后，点击【添加】将这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/adduser.png" alt="">
                            <p>图2 添加用户</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除用户的相关信息。从用户列表选中一条或多条记录，点击【删除】进入如图3所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/deluser.png" alt="">
                            <p>图3 删除用户</p>
                        </div>
                        <span>【详细】</span>
                        <p> 用于查看用户的详细信息。在用户列表相应的操作中点击【详细】进入如图4所示的详细界面，就可以查看该条用户的详细信息。点击【关闭】结束本次查看操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/userdetail.png" alt="">
                            <p>图4 用户详细</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改用户的相关信息。在用户列表相应的操作中点击【修改】进入如图5所示的修改界面。根据需要修改相关内容，点击【保存】将修改内容更新到系统中；点击【关闭】则结束本次修改操作。值得注意的是，用户姓名不能修改。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/modifyuser.png" alt="">
                            <p>图5 修改用户</p>
                        </div>
                        <span>【授权】</span>
                        <p> 用于给用户赋予除其所属角色权限以外的权限。在用户列表相应的操作中选择【更多】进入如图6所示的更多界面，点击【授权】进入如图7、8所示的授权界面，点击【保存】完成授权操作。例如：当前用户所属角色“安全环保部部门领导”，目前只对各个模块有“查看”的权限，在授权页面，可以另外为该用户添加角色管理和用户管理的“增删改”的权限，扩充当前用户的权限，而并不会影响其所属角色的权限。 说明：同一个机构下的每个模块的“增删改”权限是互斥的，如果将角色管理和用户管理的“增删改”分配给了一个用户，就不能再将这个权限分配给另外的用户。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/usermore.png" alt="">
                            <p>图6 用户更多</p>
                        </div>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/userpower.png" alt="">
                            <p>图7 用户授权（一）</p>
                        </div>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/userpower2.png" alt="">
                            <p>图8 用户授权（二）</p>
                        </div>
                        <span>【密码重置】</span>
                        <p> 用于对忘记密码的用户密码信息进行重置。密码统一重置为初始密码“111111”。在用户列表相应的操作中选择【更多】进入如图6所示的更多界面，点击【密码重置】进入如图9所示的密码重置界面，点击【确定】密码重置操作；点击【取消】取消本次密码重置操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/userManage/userreset.png" alt="">
                            <p>图9 用户密码重置</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
