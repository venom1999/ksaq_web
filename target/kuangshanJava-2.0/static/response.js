$(function(){
        Date.prototype.format = function(fmt)
    {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
    // 每隔10秒向后台传递信息
    let usernum=sessionStorage.getItem('userNum');
    let timeCount=0;
    let t=setInterval(function(){
        timeCount++;//每隔1s加一
        if(timeCount==10){

            let time=new Date().format("yyyy-MM-dd HH:mm:ss");
            $.ajax({
                type:'post',
                url:'user_status',
                data:{
                    userNum:usernum,
                    nowTime:time
                },
                dataType:'json',
                success:function(result){

                }
            })
            timeCount=0;
        }
    },1000)

    // 10分钟不操作时传递信息
    let op=0;
    let p=setInterval(function(){
        op++;//每隔1分钟加1
        if(op==10){
            $.ajax({
                type:'post',
                url:'user_offline',
                data:{
                    userNum:usernum
                },
                dataType:'json',
                success:function(result){

                }
            })
            op=0;
            timeCount=0;
            clearInterval(t);
            clearInterval(p);
            window.location.href="access_rejected.jsp";
        }

    },60000)
    $(document).on('click',function(){
        op=0;
    });
    $(document).on('keydown',function(){
        op=0;
    });
//     Date.prototype.format = function(fmt)
//     {
//         var o = {
//             "M+" : this.getMonth()+1, //月份
//             "d+" : this.getDate(), //日
//             "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
//             "H+" : this.getHours(), //小时
//             "m+" : this.getMinutes(), //分
//             "s+" : this.getSeconds(), //秒
//             "q+" : Math.floor((this.getMonth()+3)/3), //季度
//             "S" : this.getMilliseconds() //毫秒
//         };
//         if(/(y+)/.test(fmt))
//             fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
//         for(var k in o)
//             if(new RegExp("("+ k +")").test(fmt))
//                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//         return fmt;
//     }
//     let timeCount=0;
//     let is_confirm=true;
//     let userid=window.sessionStorage.getItem('userNum');
//     //alert(userid)
//     //alert(time)
//     let t=setInterval(function(){
//         timeCount++;
//         if(timeCount==10){
//             let time=new Date().format("yyyy-MM-dd HH:mm:ss");
//             //向后台传送flag为0值，十分钟内无操作
//             $.ajax({
//                 type:'post',
//                 url:'user_status',
//                 data:{
//                     userId:userid,
//                     timeCount:10,
//                     nowTime:time,
//                 },
//                 dataType:'json',
//                 success:function(result){
//
//                 }
//             })
//             clearInterval(t);
//             window.location.href="access_rejected.jsp";
//             timeCount=0;
//         }
//         else{
//             let time=new Date().format("yyyy-MM-dd HH:mm:ss");
//             //向后台传送
//             $.ajax({
//                 type:'post',
//                 url:'user_status',
//                 data:{
//                     userId:userid,
//                     timeCount:timeCount,
//                     nowTime:time,
//                 },
//                 dataType:'json',
//                 success:function(result){
//
//                 }
//             })
//         }
//     },60000);
//     $(document).on('click',function(){
//         timeCount=0;
//     });
//     $(document).on('keydown',function(){
//         timeCount=0;
//     });
//
// //异常关闭网页
//     $('a').click(function(){
//         is_confirm=false;
//     });
//     $('button').click(function(){
//         is_confirm=false;
//     });
//     // 关闭窗口时弹出确认提示
//     $(window).bind('beforeunload', function(){
//         // 只有在标识变量is_confirm不为false时，才弹出确认提示
//         if(is_confirm !== false){
//             return '您可能有数据没有保存';
//         }
//
//     });
//     // mouseleave mouseover事件也可以注册在body、外层容器等元素上
//     $(window).bind('mouseover mouseleave', function(event){
//             is_confirm = event.type == 'mouseleave';
//     });
//
//
//
//     $(window).bind('unload',function(){
//         //向后台传递用户已下线
//         // let time=new Date().format("yyyy-MM-dd HH:mm:ss");
//         // $.ajax({
//         //     type:'post',
//         //     url:'user_status',
//         //     data:{
//         //         userId:userid,
//         //         timeCount:10,
//         //         nowTime:time,
//         //     },
//         //     dataType:'json',
//         //     success:function(result){
//         //
//         //     }
//         // })
//     });

})