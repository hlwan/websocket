var search_vue=new Vue({
    el:'#search_condition',
    data:{
        orderNo:null,
        name:null,
        status:'',
        start:'',
        end:''
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
                    "caption":"订单编号",
                    "key":"orderNo",
                },{
                    "caption":"商户名称",
                    "key":"merchantName",
                },{
                    "caption":"订购门店数",
                    "key":"num",
                },{
                    "caption":"订购时间",
                    "key":"orderTime",
                },{
                    "caption":"价格",
                    "key":"totalPrice",
                },{
                    "caption":"订购服务",
                    "key":"title",
                },{
                    "caption":"订单状态",
                    "key":"statusName",
                },{
                    "caption":'操作',
                    'type':'render',
                    'renderer':function(data){
                        return '<input name="file" data-param="'+data.id+'" type="file" class="file-loading" data-preview-file-type="text">';
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
                t.$nextTick(function () {
                    var fileT=$("input[type=file]");
                    for(var i=0;i<fileT.length;i++){
                        var id=$(fileT[i]).attr('data-param');
                        $(fileT[i]).fileinput({
                            language: 'zh',
                            uploadUrl:_url_prefix+'/dashboard/order/upload/'+id,
                            showCaption: false,
                            showUpload:false, //是否显示上传按钮
                            showRemove :false, //显示移除按钮
                            showPreview :false, //是否显示预览
                            showClose:false,
                            showBrowse:true,
                            maxFileCount:1,
                            uploadAsync:true,
                            showCancel:false,
                            browseClass:"btn btn-default"
                        }).on("filebatchselected", function(event, files) {
                            $(this).fileinput("upload");
                        }).on("fileuploaded", function(event, data) {
                                if(data.response)
                                {
                                    console.log('处理成功');
                                }
                        }).parents('td').find('.progress').parent().remove();
                        ;
                    }
                })
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        getUrl:function (page,size) {
            var url=_url_prefix+'/dashboard/order/search?page='+page+'&size='+size;
            if(search_vue.name!=null&&search_vue.name!=''){
                url=url+'&merchant.name='+search_vue.name;
            }
            if(search_vue.orderNo!=null&&search_vue.orderNo!=''){
                url=url+'&orderNo='+search_vue.orderNo;
            }
            if(search_vue.status!=null&&search_vue.status!=''){
                url=url+'&status='+search_vue.status;
            }
            if(search_vue.start!=null&&search_vue.start!=''){
                url=url+'&start='+search_vue.start;
            }
            if(search_vue.end!=null&&search_vue.end!=''){
                url=url+'&end='+search_vue.end;
            }
            return url;
        }
    }
});
page_vue.loadData(0);