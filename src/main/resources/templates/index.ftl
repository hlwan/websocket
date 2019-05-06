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
</style>
<div class="row" id="form_display" >
    <div class="col-sm-3 col-md-2 sidebar">
        <div class="form-group">
            <select id="order_status" required class="form-control" v-model="camera_filter" onchange="valueChange()">
                <option value="" selected class="hidden">选择探头</option>
                <option value="">全部探头</option>
                <option  v-for="item in target_camera_list" value="{item}">{{item}}</option>
            </select>
        </div>
        <div>
            <div class="input-group date form_date date-picker" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="form-control" size="16" type="text"  onchange="camera_vue.time_begin=this.value;valueChange();" value=""  placeholder="开始日期">
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <input type="hidden" value="" /><br/>
        </div>
        <div>
            <div class="input-group date form_date date-picker" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                <input class="form-control" size="16" type="text" value="" onchange="camera_vue.time_end=this.value;valueChange();" v-model="time_end" placeholder="结束日期">
                <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
            </div>
            <input type="hidden"   value="" /><br/>
        </div>
        <div>
        <ul class="nav nav-sidebar">
            <li v-for="m in time_list " v-bind:class="{active:current_time==m}"><a href="javascript:void(0);" onclick="timeSelect(this)">{{m}}</a></li>
        </ul>
        </div>
    </div>
    <div class="col-sm-9  col-md-10 ">
        <div class="form-horizontal col-sm-8  col-md-8">
            <div class="form-group col-sm-5  col-md-5" style="padding:0px;">
                <select id="order_status" required class="form-control col-sm-3  col-md-3"  v-model="currentEventType">
                    <option value="" selected class="hidden">选择类型</option>
                    <option value="">全部类型</option>
                    <option  v-for="item in filter_list" value="{item}">{{item}}</option>
                </select>
            </div>
        </div>
        <div class="form-horizontal col-sm-8 col-md-8">
            <div class="form-group" >
                <div class="col-md-8" style="padding:0px;">
                    <img v-bind:src="detail.imgUrl"/>
                    <span class="red-ball" v-for="(item, index)  in detail.events" v-bind:style="{left:item.event_position[0]+'px',top:item.event_position[1]+'px',width:item.event_position[2]+'px',height:item.event_position[3]+'px'}"><span class="red-ball-index">{{index+1}}</span></span>
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



<script src="${request.contextPath}/static/js/render.js"></script>
<script src="${request.contextPath}/static/js/websocket.js"></script>
    <script src="${request.contextPath}/assets/js/common/datetimepicker.js?2017090317"></script>

<script>
    $('.date-picker').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii'
    });
</script>
</@adminLayout>