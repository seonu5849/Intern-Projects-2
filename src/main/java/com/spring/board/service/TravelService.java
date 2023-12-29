package com.spring.board.service;

import java.util.List;

import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

public interface TravelService {

	public abstract Integer submitQuoteRequest(UserVo userVo);
	
	public abstract List<UserVo> findAllRequestUser();
	
	public abstract Integer submitTravelPlans(List<TravelVo> planList);
	
}
