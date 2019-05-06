package com.personal.hlwan.websocket.controller;

import com.personal.hlwan.websocket.server.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private WebSocketServer webSocketServer;

    @GetMapping("/index")
    public String index(){
        return "index";
    }

    @GetMapping("sendMessage")
    @ResponseBody
    public String sendMessage(String message){
        webSocketServer.sendAll(message);
        return message;
    }

}
