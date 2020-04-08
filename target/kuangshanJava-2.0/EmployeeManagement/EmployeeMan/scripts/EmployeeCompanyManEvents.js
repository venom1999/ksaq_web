window.onload = function () {
    var padDate = function (va) {
        va = va < 10 ? '0' + va : va;
        return va
    }

    new Vue({
        el: "#app",
        data: {
            InstitutionList: [],
            InstitutionListTemp:[],
            CurrentWorkList: [],
            WorkStyle: [],
            WorkPosition: [],
            WorkPositionTemp: [],
            WorkType: [],
            employeeList: [],
            employeeNumList:[],
            currentPosition:'',
            institutionnum:'',
            listindex:'',
            listsize:'',
            CertificateSpSum:'',
            CertificateSpList:[],
            CertificateSeSum:'',
            CertificateSeList:[],
            specialValidity:'',
            specialCurrentDate:'',
            specialWarningDate:'',
            detailForm: {
                EmployeeID: '',
                EmployeeNum:'',
                changePosition:'',
                EmployeeName: '',
                EmployeeSex: '男',
                EmployeeIDNum: '',
                EmployeeBirth: '',
                EmployeeTel: '',
                InstitutionNum: '',
                JoinCompanyDate: '',
                OnState: '1',
                WorkPositionNum: '',
                WorkStyleNum: '',
                OutCompanyOrNot: '0',
                OutCompanyDate: '',
                IsRetire:'0',
                RetireTime:'',
                Photo:'',
                HomeAddress: '',
                imageUrl: '',
                imageName: '',
                ThreeFlag: '',
                DeleteUserFlag:'',

            },
            record: {
                employeeID: '',
                employeeNum:'',
                changePosition:'',
                employeeName: '',
                employeeSex: '男',
                employeeIDNum: '',
                employeeBirth: '',
                employeeTel: '',
                institutionNum: '',
                joinCompanyDate: '',
                onState: '1',
                workPositionNum: '',
                workStyleNum: '',
                outCompanyOrNot: '0',
                outCompanyDate: '',
                isRetire:'0',
                retireTime:'',
                homeAddress: '',
                photo:'',
                imageUrl: '',
                imageName: '',
                ThreeFlag: '',
                DeleteUserFlag:'',

            },
            rules: {
                employeeID: [{required: true, message: '编号不能为空', trigger: 'blur',}],
                employeeName: [{required: true, message: '姓名不能为空', trigger: 'blur',}],
                employeeIDNum: [{required: true, message: '请填写身份证号码', trigger: 'blur'},
                    {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '身份证号码格式有误！',
                        trigger: 'blur'
                    }
                ],
                employeeTel: [{required: true, message: '电话不能为空', trigger: 'blur',},
                    {
                        //pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
                        pattern: /^(1[3|4|5|6|7|8|9][0-9]{9})|((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})$/,
                        message: '电话号码格式有误！',
                        trigger: 'blur'
                    }],
                institutionNum: [{required: true, message: '机构名称不能为空', trigger: 'blur',}],
                joinCompanyDate: [{required: true, message: '请选择日期', trigger: 'change'}],
            },
            pagenum: 0,
            pageindex: 0,
            conditions: '',
            exportsconditions:'',//导出时的条件
            id: '',     //单选中的id
            id_list: [], //多选选中的id数组，以,隔开
            tableLoading: false,
            pageLoading: false,
            dialogLoading: false,
            addDialogVisible: false,
            editDialogVisible: false,
            detailDialogVisible:false,
            certificateVisible:false,
            editLoading: false,
            detailLoading:false,
            certificateLoading:'',
            disabled_add: false,
            disabled_clear:true,

            OnStateDisabled:false,
            outCompanyDateDisabled:false,
            OutCompanyOrNotDisabled:false,
            RetireTimeDisabled:false,
            IsRetireDisabled:false,

            editType: '-1',
            TxtUserNum: '',
            TxtUserNumList: [],
            TxtUserNumSelected: '',
            TxtUserStateSelected: '1',
            leftRoleData: [],
            rightRoleList: [],
            oldrightRoleList: [],
            params: [{
                label: '员工姓名：',
                type: 'plain',
                model: 'EmployeeName',
            }, {
                label: '机构名称：',
                type: 'select',
                model: 'InstitutionNum',
            }, {
                label: '是否离职：',
                type: 'select',
                model: 'OutCompanyOrNot',
            }, {
                label: '用工形式：',
                type: 'select',
                model: 'WorkStyleNum',
            }, {
                label: '当前岗位：',
                type: 'select',
                model: 'WorkPositionNum',
            }, {
                label: '是否退休：',
                type: 'select',
                model: 'IsRetire',
            }],

            viewDialogVisible0: false,
            filePath: '',
            testdata:[{name:'test.pdf',type:'pdf',path:''}],

            activeName:'SpecialEquipEmployee',
            editableTabs:[],
            employeelist:[],
            filedetailDialogVisible: false,
            filetype: '',
            filePath: '',
            fileurl: '',
            templist: '',
            filetable:[],
            SpecialEquipEmployeeForm:{
                SpecialEquiementEmployeeID:'',
                EmployeeNum:'',
                EmployeeName:'',
                EmployeeIDNum:'',
                OpCategoryNum:'',
                OpCategoryName:'',
                OpItemNum:'',
                OpItemName:'',
                CertificateNum:'',
                CertificateName:'特种设备作业人员证',
                IssueInstitute:'',
                GetTime:'',
                Validity:'',
                UploadFileName:'',
                UploadPerson:'',
                UploadPersonName:'',
                UploadTime:new Date(new Date().toLocaleDateString()).getTime(),
                Memo:'',
                filetable: [],
                review:'',
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: '',
                listindex:-1,
                listsize:0
            },
            SpecialEquipEmployeeList:[],
            SpecialEquipEmployeeFormExist:false,
            SpecialManForm:{
                SpecialID:'',
                EmployeeNum:'',
                EmployeeIDNum:'',
                OpCategoryNum:'',
                OpItemNum:'',
                CertificateNum:'',
                CertificateName:'特种作业操作证',
                IssueInstitute:'',
                GetTime:'',
                // FirstDate:'',
                ReexamineTime:'',
                Validity:'',
                UploadFileName:'',
                UploadPerson:'',
                UploadPersonName:'',
                UploadTime:new Date(new Date().toLocaleDateString()).getTime(),
                Memo:'',
                review:'',
                filetable: [],
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: ''
            },
            SpecialManList:[],
            SpecialManFormExist:false,
            SecurityManForm:{
                id:'',
                EmployeeName:'',
                CertificateNum:'',
                CertificateName:'',
                IssueInstitute:'',
                IssueDate:'',
                FirstDate:'',
                Validity:'',
                UploadFileName:'',
                UploadPerson:'',
                UploadPersonName:'',
                UploadTime:'',
                filetable: [],
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: '',
            },
            SecurityManList:[],
            SecurityManFormExist:false,
            viewDialogVisible1: false,
            viewDialogVisible0: false,
            audioDialogVisible: false,
            picviewDialogVisible: false,
            title:''
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
            handleClick(tab, event) {
                this.activeName = tab.name;
            },
            filter: function () {
                let newparams=getParams(this.params);
                this.getList(1, newparams);
                /*let params = [];
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
            handleAvatarSuccess(res, file) {
                let vm = this;
                vm.record.imageUrl = URL.createObjectURL(file.raw);
                file.name = res.name;
                vm.record.imageName = file.name;
                vm.disabled_clear=false;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            //删除照片
            removePhoto:function(op)
            {
                let vm=this;
                vm.$refs['my-upload'].clearFiles();
                vm.record.imageUrl=''
                vm.record.imageName=''
                vm.disabled_clear=true
                if(op=='edit')
                {
                    vm.submitSave();
                }
            },


            //表单重置
            resetForm(formName) {
                if (this.$refs[formName]!==undefined) {
                    this.$refs[formName].clearValidate();
                    this.$refs[formName].resetFields();
                }
                this.record.imageUrl = ''
                this.record.imageName = ''
            },

            //添加
            showAddDialog:function()
            {
                let vm =this;
                vm.resetForm('record');
                vm.addDialogVisible=true
            },
            employeeNumChange: function () {
                let vm = this;
                if (vm.record.employeeID != undefined && vm.record.employeeID != "") {//员工编号已填写
                    $.post("IsEmployeeNumExist", {
                        EmployeeID: vm.record.employeeID
                    }, function (data) {
                        if (data == "error") {
                            vm.$message({
                                message: '公司或承包单位员工编号' + vm.record.employeeID + '已存在!',
                                type: 'warning'
                            });
                            vm.record.employeeID = '';
                        }
                    });
                } else {

                }
            },
            employeeIDNumChange: function () {
                let vm = this;
                if (vm.record.employeeIDNum.length == 18) {
                    vm.record.employeeBirth = vm.record.employeeIDNum.substring(6, 10) + '-' + vm.record.employeeIDNum.substring(10, 12) + '-' + vm.record.employeeIDNum.substring(12, 14);
                }
            },
            joinCompanyDateChange: function () {
                let vm = this;
                if (vm.record.joinCompanyDate != undefined && vm.record.joinCompanyDate != "") {
                    if (vm.record.employeeID != undefined && vm.record.employeeID != "") {
                        vm.record.ThreeFlag = '1'
                       /*
                        vm.$confirm('确定添加三级安全教育培训？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.record.ThreeFlag = '2'
                        }).catch(() => {
                            vm.record.ThreeFlag = '1'
                            this.$message({
                                type: 'info',
                                message: '不添加培训！'
                            });
                        });*/
                    } else {
                        vm.record.joinCompanyDate = ''
                        this.$message({
                            type: 'warning',
                            message: '请先填写员工编号！'
                        });
                    }
                }
            },

            submitAdd: function () {
                let vm = this
                this.$refs['record'].validate(function (valid) {
                    if (valid) {
                        vm.dialogLoading = true;
                        vm.record.photo = vm.record.imageName;
                        $.ajax({
                            type: 'post',
                            url: 'submitAdd',
                            data: JSON.stringify(vm.record),
                            // dataType: 'json',
                            contentType: 'text/javascript;charset=utf-8',
                            success: function (response) {
                                vm.dialogLoading = false;
                                if (response.result === 'success') {
                                    vm.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                   /* vm.disabled_add = true;
                                    vm.disabled_clear=true;*/
                                    vm.addDialogVisible=false
                                } else {
                                    vm.$message({
                                        message: '添加失败',
                                        type: 'error'
                                    });
                                }
                                //vm.getList(pageindex,conditions);
                            },
                            error: handleError
                        })
                    } else {
                        vm.$message(
                            {
                                message: '请先完成输入！',
                                type: 'error'
                            }
                        );
                    }

                })
            },

            //获取修改页面的信息
            getInfoForEdit:function(employeeNum) {
                let vm=this;
                vm.resetForm('record');
                vm.editDialogVisible=true;
                vm.editLoading=true;
                $.ajax({
                    url: 'getInfoForEdit',
                    type: "post",
                    data: {
                        employeeNum:employeeNum
                    },
                    dataType: 'json',
                    success: function (result) {
                        let EmployeeList=result.EmployeeList;
                        vm.record.employeeID = EmployeeList["EmployeeID"];
                        vm.record.employeeNum = EmployeeList["EmployeeNum"];
                        vm.record.employeeName = EmployeeList["EmployeeName"];
                        vm.record.employeeSex = EmployeeList["EmployeeSex"];
                        vm.record.institutionNum = EmployeeList["InstitutionNum"];
                        vm.record.joinCompanyDate = EmployeeList["JoinCompanyDate"];
                        vm.record.onState = EmployeeList["OnState"];
                        vm.record.outCompanyOrNot = EmployeeList["OutCompanyOrNot"];
                        vm.record.isRetire = EmployeeList["IsRetire"];
                        vm.record.homeAddress = EmployeeList["HomeAddress"];
                        vm.record.employeeIDNum=EmployeeList["EmployeeIDNum"];
                        vm.record.employeeTel=EmployeeList["EmployeeTel"];
                        vm.record.employeeBirth=EmployeeList["EmployeeBirth"];
                        vm.record.outCompanyDate= EmployeeList["OutCompanyDate"]=='1970-01-01'?'': EmployeeList["OutCompanyDate"];
                        vm.record.retireTime = EmployeeList["RetireTime"]=='1970-01-01'?'':EmployeeList["RetireTime"];
                        if(EmployeeList["OutCompanyOrNot"]=='0')
                        {
                            vm.outCompanyDateDisabled=true;
                        }
                        if(EmployeeList["IsRetire"]=='0')
                        {
                            vm.RetireTimeDisabled=true;
                        }
                        vm.record.photo = EmployeeList["Photo"];
                        vm.record.imageUrl='/kuangshanJava/EmployeePhoto/'+EmployeeList["Photo"];
                        vm.record.imageName=EmployeeList["Photo"];
                        if(EmployeeList["Photo"]==''||EmployeeList["Photo"]==null||EmployeeList["Photo"]==undefined)
                        {
                            vm.disabled_clear=true;
                            vm.record.imageUrl='';
                        }
                        else {
                            vm.disabled_clear=false;
                        }
                        vm.record.workPositionNum=EmployeeList["WorkPositionNum"]=='0'?'':EmployeeList["WorkPositionNum"];

                        vm.record.workStyleNum=EmployeeList["WorkStyleNum"]=='0'?'':EmployeeList["WorkStyleNum"];
                        vm.editLoading=false;
                    },
                    error: handleError
                });
            },

            outCompanyOrNotChange:function(){
                let vm=this;
                if(vm.record.outCompanyOrNot=='1')
                {
                    vm.outCompanyDateDisabled=false;
                    vm.record.outCompanyDate =new Date();
                    vm.record.onState = '0'
                    vm.OnStateDisabled = true
                    vm.record.isRetire = '0'
                    vm.IsRetireDisabled = true
                    vm.RetireTimeDisabled=true;
                }
                else {
                    vm.outCompanyDateDisabled=true;
                    vm.record.outCompanyDate = ''
                    vm.record.onState = '1'
                    vm.OnStateDisabled = false
                    vm.record.isRetire = '0'
                    vm.RetireTimeDisabled=true;
                    vm.IsRetireDisabled = false
                }
            },
            IsRetireChange:function(){
                let vm=this;
                if(vm.record.isRetire=='1')
                {
                    vm.RetireTimeDisabled=false;
                    vm.record.retireTime = new Date;
                    vm.record.onState = '0'
                    vm.OnStateDisabled = true
                    vm.record.outCompanyOrNot = '0'
                    vm.OutCompanyOrNotDisabled=true
                    vm.outCompanyDateDisabled=true;
                }
                else {
                    vm.RetireTimeDisabled=true;
                    vm.record.retireTime=''
                    vm.record.onState = '1'
                    vm.OnStateDisabled = false

                    vm.record.outCompanyOrNot = '0'
                    vm.OutCompanyOrNotDisabled=false
                    vm.outCompanyDateDisabled=true;
                }
            },
            InstitutionNumChange:function(){
                let vm = this;
                let InsNum=vm.institutionnum;
                $.post("SelectUser", { EmployeeID: vm.record.employeeID}, function (data) {
                    if (data == "yes") {
                        vm.$confirm('如果修改机构将删除该员工对应的用户信息，您确定要删除吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            vm.record.DeleteUserFlag = '1';
                        }).catch(() => {
                            vm.record.institutionNum=InsNum;
                        });
                    }
                });
            },
            workPositionNumChange: function(){
                let vm=this;
                if (vm.currentPosition != "" && vm.currentPosition != vm.record.workPositionNum && vm.record.workPositionNum != "") {

                    vm.record.changePosition = '0';

                    /*//调换岗位，添加调岗记录
                    //alert("调换岗位，添加调岗记录");
                    //当前岗位和改变岗位不同，添加调岗记录//if (currentWork != changeWork) {

                    vm.$confirm('确定添加调换岗位教育培训？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.record.changePosition = '1';
                    }).catch(() => {
                        vm.record.changePosition = '0';
                    });
*/
                }
            },
            submitSave: function() {
                let vm = this;
                this.$refs['ruleForm'].validate(function (valid) {
                    if (valid) {
                        vm.dialogLoading = true;
                        let idnum = vm.record.employeeIDNum;
                        let birth = vm.record.employeeBirth;
                        let tel = vm.record.employeeTel;
                        vm.record.photo = vm.record.imageName;

                        $.ajax({
                            type: 'post',
                            url: 'submitSave',
                            data: JSON.stringify(vm.record),
                            contentType: 'text/javascript;charset=utf-8',
                            success: function (response) {
                                vm.dialogLoading = false;
                                if (response.result === 'success') {
                                    vm.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });

                                } else {
                                    vm.$message({
                                        message: '修改失败',
                                        type: 'error'
                                    });
                                }
                                vm.record.employeeTel = tel;
                                vm.record.employeeBirth = birth;
                                vm.record.employeeIDNum = idnum;
                                vm.record.photo = vm.record.imageName;
                                //vm.getList();
                                //console.log(JSON.stringify(vm.employeeNumList));
                            },
                            error: handleError
                        })
                    } else {
                        vm.$message(
                            {
                                message: '请先完成输入！',
                                type: 'error'
                            }
                        );
                    }

                })

            },

            //详细
            getInfoForDetail:function(EmployeeNum) {
                let vm=this;
                vm.detailDialogVisible=true;
                vm.detailLoading=true;
                $.ajax({
                    url: 'getInfoForDetail',
                    type: "post",
                    data: {
                        EmployeeNum:EmployeeNum
                    },
                    dataType: 'json',
                    success: function (result) {
                        let EmployeeList=result.EmployeeList;
                        for(let key in vm.detailForm){
                            vm.detailForm[key] = EmployeeList[key];
                        }
                        vm.detailForm.OutCompanyDate= vm.detailForm.OutCompanyDate=='1970-01-01'?'': vm.detailForm.OutCompanyDate;
                        vm.detailForm.RetireTime=vm.detailForm.RetireTime=='1970-01-01'?'':vm.detailForm.RetireTime;
                        if(vm.detailForm.OutCompanyOrNot=='0')
                        {
                            vm.outCompanyDateDisabled=true;
                        }
                        if(vm.detailForm.IsRetire=='0')
                        {
                            vm.RetireTimeDisabled=true;
                        }
                        vm.detailForm.imageUrl='/kuangshanJava/EmployeePhoto/'+vm.detailForm.Photo;
                        vm.detailForm.imageName=vm.detailForm.Photo;
                        if(vm.detailForm.Photo==""||vm.detailForm.Photo==null||vm.detailForm.Photo==undefined)
                        {
                            vm.disabled_clear=true;
                            vm.detailForm.imageUrl='';
                        }
                        else {
                            vm.disabled_clear=false;
                        }
                        vm.detailForm.WorkPositionNum=vm.detailForm.WorkPositionNum=='0'?'':vm.detailForm.WorkPositionNum;

                        vm.detailForm.WorkStyleNum=vm.detailForm.WorkStyleNum=='0'?'':vm.detailForm.WorkStyleNum;
                        for(let i=0;i<vm.employeeNumList.length;i++)
                        {
                            if(EmployeeList.EmployeeNum == vm.employeeNumList[i])
                            {
                                vm.listindex=i
                            }
                        }
                        //alert(vm.listindex)
                        console.log(JSON.stringify(vm.employeeNumList));
                        vm.detailLoading=false;
                    },
                    error: handleError
                });
            },

            closeForm(formName){
                if(this.$refs[formName]!=undefined) {
                    this.$refs[formName].clearValidate();
                    this.$refs[formName].resetFields();
                    this.SpecialEquipEmployeeFormExist = false;
                    this.SpecialManFormExist = false;
                    this.SecurityManFormExist = false;
                    this.SpecialEquipEmployeeList = [];
                    this.SpecialManList = [];
                    this.SecurityManList = [];
                    this.activeName = 'SpecialEquipEmployee';
                }
            },
            // 证书
            getInfoForCertificate:function(EmployeeNum){
                let vm=this;
                vm.tableLoading = true;
                $.ajax({
                    url:'getInfoForCertificate',
                    type:"post",
                    data:{
                        EmployeeNum:EmployeeNum
                    },
                    success:function(result){
                        let data = result;
                        if(data.certificatenums=='0'){
                            vm.tableLoading = false;
                            vm.$message({
                                type:'warning',
                                message:'该员工暂无证书信息'
                            });
                        }else {
                            vm.tableLoading = false;
                            vm.certificateVisible=true;
                            vm.certificateLoading=true;
                            vm.SpecialEquipEmployeeFormExist = false;
                            vm.SpecialManFormExist = false;
                            vm.SecurityManFormExist = false;
                            vm.activeName = 'SpecialEquipEmployee';
                            //特种设备作业证书
                            vm.SpecialEquipEmployeeForm.listsize = data.specialequipnum;
                            vm.SpecialEquipEmployeeForm.listindex = 0;
                            if(vm.SpecialEquipEmployeeForm.listsize>0){
                                vm.SpecialEquipEmployeeList = data.specialequip;
                                for (var key in vm.SpecialEquipEmployeeList[vm.SpecialEquipEmployeeForm.listindex]) {
                                    vm.SpecialEquipEmployeeForm[key] = vm.SpecialEquipEmployeeList[vm.SpecialEquipEmployeeForm.listindex][key];
                                }
                                vm.SpecialEquipEmployeeForm.EmployeeIDNum = decrypt(vm.SpecialEquipEmployeeForm.EmployeeIDNum);
                                let specialequipfilenamelist = [];
                                if(vm.SpecialEquipEmployeeForm.UploadFileName!=null){
                                    specialequipfilenamelist = vm.SpecialEquipEmployeeForm.UploadFileName.split('?');
                                }
                                vm.SpecialEquipEmployeeForm.filetable = [];
                                for (var i = 0; i < specialequipfilenamelist.length; i++) {
                                    if (specialequipfilenamelist[i] !== "") {
                                        vm.SpecialEquipEmployeeForm.filetable.push({name: specialequipfilenamelist[i]});
                                    }
                                }
                                vm.SpecialEquipEmployeeFormExist = true;
                            }
                            //特种作业证书
                            vm.SpecialManForm.listsize = data.specialmannum;
                            vm.SpecialManForm.listindex = 0;
                            if(vm.SpecialManForm.listsize>0){
                                vm.SpecialManList = data.specialman;
                                // console.log("specialman:"+JSON.stringify(vm.SpecialManList)+";listindex:"+vm.SpecialManForm.listindex);
                                for (var key in vm.SpecialManList[vm.SpecialManForm.listindex]) {
                                    vm.SpecialManForm[key] = vm.SpecialManList[vm.SpecialManForm.listindex][key];
                                }
                                vm.SpecialManForm.EmployeeIDNum = decrypt(vm.SpecialManForm.EmployeeIDNum);
                                let specialfilenamelist = [];
                                if(vm.SpecialManForm.UploadFileName!=null){
                                    specialfilenamelist = vm.SpecialManForm.UploadFileName.split('?');
                                }
                                vm.SpecialManForm.filetable = [];
                                for (var i = 0; i < specialfilenamelist.length; i++) {
                                    if (specialfilenamelist[i] !== "") {
                                        vm.SpecialManForm.filetable.push({name: specialfilenamelist[i]});
                                    }
                                }
                                vm.SpecialManFormExist = true;
                            }
                            //安全管理人员证书
                            vm.SecurityManForm.listsize = data.securitymannum;
                            vm.SecurityManForm.listindex = 0;
                            if(vm.SecurityManForm.listsize>0){
                                vm.SecurityManList = data.securityman;
                                for (var key in vm.SecurityManList[vm.SecurityManForm.listindex]) {
                                    vm.SecurityManForm[key] = vm.SecurityManList[vm.SecurityManForm.listindex][key];
                                }
                                vm.SecurityManForm.EmployeeIDNum = decrypt(vm.SecurityManForm.EmployeeIDNum);
                                let securityfilenamelist = [];
                                if(vm.SecurityManForm.UploadFileName!=null){
                                    securityfilenamelist = vm.SecurityManForm.UploadFileName.split('?');
                                }
                                vm.SecurityManForm.filetable = [];
                                for (var i = 0; i < securityfilenamelist.length; i++) {
                                    if (securityfilenamelist[i] !== "") {
                                        vm.SecurityManForm.filetable.push({name: securityfilenamelist[i]});
                                    }
                                }
                                vm.SecurityManFormExist = true;
                            }
                        }
                        let EmployeeList=result.EmployeeList;
                        vm.certificateLoading=false;
                    },
                    error:handleError
                });
            },
            //上一条下一条_特种设备
            SpecialEquipDetail:function(index){
                let vm = this;
                for (var key in vm.SpecialEquipEmployeeList[index]) {
                    vm.SpecialEquipEmployeeForm[key] = vm.SpecialEquipEmployeeList[index][key];
                }
                let sequipfilenamelist = [];
                if(vm.SpecialEquipEmployeeForm.UploadFileName!=null){
                    sequipfilenamelist = vm.SpecialEquipEmployeeForm.UploadFileName.split('?');
                }
                vm.SpecialEquipEmployeeForm.filetable = [];
                for (var i = 0; i < sequipfilenamelist.length; i++) {
                    if (sequipfilenamelist[i] !== "") {
                        vm.SpecialEquipEmployeeForm.filetable.push({name: sequipfilenamelist[i]});
                    }
                }
            },
            SpecialDetail:function(index){
                let vm = this;
                for (var key in vm.SpecialManList[index]) {
                    vm.SpecialManForm[key] = vm.SpecialManList[index][key];
                }
                let specialfilenamelist = [];
                if(vm.SpecialManForm.UploadFileName!=null){
                    specialfilenamelist = vm.SpecialManForm.UploadFileName.split('?');
                }
                vm.SpecialManForm.filetable = [];
                for (var i = 0; i < specialfilenamelist.length; i++) {
                    if (specialfilenamelist[i] !== "") {
                        vm.SpecialManForm.filetable.push({name: specialfilenamelist[i]});
                    }
                }
            },
            SecurityDetail:function(index){
                let vm = this;
                for (var key in vm.SecurityManList[index]) {
                    vm.SecurityManForm[key] = vm.SecurityManList[index][key];
                }
                var sufilenamelist = [];
                if(vm.SecurityManForm.UploadFileName!=null){
                    sufilenamelist = vm.SecurityManForm.UploadFileName.split('?');
                }
                vm.SecurityManForm.filetable = [];
                for (var i = 0; i < sufilenamelist.length; i++) {
                    if (sufilenamelist[i] !== "") {
                        vm.SecurityManForm.filetable.push({name: sufilenamelist[i]});
                    }
                }
            },
            _downloadone: function (ID, name, flag) {
                console.log("id:"+ID+";name:"+name);
                let url = '';
                if(flag==='specialequip'){
                    url='/kuangshanJava/EmployeeManagement/SpecialEquipMan/downloadFile';
                }else if(flag==='special'){
                    url='/kuangshanJava/EmployeeManagement/SpecialMan/downloadFile';
                }else if(flag==='security'){
                    url='/kuangshanJava/EmployeeManagement/SecurityMan/downloadFile';
                }
                httpPost_aes(url, {
                    filename: name,
                    id: ID
                })
            },
            _viewFile: function (ID, name, flag) {
                var self = this;
                console.log("ID:"+ID+"name:"+name);
                const loading = this.$loading({
                    lock: true,
                    text: '加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let url = '';
                if(flag==='specialequip'){
                    url='/kuangshanJava/EmployeeManagement/SpecialEquipMan/viewFile';
                    self.title = '查看特种设备作业人员证书信息';
                }else if(flag==='special'){
                    url='/kuangshanJava/EmployeeManagement/SpecialMan/viewFile';
                    self.title = '查看特种作业人员证书信息';
                }else if(flag==='security'){
                    url='/kuangshanJava/EmployeeManagement/SecurityMan/viewFile';
                    self.title = '查看安全管理人员证书信息';
                }
                $.ajax({
                    url: url,
                    type: "post",
                    data: {
                        filename: name,
                        id: ID
                    },
                    // contentType: 'application/x-www-form-urlencoded',
                    success: function (data) {
                        if (data != "") {
                            var result = data;
                            loading.close();
                            self.filePath = '../../' + result.filepath+"?temp=" + Math.random();
                            if (result.type == 'mp4' || result.type == 'webm' || result.type == 'ogg') {
                                self.filetype = 'video/' + result.type;
                                self.viewDialogVisible1 = true;
                                //   var url = '../../' + result.filepath
                                var Player = videojs("videoex");  //初始化视频
                                Player.src(self.filePath);  //重置video的src
                                Player.load(self.filePath);  //使video重新加载
                                Player.play();
                            } else if (result.type == 'pdf' || result.type == 'html') {
                                self.viewDialogVisible0 = true;
                            } else if (result.type == 'jpg' || result.type == 'png' || result.type == 'gif') {
                                //
                                self.picviewDialogVisible = true;
                            } else if (result.type == 'mp3' || result.type == 'wav' || result.type == 'flac') {
                                //
                                self.filetype = 'audio/' + result.type;

                                self.audioDialogVisible = true;
                                var music = document.getElementById('audio');
                                music.load();
                            } else {
                                self.$message({
                                    type: 'info',
                                    message: '该文件暂不支持浏览!'
                                })
                            }
                        } else {
                            loading.close();
                            self.$message({
                                type: 'info',
                                message: '加载失败!'
                            })
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                    },

                });
            },
            closevideoDialog: function () {

                var Player = videojs("videoex");  //初始化视频

                Player.pause();

            },
            closevideoDialog1: function () {
                var music = document.getElementById('audio');
                music.pause();


            },
            _view: function (ID) {
                var self = this;
                self.ID = ID;
                $.ajax({
                    url: "getfile",
                    type: "post",
                    data: {
                        id: ID,
                    },
                    success: function (data) {
                        if (data == "") {
                            self.$message({
                                type: 'info',
                                message: '无相关文件!'
                            })
                        }
                        else {
                            var filelist = data.split('?');
                            //
                            if (filelist[1] == "") {
                                self._viewFile(ID, filelist[0]);
                            } else {
                                self.filetable = [];
                                for (var i = 0; i < filelist.length; i++) {
                                    if (filelist[i] != "") {
                                        self.filetable.push({name: filelist[i]});                                //     self.detailFrom.filetable.push({type: filenamelist[i].split('.')[filenamelist[i].split('.').length]});
                                    }
                                }
                                self.filedetailDialogVisible = true;
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                    },

                });
            },
            _download: function (ID) {
                var self = this;
                self.ID = ID;
                $.ajax({
                    url: "getfile",
                    type: "post",
                    data: {
                        id: ID,
                    },
                    success: function (data) {
                        if (data == "") {
                            self.$message({
                                type: 'info',
                                message: '无相关文件!'
                            })
                        }
                        else {

                            var filelist = data.split('?');

                            if (filelist[1] == "") {
                                self._downloadone(ID, filelist[0]);
                            } else {
                                self.filetable = [];
                                for (var i = 0; i < filelist.length; i++) {
                                    if (filelist[i] != "") {
                                        self.filetable.push({name: filelist[i]});                                //     self.detailFrom.filetable.push({type: filenamelist[i].split('.')[filenamelist[i].split('.').length]});
                                    }
                                }
                                self.filedetailDialogVisible = true;
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
                    },

                });
            },

            getDetail:function(index) {
                let vm=this;
                vm.detailDialogVisible=true;
                vm.detailLoading=true;
                vm.listindex=index;
                //alert(index)
                $.ajax({
                    url: 'getInfoForDetail',
                    type: "post",
                    data: {
                        EmployeeNum:vm.employeeNumList[index]
                    },
                    dataType: 'json',
                    success: function (result) {
                        let EmployeeList=result.EmployeeList;
                        for(let key in vm.detailForm){
                            vm.detailForm[key] = EmployeeList[key];
                        }
                        vm.detailForm.OutCompanyDate= vm.detailForm.OutCompanyDate=='1970-01-01'?'': vm.detailForm.OutCompanyDate;
                        vm.detailForm.RetireTime=vm.detailForm.RetireTime=='1970-01-01'?'':vm.detailForm.RetireTime;
                        if(vm.detailForm.OutCompanyOrNot=='0')
                        {
                            vm.outCompanyDateDisabled=true;
                        }
                        if(vm.detailForm.IsRetire=='0')
                        {
                            vm.RetireTimeDisabled=true;
                        }
                        vm.detailForm.imageUrl='/kuangshanJava/EmployeePhoto/'+vm.detailForm.Photo;
                        vm.detailForm.imageName=vm.detailForm.Photo;
                        if(vm.detailForm.Photo==''||vm.detailForm.Photo==null||vm.detailForm.Photo==undefined)
                        {
                            vm.disabled_clear=true;
                            vm.detailForm.imageUrl='';
                        }
                        else {
                            vm.disabled_clear=false;
                        }
                        vm.detailForm.WorkPositionNum=vm.detailForm.WorkPositionNum=='0'?'':vm.detailForm.WorkPositionNum;

                        vm.detailForm.WorkStyleNum=vm.detailForm.WorkStyleNum=='0'?'':vm.detailForm.WorkStyleNum;
                        vm.detailLoading=false;
                    },
                    error: handleError
                });
            },

            //导出
            _export: function () {
                if(this.conditions==undefined)
                {
                    httpPost_aes('Export', {
                        conditions:'',
                        exportsconditions: ''
                    });
                }
                else {
                    httpPost_aes('Export', {
                        conditions:this.conditions,
                        exportsconditions: this.exportsconditions
                    });
                }





              /*  let params = [];
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
               // alert(params.join('and'))
                httpPost('Export', {
                    conditions: params.join('and')
                });*/
            },

            //证书
            getCertificate:function(EmployeeNum,EmployeeName){
                let vm = this;
                vm.certificateVisible=true;
                vm.certificateLoading=true;

                $.ajax({
                    url: 'getCertificate',
                    type: "post",
                    data: {
                        EmployeeNum:EmployeeNum,
                        EmployeeName:EmployeeName
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.CertificateSpSum=result.specialSum;
                        vm.CertificateSeSum=result.securitySum;
                        if(result.specialSum>0)
                        {
                            vm.CertificateSpList=result.specialList;
                        }
                        if(result.securitySum>0)
                        {
                            vm.CertificateSeList=result.securityList;
                        }
                        vm.firstClick();
                        vm.certificateLoading=false;
                    },
                    error: handleError
                });
            },

            firstClick:function()
            {
                $('#second').removeClass('current');
                $('#first').addClass('current');

                $('#FirstMenu').hide();
                $('#secondMenu').hide();
                $('#none').hide();

                let vm=this;
                if(vm.CertificateSpSum !=0)
                {
                    $('#FirstMenu').show();
                    //vm.specialValidity=vm.CertificateSpList[0]
                }
                else {
                    $('#none').show();
                }


               /* if (speAndSecRight.search("special") == -1 && speAndSecRight != "") {       //从员工关联信息页面跳转过来，用来限制是否有权限查看对应信息
                    $('#FirstMenu').hide();
                    $('#secondMenu').hide();
                    $('#noRight').show();
                }
                else
                    $('#noRight').hide();*/
            },

            secondClick:function()
            {
                $('#first').removeClass('current');
                $('#second').addClass('current');

                $('#FirstMenu').hide();
                $('#secondMenu').hide();
                $('#none').hide();

                let vm=this;
                if(vm.CertificateSeSum !=0)
                {
                    $('#secondMenu').show();
                }
                else {
                    $('#none').show();
                }


                /* if (speAndSecRight.search("special") == -1 && speAndSecRight != "") {       //从员工关联信息页面跳转过来，用来限制是否有权限查看对应信息
                     $('#FirstMenu').hide();
                     $('#secondMenu').hide();
                     $('#noRight').show();
                 }
                 else
                     $('#noRight').hide();*/
            },


            getInfoList: function () {
                let vm = this;
                $.ajax({
                    url: 'getInfoList',
                    type: "post",
                    data: {},
                    dataType: 'json',
                    success: function (result) {
                        vm.InstitutionListTemp = result.InstitutionList;
                       // vm.CurrentWorkList = result.CurrentWorkList;
                        vm.WorkStyle = result.WorkStyle;
                        vm.WorkPositionTemp = result.WorkPosition;
                       // vm.WorkType = result.WorkType;
                        vm.getList();
                    },
                    error: handleError
                });

            },



            //获取list
            getList: function (pageindex,conditions ) {
                //alert(conditions)
                let vm = this;

                vm.pageindex = pageindex || 1;
                if(conditions!==undefined)
                {
                    vm.conditions = conditions;
                    //根据条件，拼装导出条件
                    let exportparams=[];
                    for (col of this.params) {
                        switch (col.type) {
                            case 'plain':
                                if (col.value && col.value.replace(/ /g, '')) {
                                    col.value = col.value.replace(/ /g, '');
                                    exportparams.push(col.label+col.value);
                                }
                                break
                            case 'time':
                                if (col.value && col.value[0] && col.value[1]) {
                                    exportparams.push(col.label+moment(col.value[0]).format('YYYY-MM-DD')+'至'+moment(col.value[1]).format('YYYY-MM-DD'));                                }
                                break
                            case 'select':
                                if (col.value) {
                                    if(col.label=='机构名称：')
                                    {
                                        for(let i =0;i<vm.InstitutionList.length;i++)
                                        {
                                            if(col.value==vm.InstitutionList[i].institutionNum)
                                            {
                                                exportparams.push(col.label+vm.InstitutionList[i].institutionName);
                                                break
                                            }
                                        }
                                    }
                                    else if(col.label=='是否离职：')
                                    {
                                        if(col.value=='1')
                                        {
                                            exportparams.push(col.label+'是');
                                        }
                                        else {
                                            exportparams.push(col.label+'否');
                                        }
                                    }
                                    else if(col.label=='用工形式：')
                                    {
                                        for(let i =0;i<vm.WorkStyle.length;i++)
                                        {
                                            if(col.value==vm.WorkStyle[i].DDItemID)
                                            {
                                                exportparams.push(col.label+vm.WorkStyle[i].DDItemValue);
                                                break
                                            }
                                        }
                                    }
                                    else if(col.label=='当前岗位：')
                                    {
                                        for(let i =0;i<vm.WorkPosition.length;i++)
                                        {
                                            if(col.value==vm.WorkPosition[i].DDItemID)
                                            {
                                                exportparams.push(col.label+vm.WorkPosition[i].DDItemValue);
                                                break
                                            }
                                        }
                                    }
                                    else if(col.label=='是否退休：')
                                    {
                                        if(col.value=='1')
                                        {
                                            exportparams.push(col.label+'是');
                                        }
                                        else {
                                            exportparams.push(col.label+'否');
                                        }
                                    }
                                }
                                break
                            case 'number':
                                if (col.value && col.value.replace(/ /g, '')) {
                                    let num = Number(col.value.replace(/ /g, ''))
                                    if (num) {

                                        exportparams.push(col.label+col.value);
                                    }
                                }
                                break
                        }
                    }
                    this.exportsconditions=exportparams.join('，');

                }

                vm.tableLoading = true;

                $.ajax({
                    url: 'EmployeeList',
                    type: "post",
                    data: {
                        conditions:vm.conditions,
                        pageindex:vm.pageindex,
                    },
                    dataType: 'json',
                    success: function (result) {
                        vm.employeeList = result.employeeList;
                        vm.employeeNumList=[];
                        let allEmployeeList = result.allEmployeeList;
                        let employee_institutionList = [];
                        let employee_workposition = [];
                        if(result.pagenum>0){
                            allEmployeeList.map(function (item,index) {
                                employee_institutionList.push(item.institutionNum);
                                employee_workposition.push(item.workPositionNum);
                            });
                            for(let i=0;i<vm.employeeList.length;i++)
                            {
                                vm.employeeNumList.push(vm.employeeList[i].employeeNum);
                                /*for(var key in vm.employeeList[i]){
                                    console.log(key.toString());
                                    if(key.toString()=="EmployeeBirth"||key=="EmployeeIDNum"||key=="EmployeeTel") {
                                        console.log(key + ":" + vm.employeeList[i][key]);
                                        vm.employeeList[i][key] = decrypt(vm.employeeList[i][key]);
                                    }
                                }*/

                                //获取机构名称
                                /*if(vm.employeeList[i].InstitutionPrefix!==null)
                                {*/
                                for(let j=0;j<vm.InstitutionListTemp.length;j++)
                                {
                                    if(vm.employeeList[i].institutionNum==vm.InstitutionListTemp[j].institutionNum)
                                    {
                                        vm.employeeList[i].institutionName=vm.InstitutionListTemp[j].institutionName
                                    }
                                }

                                //}
                            }
                        }
                        if(conditions===''||conditions===undefined||conditions===null)
                        {
                            vm.InstitutionList = vm.InstitutionListTemp.filter(val=>{
                                return employee_institutionList.indexOf(val.institutionNum)>-1
                            });
                            vm.WorkPosition = vm.WorkPositionTemp.filter(val=>{
                                return employee_workposition.indexOf(val.DDItemID)>-1
                            });
                        }

                        vm.listsize=vm.employeeNumList.length;
                        vm.tableLoading = false;
                        vm.pageLoading = false;
                        vm.pagenum = result.pagenum;
                        // vm.pageindex = pageindex
                        // vm.conditions = conditions
                    },
                    error: handleError
                });
            }
        },
        created: function () {
            this.tableLoading = true;
            this.getInfoList();

        },
        mounted: function () {
            //this.tableLoading = false
        }
    });
}

