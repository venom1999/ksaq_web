$(function () {
    var list_vue = new Vue({
        el:"#right",
        data:{
            pageindex:0,
            pagenum:0,
            detailDialogVisible:false,
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
            releasedlist:[
                {
                    value: 1,
                    label: '是'
                },{
                    value: 0,
                    label: '否'
                },
            ],
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
                is_released:'',
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: '',
            },
            tableLoading:false,
            dialogLoading:false,
            categorylist:[],
            institutionlist:[],
            resourcelist:[],
            list:[],
            id_list: [], //多选选中的id数组，以,隔开
        },
        methods:{
            filter:function(){
                let self = this;
                let params = self.getQuery(self.params);
                this.getList(1, params.join('and'));
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
                    url:"getNoticeList",
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
                console.log("condition:"+self.conditions);
                $.ajax({
                    url:'getNoticeDetail',
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
            _notice_enter:function(id){
                let self = this;
                //报名之前判断是否报名人数已满
                $.ajax({
                    url:'enterSingle',
                    type:'post',
                    data:{
                        education_id:id
                    },
                    success:function (result) {
                        if(result=="success"){
                            self.$message({
                                type: 'success',
                                message: '报名成功!'
                            });
                        }else if(result =="error1"){
                            self.$message({
                                type: 'warning',
                                message: '已报名!'
                            });
                        } else if(result =="error2"){
                            self.$message({
                                type: 'warning',
                                message: '报名已满!'
                            });
                        } else {
                            self.$message({
                                type: 'error',
                                message: '报名失败!'
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
        },
        created:function () {
            this.getCategoryList();
            this.getInstitutionList();
            this.getResourceList();
            this.getList(1, '');
        }
    });
});