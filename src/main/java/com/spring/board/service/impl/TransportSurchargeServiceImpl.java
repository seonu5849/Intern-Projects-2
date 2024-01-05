package com.spring.board.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dao.TravelDao;
import com.spring.board.service.TransportSurchargeService;
import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

@Service
public class TransportSurchargeServiceImpl implements TransportSurchargeService{

	private final TravelDao travelDao;
	
	@Autowired
	public TransportSurchargeServiceImpl(TravelDao travelDao) {
		this.travelDao = travelDao;
	}
	
	@Override
	public Integer transportSurchargeCalculator(UserVo userVo) throws Exception {
		int result = 0;
		TravelVo travelVo = new TravelVo();
		travelVo.setUserSeq(userVo.getSeq());
		
		List<TravelVo> findUserDetailPlans = this.travelDao.selectUserDetailTravelPlans(travelVo);
		for(TravelVo plan : findUserDetailPlans) {
			int traveTime = Integer.parseInt(plan.getTraveTime().split(":")[0]);
			int transTime = Integer.parseInt(plan.getTransTime().replace("분",""));
			result += Integer.parseInt(plan.getUseExpend());
			
			switch(plan.getTraveTrans()) {
				case "B":{
					result += surchargeBus(transTime);
					break;
				}
				case "S":{
					result += surchargeSubway(transTime);
					break;
				}
				case "T":{
					result += surchargeTaxi(traveTime, transTime);
					break;
				}
				case "R":{
					result += surchargeRentCar(transTime, Integer.parseInt(userVo.getPeriod()));
					break;
				}
				case "W":
				case "C": break;
				default:{
					throw new IllegalArgumentException("지원하지 않는 운행수단입니다.");
				}
			}
		}
		
		return result;
	}
	
	@Override
	public Integer surchargeTaxi(int traveTime, int transTime) throws Exception {
		final int basicPrice = 3800;
		
		int result = basicPrice;
		result += Math.floorDiv(transTime, 10) * 5000;
		
		if(traveTime > 22 && traveTime < 24) {
			result = (int) (result + (result * 0.2));
		}
		if(traveTime > 00 && traveTime < 04) {
			result = (int) (result + (result * 0.4));
		}
		
		return result;
	}

	@Override
	public Integer surchargeBus(int transTime) throws Exception {
		final int basicPrice = 1400;
		return busAndSubwaySurchargeCalculator(basicPrice, transTime);
	}

	@Override
	public Integer surchargeSubway(int transTime) throws Exception {
		final int basicPrice = 1450;
		return busAndSubwaySurchargeCalculator(basicPrice, transTime);
	}

	@Override
	public Integer surchargeRentCar(int transTime, int period) throws Exception {
		final int basicPrice = 100000;
		int result = basicPrice;
		
		if(period > 2) {
			result -= Math.floorDiv(period, 2) * 10000;
		}
		result = (result < 70000)?70000:result;
		result += Math.floorDiv(transTime, 10) * 500;
		return result;
	}

	public Integer busAndSubwaySurchargeCalculator(int basicPrice, int transTime) {
		int result = basicPrice;
		result += Math.floorDiv(transTime, 20) * 200;
		
		return result;
	}

}
