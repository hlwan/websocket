var camera_data={

};

var latest_camera='';

var current_vue=new Vue({
    el:"#current_nav",
    data:{
        current:'history'
    }


});

var camera_vue=new Vue({
    el:"#form_display",
    data:{
        drawing:false,
        detail:{
            imgUrl: '',
            events: [],
            current_camera:'',
            current_time:'',
            current_type:'',
            current_info:'',
            current_begin:'',
            current_end:''
        },
        camera_filter:'',
        target_camera_list:[],
        time_filter:'',
        time_begin:'',
        time_end:'',
        time_list:[],
        currentEventType:'',
        filter_list:[],
    },
    watch:{
        camera_filter:function(){
            this.draw();

        },
        time_filter:function(){
            this.draw();
        },
        time_end:function(){
            //this.draw();
        },
        time_begin:function(){
            //this.draw();
        },
        currentEventType:function () {
            this.draw();
        }
    },
    methods:{
        clear:function(){
            this.drawing=true;
            this.camera_filter='';
            while(this.target_camera_list.length>0){
                this.target_camera_list.pop();
            }
            this.time_filter='';
            while(this.time_list.length>0){
                this.time_list.pop();
            }
            this.currentEventType='';
            while(this.filter_list.length>0){
                this.filter_list.pop();
            }
            this.detail.imgUrl='';
            while(this.detail.events.length>0){
                this.detail.events.pop();
            }
            this.detail.current_camera='';
            this.detail.current_time='';
            this.detail.current_type='';
            this.detail.current_info='';
            this.detail.current_begin='';
            this.detail.current_end='';
            this.drawing=false;
        },
        search:function(){
            get('/demo/query?begin='+this.time_begin+'&end='+this.time_end,'',function(data){
                camera_vue.clear();
                camera_data={};
                for(var i=0;i<data.length;i++){
                    putCameraData(data[i]);
                }
                camera_vue.draw();

            },function () {
                
            })
        },
        addCamera:function(a){
            this.target_camera_list.push(a);
        },

        draw:function(){
            if(this.drawing){
                return ;
            }
            this.drawing=true;
            //如果没有选中的探头，取最新数据的探头设置为detail.current_camera
            // console.log(this.detail);
            // console.log(this.camera_filter);
            // console.log(this.time_filter);
            // console.log(this.time_begin);
            // console.log(this.time_end);
            // console.log(this.currentEventType);
            var _camera='';
            if(this.camera_filter==''){
                _camera=latest_camera;
            }else{
                _camera=this.camera_filter;
            }

            var cameraChange=false;
            if(this.detail.current_camera!=_camera){
                cameraChange=true;
                //this.detail.current_camera=_camera;

            }
            //探头变化 或者时间条件变化 ，清空列表重新初始化
            var flag=false;
            if(cameraChange|| this.time_begin!=this.detail.current_begin||this.time_end!=this.detail.current_end){
                //清空时间列表
                //清空type 待选择列表
                while(this.time_list.length>0){
                    this.time_list.pop();
                }
                while(this.filter_list.length>0){
                    this.filter_list.pop();
                }
                //this.currentEventType='';
                this.time_filter='';
                flag=true;
            }
            //时间 如果没有选择时间  current_time为''，最time_list中第一条数据，设置为detail.current_time
            var targetCamera=camera_data[_camera];
            // console.log(targetCamera);
            if(targetCamera==null){
                return ;
            }
            var times=targetCamera.ts;
            if(times==null||times.length==0){
                return ;
            }
            //是否需要添加新的时间至列表
            // console.log('否需要添加新的时间至列表');
            // console.log(times);
            for(var i=times.length-1;i>=0;i--){
                var _t=times[i];
                var seek=false;
                if(this.time_begin!='' &&_t<this.time_begin){
                    seek=true;
                }
                if(this.time_end!='' && _t>this.time_end){
                    seek=true;
                }
                if(!seek){
                    for(var j=0;j<this.time_list.length;j++){
                        if(_t==this.time_list[j]){
                            seek=true;
                            break;
                        }
                    }
                }
                if(!seek){
                    this.time_list.unshift(_t);
                    //处理事件待选择列表
                    var time_data=targetCamera.times[_t];
                    if(time_data.events.length>0){
                        for(var m=0;m<time_data.events.length;m++){
                            var t_t=false;
                            for(var k=0;k<this.filter_list.length;k++){
                                if(this.filter_list[k]==time_data.events[m].event_type){
                                    t_t=true;
                                    break;
                                }
                            }
                            if(!t_t){
                                this.filter_list.push(time_data.events[m].event_type);
                            }

                        }

                    }
                }else{
                }
            }
            var _time='';
            if(this.time_filter!=''){
                _time=this.time_filter;
            }else{
                _time=this.time_list[0];
            }
            var _filter_type=this.currentEventType;
            if(!flag && _time==this.detail.current_time&&_filter_type==this.detail.current_type){
                //不需要重置

            }else{
                //加载url  event(条件过滤)detail中
                //重新绘制
                this.detail.current_camera=_camera;
                this.detail.current_time=_time;
                this.detail.current_type=_filter_type;
                this.detail.current_begin=this.time_begin;
                this.detail.current_end=this.time_end;
                $('.red-ball').css('border-width','0px');
                while(this.detail.events.length>0){
                    this.detail.events.pop();
                }
                var target_data=targetCamera.times[_time];
                this.detail.imgUrl=target_data.image_url;
                for(var n=0;n<target_data.events.length;n++){
                    if(this.detail.current_type==''||this.detail.current_type==target_data.events[n].event_type){
                        this.detail.events.push(target_data.events[n]);
                    }
                }
                $('.red-ball').css('border-width','1px');

            }
            //
            this.drawing=false;
        },


    }
});


function timeSelect(obj){
    camera_vue.time_filter=$(obj).html();
}

function putCameraData(data){
    var d=eval("("+data+")");
    if(d.events.length==0){
        return ;
    }
    for(var i=0;i<d.events.length;i++){
        d.events[i].event_position=d.events[i].event_position.split(',');
    }

    var analyzeTime=d.analyze_time;
    var camera=d.camera_id;
    var _target_camera=camera_data[camera];
    if(_target_camera!=null){
        if(_target_camera.times[analyzeTime]!=null){
            return ;
        }
    }
    if(_target_camera==null){
        _target_camera={
            'times':{},//时间相关的数据
            'ts':[]//时间列表
        };
        camera_data[camera]=_target_camera;
        camera_vue.addCamera(camera);
        latest_camera=camera;
    }
    var timeList=_target_camera.times;
    _target_camera.ts.unshift(analyzeTime);
    //有效的数据
    timeList[analyzeTime]=d;
}
