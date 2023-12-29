<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="/resources/js/admin.js"></script>
<title>request</title>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	.container{
		width: 100%;
	}
	.container > section {
		width: 100%;
	}
	.container .center {
		margin: auto;
	}
	#user_list{
		margin-top: 50px;
	}
	#user_list > tbody {
		cursor: pointer;
	}
	#user_list > tbody > tr:hover{
		background-color: rgba(0, 0, 255, 0.3);
	}
	table, tr, th, td {
		border: 1px solid black;
	}
	.hidden{
		display: none;
	}
	.div_date_btn{
		width: 100%;
	}
	.div_date_btn > .date_btn {
		padding: 3px 5px;
		margin: 5px;
		border: 1px solid black;
	}
	.div_date_btn > .date_btn:hover {
		background-color: rgba(51, 102, 153, 0.3);
		border: 1px solid rgba(51, 102, 153, 0.6);
	}
	.hotkey > input[type=button]{
		padding: 0 3px;
		margin-bottom: 50px;
	}
	.hotkey > input[type=button]:nth-child(1) {
		margin-left:5px;
	}
	.text-center {
		width: 100%;
		text-align: center;
		margin-top: 10px;
	}
	.active {
		background-color: #336699;
		color: #fff;
	}
	#submit {
		padding: 3px 5px;
	}
</style>
</head>
<body>
	<div class="container">
		<section id="section_user_list">
			<table id="user_list" class="center">
				<thead>
					<tr>
						<th>고객명</th>
						<th>휴대폰번호</th>
						<th>여행지</th>
						<th>여행기간</th>
						<th>이동수단</th>
						<th>예상 경비</th>
						<th>견적 경비</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="user" items="${users}">
						<tr>
							<td>
								<input type="hidden" class="userSeq" value="${user.seq}"/>
								${user.name}
							</td>
							<td>${user.phone}</td>
							<td class="user_traveCity">${user.traveCity}</td>
							<td class="period">${user.period}</td>
							<td class="user_transport">${user.transport}</td>
							<td>${user.expend}</td>
							<td><span class="offered_price"></span></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</section>
		<section id="section_btn" class=" hidden">
			<div class="div_date_btn"></div>
			<div class="hotkey">
				<input type="button" id="add" value="추가"> |
				<input type="button" id="del" value="삭제">
			</div>
		</section>
		<section id="section_trave" class="hidden">
			<div id="div_table"></div>
			
			<div class="text-center">
				<input type="button" id="submit" value="저장"/>
			</div>
		</section>
		
	</div>
	<template class="template_table">
		<table class="table_trave center">
				<thead>
					<tr>
						<th></th>
						<th>시간</th>
						<th>지역</th>
						<th>장소명</th>
						<th>교통편</th>
						<th>예상이용시간</th>
						<th>이동요금(예상지출비용)</th>
						<th>계획상세</th>
						<th>교통비</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
	</template>
	<template class="template_row">
		<tr class="plan_row">
			<td><input type="checkbox" name="seq" class="checkbox"></td>
			<td><input type="time" name="traveTime" class="traveTime"></td>
			<td>
				<select name="traveCity" class="traveCity"></select>
				<select name="traveCounty" class="traveCounty"></select>
			</td>
			<td><input type="text" name="traveLoc" class="traveLoc"></td>
			<td>
				<select name="traveTrans" class="traveTrans">
					<option value="W">도보</option>
					<option value="B">버스</option>
					<option value="S">지하철</option>
					<option value="T">택시</option>
					<option value="R">렌트</option>
					<option value="C">자차</option>
				</select>
			</td>
			<td><input type="text" name="transTime" class="transTime"></td>
			<td><input type="text" name="userExpend" class="userExpend"></td>
			<td><input type="text" name="traveDetail" class="traveDetail"></td>
			<td><span class="traveCost">0원</span></td>
		</tr>
	</template>
</body>
</html>