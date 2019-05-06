/**
 *  table组件使用说明
 *  在avalon 的VM 中声明如下对象
 *  表格的字段顺序和page_header声明的顺序保持一致
 *  page_header : [
 *            {
 *               'name' : '表字段名称',
 *               'key' : '字段属性名称',
 *               'type' : 'text|image|radio|render',  #目前支持4种类型控件,render时，名称与renderer 相对应的作为渲染时调用的方法名称与具体的方法
 *               'width': '60px',     # 当type为image时,width和height需要设置
 *               'height': '60px'     # 当type为image时,width和height需要设置
 *            }
 *                 ]
 */

function heredoc(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
            replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}

Vue.component('vue-table', {
    methods:{
        unescape:function (html) {
            console.log(html);
            html=html
                .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "\'");
            console.log(html);
            return html;
        }
    },
    props: ['page'],
    template: heredoc(function () {
        /*
        <div>
          <table class="table table-striped table-hover table-bordered" :style="page.style">
              <thead class="full-width" >
                <tr>
                    <th v-for = "head in page.page_headers" :style="head.style">{{head.caption}}</th>
                   </tr>
              </thead>
              <tbody>
                     <tr v-if="page.page_data.length<=0">
                            <td class="center aligned" :colspan="page.page_headers.length">没有数据</td>
                    </tr>
                    <tr v-else v-for="data in page.page_data">
                         <td v-for = "head in page.page_headers" :style="head.style">
                            <span v-if="head.type&&head.renderer&&head.type=='render'" v-html="head.renderer(data)"></span>
                            <span v-else>{{head.type&&head.renderer&&head.type=='render'?head.renderer(data):data[head.key]}}</span>
                        </td>
                    </tr>
              </tbody>
           </table>
           <div>
                    <ul class="pagination" style="margin-top:8px;">
                         <li>
                            <a href="javascript:void(0)" aria-label="Previous">
                                <span aria-hidden="true">共{{page.page_info.totalPages}}页  {{page.page_info.totalElements}}条记录</span>
                            </a>
                        </li>
                     </ul >
                     <ul class="pagination next" style="margin-top:8px;">
                        <li v-if="page.page_info.number>2" v-on:click="page.dataAtPage(0)">
                          <a href="javascript:void(0)" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                        <li v-if="page.page_info.number-2>=0" v-on:click="page.dataAtPage(page.page_info.number-2)">
                            <a href="javascript:void(0)">{{page.page_info.number-1}}</a>
                        </li>
                         <li v-if="page.page_info.number-1>=0" v-on:click="page.dataAtPage(page.page_info.number-1)">
                            <a href="javascript:void(0)">{{page.page_info.number}}</a>
                        </li>
                        <li class="active">
                            <a href="javascript:void(0)">{{page.page_info.number+1}}</a>
                        </li>
                        <li  v-if="page.page_info.number+1<page.page_info.totalPages" v-on:click="page.dataAtPage(page.page_info.number+1)">
                            <a href="javascript:void(0)">{{page.page_info.number+2}}</a>
                        </li>
                        <li  v-if="page.page_info.number+2<page.page_info.totalPages" v-on:click="page.dataAtPage(page.page_info.number+2)">
                            <a href="javascript:void(0)">{{page.page_info.number+3}}</a>
                        </li>
                         <li>
                          <a href="javascript:void(0);" v-if="page.page_info.totalPages>5" v-on:click="page.dataAtPage(page.page_info.totalPages-1)" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                          </a>
                        </li>
                      </ul>
             </div>
             </div>
        */
    })
});

