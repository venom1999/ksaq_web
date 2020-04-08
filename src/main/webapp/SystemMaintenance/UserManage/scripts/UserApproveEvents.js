window.onload = function () {
    new Vue({
        el: "#right",
        data: {
            txtusername: '',
            txtInstitutionNum: '',
            txtInstitutionName: '',
            txtuserstate: '',
            txtrole: '',
            allmodulelist: [],
            Firstmodulelist: [],
            Secondmodulelist: [],
            rowspanCount: 0,
            checkAll: false,
            isIndeterminate: true,
            disabledSubmit: false,
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            tableLoading:false,
            id: '',     //单选中的id
            idList: [], //多选选中的id数组，以,隔开
            idList2: [],
            enabled: [],
            enabled2: [],
            pageLoading: false,
            params: [{
                label: '角色名称',
                type: 'plain',
                model: 'RoleName',
            }],
        },
        methods: {
            _close: function () {
                window.location.href = "UserList_vue";
            },
            handleCheckAllChange(val) {
                let vm = this;
                let idListBuffer = [];
                if (val) {
                    for (let i = 0; i < vm.idList2.length; i++) {
                        console.log(vm.enabled2[i])
                        if (!vm.enabled2[i])    //可编辑
                        {
                            idListBuffer.push(vm.allmodulelist[i].modulenum);
                        } else {
                            idListBuffer.push(vm.idList2[i]);
                        }
                    }
                } else {
                    for (let i = 0; i < vm.idList2.length; i++) {
                        if (!vm.enabled2[i])    //可编辑
                        {
                            idListBuffer.push("");
                        } else {
                            idListBuffer.push(vm.idList2[i]);
                        }
                    }
                }
                //console.log(vm.idList2)
                //console.log(idListBuffer)
                vm.idList2 = idListBuffer;
                vm.disabledSubmit = false;
                this.isIndeterminate = false;
            },
            _cbchange: function (index) {
                let vm = this;
                //let vm=this;
                if(vm.idList[index] == ''||vm.idList[index]==undefined)
                {
                    vm.idList2[index]=''
                }
                else {
                    let SecondModuleName=vm.allmodulelist[index].secondmodulename
                    if(SecondModuleName== "现场检查"
                        || SecondModuleName == "检查管理"
                        || SecondModuleName == "闭环管理"
                        || SecondModuleName == "作业申请"
                        || SecondModuleName == "作业审批"
                        || SecondModuleName == "标准更新"
                        || SecondModuleName == "标准申请"
                        || SecondModuleName == "标准审核")
                    {
                        vm.idList2[index]=vm.idList[index]
                    }
                }


                //vm.idList2[index] = "";
                vm.disabledSubmit = false;
            },
            _cbochange: function (modulenum, index) {
                let vm = this;
               // vm.idList[index] = modulenum;
               // vm.disabledSubmit = false;


                if(vm.idList2[index]==''||vm.idList2[index]==undefined)
                {
                    let SecondModuleName=vm.allmodulelist[index].secondmodulename
                    if(SecondModuleName== "现场检查"
                        || SecondModuleName == "检查管理"
                        || SecondModuleName == "闭环管理"
                        || SecondModuleName == "作业申请"
                        || SecondModuleName == "作业审批"
                        || SecondModuleName == "标准更新"
                        || SecondModuleName == "标准申请"
                        || SecondModuleName == "标准审核")
                    {
                        vm.idList[index]=''
                    }
                }
                else {
                    vm.idList[index]=vm.idList2[index]
                }
                vm.disabledSubmit = false;

            },



            _submitSave: function () {
                let vm = this;
                vm.tableLoading = true
                //alert(vm.idList);
                let idlist = [];
                let idlist2 = [];
                vm.idList.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                })
                vm.idList2.forEach(function (val) {
                    if (val) {
                        idlist2.push(val);
                    }
                })
                $.ajax({
                    url:'submitSaveApprove',
                    data:{
                        EmployeeID: vm.txtusername,
                        InstitutionNum: vm.txtInstitutionNum,
                        cbList: idlist.join(','),
                        cboList: idlist2.join(',')
                    },
                    type:'post',
                    success:function (data) {
                        if (data == "success") {
                            {
                                vm.disabledSubmit = true;
                                ELEMENT.Message(
                                    {
                                        message: '保存成功！',
                                        type: 'success'
                                    }
                                );
                                vm._close();
                            }
                        } else {
                            ELEMENT.Message(
                                {
                                    message: '保存失败！',
                                    type: 'error'
                                }
                            );
                        }
                        vm.tableLoading = false
                    },
                    error: handleError,
                })
            },
            //获取角色详细信息
            getUserInfo: function (EmployeeNum) {
                let vm = this;
                vm.tableLoading = true
                $.ajax({
                    url: 'userInfoListForApprove',
                    type: "post",
                    data: {EmployeeNum: EmployeeNum},
                    dataType: 'json',
                    success: function (result) {
                        if (result.state == "error") {
                            ELEMENT.Message(
                                {
                                    message: '还没有可操作模块！',
                                    type: 'error'
                                }
                            );
                        } else {
                            let userinfolist = result.UserInfoList;
                            vm.txtusername = userinfolist[0].username;
                            vm.txtInstitutionNum = userinfolist[0].InstitutionNum;
                            vm.txtuserstate = userinfolist[0].userstate;
                            vm.txtrole = userinfolist[0].txtrole;

                            let Firstmodulelist = result.Firstmodulelist;
                            let Secondmodulelist = result.Secondmodulelist;
                            let selectedModulelist=result.selectedModulelist;

                            /*let RoleSelectedModulelist = result.RoleSelectedModulelist;
                            let userselectedModulelist = result.userselectedModulelist;*/
                            let InstitutionSelectedModulelist = result.InstitutionSelectedModulelist;
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
                            vm.allmodulelist = list;

                            let flag1=true;
                            let flag2=true;
                            let flag3=true;
                            let flag4=true;
                            for(let m=0;m<list.length;m++)
                            {
                                for(let n=0;n<selectedModulelist.length;n++)
                                {
                                    if(list[m].modulenum == selectedModulelist[n].modulenum.substring(0,6))
                                    {
                                        flag1=false;
                                        if(flag4)
                                        {
                                            flag4=false;
                                            vm.idList.push(selectedModulelist[n].modulenum.substring(0,6));
                                            let CanDo='0'
                                            for(let s = 0;s<InstitutionSelectedModulelist.length;s++)
                                            {
                                                if((InstitutionSelectedModulelist[s].ModuleNum==selectedModulelist[n].modulenum.substring(0,6))&&InstitutionSelectedModulelist[s].CanDo == '1')
                                                {

                                                    CanDo='1'
                                                    break
                                                }

                                            }
                                            if(CanDo=='0'||list[m].modulenum=='090100'||list[m].modulenum=='090300'||list[m].modulenum=='090400'||list[m].modulenum=='090500')
                                            {
                                                vm.enabled2.push(true);
                                            }
                                            else {
                                                vm.enabled2.push(false);
                                            }

                                        }
                                        if((selectedModulelist[n].modulenum.substring(7,8) == "1")&&flag3)
                                        {
                                            flag3=false;
                                            flag2=false;
                                            vm.idList2.push(selectedModulelist[n].modulenum.substring(0,6));
                                        }
                                    }
                                }
                                if(flag1)
                                {
                                    vm.idList.push("");
                                    vm.enabled2.push(true);
                                }
                                if(flag2)
                                {
                                    vm.idList2.push("");
                                }
                                flag1=true;
                                flag2=true;
                                flag3=true;
                                flag4=true;
                            }
/*
                            let ModuleList = [];
                            for (let m = 0; m < RoleSelectedModulelist.length; m++) {
                                let RoleRight = RoleSelectedModulelist[m].RoleRight.split(';')
                                ModuleList = vm.uniqueArr(RoleRight);  //合并角色选取的模块
                            }
                            let userSelectedRight = userselectedModulelist[0].userRight.split(';')
                            for(let n = 0;n<ModuleList.length;n++)
                            {
                               for(let m=0;m<userSelectedRight.length;m++) {
                                   if (ModuleList[n].substring(0, 6) == userSelectedRight[m].substring(0, 6))
                                   {
                                       if((ModuleList[n].substring(7,8)=='1')||(userSelectedRight[m].substring(7,8)=='1'))
                                       {
                                           ModuleList[n] = ModuleList[n].substring(0, 6)+'-1';
                                       }
                                   }
                               }
                            }
                            let flag = true;
                            //debugger
                            if(ModuleList[ModuleList.length-1]=='')
                            {
                                ModuleList.splice(ModuleList.length-1,1);
                            }
                            //debugger
                            for(let n = 0;n<InstitutionSelectedModulelist.length;n++)
                            {
                                for(let m = 0;m<ModuleList.length;m++)
                                {
                                    if(InstitutionSelectedModulelist[n].ModuleNum == ModuleList[m].substring(0,6))
                                    {
                                        flag = false;
                                        if((InstitutionSelectedModulelist[n].CanDo == '1'))
                                        {
                                            vm.enabled.push(false);
                                            vm.enabled2.push(false);
                                            if(ModuleList[m].substring(7,8)=='1')
                                            {
                                                vm.idList.push(ModuleList[m].substring(0, 6));
                                                vm.idList2.push(ModuleList[m].substring(0, 6));
                                            }
                                            else {
                                                vm.idList.push(ModuleList[m].substring(0, 6));
                                                vm.idList2.push("");
                                            }

                                        }
                                        else {
                                            vm.enabled.push(false);
                                            vm.enabled2.push(true);
                                            vm.idList.push(ModuleList[m].substring(0, 6));
                                            vm.idList2.push("");
                                        }
                                        break;
                                    }
                                }
                                if(flag)
                                {
                                    vm.enabled.push(true);
                                    vm.enabled2.push(true);
                                    vm.idList.push("");
                                    vm.idList2.push("");
                                }
                                flag =true;
                            }*/

                            console.log(vm.idList)
                            console.log(vm.idList2)
                            console.log(vm.enabled)
                            console.log(vm.enabled2)
                           // debugger

                            vm.tableLoading = false;
                        }
                    },
                    error: handleError
                });
            },

            // 最简单数组去重法
            uniqueArr: function (array) {
                var n = []; //一个新的临时数组
                //遍历当前数组
                for (let i = 0; i < array.length; i++) {
                    //如果当前数组的第i已经保存进了临时数组，那么跳过，
                    //否则把当前项push到临时数组里面
                    if (n.indexOf(array[i]) == -1) n.push(array[i]);
                }
                return n;
            }
        },
        created: function () {
            this.disabledSubmit = false;
            this.getUserInfo(decrypt(GetRequest().EmployeeNum));
        },
        mounted: function () {

        }
    });
}