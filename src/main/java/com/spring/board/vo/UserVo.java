package com.spring.board.vo;

import java.util.List;

public class UserVo {
	
	private String seq; // 번호
	private String name; // 이름
	private String phone; // 여행지
	private String traveCity; // 여행지
	private String period; // 예상기간
	private String expend; // 예상경비
	private String transport; // 이동수단
	
	private List<TravelVo> travelVo; // trave_info

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getTraveCity() {
		return traveCity;
	}

	public void setTraveCity(String traveCity) {
		this.traveCity = traveCity;
	}

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public String getExpend() {
		return expend;
	}

	public void setExpend(String expend) {
		this.expend = expend;
	}

	public String getTransport() {
		return transport;
	}

	public void setTransport(String transport) {
		this.transport = transport;
	}

	public List<TravelVo> getTravelVo() {
		return travelVo;
	}

	public void setTravelVo(List<TravelVo> travelVo) {
		this.travelVo = travelVo;
	}
	
	@Override
    public String toString() {
        return "TravelInfo{" +
                "seq='" + seq + '\'' +
                ", name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", traveCity='" + traveCity + '\'' +
                ", period='" + period + '\'' +
                ", expend='" + expend + '\'' +
                ", transport='" + transport + '\'' +
                '}';
    }

}
