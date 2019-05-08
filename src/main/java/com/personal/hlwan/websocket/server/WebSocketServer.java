package com.personal.hlwan.websocket.server;

import com.personal.hlwan.websocket.ApplicationContextHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/websocket/{sid}")
@Component
public class WebSocketServer {

    private static Logger logger= LoggerFactory.getLogger(WebSocketServer.class);
    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    private static ConcurrentHashMap<String,Session> webSocketMap = new ConcurrentHashMap<>();

    private AnalyseService analyseService;

    public void sendAll(String message){
        webSocketMap.forEach((k,v)->{
            try{
                v.getBasicRemote().sendText(message);
            }catch (Exception e){
                logger.error("发送消息异常",e);
            }
        });
    }

    /**
     * 连接建立成功调用的方法*/
    @OnOpen
    public void onOpen(Session session,@PathParam("sid") String sid) {
        if(analyseService==null){
            analyseService= ApplicationContextHelper.getBean(AnalyseService.class);
        }
        webSocketMap.put(session.getId(),session);
        logger.info("有新窗口开始监听:"+sid+",当前在线人数为" + getOnlineCount());
        try {
            sendMessage(session,"连接成功");
            List<String> messages=analyseService.getByTime(null,null);
            if(!CollectionUtils.isEmpty(messages)){
                for(String msg:messages){
                    sendMessage(session,msg);
                }
            }
        } catch (IOException e) {
            logger.error("websocket IO异常");
        }
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(Session session) {
        webSocketMap.remove(session.getId());  //从set中删除
        logger.info("有一连接关闭！当前在线人数为" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息*/
    @OnMessage
    public void onMessage(String message, Session session) {
        logger.info("收到来自窗口{}的信息:{}",session.getId(),message);
    }

    /**
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        logger.error("发生错误",error);
        error.printStackTrace();
    }
    /**
     * 实现服务器主动推送
     */
    public void sendMessage(Session session,String message) throws IOException {
        session.getBasicRemote().sendText(message);
    }


    public static synchronized int getOnlineCount() {
        return webSocketMap.size();
    }


}
