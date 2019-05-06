
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
            console.log('fileerror');
            console.log(arguments);
        }).on('filebatchuploaderror', function(event, data, msg) {
            warn(msg);
        }).on('filebatchuploadsuccess', function(event, data, msg) {
            if(data.response){
                warn('上传成功');
                var r=data.response;
                console.log(data);
                var t=null;
                for(var i=0;i<page_vue.page.page_data.length;i++){
                    if(page_vue.page.page_data[i].id==r.id){
                        t=page_vue.page.page_data[i];
                    }
                }
                if(t!=null){
                    t.onlineTime=r.onlineTime;
                    t.imgUrl=r.imgUrl;
                }
                page_vue.$nextTick(_upload_next);
            }else{
                warn(msg);
            }
        });
        $(fileT[i]).parents('td').find('.progress').parent().remove();
    }
};

var order_info_vue=new Vue({
    el:'#order_info',
    data:{
        order:_order_info,
    }
});
var search_vue=new Vue({
    el:'#search_condition',
    data:{
        name:null,
        status:'',
    },
    methods:{
        search:function(){
            page_vue.loadData();
        }
    }
});

var page_vue=new Vue({
    el: '#data-table',
    data: {
        page:{
            page_headers:[
                {
                    "caption":"店铺名称",
                    "key":"shopName",
                },{
                    "caption":"联系方式",
                    "type":"render",
                    "renderer":function(data){
                        if(data.contacts==null){
                            return data.phoneNo;
                        }
                        return data.contacts+'/'+data.phoneNo;
                    }
                },{
                    "caption":"省市",
                    "type":"render",
                    "renderer":function(data){
                        return data.province+data.city;
                    }
                },{
                    "caption":"状态",
                    "key":"statusName",
                },{
                    "caption":"上架时间",
                    "key":"onlineTime",
                },{
                    "caption":"到期时间",
                    "key":"expireDate",
                },{
                    "caption":"图片",
                    "type":"render",
                    "renderer":function(data){
                        var h='';
                        if(data.serviceStatus==1){
                            return '使用中';
                        }
                        if(data.imgUrl&&data.imgUrl!=''&&data.imgUrl!=null){
                                //未上架
                            h=h+'已上传<br/><input name="file" data-caption="重新上传(1242px*290px,<50k)" accept=".jpg,.jpeg,.png,.bmp,.gif" data-param="'+data.id+'" type="file" class="file-loading" data-preview-file-type="text">';
                        }else{
                            h=h+'未上传(1242px*290px,&lt;50k)<br/><input name="file"  data-caption="上传" accept=".jpg,.jpeg,.png,.bmp,.gif"  data-param="'+data.id+'" type="file" class="file-loading" data-preview-file-type="text">';
                        }
                        return h;
                    }
                },{
                    "caption":"产品地址",
                    "type":"render",
                    "renderer":function(data){
                        var h='<div class="btn-group" role="group">';
                        if(data.serviceStatus==1){
                            h=h+'<button type="button" class="btn btn-default" onclick="check_product(\''+data.actionUrl+'\')">查看</button>' ;
                        }else{
                            if(_current_user.isMerchant==false){
                                if(data.actionUrl&&data.actionUrl!=null&&data.actionUrl!=''){
                                    h=h+'<button type="button" class="btn btn-default" onclick="set_action_url('+data.id+')">更换</button>' ;
									h=h+'<button type="button" class="btn btn-default" onclick="check_product(\''+data.actionUrl+'\')">查看</button>' ;
                                }else{
                                    h=h+'<button type="button" class="btn btn-default" onclick="set_action_url('+data.id+')">设置</button>' ;
                                }
                            }else{
								if(data.actionUrl&&data.actionUrl!=null&&data.actionUrl!=''){
									h=h+'<button type="button" class="btn btn-default" onclick="check_product(\''+data.actionUrl+'\')">查看</button>' ;
								}else{
									h=h+'<button type="button" class="btn btn-default" onclick="">未设置</button>' ;
								}
							}
                            
                        }
                        h=h+'</div>';
                        return h;
                    }
                },{
                    "caption":'操作',
                    'type':'render',
                    'renderer':function(data){
                        var h='<div class="btn-group" role="group">';
                        if(_current_user.isMerchant==false){
                            if(data.status==5){
                                h=h+'<button type="button" class="btn btn-default" onclick="complete('+data.id+')">完成</button>' +
                                    '<button type="button" class="btn btn-default" onclick="cancel('+data.id+')">取消</button>';
                            }
                        }
                        if(data.status==10){
                            h=h+'<button type="button" class="btn btn-default" onclick="confirm('+data.id+')">确认</button>' ;
                        }
                        if(data.status==15){
                            //上下架的判断
                            if(data.serviceStatus==1){
                                h=h+'<button type="button" class="btn btn-default" onclick="down('+data.id+')">下架</button>' ;
                            }else{
                                h=h+'<button type="button" class="btn btn-default" onclick="up('+data.id+')">上架</button>' ;
                            }
                        }
                        h=h+'<button type="button" class="btn btn-default" onclick="detail('+data.id+')">查看</button></div>';
                        return h;
                    }
                }
            ],
            page_data:[],
            page_info:{
                number:0,
                totalPages:0,
                totalElements:0
            },
            dataAtPage:function (page) {
                page_vue.loadData(page);
            }
        }
    },
    methods:{
        loadData:function(page,size){
            if(!page||page==null){
                page=0;
            }
            if(!size||size==null){
                size=20;
            }
            var t=this;
            get(this.getUrl(page,size),{},function (data) {
                t.page.page_data=data.content;
                for( var o in t.page.page_info){
                    t.page.page_info[o]=data[o];
                }
                t.$nextTick(_upload_next);
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        getUrl:function (page,size) {
            var url=_url_prefix+'/dashboard/order/detail/search?orderId='+_to_load_id+'&page='+page+'&size='+size;
            if(search_vue.name!=null&&search_vue.name!=''){
                url=url+'&name='+search_vue.name;
            }
            if(search_vue.status!=null&&search_vue.status!=''&&search_vue.status!='-1'){
                url=url+'&status='+search_vue.status;
            }
            return url;
        }
    }
});

page_vue.loadData(0);

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
                for(var i=0;i<page_vue.page.page_data.length;i++){
                    if(page_vue.page.page_data[i].id==data.id){
                        t=page_vue.page.page_data[i];
                    }
                }
                if(t!=null){
                    t.status=data.status;
                    t.statusName=data.statusName;
                    t.reason=data.reason;
                    t.token=data.token;
                }
                reject_view.detailId='';
                reject_view.reason='';
                $('#product_reject_reason').modal('hide');
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });

        }
    }
});

function check_product(url){
    window.open(url);
}
function save_address(){
    var url=_url_prefix+'/dashboard/order/detail/setAddress/'+address_vue.detailId+'?address='+address_vue.address;
    post(url,{},function(data){
        var t=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==data.id){
                t=page_vue.page.page_data[i];
            }
        }
        if(t!=null){
            t.status=data.status;
            t.statusName=data.statusName;
            t.actionUrl=data.actionUrl;
            t.token=data.token;
        }
        address_vue.detailId='';
        address_vue.address='';
        $('#product_address_input').modal('hide');
    },function(msg){
        warn(msg.responseJSON.msg);
    });
}

function set_action_url(id){
    address_vue.detailId=id;
    var t=null;
    for(var i=0;i<page_vue.page.page_data.length;i++){
        if(page_vue.page.page_data[i].id==id){
            t=page_vue.page.page_data[i];
        }
    }
    if(t!=null){
        address_vue.address=t.actionUrl;
    }
    $('#product_address_input').modal('show');
}

function detail(id){
    window.open(_url_prefix+'/dashboard/order/detail/detailPage/'+id);
}

var complete=function(id){
    post(_url_prefix+'/dashboard/order/detail/complete/'+id,{},function(data){
        var t=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==id){
                t=page_vue.page.page_data[i];
            }
        }
        if(t!=null){
            t.status=data.status;
            t.statusName=data.statusName;
            t.token=data.token;
        }
        order_info_vue.order.status=16;
        order_info_vue.order.statusName='待商家确认';
        if(t.token!=true){
            warn('操作成功。但系统中没有商户授权信息，请提醒商户进入服务进行授权');
        }
    },function(msg){
        warn(msg.responseJSON.msg,msg.responseJSON.url);
    });
};
function cancel(id){
    var t=null;
    for(var i=0;i<page_vue.page.page_data.length;i++){
        if(page_vue.page.page_data[i].id==id){
            t=page_vue.page.page_data[i];
        }
    }
    reject_view.detailId=t.id;
    reject_view.reason=t.reason;
    $('#product_reject_reason').modal('show');
}
function confirm(id){
    post(_url_prefix+'/dashboard/order/detail/confirm/'+id,{},function(data){
        var t=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==id){
                t=page_vue.page.page_data[i];
            }
        }
        if(t!=null){
            t.status=data.status;
            t.statusName=data.statusName;
            t.token=data.token;
        }
        order_info_vue.order.status=20;
        order_info_vue.order.statusName='完成';
    },function(msg){
        warn(msg.responseJSON.msg,msg.responseJSON.url);
    });
}
function up(id){
    post(_url_prefix+'/dashboard/order/detail/up/'+id,{},function(data){
        var t=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==id){
                t=page_vue.page.page_data[i];
            }
        }
        if(t!=null){
            t.serviceStatus=data.serviceStatus;
            t.onlineTime=data.onlineTime;
            t.expireDate=data.expireDate;
            t.token=data.token;
        }
		page_vue.$nextTick(_upload_next);
    },function(msg){
        warn(msg.responseJSON.msg,msg.responseJSON.url);
    });
}
function down(id){
    post(_url_prefix+'/dashboard/order/detail/down/'+id,{},function(data){
        var t=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==id){
                t=page_vue.page.page_data[i];
            }
        }
        if(t!=null){
            t.serviceStatus=data.serviceStatus;
            t.onlineTime=data.onlineTime;
            t.expireDate=data.expireDate;
            t.token=data.token;
        }
		page_vue.$nextTick(_upload_next);
    },function(msg){
        warn(msg.responseJSON.msg,msg.responseJSON.url);
    });
}





