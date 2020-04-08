$(function () {
    var list_vue = new Vue({
        el: "#right",
        data: {

            deletedList: [
                {
                    key: 0,
                    value: '否'
                },
                {
                    key: 1,
                    value: '是'
                }
            ],

            list: [],                   // 显示表格列表
            pagenum: 0,
            pageindex: 0,

            conditions: '',
            tableLoading: false,
            id_list: [], //多选选中的id数组，以,隔开

            filetable: [],
            addDialogVisible: false,
            editDialogVisible: false,

            viewDialogVisible1: false,
            viewDialogVisible0: false,
            audioDialogVisible: false,

            picviewDialogVisible: false,
            filetype: '',

            filePath: '',
            fileurl: '',
            templist: '',

            addFrom: {
                edu_category_id: '',
                edu_category_name: '',
                logo: '',

                deleted: '',
                creat_time: new Date(new Date().toLocaleDateString()).getTime(),
            },

            tempFrom: {},
            detailFrom: {
                edu_category_name: '',
                logo: '',
                deleted: '',

                btnToDisabled0: false,
                btnToDisabled1: false,
                previousprevious: '',

                next: '',
            },

            editFrom: {
                edu_category_name: '',
                logo: '',
                deleted: '',

                btnToDisabled0: false,
                btnToDisabled1: false,
                previousprevious: '',
                next: '',
            },
            ID: "",
            pickerOptions1: {
                shortcuts: [{
                    text: '明天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            fileList: [],
            filedata: {id: 'add'},

            // 查询参数
            params: [
                {
                    label: '类型名称：',
                    type: 'plain',
                    model: 'edu_category_name',
                },
                {
                    label: '创建时间：',
                    type: 'time',
                    model: 'creat_time',
                },
                {
                    label: '删除否：',
                    type: 'select',
                    model: 'deleted',
                    value: 0,
                },

            ],

            // 添加/修改时用户输入提示
            rules: {
                edu_category_name: [
                    {required: true, message: '请输入类型名称', trigger: 'blur'}
                ],

                deleted: [
                    {required: true, message: '请选择是否删除', trigger: 'change'}
                ],
            }

        },


        // 多选按钮
        computed: {
            idList: function () {
                let vm = this;
                let idlist = [];
                vm.id_list.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                });
                return idlist;
            },

            unDeletedList: function () {
                let self = this;
                if (self.list != null) {
                    if (self.params[2].value == 0) {
                        return self.list.filter(function (item) {
                            return item.deleted == 0;
                        })
                    } else if (self.params[2].value == 1) {
                        return self.list.filter(function (item) {
                            return item.deleted == 1;
                        })
                    }

                }
            }

        },


        methods: {

            // 查询
            filter: function () {
                let newparams = getParams(this.params);
                this.getList(1, newparams);
            },

            //表单重置
            resetForm(formName) {
                if (formName === 'addFrom') {
                    this.$refs[formName].resetFields();
                } else {
                    this.editFrom = this.copy(this.tempFrom);
                }

            },

            //点击复选框id_list自动更新
            checkItems: function (ID) {
                if (this.id_list.indexOf(ID) >= 0) {
                    this.id_list.splice($.inArray(ID, this.id_list), 1);
                } else {
                    this.id_list.push(ID);
                }
            },

            // 关闭表单
            closeFrom(formName) {

                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].clearValidate();
                    this.$refs[formName].resetFields();
                    this.fileList = [];
                }

                this.addFrom.logo=''
                this.editFrom.logo=''
                if (this.$refs['my-upload'] !== undefined) {
                    this.$refs['my-upload'].clearFiles();
                }

            },


            // 上传成功后获取文件名
            handleAvatarSuccess(response, file) {
                this.addFrom.logo = "";
                this.addFrom.logo = file.name;
            },


            // 修改处的上传
            editHandleAvatarSuccess (response, file) {
                this.editFrom.logo = "";
                this.editFrom.logo = file.name;
            },


            //获取list 当前页面需要显示的内容
            getList: function (pageindex, conditions) {
                let self = this;
                self.pageindex = pageindex || 1;

                if(conditions !== undefined) {
                    self.conditions = conditions;
                }
                self.tableLoading = true;

                $.ajax({
                    url: 'getList',
                    type: "post",
                    data: {
                        pageindex: self.pageindex,
                        conditions: self.conditions
                    },
                    dataType: 'json',
                    success: function ( data ) {
                        self.list = data.list;

                        if (self.list != null) {
                            self.list.map(function (item) {
                                if (item.logo != null && item.logo != undefined) {
                                    item.logo = data.logoPath + item.edu_category_id +  '/' + item.logo;
                                }

                            })
                        }

                        self.pagenum = data.pageNum;
                        self.id_list = data.list.map((val) => '');
                        self.tableLoading = false;
                    },
                    error: handleError

                });
            },


            // 添加操作
            _add: function () {
                let self = this;

                if (self.addFrom.edu_category_name === "") {
                    self.$message({
                        type: 'warning',
                        message: '必填项不能为空!'
                    });
                } else {
                    self.addFrom.deleted = 0;
                    self.tableLoading = true;
                    $.ajax({
                        url: 'SubmitAddESM',
                        type: "post",
                        data: JSON.stringify(self.addFrom),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (data) {
                            if (data.record === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                self.addDialogVisible = false;
                                self.closeFrom('addFrom');
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '添加失败!'
                                });
                            }
                            self.tableLoading = false;
                            self.getList(self.pageindex, self.conditions);
                            self.addDialogVisible = false
                        },
                        error: handleError

                    });
                }


            },


            // 提交修改
            _submitEdit: function () {
                let self = this;

                if (self.editFrom.edu_category_name === "" ||
                    self.editFrom.deleted === "") {
                    self.$message({
                        type: 'warning',
                        message: '必填项不能为空!'
                    });
                } else {
                    self.tableLoading = true;
                    $.ajax({
                        url: 'SubmitEditESM',
                        type: "post",
                        data: JSON.stringify(self.editFrom),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (data) {

                            if (data.record === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                self.templist='';
                                self._edit(self.editFrom.edu_category_id);
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '修改失败!'
                                });
                            }
                            self.getList(self.pageindex, self.conditions);
                            self.tableLoading = false;
                        },
                        error: handleError

                    });
                }
            },


            copy(obj) {
                let objCopy = {}; // objCopy 将存储 mainObj 的副本
                objCopy = Object.assign({}, obj);
                return objCopy;
            },


            // 点击修改按钮
            _edit: function (ID) {
                let self = this;
                self.editDialogVisible = true;
                self.tableLoading = true;

                if (ID === 'previous') {
                    ID = self.editFrom.previous;
                }
                if (ID === 'next') {
                    ID = self.editFrom.next;
                }

                $.ajax({
                    url: 'DetailESM',
                    type: "post",
                    data: {
                        edu_category_id: ID
                    },
                    dataType: 'json',
                    success: function (data) {
                        self.editFrom = data.record;
                        if (self.editFrom.logo != null && self.editFrom.logo != undefined) {
                            self.fileList = [{
                                name: self.editFrom.logo,
                                url: data.logoPath + self.editFrom.edu_category_id +  '/' + self.editFrom.logo
                            }]
                        } else {
                            self.fileList = [];
                        }
                        self.tempFrom = self.copy(self.editFrom);
                    },
                    error: handleError

                });
                self.tableLoading = false;
            },


            _delete: function () {
                let self = this;

                if (this.idList.length > 0) {  //判断是否有选择
                    this.$confirm('您确定要删除这' + this.idList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        self.tableLoading = true;
                        $.post('DeleteESM', {
                            id_list: this.idList.join(','),
                        }, function (result) {

                            if (result.result === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '删除失败!'
                                });
                            }
                            self.getList(self.pageindex, self.conditions);
                        });

                    }).catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }
                else {
                    this.$message('请选择您要删除的记录，点击多选按钮选中！');
                    // alert('请选择您要删除的记录，点击多选按钮选中！');
                }


            },


        },

        // 过滤器
        filters: {
            // 将时间戳转化为日期格式
            formatDate(time) {
                if (time == null) {
                    return '';
                } else {
                    let date = new Date(time);
                    let y = date.getFullYear();
                    let m = (date.getMonth() + 1);
                    let d = date.getDate();
                    return y + '-' + ((m < 10)? '0' + m : m) + '-' + ((d < 10)? '0' + d : d);
                }
            },

            // 删除否文字化：0：否   1：是
            formatDel(deleted) {
                if (deleted == 0) {
                    return '否';
                } else if (deleted == 1) {
                    return '是';
                }
            }

        },

        // 初始化事件里边去调用查询方法
        created: function () {
            this.getList(1, '');
        }

    });
});