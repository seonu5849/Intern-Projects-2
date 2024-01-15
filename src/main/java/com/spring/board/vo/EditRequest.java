package com.spring.board.vo;

public enum EditRequest {
	EDIT_REQUEST("M"),
	EDIT_SUCCESS("C");
	
	String status;
	
	private EditRequest(String status) {
		this.status = status;
	}
	
	public String getStatus() {
		return this.status;
	}
}
