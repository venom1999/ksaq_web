$(function() {
  if($('#conditions').val()!=''){
    //alert(querystring);
    var querystring = $('#conditions').val();
    var querylist = querystring.split(/and|or/);
    var andlist = querystring.match(/and|or/g);
    var querynum = querylist.length;
    for (var i = 1; i <= querynum; i++) {
      reset_row(i);
      $("#div" + i).show();
      var query = querylist[i - 1].trim().split(' ');
      $('#div' + i + '>.span_category').children().val(query[0]);
      if (i >= 2) {
        $('#div' + i + '>.span_and').children().val(andlist[i - 2]);
      }
      select_category(query[0], i);
      $('#div' + i + '>.span_comparison').children().each(function() {
        if ($(this).css('display').indexOf('none')<0) {
          $(this).val(query[1]);
        }
      });
      $('#div' + i + '>.span_value').children().each(function() {
        if ($(this).css('display').indexOf('none')<0) {
          $(this).val(query[2].replace(/'/g,'').replace(/%/g,''));
        }
      });
    }
    for (var i = querynum+1; i <= 5; i++) {
      $("#div" + i).hide();
    }
  }
  $('.category').change(function(){
    var i= parseInt($(this).parent().parent().attr('id').substr(3,1));
    select_category($(this).val(), i);
    
  });

  $("#delete_queryrow").click(function() {
    var querynum = get_querynum();
    if (querynum > 1) {
      $("#div" + querynum).hide();
    }
  });
  $("#add_queryrow").click(function() {
    var querynum = get_querynum();
    if (querynum < 5) {
      $("#div" + (querynum + 1)).show();
      reset_row(querynum + 1);
    }
  });
  /*$("#btn_query").click(
          function() {
            var querystring = '';
            var i=0;
            var flag = true;
            $('.number').each(function(index, ele) {
              if ($(this).css('display').indexOf('none')<0) {
                if(!(/^[0-9]*$/.test($(this).val()))){
                  i = index + 1;
                  flag = false;
                  return false;
                }
              }
            });
            if (!flag) {
              alert('第' + i + '行输入框需要输入数字！');
              return;
            }
            var querynum = get_querynum();
            for (var i = 1; i <= querynum; i++) {
              var rowstring = '';
              if($('#div' + i).find('.category').val()==''){
                continue;
              }
              if (i >= 2 && querystring.replace(/ /g,'')!='') {
                rowstring+=$('#div' + i).find('.and').val()+' ';
              }
              rowstring +=$('#div' + i).find('.category').val()+' ';
              
              var islike=false;

              $('#div' + i + '>.span_comparison').children().each(function() {
                if ($(this).css('display').indexOf('none')<0) {
                  if($(this).val()=='like'){
                    islike=true;
                  }
                  rowstring += $(this).val() + ' ';
                  return false;
                }
              });
              $('#div' + i + '>.span_value').children().each(function() {
                if ($(this).css('display').indexOf('none')<0) {
                  if ($(this).attr('class').indexOf('plain')>=0 || $(this).attr('class').indexOf('date')>=0) {
                    if(islike){
                      rowstring += "'%"+$(this).val() + "%' ";
                    }else{
                      rowstring += "'"+$(this).val() + "' ";
                    }
                    
                  }else{
                    rowstring += $(this).val() + ' ';
                  }
                  return false;
                }
              });
              querystring += rowstring;
            }
            if(querystring.replace(/ /g,'')==''){
              querystring='noquerystring';
            }
            
            //alert(querystring);
            
            httpPost('List',{conditions:querystring});

          });*/

});

function set_date(i) {
  $('#div' + i + '>.span_comparison').children().each(function() {
    if ($(this).attr('class').indexOf('greater') >= 0) {
      $(this).attr('disabled',false);
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $('#div' + i + '>.span_value').children().each(function() {
    if ($(this).attr('class').indexOf('date') >= 0) {
      $(this).val('');
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}
function set_plain(i) {
  $('#div' + i + '>.span_comparison').children().each(function() {
    if ($(this).attr('class').indexOf('contain') >= 0) {
      //$(this).attr('disabled',false);
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  //alert(i);
  $('#div' + i + '>.span_value').children().each(function() {
    if ($(this).attr('class').indexOf('plain') >= 0) {
      //alert($(this).val());
      $(this).val('');
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}
function set_select1(i) {
  $('#div' + i + '>.span_comparison').children().each(function() {
    if ($(this).attr('class').indexOf('contain') >= 0) {
      $(this).val('');
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $('#div' + i + '>.span_value').children().each(function() {
    if ($(this).attr('class').indexOf('select1') >= 0) {
      $(this).val('');
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}


function set_number(i) {
  $('#div' + i + '>.span_comparison').children().each(function() {
    if ($(this).attr('class').indexOf('greater') >= 0) {
      //$(this).attr('disabled',false);
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $('#div' + i + '>.span_value').children().each(function() {
    if ($(this).attr('class').indexOf('number') >= 0) {
      $(this).val('');
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}
function get_querynum() {
  var i;
  for (i = 1; $("#div" + i).length > 0
          && $("#div" + i).css("display") != "none"; i++)
    ;
  return i - 1;
}

function reset_row(i) {
  $('#div' + i + '>.span_category').children().val('');
  $('#div' + i + '>.span_comparison').children().each(function() {
    
    if ($(this).attr('class').indexOf('contain') >= 0) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $('#div' + i + '>.span_value').children().each(function() {
    if ($(this).attr('class').indexOf('plain') >= 0) {
      $(this).show();
      $(this).val('');
    } else {
      $(this).hide();
    }
  });
}
function getConditions(){
  var querystring = '';
  var i=0;
  var flag = true;
  $('.number').each(function(index, ele) {
    if ($(this).css('display').indexOf('none')<0) {
      if(!(/^[0-9]*$/.test($(this).val()))){
        i = index + 1;
        flag = false;
        return false;
      }
    }
  });
  if (!flag) {
    alert('第' + i + '行输入框需要输入数字！');
    return;
  }
  var querynum = get_querynum();
  for (var i = 1; i <= querynum; i++) {
    var rowstring = '';
    if($('#div' + i).find('.category').val()==''){
      continue;
    }
    if (i >= 2 && querystring.replace(/ /g,'')!='') {
      rowstring+=$('#div' + i).find('.and').val()+' ';
    }
    rowstring +=$('#div' + i).find('.category').val()+' ';
    
    var islike=false;

    $('#div' + i + '>.span_comparison').children().each(function() {
      if ($(this).css('display').indexOf('none')<0) {
        if($(this).val()=='like'){
          islike=true;
        }
        rowstring += $(this).val() + ' ';
        return false;
      }
    });
    $('#div' + i + '>.span_value').children().each(function() {
      if ($(this).css('display').indexOf('none')<0) {
        if ($(this).attr('class').indexOf('plain')>=0 || $(this).attr('class').indexOf('date')>=0) {
          if(islike){
            rowstring += "'%"+$(this).val() + "%' ";
          }else{
            rowstring += "'"+$(this).val() + "' ";
          }
          
        }else{
          rowstring += $(this).val() + ' ';
        }
        return false;
      }
    });
    querystring += rowstring;
  }
  if(querystring.replace(/ /g,'')==''){
    querystring='noquerystring';
  }
  return querystring;
}
function getChaiNiSi(){
  var querystring = '';
  var i=0;
  var flag = true;
  $('.number').each(function(index, ele) {
    if ($(this).css('display').indexOf('none')<0) {
      if(!(/^[0-9]*$/.test($(this).val()))){
        i = index + 1;
        flag = false;
        return false;
      }
    }
  });
  if (!flag) {
    alert('第' + i + '行输入框需要输入数字！');
    return 'inputerror';
  }
  var querynum = get_querynum();
  for (var i = 1; i <= querynum; i++) {
    var rowstring = '';
    if($('#div' + i).find('.category').val()==''){
      continue;
    }
    if (i >= 2 && querystring.replace(/ /g,'')!='') {
      rowstring+=$('#div' + i).find('.and').find("option:selected").text()+' ';
    }
    rowstring +=$('#div' + i).find('.category').find("option:selected").text();
    var islike=false;

    $('#div' + i + '>.span_comparison').children().each(function() {
      if ($(this).css('display').indexOf('none')<0) {
        rowstring += $(this).find("option:selected").text() ;
        return false;
      }
    });
    $('#div' + i + '>.span_value').children().each(function() {
      if ($(this).css('display').indexOf('none')<0) {
        //alert($(this)[0].tagName);
        if($(this)[0].tagName=='INPUT'){
          rowstring += $(this).val() + ' ';
          
        }else{
          rowstring += $(this).find("option:selected").text() + ' ';
        }
        return false;
      }
    });
    querystring += rowstring;
  }
  if(querystring.replace(/ /g,'')==''){
    querystring='noquerystring';
  }
  return querystring;
}
