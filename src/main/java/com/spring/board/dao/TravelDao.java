package com.spring.board.dao;

import java.util.List;

import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

public interface TravelDao {
	
	public abstract Integer insertRequestUser(UserVo userVo) throws Exception;
	
	public abstract List<UserVo> selectRequestUseerList() throws Exception;
	
	public abstract Integer mergeTravelPlan(TravelVo travelVo) throws Exception;
	
	public abstract List<TravelVo> selectUserDetailTravelPlans(TravelVo travelVo) throws Exception;

	public abstract Integer totalTravelRowNum() throws Exception;
	
	public abstract Integer deleteUserDetailPlans(String[] traveSeqs) throws Exception;

	public abstract UserVo selectUserDetail(UserVo userVo) throws Exception;

	public abstract Integer updateRequest(TravelVo travelVo) throws Exception;

	public abstract Integer validateDetailPlan(TravelVo travelVo) throws Exception;
}
