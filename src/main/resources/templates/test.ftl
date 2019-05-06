<#include "layout.ftl"/><@adminLayout>
<h1 class="page-header">订单管理</h1>
<div class="row placeholders">

</div>
<div class="table-responsive" id="data-table">
    <vue-table v-bind:page="page" ></vue-table>
</div>
<script src="${request.contextPath}/assets/js/order/list.js"></script>
</@adminLayout>