window.onload = function () {
	new Vue({
		el: "#right",
		data: {
			tableLoading: false,

            right: false,   // 查询的权限
            userList: [],   // 查询员工用的

            // 查询参数
            params: [
                {
                    label: '员工姓名：',
                    type: 'select',
                    model: 'employee_num',
                },
            ]

		},

        // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
        mounted() {
		    this._diagram('');
        },

        // 渲染前调用
        created() {
		    this.getRight();
        },

		methods: {

		    // 查询
            filter: function() {
                this._diagram(this.params[0].value);
            },


            // 获取当前登录人所在部门
            getRight: function() {
                let self = this;

                $.ajax({
                    url: 'getRight',
                    type: "post",
                    data: {},
                    async: false,
                    dataType: 'json',
                    success: function ( data ) {
                        if (data.right === '0') {
                            self.right = false;

                        } else if (data.right === '1') {
                            self.right = true;
                            self.userList = data.memberList;
                        } else if (data.right === '2') {
                            self.right = true;
                            self.userList = data.staffList;
                        }

                    },
                    error: handleError
                });
            },


			// 展示曲线图（个人成绩统计）
            _diagram: function ( userNum ) {

                // 基于准备好的dom，初始化echarts实例
                let diagram = echarts.init(document.getElementById('diagram'));

                let option = {
                    title: {
                        text: '个人考试成绩统计',
                        left: 'center',
                    },
                    textStyle:{
                        fontSize:20,
                    },
                    //点击某一个点的数据的时候，显示出悬浮窗
                    tooltip : {
                        axisPointer: {
                            type: 'line',
                        }
                    },
                    //可以手动选择现实几个图标
                    legend: {
                        data:['分数']
                    },
                    dataZoom:[
                        {
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            startValue:0,                           //数据窗口范围的起始数值
                            endValue:10,                            //数据窗口范围的结束数值。
                        }
                    ],
                    //工具栏
                    toolbox: {
                        show : true,
                        feature : {
                            //show是否显示表格，readOnly是否只读
                            dataView : {show: true, readOnly: true},
                            magicType : {
                            },
                            saveAsImage: {}

                        }
                    },
                    xAxis : [
                        {
                            //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                            boundaryGap:true,
                            type : 'category',
                            name : '次数',
                            data : []
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : '分数'
                        }
                    ],
                    //图形的颜色组
                    color:['rgb(249,159,94)'],
                    //需要显示的图形名称，类型，以及数据设置
                    series : [
                        {
                            symbol: 'circle',     //设定为实心点
                            symbolSize: 20,   //设定实心点的大小
                            //默认显示为曲线图
                            type:'line',
                            smooth:true,
                            data:[]
                        }
                    ]
                };    // option end



                // 画图
                if (option && typeof option == "object") {
                    diagram.setOption(option, true);
                }

                diagram.showLoading();

                $.ajax({
                    url: 'getScoreByUser',
                    type: "post",
                    data: {
                        userNum: userNum
                    },
                    dataType: 'json',
                    success: function ( result ) {
                        let timesArr = [];    // 考试次数
                        for (let i = 1; i <= result.testNameList.length; i++) {
                            timesArr.push(i);
                        }

                        for (let j = 0; j < timesArr.length; j++) {
                            if ( result.scoreModeList[j] ==='0' ) {    // 百分制
                                result.scoreList[j] = {
                                    value: result.scoreList[j],
                                    tooltip: {
                                        formatter:'考试名称：' + result.testNameList[j]
                                            + '<br/>考试分数：' + result.scoreList[j]
                                            + '<br/>分数制：百分制'
                                    }
                                }
                            } else if ( result.scoreModeList[j] ==='1' ) {    // 二分制
                                if ( result.scoreList[j] === '0.0' ) {    // 合格
                                    result.scoreList[j] = {
                                        value: '90',
                                        tooltip: {
                                            formatter:'考试名称：' + result.testNameList[j]
                                                + '<br/>考试分数：合格'
                                                + '<br/>分数制：二分制'
                                        }
                                    }
                                } else {
                                    result.scoreList[j] = {
                                        value: '50',
                                        tooltip: {
                                            formatter:'考试名称：' + result.testNameList[j]
                                                + '<br/>考试分数：不合格'
                                                + '<br/>分数制：二分制'
                                        }
                                    }
                                }
                            } else if ( result.scoreModeList[j] ==='2' ) {    // 五分制
                                switch (result.scoreList[j]) {
                                    case '0.0':    // 不及格
                                        result.scoreList[j] = {
                                            value: '50',
                                            tooltip: {
                                                formatter:'考试名称：' + result.testNameList[j]
                                                    + '<br/>考试分数：不及格'
                                                    + '<br/>分数制：五分制'
                                            }
                                        };
                                        break;
                                    case '1.0':    //  差
                                        result.scoreList[j] = {
                                            value: '60',
                                            tooltip: {
                                                formatter:'考试名称：' + result.testNameList[j]
                                                    + '<br/>考试分数：及格'
                                                    + '<br/>分数制：五分制'
                                            }
                                        };
                                        break;
                                    case '2.0':    // 中
                                        result.scoreList[j] = {
                                            value: '70',
                                            tooltip: {
                                                formatter:'考试名称：' + result.testNameList[j]
                                                    + '<br/>考试分数：中'
                                                    + '<br/>分数制：五分制'
                                            }
                                        };
                                        break;
                                    case '3.0':    // 良
                                        result.scoreList[j] = {
                                            value: '80',
                                            tooltip: {
                                                formatter:'考试名称：' + result.testNameList[j]
                                                    + '<br/>考试分数：良'
                                                    + '<br/>分数制：五分制'
                                            }
                                        };
                                        break;
                                    case '4.0': {    // 优
                                        result.scoreList[j] = {
                                            value: '90',
                                            tooltip: {
                                                formatter:'考试名称：' + result.testNameList[j]
                                                    + '<br/>考试分数：优'
                                                    + '<br/>分数制：五分制'
                                            }
                                        };
                                        break;
                                    }
                                }    // switch end
                            }    // if end
                        }    // for end

                        diagram.hideLoading();
                        diagram.setOption({
                            xAxis: {
                                data: timesArr
                            },
                            series: [{
                                // 根据名字对应到相应的系列
                                data: result.scoreList
                            }]
                        });
                    },
                    error: handleError

                });


			},    // _diagram: function () end


		},    // methods end


	});
};

