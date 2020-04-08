window.onload = function () {
    new Vue({
        el: ".right",
        data: {
            institutionlist: [],
            roletypelist: [],
            allmodulelist:[],
            Firstmodulelist:[],
            Secondmodulelist:[],
            rowspanCount: 0,
            typeselected:'',
            institutionselected:'',
            institutionenabled:false,
            txtrolename:'',
            txtrolememo:'',
            checkAll: false,
            isIndeterminate: true,
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            id: '',     //单选中的id
            idList: [], //多选选中的id数组，以,隔开
            tableLoading:false,
            pageLoading: false,
            dialogLoading:false,
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
            dpInstitution_SelectedIndexChanged: function(){
                let vm=this;
                vm.allmodulelist=[];
                vm.txtrolename=vm.institutionlist[vm.institutionlist.findIndex(val=>val.institutionNum===vm.institutionselected)].institutionName+vm.typeselected;
                vm.getmodulelist(vm.institutionselected);
                //alert(JSON.stringify(vm.allmodulelist))
            },
            dpType_SelectedIndexChanged: function(){
                let vm=this;
                vm.txtrolename=vm.institutionlist[vm.institutionlist.findIndex(val=>val.institutionNum===vm.institutionselected)].institutionName+vm.typeselected;
            },
            _reset: function(){
                let vm=this;
                vm.txtrolename='';
                vm.txtrolememo='';
            },
            _close: function(){
                window.location.href="RoleList_vue";
            },
            handleCheckAllChange(val) {
                let vm=this;
                vm.idList=val? vm.allmodulelist.map(val=>val.modulenum+"") : vm.allmodulelist.map(val=>'');
                //this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            submitadd:function(){
                let vm=this;
                if(vm.allmodulelist.length==0)
                {
                    ELEMENT.Message(
                        {
                            message: '请在【机构管理】->【机构模块管理】中先添加机构'+vm.institutionselected+'的权限',
                            type: 'warning'
                        }
                    );
                }
                else {
                    vm.pageLoading=true;
                    //alert(vm.idList);
                    let idlist=[];
                    vm.idList.forEach(function (val) {
                        if(val){
                            idlist.push(val);
                        }
                    })
                    $.post("submitAdd",
                        {RoleName: vm.txtrolename,
                            RoleMemo: vm.txtrolememo,
                            RoleInstitution:vm.institutionselected,
                            RolePosition:vm.typeselected,
                            IDList:idlist.join(',')},
                        function (data) {
                        if (data == "success") {
                            {
                                ELEMENT.Message(
                                    {
                                        message: '添加成功！',
                                        type: 'success'
                                    }
                                );
                                vm.pageLoading=false;
                                vm._close();
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
                        else
                        {
                            ELEMENT.Message(
                                {
                                    message: '添加失败！',
                                    type: 'error'
                                }
                            );
                            vm.pageLoading=false;
                        }
                    });

                }

            },
            //获取modulelist
            getmodulelist:function(InstitutionNum){
              let vm=this;
              $.ajax({
                  url: 'addmoduleList',
                  type: "post",
                  data:{InstitutionNum:InstitutionNum},
                  dataType:'json',
                  success:function (result) {
                      if(result.Firstmodulelist!=null)
                      {
                          let Firstmodulelist=result.Firstmodulelist;
                          let Secondmodulelist=result.Secondmodulelist;
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
                          // Console.log(JSON.stringify(list))
                          vm.allmodulelist=list;
                          /*vm.idList=Secondmodulelist.map((val)=>{
                              if(val.CanDo=='1')
                                  return val.ModuleNum;
                              else
                                  return '';});*/
                      }
                      else {
                          ELEMENT.Message(
                              {
                                  message: '该机构未获得模块操作权限，请联系管理员！',
                                  type: 'warning'
                              }
                          );
                      }
                  },
                  error: handleError
              });
            },
            //获取机构单位list
            getList: function () {
                let vm=this;
                vm.pageLoading=true;
                $.ajax({
                    url: 'InstitutionList',
                    type: "post",
                    data: {
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.institutionlist = result.list
                        vm.roletypelist = result.typeList
                        if (result.username == "admin" || result.username == "kuang")
                        {

                        }
                        else if (result.Institution != "")
                        {
                            vm.institutionselected = result.Institution;
                            vm.institutionenabled = true;
                        }

                        if(vm.institutionselected!='')
                        {
                            vm.getmodulelist(vm.institutionselected);
                        }

                        vm.pageLoading=false;

                    },
                    error: handleError
                });
            },
        },
        created: function () {
            this.getList();
        },
        mounted:function () {

        }
    });
}