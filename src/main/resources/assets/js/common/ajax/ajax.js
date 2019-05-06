var _ajax=$.ajax;
$.ajax=function(option){
    var _o_b=option.beforeSend;
    option.beforeSend=function(p){
        showOverlay();
        if(_o_b&&_o_b!=null){
            _o_b(p);
        }
    };
    var _o_s=option.complete;
    option.complete=function(){
        hideOverlay();
        if(_o_s&&_o_s!=null){
            _o_s(arguments);
        }
    };
    return _ajax(option);
};
    var post =function(url,data,success_callback,fail_callback){
          ajax_call("POST",url,data,success_callback,fail_callback);
      };

      var put =function(url,data,success_callback,fail_callback){
          ajax_call("PUT",url,data,success_callback,fail_callback);
      };

      var get = function(url,data,success_callback,fail_callback){
          ajax_call("GET",url,data,success_callback,fail_callback);
      };

      var del = function(url,data,success_callback,fail_callback){
          ajax_call("DELETE",url,data,success_callback,fail_callback);
      };

      var get_normal = function(url,data,success_callback,fail_callback){
          ajax_normal_call("GET",url,data,success_callback,fail_callback);
      };
      var post_normal = function(url,data,success_callback,fail_callback){
          ajax_normal_call("POST",url,data,success_callback,fail_callback);
      };


      var ajax_normal_call = function(call_type, url, data, success_callback,fail_callback){
        $.ajax({
          beforeSend: function(xhrObj){
             //showOverlay();
          },
          type: call_type,
          url: url,
          data: data
        })
        .done(function(json){
             $.Deferred(success_callback(json))
             .done(hideOverlay())
         })
        .fail(function(xhr){
            $.Deferred(fail_callback(xhr))
            .done(hideOverlay())
        })
      };

      var ajax_call = function(call_type, url, data, success_callback,fail_callback){
        $.ajax({
          beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Accept","application/json");
            //showOverlay();
          },
          type: call_type,
          url: url,
          dataType: "json",
          data: data
        })
        .done(function(json){
             $.Deferred(success_callback(json))
             .done(hideOverlay())
         })
        .fail(function(xhr){
            $.Deferred(fail_callback(xhr))
            .done(hideOverlay())
        })
        ;
      };

/* 显示遮罩层 */
var _m_count=0;
function showOverlay() {
    if(_m_count==0){
        $("body").mLoading();
    }
    _m_count++;
}
/* 隐藏覆盖层 */
function hideOverlay() {
    if(_m_count>0){
        _m_count--;
    }
    if(_m_count==0){
        $("body").mLoading('hide');
    }
}

function warn(msg,url) {
    var p=$('#_system_info');
    if(url){
        p.find('.modal-body').html('<a target="_blank" href="'+url+'">'+msg+'</a>');
    }else{
        p.find('.modal-body').html(msg);
    }
    p.modal('show');
}