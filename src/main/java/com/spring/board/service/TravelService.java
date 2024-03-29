package com.spring.board.service;

import java.util.List;

import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

public interface TravelService {

	public abstract Integer submitQuoteRequest(UserVo userVo);
	
	public abstract List<UserVo> findAllRequestUser();
	
	public abstract Integer submitTravelPlans(List<TravelVo> planList);
	
	public abstract List<TravelVo> findUserDetailTravelPlans(TravelVo travelVo);
	
	public abstract Integer totalTravelRowNum();
	
	public abstract Integer deleteUserDetailPlans(String[] traveSeqs);
	
	public abstract UserVo findUserDetail(UserVo userVo);
	
	public abstract Integer planEditRequest(String[] travelSeqs, String userSeq);
	
	public abstract Integer validateEditRequest(UserVo userVo);
}
