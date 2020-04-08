window.onload = function () {
    new Vue({
        el: "#right",
        data: {
            allmodulelist: [],
            Firstmodulelist: [],
            Secondmodulelist: [],
            rowspanCount: 0,
            idList:[],
            idList2:[],

            checkAll: false,
            checkAll2:false,
            isIndeterminate: true,
            isIndeterminate2:true,

            InstitutionList:[],
            Institution:'',
            tableLoading:false,
            save_disabled:false,
        },
        computed: {
            IDList: function () {
                let vm = this;
                let idlist = [];
                vm.idList.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                })
                return idlist;
            },
            IDList2: function () {
                let vm = this;
                let idlist = [];
                vm.idList2.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                })

                return idlist;
            }
        },
        methods:{
            handleCheckAllChange(val) {
                let vm = this;
                vm.idList = val ? vm.allmodulelist.map(val => val.modulenum + "") : vm.allmodulelist.map(val => '');
                //this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },

            handleCheckAllChange2(val) {
                let vm = this;
                vm.idList2 = val ? vm.allmodulelist.map(val => val.modulenum + "") : vm.allmodulelist.map(val => '');
                //this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate2 = false;
            },

            //点击复选框否
            viewChange:function(index){
                let vm=this;

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

            },

            //点击复选框否
            adcChange:function(index){
                let vm = this;
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
            },

            //切换机构
            InstitutionChange:function(){
                let vm=this;
                vm.tableLoading=true
                vm.idList=[]
                vm.idList2=[]
                //alert(vm.Institution)
                $.ajax({
                    url:'loaddataforModule',
                    type: "post",
                    data:{Institution:vm.Institution},
                    dataType: 'json',
                    success: function (result) {
                        let mapList = result.mapList

                        let flag = true;
                        //alert(JSON.stringify(mapList))
                        for (let m = 0; m < vm.allmodulelist.length; m++) {
                            for (let n = 0; n < Object.keys(mapList).length; n++) {
                                if (vm.allmodulelist[m].modulenum == Object.keys(mapList)[n]) {
                                    flag = false;
                                    if(Object.values(mapList)[n]=='0')
                                    {
                                        vm.idList.push(Object.keys(mapList)[n]);
                                        vm.idList2.push("");
                                    }
                                    else {
                                        vm.idList.push(Object.keys(mapList)[n]);
                                        vm.idList2.push(Object.keys(mapList)[n]);
                                    }
                                }
                            }
                            if (flag) {
                                vm.idList.push("");
                                vm.idList2.push("");
                            }
                            flag = true;
                        }

                        vm.tableLoading = false;
                        vm.save_disabled=false;

                    },
                    error: handleError
                })
            },

            //保存
            submitSave:function() {
                let vm = this;
                let flag =true;
                vm.tableLoading=true;
                let roleRight='';
                console.log(JSON.stringify(vm.IDList))
                console.log(JSON.stringify(vm.IDList2))

                vm.IDList.forEach(function (item,index) {
                    if(vm.IDList2.indexOf(item)>=0||(item=='090100'||item == '090300'||item=='090400'||item=='090500'))
                    {
                        roleRight+=vm.IDList[index]+'-1;';
                    }
                    else {
                        roleRight+=vm.IDList[index]+'-0;';
                    }
                });

                $.post("updatePermissions", {
                    InstitutionNum:vm.Institution,roleRight:roleRight

                }, function (data) {
                    if (data.result == "success") {
                        ELEMENT.Message(
                            {
                                message: '保存成功！',
                                type: 'success'
                            }
                        );
                    }
                    else {
                        ELEMENT.Message(
                            {
                                message: '保存失败！',
                                type: 'error'
                            }
                        );
                    }
                    vm.tableLoading=false
                });

            },

            _close:function(){
                let vm=this;
                vm.Institution=''
                vm.getList();
            },

            getList:function () {
                let vm =this;
                vm.tableLoading = true;
                vm.InstitutionList = []
                vm.Firstmodulelist = []
                vm.Secondmodulelist = []
                $.ajax({
                    url:'getList_InstitutionModule',
                    type: "post",
                    dataType: 'json',
                    success: function (result) {
                        vm.InstitutionList =result.InstitutionList
                        vm.Firstmodulelist   = result.Firstmodulelist
                        vm.Secondmodulelist = result.Secondmodulelist

                        let Firstmodulelist = result.Firstmodulelist;
                        let Secondmodulelist = result.Secondmodulelist;
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
                        vm.idList=[]
                        vm.idList2=[]
                        vm.allmodulelist = list;


                        vm.tableLoading = false;
                        vm.save_disabled=true;

                    },
                    error: handleError
                })
            }
        },
        created: function () {
            this.getList();
        }
    });
}
