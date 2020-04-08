<%--
  Created by IntelliJ IDEA.
  User: 10247
  Date: 2019/7/9
  Time: 19:55
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div class="main-content">
    <div class="row">
        <div class="col-md-12 headnav">
            <p>
                <img src="helpimg/sy_03.png" alt="icon" height="40" align="bottom"> 风险管理
                <span class="line-style"></span>
            </p>
        </div>
        <div class="col-md-12 ">
            <ul class="breadcrumb">
                <li><span><a href="#tab1" class="thirdMenu current">风险等级管理</a></span></li>
                <li><span><a href="#tab2" class="thirdMenu">LEC评估要素</a></span></li>
                <li><span><a href="#tab3" class="thirdMenu">LEC评估准则</a></span></li>
            </ul>
            <div class="main-intro">
                <div>
                    <p>（一）功能：主要对风险等级及各种评估方法的评估要素和评估准则进行管理。</p>
                    <p>（二）使用方法：点击菜单“系统维护与管理”—>“风险管理”，该模块包含“风险等级管理”、“LEC评估要素”、“LEC评估准则”三个选项卡。</p>
                </div>
                <div class="tabs">
                    <div id="tab1">
                        <span><风险等级管理></span>
                        <p>以记录列表的形式展示风险等级划分信息（默认只展示未删除记录，已删除记录可通过查询功能查看），授权用户可以进行添加、修改、删除、详细操作，如图1所示。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/levelmain.png" alt="warn">
                            <p>图1 风险等级管理界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加风险等级划分的相关信息。点击【添加】进入如图2所示的添加界面。系统中只提供5套不同的默认风险等级；每一套风险等级对应的风险等级数、风险点等级描述、等级颜色固定不变，但等级描述和等级颜色可以在添加成功后修改；系统在同一时刻只能存在一套风险等级划分；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/addlevel.png" alt="">
                            <p>图2 添加风险等级划分</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除风险等级划分的相关信息。点击【删除】进入如图3所示的删除界面。点击【确定】删除当前所有风险等级记录；点击【取消】取消本次删除操作。</p>
<p>注意：风险等级划分删除时，会删除当前整套风险等级划分以及所有评估方法的评估准则，请谨慎操作！</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/dellevel.png" alt="">
                            <p>图3 删除风险等级划分</p>
                        </div>
                        <span>【详细】</span>
                        <p> 用于查看风险等级的详细信息。从风险等级列表中相应的操作中点击【详细】进入如图4所示的详细界面，可以查看该条风险等级的详细信息。点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看其他风险等级的详细信息。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/leveldetail.png" alt="">
                            <p>图4 风险等级详细</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改风险等级划分的相关信息。从风险等级列表中相应的操作中点击【修改】进入如图5所示的修改界面。根据需要修改相关内容。最后，点击【保存】 将修改内容更新到系统中；点击【关闭】则结束本次修改操作。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/modifylevel.png" alt="">
                            <p>图5 修改风险等级</p>
                        </div>
                    </div>
                    <div id="tab2">
                        <span>《LEC评估要素》</span>

                        <p>以记录列表的形式展示各类LEC评价要素的信息,授权用户可以进行详细、添加、修改、删除和查询操作，如图6所示。 </p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/elementmain.png" alt="warn">
                            <p>图6 LEC评估要素界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加LEC评价要素的相关信息。点击【添加】进入如图7所示的添加界面。从评价要素列表选中一条记录，依次填入等级对应值、等级描述内容（其中带*的为必填项），点击【添加】将这条信息添加到系统中；点击【重置】将已填写信息重置为默认值；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/addelement.png" alt="">
                            <p>图7 添加LEC评估要素</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除LEC评价要素的相关信息。从LEC评价要素列表选中一条或多条记录，点击【删除】进入如图8所示的删除界面。点击【确定】删除该条记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/delelement.png" alt="">
                            <p>图8 删除LEC评估要素</p>
                        </div>
                        <span>【详细】</span>
                        <p> 用于查看LEC评价要素的详细信息。从LEC评估要素列表中相应的操作中点击【详细】进入如图9所示的详细界面，可以查看该条LEC评价要素的详细信息。点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看其他LEC评价要素的详细信息。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/elementdetail.png" alt="">
                            <p>图9 LEC评估要素详细</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改LEC评价要素的相关信息。从LEC评估要素列表中相应的操作中点击【修改】进入如图10所示的修改界面。根据需要修改相关内容，点击【保存】 将修改内容更新到系统中；点击【关闭】则取消本次修改操作。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/modifyelement.png" alt="">
                            <p>图10 修改LEC评估要素</p>
                        </div>
                    </div>
                    <div id="tab3">
                        <span>《LEC评估准则》 </span>

                        <p>以记录列表的形式展示各类LEC评估准则的管理信息,授权用户可以进行详细、添加、修改、删除和查询操作，如图11所示。</p>
                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/rulemain.png" alt="">
                            <p>图11 LEC评估准则界面</p>
                        </div>
                        <span>【添加】</span>
                        <p> 用于添加LEC评估准则的相关信息。点击【添加】进入如图12所示的添加界面。从风险等级列表选中一条记录，依次填入最大值、最小值、解决方案等内容（其中带*的为必填项），点击【添加】将这条信息添加到系统中；点击【重置】将已填写信息重置为默认值；点击【关闭】则结束本次添加操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/addrule.png" alt="">
                            <p>图12 添加LEC评估准则</p>
                        </div>
                        <span>【删除】</span>

                        <p>用于删除LEC评估准则的相关信息。从LEC评估准则列表选中一条记录，点击【删除】进入如图13所示的删除界面。点击【确定】删除该条记录；点击【取消】取消本次删除操作。</p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/delrule.png" alt="">
                            <p>图13 删除LEC评估准则</p>
                        </div>
                        <span>【详细】</span>
                        <p> 用于查看LEC评估准则的详细信息。从LEC评估准则列表中相应的操作中点击【详细】进入如图14所示的详细界面，可以查看该条LEC评估准则的详细信息。点击【关闭】结束本次查看操作；点击【上一条】和【下一条】还能够查看其他LEC评估准则的详细信息。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/ruledetail.png" alt="">
                            <p>图14 LEC评估准则详细</p>
                        </div>
                        <span>【修改】</span>
                        <p> 用于修改LEC评估准则的相关信息。从LEC评估准则列表中相应的操作中点击【修改】进入如图15所示的修改界面。根据需要修改相关内容，点击【保存】 将修改内容更新到系统中；点击【关闭】则取消本次修改操作。

                        </p>

                        <div class="pic-comment">
                            <img src="helpimg/systemManage/riskManage/modifyrule.png" alt="">
                            <p>图15 修改LEC评估准则</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
