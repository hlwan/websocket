var edit_vue=new Vue({
    el:'#form_edit',
    data:{
        order:{
            id:'',
            merchantName:'',
            orderNo:'',
            num:'',
            orderTime:'',
            totalPrice:'',
            title:'',
            reason:'',
            status:'',
            statusName:'',
            updateTime:null,
        }
    },
    methods:{
        cancel:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/order/list';
        },
        load:function(id){
            var t=this;
            var url=_context_path+_servlet_path+'/dashboard/order/detail/'+id
            get(url,{},function (data) {
                t.order=data;
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            })
        }
    }
});
edit_vue.load(_to_load_id);
