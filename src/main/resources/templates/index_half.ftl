<#include "layout.ftl"/><@adminLayout>
<style>
    .red-ball{
        display: block;
        border: 1px solid red;
        position: absolute;
    }
    .red-ball-index{
        float: left;
        position: relative;
        top: -20px;
        color: red;
    }
    .svg-ground{
        float: left;
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 100%;
    }
    .polyline-ground{
        fill:rgb(255,255,255,0);
    }
    img{
        transform: scale(${mul});
        transform-origin: 0 0;
        resize: auto;
    }
</style>
<div class="row" id="form_display" >
    <div class="col-sm-3 col-md-2 sidebar">
        <div class="form-group">
            <select id="camera_filter" required class="form-control" v-model="camera_filter">
                <option value="" selected class="hidden">选择探头</option>
                <option value="">全部探头</option>
                <option v-for="item in target_camera_list" v-bind:value="item">{{item}}</option>
            </select>
        </div>
        <div>
            <div class="input-group date form_date date-picker" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input id="timepicker_time_begin" class="form-control" size="16" type="text"  v-model="time_begin" value=""  placeholder="开始日期">
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <input type="hidden" value="" /><br/>
        </div>
        <div>
            <div class="input-group date form_date date-picker" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input id="timepicker_time_end" class="form-control" size="16" type="text" v-model="time_end" placeholder="结束日期">
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <input type="hidden"   value="" v-model="time_end"/><br/>
        </div>
        <div>
        <ul class="nav nav-sidebar">
            <li v-for="m in time_list " v-bind:class="{active:time_filter==m}"><a href="javascript:void(0);" onclick="timeSelect(this)">{{m}}</a></li>
        </ul>
        </div>
    </div>
    <div class="col-sm-9  col-md-10 ">
        <div class="form-horizontal col-sm-11  col-md-11 col-lg-11">
            <div class="form-group col-sm-2  col-md-2" style="padding:0px;" v-if="!district_filter">
                <select id="type_filter" required class="form-control col-sm-3  col-md-3" v-model="currentEventType">
                    <option value="" selected class="hidden">选择类型</option>
                    <option value="">全部类型</option>
                    <option  v-for="item in filter_list" v-bind:value="item">{{item}}</option>
                </select>
            </div>
            <#--<div class=" switch " >-->
            <#--</div>-->
            <div class="form-group col-sm-4  col-md-4" >
                <label  class="col-sm-4 control-label" for="userName">当前探头:</label>
                <div class="col-md-3">
                    <p class="form-control-static">{{detail.current_camera}}</p>
                </div>
            </div>
            <div class="form-group col-sm-4  col-md-4" >
                <label  class="col-sm-4 control-label" for="userName">当前时间:</label>
                <div class="col-md-6">
                    <p class="form-control-static">{{detail.current_time}}</p>
                </div>
            </div>
        </div>

        <div class="form-horizontal col-sm-11  col-md-11 col-lg-11">
            <input id="dis_check" type="checkbox" checked v-model="district_filter"/>
            <#--<div class=" switch " >-->
            <#--</div>-->
            <div class="form-group col-sm-4  col-md-4" >
                <label  class="col-sm-4 control-label" for="userName">宽度比例:</label>
                <div class="col-md-3">
                    <input type="text" v-model="width_percent">
                </div>
            </div>
            <div class="form-group col-sm-4  col-md-4" >
                <label  class="col-sm-4 control-label" for="userName">高度比例:</label>
                <div class="col-md-6">
                    <input type="text" v-model="height_percent">
                </div>
            </div>
        </div>
        <div class="form-horizontal col-sm-8 col-md-8">
            <div class="form-group" >
                <div class="col-md-8" style="padding:0px;">
                    <img v-bind:src="detail.imgUrl"/>
                    <span class="red-ball" v-for="(item, index)  in detail.events" v-bind:style="{left:item.event_position[0]+'px',top:item.event_position[1]+'px',width:item.event_position[2]+'px',height:item.event_position[3]+'px'}"><span class="red-ball-index">{{index+1}}</span></span>
                    <svg  class="svg-ground" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <polyline  class="polyline-ground" v-for="(item, index)  in interests.red" v-bind:points="item" style="stroke:red;stroke-width:3px"/>
                        <polyline  class="polyline-ground" v-for="(item, index)  in interests.blue" v-bind:points="item" style="stroke:blue;stroke-width:3px"/>
                    </svg>

                </div>
            </div>
        </div>
        <div class="form-horizontal col-sm-8 col-md-8" style="padding:0px;">
            <table class="table table-striped">
                <caption>事件信息</caption>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>识别度</th>
                    <th>位置</th>
                    <th>类型</th>
                </tr>
                <tr v-for="(item, index)  in detail.events"><td>{{index+1}}</td><td>{{item.event_confidence}}</td><td>{{item.event_position}}</td><td>{{item.event_type}}</td></tr>
                </thead>
            </table>
        </div>
    </div>
</div>

    <script>
        var mul=${mul};
    </script>

<script src="${request.contextPath}/static/js/render_half.js"></script>
<script src="${request.contextPath}/static/js/websocket.js"></script>
    <#--<script src="${request.contextPath}/assets/js/common/datetimepicker.js?2017090317"></script>-->

<script>

    $('.date-picker').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii',
        autoclose:true//自动关闭
    });
    $('.date-picker').datetimepicker()
    .on('hide',function(){
        var v=$('#timepicker_time_begin').val();
        if(v==null){
            v='';
        }
        camera_vue.time_begin=v;
        var v=$('#timepicker_time_end').val();
        if(v==null){
            v='';
        }
        camera_vue.time_end=v;
    })
</script>
</@adminLayout>