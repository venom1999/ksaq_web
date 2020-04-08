window.onload = function () {
    var padDate = function (va) {
        va = va < 10 ? '0' + va : va;
        return va
    }

    //两个页面之间的post，也用于导出和下载
    function httpPost(URL, PARAMS) {
        var temp = document.createElement("form");
        temp.action = URL;
        temp.method = "post";
        temp.style.display = "none";

        for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
            temp.appendChild(opt);
        }

        document.body.appendChild(temp);
        temp.submit();

        return temp;
    }

    new Vue({
        el: ".right",
        data: {

            pageLoading: false,
            ruleForm: {
                EmployeeID: '',
                oldPassword:'',
                Password: '',
                pass: '',
                checkPass: '',
            },
            rules: {
                Password: [{required: true, message: '请输入旧登陆密码', trigger: 'blur',}],
                pass: [{required: true, message: '请输入新登陆密码', trigger: 'blur',}],
                checkPass: [{required: true, message: '再次输入新登陆密码', trigger: 'blur'}]
            }
        },
        methods: {

            _close: function () {
                top.location.href = '/kuangshanJava/main2.jsp';
            },

            passwordChange:function(){
                let vm = this;
                if(vm.ruleForm.oldPassword!=vm.ruleForm.Password)
                {
                    vm.ruleForm.Password = ''
                    this.$message({
                        showClose: true,
                        message: '旧密码错误！',
                        type: 'error'
                    });
                }
            },

            passChange: function () {
                let vm = this;
                vm.ruleForm.checkPass = ''
            },
            checkPassChange: function () {
                let vm = this;
                if (vm.ruleForm.pass != vm.ruleForm.checkPass) {
                    vm.ruleForm.pass = ''
                    vm.ruleForm.checkPass = ''
                    this.$message({
                        showClose: true,
                        message: '两次输入密码不一致！',
                        type: 'warning'
                    });
                }
            },


            submitAdd: function () {
                let vm = this
                this.$refs['ruleForm'].validate(function (valid) {
                    if (valid) {
                        $.ajax({
                            type: 'post',
                            url: 'Save_ChangePWD_2',
                            data: vm.ruleForm,
                            // dataType: 'json',
                            success: function (response) {
                                if (response === 'success') {
                                    ELEMENT.Message({
                                        message: '保存成功',
                                        type: 'success'
                                    });

                                } else {
                                    ELEMENT.Message({
                                        message: '保存失败',
                                        type: 'error'
                                    });
                                }
                            },
                            error: handleError
                        })
                    } else {
                        ELEMENT.Message(
                            {
                                message: '请先完成输入！',
                                type: 'error'
                            }
                        );
                    }
                })
            },


            //获取list
            getList: function () {

                let vm = this;
                vm.ruleForm.EmployeeID = '';
                vm.ruleForm.Password = '';
                vm.ruleForm.pass = '';
                vm.ruleForm.checkPass = '';
                vm.ruleForm.oldPassword = ''


                $.ajax({
                    url: 'Info_ChangePWD_2',
                    type: "post",
                    data: {tag:'Web'},
                    dataType: 'json',
                    success: function (result) {
                        vm.ruleForm.EmployeeID = result.EmployeeID;
                        vm.ruleForm.oldPassword = result.oldPassword
                    },
                    error: handleError
                });
            }
        },
        created: function () {
            this.pageLoading = true;
            this.getList();
        },
        mounted: function () {
            this.pageLoading = false
        }
    });
}