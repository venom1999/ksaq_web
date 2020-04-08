<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/9
  Time: 19:28
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
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 数据字典
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">字典类别管理</a></span></li>
                <li><span><a href="#tab2" class="thirdMenu">数据字典表管理</a></span></li>

            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对系统数据字典信息进行管理。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“数据字典”， 该模块包含“字典类别管理”和“数据字典表管理”两个选项卡。其中，“字典类别”相当于大类，而“数据字典表”包含的是每个类别里具体的条目。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><字典类别管理></span>
                        <p>以记录列表的形式展示系统所有字典类别信息，授权用户可以进行添加、删除和修改操作，如图1所示。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/typemain.png" alt="warn">
                            <p>图1 字典类别界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加字典类别的相关信息。点击【添加】进入如图2所示的添加界面。依次填入字典项编号，字典项名称（其中带*的为必填项），点击【提交】将信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/addtype.png" alt="">
                            <p>图2 添加字典类别</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除字典类别的相关信息。从字典类别列表选中一条或多条记录，点击【删除】进入如图3所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/deltype.png" alt="">
                            <p>图3 删除字典类别</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改字典类别的相关信息。从字典类别列表相应的操作中点击【修改】进入如图4所示的修改界面。根据需要修改相关内容，点击【提交】将修改内容更新到系统中；点击【重置】将记录重置为未修改前的信息；点击【关闭】则取消本次修改操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/modifytype.png" alt="">
                            <p>图4 修改字典类别</p>
                        </div>
                    </div>
                    <div id="tab2">
                        <span><数据字典表管理></span>

                        <p>以记录列表的形式展示系统字典表中所有字典条目信息，授权用户可以添加、删除、修改和查询操作，如图5所示。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/tablemain.png" alt="">
                            <p>图5 数据字典表界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加字典条目的相关信息。点击【添加】进入如图6所示的添加界面。首先选择字典项（即字典类别，在前面“字典类别管理”选项卡中已经添加的），表示添加此类别的具体条目，然后依次填入字典条目编号（自己编号，尽量不重复），字典条目值（其中带*的为必填项），点击【提交】将这条信息添加到系统中；点击【重置】将已填写信息清空；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/addtable.png" alt="">
                            <p>图6 添加字典条目</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除字典条目的相关信息。从字典条目列表选中一条或多条记录，点击【删除】进入如图7所示的删除界面。点击【确定】删除选中记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/deltable.png" alt="">
                            <p>图7 删除字典条目</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改字典条目的相关信息。从字典类别列表相应的操作中点击【修改】进入如图8所示的修改界面。根据需要修改相关内容，点击【提交】将修改内容更新到系统中；点击【重置】将记录重置为未修改前的信息；点击【关闭】则取消本次修改操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/dataDirectory/modifytable.png" alt="">
                            <p>图8 修改字典条目</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
