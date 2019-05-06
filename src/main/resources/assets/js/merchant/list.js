var search_vue=new Vue({
    el:'#search_condition',
    data:{
        merchantPid:null,
        name:null,
        phone:null,
    },
    methods:{
        search:function () {
            page_vue.loadData();
        },
    }
});

var page_vue=new Vue({
    el: '#data-table',
    data: {
        page:{
            page_headers:[
                {
                    "caption":"商户Pid",
                    "key":"merchantPid",
                },{
                    "caption":"名称",
                    "key":"name",
                },{
                    "caption":"联系人",
                    "key":"contactor",
                },{
                    "caption":"电话",
                    "key":"phone",
                }, {
                    "caption": "接收时间",
                    "key": "updateTime",
                },  {
                    "caption": "操作",
                    "type": "render",
                    "renderer":function(data){
                            return '<div class="btn-group" role="group">' +
                                '<button type="button" class="btn btn-default" onclick="detail('+data.id+')">查看</button>' +
                                '</div>';

                        }
                }
            ],
            page_data:[
            ],
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
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            })
        },
        getUrl:function (page,size) {
            var url=_url_prefix+'/dashboard/merchant/search?page='+page+'&size='+size;
            if(search_vue.name!=null&&search_vue.name!=''){
                url=url+'&merchantName='+search_vue.name;
            }
            if(search_vue.phone!=null&&search_vue.phone!=''){
                url=url+'&phone='+search_vue.phone;
            }
            if(search_vue.merchantPid!=null&&search_vue.merchantPid!=''){
                url=url+'&merchantPid='+search_vue.merchantPid;
            }
            return url;
        }
    }
});
page_vue.loadData(0);

var detail=function(id){
    window.open(_context_path+_servlet_path+'/dashboard/merchant/detailPage?id='+id);
};