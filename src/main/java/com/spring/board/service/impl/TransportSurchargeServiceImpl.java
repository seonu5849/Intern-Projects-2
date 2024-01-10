package com.spring.board.service.impl;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dao.TravelDao;
import com.spring.board.service.TransportSurchargeService;
import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

@Service
public class TransportSurchargeServiceImpl implements TransportSurchargeService{

	private TravelDao travelDao;
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	public TransportSurchargeServiceImpl() {
		
	}
	
	@Autowired
	public TransportSurchargeServiceImpl(TravelDao travelDao) {
		this.travelDao = travelDao;
	}
	
	@Override
	public Integer transportSurchargeCalculator(UserVo userVo) throws Exception {
		log.trace("transportSurchargeCalculator({}) invoked.", userVo.toString());
		
		int result = 0;
		TravelVo travelVo = new TravelVo();
		travelVo.setUserSeq(userVo.getSeq());
		
		List<TravelVo> findUserDetailPlans = this.travelDao.selectUserDetailTravelPlans(travelVo);
		for(TravelVo key : findUserDetailPlans) {
			log.info(key.toString());
		}
		for(TravelVo plan : findUserDetailPlans) {
			String[] traveTime = plan.getTraveTime().split(":");
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
	public Integer surchargeTaxi(String[] traveTime, int transMinutes) throws Exception {
		log.trace("surchargeTaxi({}, {}) invoked.", Arrays.toString(traveTime), transMinutes);
		
		final int basicPrice = 3800;
		final double preMidnightSurcharge = 1.2;
		final double pastMidnihtSurcharge = 1.4;
		int result = Math.floorDiv(transMinutes, 10) * 5000;
		
		String startTime = correctStartTimeForOvernight(traveTime);
		String transTime = convertMinutesToTime(transMinutes);
		String endTime = calculateArrivalTimeByDistance(startTime, transTime);
		
		log.info("startTime: {}", startTime);
		log.info("transTime: {}", transTime);
		log.info("endTime: {}", endTime);
		
		int startHours = Integer.parseInt(startTime.split(":")[0]);
		int startMinutes = Integer.parseInt(startTime.split(":")[1]);
		int endHours = Integer.parseInt(endTime.split(":")[0]);
		int endMinutes = Integer.parseInt(endTime.split(":")[1]);
		
		if(startHours >= 22 && endHours <= 28) {
			if(startHours >= 24) {
				result *= pastMidnihtSurcharge;
			}else {
				if(endHours >= 24) {
					int minutesBeforeMidnight = 60 - startMinutes;
					int minutesAfterMidnight = (endHours - 24) * 60 + endMinutes;
					int beforeResult = (int) (Math.floorDiv(minutesBeforeMidnight, 10) * 5000 * preMidnightSurcharge);
					int afterResult = (int) (Math.floorDiv(minutesAfterMidnight, 10) * 5000 * pastMidnihtSurcharge);
					return basicPrice + beforeResult + afterResult;
				}else {
					result *= preMidnightSurcharge;
				}
			}
		}
		
		return basicPrice + result;
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
		result += Math.floorDiv((transTime > 20)? transTime : 0, 20) * 200;
		
		return result;
	}
	
	public String correctStartTimeForOvernight(String[] startTime) {
		int hours = Integer.parseInt(startTime[0]);
		int minutes = Integer.parseInt(startTime[1]);
		
		int hoursTo = (hours < 4)?hours+24:hours;
		
		return hoursTo +":"+ minutes;
	}

	public String convertMinutesToTime(int minutes) {
		int hours = Math.floorDiv(minutes, 60);
		int remainingMinutes = minutes % 60;
		
		return hours + ":" + remainingMinutes;
	}
	
	public String calculateArrivalTimeByDistance(String startTime, String transTime) {
		String[] startTimeArray = startTime.split(":");
		String[] transTimeArray = transTime.split(":");
		
		int hours = Integer.parseInt(startTimeArray[0]) +
				Integer.parseInt(transTimeArray[0]) +
				Math.floorDiv(Integer.parseInt(startTimeArray[1]) + Integer.parseInt(transTimeArray[1]), 60);
		
		int minutes = (Integer.parseInt(startTimeArray[1]) + Integer.parseInt(transTimeArray[1])) % 60;
		
		return hours + ":" + minutes;
	}
	
//	public static void main(String[] args) throws Exception {
//		TransportSurchargeServiceImpl tss = new TransportSurchargeServiceImpl();
//		String[] traveTime = new String[]{"23", "50"};
//		int transTime = 40;
//		
//		Integer result = tss.surchargeTaxi(traveTime, transTime);
//		System.out.println(result);
//	}
}
