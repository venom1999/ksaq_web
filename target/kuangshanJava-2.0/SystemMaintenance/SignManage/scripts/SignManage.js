window.onload = function () {
    new Vue({
        el: "#right",
        data: {
            list: [],
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            id: '',     //单选中的id
            id_list: [], //多选选中的id数组，以,隔开
            tableLoading: false,
            pageLoading: false,
            dialogLoading: false,


            TxtUserNumList: [],
            addLoading: false,
            disabled_add: false,
            addDialogVisible: false,

            editLoading: false,
            disabled_edit: false,
            editDialogVisible: false,

            params: [{
                label: '员工编号：',
                type: 'plain',
                model: 'EmployeeNum',
            },
                {
                    label: '员工姓名：',
                    type: 'plain',
                    model: 'EmployeeName',
                },
                {
                    label: '用户状态：',
                    type: 'select',
                    model: 'UserState',
                }],
            addFrom: {
                UserNum: '',
                UserName: '',
                UserState: '1',
                tag: 'Web',
            },

            rules: {
                UserName: [
                    {required: true, message: '请选择用户姓名', trigger: 'blur'}
                ]
            },
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
            clearRecord: function () {
                for (let i in this.record) {
                    this.record[i] = '';
                }
            },
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
                this.getList(params.join('and'))*/
            },

            //添加
            reset_add: function () {
                let vm = this;
                vm.addFrom.UserNum = '';
                vm.addFrom.UserName = '';
                vm.addFrom.UserState = '1'
            },
            getTxtUserNum: function () {
                let vm = this;
                vm.addDialogVisible = true
                vm.addLoading = true

                $.ajax({
                    url: 'getTxtUserNum',
                    type: "post",
                    data: {},
                    dataType: 'json',
                    success: function (result) {
                        vm.reset_add();
                        vm.TxtUserNumList = result.list
                        vm.addLoading = false
                        vm.disabled_add = false
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        vm.addDialogVisible = false
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                    },
                });
            },
            _add: function () {
                let vm = this;

                $.ajax({
                    url: 'submitAdd',
                    type: "post",
                    data: vm.addFrom,
                    success: function (data) {
                        if (data == "success") {
                            {
                                //vm.getList();
                                vm.disabled_add=true
                                ELEMENT.Message(
                                    {
                                        message: '添加成功！',
                                        type: 'success'
                                    }
                                );
                                vm.addDialogVisible=false
                            }
                        } else {
                            ELEMENT.Message(
                                {
                                    message: '添加失败！',
                                    type: 'error'
                                }
                            );
                        }

                    },
                    error: handleError
                });

            },

            //修改
            _edit: function (EmployeeNum) {
                let vm = this;
                vm.editDialogVisible = true
                vm.editLoading = true
                let UserNumList = []
                $.ajax({
                    url: 'editInfo',
                    type: "post",
                    data: {EmployeeNum: EmployeeNum},
                    dataType: 'json',
                    success: function (result) {
                        vm.reset_add();
                        UserNumList = result.list

                        vm.addFrom.UserNum = EmployeeNum
                        vm.addFrom.UserName = UserNumList[0].EmployeeInfo
                        vm.addFrom.UserState = result.UserState

                        vm.editLoading = false
                        vm.disabled_add = false
                    },
                    error: handleError
                });
            },
            _save: function () {
                let vm = this;
                $.ajax({
                    url: 'Save',
                    type: "post",
                    data: vm.addFrom,
                    success: function (data) {
                        if (data == "success") {
                            {
                                ELEMENT.Message(
                                    {
                                        message: '修改成功！',
                                        type: 'success'
                                    }
                                );
                            }
                        } else {
                            ELEMENT.Message(
                                {
                                    message: '修改失败！',
                                    type: 'error'
                                }
                            );
                        }
                        vm.getList();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        vm.addDialogVisible = false
                        ELEMENT.Message(
                            {
                                message: '添加失败！',
                                type: 'error'
                            }
                        );
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                    },
                });
            },

            _delete: function () {
                let vm = this;
                if (vm.idList.length > 0) {
                    vm.$confirm('您确定要删除这' + vm.idList.length + '名用户签名信息吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.post("delete", {IDList: vm.idList.join(',')}, function (data) {
                            if (data == "success") {
                                {
                                    vm.getList();
                                    ELEMENT.Message(
                                        {
                                            message: '删除成功！',
                                            type: 'success'
                                        }
                                    );
                                }
                            } else {
                                ELEMENT.Message(
                                    {
                                        message: '删除失败！',
                                        type: 'error'
                                    }
                                );
                            }
                        });

                        //vm.pageLoading = true;
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    ELEMENT.Message({
                        message: '请选择您要删除签名信息的用户，点击多选按钮选中！',
                        type: 'warning'
                    });
                }
            },

            //获取list
            getList: function (conditions, pageindex) {
                //alert(conditions)
                let vm = this;
                vm.pageindex = pageindex || 1;
                if(conditions!==undefined)
                {
                    vm.conditions = conditions;
                }
                vm.tableLoading = true;

                $.ajax({
                    url: 'SignList',
                    type: "post",
                    data: {
                        conditions:vm.conditions,
                        pageindex:vm.pageindex,
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.tableLoading = false
                        vm.pageLoading = false
                        vm.list = result.list
                        vm.pagenum = result.pagenum
                       /* vm.pageindex = pageindex
                        vm.conditions = conditions*/
                        vm.id_list = vm.list.map((val) => '')
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                    },
                });
            },
        },
        created: function () {
            this.pageLoading = true;
            this.getList();
        },
        mounted: function () {
            this.pageLoading = false
        }
    });
}