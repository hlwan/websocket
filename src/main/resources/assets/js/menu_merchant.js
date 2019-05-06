var menu_vue=new Vue({
    el: '#left_menu',
    data: {
        menus:[
            {
                caption: '订单管理',
                key:'order',
                url:_context_path+'/dashboard/order/list'
            }
        ],
        current:_current_menu
    },
    methods:{

    }
});
