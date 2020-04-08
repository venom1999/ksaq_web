$(function () {
    var list_vue = new Vue({
        el:"#right",
        data:{
            pageindex:0,
            pagenum:0,
            addDialogVisible:false,
            editDialogVisible:false,
            detailDialogVisible:false,
            conditions:'',
            exportconditions:'',
            params: [{
                label: '培训类型：',
                type: 'select',
                model: 'edu_category_id',
            },{
                label: '资源名称：',
                type: 'plain',
                model: 'resource_name',
            },{
                label: '资源简介：',
                type: 'plain',
                model: 'resource_introduction',
            }],
            released_options:[
                {
                    value: 1,
                    label: '是'
                },{
                    value: 0,
                    label: '否'
                },
            ],
            addForm:{
                resource_category:'',
                resource_name:'',
                resource_introduction:'',
                is_released:0,
                resource_credit:'',
                upload_person:'',
                upload_time:new Date(new Date().toLocaleDateString()).getTime(),
                mulfileform:[],//资源内容列表
            },
            detailForm:{
                edu_resource_id:'',
                edu_category_name:'',
                resource_name:'',
                resource_introduction:'',
                is_released:0,
                resource_credit:'',
                EmployeeName:'',
                upload_time:'',
                btnToDisabled0: false,
                btnToDisabled1: false,
                previous: '',
                next: '',
            },
            editForm:{
                edu_resource_id:'',
                resource_category:'',
                resource_name:'',
                resource_introduction:'',
                is_released:0,
                resource_credit:'',
                upload_person:'',
                upload_time:'',
                mulfileform:[],//资源内容列表
            },
            tempmulfileform:'',//修改页面存储资源内容
            tableLoading:false,
            dialogLoading:false,
            categorylist:[],
            employeelist:[],
            list:[],
            rules:{
                resource_category: [
                    { required: true, message: '请选择培训类型',trigger: 'change'  }
                ],
                resource_name: [
                    { required: true, message: '请填写培训名称',trigger: 'blur'  }
                ],
            },
            filePath:'',
            filetype:'',
            filetable:[],
            viewDialogVisible1: false,
            viewDialogVisible0: false,
            audioDialogVisible: false,
            picviewDialogVisible: false,
            filedetailDialogVisible:false,
            id_list: [], //多选选中的id数组，以,隔开
            resource_id:'',
            visible:true
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
            }
        },
        filters:{
            ellipsis(value) {
                if (!value) return "";
                if (value.length > 18) {
                    return value.slice(0,18) + "...";
                }
                return value;
            },
        },
        methods:{
            filter: function () {
                let params = [];
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

                this.getList(1, params.join('and'))
            },
            resetForm:function(formName){
                this.$refs[formName].resetFields();
                if(formName=='addForm'){
                    this.addForm.mulfileform = [];
                }else {
                    //this.editForm.mulfileform = this.copy(this.tempmulfileform);
                    this.editForm.mulfileform = this.objDeepCopy(this.tempmulfileform);
                }
                this.$refs.upload.clearFiles();
                let mul = [];

            },
            closeForm:function(formName){
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].clearValidate();
                    this.$refs[formName].resetFields();
                    this.$refs.upload.clearFiles();
                    if(formName=='addForm'){
                        this.addForm.mulfileform = [];
                    }
                }
            },
            copy(obj) {
                let objCopy = {}; // objCopy 将存储 mainObj 的副本
                objCopy = Object.assign({}, obj);
                return objCopy;
            },
            objDeepCopy(source) {//对象数组的深拷贝【区分浅拷贝和深拷贝】
                let sourceCopy = source instanceof Array ? [] : {};
                for (let item in source) {
                    sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item];
                }
                return sourceCopy;
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
                                    exportparams.push(col.label + self.categorylist.find(function(x) {return x.edu_category_id === col.value;}).edu_category_name
                                    );
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

            handleChange:function(file, fileList){
                let self = this;
                let flag = false;
                //判断上传的文件是否重名(添加：与mulfileform已有内容是否重名)
                for(let i=0;i<self.addForm.mulfileform.length;i++){
                    if(file.name===self.addForm.mulfileform[i].upload_file_name){
                        flag = true;
                    }
                }
                if(flag){//有重名
                    self.$message({
                        type: 'info',
                        message: '上传文件重复!'
                    });
                }else {
                    var time = 0;//分钟
                    let fileinfo = file.name.split(".");
                    let type = fileinfo[1];
                    if(type=='mp4'||type=='avi'||type=='wmv'||type=='mp3'||type=='ogg'){
                        let url = URL.createObjectURL(file.raw);
                        //经测试，发现audio也可获取视频的时长
                        let audioElement = new Audio(url);
                        audioElement.addEventListener("loadedmetadata", (_event) => {
                            let audioDuration = parseInt(audioElement.duration);//视音频的时间长度(秒)
                            console.log("audioDuration:"+audioDuration);
                            time = parseInt((audioDuration/60)+1);//转换为分钟
                            self.addForm.mulfileform.push({
                                upload_file_name: file.name,
                                content_credit:0,
                                min_learning_time:time,
                                edu_resource_id:0
                            });
                        });
                    }else {
                        self.addForm.mulfileform.push({
                            upload_file_name: file.name,
                            content_credit:0,
                            min_learning_time:time,
                            edu_resource_id:0
                        });
                    }
                }

            },
            handleEditChange:function(file, fileList){
                let self = this;
                let flag = false;
                //判断上传的文件是否重名(添加：与mulfileform已有内容是否重名)
                for(let i=0;i<self.editForm.mulfileform.length;i++){
                    if(file.name===self.editForm.mulfileform[i].upload_file_name){
                        flag = true;
                    }
                }
                if(flag){//有重名
                    self.$message({
                        type: 'info',
                        message: '上传文件重复!'
                    });
                }else {
                    var time = 0;//分钟
                    let fileinfo = file.name.split(".");
                    let type = fileinfo[1];
                    if(type=='mp4'||type=='avi'||type=='wmv'||type=='mp3'||type=='ogg'){
                        let url = URL.createObjectURL(file.raw);
                        //经测试，发现audio也可获取视频的时长
                        let audioElement = new Audio(url);
                        audioElement.addEventListener("loadedmetadata", (_event) => {
                            let audioDuration = parseInt(audioElement.duration);//视音频的时间长度(秒)

                            time = parseInt((audioDuration/60)+1);//转换为分钟
                            self.editForm.mulfileform.push({
                                upload_file_name: file.name,
                                content_credit:0,
                                min_learning_time:time,
                                edu_resource_id:0
                            });
                        });
                    }else {
                        self.editForm.mulfileform.push({
                            upload_file_name: file.name,
                            content_credit:0,
                            min_learning_time:time,
                            edu_resource_id:0
                        });
                    }
                }
            },


            deleteFileForm:function(index, rows){
                rows.splice(index, 1);
            },
            deleteFile:function(item, index, formName){
                let self = this;
                if(formName == "addForm"){
                    self.index = self.addForm.mulfileform.indexOf(item);
                    if (index !== -1) {
                        self.addForm.mulfileform.splice(index, 1)
                    }
                }else {
                    self.index = self.editForm.mulfileform.indexOf(item);
                    if (index !== -1) {
                        self.editForm.mulfileform.splice(index, 1)
                    }
                }
            },
            _detail:function(id){
                let self = this;
                self.dialogLoading=true;
                self.detailDialogVisible=true;
                if (id == 'previous') {
                    id = self.detailForm.previous;
                }
                if (id == 'next') {
                    id = self.detailForm.next;
                }
                $.ajax({
                    url:'getDetail',
                    data:{
                        edu_resource_id:id,
                        conditions:self.conditions,
                        pageindex:self.pageindex
                    },
                    type:'post',
                    success:function (result) {
                        let listID=0;
                        for (let key in result.resource) {
                            self.detailForm[key] = result.resource[key]
                        }
                        self.detailForm.mulfileform = result.content;

                        for (var i = 0; i < result.list.length; i++)
                            if (result.list[i].edu_resource_id === id) {
                                listID = i;
                            }
                        if (listID == 0) {
                            self.detailForm.btnToDisabled0 = true;
                        }
                        else {
                            self.detailForm.btnToDisabled0 = false;
                            var temp = listID - 1;
                            self.detailForm.previous = result.list[temp].edu_resource_id;
                        }

                        if (listID == (result.list.length - 1)) {
                            self.detailForm.btnToDisabled1 = true;
                        } else {
                            var temp = listID + 1;
                            self.detailForm.next = result.list[temp].edu_resource_id;
                            self.detailForm.btnToDisabled1 = false;
                        }
                        self.dialogLoading=false;
                    },
                    error:handleError
                });
            },
            closevideoDialog: function () {
                var Player = videojs("videoex");  //初始化视频
                Player.pause();
            },
            closevideoDialog1: function () {
                //var music = document.getElementById('audio');
                $("#audio").pause();
                //music.pause();
            },
            _viewFile:function(ID, name){
                let self = this;
                const loading = this.$loading({
                    lock: true,
                    text: '加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                $.ajax({
                    url: 'viewFile',
                    type: "post",
                    data: {
                        filename: name,
                        id: ID
                    },
                    success: function (result) {
                        if (result != "") {
                            //var result = JSON.parse(data);
                            loading.close();
                            self.filePath = '../' + result.filepath+"?temp=" + Math.random();
                            console.log("filepath:"+self.filePath);
                            if (result.type == 'mp4' || result.type == 'webm' || result.type == 'ogg') {
                                self.filetype = 'video/' + result.type;
                                self.viewDialogVisible1 = true;
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
                                /*var music = document.getElementById('audio');
                                music.load();*/
                                $("#audio").load();
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
                    error: handleError

                });
            },
            _downloadone:function(ID,name){
                httpPost_aes('download', {
                    filename: name,
                    id: ID
                })
            },
            _released:function(){
                let self = this;
                if(self.editForm.is_released==1){
                    self.$message({
                        type: 'warning',
                        message: '此资源已发布!'
                    });
                }else {
                    $.ajax({
                        url:'setIsReleased',
                        type:'post',
                        data:{
                            edu_resource_id:self.editForm.edu_resource_id
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
                    self.$confirm('您确定要发布这' + self.idList.length + '项资源吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        $.post('mulReleased', {
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
            _edit:function(id){
                let self = this;
                self.editDialogVisible=true;
                self.dialogLoading = true;
                $.ajax({
                    url:'getEdit',
                    type:'post',
                    data:{
                        edu_resource_id:id
                    },
                    success:function (result) {
                        for (let key in self.editForm) {
                            self.editForm[key] = result.resource[key];
                        }
                        self.tempmulfileform = self.objDeepCopy(result.content);
                        self.editForm.mulfileform = result.content;
                        self.dialogLoading = false;
                    },
                    error:handleError
                });
            },
            _submitEdit:function(formName){
                let self = this;
                self.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let credit = 0;
                        //console.log("mulfileform:"+JSON.stringify(self.editForm.mulfileform));
                        for(let i=0;i<self.editForm.mulfileform.length;i++){
                            credit = credit + parseInt(self.editForm.mulfileform[i].content_credit);
                        }
                        self.editForm.resource_credit = parseInt(credit);
                        self.dialogLoading = true;
                        console.log("ed:"+JSON.stringify(self.editForm));
                        $.ajax({
                            url:'submitEditResource',
                            type:'post',
                            data:{
                                formdata:JSON.stringify(self.editForm).toString()
                            },
                            success:function (result) {
                                if(result.returntext == "success"){
                                    if(self.editForm.mulfileform.length>0){//如果修改后相关文件处不为空
                                        for (let i=0;i<self.editForm.mulfileform.length;i++){
                                            self.editForm.mulfileform[i].edu_resource_id = result.lastid;//获取资源ID
                                        }
                                    }
                                    $.ajax({
                                        url:'submitEditContent',
                                        type:'post',
                                        data:{
                                            formdata:JSON.stringify(self.editForm.mulfileform).toString(),
                                            resourceid:result.lastid
                                        },
                                        success:function (data) {
                                            if(data=="success"){
                                                self.$message({
                                                    type: 'success',
                                                    message: '修改成功!'
                                                });
                                                self.dialogLoading = false;
                                                self._edit(self.editForm.edu_resource_id);
                                                self.getList(self.pageindex, self.conditions);
                                                console.log("update after:"+JSON.stringify(self.tempmulfileform));
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
                                        type: 'fail',
                                        message: '修改失败!'
                                    });
                                }
                            },
                            error:handleError
                        });
                        self.$refs.upload.submit();
                        self.$refs.upload.clearFiles();//清除上传文件信息，防止重复

                    }
                });

            },
            _add:function(formName){
                let self = this;
                self.$refs[formName].validate(valid => {
                    console.log("valid = " + valid);
                    if (valid) {
                        let credit = 0;
                        for(let i=0;i<self.addForm.mulfileform.length;i++){
                            credit = credit + Number(self.addForm.mulfileform[i].content_credit);
                        }
                        self.addForm.resource_credit = parseInt(credit);
                        self.dialogLoading = true;
                        //self.addForm.upload_time = transformDate(self.addForm.upload_time);
                        //console.log("addForm:"+JSON.stringify(self.addForm));
                        $.ajax({
                            url:'submitAddResource',
                            data:{
                                formdata:JSON.stringify(self.addForm).toString()
                            },
                            type:'post',
                            success:function (result) {
                                if(result.returntext=="success"){
                                    for (let i=0;i<self.addForm.mulfileform.length;i++){
                                        self.addForm.mulfileform[i].edu_resource_id = result.lastid;//获取资源ID
                                    }
                                    //console.log("mulfileform:"+JSON.stringify(self.mulfileform));
                                    $.ajax({
                                        url:'submitAddContent',
                                        data:{
                                            formdata:JSON.stringify(self.addForm.mulfileform).toString()
                                        },
                                        type:'post',
                                        dataType: 'json',
                                        success:function (data) {
                                            if(data=="success"){
                                                self.$message({
                                                    type: 'success',
                                                    message: '添加成功!'
                                                });
                                                self.closeForm('addForm');
                                                self.dialogLoading = false;
                                                self.addDialogVisible = false;
                                                self.getList(self.pageindex, self.conditions);
                                            }else {
                                                self.$message({
                                                    type: 'fail',
                                                    message: '添加失败!'
                                                });
                                            }
                                        }
                                    });
                                }else {
                                    self.$message({
                                        type: 'fail',
                                        message: '添加失败!'
                                    });
                                }
                            },
                            error:handleError
                        });
                        self.$refs.upload.submit();
                        self.$refs.upload.clearFiles();//清除上传文件信息，防止重复
                    }
                });

            },
            _delete:function () {
                let self = this;
                console.log("idlist:"+self.idList);
                if (self.idList.length > 0) {  //判断是否有选择
                    self.$confirm('您确定要删除这' + self.idList.length + '条记录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        $.post('isReference',{id_list: self.idList.join(','),},function (result) {
                            if(result =="success"){
                                self.$message({
                                    type: 'warning',
                                    message: '存在参与培训资源，请先调整培训计划再删除!'
                                });
                            }else if(result =="error1"){
                                self.$message({
                                    type: 'warning',
                                    message: '部分资源已发布，不可删除!'
                                });
                            }
                            else{
                                $.post('deleteResource', {
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
                                    self.getList(1, self.conditions);
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
            },
            _export:function () {
                let self = this;
                if(self.pagenum>0){
                    httpPost_aes('Export', {
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
            _view:function (id) {
                let self = this;
                self.resource_id = id;
                $.ajax({
                    url: "getfile",
                    type: "post",
                    data: {
                        id: id,
                    },
                    success: function (data) {
                        if (data.filelist == "") {
                            self.$message({
                                type: 'info',
                                message: '无相关文件!'
                            })
                        }
                        else {
                            if(data.filelist[1]==""){
                                self._viewFile(id, data.filelist[0]);
                            }else {
                                self.filetable = [];
                                self.filetable = data.filelist;
                                self.filedetailDialogVisible = true;
                            }
                        }
                    },
                    error: handleError

                });
            },
            _download:function (id) {
                var self = this;
                $.ajax({
                    url: "getfile",
                    type: "post",
                    data: {
                        id: id,
                    },
                    success: function (data) {
                        if (data.filelist == "") {
                            self.$message({
                                type: 'info',
                                message: '无相关文件!'
                            })
                        }
                        else {
                            if(data.filelist[1]==""){
                                self._downloadone(id, data.filelist[0]);
                            }else {
                                self.filetable = [];
                                self.filetable = data.filelist;
                                self.filedetailDialogVisible = true;
                            }
                        }
                    },
                    error: handleError

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
            getEmployeeList:function () {
                let self = this;
                $.ajax({
                    url:'getEmployeeList',
                    type:"post",
                    data:{},
                    success:function (result) {
                        self.employeelist = result.employeelist;
                    }
                });
            }
        },
        created:function () {
            this.getCategoryList();
            this.getList(1, '');
            this.getEmployeeList();
        }

    });
});

