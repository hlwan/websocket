package com.personal.hlwan.websocket.controller;

import com.personal.hlwan.websocket.model.Analyse;
import com.personal.hlwan.websocket.server.AnalyseService;
import com.personal.hlwan.websocket.server.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private WebSocketServer webSocketServer;

    @Autowired
    private AnalyseService analyseService;

    @GetMapping("/index")
    public String index(Model model,Double mul){
        if(mul==null){
            mul=1D;
        }
        model.addAttribute("name","实时监控");
        model.addAttribute("title","实时监控");
        model.addAttribute("mul",mul);
        return "index";
    }

    @GetMapping("/index_half")
    public String indexHalf(Model model,Double mul){
        model.addAttribute("name","实时监控");
        model.addAttribute("title","实时监控");
        if(mul==null){
            mul=1D;
        }
        model.addAttribute("mul",mul);
        return "index_half";
    }

    @GetMapping("/data_history")
    public String dataHistory(Model model,Double mul){
        model.addAttribute("name","历史查询");
        model.addAttribute("title","历史查询");
        if(mul==null){
            mul=1D;
        }
        model.addAttribute("mul",mul);
        return "history";
    }

    @GetMapping("/data_history_half")
    public String dataHistoryHalf(Model model,Double mul){
        model.addAttribute("name","历史查询");
        model.addAttribute("title","历史查询");
        if(mul==null){
            mul=1D;
        }
        model.addAttribute("mul",mul);
        return "history_half";
    }

    @GetMapping("/data_filter")
    public String dataFilter(Model model){
        model.addAttribute("name","区域过滤查询");
        model.addAttribute("title","区域过滤查询");
        return "history_filter";
    }

    @GetMapping("sendMessage")
    @ResponseBody
    public String sendMessage(String message){
        webSocketServer.sendAll(message);
        return message;
    }

    @GetMapping("query")
    @ResponseBody
    public List<String> sendMessage(String begin, String end){
        return analyseService.getByTime(begin, end);
    }
    @PostMapping("sendMessage")
    @ResponseBody
    public Analyse send(@RequestBody String message){
        webSocketServer.sendAll(message);
        return analyseService.save(message);
    }



}
