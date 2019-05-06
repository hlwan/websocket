new Vue({
    el:'#form_add',
    data:{
        name:'',
        userName:'',
        password:'111111',
        phone:null,
        email:null,
        gender:1,
        type:0
    },
    methods:{
        submit:function () {
            var url=_context_path+_servlet_path+'/dashboard/user/add';
            post(url,JSON.stringify(this._data),function(){
                window.location.href=_context_path+_servlet_path+'/dashboard/user/list';
            },function(msg){
                warn(msg.responseJSON.msg,msg.responseJSON.url);
            });
        },
        cancel:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/user/list';
        }
    }
});