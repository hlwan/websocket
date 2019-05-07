$(document).ready(function () {
    // 页面加websocket
    websocketClient();

});
var sock;
function websocketClient() {

    var url = 'ws://' + window.location.host +"/demo"+"/websocket/222";
    sock = new WebSocket(url);

    // 打开连接，打开连接后的回调
    sock.onopen = function () {
        console.log("连接打开");

    };

    // 客户端发送消息给服务器，回调
    sock.onmessage = function(data)
    {
        console.info(data.data);
        if(data.data=='连接成功'){

        }else{
            putCameraData(data.data);

        }

    };

    sock.onclose = function() {
        console.info("close");
    };

}
// 测试客户端与服务器通讯
function sendMessage() {
    sock.send("test");
};