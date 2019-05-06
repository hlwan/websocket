var password_vue=new Vue({
    el:'#new_password',
    data:{
        id:null,
        password:'',
        confirmPassword:''
    },
    methods:{
        savePassword:function () {
            if(this.password==''){
                warn('新密码不可为空');
                return;
            }
            if(this.password!=this.confirmPassword){
                warn('前后两次输入不一致');
                return;
            }
            var t=this;
            var url=_context_path+_servlet_path+'/dashboard/user/reset?id='+this.id+'&password='+this.password+'&confirmPassword='+this.confirmPassword;
            post(url,{},function(){
                $('#new_password').modal('hide');
                t.id=null;
                t.password='';
                t.confirmPassword='';
            },function (msg) {
                warn(msg.responseJSON.msg,msg.responseJSON.url);

            });
        }
    }
});
var search_vue=new Vue({
    el:'#search_condition',
    data:{
        username:'',
        name:'',
        current_user:_current_user
    },
    methods:{
        search:function () {
            page_vue.loadData();
        },
        add:function () {
            window.location.href=_context_path+_servlet_path+'/dashboard/user/addForm';
        }
    }
});

var page_vue=new Vue({
    el: '#data-table',
    data: {
        page:{
            page_headers:[
                {
                    "caption":"用户名",
                    "key":"userName",
                },{
                    "caption":"姓名",
                    "key":"name",
                },{
                    "caption":"性别",
                    "key":"genderName",
                },{
                    "caption":"手机",
                    "key":"phone",
                }, {
                    "caption": "邮箱",
                    "key": "email",
                }, {
                    "caption": "状态",
                    "key": "statusName",
                }, {
                    "caption": "类型",
                    "key": "typeName",
                }, {
                    "caption": "操作",
                    "type": "render",
                    "renderer":function(data){
                        if(_current_user.isAdmin){
                            var h='<div class="btn-group" role="group"><button type="button" class="btn btn-default" onclick="reset('+data.id+')">重置密码</button>';
                            if(data.type==0){
                                if(data.status==1){
                                    h=h+'<button type="button" class="btn btn-default" onclick="disable('+data.id+')">禁用</button>';
                                }else{
                                    h=h+'<button type="button" class="btn btn-default" onclick="enable('+data.id+')">启用</button>';
                                }
                            }
                            h=h+'<button type="button" class="btn btn-default" onclick="edit('+data.id+')">修改</button>' +
                                '<button type="button" class="btn btn-default" onclick="detail('+data.id+')">查看</button></div>' ;
                            return h;
                        }else{
                            if(_current_user.id==data.id){
                                return '<div class="btn-group" role="group"><button type="button" class="btn btn-default" onclick="edit('+data.id+')">修改</button>' +
                                    '<button type="button" class="btn btn-default" onclick="detail('+data.id+')">查看</button></div>' ;
                            }
                            return '';

                        }
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
            var url=_context_path+_servlet_path+'/dashboard/user/search?page='+page+'&size='+size;
            if(search_vue.name!=''){
                url=url+'&empName='+search_vue.name;
            }
            if(search_vue.username!=''){
                url=url+'&userName='+search_vue.username;
            }
            return url;
        }
    }
});
page_vue.loadData(0);

var edit=function(id){
    window.location.href=_context_path+_servlet_path+'/dashboard/user/editForm?id='+id;
};
var disable=function(id){
    var url=_context_path+_servlet_path+'/dashboard/user/disable?id='+id;
    post(url,{},function (data) {
        var target=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==id){
                target=page_vue.page.page_data[i];
            }
        }
        if(target!=null){
            target.status=data.status;
            target.statusName=data.statusName;
        }
    },function (msg) {
        warn(msg.responseJSON.msg,msg.responseJSON.url);
    })
};
var enable=function(id){
    var url=_context_path+_servlet_path+'/dashboard/user/enable?id='+id;
    post(url,{},function (data) {
        var target=null;
        for(var i=0;i<page_vue.page.page_data.length;i++){
            if(page_vue.page.page_data[i].id==id){
                target=page_vue.page.page_data[i];
            }
        }
        if(target!=null){
            target.status=data.status;
            target.statusName=data.statusName;
        }
    },function (msg) {
        warn(msg.responseJSON.msg,msg.responseJSON.url);
    })
};
var detail=function(id){
    window.open(_context_path+_servlet_path+'/dashboard/user/detailPage?id='+id);
};
var reset=function(id){
    password_vue.id=id;
    password_vue.password='';
    password_vue.confirmPassword='';
    $('#new_password').modal('show');
}