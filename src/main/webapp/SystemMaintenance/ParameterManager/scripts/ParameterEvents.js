$(function () {
    var list_vue = new Vue({
        el: "#right",
        data: {
            list: [],
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            tableLoading:false,
            id_list: [], //多选选中的id数组，以,隔开
            employeelist:[],
            addDialogVisible:false,
            editDialogVisible:false,
            addFrom:{
                parameteritem:"",
                parametername:"",
                parametervalue:""
            },
            temp:{},
            editFrom:{
                parameterid:"",
                parameteritem:"",
                parametername:"",
                parametervalue:""
            },
            rules: {
                parameteritem: [
                    { required: true, message: '请输入参数编号',trigger: 'blur'  }
                ],
                parametername: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' }
                ],
                parametervalue: [
                    { required: true,message: '请输入参数值(数字)', trigger: 'blur' }
                ]
            },
            options2: [{
                value: '否',
                label: '否'
            },{
                value: '是',
                label: '是'
            }],

            params: [{
                label: 'params',
                type: 'params',
                model: 'params',
            }]
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

            //表单重置
            resetForm(formName) {
                // debugger;
                if(formName=='addFrom'){
                    this.$refs[formName].resetFields();
                }else {

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
            //获取list
            getList: function (pageindex, conditions) {
               let _this =this;

                let newparams = getParams(_this.params);
                conditions = newparams;

                _this.pageindex = pageindex || 1;
                //conditions = conditions || '';
                _this.pageindex = pageindex;
                if(conditions!==undefined)
                {
                    _this.conditions = conditions;
                }
                _this.tableLoading = true;
                $.ajax({
                    url: 'getList',
                    type: "post",
                    // async: false,
                    data: {
                        pageindex: _this.pageindex,
                        conditions: _this.conditions
                    },
                    dataType: 'json',
                    success: function (result) {

                        //更新list
                        _this.list = result.list;
                        _this.pagenum = result.pageNum;

                        _this.id_list = result.list.map((val) => '')
                        _this.tableLoading = false;


                    },
                    error: handleError
                });
            },

            _add:function(){
                var self = this;
                $.ajax({
                    url: 'SubmitAdd',
                    type: "post",
                    //async: false,
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
                        self.addDialogVisible  = false;
                        self.getList(self.pageindex, self.conditions)

                    },
                    error: handleError
                });
            },

            _edit: function (ID,_this) {
                //  debugger;

                if (_this == undefined) {
                    _this = this;  //使得_this是list-vue本身
                }
                $.ajax({
                    url: 'Edit',
                    type: "post",
                    //async: false,
                    data: {
                        parameterid: ID
                    },
                    dataType: 'json',
                    success: function (result) {
                        // parameterid:"",
                        //     parameteritem:"",
                        //     parametername:"",
                        //     parametervalue:""
                        //  debugger
                        _this.editFrom.parameterid=result.parameterT.parameterid;
                        _this.editFrom.parameteritem=result.parameterT.parameteritem;
                        _this.editFrom.parametername=result.parameterT.parametername;
                        _this.editFrom.parametervalue=result.parameterT.parametervalue;

                        _this.temp.parameterid=_this.editFrom.parameterid;
                        _this.temp.parameteritem=_this.editFrom.parameteritem;
                        _this.temp.parametername=_this.editFrom.parametername;
                        _this.temp.parametervalue=_this.editFrom.parametervalue;

                    },
                    error: handleError
                });
            },
            //保存修改
            _saveedit:function(){
                var self = this;
                $.ajax({
                    url: 'Submitupdate',
                    type: "post",
                    //async: false,
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
                        self.editDialogVisible  = false;
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
                        type: 'warning',
                        dataType: 'json',
                    }).then(() => {
                        $.post('Delete', {

                            parameterid: this.idList.join(','),
                        }, function (result) {

                            if (result.data == "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '部分数据删除失败!'
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

            }





        },
        created: function () {  //初始化事件里边去调用查询方法

            this.getList();
        }
    });
});