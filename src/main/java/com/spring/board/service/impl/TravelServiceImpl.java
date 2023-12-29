package com.spring.board.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.board.dao.TravelDao;
import com.spring.board.service.TravelService;
import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

@Service
public class TravelServiceImpl implements TravelService {
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	private final TravelDao TravelDao;
	
	@Autowired
	public TravelServiceImpl(TravelDao TravelDao){
		this.TravelDao = TravelDao;
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
			users = TravelDao.selectRequestUseerList();
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
//			for(Object obj : planList) {
//				log.info(obj.getClass().getName());
//				if(obj instanceof TravelVo) {
//					TravelVo plan = (TravelVo) obj;
//					log.info("plan : {}",plan);
//					affectedRows = this.TravelDao.insertTravelPlan(plan);
//				}
//				
//			}
			for(Object obj : planList) {
				if(obj instanceof Map<String, Object>) {
					
				}
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return affectedRows;
	}

}
