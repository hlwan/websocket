var camera_data={

};

var latest_camera='';

var camera_vue=new Vue({
    el:"#form_display",
    data:{
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
        current_time:'',
        time_begin:'',
        time_end:'',
        time_list:[],
        currentEventType:'',
        filter_list:[],
    },
    // watch:{
    //     camera_filter:function(data){
    //         this.draw();
    //
    //     },
    //     current_time:function(){
    //         this.draw();
    //     },
    //     time_begin:function(data){
    //         if(this.time_end!='' &&this.time_end<data){
    //
    //         }
    //
    //     }
    // },
    methods:{
        addCamera:function(a){
            this.target_camera_list.push(a);
        },

        draw:function(){
            //如果没有选中的探头，取最新数据的探头设置为detail.current_camera
            console.log(this.detail);
            console.log(this.camera_filter);
            console.log(this.current_time);
            console.log(this.time_begin);
            console.log(this.time_end);
            console.log(this.currentEventType);

            var _camera='';
            if(this.camera_filter==''){
                _camera=latest_camera;
            }
            var cameraChange=false;
            if(this.detail.current_camera!=_camera){
                cameraChange=true;
                //this.detail.current_camera=_camera;

            }
            //探头变化 或者时间条件变化 ，清空列表重新初始化
            var flag=false;
            if(cameraChange|| this.time_begin!=this.detail.current_begin||this.time_end!=this.detail.time_end){
                //清空时间列表
                //清空type 待选择列表
                while(this.time_list.length>0){
                    this.time_list.pop();
                }
                while(this.filter_list.length>0){
                    this.filter_list.pop();
                }
                this.currentEventType='';
                flag=true;
            }
            //时间 如果没有选择时间  current_time为''，最time_list中第一条数据，设置为detail.current_time
            var targetCamera=camera_data[_camera];
            if(targetCamera==null){
                return ;
            }
            var times=targetCamera.ts;
            if(times==null||times.length==0){
                return ;
            }
            //是否需要添加新的时间至列表
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
                            for(var k=0;k<this.filter_list.length;i++){
                                if(this.filter_list[k]==time_data.events[m]){
                                    t_t=true;
                                    break;
                                }
                            }
                            if(!t_t){
                                this.filter_list.push(time_data.events[m]);
                            }
                        }

                    }


                }
            }
            var _time='';
            if(this.current_time!=''){
                _time=this.current_time;
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
                    this.detail.events.push(target_data.events[n]);
                }
                $('.red-ball').css('border-width','1px');

            }
            //
        },


    }
});

function valueChange(){
    camera_vue.draw();
}

function timeSelect(obj){
    camera_vue.current_time=$(obj).innerHTML;
    camera_vue.draw();
}

function putCameraData(data){
    console.log(data);
    var d=eval(data);
    console.log(d);
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
    _target_camera.ts.shift(analyzeTime);
    //有效的数据
    timeList[analyzeTime]=d;
    camera_vue.draw();
}
