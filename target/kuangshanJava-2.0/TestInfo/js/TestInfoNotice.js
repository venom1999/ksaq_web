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
                label: '考试类型：',
                type: 'select',
                model: 'test_type',
            },{
                label: '培训名称：',
                type: 'select',
                model: 'education_id',
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
                value: '2',
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
            tableLoading:false,
            dialogLoading:false,
            institutionlist:[],
            resourcelist:[],
            positionlist:[],
            list:[],
        },
        methods:{
            filter: function () {
                let self = this;
                let params = self.getQuery(self.params);
                self.getList(1, params.join('and'));
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
                                    }else if(col.label=='考试类型：'){
                                        exportparams.push(col.label + self.test_type_list.find(function(x) {return x.value === col.value;}).label);
                                    }else if(col.label=='培训名称：'){
                                        exportparams.push(col.label + self.educationlist.find(function(x) {return x.education_id === col.value;}).education_name);
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
                $.ajax({
                    url:'getNoticeDetail',
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
        created:function () {
            this.getCategoryList();
            this.getEducationList();
            this.getList(1, '');
        }
    });
});