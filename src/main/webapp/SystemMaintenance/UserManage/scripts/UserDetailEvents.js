window.onload = function () {
    new Vue({
        el: ".right",
        data: {
            txtusername:'',
            txtInstitutionNum:'',
            txtInstitutionName:'',
            txtuserstate:'',
            txtrole:'',
            allmodulelist:[],
            Firstmodulelist:[],
            Secondmodulelist:[],
            rowspanCount: 0,
            checkAll: false,
            isIndeterminate: true,
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            id: '',     //单选中的id
            idList: [], //多选选中的id数组，以,隔开
            idList2:[],
            tableLoading:false,
            pageLoading: false,
            params: [{
                label: '角色名称',
                type: 'plain',
                model: 'RoleName',
            }],
        },
        methods: {
            _close: function(){
                window.location.href="UserList_vue";
            },
            //获取用户详细信息
            getUserInfo:function(EmployeeNum){
                let vm=this;
                $.ajax({
                    url: 'userInfoList',
                    type: "post",
                    data: {
                        EmployeeNum:EmployeeNum
                    },
                    dataType: 'json',
                    success: function (result) {
                        let userinfolist=result.UserInfoList;
                        vm.txtusername=userinfolist[0].username;
                        vm.txtInstitutionNum=userinfolist[0].InstitutionNum;
                        vm.txtInstitutionName=userinfolist[0].InstitutionName;
                        vm.txtuserstate=userinfolist[0].userstate;
                        vm.txtrole=userinfolist[0].txtrole;

                        let Firstmodulelist=result.Firstmodulelist;
                        let Secondmodulelist=result.Secondmodulelist;
                        let selectedModulelist=result.selectedModulelist;
                        let list=[];
                        let k=0;
                        list[0]={};
                        for (let i=0;i<Firstmodulelist.length;i++) {
                            for(let j=0;j<Secondmodulelist.length;j++)
                            {
                                if(Firstmodulelist[i].ModuleNum.substring(0,2) === Secondmodulelist[j].ModuleNum.substring(0,2))
                                {
                                    vm.rowspanCount=vm.rowspanCount+1;
                                    list[k]={};
                                    list[k].firstmodulename=Firstmodulelist[i].ModuleName;
                                    list[k].secondmodulename=Secondmodulelist[j].ModuleName;
                                    list[k].modulenum=Secondmodulelist[j].ModuleNum;
                                    list[k++].Count=0;
                                }
                            }
                            list[k-vm.rowspanCount].Count=vm.rowspanCount;
                            vm.rowspanCount=0;
                        }
                        //alert(JSON.stringify(list))
                        vm.allmodulelist=list;
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
                        console.log(vm.idList)
                        console.log(vm.idList2)
                        vm.pageLoading=false;
                    },
                    error: handleError
                });
            },
        },
        created: function () {
            this.pageLoading = true;
            this.getUserInfo(decrypt(GetRequest().EmployeeNum));
        },
        mounted:function () {

        }
    });
}