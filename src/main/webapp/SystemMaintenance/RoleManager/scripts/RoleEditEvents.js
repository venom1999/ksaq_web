window.onload = function () {
    new Vue({
        el: ".right",
        data: {
            roleID:-1,
            InsName:'',
            institutionlist: [],
            roletypelist: [],
            allmodulelist: [],
            Firstmodulelist: [],
            Secondmodulelist: [],
            rowspanCount: 0,
            typeselected: '',
            institutionselected: '',
            institutionenabled: false,
            typeEnabled: false,
            txtrolenameEnabled: false,
            txtrolememoEnabled: false,
            txtrolename: '',
            txtrolememo: '',
            checkAll: false,
            isIndeterminate: true,
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            id: '',     //单选中的id
            idList: [], //多选选中的id数组，以,隔开
            tableLoading: false,
            pageLoading: false,
            dialogLoading: false,
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible: false,
            params: [{
                label: '角色名称',
                type: 'plain',
                model: 'RoleName',
            }],
        },
        methods: {
            _close: function () {
                window.location.href = "RoleList_vue";
            },
            handleCheckAllChange(val) {
                let vm = this;
                vm.idList = val ? vm.allmodulelist.map(val => val.modulenum + "") : vm.allmodulelist.map(val => '');
                //this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            submitsave: function () {
                let vm = this;
                //alert(vm.idList);
                this.pageLoading=true;
                let idlist = [];
                vm.idList.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                })
                $.ajax({
                    url: 'submitSave',
                    type: "post",
                    data: {
                        roleID:vm.roleID,
                        RoleName: vm.txtrolename,
                        RoleMemo: vm.txtrolememo,
                        RoleInstitution: vm.institutionselected,
                        RolePosition: vm.typeselected,
                        IDList: idlist.join(',')
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data == "success") {
                            {
                                ELEMENT.Message(
                                    {
                                        message: '保存成功！',
                                        type: 'success'
                                    }
                                );
                                vm.pageLoading=false;
                            }
                        }
                        else if(data =="exist")
                        {
                            ELEMENT.Message(
                                {
                                    message: '角色名称重复，请更换角色名称！',
                                    type: 'warning'
                                }
                            );
                            vm.pageLoading=false;
                        }
                        else {
                            ELEMENT.Message(
                                {
                                    message: '保存失败！',
                                    type: 'error'
                                }
                            );
                            vm.pageLoading=false;
                        }
                    },
                    error: handleError
                })

            },

            //获取角色详细信息
            getRoleInfo: function () {
                let vm = this;
                $.ajax({
                    url: 'roleInfoList',
                    type: "post",
                    data: {
                        roleID:vm.roleID
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.InsName = result.InstitutionName
                        let roleinfolist = result.RoleInfoList;
                        vm.institutionselected = roleinfolist[0].RoleInstitution;
                        vm.institutionenabled = true;
                        vm.typeselected = roleinfolist[0].RolePosition;
                        vm.typeEnabled = true;
                        vm.txtrolename = roleinfolist[0].RoleName;
                        vm.txtrolenameEnabled = true;
                        vm.txtrolememo = roleinfolist[0].RoleMemo;
                        vm.txtrolememoEnabled = true;
                        let Firstmodulelist = result.Firstmodulelist;
                        let Secondmodulelist = result.Secondmodulelist;
                        let selectedModulelist = result.selectedModulelist;
                        let list = [];
                        let k = 0;
                        list[0] = {};
                        for (let i = 0; i < Firstmodulelist.length; i++) {
                            for (let j = 0; j < Secondmodulelist.length; j++) {
                                if (Firstmodulelist[i].ModuleNum.substring(0, 2) === Secondmodulelist[j].ModuleNum.substring(0, 2)) {
                                    vm.rowspanCount = vm.rowspanCount + 1;
                                    list[k] = {};
                                    list[k].firstmodulename = Firstmodulelist[i].ModuleName;
                                    list[k].secondmodulename = Secondmodulelist[j].ModuleName;
                                    list[k].modulenum = Secondmodulelist[j].ModuleNum;
                                    list[k++].Count = 0;
                                }
                            }
                            list[k - vm.rowspanCount].Count = vm.rowspanCount;
                            vm.rowspanCount = 0;
                        }
                        //alert(JSON.stringify(list))

                        vm.allmodulelist = list;
                        let flag = true;
                        for (let m = 0; m < list.length; m++) {
                            for (let n = 0; n < selectedModulelist.length; n++) {
                                if (list[m].modulenum == selectedModulelist[n].modulenum) {
                                    flag = false;
                                    vm.idList.push(selectedModulelist[n].modulenum);
                                }
                            }
                            if (flag) {
                                vm.idList.push("");
                            }
                            flag = true;
                        }

                        vm.pageLoading=false
                    },
                    error: handleError
                });
            },
        },
        created: function () {
            this.pageLoading=true;
            if (window.location.search != undefined) {
                this.roleID = Number(decrypt(GetRequest().roleID));
            }
            this.getRoleInfo();
        },
        mounted: function () {

        }
    });
}