$(function () {
    var list_vue = new Vue({
        el: "#right",
        data: {

            isOnlineList: [
                {
                    key: 0,
                    value: '非机考'
                },
                {
                    key: 1,
                    value: '机考'
                }
            ],

            singleChooseList: [],       // 相应类别单选题列表
            multiChoiceList: [],        // 相应类别多选题列表
            judgeList: [],              // 相应类别判断题列表

            fillInBlanksList: [],       // 相应类别填空题列表
            questionAndAnswerList: [],  // 相应类别问答题列表

            paperSingleList: [],        // 试卷中的单选题列表
            paperMultiList: [],         // 试卷中的多选题列表
            paperJudgeList: [],         // 试卷中的判断题列表

            paperBlanksList: [],        // 试卷中的填空题列表
            paperQuestionList: [],      // 试卷中的问答题列表

            list: [],                   // 显示表格列表
            testInfoList: [],           // 考试信息列表
            pagenum: 0,
            pageindex: 0,

            conditions: '',
            tableLoading: false,
            id_list: [], //多选选中的id数组，以,隔开

            single_id_list: [],      // 修改试卷时需要用到
            multi_id_list: [],
            judge_id_list: [],

            blank_id_list: [],
            question_id_list: [],

            addDialogVisible: false,
            editPartDialogVisible: false,    // 修改题型和小分的页面
            editPaperDialogVisible: false,   // 修改试卷题目
            detailDialogVisible: false,

            viewDialogVisible1: false,
            viewDialogVisible0: false,
            audioDialogVisible: false,

            picviewDialogVisible: false,
            editAddDialogVisible: false,
            answerDialogVisible: false,

            tempList: [],
            addFrom: {
                test_id: '',
                total_score: 100,
                single_choose_num: '',
                single_choose_score: '',

                multi_choice_num: '',
                multi_choice_score: '',

                judge_num: '',
                judge_score: '',

                blanks_test_num: 0,
                blanks_test_score: 0,

                question_num: 0,
                question_score: 0,

                single_choose: '',
                multi_choice: '',
                judge: '',

                question: '',
                blanks_test: '',
            },
            tempFrom: {},

            detailFrom: {
                title1: '',
                title2: '',
                title3: '',

                title4: '',
                title5: '',
            },
            editFrom: {
                test_id: '',
                total_score: 100,
                single_choose_num: '',
                single_choose_score: '',

                multi_choice_num: '',
                multi_choice_score: '',

                judge_num: '',
                judge_score: '',

                blanks_test_num: 0,
                blanks_test_score: 0,

                question_num: 0,
                question_score: 0,

                single_choose: '',
                multi_choice: '',
                judge: '',

                question: '',
                blanks_test: '',
            },
            editAddFrom: {
                filterName: '',    // 查询名
                type: '',    // single, multi, judge, question, blank
                list: '',    // 题目列表

                pagenum: '',    // 题型分页
                pageindex: '',    // 当前页
                added: [],    // 已经添加的题目

                temp: [],    // 临时保存添加后的题目
                title: '',    // 查询题干内容
            },

            ID: "",
            pickerOptions1: {
                shortcuts: [{
                    text: '明天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周后',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },

            // 查询参数
            params: [
                {
                    label: '考试名称：',
                    type: 'plain',
                    model: 'test_name',
                },
                {
                    label: '培训类型：',
                    type: 'plain',
                    model: 'edu_category_name',
                },
                {
                    label: '考试类型：',
                    type: 'select',
                    model: 'is_online',
                    value: 1,
                },

            ],

            // 添加/修改时用户输入提示
            rules: {
                edu_category_name: [
                    {required: true, message: '请输入类型名称', trigger: 'blur'}
                ],

                deleted: [
                    {required: true, message: '请选择是否删除', trigger: 'change'}
                ],
                test_id:[
                    {required:true,message:'请选择考试编号及名称',trigger:'change'}
                ],
                total_score:[
                    {required:true,message:'请输入考试总分',trigger:'blur'}
                ],
                single_choose_num:[
                    {required:true,message:'请输入单选题个数',trigger:'blur'}
                ],
                single_choose_score:[
                    {required:true,message:'请输入单选题小分',trigger:'blur'}
                ],
                multi_choice_num:[
                    {required:true,message:'请输入多选题个数',trigger:'blur'}
                ],
                multi_choice_score:[
                    {required:true,message:'请输入多选题小分',trigger:'blur'}
                ],
                judge_num:[
                    {required:true,message:'请输入判断题个数',trigger:'blur'}
                ],
                judge_score:[
                    {required:true,message:'请输入判断题小分',trigger:'blur'}
                ],
                blanks_test_num:[
                    {required:true,message:'请输入填空题个数',trigger:'blur'}
                ],
                blanks_test_score:[
                    {required:true,message:'请输入填空题小分',trigger:'blur'}
                ],
                question_num:[
                    {required:true,message:'请输入问答题个数',trigger:'blur'}
                ],
                question_score:[
                    {required:true,message:'请输入问答题小分',trigger:'blur'}
                ]
            },
        },


        // 多选按钮
        computed: {
            idList: function () {
                let vm = this;
                let idlist = [];
                vm.id_list.forEach(function (val) {
                    if (val) {
                        idlist.push(val);
                    }
                });
                return idlist;
            },

            editSingleIdList: function () {
                let self = this;
                let tempList = [];
                self.single_id_list.forEach(function (item) {
                    if (item) {
                        tempList.push(item);
                    }
                });
                return tempList;
            },

            editMultiIdList: function () {
                let self = this;
                let tempList = [];
                self.multi_id_list.forEach(function (item) {
                    if (item) {
                        tempList.push(item);
                    }
                });
                return tempList;
            },

            editJudgeIdList: function () {
                let self = this;
                let tempList = [];
                self.judge_id_list.forEach(function (item) {
                    if (item) {
                        tempList.push(item);
                    }
                });
                return tempList;
            },

            editBlankIdList: function () {
                let self = this;
                let tempList = [];
                self.blank_id_list.forEach(function (item) {
                    if (item) {
                        tempList.push(item);
                    }
                });
                return tempList;
            },

            editQuestionIdList: function () {
                let self = this;
                let tempList = [];
                self.question_id_list.forEach(function (item) {
                    if (item) {
                        tempList.push(item);
                    }
                });
                return tempList;
            },


            OnlineList: function () {
                let self = this;
                if (self.list != null) {
                    if (self.params[2].value == 0) {
                        return self.list.filter(function (item) {
                            return item.is_online == 0;
                        })
                    } else if (self.params[2].value == 1) {
                        return self.list.filter(function (item) {
                            return item.is_online == 1;
                        })
                    }

                }
            }

        },


        methods: {

            // 查询
            filter: function () {
                let newparams = getParams(this.params);
                this.getList(1, newparams);
            },


            //表单重置
            resetForm(formName) {
                if (formName === 'editFrom') {
                    this.editFrom = this.copy(this.tempFrom);
                }
            },


            //点击复选框id_list自动更新
            checkItems: function (ID) {
                if (this.id_list.indexOf(ID) >= 0) {
                    this.id_list.splice($.inArray(ID, this.id_list), 1);
                } else {
                    this.id_list.push(ID);
                }
            },


            // 关闭表单
            closeFrom(formName) {
                if (formName == 'addFrom') {
                    this.init_addFrom(this.addFrom);
                }
            },


            // 重置添加属性
            init_addFrom ( obj ) {
                for (let item in obj) {
                    if (item == 'total_score') {
                        obj[item] = 100;
                    } else if (item == 'blanks_test_num' ||
                               item == 'blanks_test_score' ||
                               item == 'question_num' ||
                               item == 'question_score') {
                        obj[item] = 0;
                    } else {
                        obj[item] = '';
                    }
                }
            },


            // 清空对象属性
            clearObj ( obj ) {
                if (obj == 'editAddFrom') {
                    obj = this.editAddFrom;
                }

                for (let item in obj) {

                    if (Object.prototype.toString.call(obj[item]) === "[object Array]") {
                        obj[item] = [];
                    } else if (Object.prototype.toString.call(obj[item])==='[object Object]'){
                        obj[item] = {};
                    } else {
                        obj[item] = '';
                    }
                }
            },


            //获取list 当前页面需要显示的内容
            getList: function (pageindex, conditions) {
                let self = this;
                self.pageindex = pageindex || 1;

                if(conditions !== undefined) {
                    self.conditions = conditions;
                }
                self.tableLoading = true;

                $.ajax({
                    url: 'getList',
                    type: "post",
                    data: {
                        pageindex: self.pageindex,
                        conditions: self.conditions
                    },
                    dataType: 'json',
                    success: function ( data ) {
                        self.list = data.list;

                        if (self.list != null) {
                            self.list.map(function (item) {
                                if (item.single_choose === ''
                                    && item.multi_choice === ''
                                    && item.judge === ''
                                    && item.blanks_test === ''
                                    && item.question === ''
                                ) {
                                    item.paper = 0;
                                } else {
                                    item.paper = 1;
                                }
                            });
                        }

                        self.pagenum = data.pageNum;
                        self.id_list = data.list.map((val) => '');
                        self.getTestInfo();
                        self.tableLoading = false;
                    },
                    error: handleError

                });
            },


            // 添加必填项是否为空
            isAdd: function( obj ) {
                let self = this;
                if (obj.test_id === '' ||
                    obj.single_choose_num === '' ||
                    obj.single_choose_score === '' ||
                    obj.multi_choice_num === '' ||
                    obj.multi_choice_score === '' ||
                    obj.judge_num === '' ||
                    obj.judge_score === '' ||
                    obj.blanks_test_num === '' ||
                    obj.blanks_test_score === '' ||
                    obj.question_num === '' ||
                    obj.question_score === ''
                ) {
                    self.$message({
                        type: 'warning',
                        message: '必填项不能为空!'
                    });
                   return false;
                } else if (self.isInt(obj.single_choose_num)
                        && self.isNumber(obj.single_choose_score)
                        && self.isInt(obj.multi_choice_num)
                        && self.isNumber(obj.multi_choice_score)
                        && self.isInt(obj.judge_num)
                        && self.isNumber(obj.judge_score)
                        && self.isInt(obj.blanks_test_num)
                        && self.isNumber(obj.blanks_test_score)
                        && self.isInt(obj.multi_choice_num)
                        && self.isInt(obj.question_num)
                        && self.isNumber(obj.question_score)
                ) {
                    return true;
                } else {
                    self.$message({
                        type: 'warning',
                        message: '题目个数和分数必须为有效数字!'
                    });
                    return false;
                }
            },


            // 判断值是否是数字
            isNumber: function ( data ) {
                if (parseFloat(data).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },


            // 是否是正整数
            isInt: function ( data ) {
                data = Number(data);
                return typeof data === 'number' && data % 1 === 0
            },


            // 是否可以组卷
            isGenerate: function( obj ) {
                let self = this;
                let edu_category;

                // 获取考试的培训资源分类id
                if (self.testInfoList != null) {
                    edu_category = self.testInfoList.find(function (x) {
                        return x.test_id === obj.test_id;
                    }).edu_category_id;
                }

                // 根据考试培训资源分类id获取题目
                self.getExamByCategory(edu_category);

                let tempS = obj.single_choose_num * obj.single_choose_score
                    + obj.multi_choice_num * obj.multi_choice_score
                    + obj.judge_num * obj.judge_score
                    + obj.blanks_test_num * obj.blanks_test_score
                    + obj.question_num * obj.question_score;

                if (tempS != obj.total_score) {
                    self.$message({
                        type: 'warning',
                        message: '题型分数与总分不相等!'
                    });
                    return false;
                }

                let singleLess = obj.single_choose_num - self.singleChooseList.length;
                if (singleLess > 0) {
                    self.$message({
                        type: 'warning',
                        message: '题库中该类型的单选题个数只有' + self.singleChooseList.length + '个!'
                    });
                    return false;
                }

                let multiLess = obj.multi_choice_num - self.multiChoiceList.length;
                if (multiLess > 0) {
                    self.$message({
                        type: 'warning',
                        message: '题库中该类型的多选题个数只有' + self.multiChoiceList.length + '个!'
                    });
                    return false;
                }

                let judgeLess = obj.judge_num - self.judgeList.length;
                if (judgeLess > 0) {
                    self.$message({
                        type: 'warning',
                        message: '题库中该类型的判断题个数只有' + self.judgeList.length + '个!'
                    });
                    return false;
                }

                let blanksLess = obj.blanks_test_num - self.fillInBlanksList.length;
                if (blanksLess > 0) {
                    self.$message({
                        type: 'warning',
                        message: '题库中该类型的填空题个数只有' + self.fillInBlanksList.length + '个!'
                    });
                    return false;
                }

                let questionLess = obj.question_num - self.questionAndAnswerList.length;
                if (questionLess > 0) {
                    self.$message({
                        type: 'warning',
                        message: '题库中该类型的问答题个数只有' + self.questionAndAnswerList.length + '个!'
                    });
                    return false;
                }

                return true;
            },


            // 保存题目类型，且组卷
            _add: function () {
                let self = this;
                if (self.isAdd(self.addFrom) && self.isGenerate(self.addFrom)) {
                    self.generate(self.addFrom);
                    self.addDialogVisible = false;
                }
            },


            // 保存题目类型，不组卷
            _save: function() {
                let self = this;

                if (self.isAdd(self.addFrom) && self.isGenerate(self.addFrom)) {
                    self.tableLoading = true;
                    $.ajax({
                        url: 'save',
                        type: "post",
                        data: JSON.stringify(self.addFrom),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function ( data ) {
                            if (data.record === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                                self.addDialogVisible = false;
                                self.closeFrom('addFrom');
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '保存失败!'
                                });
                            }
                            self.tableLoading = false;
                            self.getList(self.pageindex, self.conditions);
                            self.addDialogVisible = false;
                        },
                        error: handleError
                    });

                }

            },


            // 点击组卷按钮进行组卷
            _generate: function ( ID ) {
                let self = this;
                let obj = self.list.find(function (item) {
                    return item.paper_id === ID;
                });

                let timestamp = Date.parse(new Date());
                if (timestamp > obj.test_start_time) {
                    self.$message({
                        type: 'warning',
                        message: '该考试已开始或结束，禁止修改！'
                    });
                    return;
                }

                // 根据考试培训资源分类id获取题目
                self.getExamByCategory(obj.edu_category_id);
                self.generate(obj);
            },


            // 组卷操作
            generate: function ( obj ) {
                let self = this;
                let singleArr = self.randomNum(self.singleChooseList.length, obj.single_choose_num);
                let multiArr = self.randomNum(self.multiChoiceList.length, obj.multi_choice_num);

                let judgeArr = self.randomNum(self.judgeList.length, obj.judge_num);
                let blankArr = self.randomNum(self.fillInBlanksList.length, obj.blanks_test_num);
                let questionArr = self.randomNum(self.questionAndAnswerList.length, obj.question_num);

                let singleStr = self.getIdStr(singleArr, self.singleChooseList);
                let multiStr = self.getIdStr(multiArr, self.multiChoiceList);
                let judgeStr = self.getIdStr(judgeArr, self.judgeList);

                let blankStr = self.getIdStr(blankArr, self.fillInBlanksList);
                let questionStr = self.getIdStr(questionArr, self.questionAndAnswerList);

                obj.single_choose = singleStr;
                obj.multi_choice = multiStr;
                obj.judge = judgeStr;

                obj.blanks_test = blankStr;
                obj.question = questionStr;
                
                self.tableLoading = true;
                $.ajax({
                    url: 'editPart',
                    type: "post",
                    async: false,
                    data: JSON.stringify(obj),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function ( data ) {
                        self.tableLoading = false;

                        if (data.record === "success") {
                            self.$message({
                                type: 'success',
                                message: '组卷成功!'
                            });
                        } else {
                            self.$message({
                                type: 'fail',
                                message: '组卷失败!'
                            });
                        }
                        self.getList(self.pageindex, self.conditions);
                    },
                    error: handleError
                });
            },


            // 从[0, range]中随机取n个正整数
            randomNum: function(range, n) {
                if (typeof range !== "number" || typeof n !== "number") {
                    range = parseInt(range);
                    n = parseInt(n);
                };  //对象检测

                let arrNum = [];
                if (range <= n) {
                    for (let j = 0; j < range; j++) {
                        arrNum.push(j);
                    };
                    return arrNum;
                }
                else {    //如果r大于l就生成0到num-1的每一个数
                    while(arrNum.length < n){
                        let random = Math.round(Math.random() * (range - 1));
                        if (arrNum.indexOf(random) == -1) {
                            arrNum.push(random);
                        }
                    }
                    return arrNum;
                }
            },


            // 获取随机抽取的题目id
            getIdStr: function ( arr, list ) {
                let temp = [];
                if (arr != null) {
                    for (let item in arr) {
                        if (list[0].single_choose_id != null) {
                            temp.push(list[arr[item]].single_choose_id);
                        } else if (list[0].multi_choice_id != null) {
                            temp.push(list[arr[item]].multi_choice_id);
                        } else if (list[0].judge_id != null) {
                            temp.push(list[arr[item]].judge_id);
                        } else if (list[0].blank_id != null) {
                            temp.push(list[arr[item]].blank_id);
                        } else if (list[0].question_id != null) {
                            temp.push(list[arr[item]].question_id);
                        }

                    }
                }
                return temp.toString();
            },


            // 深度copy对象，即二者互不干扰
            copy(obj) {
                let objCopy = {}; // objCopy 将存储 mainObj 的副本
                objCopy = Object.assign({}, obj);
                return objCopy;
            },


            // 深度copy对象，这个好用
            deepCopy(obj) {
                let newObj = obj.constructor === Array ? [] : {};
                if(typeof obj !== 'object'){
                    return;
                }
                for(let i in obj){
                    newObj[i] = typeof obj[i] === 'object' ? this.deepCopy(obj[i]) : obj[i];
                }
                return newObj;
            },


            // 修改题型和小分弹窗
            _editPart: function (ID) {
                let self = this;


                let obj = self.list.find(function (item) {
                    return item.paper_id === ID;
                });

                let timestamp = Date.parse(new Date());
                if (timestamp > obj.test_start_time) {
                    self.$message({
                        type: 'warning',
                        message: '该考试已开始或结束，禁止修改！'
                    });
                    return;
                }

                self.editPartDialogVisible = true;
                self.tableLoading = true;
                self.editFrom = self.copy(obj);
                self.tempFrom = self.copy(obj);
                self.tableLoading = false;
            },


            // 提交修改后的题型和小分
            _submitEditPart: function() {
                let self = this;

                if (self.isAdd(self.editFrom) && self.isGenerate(self.editFrom)) {
                    $.ajax({
                        url: 'editPart',
                        type: "post",
                        data: JSON.stringify(self.editFrom),
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function ( data ) {
                            if (data.record === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '保存失败!'
                                });
                            }
                            self.tableLoading = false;
                            self.editPartDialogVisible = false;
                            self.getList(self.pageindex, self.conditions);

                        },
                        error: handleError
                    });

                }
            },


            // 修改试卷题目
            _editPaper: function (ID) {
                let self = this;

                self.id_list = self.paperSingleList.map((val) => '');
                let obj = self.list.find(function (item) {
                    return item.paper_id === ID;
                });
                self.editFrom = self.copy(obj);

                let timestamp = Date.parse(new Date());
                if (timestamp > obj.test_start_time) {
                    self.$message({
                        type: 'warning',
                        message: '该考试已开始或结束，禁止修改！'
                    });
                    return;
                }

                self.getExamPaper(self.editFrom);

                self.editPaperDialogVisible = true;
                self.tableLoading = true;

                self.tableLoading = false;
            },


            // 修改中的添加按钮
            _editAdd: function ( testType ) {
                let self = this;
                self.editAddDialogVisible = true;
                self.clearObj(self.id_list);

                // 根据考试培训资源分类id获取题目
                self.getExamByCategory(self.editFrom.edu_category_id);

                if (testType === 'single') {
                    self.editAddFrom.type = 'single';
                    self.editAddFrom.filterName = '单选题题干';
                    self.editAddFrom.pageindex = 1;

                    self.tempList = self.deepCopy(self.singleChooseList);    // 复制题目列表进行操作

                    self.editFrom.single_choose.split(',').map(function (item) {
                        self.tempList = self.tempList.filter(function (x) {
                            return item != x.single_choose_id;
                        });
                    });

                    self.editAddFrom.pagenum = self.tempList.length / 5;
                    self.editAddFrom.list =
                        self.tempList.slice(0, self.tempList.length > 5? 5 : self.tempList.length);

                } else if (testType === 'multi') {
                    self.editAddFrom.type = 'multi';
                    self.editAddFrom.filterName = '多选题题干';
                    self.editAddFrom.pageindex = 1;

                    self.tempList = self.deepCopy(self.multiChoiceList);    // 复制题目列表进行操作

                    self.editFrom.multi_choice.split(',').map(function (item) {
                        self.tempList = self.tempList.filter(function (x) {
                            return item != x.multi_choice_id;
                        });
                    });

                    self.editAddFrom.pagenum = self.tempList.length / 5;
                    self.editAddFrom.list =
                        self.tempList.slice(0, self.tempList.length > 5? 5 : self.tempList.length);

                } else if (testType === 'judge') {
                    self.editAddFrom.type = 'judge';
                    self.editAddFrom.filterName = '判断题题干';
                    self.editAddFrom.pageindex = 1;

                    self.tempList = self.deepCopy(self.judgeList);    // 复制题目列表进行操作

                    self.editFrom.judge.split(',').map(function (item) {
                        self.tempList = self.tempList.filter(function (x) {
                            return item != x.judge_id;
                        });
                    });

                    self.editAddFrom.pagenum = self.tempList.length / 5;
                    self.editAddFrom.list =
                        self.tempList.slice(0, self.tempList.length > 5? 5 : self.tempList.length);

                }

            },


            // 修改中添加试题
            _editAddTest: function ( testType ) {
                let self = this;
                if (self.idList != null) {
                    self.idList.map(function (item) {
                        if (self.editAddFrom.added.indexOf(item) === -1) {
                            self.editAddFrom.added.push(item);
                        }
                    });
                }

                if (testType === 'single') {
                    self.editAddFrom.temp = self.editFrom.single_choose.split(',');

                    // 已添加题目框中的题号
                    if (self.editAddFrom.added != null) {
                        self.editAddFrom.added.map(function (item) {
                            if (self.editAddFrom.temp.indexOf(item) == -1) {
                                self.editAddFrom.temp.push(item);
                            }
                        });
                    }

                    self.editAddFrom.temp.map(function (item) {
                        self.tempList = self.tempList.filter(function (x) {
                            return x.single_choose_id != item;
                        });
                    });
                    self.getSingleList(1);    // 添加后重新获取未选择的题目
                    self.clearObj(self.id_list);

                } else if (testType === 'multi') {
                    self.editAddFrom.temp = self.editFrom.multi_choice.split(',');

                    // 已添加题目框中的题号
                    if (self.editAddFrom.added != null) {
                        self.editAddFrom.added.map(function (item) {
                            if (self.editAddFrom.temp.indexOf(item) == -1) {
                                self.editAddFrom.temp.push(item);
                            }
                        });
                    }

                    self.editAddFrom.temp.map(function (item) {
                        self.tempList = self.tempList.filter(function (x) {
                            return x.multi_choice_id != item;
                        });
                    });
                    self.getSingleList(1);    // 添加后重新获取未选择的题目
                    self.clearObj(self.id_list);

                } else if (testType === 'judge') {
                    self.editAddFrom.temp = self.editFrom.judge.split(',');

                    // 已添加题目框中的题号
                    if (self.editAddFrom.added != null) {
                        self.editAddFrom.added.map(function (item) {
                            if (self.editAddFrom.temp.indexOf(item) == -1) {
                                self.editAddFrom.temp.push(item);
                            }
                        });
                    }

                    self.editAddFrom.temp.map(function (item) {
                        self.tempList = self.tempList.filter(function (x) {
                            return x.judge_id != item;
                        });
                    });
                    self.getSingleList(1);    // 添加后重新获取未选择的题目
                    self.clearObj(self.id_list);

                }


            },


            // 修改中保存添加的试题
            _editSaveTest: function ( testType ) {
                let self = this;

                if (self.editAddFrom.added == null || self.editAddFrom.added == '') {
                    self.$message({
                        type: 'warning',
                        message: '未添加题目，不能保存！请关闭！'
                    });
                    return;
                }

                if (testType === 'single') {
                    self.editFrom.single_choose = self.editAddFrom.temp.join(',');    // 将添加后的题号复制给修改框

                    let temp;
                    self.editAddFrom.added.map(function (item) {
                        temp = self.singleChooseList.find(function (x) {
                            return item == x.single_choose_id;
                        });
                        self.paperSingleList.push(temp);
                    });

                    self.$message({
                        type: 'success',
                        message: '添加题目成功!'
                    });

                } else if (testType === 'multi') {
                    self.editFrom.multi_choice = self.editAddFrom.temp.join(',');    // 将添加后的题号复制给修改框

                    let temp;
                    self.editAddFrom.added.map(function (item) {
                        temp = self.multiChoiceList.find(function (x) {
                            return item === x.multi_choice_id;
                        });
                        self.paperMultiList.push(temp);
                    });

                    self.$message({
                        type: 'success',
                        message: '添加题目成功!'
                    });

                } else if (testType === 'judge') {
                    self.editFrom.judge = self.editAddFrom.temp.join(',');    // 将添加后的题号复制给修改框

                    let temp;
                    self.editAddFrom.added.map(function (item) {
                        temp = self.judgeList.find(function (x) {
                            return item === x.judge_id;
                        });
                        self.paperJudgeList.push(temp);
                    });

                    self.$message({
                        type: 'success',
                        message: '添加题目成功!'
                    });

                }


                self.editAddDialogVisible = false;
                self.clearObj('editAddFrom');

            },


            // 修改 添加题目中的分页
            getSingleList: function( pageindex ) {
                let self = this;
                self.editAddFrom.pageindex = pageindex;
                self.editAddFrom.pagenum = self.tempList.length / 5;

                let len = self.tempList.length - (pageindex - 1) * 5;
                let readNum = (pageindex - 1) * 5;
                self.editAddFrom.list =
                    self.tempList.slice(readNum, len > 5 ? readNum + 5 : readNum + len);

            },


            // 修改添加中 的查询
            _editAddFilter: function () {
                let self = this;
                let temp = self.deepCopy(self.tempList);

                if (self.editAddFrom.title == '') {
                    self.getSingleList(1);
                }

                self.tempList = self.tempList.filter(function (item) {
                    if (self.editAddFrom.type === 'single') {
                        return item.choose_content.search(self.editAddFrom.title) !== -1;
                    } else if (self.editAddFrom.type === 'multi') {
                        return item.multi_choice_content.search(self.editAddFrom.title) !== -1;
                    }
                });
                self.getSingleList(1);
                self.tempList = self.deepCopy(temp);

            },


            // 修改单选题删除
            _editDelete: function ( testType ) {
                let self = this;
                if (testType === 'single') {

                    if (self.editSingleIdList.length > 0) {
                        this.$confirm('您确定要删除这' + self.editSingleIdList.length + '道单选题吗？',
                            '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'

                            }).then(() => {

                                let singleArr = self.editFrom.single_choose.split(',');

                                // 遍历被选中的id，然后在editfrom和singleList中删除
                                self.editSingleIdList.map(function (item) {
                                    singleArr = singleArr.filter(function (x) {
                                        return item != x;
                                    });

                                    self.paperSingleList = self.paperSingleList.filter(function (x) {
                                        return item != x.single_choose_id;
                                    });
                                });

                                self.$message({
                                    type: 'success',
                                    message: '删除单选题成功!'
                                });

                                self.editFrom.single_choose = singleArr.join(',');
                                self.clearObj(self.single_id_list);

                            }).catch(() => {
                                self.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });
                            });

                    } else {
                        this.$message('请选择您要删除的记录，点击多选按钮选中！');
                    }

                } else if (testType === 'multi') {

                    if (self.editMultiIdList.length > 0) {
                        this.$confirm('您确定要删除这' + self.editMultiIdList.length + '道多选题吗？',
                            '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'

                            }).then(() => {
                                let multiArr = self.editFrom.multi_choice.split(',');

                                // 遍历被选中的id，然后在editfrom和multiList中删除
                                self.editMultiIdList.map(function (item) {
                                    multiArr = multiArr.filter(function (x) {
                                        return item != x;
                                    });

                                    self.paperMultiList = self.paperMultiList.filter(function (x) {
                                        return item != x.multi_choice_id;
                                    });
                                });

                                self.$message({
                                    type: 'success',
                                    message: '删除多选题成功!'
                                });
                                self.editFrom.multi_choice = multiArr.join(',');
                                self.clearObj(self.multi_id_list);

                        }).catch(() => {
                            self.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });

                    } else {
                        this.$message('请选择您要删除的记录，点击多选按钮选中！');
                    }

                } else if (testType === 'judge') {
                    if (self.editJudgeIdList.length > 0) {
                        this.$confirm('您确定要删除这' + self.editJudgeIdList.length + '道判断题吗？',
                            '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'

                            }).then(() => {
                            let judgeArr = self.editFrom.judge.split(',');

                            // 遍历被选中的id，然后在editfrom和multiList中删除
                            self.editJudgeIdList.map(function (item) {
                                judgeArr = judgeArr.filter(function (x) {
                                    return item != x;
                                });

                                self.paperJudgeList = self.paperJudgeList.filter(function (x) {
                                    return item != x.judge_id;
                                });
                            });

                            self.$message({
                                type: 'success',
                                message: '删除多选题成功!'
                            });
                            self.editFrom.judge = judgeArr.join(',');
                            self.clearObj(self.judge_id_list);

                        }).catch(() => {
                            self.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });

                    } else {
                        this.$message('请选择您要删除的记录，点击多选按钮选中！');
                    }

                }


            },


            // 提交修改后的试卷
            _submitEditPaper: function () {
                let self = this;

                let singleLen = self.editFrom.single_choose == ''? 0 : self.editFrom.single_choose.split(',').length;
                let multiLen = self.editFrom.multi_choice == ''? 0 : self.editFrom.multi_choice.split(',').length;
                let judgeLen = self.editFrom.judge == ''? 0 : self.editFrom.judge.split(',').length;

                let blankLen = self.editFrom.blanks_test == ''? 0 : self.editFrom.blanks_test.split(',').length;
                let questionLen = self.editFrom.question == ''? 0 : self.editFrom.question.split(',').length;


                if (singleLen != self.editFrom.single_choose_num ||
                    multiLen != self.editFrom.multi_choice_num ||
                    judgeLen != self.editFrom.judge_num ||
                    blankLen != self.editFrom.blanks_test_num ||
                    questionLen != self.editFrom.question_num) {

                    self.$message({
                        type: 'warning',
                        message: '各题目数量不匹配，请确认后再保存！'
                    });
                    return;
                }


                $.ajax({
                    url: 'editPart',
                    type: "post",
                    data: JSON.stringify(self.editFrom),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function ( data ) {
                        if (data.record === "success") {
                            self.$message({
                                type: 'success',
                                message: '保存试卷成功!'
                            });
                        } else {
                            self.$message({
                                type: 'fail',
                                message: '保存试卷失败!'
                            });
                        }
                        self.tableLoading = false;

                        self.getList(self.pageindex, self.conditions);

                    },
                    error: handleError
                });

            },


            // 试卷详情
            _detail : function( ID ) {
                let self = this;

                self.tableLoading = true;
                let obj = self.list.find(function (item) {
                    return item.paper_id === ID;
                });
                self.detailFrom = self.copy(obj);

                self.getExamPaper(self.detailFrom);

                self.detailDialogVisible = true;
                self.tableLoading = false;
            },


            // 删除数组中的空值
            delArrEmpty: function ( arr ) {
                let result = [];
                arr.map(function(val) {
                    //过滤规则为，不为空串、不为null、不为undefined，也可自行修改
                    if (val !== "" && val != undefined) {
                        result.push(val);
                    }
                });
                return result;
            },


            // 删除列表数据
            _delete: function () {
                let self = this;

                if (this.idList.length > 0) {  //判断是否有选择
                    this.$confirm('您确定要删除这' + this.idList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        self.tableLoading = true;
                        $.post('Delete', {
                            id_list: this.idList.join(','),
                        }, function (result) {

                            if (result.record === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                self.$message({
                                    type: 'fail',
                                    message: '删除失败!'
                                });
                            }
                            self.getList(self.pageindex, self.conditions);
                        });

                    }).catch(() => {
                        self.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }
                else {
                    this.$message('请选择您要删除的记录，点击多选按钮选中！');
                    // alert('请选择您要删除的记录，点击多选按钮选中！');
                }


            },


            // 查看答案
            _seeAnswer: function() {
                let self = this;
                self.answerDialogVisible = true;
            },


            // 生成文档
            _createWord: function() {
                let self = this;

                let obj = {
                    id: self.detailFrom.paper_id,
                    single_choose: JSON.stringify(self.paperSingleList),
                    multi_choice: self.paperMultiList,
                    judge: self.paperJudgeList,
                    question: self.paperQuestionList,
                    blanks_test: self.paperBlanksList
                };


                // 压缩json字符串
                let params = encodeURIComponent(JSON.stringify(obj));
                let len = params.length;
                if (len > 1000) {
                    params = pako.gzip(params, {to: 'string'});
                }

                httpPost_aes('createPaper', {
                    params: params
                });

                // $.ajax({
                //     url: 'createPaper',
                //     type: "post",
                //     data: params,
                //     contentType: 'application/json',
                //     headers: {
                //         //如果 compressBeginLen 大于 1000,标记此次请求的参数使用了 gzip 压缩
                //         "Content-Encoding": len > 1000? "gzip" : ""
                //     },
                //     success: function ( data ) {
                //         console.log(data);
                //     },
                //     error: handleError
                // });

            },


            // 获取考试信息列表
            getTestInfo: function () {
                let self = this;
                $.ajax({
                    url: 'getTestInfo',
                    type: "post",
                    data: {},
                    dataType: 'json',
                    success: function (result) {
                        self.testInfoList = result;
                    },
                    error: handleError
                });
            },


            // 根据培训分类获取题目
            getExamByCategory: function ( edu_category ) {
                let self = this;
                $.ajax({
                    url: 'getExamByCategory',
                    type: "post",
                    async: false,
                    data: { edu_category : edu_category},
                    dataType: 'json',
                    success: function (result) {
                        self.singleChooseList = result['singleChooseList'];
                        self.multiChoiceList = result['multiChoiceList'];
                        self.judgeList = result['judgeList'];

                        self.fillInBlanksList = result['fillInBlanksList'];
                        self.questionAndAnswerList = result['questionAndAnswerList'];
                    },
                    error: handleError
                });
            },


            // 根据id获取试题
            getExamPaper: function ( obj ) {
                let self = this;

                $.ajax({
                    url: 'getExamPaper',
                    type: "post",
                    async: false,
                    data: {
                        single_choose: obj.single_choose,
                        multi_choice: obj.multi_choice,
                        judge: obj.judge,
                        question: obj.question,
                        blanks_test: obj.blanks_test
                    },
                    dataType: 'json',
                    success: function (result) {

                        self.paperSingleList = result['single_choose'];
                        self.paperMultiList = result['multi_choice'];
                        self.paperJudgeList = result['judge'];

                        self.paperQuestionList = result['question'];
                        self.paperBlanksList = result['blanks_test'];

                    },
                    error: handleError
                });
            }


        },

        // 过滤器
        filters: {
            // 将时间戳转化为日期格式
            formatDate(time) {
                if (time == null) {
                    return '';
                } else {
                    let date = new Date(time);
                    let y = date.getFullYear();
                    let m = (date.getMonth() + 1);
                    let d = date.getDate();

                    let h = date.getHours();
                    let min = date.getMinutes();
                    let s = date.getSeconds();
                    return y + '-' + ((m < 10)? '0' + m : m) + '-' + ((d < 10)? '0' + d : d) +
                        ' ' + ((h < 10)? '0' + h : h) + ':' + ((min < 10)? '0' + min : min) +
                        ':' + ((s < 10)? '0' + s : s);
                }
            },

            // 将图片显示成...
            delHtmlTag(str) {
                str = str.replace(/<img[^>]+>/g, "..");
                str = str.replace(/<video[^>]+/g, "..");
                str = str.replace(/<audio[^>]+/g, "..");
                return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
            },

            changeAns(str) {
                if (str == 1) {
                    return '对';
                } else if (str == 0) {
                    return '错';
                }
            }
        },

        // 初始化事件里边去调用查询方法
        created: function () {
            this.getList(1, '');
        }

    });
});