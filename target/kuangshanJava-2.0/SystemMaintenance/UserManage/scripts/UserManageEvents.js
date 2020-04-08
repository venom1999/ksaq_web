window.onload = function () {
    var padDate = function (va) {
        va = va < 10 ? '0' + va : va;
        return va
    }
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
            addDialogVisible: false,
            addDialogLoading:false,
            editDialogVisible: false,
            editLoading: false,
            disabled_edit:false,
            disabled_add:false,
            editType: '-1',
            AddedRoleList:[],

            TxtUserNum: '',
            TxtUserNumList: [],
            TxtUserNumSelected: '',
            TxtUserStateSelected: '1',
            leftRoleData: [],
            rightRoleList: [],
            oldrightRoleList: [],
            params: [{
                label: '用户姓名：',
                type: 'plain',
                model: 'EmployeeName',
            }, {
                label: '注册时间：',
                type: 'time',
                model: 'RegisterTime',
            }, {
                label: '用户状态：',
                type: 'select',
                model: 'UserState',
            }],
        },
        //日期格式化
        filters: {
            formatDate: function (val) {
                var value = new Date(val);
                var year = value.getFullYear();
                var month = padDate(value.getMonth() + 1);
                var day = padDate(value.getDate());
                var hour = padDate(value.getHours());
                var minutes = padDate(value.getMinutes());
                var seconds = padDate(value.getSeconds());
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;

            }
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
                this.getList('',params.join('and'))*/
            },
            submitAdd: function () {
                let vm = this;
                if (vm.TxtUserNumSelected == '') {
                    ELEMENT.Message(
                        {
                            message: '请输入用户！',
                            type: 'error'
                        }
                    );
                } else if (vm.rightRoleList.length == 0) {
                    ELEMENT.Message(
                        {
                            message: '目标列表中无角色！',
                            type: 'error'
                        }
                    );
                } else {
                    vm.disabled_add=true;
                    vm.addDialogLoading=true;
                    $.post("submitAdd", {
                        EmployeeNum: vm.TxtUserNumSelected,
                        State: vm.TxtUserStateSelected,
                        RoleList: vm.rightRoleList.join(',')
                    }, function (data) {
                        //alert(data)
                        if (data == "success") {
                            ELEMENT.Message(
                                {
                                    message: '添加成功！',
                                    type: 'success'
                                }
                            );
                            vm.addDialogLoading=false;
                            vm.addDialogVisible=false;
                            vm.getList();
                        } else if (data == "differ") {
                            ELEMENT.Message(
                                {
                                    message: '用户所在机构和角色所在机构不一致，请核对！',
                                    type: 'error'
                                }
                            );
                            vm.addDialogLoading=false;
                            vm.disabled_add=false;
                        } else if (data == "repeat") {
                            ELEMENT.Message(
                                {
                                    message: '该用户已经添加过！',
                                    type: 'error'
                                }
                            );
                            vm.addDialogLoading=false;
                            vm.disabled_add=false;
                        } else {
                            ELEMENT.Message(
                                {
                                    message: '保存失败！',
                                    type: 'error'
                                }
                            );
                            vm.addDialogLoading=false;
                            vm.disabled_add=false;
                        }
                    });

                }
            },
            async presubmitSave() {
                let vm = this;
                if (vm.rightRoleList.length == 0) {
                    ELEMENT.Message(
                        {
                            message: '目标列表中无角色！',
                            type: 'error'
                        }
                    );
                } else {
                    let isRoleOld = true;    //判断新的角色中是否包含旧角色
                    vm.AddedRoleList=[]
                    for (let i = 0; i < vm.rightRoleList.length; i++) {
                        if (vm.oldrightRoleList.indexOf(vm.rightRoleList[i]) == -1)       //新角色中存在旧角色不包含的
                        {
                            isRoleOld = false;
                            vm.AddedRoleList.push(vm.rightRoleList[i]);
                        }
                    }
                    if (isRoleOld && (vm.rightRoleList.sort().toString() == vm.oldrightRoleList.sort().toString())) {
                        vm.editType = '2';      //2代表角色未变
                    } else if (!isRoleOld)   //存在不包含的
                    {
                        for (let k = 0; k < vm.oldrightRoleList.length; k++) {
                            if (vm.rightRoleList.indexOf(vm.oldrightRoleList[k]) == -1)     //某些旧的角色不存在于新角色中
                            {
                                await vm.$confirm('修改用户对应角色后，将清空用户权限，您确定修改吗？', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    vm.editType = '1';      //1代表修改了角色，清空用户权限
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消修改'
                                    });
                                });
                            }
                        }
                        if (vm.editType == '-1')     //所有旧角色都在新角色中
                        {
                            vm.editType = '0';      //0代表增加了角色，增加用户权限
                        }
                    } else {              //存在修改或者删除角色的情况，提示用户清空权限
                        await vm.$confirm('修改用户对应角色后，将清空用户权限，您确定修改吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.editType = '1';      //1代表修改了角色，清空用户权限
                            //vm.pageLoading = true;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });
                    }
                }

            },
            async submitSave() {
                let vm = this;
                await vm.presubmitSave();
               // console.log(vm.rightRoleList+"      "+vm.oldrightRoleList+"     "+vm.editType)
                if (vm.editType != '-1') {
                    vm.pageLoading = true;
                    vm.disabled_edit=true;
                    $.ajax({
                        url: 'submitSave',
                        type: 'post',
                        data: {
                            TxtUserNum: vm.TxtUserNum,
                            State: vm.TxtUserStateSelected,
                            RoleList: vm.rightRoleList.join(','),
                            oldRoleList: vm.oldrightRoleList.join(','),
                            AddedRoleList: vm.AddedRoleList.join(','),
                            editType: vm.editType
                        },
                        dataType: 'json',
                        success:function (data) {
                            if (data == "success") {
                                ELEMENT.Message(
                                    {
                                        message: '更新成功！',
                                        type: 'success'
                                    }
                                );
                                vm.pageLoading = false;
                                vm.disabled_edit = false;
                            } else if (data == "differ") {
                                ELEMENT.Message(
                                    {
                                        message: '用户所在机构和角色所在机构不一致，请核对！',
                                        type: 'error'
                                    }
                                );
                                vm.pageLoading = false;
                                vm.disabled_edit = false;
                            } else {
                                ELEMENT.Message(
                                    {
                                        message: '更新失败！',
                                        type: 'error'
                                    }
                                );
                                vm.pageLoading = false;
                                vm.disabled_edit = false;
                            }
                        }
                    });
                    vm.editType='-1';
                }

            },
            _detail: function (ID) {
                window.location.href = "DetailUser_vue?EmployeeNum=" + encrypt(ID);
            },
            _authorization: function (ID) {
                window.location.href = "Authorization_vue?EmployeeNum=" + encrypt(ID);
            },
            _resetPassword: function (ID) {
                let vm = this;
                vm.$confirm('您确定要重置该用户的密码吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    $.post("resetPassword", {EmployeeNum: ID}, function (data) {
                        if (data == "success") {
                            {
                                vm.getList();
                                ELEMENT.Message(
                                    {
                                        message: '密码重置成功！',
                                        type: 'success'
                                    }
                                );
                            }
                        } else {
                            ELEMENT.Message(
                                {
                                    message: '密码重置失败！',
                                    type: 'error'
                                }
                            );
                        }
                    });

                    //vm.pageLoading = true;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消密码重置！'
                    });
                });

            },
            _delete: function () {
                let vm = this;
                if (vm.idList.length > 0) {
                    vm.$confirm('您确定要删除这' + vm.idList.length + '名用户吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.tableLoading = true;
                        $.post("deleteUser", {IDList: vm.idList.join(',')}, function (data) {
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
                        message: '请选择您要删除的用户，点击多选按钮选中！',
                        type: 'warning'
                    });
                }
            },

            //获取list
            getList: function (pageindex,conditions) {
                //alert(conditions)
                let vm = this;
                vm.pageindex = pageindex || 1;
                if(conditions!==undefined)
                {
                    vm.conditions = conditions;
                }
                vm.tableLoading = true;

                $.ajax({
                    url: 'UserList',
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
                      /*  vm.pageindex = pageindex
                        vm.conditions = conditions*/
                        vm.id_list = vm.list.map((val) => '')
                    },
                    error: handleError
                });
            },
            getTxtUserNum: function () {
                let vm = this;
                $.ajax({
                    url: 'getTxtUserNum',
                    type: "post",
                    data: {},
                    dataType: 'json',
                    success: function (result) {
                        vm.TxtUserNumSelected = '';
                        vm.TxtUserNumList = result.list
                        vm.leftRoleData = []
                        vm.rightRoleList = []
                        vm.addDialogVisible = true
                        vm.disabled_add=false
                    },
                    error: handleError
                });
            },
            TxtUserNumSelectedIndexChanged: function () {
                let vm = this;
                vm.addDialogLoading = true;
                let leftRoleList = [];
                vm.leftRoleData=[]
                $.ajax({
                    url: 'getRoleList',
                    type: "post",
                    data: {
                        employeenum: vm.TxtUserNumSelected
                    },
                    dataType: 'json',
                    success: function (result) {
                        leftRoleList = result.list
                        for (let i = 0; i < leftRoleList.length; i++) {
                            vm.leftRoleData.push({
                                key: leftRoleList[i].RoleID,
                                label: leftRoleList[i].RoleName
                            });
                        }
                        vm.addDialogLoading =false;
                    },
                    error: handleError
                });
            },
            getTxtUserNumForEdit: function (EmployeeNum) {
                let vm = this;
                vm.editDialogVisible = true
                vm.editLoading = true;
                vm.disabled_edit=false;
                $.ajax({
                    url: 'getTxtUserNumForEdit',
                    type: "post",
                    data: {
                        EmployeeNum: EmployeeNum
                    },
                    dataType: 'json',
                    success: function (result) {
                        let userinfo = result.userinfo;
                        vm.TxtUserNum = userinfo[0].EmployeeName + "-" + userinfo[0].EmployeeID;
                        vm.TxtUserStateSelected = userinfo[0].UserState;
                        vm.leftRoleData = []
                        vm.rightRoleList = []
                        vm.oldrightRoleList=[]
                        let leftRoleList = result.roleSourcelist
                        for (let i = 0; i < leftRoleList.length; i++) {
                            vm.leftRoleData.push({
                                key: leftRoleList[i].RoleID,
                                label: leftRoleList[i].RoleName
                            });
                        }

                        let rightRoleList = result.roleTargetlist
                        for (let j = 0; j < rightRoleList.length; j++) {
                            vm.rightRoleList.push(rightRoleList[j].RoleID);
                            vm.oldrightRoleList.push(rightRoleList[j].RoleID);
                        }
                        console.log(JSON.stringify(vm.leftRoleData))
                        console.log(JSON.stringify(vm.rightRoleList))
                        vm.editLoading = false;

                    },
                    error: handleError
                });
            },
            reset_add: function () {
                let vm = this;
                vm.TxtUserNumSelected = '';
                vm.TxtUserStateSelected = '1'
                vm.leftRoleData = []
                vm.rightRoleList = []
            }
        },
        created: function () {
            this.getList();
        }
    });
}