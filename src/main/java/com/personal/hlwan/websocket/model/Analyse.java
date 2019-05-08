package com.personal.hlwan.websocket.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "camera_analyse")
public class Analyse implements Serializable {

    @Id
    private String id;

    @Column(name="camera")
    private String camera;

    @Column(name = "analyse_time")
    private String analyseTime;

    @Column(name="content")
    private String content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCamera() {
        return camera;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getAnalyseTime() {
        return analyseTime;
    }

    public void setAnalyseTime(String analyseTime) {
        this.analyseTime = analyseTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
