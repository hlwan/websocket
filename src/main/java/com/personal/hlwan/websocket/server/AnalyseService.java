package com.personal.hlwan.websocket.server;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.personal.hlwan.websocket.model.Analyse;
import com.personal.hlwan.websocket.repository.AnalyseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class AnalyseService {

    @Autowired
    private AnalyseRepository analyseRepository;

    public List<String> getByTime(String begin,String end){
        if(StringUtils.isEmpty(begin)&&StringUtils.isEmpty(end)){
            return analyseRepository.selectLatest(new PageRequest(0,100));
        }
        if(StringUtils.isEmpty(end)){
            return analyseRepository.selectByBeginTime(begin);
        }
        return analyseRepository.selectByBeginAndEndTime(begin,end);
    }

    @Transactional
    public Analyse save(String content){
        JSONObject json=JSON.parseObject(content);
        String time=json.getString("analyze_time");
        String camera=json.getString("camera_id");
        Analyse analyse=new Analyse();
        analyse.setId(time+"_"+camera);
        analyse.setAnalyseTime(time);
        analyse.setCamera(camera);
        analyse.setContent(content);
        return analyseRepository.save(analyse);
    }
}
