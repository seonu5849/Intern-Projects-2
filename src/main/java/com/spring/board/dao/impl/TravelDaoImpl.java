package com.spring.board.dao.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.board.dao.TravelDao;
import com.spring.board.vo.TravelVo;
import com.spring.board.vo.UserVo;

@Repository
public class TravelDaoImpl implements TravelDao{

	private final SqlSession sqlSession;
	
	@Autowired
	public TravelDaoImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	@Override
	public Integer insertRequestUser(UserVo userVo) throws Exception {
		return this.sqlSession.insert("travel.insertRequestUser", userVo);
	}

	@Override
	public List<UserVo> selectRequestUseerList() throws Exception {
		return this.sqlSession.selectList("travel.selectRequestUseerList");
	}

	@Override
	public Integer mergeTravelPlan(TravelVo travelVo) throws Exception {
		return this.sqlSession.insert("travel.mergeTravelPlan", travelVo);
	}

	@Override
	public List<TravelVo> selectUserDetailTravelPlans(TravelVo travelVo) throws Exception {
		return this.sqlSession.selectList("travel.selectUserDetailTravelPlans", travelVo);
	}

	@Override
	public Integer totalTravelRowNum() throws Exception {
		return this.sqlSession.selectOne("travel.totalTravelRowNum");
	}

	@Override
	public Integer deleteUserDetailPlans(String[] traveSeqs) throws Exception {
		return this.sqlSession.delete("travel.deleteUserDetailPlans", traveSeqs);
	}

	@Override
	public UserVo selectUserDetail(UserVo userVo) throws Exception {
		return this.sqlSession.selectOne("travel.selectUserDetail", userVo);
	}

}
