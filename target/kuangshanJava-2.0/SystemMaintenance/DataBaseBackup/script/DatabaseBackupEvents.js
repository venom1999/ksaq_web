window.onload = function () {
    new Vue({
        el: "#right",
        data: {
            tableLoading: false,
            restoreDialogVisible: false,
            resUploadDialogVisible: false,

            restoreFrom: {
                time: ''
            },

            resUploadFrom: {
                resUpTime: ''
            },

            timeList : [],

            resUpTimeList : [
                {
                    label: '今天',
                    value: 1
                },
                {
                    label: '昨天',
                    value: 2
                },
            ],

            rules: {
                time: [
                    {required: true, message: '请选择还原日期', trigger: 'change'}
                ],
                resUpTime: [
                    {required: true, message: '请选择还原时间', trigger: 'change'}
                ]
            }

        },

        methods: {

            // 还原上传文件选择页面
            restoreUploadV: function () {
                let self = this;
                self.resUploadDialogVisible = true;

            },

            // 还原上传文件
            _restoreUpload: function () {
                let self = this;
                if (self.resUploadFrom.resUpTime == '') {
                    self.$message({
                        type: 'warning',
                        message: '文件上传还原时间不能为空！',
                    });
                    return;
                }

                self.tableLoading = true;
                self.resUploadDialogVisible = false;

                $.ajax({
                    url: "restoreUpload",
                    type: "post",
                    data: {
                        resUpTime : self.resUploadFrom.resUpTime
                    },
                    async: true,
                    success: function (message) {
                        self.tableLoading = false;
                        self.resUploadFrom.resUpTime = '';

                        if (message == 'success') {
                            self.$message({
                                type: 'success',
                                message: '上传文件文件还原成功'
                            });
                        } else {
                            self.restoreFrom.time = '';
                            self.$message({
                                type: 'warning',
                                message: '上传文件还原失败，请根据相关帮助文档操作',
                            });
                        }
                    },
                    error: handleError
                });


            },

            // 服务器还原选择页面
            restoreByServerV: function() {
                let self = this;
                self.restoreDialogVisible = true;

            },

            // 从服务器上还原
            _restoreByServer: function () {
                let self = this;
                if (self.restoreFrom.time == '') {
                    self.$message({
                        type: 'warning',
                        message: '还原时间不能为空！',
                    });
                    return;
                }

                self.tableLoading = true;
                self.restoreDialogVisible = false;
                $.ajax({
                    url: "restoreByServer",
                    type: "post",
                    data: {
                        time : self.restoreFrom.time
                    },
                    async: true,
                    success: function (message) {
                        self.tableLoading = false;
                        self.restoreFrom.time = '';

                        if (message == 'success') {
                            self.$message({
                                type: 'success',
                                message: '服务器还原成功'
                            });
                        } else {
                            self.restoreFrom.time = '';
                            self.$message({
                                type: 'warning',
                                message: '服务器还原失败，请确认服务器中的备份文件是否存在默认位置',
                            });
                        }
                    },
                    error: handleError
                });

            },


            // 获取bak时间
            getBakTime: function () {
                let self = this;

                $.ajax({
                    url: "getBakTime",
                    type: "post",
                    data: {},
                    async: true,
                    success: function (message) {

                        if (message.status == 'success') {
                            self.timeList = message.timeList;
                        } else {
                            self.restoreFrom.time = '';
                            self.$message({
                                type: 'warning',
                                message: message.msg,
                            });
                        }
                    },
                    error: handleError
                });
            }




            // self.$prompt('请输入还原密码：', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     inputType: 'password'
            // }).then(({value}) => {
            //     if (value == "666666") {
            //         self.restoreDialogVisible = true;
            //     } else {
            //         self.$message({
            //             type: 'warning',
            //             message: '密码错误',
            //         });
            //     }
            // }).catch(() => {
            //     self.$message({
            //         type: 'info',
            //         message: '已取消还原'
            //     });
            // });


            // used: 0,
            // autoBackupV: true,    // 自动备份已弃用
            // closeAutoBackupV: false,     // 自动备份已弃用
            // progressVisible:false,    // 进度条 2019.11.15已弃用
            // filename: '',    // 上传文件名 2019.11.15已弃用


            // 获取第几天的日期格式
            // getFormDate: function ( num ) {
            //     let today = new Date();
            //     let oneDay = 1000 * 60 * 60 * 24;
            //     let targetDay = new Date(today - oneDay * num);
            //
            //     let year = targetDay.getFullYear();
            //     let month = targetDay.getMonth() + 1;
            //     let day = (targetDay.getDate() < 10)? '0'+targetDay.getDate() : targetDay.getDate();
            //
            //     return year + '-' + month + '-' + day
            // },


            // 自动备份界面 2019.11.15已弃用
            // _autoBackup: function () {
            //     this.autoBackupDialogVisible = true;
            // },

            // 自动备份 2019.11.15已弃用
            // _autoBackup: function () {
            //     let self = this;
            //
            //     //self.autoBackupDialogVisible = false;
            //     $.ajax({
            //         url: "autoBackup",
            //         type: "post",
            //         data: {
            //             state: true
            //         },
            //         success: function (message) {
            //             if (message) {
            //                 self.autoBackupV = false;
            //                 self.closeAutoBackupV = true;
            //                 self.autoBackupFrom.time = '';
            //                 self.$message({
            //                     type: 'success',
            //                     message: '启动成功'
            //                 });
            //             } else {
            //                 self.$message({
            //                     type: 'warning',
            //                     message: '启动失败，请联系开发者',
            //                 });
            //             }
            //         },
            //         error: handleError
            //     });
            //
            //
            // },

            // 关闭自动备份 2019.11.15已弃用
            // _closeAutoBackup: function () {
            //     let self = this;
            //     $.ajax({
            //         url: "autoBackup",
            //         type: "post",
            //         data: {
            //             state: false
            //         },
            //         success: function (message) {
            //             if (message) {
            //                 self.autoBackupV = true;
            //                 self.closeAutoBackupV = false;
            //                 self.$message({
            //                     type: 'success',
            //                     message: '关闭成功'
            //                 });
            //             } else {
            //                 self.$message({
            //                     type: 'warning',
            //                     message: '关闭失败，请联系开发者',
            //                 });
            //             }
            //         },
            //         error: handleError
            //     });
            // },

            // 是否开启了自动备份 2019.11.15已弃用
            // getAutoState: function () {
            //     let self = this;
            //     $.ajax({
            //         url: "getAutoBackup",
            //         type: "post",
            //         data: {},
            //         dataType: 'json',
            //         success: function (data) {
            //             self.autoBackupV = !data.state;
            //             self.closeAutoBackupV = !self.autoBackupV;
            //         },
            //         error: handleError
            //     });
            // },

            // 手动还原  2019.11.15已弃用
            // _restore: function() {
            //     let self = this;
            //     if (self.filename == "") {
            //         self.$message({
            //             type: 'warning',
            //             message: '请先上传.bak文件'
            //         });
            //     } else {
            //         self.$prompt('请输入还原密码: ', '提示', {
            //             confirmButtonText: '确定',
            //             cancelButtonText: '取消',
            //             inputType: 'password'
            //         }).then(({ value }) => {
            //             if (value == "666666") {
            //                 self.tableLoading = true;
            //                 $.ajax({
            //                     url: "restore",
            //                     type: "post",
            //                     data: {filename: self.filename},
            //                     async: true,
            //                     success: function (message) {
            //                         self.tableLoading = false;
            //                         console.log(message);
            //                         if (message == 'success') {
            //                             self.filename = '';
            //                             self.$refs['my-upload'].clearFiles();
            //                             self.$message({
            //                                 type: 'success',
            //                                 message: '还原成功'
            //                             });
            //                         } else {
            //                             self.$refs['my-upload'].clearFiles();
            //                             self.filename = '';
            //                             self.$message({
            //                                 type: 'warning',
            //                                 message: '还原失败，请检查文件类型是否是自己手动导出的文件',
            //                             });
            //                         }
            //                     },
            //                     error: handleError
            //                 });
            //             } else {
            //                 self.$message({
            //                     type: 'warning',
            //                     message: '密码输入错误'
            //                 });
            //             }
            //
            //         }).catch(() => {
            //             self.$message({
            //                 type: 'info',
            //                 message: '取消输入'
            //             });
            //         });
            //
            //
            //     }
            // },


            // 手动备份  2019.11.15已弃用
            // _backup: function(){
            //     let self = this;
            //     self.progressVisible=true;
            //
            //     let interval = setInterval(self.getProgress, 1000);
            //     let seek = (Math.floor(Math.random() * 1000000) + 1).toString();
            //     $.ajax({
            //         type: 'post',
            //         url: "backup",
            //         data: {seek: seek},
            //         dataType: "json",
            //         async: true,
            //         success: function (message) {
            //             clearInterval(interval);
            //             self.used = message[seek];
            //
            //             setTimeout(function () {
            //                 self.progressVisible = false;
            //
            //                 if (message.state == "1") {
            //                     self.$message({
            //                         type: 'success',
            //                         message: '备份成功'
            //                     });
            //                     httpPost('downloadBackup', {
            //                         filePath : message.filePath,
            //                         fileName : message.fileName
            //                     });
            //                 } else if (message.state == "2") {
            //                     self.$message({
            //                         type: 'success',
            //                         message: '由于备份文件较大，已经成功备份到服务器F盘下的数据文件备份文件夹中，请到服务器桌面拷贝即可，以便用于还原'
            //                     });
            //                 } else {
            //                     self.$message({
            //                         type: 'warning',
            //                         message: '备份失败，请重试',
            //                     });
            //                 }
            //
            //             }, 1000);
            //
            //         },
            //         error: handleError
            //     });
            //
            // },
            //
            // getProgress: function () {
            //     let self = this;
            //     let seek = (Math.floor(Math.random() * 1000000) + 1).toString();
            //     $.ajax({
            //         url: "backupProgress",
            //         type: "post",
            //         data: {seek : seek},
            //         dataType: "json",
            //         async: true,
            //         success: function (message) {
            //             //console.log(message[seek]);
            //             self.used = message[seek];
            //         },
            //         error: handleError
            //     });
            // },
            //
            // successUpload(response, file) {
            //     this.filename += file.name;
            //     console.log("filename: " + this.filename);
            // },
            //
            // removeFile() {
            //     this.filename = "";
            // },

        },

        created: function () {
           this.getBakTime();
        }


    });
};