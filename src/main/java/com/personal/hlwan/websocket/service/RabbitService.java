package com.personal.hlwan.websocket.service;

import com.personal.hlwan.websocket.server.AnalyseService;
import com.personal.hlwan.websocket.server.WebSocketServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitService {

    private static Logger logger= LoggerFactory.getLogger(RabbitService.class);

    @Autowired
    private AnalyseService analyseService;

    @Autowired
    private WebSocketServer webSocketServer;

    @RabbitListener(bindings = @QueueBinding(exchange = @Exchange(value="amq.direct",type= ExchangeTypes.TOPIC,durable="true"),key = "SPFXJG",value = @Queue(value="SPFXJG",durable="false",autoDelete="false")))    //监听器监听指定的Queue
    public void received(String message){
        logger.info("received message:{}",message);
        analyseService.save(message);
        webSocketServer.sendAll(message);
    }


}
