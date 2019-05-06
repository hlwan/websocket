
var _upload_next=function () {
    var fileT=$("input[type=file]");
    for(var i=0;i<fileT.length;i++){
        var id=$(fileT[i]).attr('data-param');
        var caption=$(fileT[i]).attr('data-caption');
        $(fileT[i]).fileinput({
            language: 'zh',
            ajaxSettings:{
                beforeSend: function(xhrObj){
                    xhrObj.setRequestHeader("Accept","application/json");
                    //showOverlay();
                }
            },
            uploadUrl:_url_prefix+'/dashboard/order/detail/upload/'+id,
            showCaption: false,
            showUpload:false, //是否显示上传按钮
            showRemove :false, //显示移除按钮
            showPreview :false, //是否显示预览
            showClose:false,
            showBrowse:true,
            maxFileCount:1,
            browseLabel:caption,
            uploadAsync:false,
            showCancel:false,
            maxFileCount: 1,//表示允许同时上传的最大文件个数
            enctype: 'multipart/form-data',
            validateInitialCount:true,
            previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
            browseClass:"btn btn-default"
        }).on("filebatchselected", function(event, files) {
            $(this).fileinput("upload");
        }).on('fileerror', function(event, data, msg) {
        }).on('filebatchuploaderror', function(event, data, msg) {
            warn(msg);
        }).on('filebatchuploadsuccess', function(event, data, msg) {
            if(data.response){
                warn('上传成功.如果页面没有加载出图片，可尝试刷新页面');
                edit_vue.setData(data.response);
            }else{
                warn(msg);
            }
        });
        $(fileT[i]).parents('div.file-input').find('.progress').parent().remove();
    }
};
var edit_vue=new Vue({
    el:'#form_edit',
    data:{
        detail:{
            id:'',
            orderId:'',
            merchantId:'',
            merchantName:'',
            shopId:'',
            shopName:'',
            shopStatus:'',
            onlineTime:'',
            expireDate:'',
            brandName:'',
            category:'',
            contacts:'',
            phoneNo:'',
            status:'',
            statusName:'',
            province:'',
            city:'',
            address:'',
            imgId:'',
            actionUrl:'',
            imgUrl:'',
            updateTime:null,
			token:false,
        }
    },
    methods:{
        cancel:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/order/detail/list/'+this.detail.orderId;
        },
        load:function(id){
            var t=this;
            var url=_context_path+_servlet_path+'/dashboard/order/detail/detail?id='+id
            get(url,{},function (data) {
                t.detail=data;
                edit_vue.$nextTick(_upload_next);
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            })
        },
        setActionUrl:function(){
            address_vue.detailId=edit_vue.detail.id;
            address_vue.address=edit_vue.detail.actionUrl;
            $('#product_address_input').modal('show');
        },
        setData:function(data){
            this.detail=data;
            this.$nextTick(_upload_next);
        },
        complete:function(){
            var t=this;
            post(_url_prefix+'/dashboard/order/detail/complete/'+t.detail.id,{},function(data){
                t.detail=data;
                if(t.token!=true){
                    warn('操作成功。但系统中没有商户授权信息，请提醒商户进入服务进行授权');
                }
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        cancel:function(){
            reject_view.detailId=this.detail.id;
            reject_view.reason=this.detail.reason;
            $('#product_reject_reason').modal('show');
        },
        confirm:function(){
            var t=this;
            post(_url_prefix+'/dashboard/order/detail/confirm/'+t.detail.id,{},function(data){
                t.detail=data;
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        up:function(){
            var t=this;
            post(_url_prefix+'/dashboard/order/detail/up/'+t.detail.id,{},function(data){
                t.detail=data;
				this.$nextTick(_upload_next);
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        down:function(){
            var t=this;
            post(_url_prefix+'/dashboard/order/detail/down/'+t.detail.id,{},function(data){
                t.detail=data;
				this.$nextTick(_upload_next);
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        }
    }
});

var address_vue=new Vue({
    el:"#product_address_input",
    data:{
        detailId:'',
        address:'',
    },
    methods:{
        submit_address:function () {
            if(this.address==null||this.address==''){
                warn('产品地址不可为空');
                return ;
            }
            save_address();
        }
    }
});
function save_address(){
    var url=_url_prefix+'/dashboard/order/detail/setAddress/'+address_vue.detailId+'?address='+address_vue.address;
    post(url,{},function(data){
        var t=edit_vue.detail;
        if(t!=null){
            edit_vue.detail.status=data.status;
            edit_vue.detail.statusName=data.statusName;
            edit_vue.detail.actionUrl=data.actionUrl;
            edit_vue.detail.token=data.token;
        }
        address_vue.detailId='';
        address_vue.address='';
        $('#product_address_input').modal('hide');
    },function(msg){
        warn(msg.responseJSON.msg);
    });
}

var reject_view=new Vue({
    el:'#product_reject_reason',
    data:{
        detailId:'',
        reason:'',
    },
    methods:{
        reject:function(){
            if(this.reason==null||this.reason==''){
                warn('拒绝原因不可为空');
                return ;
            }
            var t=this;
            post(_url_prefix+'/dashboard/order/detail/cancel/'+t.detailId+'?reason='+this.reason,{},function(data){
                var t=edit_vue;
                t.status=data.status;
                t.statusName=data.statusName;
                t.reason=data.reason;
				t.token=data.token;
                reject_view.detailId='';
                reject_view.reason='';
                $('#product_reject_reason').modal('hide');
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });

        }
    }
});
edit_vue.load(_to_load_id);

