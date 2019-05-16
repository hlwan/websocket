package com.personal.hlwan.websocket.repository;

import com.personal.hlwan.websocket.model.Analyse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalyseRepository extends JpaRepository<Analyse,String> {

    @Query("select content from Analyse where analyseTime>=:begin order by analyseTime")
    List<String> selectByBeginTime(@Param("begin") String begin);

    @Query("select content from Analyse where analyseTime>=:begin and analyseTime<=:end order by analyseTime")
    List<String> selectByBeginAndEndTime(@Param("begin") String begin,@Param("end") String end);

    @Query("select content from Analyse order by analyseTime desc")
    List<String> selectLatest(Pageable pageable);
}
