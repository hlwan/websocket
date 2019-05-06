var edit_vue=new Vue({
    el:'#form_edit',
    data:{
        emp:{
            id:null,
            name:'',
            userName:'',
            phone:null,
            email:null,
            gender:1,

            type:0
        }
    },
    methods:{
        cancel:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/user/list';
        },
        load:function(id){
            var t=this;
            var url=_context_path+_servlet_path+'/dashboard/user/detail?id='+id
            get(url,{},function (data) {
                t.emp=data;
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            })
        }
    }
});
edit_vue.load(_to_load_id);
