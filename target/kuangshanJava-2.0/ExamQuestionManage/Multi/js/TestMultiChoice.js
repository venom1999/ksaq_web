$(function () {
    var list_vue = new Vue({
        el: "#right",
        data: {
            eduCateList: [],
            eduKnowPTempList: [],

            list: [],                   // 显示表格列表
            chooseContent: {},
            singleChooseA: {},

            singleChooseB: {},
            singleChooseC: {},
            singleChooseD: {},

            pagenum: 0,
            pageindex: 0,
            conditions: '',

            exportsconditions: '',//导出时的条件
            tableLoading: false,
            dialogLoading: false,

            id_list: [], //多选选中的id数组，以,隔开
            filetable: [],
            addDialogVisible: false,

            editDialogVisible: false,
            detailDialogVisible: false,
            previewDialogVisible: false,

            importDialogVisible: false,
            viewDialogVisible1: false,
            viewDialogVisible0: false,

            audioDialogVisible: false,
            picviewDialogVisible: false,
            pointVisible: false,        // 查询时的知识点状态

            addPointVisible: false,     // 添加时的知识点状态
            detailPointVisible: false, // 详细时的知识点状态
            editPointVisible: false,   // 修改时的知识点状态

            filetype: '',
            filePath: '',
            fileurl: '',

            templist: '',
            addFrom: {
                edu_category_id: '',
                multi_choice_content: '',
                multi_choice_a: '',

                multi_choice_b: '',
                multi_choice_c: '',
                multi_choice_d: '',

                answer: [false, false, false, false],
                explanation: '',
                deleted: '',
            },

            tempFrom: {},

            detailFrom: {
                answer: [],
                explanation: '',
            },

            editFrom: {
                answer: [],
                explanation: '',
            },

            previewFrom: [],
            importFrom: {
                edu_category_name: '',
                file_name: ''
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
            fileList: [],
            fileList2: [],
            filedata: {id: 'add'},

            params: [
                {
                    label: '培训类型：',
                    type: 'select',
                    model: 'edu_category_name',
                },
                {
                    label: '知识点：',
                    type: 'select',
                    model: 'edu_knowledge_point_name',
                },
                {
                    label: '多选题题干：',
                    type: 'plain',
                    model: 'multi_choice_content',
                }
            ],

            rules: {
                edu_category_id: [
                    {required: true, message: '请选择培训分类', trigger: 'change'}
                ],

                edu_category_name: [
                    {required: true, message: '请选择培训分类', trigger: 'change'}
                ]

            },

            text_num : 1       // 题目序号

        },
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

            unDeletedList: function () {
                let self = this;
                if (self.list != null) {
                    return self.list.filter(function (item) {
                        return item.tm_deleted == 0;
                    })
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

                if (formName === 'addFrom') {
                    this.$refs[formName].resetFields();
                    this.chooseContent.execCommand('cleardoc');
                    this.singleChooseA.execCommand('cleardoc');
                    this.singleChooseB.execCommand('cleardoc');
                    this.singleChooseC.execCommand('cleardoc');
                    this.singleChooseD.execCommand('cleardoc');
                    this.addFrom.answer = [false, false, false, false];
                    this.explanation.execCommand('cleardoc');
                    this.addPointVisible = true;
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
            closeFrom(formName){
                this.resetForm(formName);
            },


            //获取list 当前页面需要显示的内容
            getList: function (pageindex, conditions) {
                let self = this;
                self.pageindex = pageindex || 1;

                if(conditions !== '' && conditions !== null && conditions !== undefined) {
                    self.conditions = conditions + " AND tm_deleted = 0";
                } else {
                    self.conditions = " tm_deleted = 0";
                }

                self.tableLoading = true;
                $.ajax({
                    url: 'GetList_vue',
                    type: "post",
                    async: false,
                    data: {
                        pageindex: self.pageindex,
                        conditions: self.conditions
                    },
                    dataType: 'json',
                    success: function ( data ) {
                        self.text_num = 1;    // 初始化
                        self.list = data.list;
                        self.eduCateList = data.eduCateList;

                        self.pagenum = data.pagenum;
                        self.text_num += (pageindex - 1) * 10;
                        self.id_list = data.list.map((val) => '');
                        self.tableLoading = false;
                    },
                    error: handleError

                });
            },


            // 添加
            _add: function () {
                let self = this;
                self.chooseContent.getKfContent(function (content) {
                    self.addFrom.multi_choice_content = self.delP(content);

                    self.singleChooseA.getKfContent(function (contentA) {
                        self.addFrom.multi_choice_a = self.delP(contentA);

                        self.singleChooseB.getKfContent(function (contentB) {
                            self.addFrom.multi_choice_b = self.delP(contentB);

                            self.singleChooseC.getKfContent(function (contentC) {
                                self.addFrom.multi_choice_c = self.delP(contentC);

                                self.singleChooseD.getKfContent(function (contentD) {
                                    self.addFrom.multi_choice_d = self.delP(contentD);

                                    self.explanation.getKfContent(function (explanation) {
                                        self.addFrom.explanation = self.delP(explanation);

                                        if (self.addFrom.edu_category_id === "" ) {
                                            self.$message({
                                                type: 'warning',
                                                message: '必填项不能为空!'
                                            });
                                        } else {
                                            let temp = [];
                                            for (let i = 0; i < self.addFrom.answer.length; i++) {
                                                if (self.addFrom.answer[i]) {
                                                    if (i == 0) {
                                                        temp.push('A');
                                                    } else if (i == 1) {
                                                        temp.push('B');
                                                    } else if (i == 2) {
                                                        temp.push('C');
                                                    } else if (i == 3) {
                                                        temp.push('D');
                                                    }
                                                }
                                            }
                                            self.addFrom.answer = temp.join(',');
                                            self.addFrom.deleted = 0;
                                            self.tableLoading = true;

                                            $.ajax({
                                                url: 'SubmitAdd',
                                                type: "post",
                                                data: JSON.stringify(self.addFrom),
                                                dataType: 'json',
                                                contentType: 'text/javascript;charset=utf-8',
                                                success: function (data) {
                                                    self.addFrom.answer = [false, false, false, false];
                                                    if (data.record === "success") {
                                                        self.$message({
                                                            type: 'success',
                                                            message: '添加成功!'
                                                        });
                                                        self.addDialogVisible = false;
                                                        self.closeFrom('addFrom');
                                                    } else {
                                                        self.$message({
                                                            type: 'fail',
                                                            message: '添加失败!'
                                                        });
                                                    }
                                                    self.tableLoading = false;
                                                    self.getList(self.pageindex, self.conditions);
                                                    self.addDialogVisible = false
                                                },
                                                error: handleError

                                            });
                                        } // /else

                                    });
                                });
                            });
                        });
                    });
                });


            },


            // 去除首尾p标签
            delP: function( str ) {
                str = str.substring(0, str.length - 4);  // 去除后4位
                str = str.slice(3);    // 去除前3位
                return str;
            },


            // 预览
            _preview: function() {
                let self = this;

                if (self.addFrom.edu_category_id === "") {
                    self.$message({
                        type: 'warning',
                        message: '必填项不能为空!'
                    });
                } else {
                    if (self.eduCateList != '') {
                        self.addFrom.edu_category_name = self.eduCateList.find(
                            function (item) {
                                return item.edu_category_id == self.addFrom.edu_category_id;
                            }
                        ).edu_category_name;
                    }

                    self.addFrom.multi_choice_content = self.chooseContent.getContent();
                    self.addFrom.multi_choice_a = self.singleChooseA.getContent();
                    self.addFrom.multi_choice_b = self.singleChooseB.getContent();

                    self.addFrom.multi_choice_c = self.singleChooseC.getContent();
                    self.addFrom.multi_choice_d = self.singleChooseD.getContent();
                    self.addFrom.explanation = self.explanation.getContent();

                    self.previewDialogVisible = true;
                }

            },


            // 提交修改
            _submitEdit: function () {
                let self = this;
                self.chooseContentEdit.getKfContent(function (content) {
                    self.editFrom.multi_choice_content = self.delP(content);

                    self.singleChooseAEdit.getKfContent(function (contentA) {
                        self.editFrom.multi_choice_a = self.delP(contentA);

                        self.singleChooseBEdit.getKfContent(function (contentB) {
                            self.editFrom.multi_choice_b = self.delP(contentB);

                            self.singleChooseCEdit.getKfContent(function (contentC) {
                                self.editFrom.multi_choice_c = self.delP(contentC);

                                self.singleChooseDEdit.getKfContent(function (contentD) {
                                    self.editFrom.multi_choice_d = self.delP(contentD);

                                    self.explanationEdit.getKfContent(function (explanation) {
                                        self.editFrom.explanation = self.delP(explanation);

                                        if (self.editFrom.edu_category_id === "") {
                                            self.$message({
                                                type: 'warning',
                                                message: '必填项不能为空!'
                                            });
                                        } else {
                                            let temp = [];
                                            for (let i = 0; i < self.editFrom.answer.length; i++) {
                                                if (self.editFrom.answer[i]) {
                                                    if (i == 0) {
                                                        temp.push('A');
                                                    } else if (i == 1) {
                                                        temp.push('B');
                                                    } else if (i == 2) {
                                                        temp.push('C');
                                                    } else if (i == 3) {
                                                        temp.push('D');
                                                    }
                                                }
                                            }
                                            self.editFrom.answer = temp.join(',');
                                            self.tableLoading = true;
                                            self.editDialogVisible = false;

                                            $.ajax({
                                                url: 'SubmitEdit',
                                                type: "post",
                                                data: JSON.stringify(self.editFrom),
                                                dataType: 'json',
                                                contentType: 'text/javascript;charset=utf-8',
                                                success: function (data) {
                                                    self.addFrom.answer = [false, false, false, false];
                                                    if (data.record === "success") {
                                                        self.$message({
                                                            type: 'success',
                                                            message: '修改成功!'
                                                        });
                                                        self.templist='';
                                                        self.getList(self.pageindex, '');
                                                        // self._edit(self.editFrom.multi_choice_id);
                                                    } else {
                                                        self.$message({
                                                            type: 'fail',
                                                            message: '修改失败!'
                                                        });
                                                    }
                                                    self.tableLoading = false;
                                                    self.getList(self.pageindex, self.conditions);
                                                },
                                                error: handleError

                                            });
                                        } // /else


                                    });
                                });
                            });
                        });
                    });
                });

            },


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


            // 修改
            _edit: function (ID) {
                let self = this;
                self.tableLoading = true;
                self.editFrom = [];

                self.editFrom = self.deepCopy(self.list.find(function (item) {
                    return ID == item.multi_choice_id;
                }));

                if (self.editFrom.explanation === undefined) {
                    self.editFrom.explanation = '';
                }
                let arr = self.editFrom.answer.split(',');

                let tempArr = [false, false, false, false];
                if (arr != null) {
                    arr.map(function (item) {
                        if (item == 'A') {
                            tempArr[0] = true;
                        } else if (item == 'B') {
                            tempArr[1] = true;
                        } else if (item == 'C') {
                            tempArr[2] = true;
                        } else if (item == 'D') {
                            tempArr[3] = true;
                        }
                    });
                }
                self.editFrom.answer = tempArr;

                if (self.editFrom.multi_choice_content != '') {
                    self.chooseContentEdit.ready(function () {
                        self.chooseContentEdit.setContent(self.editFrom.multi_choice_content);
                    });
                }

                if (self.editFrom.multi_choice_a != '') {
                    self.singleChooseAEdit.ready(function () {
                        self.singleChooseAEdit.setContent(self.editFrom.multi_choice_a);
                    });
                }

                if (self.editFrom.multi_choice_b != '') {
                    self.singleChooseBEdit.ready(function () {
                        self.singleChooseBEdit.setContent(self.editFrom.multi_choice_b);
                    });
                }

                if (self.editFrom.multi_choice_c != '') {
                    self.singleChooseCEdit.ready(function () {
                        self.singleChooseCEdit.setContent(self.editFrom.multi_choice_c);
                    });
                }

                if (self.editFrom.multi_choice_d != '') {
                    self.singleChooseDEdit.ready(function () {
                        self.singleChooseDEdit.setContent(self.editFrom.multi_choice_d);
                    });
                }

                if (self.editFrom.explanation != '') {
                    self.explanationEdit.ready(function () {
                        self.explanationEdit.setContent(self.editFrom.explanation);
                    });
                } else {
                    self.explanationEdit.ready(function () {
                        self.explanationEdit.setContent('');
                    });
                }

                self.editDialogVisible = true;
                self.tableLoading = false;
            },


            // 详细
            _detail: function (ID) {
                let self = this;
                self.tableLoading = true;

                if (ID === 'previous') {
                    ID = self.detailFrom.previous;
                }
                if (ID === 'next') {
                    ID = self.detailFrom.next;
                }

                self.detailFrom = self.deepCopy(self.list.find(function (item) {
                    return ID == item.multi_choice_id;
                }));
                let arr = self.detailFrom.answer.split(',');

                let tempArr = [false, false, false, false];
                if (arr != null) {
                    arr.map(function (item) {
                        if (item == 'A') {
                            tempArr[0] = true;
                        } else if (item == 'B') {
                            tempArr[1] = true;
                        } else if (item == 'C') {
                            tempArr[2] = true;
                        } else if (item == 'D') {
                            tempArr[3] = true;
                        }
                    });
                }

                self.detailFrom.answer = tempArr;
                self.detailDialogVisible = true;

                let listID = 0;

                for (var i = 0; i < self.list.length; i++)
                    if (self.list[i].multi_choice_id === ID) {
                        listID = i;
                    }

                if (listID === 0) {
                    self.detailFrom.btnToDisabled0 = true;
                } else {
                    self.detailFrom.btnToDisabled0 = false;
                    var temp = listID - 1;
                    self.detailFrom.previous = self.list[temp].multi_choice_id;
                }

                if (listID === (self.list.length - 1)) {
                    self.detailFrom.btnToDisabled1 = true;
                } else {
                    var temp = listID + 1;
                    self.detailFrom.next = self.list[temp].multi_choice_id;
                    self.detailFrom.btnToDisabled1 = false;
                }

                self.tableLoading = false;

            },


            // 删除
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

                            if (result === "success") {
                                self.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                if (self.list.length === 1) {
                                    if (self.pageindex !== 1) {
                                        self.pageindex--;
                                    }

                                }
                                self.getList(self.pageindex, self.conditions);


                            } else {
                                self.tableLoading = true;
                                self.$message({
                                    type: 'fail',
                                    message: '删除失败!'
                                });
                            }
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
                }


            },

            // 批量
            _import:function() {
                let self = this;
                self.importDialogVisible = true;
                self.fileList2 = [];
            },

            // 下载模板
            download: function () {
                let self = this;

                if (self.importFrom.edu_category_name != '') {

                    self.dialogLoading = true;
                    httpPost_aes('downExcelMould', {
                        eduCategoryName: self.importFrom.edu_category_name,
                        eduKnowPList: null,
                    });
                    self.dialogLoading = false;
                } else {
                    self.$message({
                        type: 'warning',
                        message: '培训类型不能为空!'
                    });
                }

            },

            // 上传单选题题目表格
            uploadSingleChooseTable: function() {
                let self = this;
                if  (self.importFrom.file_name == '') {
                    self.$message({
                        type: 'warning',
                        message: '请上传文件'
                    });
                    return;
                }

                if (self.importFrom.edu_category_name != '') {
                    self.dialogLoading = true;
                    $.ajax({
                        url: 'uploadTable',
                        type: 'post',
                        data: {
                            files: self.importFrom.file_name,
                        },
                        dataType: 'json',
                        success: function (data) {
                            self.importFrom.file_name = '';
                            self.dialogLoading = false;
                            self.importFrom = [];
                            self.getList(1, '');
                            if (data == "success") {
                                self.importDialogVisible = false;
                                self.fileList2 = [];
                                self.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                            } else {
                                self.importDialogVisible = false;
                                self.fileList2 = [];
                                self.dialogLoading = false;
                                self.importFrom = [];
                                self.getList(1, '');
                                self.$message({
                                    message: '添加失败，请用指定模板并确认其中有数据且正确',
                                    type: 'error'
                                });
                            }
                        }
                    });
                } else {
                    self.$message({
                        type: 'warning',
                        message: '培训类型不能为空!'
                    });
                }
            },

            handlePreview: function (file) {
                console.log("handlePreview: " + file);
                // alert(file.name);
                layer.open({

                    shade: 0.5,
                    skin: 'layui-layer-lan',
                    title: '隐患图片',
                    type: 2,
                    area: ['70%', '70%'],
                    fixed: false, //不固定
                    maxmin: true,
                    content: 'showPicOnlyRead.jsp?name=' + file.name,
                    end: function (layer) {

                    }
                });
            },

            handleRemove: function (file, fileList) {
                let self = this;
                console.log("handleRemove: " + file, fileList);
                self.fileList2 = fileList.map(val => val.response.name);
            },

            progress: function (event, file, fileList) {
                console.log("progress: " + event, file, fileList);
            },

            success: function (response, file, fileList) {
                let self = this;
                // file.name = response.name;
                self.importFrom.file_name = file.name;

                self.fileList2 = fileList.map(val => val.response.name);
            },

            _relativePath2FullPath: function (url) {
                let a = document.createElement('A');
                a.href = url;
                url = a.href;
                return url;
            },

            // 根据培训分类获取相应的知识点
            getPoint: function ( value ) {
                let self = this;
                self.eduKnowPTempList = [];

                if (self.eduKnowPList != null) {
                    self.eduKnowPList.map(
                        function (x) {
                            if (x.eduCategoryName === value || x.eduCategoryID === value) {
                                if (x.eduKnowledgePointID != null) {
                                    self.eduKnowPTempList.push(
                                        {
                                            'eduKnowledgePointID' : x.eduKnowledgePointID,
                                            'knowledgePointName' : x.knowledgePointName
                                        }
                                    );
                                }
                            }
                        }
                    );
                }

                if (self.eduKnowPTempList.length == 0) {
                    self.pointVisible = false;
                    self.addPointVisible = false;
                    self.editPointVisible = false;
                } else {
                    self.pointVisible = true;
                    self.addPointVisible = true;
                    self.editPointVisible = true;
                }

            },


            // 将一个对象的某些属性赋值给一个新对象
            // obj 原对象
            // o 复制后的新对象
            extend: function(obj) {
                let o = {},
                    attr = Array.prototype.slice.call(arguments).slice(1);
                    attr.forEach(function(val, index) {
                        if (val in obj) { o[val] = obj[val]; }
                    });
                return o;
            },

            // 初始化编辑器
            initUEditor: function () {
                let self = this;

                // 添加选择题题干
                self.chooseContent = UE.getEditor('chooseContent',
                    {
                        initialFrameHeight: 160, //初始化高度
                        initialFrameWidth: 1426, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo', 'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true,
                    }
                );

                // 添加选择项A
                self.singleChooseA = UE.getEditor('singleChooseA',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项B
                self.singleChooseB = UE.getEditor('singleChooseB',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项C
                self.singleChooseC = UE.getEditor('singleChooseC',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项D
                self.singleChooseD = UE.getEditor('singleChooseD',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo', 'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加答案解析
                self.explanation = UE.getEditor('explanation',
                    {
                        initialFrameHeight: 160, //初始化高度
                        initialFrameWidth: 1426, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo', 'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true,
                    }
                );

                // 添加选择题题干
                self.chooseContentEdit = UE.getEditor('chooseContentEdit',
                    {
                        initialFrameHeight: 160, //初始化高度
                        initialFrameWidth: 1426, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项A
                self.singleChooseAEdit = UE.getEditor('singleChooseAEdit',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项B
                self.singleChooseBEdit = UE.getEditor('singleChooseBEdit',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项C
                self.singleChooseCEdit = UE.getEditor('singleChooseCEdit',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo',  'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加选择项D
                self.singleChooseDEdit = UE.getEditor('singleChooseDEdit',
                    {
                        initialFrameHeight: 140, //初始化高度
                        initialFrameWidth: 620, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo', 'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true
                    }
                );

                // 添加答案解析
                self.explanationEdit = UE.getEditor('explanationEdit',
                    {
                        initialFrameHeight: 160, //初始化高度
                        initialFrameWidth: 1426, //初始化宽度
                        //autoHeightEnabled: false,
                        enableAutoSave: false,
                        saveInterval: 1800000,
                        initialStyle: "body{margin:8px 17px;font-size:14px;}p{margin:0;line-height:20px;}",
                        toolbars: [
                            ['cleardoc', '|', 'bold', 'forecolor', 'fontsize', 'italic', 'underline',
                                'superscript', 'subscript', '|', 'spechars', 'insertimage', 'insertvideo', 'kityformula']
                        ],
                        elementPathEnabled: false,
                        wordCount: false,
                        autoClearinitialContent: true,
                    }
                );

            },



        },

        // 过滤器
        filters: {

            // 将图片显示成...
            delHtmlTag(str) {
                str = str.replace(/<img[^>]+>/g, "..");
                str = str.replace(/<video[^>]+/g, "..");
                str = str.replace(/<audio[^>]+/g, "..");
                return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
            },


        },

        // 初始化事件里边去调用查询方法
        created: function () {
            this.getList(1, '');
            this.initUEditor();
        }

    });
});