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
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible: false,
            params: [{
                label: '角色名称：',
                type: 'plain',
                model: 'RoleName',
            }],
        },
        computed:{
            idList:function () {
                let vm=this;
                let idlist=[];
                vm.id_list.forEach(function (val) {
                    if(val){
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
                this.getList(1,params.join('and'))*/
            },
            _add: function () {
                window.location.href = "AddRole_vue";
            },
            _detail: function(ID)
            {
                window.location.href = "DetailRole_vue?roleID="+encrypt(ID);
            },
            _edit: function (ID) {
                window.location.href = "EditRole_vue?roleID="+encrypt(ID);
            },
            _delete: function () {
                let vm = this;
                if (vm.idList.length > 0) {
                    vm.$confirm('删除角色前需删除该角色下对应用户，您确定要删除这' + vm.idList.length + '条角色吗??', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.tableLoading = true;
                        $.post("deleteRole", {IDList:vm.idList.join(',')}, function (data) {
                            if (data == "success") {
                                {
                                    ELEMENT.Message(
                                        {
                                            message: '删除成功！',
                                            type: 'success'
                                        }
                                    );
                                    vm.getList();
                                }
                            }
                            else if(data == "unable")
                            {
                                ELEMENT.Message(
                                    {
                                        message: '该角色已指派给用户，不能删除！',
                                        type: 'error'
                                    }
                                );
                                vm.tableLoading = false;
                            }
                            else {
                                ELEMENT.Message(
                                    {
                                        message: '删除失败！',
                                        type: 'error'
                                    }
                                );
                                vm.tableLoading = false;
                            }
                        });
                        //vm.getList();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    ELEMENT.Message({
                        message: '请选择您要删除的角色，点击多选按钮选中！',
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
                    url: 'RoleList',
                    type: "post",
                    data: {
                        conditions:vm.conditions,
                        pageindex:vm.pageindex,
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.tableLoading = false
                        //vm.pageLoading=false
                        vm.list = result.list
                        vm.pagenum = result.pagenum
                       /* vm.pageindex = pageindex
                        vm.conditions = conditions*/
                        vm.id_list=vm.list.map((val)=>'')
                    },
                    error: handleError
                });
            },
        },
        created: function () {
            this.getList();
        }
    });
}