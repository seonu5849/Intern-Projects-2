package com.spring.board.vo;

public class TravelVo {

	private String seq; // trave_info의 seq
	private String userSeq; // client_info의 seq
	private String traveDay; // 여행날짜
	private String traveTime; // 여행시간
	private String traveCity; // 어행지역시
	private String traveCounty; // 여행지역군구
	private String traveLoc; // 여행장소명
	private String traveTrans; // 이동수단
	private String transTime; // 이동시간
	private String useTime; // 이용시간
	private String useExpend; // 예상지출액
	private String traveDetail; // 계획상세
	private String request; // 수정요청
	
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getUserSeq() {
		return userSeq;
	}
	public void setUserSeq(String userSeq) {
		this.userSeq = userSeq;
	}
	public String getTraveDay() {
		return traveDay;
	}
	public void setTraveDay(String traveDay) {
		this.traveDay = traveDay;
	}
	public String getTraveTime() {
		return traveTime;
	}
	public void setTraveTime(String traveTime) {
		this.traveTime = traveTime;
	}
	public String getTraveCity() {
		return traveCity;
	}
	public void setTraveCity(String traveCity) {
		this.traveCity = traveCity;
	}
	public String getTraveCounty() {
		return traveCounty;
	}
	public void setTraveCounty(String traveCounty) {
		this.traveCounty = traveCounty;
	}
	public String getTraveLoc() {
		return traveLoc;
	}
	public void setTraveLoc(String traveLoc) {
		this.traveLoc = traveLoc;
	}
	public String getTraveTrans() {
		return traveTrans;
	}
	public void setTraveTrans(String traveTrans) {
		this.traveTrans = traveTrans;
	}
	public String getTransTime() {
		return transTime;
	}
	public void setTransTime(String transTime) {
		this.transTime = transTime;
	}
	public String getUseTime() {
		return useTime;
	}
	public void setUseTime(String useTime) {
		this.useTime = useTime;
	}
	public String getUseExpend() {
		return useExpend;
	}
	public void setUseExpend(String useExpend) {
		this.useExpend = useExpend;
	}
	public String getTraveDetail() {
		return traveDetail;
	}
	public void setTraveDetail(String traveDetail) {
		this.traveDetail = traveDetail;
	}
	public String getRequest() {
		return request;
	}
	public void setRequest(String request) {
		this.request = request;
	}
	
	@Override
    public String toString() {
        return "TravelVo{" +
                "seq:'" + seq + '\'' +
                ", userSeq:'" + userSeq + '\'' +
                ", traveDay:'" + traveDay + '\'' +
                ", traveTime:'" + traveTime + '\'' +
                ", traveCity:'" + traveCity + '\'' +
                ", traveCounty:'" + traveCounty + '\'' +
                ", traveLoc:'" + traveLoc + '\'' +
                ", traveTrans:'" + traveTrans + '\'' +
                ", transTime:'" + transTime + '\'' +
                ", useTime:'" + useTime + '\'' +
                ", useExpend:'" + useExpend + '\'' +
                ", traveDetail:'" + traveDetail + '\'' +
                ", request:'" + request + '\'' +
                '}';
    }

	
}
