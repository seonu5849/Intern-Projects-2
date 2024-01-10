<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="/resources/js/userRequest.js"></script>
<title>request</title>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	.container {
		width: 100%;
		height: 100vh;
	}
	.container .user_request {
		margin: auto;
		margin-top: 50px;
		border: 1px solid black;

		font-weight: bold;
	}
	.container .user_request td:nth-child(1){
		text-align: center;
	}
	.container .center {
		margin: auto;
	}
	.user_request > tr, th, td {
		border: 1px solid black;
	}
	.user_request input[type=text] {
		width: 200px;
	}
	input::placeholder {
		text-align: center;
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
	.hidden{
		display: none;
	}
	.active {
		background-color: #336699;
		color: #fff;
	}
</style>
</head>
<body>
	<div class="container">
		<form class="requestForm">
			<input type="hidden" name="seq" id="seq" value="${user.seq}"/>
			<table class="user_request">
				<tr>
					<th>
						<label for="name">고객명</label>
					</th>
					<td>
						<input type="text" name="name" id="name" placeholder="한글만 입력" value="${user.name}"/>
					</td>
				</tr>
				<tr>
					<th>
						<label for="phone">휴대폰번호</label>
					</th>
					<td>
						<input type="text" name="phone" id="phone" maxlength="13" placeholder="숫자만 입력해주세요." value="${user.phone}"/>
					</td>
				</tr>
				<tr>
					<th>
						<label for="transport">여행기간</label>
					</th>
					<td>
						<input type="text" name="period" id="period" placeholder="여행기간은 1~30 중에서만 입력해주세요." value="${user.period}"/>
					</td>
				</tr>
				<tr>
					<th>
						<label for="transport">이동수단</label>
					</th>
					<td>
						<input type="hidden" id="userTransport" value="${user.transport}"/>
						<select name="transport" id="transport">
							<option value="R">렌트</option>
							<option value="B">대중교통</option>
							<option value="C">자차</option>
						</select>
					</td>
				</tr>
				<tr>
					<th>
						<label for="expend">예상경비</label>
					</th>
					<td>
						<input type="text" name="expend" id="expend" maxlength="13" placeholder="숫자만 입력해주세요." value="${user.expend}"/>
					</td>
				</tr>
				<tr>
					<th>
						<label for="traveCity">여행지</label>
					</th>
					<td>
						<input type="hidden" id="userTraveCity" value="${user.traveCity}"/>
						<select name="traveCity" id="traveCity">

						</select>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<c:if test="${user.seq != null}">
							<input type="button" id="logout" value="로그아웃"/>
						</c:if>
						<c:if test="${user.seq == null}">
							<input type="button" id="submit" value="신청"/>
						</c:if>
					</td>
				</tr>
			</table>
		</form>
		<session id="session_btn" class="hidden">
			<div class="div_date_btn"></div>
			<div class="hotkey">
				<input type="button" id="edit" value="수정요청">
			</div>
		</session>
		<section id="session_trave" class="hidden">
			<div id="div_table"></div>
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
						<th>예상이동시간</th>
						<th>이용요금(예상지출비용)</th>
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
			<td><input type="checkbox" name="seq" class="checkbox" value=""></td>
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
			<td><input type="text" name="transTime" class="transTime" placeholder="분으로만 적어주세요."></td>
			<td><input type="text" name="useExpend" class="useExpend"></td>
			<td><input type="text" name="traveDetail" class="traveDetail"></td>
			<td><span class="traveCost">0원</span></td>
		</tr>
	</template>
</body>
</html>