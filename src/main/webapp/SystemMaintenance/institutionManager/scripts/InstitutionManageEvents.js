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
            InstitutionList:[],
            InstitutionCategoryList: [],
            PeopleInChargeList: [],
            SecurityOfficerList:[],
            InstitutionPrefixList: [],
            tableLoading: false,
            pageLoading: false,
            dialogLoading: false,
            addDialogVisible: false,

            editDialogVisible: false,
            deleteDate:'',
            editLoading: false,
            disabled_edit: false,

            disabled_add: false,
            isDelete_disabled: false,
            InstitutionPrefix_disabled: true,
            SecurityOfficer_disabled:true,
            params: [{
                label: '机构名称：',
                type: 'select',
                model: 'InstitutionNum',
            },
                {
                    label: '机构类别：',
                    type: 'select',
                    model: 'InstitutionCategoryNum',
                },
                {
                label: '删除否：',
                type: 'select',
                model: 'IsDelete',
            }],
            record: {
                InstitutionNum: '',
                InstitutionName: '',
                InstitutionAbbr:'',
                category: '1',    //代表方
                institutionCategory: '',
                InstitutionPrefix: '',
                peopleInCharge: '',
                SecurityOfficer:'',
                isDelete: '',
                establishDate: '',
                deleteDate: '',
            },
            rules: {
                InstitutionNum: [{required: true, message: '编号不能为空', trigger: 'blur',}],
                InstitutionName: [{required: true, message: '名称不能为空', trigger: 'blur',}],
                InstitutionAbbr:[{required: true, message: '机构缩写不能为空', trigger: 'blur',}],
                category: [{required: true, message: '代表方不能为空', trigger: 'blur',}],
                institutionCategory: [{required: true, message: '机构类别不能为空', trigger: 'blur'}],
            },
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
                this.getList(1,params.join('and'))*/
            },

            //表单重置
            resetForm: function (formName) {
                let vm = this;
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                    this.$refs[formName].clearValidate();
                }
            },

            //添加
            getInfoForAdd: function () {
                let vm = this;
                //vm.reset_add();
                vm.resetForm('ruleForm');
                vm.PeopleInChargeList = []
                vm.SecurityOfficerList = []
                vm.addDialogVisible = true
                vm.disabled_add = false
                vm.SecurityOfficer_disabled =true
                vm.dialogLoading = true
                $.ajax({
                    url: 'getInfoForAdd',
                    type: "post",
                    data: {},
                    dataType: 'json',
                    success: function (result) {
                        vm.InstitutionCategoryList = result.InstitutionCategoryList
                        let PeopleInChargeList=result.PeopleInChargeList
                        vm.PeopleInChargeList = PeopleInChargeList
                        vm.SecurityOfficerList = PeopleInChargeList
                        vm.dialogLoading = false
                        vm.disabled_add = false
                    },
                    error: handleError
                });
            },
            reset_add: function () {
                let vm = this;
                vm.record.InstitutionNum = ''
                vm.record.InstitutionName = ''
                vm.record.category = '1'
                vm.record.institutionCategory = ''
                vm.InstitutionPrefix_disabled = true
                vm.record.InstitutionPrefix = ''
                vm.record.peopleInCharge = ''
                vm.record.SecurityOfficer = ''
            },
            institutionNumChange: function () {
                let vm = this;
                let InstitutionNum = vm.record.InstitutionNum
                if (InstitutionNum != undefined && InstitutionNum != "") {//    文件编号已填写
                    $.post("IsInstitutionNumExist", {InstitutionNum: InstitutionNum}, function (data) {
                        if (data == "success") {
                            //机构编号不存在，可以添加！
                            if(vm.record.InstitutionAbbr=='')
                            {
                                vm.record.InstitutionAbbr=InstitutionNum;
                            }
                        } else {
                            ELEMENT.Message({
                                message: '机构编号' + InstitutionNum + '已存在！',
                                type: 'warning'
                            });
                            vm.record.InstitutionNum = ''
                        }
                    });
                } else {

                }
            },
            categoryChange: function () {
                let vm = this;
                let InstitutionCategory = vm.record.institutionCategory;
                vm.record.InstitutionPrefix = ''
                if (InstitutionCategory == "5") {
                    vm.InstitutionPrefix_disabled = false
                    vm.SecurityOfficer_disabled = false
                    let category = vm.record.category;
                    $.ajax({
                        type: 'post',
                        url: 'getInstitutionPrefix',
                        data: {category: category},
                        dataType: 'json',
                        success: function (result) {
                            vm.InstitutionPrefixList = result.InstitutionPrefixList
                        }
                    });
                } else {
                    vm.InstitutionPrefixList = ''
                    vm.record.InstitutionPrefix = ''
                    vm.InstitutionPrefix_disabled = true
                    vm.SecurityOfficer_disabled =true
                    if(InstitutionCategory == "4"||InstitutionCategory == "3")
                    {
                        vm.SecurityOfficer_disabled =false
                    }
                }

            },
            institutionCategoryChange: function () {
                let vm = this;
                let InstitutionCategory = vm.record.institutionCategory
                vm.record.InstitutionPrefix = ''
                if (InstitutionCategory == "5" && vm.record.category != '') {
                    vm.InstitutionPrefix_disabled = false;
                    vm.SecurityOfficer_disabled =false
                    let category = vm.record.category;
                    $.ajax({
                        type: 'post',
                        url: 'getInstitutionPrefix',
                        data: {category: category},
                        dataType: 'json',
                        success: function (result) {
                            vm.InstitutionPrefixList = result.InstitutionPrefixList;
                        }
                    });
                } else {
                    vm.InstitutionPrefixList = ''
                    vm.record.InstitutionPrefix = ''
                    vm.InstitutionPrefix_disabled = true;
                    vm.SecurityOfficer_disabled =true
                    if((InstitutionCategory == "4" && vm.record.category != '')||(InstitutionCategory == "3" && vm.record.category != ''))
                    {
                        vm.SecurityOfficer_disabled =false
                    }
                }
            },
            submitAdd: function () {
                let vm = this
                this.$refs['ruleForm'].validate(function (valid) {
                    if (valid) {
                        $.ajax({
                            type: 'post',
                            url: 'SubmitAdd',
                            dataType: 'json',
                            data: {
                                InstitutionNum:vm.record.InstitutionNum,
                                InstitutionName:vm.record.InstitutionName,
                                InstitutionAbbr:vm.record.InstitutionAbbr,
                                peopleInCharge:vm.record.peopleInCharge,
                                SecurityOfficer:vm.record.SecurityOfficer,
                                category:vm.record.category,
                                institutionCategory:vm.record.institutionCategory,
                                InstitutionPrefix:vm.record.InstitutionPrefix
                            },
                            success: function (response) {
                                vm.dialogLoading = false
                                vm.disabled_add = true
                                if (response.result == 'success') {
                                    ELEMENT.Message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    vm.addDialogVisible=false
                                } else {
                                    ELEMENT.Message({
                                        message: '添加失败',
                                        type: 'error'
                                    });
                                }
                            },
                            error: handleError
                        })
                    } else {
                        ELEMENT.Message(
                            {
                                message: '请先完成输入！',
                                type: 'error'
                            }
                        );
                    }
                })

            },

            //修改
            _edit: function (institutionNum) {
                let vm = this;
                vm.resetForm('ruleForm');
                vm.editDialogVisible = true
                vm.dialogLoading = true
                vm. SecurityOfficer_disabled=true
                vm.isDelete_disabled = false
                vm.InstitutionPrefix_disabled = true
                vm.record.InstitutionPrefix=''
                $.ajax({
                    url: 'Edit',
                    type: "post",
                    data: {institutionNum: institutionNum},
                    dataType: 'json',
                    success: function (result) {
                        vm.InstitutionCategoryList = result.InstitutionCategoryList
                        vm.PeopleInChargeList = result.PeopleInChargeList
                        vm.SecurityOfficerList = result.PeopleInChargeList
                        let InstitutionInfo = result.InstitutionInfo
                        vm.record.InstitutionNum = InstitutionInfo[0].InstitutionNum
                        vm.record.InstitutionName = InstitutionInfo[0].InstitutionName
                        vm.record.InstitutionAbbr = InstitutionInfo[0].InstitutionAbbr
                        vm.record.category = InstitutionInfo[0].Category
                        vm.record.institutionCategory = InstitutionInfo[0].InstitutionCategoryNum
                        vm.record.peopleInCharge = InstitutionInfo[0].PeopleInCharge
                        vm.record.SecurityOfficer = InstitutionInfo[0].SecurityOfficer
                        vm.record.isDelete = InstitutionInfo[0].IsDelete
                        vm.record.establishDate = InstitutionInfo[0].EstablishDate
                        vm.record.deleteDate = InstitutionInfo[0].DeleteDate
                        if (vm.record.institutionCategory == '5') {
                            vm.InstitutionPrefix_disabled = false
                            let category = vm.record.category;
                            $.ajax({
                                type: 'post',
                                url: 'getInstitutionPrefix',
                                data: {category: category},
                                dataType: 'json',
                                success: function (result) {
                                    vm.InstitutionPrefixList = result.InstitutionPrefixList
                                }
                            });
                            vm.record.InstitutionPrefix = InstitutionInfo[0].InstitutionPrefix
                        }

                        if (vm.record.institutionCategory == '4'||vm.record.institutionCategory == '5'||vm.record.institutionCategory == '3')
                        {
                            vm. SecurityOfficer_disabled=false
                        }

                        if (vm.record.establishDate == '1970-01-01') {
                            vm.record.establishDate = ''
                        }
                        if (vm.record.deleteDate == '1970-01-01') {
                            vm.record.deleteDate = ''
                        }
                        if (vm.record.isDelete == '否') {
                            vm.isDelete_disabled = true
                        }
                        vm.dialogLoading = false
                    },
                    error: handleError
                });
            },
            isDeleteChange(){
                let vm =this;
                if(vm.record.isDelete=='否')
                {
                    vm.deleteDate = vm.record.deleteDate;
                    vm.record.deleteDate=''
                }
                else {
                    vm.record.deleteDate = vm.deleteDate
                }
            },
            submitSave: function () {
                let vm = this;
                this.$refs['ruleForm'].validate(function (valid) {

                    if (valid) {

                        vm.dialogLoading = true
                        $.ajax({

                            type: 'post',
                            url: 'Submitupdate',
                            data: {
                                InstitutionNum: vm.record.InstitutionNum,
                                InstitutionName: vm.record.InstitutionName,
                                InstitutionAbbr: vm.record.InstitutionAbbr,
                                peopleInCharge: vm.record.peopleInCharge,
                                SecurityOfficer: vm.record.SecurityOfficer,
                                category: vm.record.category,
                                institutionCategory:vm.record.institutionCategory,
                                InstitutionPrefix:vm.record.InstitutionPrefix,
                                establishDate:vm.record.establishDate,
                                deleteDate:vm.record.deleteDate,
                                isDelete:vm.record.isDelete
                            },
                            dataType: 'json',
                            success: function (response) {
                                vm.dialogLoading = false

                                if (response.result === 'success') {
                                    ELEMENT.Message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                } else {
                                    ELEMENT.Message({
                                        message: '修改失败',
                                        type: 'error'
                                    });
                                }
                            },
                            error: handleError
                        })
                    } else {
                        ELEMENT.Message(
                            {
                                message: '请先完成输入！',
                                type: 'error'
                            }
                        );
                    }

                })

            },

            _delete: function () {
                let vm = this;
                //alert(vm.idList.join(','))
                if (vm.idList.length > 0) {
                    vm.$confirm('删除机构需要删除该机构下的所有角色和用户，您确定要删除这' + vm.idList.length + '条机构吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.ajax({
                            type : "post",
                            url : "IsRoleExist",
                            data : {InstitutionNumList: vm.idList.join(',')},
                            async : false,
                            success : function(data){
                                if (data.result == "RoleNotNull") {
                                    //alert("请先删除与该机构对应的角色");
                                    ELEMENT.Message(
                                        {
                                            message: '请先删除与该机构对应的角色',
                                            type: 'warning'
                                        }
                                    );
                                } else {
                                    $.post("Delete",
                                        {InstitutionNumList: vm.idList.join(',')},
                                        function (data) {
                                        if (data.result == "success") {
                                            //alert("删除成功！");
                                            ELEMENT.Message(
                                                {
                                                    message: '删除成功！',
                                                    type: 'success'
                                                }
                                            );
                                            vm.getList()
                                        } else {
                                            ELEMENT.Message(
                                                {
                                                    message: '删除失败！',
                                                    type: 'error'
                                                }
                                            );
                                        }

                                    });
                                }
                            }
                        });
                        }
                    ).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    ELEMENT.Message(
                        {
                            message: '请选择您要删除的机构，点击多选按钮选中！',
                            type: 'warning'
                        }
                    );
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
                    url: 'InstitutionList',
                    type: "post",
                    data: {
                        conditions:vm.conditions,
                        pageindex:vm.pageindex,
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.tableLoading = false
                        //vm.pageLoading = false
                        vm.list = result.list
                        vm.InstitutionList = result.InstitutionList
                        vm.InstitutionCategoryList = result.InstitutionCategoryList
                        vm.list.map(function (item1,index1) {
                            vm.InstitutionList.map(function (item2,index2) {
                                if(item1.InstitutionNum==item2.institutionNum)
                                {
                                    vm.list[index1].InstitutionName = vm.InstitutionList[index2].institutionName
                                }

                            })
                        })

                        vm.pagenum = result.pagenum
                      /*  vm.pageindex = pageindex
                        vm.conditions = conditions*/
                        vm.id_list = vm.list.map((val) => '')
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