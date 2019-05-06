var edit_vue=new Vue({
    el:'#form_edit',
    data:{
        merchant:{
            id:'',
            name:'',
            contactor:'',
            phone:null,
            updateTime:null,
        }
    },
    methods:{
        cancel:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/merchant/list';
        },
        load:function(id){
            var t=this;
            var url=_context_path+_servlet_path+'/dashboard/merchant/detail?id='+id
            get(url,{},function (data) {
                t.merchant=data;
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            })
        }
    }
});
edit_vue.load(_to_load_id);
