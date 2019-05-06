var menu_vue=new Vue({
    el: '#left_menu',
    data: {
        menus:[
            {
                caption: '订单管理',
                key:'order',
                url:_context_path+'/dashboard/order/list'
            },{
                caption: '商户管理',
                key:'merchant',
                url:_context_path+'/dashboard/merchant/list'
            },{
                caption: '用户管理',
                key:'user',
                url:_context_path+'/dashboard/user/list'
            }
        ],
        current:_current_menu
    },
    methods:{

    }
});
