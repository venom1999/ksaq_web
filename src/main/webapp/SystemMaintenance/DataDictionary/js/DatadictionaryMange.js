$(function () {
    var list_vue = new Vue({
        el: "#right",

        data: {
            params: [{
                label: '数据字典ID：',
                type: 'plain',
                model: 'a.DDItemID',
            },
                {
                    label: '字典项名称：',
                    type: 'select',
                    model: 'a.DDCategoryNum',
                },
                {
                    label: '字典条目编号：',
                    type: 'plain',
                    model: 'a.DDItemNum',
                }, {
                    label: '字典条目值：',
                    type: 'plain',
                    model: 'a.DDItemValue',
                },
                {
                    label: '删除否：',
                    type: 'select',
                    model: 'a.IsDelete',
                }],
            /*search:{
                DDItemID:"",
                DDCategoryNum:"",
                DDItemNum:"",
                DDItemValue:"",
                IsDelete:""
            },*/
            list: [],
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            tableLoading:false,
            id_list: [], //多选选中的id数组，以,隔开
            addDialogVisible:false,
            editDialogVisible:false,
            addFrom:{
                ddcategory:"",
                dditemnum:"",
                dditemvalue:""
            },
            temp:{},
            editFrom:{
                DDItemID:"",
                ddcategory:"",
                dditemnum:"",
                dditemvalue:"",
                isdelete:""
            },
            rules: {
                DDCategory: [

                ],
                dditemnum: [
                    { required: true,min:1,max:6, message: '请输入1至6位数字作为字典条目编号',trigger: 'blur'  }

                ],
                dditemvalue: [
                    { required: true, message: '请输入字典条目值', trigger: 'blur' }
                ]
            },
            options:[],
            options2: [{
                value: '否',
                label: '否'
            },{
                value: '是',
                label: '是'
            }]
            /*search:{
                dpmname:'',
                checkperson:'',
                implementtime:'',
                issuetime:'',
                checktime:'',
                issuedepartment:''
            },*/


        },
        computed: {
            idList: function () {
                let vm = this;
                let idlist = [];
                vm.id_list.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                })
                return idlist;
            }
        },
        methods: {

            //查询
            filter: function () {
                let newparams=getParams(this.params);
                this.getList(1,newparams);
               /* let params = [];
                for (col of this.params) {
                    switch (col.type) {
                        case 'plain':
                            if (col.value && col.value.replace(/ /g, '')) {
                                col.value = col.value.replace(/ /g, '');
                                params.push(` ${col.model} like '%${col.value}%' `);
                            }
                            break
                        case 'time':
                            if (col.value && col.value[0] && col.value[1]) {
                                params.push(` ${col.model} between '${moment(col.value[0]).format('YYYY-MM-DD')}' and '${moment(col.value[1]).format('YYYY-MM-DD')}'`);
                            }
                            break
                        case 'select':
                            if (col.value) {
                                params.push(` ${col.model} = '${col.value}' `);
                            }
                            break
                        case 'number':
                            if (col.value && col.value.replace(/ /g, '')) {
                                let num = Number(col.value.replace(/ /g, ''))
                                if (num) {
                                    params.push(` ${col.model} > ${num} `);
                                }
                            }
                            break
                    }
                }
                this.getList(1,params.join('and'))*/
            },

            //表单重置
            resetForm(formName) {
                //debugger;
                if(formName=='addFrom'){
                    this.$refs[formName].resetFields();
                }else {
                  /*  _this.temp.ddcategory=_this.editFrom.ddcategory;
                    _this.temp.dditemnum=_this.editFrom.dditemnum;
                    _this.temp.dditemvalue=_this.editFrom.dditemvalue;
                    _this.temp.isdelete=_this.editFrom.isdelete;
                    _this.temp.DDItemID=_this.editFrom.DDItemID;*/
                    this.$refs[formName].resetFields();
                    this.editFrom=this.temp;
                }

            },
            closeFrom(formName){
                // this.clearValidate(formName);
                this.$refs[formName].clearValidate();
                this.$refs[formName].resetFields();
                console.log('XX1XXX1');

            },



            //点击复选框id_list自动更新
            checkItems: function (ID) {
                if (this.id_list.indexOf(ID) >= 0) {
                    console.log(this.id_list);
                    this.id_list.splice($.inArray(ID, this.id_list), 1);
                } else {
                    this.id_list.push(ID);
                }
            },
            //时间范围输入框
            // dateRange: function (event) {
            //     var _this = event.currentTarget;
            // var start=new Date().Format('yyyy-MM-dd');
            // var end=new Date().Format('yyyy-MM-dd');
            // if($(_this).val()!=''){
            //     start=$(_this).val().split(' / ')[0];
            //     end=$(_this).val().split(' / ')[1];
            // }
            //     $(_this).daterangepicker({
            //         showDropdowns: true,
            //         startDate: new Date().Format('yyyy-MM-dd'),
            //         endDate: new Date().Format('yyyy-MM-dd'),
            //         //maxSpan:moment.duration(20,'year'),
            //         locale: {
            //             "format": "YYYY-MM-DD",
            //             "separator": " / ",
            //             "applyLabel": "确定",
            //             "cancelLabel": "取消",
            //             "fromLabel": "开始",
            //             "toLabel": "结束",
            //             "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            //             "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            //             "firstDay": 1
            //         },
            //         ranges: {
            //             '过去一周': [moment().subtract(6, 'days'), moment()],
            //             '过去一个月': [moment().subtract(29, 'days'), moment()],
            //             '本月': [moment().startOf('month'), moment().endOf('month')],
            //             '过去一年': [moment().subtract(364, 'days'), moment()],
            //             '本年':[moment().startOf('year'), moment().endOf('year')],
            //         }
            //     });
            //
            //
            // },
            // clearDateRange:function(event){
            //     var _this = event.currentTarget;
            //     alert($(_this).val());
            //     $(_this).val('');
            //
            // },
            //获取list
            getList: function (pageindex, conditions) {
                let _this =this;
                pageindex = pageindex || 1;
                //conditions = conditions || '';
                _this.pageindex = pageindex;
                if(conditions!==undefined)
                {
                    _this.conditions = conditions;
                }
                _this.tableLoading = true;
                $.ajax({
                    url: 'getlistdata',
                    type: "post",
                   // async: false,
                    data: {
                        pageindex: _this.pageindex,
                        conditions: _this.conditions
                    },
                    dataType: 'json',
                    success: function (result) {
                     //      debugger
                        //更新list
                        _this.options=result.options;
                        _this.list = result.list;
                        _this.pagenum = result.pageNum;
                        _this.id_list = result.list.map((val) => '')
                        _this.tableLoading = false;
                      //  console.log(_this.list);
                      //  console.log( result)
                        //清除id_list保存的复选框选项
                        // if(_this.id_list.length>0){
                        //     var t=[];
                        //     $(_this.list).each(function (index,ele) {
                        //         t.push(ele.DualPreventionMechanismID);
                        //     });
                        //     $(_this.id_list).each(function (index,ele) {
                        //         if(t.indexOf(ele)<0){
                        //             _this.id_list.splice(index, 1);
                        //         }
                        //     });
                        // }
                    },
                    error: handleError
                });
            },
            getConditions: function () {
               /* search:{
                    DDItemID:"",
                        DDCategoryNum:"",
                        DDItemNum:"",
                        DDItemValue:"",
                        IsDelete:""
                },*/
                var query_list = [];
                //文字输入框
                if (this.search.DDItemID.trim() != '') {
                    query_list.push(" a.DDItemID like '%" + this.search.DDItemID + "%' ");
                }
                if (this.search.DDItemNum.trim()!='' ) {
                    query_list.push(" a.DDItemNum like '%" + this.search.DDItemNum + "%' ");
                }
                if (this.search.DDItemValue.trim() != '') {
                    query_list.push(" a.DDItemValue like '%" + this.search.DDItemValue + "%' ");
                }
                //iview的select控件清空后checkperson会变成undefined
                //选择框
                if (this.search.DDCategoryNum != '' && this.search.DDCategoryNum!=undefined) {
                    //Date().Format是jquery-2.2.4.min.js中自行定义的函数，如果没有引用该js可以复制函数到自己的里面
                    query_list.push(" a.DDCategoryNum = '" + this.search.DDCategoryNum + "' ");
                      }
                if (this.search.IsDelete != '' && this.search.IsDelete!=undefined) {
                    query_list.push(" a.IsDelete = '" + this.search.IsDelete + "' ");
                }

                //alert(query_list.join('and'));
                return query_list.join('and');
            },
    /*        _add: function () {
                var self = this;
                layer.open({
                    closeBtn: 0,
                    shade: 0,
                    skin: 'layui-layer-lan',
                    title: '添加数据字典项',
                    type: 2,
                    area: ['400px', '270px'], //长宽
                    fixed: false, //不固定
                    maxmin: false,
                    content: 'DatadictionaryMangeAddOrEdit?action=add',   //iframe的url
                    end: function () {
                        //更新list，第四个参数传self，而不是this，因为self是list-vue本身，而layer-js会改变这里的this
                        self.getList(self.pageindex, self.conditions, false, self);
                    }
                });
            },*/
            _add:function(){
                var self = this;

                $.ajax({
                    url: 'Add1',
                    type: "post",
                    async: false,
                    data: self.addFrom,
                    dataType: 'json',
                    success: function (result) {
                        if ( result.data == "success")  {
                            self.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                        } else {
                            self.$message({
                                type: 'fail',
                                message: '添加失败!'
                            });
                        }
                        self.getList(self.pageindex, self.conditions)

                    },
                    error: handleError
                });
            },
            //打开编辑页面
            _edit: function (ID,_this) {
                //  debugger;

                if (_this == undefined) {
                    _this = this;  //使得_this是list-vue本身
                }
                $.ajax({
                    url: 'DatadictionaryEdit',
                    type: "post",
                    async: false,
                    data: {
                        DDItemID: ID
                    },
                    dataType: 'json',
                    success: function (result) {

                        _this.editFrom.ddcategory=result.datadictionaryT.ddcategorynum;
                        _this.editFrom.dditemnum=result.datadictionaryT.dditemnum;
                        _this.editFrom.dditemvalue=result.datadictionaryT.dditemvalue;
                        _this.editFrom.isdelete=result.datadictionaryT.isdelete;
                        _this.editFrom.DDItemID=ID;
                        _this.temp.ddcategory=_this.editFrom.ddcategory;
                        _this.temp.dditemnum=_this.editFrom.dditemnum;
                        _this.temp.dditemvalue=_this.editFrom.dditemvalue;
                        _this.temp.isdelete=_this.editFrom.isdelete;
                        _this.temp.DDItemID=_this.editFrom.DDItemID;
                    },
                    error: handleError
                });
            },
            //保存修改
            _saveedit:function(){
                var self = this;
                /*if (_this == undefined) {
                    _this = this;  //使得_this是list-vue本身
                }*/
                $.ajax({
                    url: 'Update1',
                    type: "post",
                    async: false,
                    data: self.editFrom,
                    dataType: 'json',
                    success: function (result) {
                       // debugger
                        if ( result.data == "success") {
                            self.$message({
                                type: 'success',
                                message: '保存成功!'
                            });
                        } else {
                            self.$message({
                                type: 'fail',
                                message: '保存失败!'
                            });
                        }
                        self.getList(self.pageindex, self.conditions)

                    },
                    error: handleError
                });
              //  debugger
            },

            _delete: function () {
                var self = this;
                if (this.idList.length > 0) {  //判断是否有选择
                    this.$confirm('您确定要删除这'+this.idList.length+'条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.post('Delete1', {
                            DDItemID: this.idList.join(','),
                        }, function (result) {

                            if ( result.data == "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '部分数据已被删除!'
                                });
                            }
                            self.getList(self.pageindex, self.conditions);
                            //self.id_list=[];
                        });

                    }).catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                    /*if (confirm('您确定要删除这'+this.id_list.length+'条记录吗?')) {
                        $.post('Delete1', {
                            DDItemID: this.id_list.join(','),
                        }, function (result) {

                            if (result.data == "success") {
                                alert('删除成功！');
                            } else {
                                alert('部分记录删除错误！');
                            }
                            self.getList(self.pageindex, self.conditions, false, self);
                            self.id_list=[];
                        });
                    }*/
                }
                else {
                    this.$message('请选择您要删除的记录，点击多选按钮选中！');
                    // alert('请选择您要删除的记录，点击多选按钮选中！');
                }
              /*  var self = this;
                if (this.id_list.length > 0) {  //判断是否有选择
                    if (confirm('您确定要删除这条记录吗?')) {
                        $.post('Delete1', {
                            DDItemID: this.id_list[0],
                        }, function (data) {
                            /!* debugger
                             if (data.re == "success") {
                                 alert('删除成功！');
                             } else {
                                 alert('部分记录删除错误！');
                             }*!/
                            self.getList(self.pageindex, self.conditions, false, self);
                            self.id_list=[];
                        });
                    }
                }
                else {
                    alert('请选择您要删除的记录，点击选择按钮选中！');
                }*/
            }

        },
        created: function () {  //初始化事件里边去调用查询方法
            this.getList(1, '');
            //  this.getEmployeeList();
        }
    });
});