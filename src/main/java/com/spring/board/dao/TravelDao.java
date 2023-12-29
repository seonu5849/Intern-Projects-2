package com.spring.board.dao;

import java.util.List;

import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

public interface TravelDao {
	
	public abstract Integer insertRequestUser(UserVo userVo) throws Exception;
	
	public abstract List<UserVo> selectRequestUseerList() throws Exception;
	
	public abstract Integer insertTravelPlan(TravelVo travelVo) throws Exception;

}
