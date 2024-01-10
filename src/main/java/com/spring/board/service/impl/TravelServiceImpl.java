package com.spring.board.service.impl;

import java.text.DecimalFormat;
import java.util.List;

import org.apache.catalina.tribes.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dao.TravelDao;
import com.spring.board.service.TransportSurchargeService;
import com.spring.board.service.TravelService;
import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

@Service
public class TravelServiceImpl implements TravelService {
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	private final TravelDao TravelDao;
	private final TransportSurchargeService surchargeService;
	
	@Autowired
	public TravelServiceImpl(TravelDao TravelDao, TransportSurchargeService surchargeService){
		this.TravelDao = TravelDao;
		this.surchargeService = surchargeService;
	}

	@Override
	public Integer submitQuoteRequest(UserVo userVo){
		log.trace("submitQuoteRequest({}) invoked.", userVo);
		
		Integer affectedRows = null;
		try {
			affectedRows = this.TravelDao.insertRequestUser(userVo);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return affectedRows;
	}

	@Override
	public List<UserVo> findAllRequestUser() {
		List<UserVo> users = null;
		try {
			users = this.TravelDao.selectRequestUseerList();
			for(UserVo user : users) {
				Integer totalUseExpend = this.surchargeService.transportSurchargeCalculator(user);
				
				user.getTravelVo().get(0).setUseExpend(String.valueOf(
						new DecimalFormat("###,###").format(totalUseExpend)));
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return users;
	}

	@Override
	public Integer submitTravelPlans(List<TravelVo> planList) {
		log.trace("submitTravelPlans({}) invoked.",planList.toString());
		Integer affectedRows = null;
		
		try {
			for(TravelVo plan : planList) {
				log.info(plan.toString());
				affectedRows = this.TravelDao.mergeTravelPlan(plan);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return affectedRows;
	}

	@Override
	public List<TravelVo> findUserDetailTravelPlans(TravelVo travelVo) {
		List<TravelVo> travelList = null;
		
		try {
			travelList = this.TravelDao.selectUserDetailTravelPlans(travelVo);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return travelList;
	}

	@Override
	public Integer totalTravelRowNum() {
		Integer affectedRows = null;
		try {
			affectedRows = this.TravelDao.totalTravelRowNum();
		}catch(Exception e) {
			e.getStackTrace();
		}
		
		return affectedRows;
	}

	@Override
	public Integer deleteUserDetailPlans(String[] traveSeqs) {
		log.trace("deleteUserDetailPlans({}) invoked.", Arrays.toString(traveSeqs));
		Integer affectedRows = null;
		try {
			affectedRows = this.TravelDao.deleteUserDetailPlans(traveSeqs);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return affectedRows;
	}

	@Override
	public UserVo findUserDetail(UserVo userVo) {
		UserVo findUser = null;
		
		try {
			findUser = this.TravelDao.selectUserDetail(userVo);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return findUser;
	}

}
