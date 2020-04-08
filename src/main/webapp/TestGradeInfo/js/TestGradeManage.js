$(function () {
    var list_vue = new Vue({
        el:"#right",
        data:{
            pageindex:0,
            pagenum:0,
            conditions:'',
            exportconditions:'',
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
            params: [{
                label: '员工姓名：',
                type: 'plain',
                model: 'EmployeeName',
            },{
                label: '所在机构：',
                type: 'select',
                model: 'InstitutionNum',
            },{
                label: '培训类型：',
                type: 'select',
                model: 'edu_category_id',
            },{
                label: '考试名称：',
                type: 'select',
                model: 'test_name',
            },{
                label: '起始时间：',
                type: 'time',
                model: 'test_start_time',
            },{
                label: '终止时间：',
                type: 'time',
                model: 'test_end_time',
            }],
            institution_list:[],
            edu_category_list:[],
            test_name_list:[],
            employee_list:[],
            score_mode_list:[{
                value:'0',label:'百分制'
            },{
                value:'1',label:'二分制'
            },{
                value:'2',label:'五分制'
            }],
            two_score_list:[{
                value:'0',label:'不及格'
            },{
                value:'1',label:'及格'
            }],
            five_score_list:[{
                value:'0',label:'不及格'
            },{
                value:'1',label:'及格'
            },{
                value:'2',label:'中'
            },{
                value:'3',label:'良'
            },{
                value:'4',label:'优'
            }],
            tableLoading:false,
            dialogLoading:false,
            list:[],//考试成绩列表
            id_list:[],
            rules:{
                test_name: [
                    { required: true, message: '请填写考试名称',trigger: 'blur'  }
                ],
                test_address: [
                    { required: true, message: '请填写考试地点',trigger: 'blur'  }
                ],
                score: [
                    { required: true, message: '请填写考试成绩',trigger: 'blur'  }
                ],
                institution_num: [
                    { required: true, message: '请选择所在机构',trigger: 'change'  }
                ],
                employee_num: [
                    { required: true, message: '请选择员工',trigger: 'change'  }
                ],
                score_mode: [
                    { required: true, message: '请选择计分方式',trigger: 'change'  }
                ],
                test_start_time: [
                    { required: true, message: '请选择起始时间',trigger: 'change'  }
                ],
                test_end_time: [
                    { required: true, message: '请选择终止时间',trigger: 'change'  }
                ],
            },
            addDialogVisible:false,
            addForm:{
                test_id:-1,//代表为公司外部的考试
                institution_num:'',
                employee_num: '',
                edu_category_id:'',
                test_name:'',
                test_address:'',
                test_start_time:'',
                test_end_time:'',
                score:'',
                score_mode:'0'
            },
            addMulDialogVisible:false,//批量导入页面可视化标志
            gtsDocument: {
                file: ''
            },
            /*addMulForm:{
                test_name:'',
                test_address:'',
                score_mode:'',
                test_start_time:'',
                test_end_time:'',
                edu_category_id:''
            },*/
            fileList:[],
            limitNum:1,
            addMulForm:new FormData(),
            editDialogVisible:false,
            editForm:{
                employee_edu_report_id:'',
                test_id:'',
                employee_num:'',
                edu_category_id:'',
                test_name:'',
                test_address:'',
                test_start_time:'',
                test_end_time:'',
                score:'',
                makeup_grade:'',
                score_mode:''
            },
            editTemp:{//保存一些不可修改但是又不可以提交到后台的信息
                EmployeeName: '',
                edu_category_name:'',
                score_mode_name:'',
                InstitutionName:''
            },
            editTempForm:'',
            detailDialogVisible:false,
            detailForm:{
                employee_edu_report_id:'',
                test_id:'',
                EmployeeName: '',
                edu_category_name:'',
                test_name:'',
                test_address:'',
                test_start_time:'',
                test_end_time:'',
                score:'',
                makeup_grade:'',
                score_mode_name:''
            },
            /*roll_data:[],//考试成绩单
            row_data:{},//考试成绩单中某一行的数据*/
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
        },
        methods:{
            getList:function (pageindex,conditions) {
                let self = this;
                self.tableLoading = true;
                self.pageindex = pageindex||1;
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
                                        exportparams.push(col.label + self.edu_category_list.find(function(x) {return x.edu_category_id === col.value;}).edu_category_name);
                                    }else{
                                        exportparams.push(col.label + self.test_name_list.find(function(x) {return x.test_name === col.value;}).test_name);
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
                console.log("exportconditions:"+self.exportconditions);
                $.ajax({
                    url:'getList',
                    type:'post',
                    data:{
                        conditions:self.conditions,
                        pageindex:self.pageindex
                    },
                    success:function (result) {
                        self.list = result.list;
                        self.pagenum = result.pagenum;
                        if(self.pagenum>0){
                            self.id_list = result.list.map((val) => '')
                        }

                        self.tableLoading = false;
                    },
                    error:handleError
                });
            },
            filter: function () {
                let self = this;
                let params = self.getQuery(self.params);
                self.getList(1,params.join('and'));
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
                console.log("params:"+params);
                return params;
            },
            /*getList:function(conditions){
                let self = this;
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
                                    }else if(col.label=='考试类型：'){
                                        exportparams.push(col.label + self.test_type_list.find(function(x) {return x.value === col.value;}).label);
                                    }else if(col.label=='提交成绩：'){
                                        exportparams.push(col.label + self.is_submitted_list.find(function(x) {return x.value === col.value;}).label);
                                    }else{
                                        exportparams.push(col.label + self.is_online_list.find(function(x) {return x.value === col.value;}).label);
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
                $.ajax({
                    url:"getList",
                    type:"post",
                    data:{
                        condition:self.conditions
                    },
                    success:function (result) {
                        self.list = result.list;//获取查询的记录
                        if(result.list.length>0){
                            self.roll_data = result.first_roll;
                        }else {
                            self.roll_data = [];
                        }
                        self.tableLoading = false;
                    },
                    error:handleError
                });
            },*/
            copy(obj) {
                let objCopy = {}; // objCopy 将存储 mainObj 的副本
                objCopy = Object.assign({}, obj);
                return objCopy;
            },
            resetForm:function(formName){
                if(formName == "addForm"){
                    this.$refs[formName].resetFields();
                    this.addForm.score_mode = '';
                }else {
                    this.editForm = this.copy(this.editTempForm);
                }
            },
            closeForm:function(formName){
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].clearValidate();
                    this.$refs[formName].resetFields();
                }
                if(formName=="editForm"){
                    this.editTemp.edu_category_name='';
                    this.editTemp.EmployeeName = '';
                    //this.editTemp.InstitutionName = '';
                }
            },
            filterTag(value, row) {
                return row.test_result === value;
            },
            selectHandle:function (index, indexPath) {
                let self = this;
                self.tableLoading = true;
                self.index = index;
                console.log("index:"+index);
                let test_name = self.list[index].test_name;
                $.ajax({
                    url:'getRollData',
                    type:'post',
                    data:{
                        test_name:test_name
                    },
                    success:function (result) {
                        self.roll_data = result.roll_data;
                        self.tableLoading = false;
                    },
                    error: handleError
                });
            },
            _export:function () {
                let self = this;
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
            _editGrade:function (row) {
                let self = this;
                if(!row.is_set){
                    self.row_data = self.copy(row);
                    //提示用户是否确定进行修改
                    self.$confirm('您确定要修改这条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //设置此记录可修改
                        row.is_set = true;
                    }).
                    catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消修改！'
                        });
                    });
                }

            },
            _submitGrade:function (row,index) {
                let self = this;
                if(row.is_set){
                    //当修改后与修改的考核结果不同的时候，要注意报名表与成绩表中记录的增删
                    //保存数据
                    $.ajax({
                        url:'editRow',
                        type:'post',
                        data:{
                            test_name:row.test_name,
                            employee_num:row.employee_num,
                            score:row.score,
                            makeup_grade:row.makeup_grade
                        },
                        success:function (result) {
                            if(result=="success"){
                                self.$message({
                                    type:'success',
                                    message:'修改成功！'
                                });
                                if(row.score_mode=='0'){//百分制
                                    if(row.score>60.0){
                                        row.test_result = '通过';
                                    }else {
                                        if(row.makeup_grade!='' &&row.makeup_grade>60.0){
                                            row.test_result = '通过';
                                        }else {
                                            row.test_result = '不通过';
                                        }
                                    }
                                }else if(row.score_mode=='1'){//二分制

                                }else {//五分制

                                }
                                row.is_set = false;
                            }else {
                                self.$message({
                                    type:'fail',
                                    message:'修改失败！'
                                });
                            }
                        },
                        error:handleError
                    });
                }

            },
            _add:function (formName) {
                let self = this;
                this.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let start = new Date(self.addForm.test_start_time).getTime();
                        let end = new Date(self.addForm.test_end_time).getTime();
                        let delt = end - start;
                        if(delt>0) {
                            let regu = /^(0|[1-9][0-9]?|100)(\.[0-9])?$/;
                            let validation_flag = true;
                            if(self.addForm.score_mode=="0"){
                                if (self.addForm.score != ""&&self.addForm.score != "undefined"&&self.addForm.score !=null) {
                                    if (!regu.test(self.addForm.score)) {
                                        validation_flag = false;
                                    }
                                }
                                if(self.addForm.makeup_grade != ""&&self.addForm.makeup_grade != "undefined"&&self.addForm.makeup_grade !=null) {
                                    if (!regu.test(self.addForm.makeup_grade)) {
                                        validation_flag = false;
                                    }
                                }
                            }
                            if(validation_flag){
                                self.dialogLoading = true;
                                if (self.addForm.edu_category_id == '') {
                                    self.addForm.edu_category_id = 0;
                                }
                                delete self.addForm.institution_num;
                                self.addForm.test_start_time = moment(start).format('YYYY-MM-DD HH:mm:ss');
                                self.addForm.test_end_time = moment(end).format('YYYY-MM-DD HH:mm:ss');
                                $.ajax({
                                    url:'submitAdd',
                                    type:'post',
                                    data:{
                                        formdata:JSON.stringify(self.addForm)
                                    },
                                    success:function (result) {
                                        if(result=="success"){
                                            self.$message({
                                                type:'success',
                                                message:'添加成功！'
                                            });
                                        }else {
                                            self.$message({
                                                type:'fail',
                                                message:'添加失败！'
                                            });
                                        }
                                        self.getList(1,'');
                                        self.closeForm('addForm');
                                        self.addDialogVisible = false;
                                        self.dialogLoading = false;
                                    },
                                    error:handleError
                                });
                            }else {
                                self.$message({
                                    type:'warning',
                                    message:'成绩应保留一位小数!'
                                });
                            }
                        }else {
                            self.$message({
                                type:'warning',
                                message:'请仔细检查考试开始时间与考试结束时间的大小关系！'
                            });
                        }
                    }
                });
            },
            _delete:function () {
                let self = this;
                console.log("idlist:"+self.idList.join(','));
                if (self.idList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要删除这' + self.idList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.post('submitDelete', {
                            id_list: self.idList.join(','),
                        }, function (result) {
                            if(result=="success"){
                                self.$message({
                                    type:'success',
                                    message:'删除成功！'
                                });
                            }else {
                                self.$message({
                                    type:'fail',
                                    message:'删除失败！'
                                });
                            }
                            self.getList(1,'');
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
            _edit:function(employee_edu_report_id){
                let self = this;
                self.editDialogVisible = true;
                self.dialogLoading = true;
                console.log("employee_edu_report_id:"+employee_edu_report_id);
                $.ajax({
                    url:'getEdit',
                    type:'post',
                    data:{
                        employee_edu_report_id:employee_edu_report_id
                    },
                    success:function (result) {
                        if(result.list.score_mode=="0"){
                            $(".edit_hundred_visible").css("display","");
                            $(".edit_two_visible").css("display","none");
                            $(".edit_five_visible").css("display","none");
                        }else if(result.list.score_mode=="1"){
                            $(".edit_hundred_visible").css("display","none");
                            $(".edit_two_visible").css("display","");
                            $(".edit_five_visible").css("display","none");
                        }else {
                            $(".edit_hundred_visible").css("display","none");
                            $(".edit_two_visible").css("display","none");
                            $(".edit_five_visible").css("display","");
                        }
                        for(let key in self.editForm){
                            self.editForm[key] = result.list[key];
                        }
                        if(self.editForm.score!=null){
                            self.editForm.score = self.editForm.score.toString();
                        }
                        if(self.editForm.makeup_grade!=null){
                            self.editForm.makeup_grade = self.editForm.makeup_grade.toString();
                        }
                        console.log("score:"+self.editForm.score);
                        self.editTempForm = self.copy(self.editForm);

                        for(let key in self.editTemp){
                            self.editTemp[key] = result.list[key];
                        }
                        self.dialogLoading = false;
                    },
                    error:handleError
                });
            },
            _submitEdit:function(formName){
                let self = this;
                this.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let start = new Date(self.editForm.test_start_time).getTime();
                        let end = new Date(self.editForm.test_end_time).getTime();
                        let delt = end - start;
                        if(delt>0) {
                            let regu = /^(0|[1-9][0-9]?|100)(\.[0-9])?$/;
                            let validation_flag = true;
                            if(self.addForm.score_mode=="0"){
                                if (self.addForm.score != ""&&self.addForm.score != "undefined"&&self.addForm.score !=null) {
                                    if (!regu.test(self.addForm.score)) {
                                        validation_flag = false;
                                    }
                                }
                                if(self.addForm.makeup_grade != ""&&self.addForm.makeup_grade != "undefined"&&self.addForm.makeup_grade !=null) {
                                    if (!regu.test(self.addForm.makeup_grade)) {
                                        validation_flag = false;
                                    }
                                }
                            }
                            if(validation_flag) {
                                self.dialogLoading = true;
                                self.editForm.test_start_time = moment(start).format('YYYY-MM-DD HH:mm:ss');
                                self.editForm.test_end_time = moment(end).format('YYYY-MM-DD HH:mm:ss');
                                console.log(JSON.stringify(self.editForm).toString());
                                if (self.editForm.edu_categoty_id == '') {
                                    self.editForm.edu_categoty_id = 0;
                                }
                                $.ajax({
                                    url: 'submitEdit',
                                    type: 'post',
                                    data: {
                                        formdata: JSON.stringify(self.editForm)
                                    },
                                    success: function (result) {
                                        if (result == "success") {
                                            self.$message({
                                                type: 'success',
                                                message: '修改成功！'
                                            });
                                        } else {
                                            self.$message({
                                                type: 'fail',
                                                message: '修改失败！'
                                            });
                                        }
                                        self.getList(self.pageindex, self.conditions);
                                        self.dialogLoading = false;
                                    },
                                    error: handleError
                                });
                            }else {
                                self.$message({
                                    type:'warning',
                                    message:'成绩保留一位小数！'
                                });
                            }
                        }else {
                            self.$message({
                                type:'warning',
                                message:'请仔细检查考试开始时间与考试结束时间的大小关系！'
                            });
                        }
                    }
                });
            },
            _detail:function (employee_edu_report_id) {
                let self = this;
                self.detailDialogVisible=true;
                self.dialogLoading=true;
                if (employee_edu_report_id == 'previous') {
                    employee_edu_report_id = self.detailForm.previous;
                }
                if (employee_edu_report_id == 'next') {
                    employee_edu_report_id = self.detailForm.next;
                }
                $.ajax({
                    url:'getDetail',
                    data:{
                        employee_edu_report_id:employee_edu_report_id,
                        conditions:self.conditions,
                        pageindex:self.pageindex
                    },
                    type:'post',
                    success:function (result) {
                        let listID=0;
                        self.detailForm = result.record;
                        if(self.detailForm.score_mode=='0'){
                            self.detailForm.score_mode_name = '百分制';
                        }else if(self.detailForm.score_mode == '1'){
                            self.detailForm.score_mode_name = '二分制';
                        }else {
                            self.detailForm.score_mode_name = '五分制';
                        }
                        for (var i = 0; i < result.list.length; i++)
                            if (result.list[i].employee_edu_report_id === employee_edu_report_id) {
                                listID = i;
                            }
                        if (listID == 0) {
                            self.detailForm.btnToDisabled0 = true;
                        }
                        else {
                            self.detailForm.btnToDisabled0 = false;
                            var temp = listID - 1;
                            self.detailForm.previous = result.list[temp].employee_edu_report_id;
                        }

                        if (listID == (result.list.length - 1)) {
                            self.detailForm.btnToDisabled1 = true;
                        } else {
                            var temp = listID + 1;
                            self.detailForm.next = result.list[temp].employee_edu_report_id;
                            self.detailForm.btnToDisabled1 = false;
                        }
                        self.dialogLoading=false;
                    },
                    error:handleError
                });
            },
            _download:function(){
                let self = this;
                httpPost_aes('download', {});
            },
            newFile:function(file){
                console.log("file:"+file);
                this.addMulForm.append('file', file);
                return false;
            },
            handleSuccess:function(response, file, fileList){
                let self = this;
                let result = JSON.parse(decrypt(response)).result;
                if(result=="id_error"){
                    self.$message({
                        type:'warning',
                        message:'员工编号有问题！'
                    });
                }else if(result=="id_null"){
                    self.$message({
                        type:'warning',
                        message:'存在员工编号为空！'
                    });
                }else if(result=="test_name_null"){
                    self.$message({
                        type:'warning',
                        message:'存在考试名称为空！'
                    });
                }else if(result=="address_null"){
                    self.$message({
                        type:'warning',
                        message:'存在考试地点为空！'
                    });
                }else if(result=="start_time_null"){
                    self.$message({
                        type:'warning',
                        message:'存在考试开始时间为空！'
                    });
                }else if(result=="end_time_null"){
                    self.$message({
                        type:'warning',
                        message:'存在考试结束时间为空！'
                    });
                }else if(result=="mode_null"){
                    self.$message({
                        type:'warning',
                        message:'存在计分方式为空！'
                    });
                }else if(result=="score_null"){
                    self.$message({
                        type:'warning',
                        message:'存在考试成绩为空！'
                    });
                }else if(result=="name_no_id"){
                    self.$message({
                        type:'warning',
                        message:'请核实员工编号与员工姓名的一致性！'
                    });
                }else if(result=="mode_error"){
                    self.$message({
                        type:'warning',
                        message:'存在计分方式填写错误！'
                    });
                }else if(result=="start_time_error"){
                    self.$message({
                        type:'warning',
                        message:'存在考试开始时间格式不正确！'
                    });
                }else if(result=="end_time_error"){
                    self.$message({
                        type:'warning',
                        message:'存在考试结束时间格式不正确！'
                    });
                }else if(result=="score_error"){
                    self.$message({
                        type:'warning',
                        message:'存在考试成绩与计分方式不对应的情况！'
                    });
                }else if(result=="makeup_error"){
                    self.$message({
                        type:'warning',
                        message:'存在补考成绩与计分方式不对应的情况！'
                    });
                }else if(result=="category_none_exit"){
                    self.$message({
                        type:'warning',
                        message:'请核实培训类型的填写！'
                    });
                }else {
                    let returntext = JSON.parse(decrypt(response)).returntext;
                    if(returntext=="success"){
                        self.$message({
                            type:'success',
                            message:'导入成功！'
                        });
                        self.addMulDialogVisible = false;
                        self.getList(1,'');
                    }else {
                        self.$message({
                            type:'fail',
                            message:'导入失败！'
                        });
                    }
                }
                self.dialogLoading = false;
                self.$refs.upload.clearFiles();//清除上传文件信息，防止重复
            },
            handleError:function(err, file, fileList){

            },
            _import:function(){
                let self = this;
                self.dialogLoading = true;
                self.$refs.upload.submit();

                /*self.$refs.upload.clearFiles();//清除上传文件信息，防止重复*/
            },
            getInstitutionList:function () {
                let self = this;
                $.ajax({
                    url:'getInstitutionList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.institution_list = result.institution_list;
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
                        self.edu_category_list = result.edu_category_list;
                    }
                });
            },
            getTestList:function () {
                let self = this;
                $.ajax({
                    url:'getTestList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.test_name_list = result.test_name_list;
                    }
                });
            },
            getEmployeeList:function () {
                let self = this;
                $.ajax({
                    url:'getEmployeeList',
                    type:'post',
                    data:{},
                    success:function (result) {
                        self.employee_list = result.employee_list;
                    }
                });
            }

        },
        watch:{
            'addForm.score_mode':function (val, oldval) {
                let self = this;
                if(self.addForm.score_mode=="0"){
                    $(".add_hundred_visible").css("display","");
                    $(".add_two_visible").css("display","none");
                    $(".add_five_visible").css("display","none");
                }else if(self.addForm.score_mode=="1"){
                    $(".add_hundred_visible").css("display","none");
                    $(".add_two_visible").css("display","");
                    $(".add_five_visible").css("display","none");
                }else {
                    $(".add_hundred_visible").css("display","none");
                    $(".add_two_visible").css("display","none");
                    $(".add_five_visible").css("display","");
                }
            },
            'addForm.institution_num':function (val,oldval) {
                let self = this;
                if(val&&oldval!=val){
                    //根据机构名筛选员工列表
                    $.ajax({
                        url:'getEmployeeListByInstitutionNum',
                        type:'post',
                        data:{
                            institution_num:self.addForm.institution_num
                        },
                        success:function (result) {
                            self.employee_list = result.employee_list;
                        },
                        error:handleError
                    });
                }
            }
        },
        created:function () {
            this.getList(1,'');
            this.getInstitutionList();
            this.getCategoryList();
            this.getEmployeeList();
            this.getTestList();
        }


    });
});

function decrypt(word){
    let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
