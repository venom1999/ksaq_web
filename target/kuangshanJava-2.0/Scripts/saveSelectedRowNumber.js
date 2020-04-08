$(function() {
  //alert("123")
  if($('.fy').length>0){
    var pageCookieName = getHtmlDocName();
    var rowIndex = getCookie(pageCookieName);

    if (rowIndex != null && $("input.radio").length >= 1
            && rowIndex < $("input.radio").length
            && ($("input.radio")[rowIndex] != undefined)) {
      $("input.radio")[rowIndex].checked = true;
      //console.log($("input.radio")[rowIndex]);
    }
    $("input.radio").change(function() {
      $("input.radio").each(function(index, ele) {
        if (ele.checked == true) {
          setCookie(pageCookieName, index, 2);
        }
      });
    });
  }
  
  
  

});

function getHtmlDocName() {
  var str = window.location.href;
  str = str.substring(str.lastIndexOf("/") + 1);
  if (str.indexOf("?") > -1) {
    str = str.substring(0, str.lastIndexOf("?"));
  }
  //str = str.substring(0, str.lastIndexOf("."))
  //alert(str);
  return str;
}

function changeRadioAsPN(rowIndex) {

  if (rowIndex != null && $("input.radio").length >= 1
          && rowIndex < $("input.radio").length
          && ($("input.radio")[rowIndex] != undefined)) {
    $("input.radio")[rowIndex].checked = true;
    //console.log($("input.radio")[rowIndex].val());
  }
}


//在cookie中通过name获取value
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
//设置cookie
function setCookie(name, value, days) {
  var exp = new Date();
  exp.setDate(exp.getDate() + days);
  document.cookie = name + "=" + escape(value) + ";expires="
          + exp.toGMTString();
}
//删除cookie
function deleteCookie(name) {
  setCookie(name, "", -1);
}
function getQueryString(name) {
  //alert(window.location.search);
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2]; return '';
}

function getFatherCookie() {
  return getQueryString("fatherCookie");
}
