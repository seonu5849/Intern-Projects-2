package com.spring.board.service;

import com.spring.board.vo.UserVo;

public interface TransportSurchargeService {

	public abstract Integer transportSurchargeCalculator(UserVo userVo) throws Exception;
	
	public abstract Integer surchargeTaxi(int traveTime, int transTime) throws Exception;
	
	public abstract Integer surchargeBus(int transTime) throws Exception;
	
	public abstract Integer surchargeSubway(int transTime) throws Exception;
	
	public abstract Integer surchargeRentCar(int transTime, int period) throws Exception;
	
}
