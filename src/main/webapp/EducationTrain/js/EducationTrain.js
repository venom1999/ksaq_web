$(function () {
    var list_vue = new Vue({
        el:"#right",
        data:{
            pageindex:0,
            pagenum:0,
            addDialogVisible:false,
            editDialogVisible:false,
            detailDialogVisible:false,
            enterDialogVisible:false,
            addEmployeeDialogVisible:false,
            innerVisible:false,
            disabled_showRecord:true,
            conditions:'',
            exportconditions:'',
            params: [{
                label: '培训类型：',
                type: 'select',
                model: 'edu_category_id',
            },{
                label: '培训名称：',
                type: 'plain',
                model: 'education_name',
            },{
                label: '机构名称：',
                type: 'select',
                model: 'institution_name',
            },{
                label: '培训内容：',
                type: 'plain',
                model: 'education_content',
            },{
                label: '起始时间：',
                type: 'time',
                model: 'start_time',
            },{
                label: '终止时间：',
                type: 'time',
                model: 'end_time',
            }],
            addparams:[{
                label:'所在机构：',
                type:'select',
                model:'institution_num'
            }],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            educationtypelist:[
                {
                    value: '内部培训',
                    label: '内部培训'
                },{
                    value: '外部培训',
                    label: '外部培训'
                },
            ],
            addForm:{
                education_num:'',
                education_name:'',
                education_number:'',
                education_period:'',
                education_address:'',
                education_tutor:'',
                education_type:'',
                education_material:'',
                institution_name:'',
                edu_category_id:'',

            },
            detailForm:{
                education_id:'',
                education_num:'',
                education_name:'',
                education_number:'',
                education_period:'',
                education_address:'',
                education_tutor:'',
                education_type:'',
                education_material:'',
                InstitutionName:'',
                edu_category_name:'',
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: '',
            },
            editTempForm:'',
            editForm:{
                education_id:'',
                education_num:'',
                education_name:'',
                education_number:'',
                education_period:'',
                education_address:'',
                education_tutor:'',
                education_type:'',
                education_material:'',
                institution_name:'',
                edu_category_id:'',
            },
            tableLoading:false,
            dialogLoading:false,
            categorylist:[],
            institutionlist:[],
            resourcelist:[],
            positionlist:[],
            list:[],
            rules:{
                education_num: [
                    { required: true, message: '请填写培训编号',trigger: 'blur'  }
                ],
                education_name: [
                    { required: true, message: '请填写培训名称',trigger: 'blur'  }
                ],
                education_period: [
                    { required: true, message: '请填写培训学时',trigger: 'blur'  }
                ],
                institution_name: [
                    { required: true, message: '请选择机构名称',trigger: 'change'  }
                ],
                edu_category_id: [
                    { required: true, message: '请选择培训类型',trigger: 'change'  }
                ],
                online_edu_res_idset: [
                    { required: true, message: '请至少选择一个培训资源',trigger: 'change'  }
                ],
                start_time: [
                    { required: true, message: '请选择起始时间',trigger: 'change'  }
                ],
                end_time: [
                    { required: true, message: '请选择终止时间',trigger: 'change'  }
                ],
            },
            id_list: [], //多选选中的id数组，以,隔开
            id_list_add:[],//报名功能中的多选添加
            enter_id:'',//报名功能中的存储education_id
            EmployeeList:[],
            EmployeeListExceptPrincipal:[],
            EmployeeListExceptPrincipalTemp:[],//同EmployeeListExceptPrincipal最初数据一致，便于输入框筛选员工
            search:'',
            addEmployeeForm:{
                enter_institution_list:'',//报名功能中机构筛选
            },
            checked_flag:false
        },
        computed: {
            idList: function () {
                let self = this;
                let idlist = [];
                self.id_list.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                });
                return idlist;
            },
            idAddList: function () {
                let self = this;
                let idlist = [];
                self.id_list_add.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                });
                return idlist;
            }
        },
        methods:{
            filter: function () {
                let self = this;
                let params = self.getQuery(self.params);
                this.getList(1, params.join('and'));
            },
            screen:function(){
                let self = this;
                self.id_list_add = [];
                console.log("list:"+self.addEmployeeForm.enter_institution_list);
                $.ajax({
                    url:'getNotEnterRoll',
                    type:'post',
                    data:{
                        institution_list:self.addEmployeeForm.enter_institution_list,
                        education_id:self.enter_id
                    },
                    success:function (result) {
                        self.EmployeeListExceptPrincipal = result.notroll;
                        self.EmployeeListExceptPrincipalTemp = result.notroll;
                        for (let i=0;i<result.notroll.length;i++){
                            self.id_list_add.push(result.notroll[i].EmployeeNum);
                        }
                    },
                    error:handleError
                });
            },
            getQuery:function(param){
                let params = [];
                for (col of param) {
                    switch (col.type) {
                        case 'plain':
                            if (col.value && col.value.replace(/ /g, '')) {
                                col.value = col.value.replace(/ /g, '');
                                params.push(` ${col.model} like '%${col.value}%' `);
                            }
                            break;
                        case 'time':
                            if (col.value && col.value[0] && col.value[1]) {
                                console.log("time:"+col.value[0]);
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
                return params;
            },
            resetForm:function(formName){
                if(formName == "addForm"){
                    this.$refs[formName].resetFields();
                }else {
                    this.editForm = this.copy(this.editTempForm);
                    this.editForm.online_edu_res_idset = this.editForm.online_edu_res_idset.split(",").map(Number);
                }
            },
            copy(obj) {
                let objCopy = {}; // objCopy 将存储 mainObj 的副本
                objCopy = Object.assign({}, obj);
                return objCopy;
            },
            closeForm:function(formName){
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].clearValidate();
                    this.$refs[formName].resetFields();
                }
            },
            getList:function(pageindex, conditions){
                let self = this;
                pageindex = pageindex || 1;
                self.tableLoading = true;
                if(conditions!==undefined)
                {
                    self.conditions = conditions;
                    //获取查询条件，写入导出文件的第二行
                    let exportparams = [];
                    for (col of self.params) {
                        switch (col.type) {
                            case 'plain':
                                if (col.value && col.value.replace(/ /g, '')) {
                                    col.value = col.value.replace(/ /g, '');
                                    exportparams.push(col.label + col.value);
                                }
                                break;
                            case 'time':
                                if (col.value && col.value[0] && col.value[1]) {
                                    exportparams.push(col.label + moment(col.value[0]).format('YYYY-MM-DD') + '至' + moment(col.value[1]).format('YYYY-MM-DD'));
                                }
                                break;
                            case 'select':
                                if (col.value) {
                                    if(col.label=='培训类型：'){
                                        exportparams.push(col.label + self.categorylist.find(function(x) {return x.edu_category_id === col.value;}).edu_category_name);
                                    }else {
                                        exportparams.push(col.label + self.institutionlist.find(function(x) {return x.InstitutionNum === col.value;}).InstitutionName);
                                    }
                                }
                                break;
                            case 'number':
                                if (col.value && col.value.replace(/ /g, '')) {
                                    let num = Number(col.value.replace(/ /g, ''));
                                    if (num) {

                                        exportparams.push(col.label + col.value);
                                    }
                                }
                                break
                        }
                    }
                    self.exportconditions = exportparams.join('，');
                }
                self.pageindex = pageindex;
                $.ajax({
                    url:"getList",
                    type:"post",
                    data:{
                        pageindex:self.pageindex,
                        conditions:self.conditions
                    },
                    success:function (result) {
                        self.list = result.list;//获取查询的记录
                        self.pagenum = result.pagenum;//获取查询记录总数
                        if(self.pagenum>0){
                            self.id_list = result.list.map((val) => '')
                        }
                        self.tableLoading = false;
                    },
                    error:handleError
                });
            },
            _detail:function(id){
                let self = this;
                self.tableLoading=true;
                if (id == 'previous') {
                    id = self.detailForm.previous;
                }
                if (id == 'next') {
                    id = self.detailForm.next;
                }
                $.ajax({
                    url:'getDetail',
                    data:{
                        education_id:id,
                        conditions:self.conditions,
                        pageindex:self.pageindex
                    },
                    type:'post',
                    success:function (result) {
                        let listID=0;
                        self.detailForm = result.educationtrain;
                        self.detailForm.online_edu_res_idset = self.detailForm.online_edu_res_idset.split(",").map(Number);
                        for (var i = 0; i < result.list.length; i++)
                            if (result.list[i].education_id === id) {
                                listID = i;
                            }
                        if (listID == 0) {
                            self.detailForm.btnToDisabled0 = true;
                        }
                        else {
                            self.detailForm.btnToDisabled0 = false;
                            var temp = listID - 1;
                            self.detailForm.previous = result.list[temp].education_id;
                        }

                        if (listID == (result.list.length - 1)) {
                            self.detailForm.btnToDisabled1 = true;
                        } else {
                            var temp = listID + 1;
                            self.detailForm.next = result.list[temp].education_id;
                            self.detailForm.btnToDisabled1 = false;
                        }
                        self.tableLoading=false;
                        self.detailDialogVisible=true;
                    },
                    error:handleError
                });
            },
            getCurrentTime:function(){
                let self = this;
                self.addDialogVisible=true;
                let date = new Date();
                Y = date.getFullYear() + '';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
                h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours());
                m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
                s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
                self.addForm.education_num = Y+M+D+h+m;
            },
            _add:function(formName){
                let self = this;
                this.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let idset = "";
                        let temp = self.addForm.online_edu_res_idset;
                        for(let i=0;i<self.addForm.online_edu_res_idset.length-1;i++){
                            idset = idset + self.addForm.online_edu_res_idset[i]+","
                        }
                        self.addForm.online_edu_res_idset = idset +self.addForm.online_edu_res_idset[self.addForm.online_edu_res_idset.length-1];
                        console.log("formdata:"+JSON.stringify(self.addForm).toString());
                        $.ajax({
                            url:'submitAdd',
                            type:'post',
                            data:{
                                'formdata':JSON.stringify(self.addForm).toString()
                            },
                            success:function (result) {
                                if(result=="success"){
                                    self.$message({
                                        type: 'success',
                                        message: '添加成功!'
                                    });
                                    self.getList(1,self.pageindex);
                                    self.closeForm('addForm');
                                    self.addDialogVisible = false;
                                }else {
                                    self.$message({
                                        type: 'fail',
                                        message: '添加失败!'
                                    });
                                }
                            },
                            error:handleError
                        });
                    }
                });
            },
            _edit:function(id){
                let self = this;
                self.editDialogVisible = true;
                $.ajax({
                    url:'getEdit',
                    type:'post',
                    data:{
                        education_id:id
                    },
                    success:function (result) {
                        self.editForm = result;
                        self.editTempForm = self.copy(self.editForm);
                        self.editForm.online_edu_res_idset = self.editForm.online_edu_res_idset.split(",").map(Number);
                        //如果某项资源被删除，而在这边有相关的引用处理需要考虑吗？
                    },
                    error:handleError
                })
            },
            _submitEdit:function(formName){
                let self = this;
                this.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let idset = "";
                        let temp = self.editForm.online_edu_res_idset;
                        for(let i=0;i<self.editForm.online_edu_res_idset.length-1;i++){
                            idset = idset + self.editForm.online_edu_res_idset[i]+","
                        }
                        self.editForm.online_edu_res_idset = idset+self.editForm.online_edu_res_idset[self.editForm.online_edu_res_idset.length-1];
                        $.ajax({
                            url:'submitEdit',
                            type:'post',
                            data:{
                                formdata:JSON.stringify(self.editForm).toString()
                            },
                            success:function (result) {
                                if(result == "success"){
                                    self.$message({
                                        type: 'success',
                                        message: '修改成功!'
                                    });
                                    self.getList(self.pageindex,self.conditions);
                                    self._edit(self.editForm.education_id);
                                }else {
                                    self.$message({
                                        type: 'fail',
                                        message: '修改失败!'
                                    });
                                }
                            },
                            error:handleError
                        });
                    }
                });
            },
            _delete:function(){
                let self = this;
                if (self.idList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要删除这' + self.idList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        //判断此执行删除的资源是否有相应的培训计划明细
                        $.post('delete', {
                            id_list: self.idList.join(','),
                        }, function (result) {
                            if (result == "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }
                            self.getList(self.pageindex, self.conditions);
                        });

                    }).
                    catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
                else {
                    this.$message('请选择您要删除的记录，点击多选按钮选中！');
                }
            },
            _export:function(){
                let self = this;
                console.log("exportconditions:"+self.exportconditions);
                if(self.pagenum>0){
                    httpPost_aes('export', {
                        id_list: self.idList.join(","),
                        conditions: self.conditions,
                        exportconditions:self.exportconditions
                    });
                }else {
                    this.$message({
                        type:'warning',
                        message:'无符合筛选条件记录！'
                    });
                }
            },
            _enter:function(id){
                let self = this;
                self.enterDialogVisible = true;
                self.enter_id = id;
                $.ajax({
                    url:'getEnteredRoll',
                    type:'post',
                    data:{
                        education_id:id
                    },
                    success:function (result) {
                        if(result.roll.length>0){
                            self.EmployeeList = result.roll;
                            $("#RecordTable").show();
                        }else {
                            $("#RecordTable").hide();
                        }
                    },
                    error:handleError
                });
            },
            searchEmployee:function(){
                let self = this;
                self.id_list_add = [];
                self.EmployeeListExceptPrincipal = self.EmployeeListExceptPrincipalTemp.filter(
                    data => !self.search || data.EmployeeName.toLowerCase().includes(
                        self.search.toLowerCase()) || data.EmployeeID.toLowerCase().includes(
                            self.search.toLowerCase()
                    )
                );
                for(let i=0;i<self.EmployeeListExceptPrincipal.length;i++){
                    self.id_list_add.push(self.EmployeeListExceptPrincipal[i].EmployeeNum);
                }
            },
            openAddDialog:function(){
                let self = this;
                self.addEmployeeDialogVisible=true;
                $.ajax({
                    url:'getNotEnterRoll',
                    type:'post',
                    data:{
                        institution_list:self.addEmployeeForm.enter_institution_list,
                        education_id:self.enter_id
                    },
                    success:function (result) {
                        self.EmployeeListExceptPrincipalTemp = result.notroll;
                        self.EmployeeListExceptPrincipal = result.notroll;
                        for (let i=0;i<result.notroll.length;i++){
                            self.id_list_add.push(result.notroll[i].EmployeeNum);
                        }

                    },
                    error:handleError
                });
                self.getPositionList();
            },
            handleClose:function(formName){
                let self = this;
                $.ajax({
                    url:'getEnteredRoll',
                    type:'post',
                    data:{
                        education_id:self.enter_id
                    },
                    success:function (result) {
                        if(result.roll.length>0){
                            self.EmployeeList = result.roll;
                            $("#RecordTable").show();
                            $("#bottom-footer").show();
                            self.disabled_showRecord = true;
                        }else {
                            $("#RecordTable").hide();
                            $("#bottom-footer").hide();
                            self.disabled_showRecord = false;
                        }
                    },
                    error:handleError
                });
                this.$refs[formName].resetFields();
                self.search = '';
                self.id_list_add = [];
            },
            addEmployee:function(){
                let self = this;
                $.ajax({
                    url:'addEmployee',
                    type:'post',
                    data:{
                        employee_num:self.idAddList.join(','),
                        education_id:self.enter_id
                    },
                    success:function (result) {
                        if(result == "success"){
                            self.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            self.screen();
                        }else {
                            self.$message({
                                type: 'fail',
                                message: '添加失败!'
                            });
                        }
                    },
                    error:handleError
                });
            },
            getCategoryList:function () {
                let self = this;
                $.ajax({
                    url:'getCategoryList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.categorylist = result.categorylist;
                    }
                });
            },
            getInstitutionList:function () {
                let self = this;
                $.ajax({
                    url:'getInstitutionList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.institutionlist = result.institutionlist;
                    },
                    error:handleError
                });
            },
            getResourceList:function () {
                let self = this;
                $.ajax({
                    url:'getResourceList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.resourcelist = result.resourcelist;
                    },
                    error:handleError
                });
            },
            getPositionList:function(){
                let self = this;
                $.ajax({
                    url:'getPositionList',
                    type:'post',
                    data:{},
                    success:function (result) {
                        self.positionlist = result.positionlist;
                    },
                    error:handleError
                });
            },
            deleteEmployee:function () {
                let self = this;
                if (self.idAddList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要删除这' + self.idAddList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        $.post('deleteEmployee', {
                            id_list: self.idAddList.join(','),
                        }, function (result) {
                            if (result == "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                self._enter(self.enter_id);
                            } else {
                                self.$message({
                                    type: 'error',
                                    message: '删除失败!'
                                });
                            }

                        });

                    }).
                    catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
                else {
                    this.$message('请选择您要删除的记录，点击多选按钮选中！');
                }
            }
        },
        created:function () {
            this.getCategoryList();
            this.getInstitutionList();
            this.getResourceList();
            this.getList(1, '');
        }
    });
});