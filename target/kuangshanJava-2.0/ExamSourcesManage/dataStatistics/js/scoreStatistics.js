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
        mounted() {
            this.getTest();
        },

		methods: {

            // 查询
            filter: function() {
                this._score_histogram(this.params[0].value);
                this._score_pie(this.params[0].value);
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

			// 展示柱状图
            _score_histogram: function ( testId ) {
			    let self = this;

                // 基于准备好的dom，初始化echarts实例
                let score_histogram = echarts.init(document.getElementById('score_histogram'));
                let yArr = [];    // y轴数据
                let xArr =  [];    // x轴数据

                let colors = ['#5793f3', '#d14a61', '#675bba'];
                let option = {
                    color: colors,

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    grid: {
                        right: '20%'
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['分数频率','正态分布']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            // data: xaxis
                            data: []
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '频率',
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: colors[2]
                                }
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: []
                };

                // 画图
                if (option && typeof option === "object") {
                    score_histogram.setOption(option, true);
                }

                score_histogram.showLoading();
                $.ajax({
                    url: 'getScoreFre',
                    type: "post",
                    data: {
                        test_id: testId
                    },
                    dataType: 'json',
                    success: function ( result ) {
                        score_histogram.hideLoading();

                        // 成绩不重复的数据
                        let xaxis = result.xaxis;
                        let mean = ecStat.statistics.mean(xaxis);    // 平均数
                        let stdev = Math.sqrt(ecStat.statistics.sampleVariance(xaxis));    // 标准差

                        // 各成绩的频率
                        let yaxis = result.yaxis;

                        // 获取y轴正态分布概率密度
                        for(let j=0; j < xaxis.length; j++){
                            let res = self.normalFun(xaxis[j], mean, stdev).toFixed(2);
                            yArr.push(res);
                        }

                        let data = [
                            {
                                name:'分数频率',
                                type:'bar',
                                data:yaxis
                            },
                            {
                                name:'正态分布',
                                type:'line',
                                smooth:true,
                                yAxisIndex: 1,
                                data:yArr
                            },
                        ];

                        score_histogram.setOption({
                            xAxis: {
                                data: xaxis
                            },
                            series: data
                        });



                    },
                    error: handleError

                });


            },    // _histogram: function () end


            // 展示饼图
            _score_pie: function ( testId ) {
                let self = this;

                let score_pie = echarts.init(document.getElementById('score_pie'));

                let option = {
                    title: {
                        text: '分数段人数统计',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        bottom: 10,
                        left: 'center',
                        data: ['0-60', '60-70', '70-80', '80-90', '90-100']
                    },
                    series: [
                        {
                            name: '分数段',
                            type: 'pie',
                            radius: '70%',
                            center: ['50%', '50%'],
                            data: [

                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };    // option end

                // 画图
                if (option && typeof option === "object") {
                    score_pie.setOption(option, true);
                }

                score_pie.showLoading();

                $.ajax({
                    url: 'getScoreDistribution',
                    type: "post",
                    data: {
                        test_id: testId
                    },
                    dataType: 'json',
                    success: function ( result ) {
                        score_pie.hideLoading();
                        score_pie.setOption({
                            series: {
                                data: result
                            }
                        });

                    },
                    error: handleError

                });

            },    // _score_pie end


            // 计算正态分布每个数的概率密度
            normalFun: function(x, mean, stdev) {
                return  (1 / Math.sqrt(2 * Math.PI) * stdev)
                    * Math.exp( -1 * ((x-mean) * (x-mean)) / (2 * stdev * stdev));
            },



		},    // methods end

		created: function () {
			// this.getBakTime();
		}


	});
};