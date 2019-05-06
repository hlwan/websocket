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
        submit:function () {
            var url=_context_path+_servlet_path+'/dashboard/user/edit';
            post(url,JSON.stringify(this.emp),function(){
                window.location.href=_context_path+_servlet_path+'/dashboard/user/list';
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        cancel:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/user/list';
        },
        load:function(id){
            var t=this;
            var url=_context_path+_servlet_path+'/dashboard/user/detail?id='+id
            get(url,{},function (data) {
                for(var p in t.emp){
                    t.emp[p]=data[p];
                }
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            })
        }
    }
});
edit_vue.load(_to_load_id);
