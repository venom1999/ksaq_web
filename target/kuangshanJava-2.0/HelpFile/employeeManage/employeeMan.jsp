<%--
  Created by IntelliJ IDEA.
  User: SLR
  Date: 2019/7/9
  Time: 16:21
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
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 公司员工基本信息
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">公司员工基本信息</a></span></li>
            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对公司员工基本信息进行管理。</p>
                    <p>（二）点击菜单“员工安全信息管理”-->“公司员工基本信息”，该模块包含“公司员工基本信息”选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><公司员工基本信息></span>
                        <p>以记录列表的形式展示所有已经添加的公司员工的基本信息，授权用户可以进行添加、导出、详细、修改、证书和查询操作，如图1所示。</p>
                        <div class="pic-comment">
                            <img src="helpimg/employeeManage/employeeMan/mainemployeeman.png" alt="公司员工基本信息界面">
                            <p>图1 公司员工基本信息界面</p>
                        </div>
                    </div>

                    <span>【添加】</span>
                    <p> 用于添加公司员工的相关信息。点击【添加】进入如图2所示的添加界面。其中，按照提示填写相关内容后（其中带*的为必填项），可在“员工图片”栏目中，通过点击【点击上传员工照片】区域在本地选中待上传员工图片（JPG）上传；点击【清除照片】清除当前已上传照片。最后，点击【添加】，则这条记录添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>
                    <div class="pic-comment">
                        <img src="helpimg/employeeManage/employeeMan/addemployeeman.png" alt="公司员工基本信息的添加功能">
                        <p>图2 公司员工基本信息的添加功能</p>
                    </div>

                    <span>【导出】</span>
                    <p>用于以EXCEL文件形式批量导出公司员工的相关信息。首先可以通过查询方式（见帮助文档中“查询功能介绍”）查询需要导出的记录信息，点击【导出】进入如图3所示的导出界面（不同的浏览器，可能出现的界面略有不同），按照提示框提示打开或者保存导出的文件。</p>
                    <div class="pic-comment">
                        <img src="helpimg/employeeManage/employeeMan/exportemployeeman.png" alt="公司员工基本信息的导出功能">
                        <p>图3 公司员工基本信息的导出功能</p>
                    </div>
                    <span>【详细】</span>
                    <p> 用于查看公司员工的详细信息。从公司员工列表相应的操作中点击【详细】进入如图4所示的详细界面，可以查看该公司员工的详细信息。点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看公司其他员工的详细信息。</p>
                    <div class="pic-comment">
                        <img src="helpimg/employeeManage/employeeMan/detailemployeeman.png" alt="公司员工基本信息的详细功能">
                        <p>图4 公司员工基本信息的详细功能</p>
                    </div>
                    <span>【修改】</span>

                    <p>用于修改公司员工的相关信息。从公司员工列表相应的操作中点击【修改】进入如图5所示的修改界面。根据需要修改相关内容，对于上传的员工图片，如果要删除，在“员工图片”栏目中，点击【清除照片】删除图片；也可以点击员工图片上传区域上传图片，若已存在员工图片，则替代之。最后，点击【保存】将修改内容更新到系统中；点击【关闭】则结束本次修改操作。</p>

                    <div class="pic-comment">
                        <img src="helpimg/employeeManage/employeeMan/editemployeeman.png" alt="公司员工基本信息的修改功能">
                        <p>图5 公司员工基本信息的修改功能</p>
                    </div>
                    <span>【证书】</span>
                    <p>用于查看公司员工证书的相关信息，包括特种设备作业人员证书信息、特种作业人员证书信息和安全管理人员证书信息。从公司员工列表相应的操作中点击【证书】进入如图6所示的证书详细界面，可以查看该公司员工证书的详细信息。若“证书文件”存在若干文件，选择一个文件，点击【查看】可进行在线浏览；点击【下载】可将选中文件下载到本地；点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看员工的其他证书的详细信息。</p>

                    <div class="pic-comment">
                        <img src="helpimg/employeeManage/employeeMan/certificateemployeeman.png" alt="公司员工基本信息的证书功能">
                        <p>图6 公司员工基本信息的证书功能</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
