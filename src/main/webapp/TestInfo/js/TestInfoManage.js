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
                label: '考试类型：',
                type: 'select',
                model: 'test_type',
            },{
                label: '提交成绩：',
                type: 'select',
                model: 'is_submitted',
            },{
                label: '是否机考：',
                type: 'select',
                model: 'is_online',
            },{
                label: '起始时间：',
                type: 'time',
                model: 'test_start_time',
            },{
                label: '终止时间：',
                type: 'time',
                model: 'test_end_time',
            }],
            test_type_list:[{
                value: '1',
                label: '正常考试'
            },{
                value: '2',
                label: '补考'
            }],
            is_online_list:[{
                value: '1',
                label: '机考'
            },{
                value: '0',
                label: '非机考'
            }],
            is_released_list:[
                {
                    value: 1,
                    label: '是'
                },{
                    value: 0,
                    label: '否'
                },
            ],
            score_mode_list:[{
                value:'0',label:'百分制'
            },{
                value:'1',label:'二分制'
            },{
                value:'2',label:'五分制'
            }],
            is_submitted_list:[{
                value: '1',
                label: '已提交'
            },{
                value: '0',
                label: '未提交'
            }],
            categorylist:[],
            educationlist:[],
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
            addForm:{
                test_name:'',
                education_id:'',
                edu_category_id:'',
                test_address:'',
                test_type:'',
                related_test_id:'',
                is_online:'',
                score_mode:'',
                is_released:1,
                test_start_time:'',
                test_end_time:'',
                test_time:''
            },
            detailForm:{
                test_id:'',
                test_name:'',
                education_name:'',
                edu_category_name:'',
                test_address:'',
                test_type:'',
                is_online:'',
                score_mode:'',
                is_released:'',
                test_start_time:'',
                test_end_time:'',
                test_time:'',
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: '',
            },
            editTempForm:'',
            editForm:{
                test_id:'',
                test_name:'',
                education_name:'',
                edu_category_name:'',
                test_address:'',
                test_type:'',
                is_online:'',
                score_mode:'',
                is_released:'',
                test_start_time:'',
                test_end_time:'',
                test_time:''
            },
            tableLoading:false,
            dialogLoading:false,
            institutionlist:[],
            resourcelist:[],
            positionlist:[],
            list:[],
            rules:{
                edu_category_id: [
                    { required: true, message: '请选择培训类型',trigger: 'change'  }
                ],
                test_address: [
                    { required: true, message: '请填写考试地点',trigger: 'blur'  }
                ],
                is_online:[
                    { required: true, message: '请选择是否为机考',trigger: 'change'  }
                ],
                test_start_time: [
                    { required: true, message: '请选择起始时间',trigger: 'change'  }
                ],
                test_end_time: [
                    { required: true, message: '请选择终止时间',trigger: 'change'  }
                ],
            },
            id_list: [], //多选选中的id数组，以,隔开
            id_list_add:[],//报名功能中的多选添加
            enter_id:'',//报名功能中的存储test_id
            enter_education_id:0,//报名的培训名称：没有则为0；有则设置
            enter_test_name:'',//报名的考试名称
            EmployeeList:[],
            EmployeeListExceptPrincipal:[],
            EmployeeListExceptPrincipalTemp:[],//同EmployeeListExceptPrincipal最初数据一致，便于输入框筛选员工
            search:'',
            addEmployeeForm:{
                enter_institution_list:'',//报名功能中机构筛选
            },
            checked_flag:false,
            is_test:0,//是否为考试，为0正常考试；1补考
            enter_people_num:0,//实际参与考试的人员数量
            editTemp:{
                education_name:'',
                edu_category_name:''
            },
            addTempForm:{
                education_name:'',
                edu_category_name:'',
                is_online_name:'',
                score_mode_name:''
            },
            delete_flag:true,//删除标志
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
                self.getList(1, params.join('and'));
            },
            screen:function(){
                let self = this;
                self.id_list_add = [];
                self.dialogLoading = true;
                console.log("list:"+self.addEmployeeForm.enter_institution_list);
                $.ajax({
                    url:'getNotEnterRoll',
                    type:'post',
                    data:{
                        institution_list:self.addEmployeeForm.enter_institution_list,
                        test_id:self.enter_id
                    },
                    success:function (result) {
                        self.EmployeeListExceptPrincipal = result.notroll;
                        self.EmployeeListExceptPrincipalTemp = result.notroll;
                        for (let i=0;i<result.notroll.length;i++){
                            self.id_list_add.push(result.notroll[i].EmployeeNum);
                        }
                        self.dialogLoading = false;
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
                if(formName=="addForm"){
                    this.addTempForm.edu_category_name='';
                    this.addTempForm.education_name='';
                    this.addTempForm.is_online='';
                    this.addTempForm.score_mode='';
                }else if(formName=="editForm"){
                    this.editTemp.edu_category_name='';
                    this.editTemp.education_name='';
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
                        test_id:id,
                        conditions:self.conditions,
                        pageindex:self.pageindex
                    },
                    type:'post',
                    success:function (result) {
                        let listID=0;
                        self.detailForm = result.testinfo;
                        if(self.detailForm.score_mode=='0'){
                            self.detailForm.score_mode = '百分制';
                        }else if(self.detailForm.score_mode == '1'){
                            self.detailForm.score_mode = '二分制';
                        }else {
                            self.detailForm.score_mode = '五分制';
                        }
                        for (var i = 0; i < result.list.length; i++)
                            if (result.list[i].test_id === id) {
                                listID = i;
                            }
                        if (listID == 0) {
                            self.detailForm.btnToDisabled0 = true;
                        }
                        else {
                            self.detailForm.btnToDisabled0 = false;
                            var temp = listID - 1;
                            self.detailForm.previous = result.list[temp].test_id;
                        }

                        if (listID == (result.list.length - 1)) {
                            self.detailForm.btnToDisabled1 = true;
                        } else {
                            var temp = listID + 1;
                            self.detailForm.next = result.list[temp].test_id;
                            self.detailForm.btnToDisabled1 = false;
                        }
                        self.tableLoading=false;
                        self.detailDialogVisible=true;
                    },
                    error:handleError
                });
            },
            clickAddBtn:function(){
                let self = this;
                self.addDialogVisible=true;
                self.is_test=0;//正常考试
                self.addForm.test_type = 1;
                $(".makeup_visibility").css("display","none");
                $(".test_visibility").css("display","");
            },
            _add:function(formName){
                let self = this;
                this.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let start = new Date(self.addForm.test_start_time).getTime();
                        let end = new Date(self.addForm.test_end_time).getTime();
                        let delt = end - start;
                        if(delt>0){
                            if(self.addForm.education_id == ''){
                                self.addForm.education_id = 0;
                            }
                            if(self.addForm.related_test_id == ''){
                                self.addForm.related_test_id = -1;//正常考试没有考试关联ID
                            }
                            self.addForm.test_start_time = moment(start).format('YYYY-MM-DD HH:mm:ss');
                            self.addForm.test_end_time = moment(end).format('YYYY-MM-DD HH:mm:ss');
                            //console.log("start_time:"+moment(self.addForm.test_start_time.getTime()).format('YYYY-MM-DD HH:mm:ss'));
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
                                        self.getList(1,'');
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
                    }else {
                        self.$message({
                            type: 'info',
                            message: '请检查考试起始时间与结束时间的大小关系!'
                        });
                    }
                });
            },
            _edit:function(id){
                let self = this;
                $.post('isTestStart', {
                        test_id:id
                    }, function (result) {
                    if (result == "success") {
                        self.$message({
                            type:'warning',
                            message:'考试已经开始，不能修改！'
                        });
                    }else {
                        self.editDialogVisible = true;
                        $.ajax({
                            url:'getEdit',
                            type:'post',
                            data:{
                                test_id:id
                            },
                            success:function (result) {
                                let test = result.rmap;
                                if(test.education_id == 0){
                                    test.education_id = '';
                                }
                                self.editForm = test;
                                self.editTempForm = self.copy(self.editForm);
                                let tmap = result.tmap;
                                self.editTemp.edu_category_name = tmap.edu_category_name;
                                self.editTemp.education_name = tmap.education_name;
                                if(test.test_type=="2"){//补考
                                    self.editTemp.is_online_name = tmap.is_online_name;
                                    self.editTemp.score_mode_name = tmap.score_mode_name;
                                    $(".edit_makeup_visibility").css("display","");
                                    $(".edit_test_visibility").css("display","none");
                                }else {
                                    $(".edit_makeup_visibility").css("display","none");
                                    $(".edit_test_visibility").css("display","");
                                }
                            },
                            error:handleError
                        })
                    }
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
                        if(delt>0){
                            $('#category_select').attr("disabled",false);
                            self.editForm.test_start_time = moment(start).format('YYYY-MM-DD HH:mm:ss');
                            self.editForm.test_end_time = moment(end).format('YYYY-MM-DD HH:mm:ss');
                            console.log(JSON.stringify(self.editForm).toString());
                            if(self.editForm.education_id == ''){
                                self.editForm.education_id = 0;
                            }
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
                                        self._edit(self.editForm.test_id);
                                    }else {
                                        self.$message({
                                            type: 'fail',
                                            message: '修改失败!'
                                        });
                                    }
                                },
                                error:handleError
                            });
                        }else {
                            self.$message({
                                type: 'info',
                                message: '请检查考试起始时间与结束时间的大小关系!'
                            });
                        }

                    }
                });
            },
            _predelete:function(){
                let self = this;
                if (self.idList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要删除这' + self.idList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        $.post('delete', {
                            id_list: self.idList.join(','),
                        }, function (result) {
                            let returnlist = result.returnlist;
                            /*for (let i=0;i<returnlist.length;i++){
                                console.log("returntext:"+returnlist[i].returntext);
                                if(returnlist[i].returntext=="before"){
                                     self.$confirm('如果'+returnlist[i].test_name+'已经组卷，会删除相应试卷内容，确定删除吗?', '提示', {
                                         confirmButtonText: '确定',
                                         cancelButtonText: '取消',
                                         type: 'warning'
                                     }).then(() => {
                                         //删除此条考试信息记录
                                         //报名表中进行清除工作：如果绑定培训，则清空test_id,examinee_pwd；未绑定培训直接删除所有报名信息
                                         //删除试卷表中test_id的试卷记录
                                         $.when(
                                             self.deleteTestInfo(returnlist[i].test_id),
                                             self.cleanRollInfo(returnlist[i].test_id),
                                             self.deleteTestPaperInfo(returnlist[i].test_id)
                                         ).then(function () {
                                             if(self.delete_flag){
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
                                             self.getList(1,"");
                                         });
                                     }).catch(() => {
                                         self.$message({
                                             type: 'info',
                                             message: '已取消'+returnlist[i].test_name+'删除'
                                         });
                                     });
                                 }else if(returnlist[i].returntext=="between"){
                                     self.$message({
                                         type: 'warning',
                                         message: returnlist[i].test_name+'考试期间，不允许删除!'
                                     });
                                 }else if(returnlist[i].returntext=="nosubmit"||returnlist[i].returntext=="unonline_nosubmit"){//考试已结束但未提交成绩
                                     self.$message({
                                         type: 'warning',
                                         message: returnlist[i].test_name+'成绩未提交，不允许删除!'
                                     });
                                 }else if(returnlist[i].returntext=="makeup"||returnlist[i].returntext=="unonline_makeup"){//考试结束；成绩已提交；有补考名单
                                     self.$confirm('如果'+returnlist[i].test_name+'已经设置补考，会删除其补考内容，确定删除吗?', '提示', {
                                         confirmButtonText: '确定',
                                         cancelButtonText: '取消',
                                         type: 'warning'
                                     }).then(() => {
                                         //删除此条考试信息记录，如果有补考信息，则是删除补考信息记录
                                         //报名表中进行清除工作：如果绑定培训，则清空test_id,examinee_pwd；未绑定培训直接删除所有报名信息
                                         //修改成绩表中的信息
                                         //级联删除考生答题表（应该不会有相关记录）、试卷信息表中同一个test_id的所有记录
                                         $.when(
                                             self.deleteTestInfo(returnlist[i].test_id),
                                             self.cleanRollInfo(returnlist[i].test_id),
                                             self.updateGradeInfo(returnlist[i].test_id),
                                             self.deleteTestPaperInfo(returnlist[i].test_id),
                                             self.deleteTestScoreInfo(returnlist[i].test_id)
                                         ).then(function () {
                                             if(self.delete_flag){
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
                                             self.getList(1,"");
                                         });
                                     }).catch(() => {
                                         self.$message({
                                             type: 'info',
                                             message: '已取消'+returnlist[i].test_name+'删除'
                                         });
                                     });
                                 }
                                 else if(returnlist[i].returntext=="allpass"||returnlist[i].returntext=="unonline_allpass"){
                                     //删除此条考试信息
                                     //需要删除成绩表中的相关信息嘛？【不需要的话直接将test_id设为-1即可】
                                     $.when(
                                         self.deleteTestInfo(returnlist[i].test_id),
                                         self.updateGradeInfo(returnlist[i].test_id),
                                         self.deleteTestPaperInfo(returnlist[i].test_id),
                                         self.deleteTestScoreInfo(returnlist[i].test_id)
                                     ).then(function () {
                                         if(self.delete_flag){
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
                                         self.getList(1,"");
                                     });
                                 }else if(returnlist[i].returntext=="makeupnosubmit"||returnlist[i].returntext=="unonline_makeupnosubmit"){//补考成绩未提交
                                     self.$message({
                                         type: 'warning',
                                         message: returnlist[i].test_name+'成绩未提交，不允许删除!'
                                     });
                                 }else {//补考成绩已提交
                                    //删除试卷答题情况
                                    //删除试卷
                                    //删除此条补考信息
                                    $.when(
                                        self.deleteTestInfo(returnlist[i].test_id),
                                        self.deleteTestPaperInfo(returnlist[i].test_id),
                                        self.deleteTestScoreInfo(returnlist[i].test_id)
                                    ).then(function () {
                                        if (self.delete_flag) {
                                            self.$message({
                                                type: 'success',
                                                message: '删除成功！'
                                            });
                                        } else {
                                            self.$message({
                                                type: 'fail',
                                                message: '删除失败！'
                                            });
                                        }
                                        self.getList(1, "");
                                    });
                                }
                            }*/
                            console.log("success");
                            if(result=="after"){
                                self.$message({
                                    type:'warning',
                                    message:'部分考试已过考试时间，不允许进行删除！'
                                });
                            }else {
                                self.$message({
                                    type:'success',
                                    message:'删除成功！'
                                });
                                self.getList(1,'');
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
            },
            deleteTestInfo:function(test_id){//删除考试信息
                let self = this;
                $.ajax({
                    url:'deleteTestInfo',
                    type:'post',
                    data:{
                        test_id:test_id
                    },
                    success:function (result) {
                        if(result=="error"){
                            self.delete_flag = false;
                        }
                    },
                    error:handleError
                });
            },
            cleanRollInfo:function(test_id){//报名表中进行清除工作：如果绑定培训，则清空test_id,examinee_pwd；未绑定培训直接删除所有报名信息
                let self = this;
                $.ajax({
                    url:'cleanRollInfo',
                    type:'post',
                    data:{
                        test_id:test_id
                    },
                    success:function (result) {
                        if(result!="success"){
                            self.delete_flag = false;
                        }
                    },
                    error:handleError
                });
            },
            updateGradeInfo:function(test_id){//删除成绩表中的信息
                $.ajax({
                    url:'updateGradeInfo',
                    type:'post',
                    data:{
                        test_id:test_id
                    },
                    success:function (result) {
                        if(result!="success"){
                            self.delete_flag = false;
                        }
                    },
                    error:handleError
                });
            },
            deleteTestPaperInfo:function(test_id){
                let self = this;
                $.ajax({
                    url:'deleteTestPaperInfo',
                    type:'post',
                    data:{
                        test_id:test_id
                    },
                    success:function (result) {
                        if(result!="success"){
                            self.delete_flag = false;
                        }
                    },
                    error:handleError
                });
            },
            deleteTestScoreInfo:function(test_id){
                let self = this;
                $.ajax({
                    url:'deleteTestScoreInfo',
                    type:'post',
                    data:{
                        test_id:test_id
                    },
                    success:function (result) {
                        if(result!="success"){
                            self.delete_flag = false;
                        }
                    },
                    error:handleError
                });
            },
            _released:function(){
                let self = this;
                if(self.editForm.is_released==1){
                    self.$message({
                        type: 'warning',
                        message: '此考试已发布!'
                    });
                }else {
                    $.ajax({
                        url:'setIsReleased',
                        type:'post',
                        data:{
                            test_id:self.editForm.test_id
                        },
                        success:function (result) {
                            if(result == "success"){
                                self.$message({
                                    type: 'success',
                                    message: '发布成功!'
                                });
                                self.editForm.is_released = 1;
                            }else {
                                self.$message({
                                    type: 'fail',
                                    message: '发布失败!'
                                });
                            }
                        },
                        error:handleError
                    });
                }

            },
            _mulreleased:function(){
                let self = this;
                if (self.idList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要发布这' + self.idList.length + '项考试吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        $.post('setMulReleased', {
                            id_list: self.idList.join(','),
                        }, function (result) {
                            if (result == "success") {
                                self.$message({
                                    type: 'success',
                                    message: '发布成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'error',
                                    message: '发布失败!'
                                });
                            }
                            self.getList(1, self.conditions);
                        });

                    }).
                    catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消发布'
                        });
                    });
                }
                else {
                    this.$message('请选择您要发布的记录，点击多选按钮选中！');
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
            _makeup:function(test_id,education_id){
                let self = this;
                //首先判断是否可以设置补考
                $.post('isMakeUp', {
                    test_id:test_id,
                    education_id:education_id
                }, function (result) {
                    if (result.returntext == "success") {
                        self.addDialogVisible = true;
                        //如果可以设置补考，获取相关数据
                        $.ajax({
                            url:'getMakeUpData',
                            type:'post',
                            data:{
                                test_id:test_id
                            },
                            success:function (result) {
                                //添加补考信息
                                self.addForm.test_type = 2;//补考
                                self.addForm.related_test_id = test_id;//正常考试没有考试关联ID
                                for (let key in result.rmap){
                                    self.addForm[key] = result.rmap[key];
                                }
                                for (let key in result.tmap){
                                    self.addTempForm[key] = result.tmap[key];
                                }
                                if(self.addForm.education_id == 0){
                                    self.addForm.education_id = '';
                                    if(self.addForm.test_name.indexOf("考试")>=0){
                                        self.addForm.test_name = self.addForm.test_name.replace("考试","补考");
                                    }else {
                                        self.addForm.test_name = self.addForm.test_name + "-补考";
                                    }
                                }
                                //设置培训类型、培训名称、是否机考、计分方式等禁用（还未实现2020-3-17）
                                $(".makeup_visibility").css("display","");
                                $(".test_visibility").css("display","none");
                                $("#bind_train_readonly").attr("readonly","true");
                            },
                            error:handleError
                        });
                    } else if(result.returntext=="is"){
                        //考试本身是补考
                        self.$message({
                            type: 'warning',
                            message: '此考试为补考，不可添加补考!'
                        });
                    }else if(result.returntext=="have"){
                        //考试已经添加补考
                        self.$message({
                            type: 'warning',
                            message: '此考试已经绑定补考，不可再添加补考!'
                        });
                    }else if(result.returntext=="noneed"){
                        //考试所有参与员工都合格
                        self.$message({
                            type: 'warning',
                            message: '此考试全部合格，不需要添加补考!'
                        });
                    }else {
                        //考试成绩还未提交
                        self.$message({
                            type: 'warning',
                            message: '此考试还未提交成绩，不可添加补考!'
                        });
                    }

                });
            },
            _enter:function(id,education_id,test_name,test_type){
                let self = this;
                self.enter_id = id;
                self.enter_education_id = education_id;
                self.enter_test_name = test_name;
                self.dialogLoading = true;
                $.post('isTestStart', {
                    test_id:id
                }, function (result) {
                    if(result=="error1"){
                        self.$message({
                            type:'warning',
                            message:'考试还未发布，不允许进行报名！'
                        });
                    }else if (result == "success") {
                        self.$message({
                            type:'warning',
                            message:'考试已经开始，不允许进行报名！'
                        });
                    }else {
                        self.enterDialogVisible = true;
                        $.ajax({
                            url:'getEnteredRoll',
                            type:'post',
                            data:{
                                test_id:id
                            },
                            success:function (result) {
                                if(result.roll.length>0){
                                    self.EmployeeList = result.roll;
                                    $("#RecordTable").show();
                                    self.enter_people_num = self.EmployeeList.length;
                                }else {
                                    self.enter_people_num =0;
                                    $("#RecordTable").hide();
                                }
                                console.log("education_id:"+education_id);
                                if(education_id==0){//没有绑定培训
                                    if(test_type=="1"){//正常考试名单可以修改
                                        $(".is_operated").css("display","");
                                    }else {//补考名单不可以修改
                                        $(".is_operated").css("display", "none");
                                    }
                                }else {
                                    $(".is_operated").css("display", "none");
                                }
                            },
                            error:handleError
                        });
                    }
                    self.dialogLoading = false;

                });
            },
            handleEnterDialog:function(){//关闭报名对话框
              let self = this;
              self.enter_id = '';
              self.enter_education_id = 0;
                self.enter_test_name = '';
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
                self.dialogLoading = true;
                $.ajax({
                    url:'getNotEnterRoll',
                    type:'post',
                    data:{
                        institution_list:self.addEmployeeForm.enter_institution_list,
                        test_id:self.enter_id
                    },
                    success:function (result) {
                        self.EmployeeListExceptPrincipalTemp = result.notroll;
                        self.EmployeeListExceptPrincipal = result.notroll;
                        for (let i=0;i<result.notroll.length;i++){
                            self.id_list_add.push(result.notroll[i].EmployeeNum);
                        }
                        self.dialogLoading = false;
                    },
                    error:handleError
                });
                self.getInstitutionList();
            },
            handleClose:function(formName){//关闭报名中添加员工对话框
                let self = this;
                $.ajax({
                    url:'getEnteredRoll',
                    type:'post',
                    data:{
                        test_id:self.enter_id
                    },
                    success:function (result) {
                        if(result.roll.length>0){
                            self.EmployeeList = result.roll;
                            $("#RecordTable").show();
                            $("#bottom-footer").show();
                            self.disabled_showRecord = true;
                            self.enter_people_num = self.EmployeeList.length;
                        }else {
                            $("#RecordTable").hide();
                            $("#bottom-footer").hide();
                            self.disabled_showRecord = false;
                            self.enter_people_num = 0;
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
                self.dialogLoading = true;
                $.ajax({
                    url:'addEmployee',
                    type:'post',
                    data:{
                        employee_num:self.idAddList.join(','),
                        test_id:self.enter_id
                    },
                    success:function (result) {
                        if(result == "success"){
                            self.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            self.search = '';
                            self.screen();
                        }else {
                            self.$message({
                                type: 'fail',
                                message: '添加失败!'
                            });
                        }
                        self.dialogLoading = false;
                    },
                    error:handleError
                });
            },
            deleteEmployee:function () {
                let self = this;
                self.dialogLoading = true;
                if (self.idAddList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要删除这' + self.idAddList.length + '个员工吗?', '提示', {
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
                                self._enter(self.enter_id, self.enter_education_id,self.enter_test_name);
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
                self.dialogLoading = false;
            },
            printEmployee:function(){
                let self = this;
                if(self.EmployeeList.length>0){
                    httpPost_aes('printEmployee', {
                        test_id: self.enter_id,
                        test_name:self.enter_test_name
                    });
                }else {
                    this.$message({
                        type:'warning',
                        message:'无符合筛选条件记录！'
                    });
                }
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
            getEducationList:function(){
                let self = this;
                $.ajax({
                    url:'getEducationList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.educationlist = result.educationlist;
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
        },
        watch:{
            'addForm.test_start_time':function(val, oldval){
                let self = this;
                if(val && self.addForm.test_end_time){
                    let start = new Date(self.addForm.test_start_time).getTime();
                    let end = new Date(self.addForm.test_end_time).getTime();
                    let delt = end - start;
                    if(delt<0){
                        self.$message({
                            type: 'info',
                            message: '请保证考试开始时间小于考试结束时间!'
                        });
                    }else {
                        self.addForm.test_time = Math.floor(delt / (1000*60));
                    }
                }
            },
            'addForm.test_end_time':function(val, oldval){
                let self = this;
                if(val && self.addForm.test_start_time){
                    let start = new Date(self.addForm.test_start_time).getTime();
                    let end = new Date(self.addForm.test_end_time).getTime();
                    let delt = end - start;
                    if(delt<0){
                        self.$message({
                            type: 'info',
                            message: '请保证考试开始时间小于考试结束时间!'
                        });
                    }else {
                        self.addForm.test_time = Math.floor(delt / (1000*60));
                    }
                }
            },
            'addForm.education_id':function (val, oldval) {
                let self = this;
                console.log("val:"+val);
                //考试名称后边加-考试
                if(val&&val!=''&&val!=0){//培训类型改变且有值且不为0
                    $.ajax({
                        url:'getNameAndCategoryByID',
                        type:'post',
                        data:{
                            education_id:self.addForm.education_id
                        },
                        success:function (result) {
                            if(self.addForm.test_type==1){//绑定培训的正常考试
                                self.addForm.test_name = result.education_name + "-考试";
                                self.addTempForm.edu_category_name = result.edu_category_name;
                                //设置考试名称和培训类型只读
                                $("#bind_train_readonly").attr("readonly","true");
                                if($(".bind_train_visibility").css("display")!=""){
                                    $(".bind_train_visibility").css("display","");
                                }
                                if($(".no_train_visibility").css("display")!="none"){
                                    $(".no_train_visibility").css("display","none");
                                }

                            }else {//补考
                                //设置培训类型、培训名称、是否机考、计分方式等禁用（还未实现2020-3-17）
                                if($(".makeup_visibility").css("display")!=""){
                                    $(".makeup_visibility").css("display","");
                                }
                                if($(".test_visibility").css("display")!="none"){
                                    $(".test_visibility").css("display","none");
                                }
                                $("#bind_train_readonly").attr("readonly","true");
                                self.addForm.test_name = result.education_name + "-补考";
                            }
                            self.addForm.edu_category_id = result.edu_category_id;
                        },
                        error:handleError
                    });
                }else {
                    if(self.addForm.test_type==2){//补考
                        console.log("考试类型：补考");
                        if(self.addForm.test_name.indexOf("考试")>=0){
                            self.addForm.test_name = self.addForm.test_name.replace("考试","补考");
                        }else {
                            self.addForm.test_name = self.addForm.test_name + "-补考";
                        }
                        //设置培训类型、培训名称、是否机考、计分方式等禁用（还未实现2020-3-17）
                        $(".makeup_visibility").css("display","");
                        $(".test_visibility").css("display","none");
                        $("#bind_train_readonly").attr("readonly","true");
                    }else{//正常考试
                        $("#bind_train_readonly").attr("readonly",false);
                        $(".bind_train_visibility").css("display","none");
                        $(".no_train_visibility").css("display","");
                        self.addForm.test_name = '';
                        self.addForm.edu_category_id='';
                    }
                }
            },
            'editForm.test_start_time':function(val, oldval){
                let self = this;
                if(val && self.editForm.test_end_time){
                    let start = new Date(self.editForm.test_start_time).getTime();
                    let end = new Date(self.editForm.test_end_time).getTime();
                    let delt = end - start;
                    if(delt<0){
                        self.$message({
                            type: 'info',
                            message: '请保证考试开始时间小于考试结束时间!'
                        });
                    }else {
                        self.editForm.test_time = Math.floor(delt / (1000*60));
                    }
                }
            },
            'editForm.test_end_time':function(val, oldval){
                let self = this;
                if(val && self.editForm.test_start_time){
                    let start = new Date(self.editForm.test_start_time).getTime();
                    let end = new Date(self.editForm.test_end_time).getTime();
                    let delt = end - start;
                    if(delt<0){
                        self.$message({
                            type: 'info',
                            message: '请保证考试开始时间小于考试结束时间!'
                        });
                    }else {
                        self.editForm.test_time = Math.floor(delt / (1000*60));
                    }
                }
            },
            'addForm.is_online':function (val, oldval) {
                let self = this;
                if(val&&val=='1'){
                    self.addForm.score_mode = '0';//百分制
                }
            },
            'editForm.is_online':function (val, oldval) {
                let self = this;
                if(val&&val=='1'){
                    self.editForm.score_mode = '0';//百分制
                }
            }
        },
        created:function () {
            this.getCategoryList();
            this.getEducationList();
            this.getList(1, '');
        }
    });
});