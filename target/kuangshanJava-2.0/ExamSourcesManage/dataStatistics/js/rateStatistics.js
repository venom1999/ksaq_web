window.onload = function () {
	new Vue({
		el: "#right",
		data: {
			tableLoading: false,
            testList: [],   // 查询考试用

            // 查询参数
            params: [
                {
                    label: '考试名称：',
                    type: 'select',
                    model: 'test_id',
                },
            ]

		},


        // 渲染前调用
        created() {
		    this.getTest();
        },

		methods: {

            // 查询
            filter: function() {
                this._rate_histogram(this.params[0].value)
            },


            // 获取已有考试信息
            getTest: function() {
                let self = this;
                $.ajax({
                    url: 'getTest',
                    type: "post",
                    data: {},
                    dataType: 'json',
                    success: function (result) {
                        self.testList = result;
                    },
                    error: handleError
                });
            },



            // 部门考核分数分布统计
			_rate_histogram: function ( testId ) {

                // 基于准备好的dom，初始化echarts实例
                let rate_histogram = echarts.init(document.getElementById('rate_histogram'));

                let option = {
                    textStyle:{
                        fontSize:20,
                    },
                    //点击某一个点的数据的时候，显示出悬浮窗
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    //可以手动选择现实几个图标
                    legend: {
                        data:[]
                    },
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
                            type: 'category',
                            name: '分数段',
                            data: ['0-60', '60-70', '70-80', '80-90', '90-100']
                        }
                    ],
                    yAxis : [
                        {
                            type: 'value',
                            name: '人数'
                        }
                    ],

                    //需要显示的图形名称，类型，以及数据设置
                    series : []

                };    // // option end

                // 画饼图
                if (option && typeof option === "object") {
                    rate_histogram.setOption(option, true);
                }

                rate_histogram.showLoading();

                $.ajax({
                    url: 'getDepartment',
                    type: "post",
                    data: {
                        test_id: testId
                    },
                    dataType: 'json',
                    success: function ( result ) {
                        rate_histogram.hideLoading();
                        let data = [];
                        for (let i = 0; i < result.departList.length; i++) {
                            data.push({
                                name: result.departList[i],
                                type: 'bar',
                                data: result.departScore[i]
                            });
                        }

                        rate_histogram.setOption({
                            legend: {
                                data: result.departList
                            },
                            series: data
                        });

                    },
                    error: handleError

                });

			},    // _pieChart: function () end
            
            



		},    // methods end



	});
};


