$(function () {
    new Vue({
        el: "#login",
        data: {

            dialogVisible:false,
            loginForm:{
                username:'',
                userpwd:'',
                seccode:''
            },
            checkCode:'',
            // rules: {
            //     username: [
            //         {required: true, message: '请输入用户名', trigger: 'blur'}
            //     ],
            //     userpwd: [
            //         {required: true, message: '请输入密码', trigger: 'blur'}
            //     ],
            //     seccode: [
            //         {required: true, message: '请输入验证码', trigger: 'blur'}
            //     ]
            // },

        },
        methods:{
            popLogin:function(){
                this.dialogVisible=true;
                this.createCode();
            },
            forgetPwd:function(){
                this.$message('请联系管理员');
            },
            login:function(){
                let userid=this.loginForm.username;
                let password=this.loginForm.userpwd;
                let objReturn=this.passwordValid(password);
                if(this.loginForm.seccode.toLowerCase()!=this.checkCode.toLowerCase()&&this.loginForm.seccode!=''){
                    this.$message.error('验证码错误');
                    this.createCode();
                }else if(objReturn.bPwd==false){
                    this.$message.error('密码长度应该大于等于8');
                }else if(objReturn.degreeNumber<3){
                    this.$message.error('密码应该至少包括数字、大小写字母、特殊字符中的三个');
                }else{
                    $.ajax({
                        type: 'post',
                        url: 'user_login',
                        data: {
                            userid:userid,
                            password:password,
                        },
                        dataType: 'json',
                        success:function (data) {
                            if(data.status==='ok'){
                                sessionStorage.setItem("userRight",data.userRight);
                                sessionStorage.setItem("userName",data.userName)
                                sessionStorage.setItem("userInstitutionCategoryNum",data.userInstitutionCategoryNum)
                                sessionStorage.setItem("userInstitution",data.userInstitution)
                                sessionStorage.setItem("userInstitutionName",data.userInstitutionName)
                                sessionStorage.setItem("userNum",data.userNum)
                                window.location.href='main2.jsp';
                            }else{
                                ELEMENT.Message({
                                    message: data.text,
                                    type: 'error'
                                });
                                //alert(data.text);
                            }
                        }
                    })
                }

            },
            // 密码校验（数字，大写字母，小写字母，特殊字符四选三，8位及以上）
            passwordValid:function(valPwd) {
                let msg = "";
                let degreeNumber = 0;
                let bPwd = false;

                if (valPwd == null || valPwd.length < 8 || valPwd.trim().length == "") {
                    bPwd = false;
                } else {
                    bPwd = true;
                }
                let arrVerify = [
                    {regName: 'Number', regValue: /^.*[0-9]+.*/},
                    {regName: 'LowerCase', regValue: /^.*[a-z]+.*/},
                    {regName: 'UpperCase', regValue: /^.*[A-Z]+.*/},
                    {regName: 'SpecialCharacters', regValue: /^.*[^a-zA-Z0-9]+.*/}
                ];
                let regNum = 0;// 记录匹配的次数
                for (let iReg = 0; iReg < arrVerify.length; iReg++) {
                    if (arrVerify[iReg].regValue.test(valPwd)) {
                        regNum = regNum + 1;
                    }
                }
                degreeNumber = regNum;
                // if (regNum <= 2) {
                //     msg = "密码必须包含大小写字母和数字";
                // }
                let objReturn = {
                    // msg: msg,
                    degreeNumber: degreeNumber,
                    bPwd: bPwd
                };
                return objReturn;
            },
            createCode:function() {
                let code = "";
                const codeLength = 4; //验证码的长度
                const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'); //随机数
                for(let i = 0; i < codeLength; i++) { //循环操作
                    let index = Math.floor(Math.random() * 62); //取得随机数的索引（0~61）
                    code += random[index]; //根据索引取得随机数加到code上
                }
                this.checkCode = code; //把code值赋给验证码
            },

        },
        created:function (){
            //this.login();
        },
    });
})