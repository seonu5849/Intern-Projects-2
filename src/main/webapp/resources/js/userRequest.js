$j(document).ready(function(){

	$j(function(){
		const select = $j('#traveCity');
		
		for(region in regions){
			let option = $j('<option>');
			option.text(region);
			select.append(option);
		}
	});
	
	$j('#name').on('input', () => {
		let input = $j(this).val();
		let regex = /[a-zA-Z0-9]/g;

		let value = input.replace(regex, '');
		$j(this).val(value);
	});

	$j('#phone').on('input', () => {
		let input = $j(this).val();
		let regex = /[^0-9]/g;

		let value = input.replace(regex, '');
		if(value.length > 3){
			value = value.slice(0,3)+"-"+value.slice(3);
		}
		if(value.length > 8){
			value = value.slice(0,8)+"-"+value.slice(8);
		}
			
		$j(this).val(value);
	});

	$j('#period').on('input', () => {
		let input = $j(this).val();
		let regex = /[^0-9]/g;
		
		let value = input.replace(regex, '');
		$j(this).val(value);
	});
	
	$j('#expend').on('input', () => {
		let input = $j(this).val();
		let regex = /[^0-9]/g;

		let value = input.replace(regex, '');
		let formattedNumber = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		
		$j(this).val(formattedNumber);
	});

	if($j('#seq').val() !== ''){
		$j('.hidden').css('display','block');
		
		$j('#transport > option').each(() => {
			if($j('#userTransport').val() === $j(this).val()){
				$j(this).prop('selected',true);
			}	
		});
		
		$j('#traveCity > option').each(() => {
			if($j('.user_request #userTraveCity').val() === $j(this).val()){
				$j(this).prop('selected',true);
			}
		});

		const period = $j('#period').val();
		let btnDiv = $j('.div_date_btn');
		for(let i=1; i<=period; i++){
			let button = $j(`<button type="button" class="date_btn" value="${i}">${i}</button>`);
			if(i === 1){
				button.addClass("active");
			}
			
			btnDiv.append(button);
			
			if(i < period){
				let span = $j('<span>|</span>');
				btnDiv.append(span);
			}
		}
		loadUserDetailPlans();
	}
	
	$j(document).on('click', '#edit' ,() => {
		let checkedArray = [];
		const table = $j('.table_trave');
		const rows = table.find('tbody tr.plan_row');

		rows.each(function() {
			let row = $j(this);
			let seq = row.find('[name="seq"]:checked');
			
			if(seq.val() !== undefined){
				checkedArray.push(seq.val());
			}
		});
		
		if(checkedArray.length <= 0){
			alert('선택된 항목이 없습니다.\n항목을 선택 후 다시 시도해주세요.');
			return;
		}
		const test = {
			travelSeqs: checkedArray,
			userSeq: $j('#seq').val()
		};
		console.log(test);
		
		$j.ajax({
			type: "PUT",
			url: `/travel/editRequest.do?travelSeqs=${checkedArray}&userSeq=${$j('#seq').val()}`,
			success: function(data){
				if(data === 'SUCCESS'){
					alert('괸리자에게 수정 요청을 보냈습니다.');
				}else{
					alert('수정 요청을 실패했습니다.');
				}
			},
			error: function(xhr, error){
				console.log('Ajax fail message : '+error);
			}
		});
		
	})
	
});
const regions = {
		'서울특별시': ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
		'인천광역시': ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구"],
		'부산광역시': ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
		'대전광역시': ["대덕구", "동구", "서구", "유성구", "중구"],
		'대구광역시': ["남구", "달서구", "달서군", "동구", "북구", "서구", "수성구", "중구"],
		'울산광역시': ["남구", "동구", "북구", "중구", "울주군"],
		'광주광역시': ["광산구", "남구", "동구", "북구", "서구"],
		'제주특별자치도': ["서귀포시", "제주시"],
		'세종특별자치시': ["세종특별자치시"],
		'경기도': ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "연천군"],
		'강원도': ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"],
		'충청북도': ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"],
		'충청남도': ["계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시", "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"],
		'경상북도': ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"],
		'경상남도': ["거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"],
		'전라북도': ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"],
		'전라남도': ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"]
	};


let userSeq;
function loadUserDetailPlans(){
	userSeq = $j('#seq').val();
	
	$j.ajax({
		type: "GET",
		url: `/travel/userDetailPlans.do`,
		data: {
			userSeq : userSeq,
			traveDay : traveDay
		},
		dataType: "JSON",
		success: function(data){
			sessionStorage.setItem('entitys', JSON.stringify(data.list));
			createTempateTable();
			disabledCheckbox();
		},
		error: function(xhr, error){
			console.log('Aajx fail message : '+error);
		}
	});
}

function disabledCheckbox(){
	const table = $j('.table_trave');
	const rows = table.find('tbody tr');

	rows.each(function(){
		if($j(this).find('.request').val() === 'M'){
			$j(this).find('.checkbox').attr({
				checked: true,
				disabled: true
			});
			
		}
	})
}

function createTempateTable(){
	let section = $j('#div_table');
	section.empty();
	section.append($j('.template_table').prop('content').cloneNode(true));
	
	const tbody = $j('.table_trave > tbody');
	
	let session = JSON.parse(sessionStorage.getItem('entitys'));
	createTemplateRowSession(tbody, session);
	
	section.find('input:not(:checkbox), select').prop('disabled', true);
}

function createTemplateRowSession(tbody, session){
	let userHasData = false;
	let validateRows = [];
	
	if(sessionStorage.length > 0 ){
		for(let i=0; i<session.length; i++){
			let sess = session[i];
			
			if(userSeq == sess.userSeq && traveDay == sess.traveDay){
				userHasData = true;
				validateRows.push(sess);
			}
		}
		for(let i=0; i<validateRows.length; i++){
			let sess = validateRows[i];
			tbody.append($j('.template_row').prop('content').cloneNode(true));
			for(key of Object.keys(sess)){
				$j(`.table_trave [name="${key}"]`).eq(i).val(sess[key]);
			}
			
			print_regions(sess['traveCity']);
			print_sub_regions();
		}
		
		for(let i=0; i<tbody.find('tr').length; i++){
			let traveTime = $j(`.traveTime`).eq(i).val();
			let traveTrans = $j(`.traveTrans`).eq(i).val();
			let transTime = $j(`.transTime`).eq(i).val();
			let traveCost = $j(`.traveCost`).eq(i);	
			
			let $traveCost = travelCostsCalculate(traveTime, traveTrans, transTime);
    		traveCost.text(`${$traveCost.toLocaleString()}원`);
		}
	}
	// 현재 회원의 데이터가 없으면 빈 tbody 추가
	if (!userHasData) {
	    tbody.append($j('.template_row').prop('content').cloneNode(true));
	    
	    if($j('[name="seq"]').eq(0).val() !== ''){
			print_regions($j('#userTraveCity').val());
			print_sub_regions();
		}
	}
}

function print_regions(userTraveCity){
	const select = $j('.table_trave .traveCity');
	
	for(region in regions){
		let option = $j('<option>');
		option.text(region);
		select.append(option);
		
		select.val(userTraveCity).prop('selected', true);
	}
}

function print_sub_regions(){
	let select = $j('.traveCounty');
	select.empty();
	
	let main_region = $j('.table_trave .traveCity').val();
	
	createSubOption(select, main_region);
}

function createSubOption(select, main_region){
	for(region in regions){
		if(main_region === region){
			for(sub in regions[region]){
				let option = $j('<option>');
				option.text(regions[region][sub]);
				select.append(option);
			}
		}
	}
}

let traveDay = '1';
$j(document).on('click', '.date_btn', function(e) {
	$j('.date_btn').removeClass('active');
	$j(this).addClass('active');
	traveDay = $j(this).val();

	createTempateTable();
	
});
function travelCostsCalculate(traveTime, traveTrans, transTime){
	/*traveCost.empty();*/
	let $traveCost = 0;
	let $transTime = transTime.replace('분','');

	switch(traveTrans){
		case 'B':{
			const basicPrice = 1400;
			$traveCost = busAndSubwaySurchargeCalculator(basicPrice, $transTime);
			break;
		}
		case 'S':{
			const basicPrice = 1450;
			$traveCost = busAndSubwaySurchargeCalculator(basicPrice, $transTime);
			break;
		}
		case 'T':{
			const basicPrice = 3800;
			$traveCost = taxiSurchargeCalculator(basicPrice, traveTime, $transTime);
			
			break;
		}
		case 'R':{
			const basicPrice = 100000;
			$traveCost = rentSurchargeCalculator(basicPrice, $transTime);
			break;
		}
		case 'C':{
			break;
		}
		default:{
		}
	}
	return $traveCost;
}

function busAndSubwaySurchargeCalculator(basicPrice, transTime){ // 버스, 지하철 교통비 할증 로직
	let $traveCost = basicPrice;
	$traveCost += Math.floor(((transTime>20)?transTime:0) / 20) * 200;
	return $traveCost;
}

function taxiSurchargeCalculator(basicPrice, traveTime, transTime){ // 택시 교통비 할증 로직
	const preMidnightSurcharge = 1.2;
	const pastMidnihtSurcharge = 1.4;
	let result = Math.floor(transTime / 10) * 5000;
	
	let startTime = correctStartTimeForOvernight(traveTime);
	let $transTime = convertMinutesToTime(transTime);
	let endTime = calculateArrivalTimeByDistance(startTime, $transTime);

	if(startTime >= '22' && endTime <= '28'){
		if(startTime >= '24'){
			result *= pastMidnihtSurcharge;
		}else{
			if(endTime >= '24'){
				let minutesBeforeMidnight = 60 - parseInt(startTime.split(':')[1]);
				let minutesAfterMidnight = ((parseInt(endTime.split(':')[0])-24) * 60) + parseInt(endTime.split(':')[1]);
				let beforeResult = (Math.floor(minutesBeforeMidnight / 10) * 5000) * preMidnightSurcharge;
				let afterResult = (Math.floor(minutesAfterMidnight / 10) * 5000) * pastMidnihtSurcharge;
				return basicPrice + beforeResult + afterResult;
			}else{
				result *= preMidnightSurcharge;
			}
		}
	}
	
	return basicPrice + result;
}
function correctStartTimeForOvernight(startTime){
	let hours = parseInt(startTime.split(':')[0]);
	let minutes = parseInt(startTime.split(':')[1]);
	
	return `${(hours < 4)?hours+24:hours}:${minutes}`;
}

function convertMinutesToTime(minutes){
	let hours = Math.floor(minutes / 60);
	let remainingMinutes = minutes % 60;
	
	return `${hours}:${remainingMinutes}`;
}

function calculateArrivalTimeByDistance(startTime, transTime){
	let $startTime = startTime.split(':');
	let $transTime = transTime.split(':');

	let hours = parseInt($startTime[0]) + 
					parseInt($transTime[0]) + 
						Math.floor((parseInt($startTime[1]) + parseInt($transTime[1]))/60);
	let minutes = (parseInt($startTime[1]) + parseInt($transTime[1])) % 60;
	
	return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}`;
}

function rentSurchargeCalculator(basicPrice, transTime){ // 랜트 교통비 할증 로직
	let $traveCost = basicPrice;

	if(period>2){
		$traveCost -= Math.floor(period/2) * 10000;
	}
	$traveCost = ($traveCost<70000)?70000:$traveCost; // 7만원 보다 작다면 70000으로 고정
	$traveCost += Math.floor(transTime / 10) * 500;
	return $traveCost;
}


$j(document).on('click', '#submit', function(){
		let user = {
			name : $j('#name').val(),
			phone : $j('#phone').val(),
			period : $j('#period').val(),
			transport : $j('#transport').val(),
			expend : $j('#expend').val(),
			traveCity : $j('#traveCity').val()
		};
		validateEmptyField(user)
		if(!validateEmptyField(user) || !validatePeriod(user)){
			return;
		}
		
		$j.ajax({
			type: "POST",
			url: "/travel/userRequest.do",
			data: JSON.stringify(user),
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: function(data){
				if(data.result){
					alert("신청되셨습니다.");
					location.href="/travel/login.do";
				}else{
					alert("신청이 실패했습니다. 다시 확인해주세요.");
				}
			},
			error: function(xhr, error){
				console.log('Ajax fail message: '+error);
			}
		});
	});
	
$j(document).on('click', '#logout', function(){
	console.log('asd');
	$j.ajax({
		type: "POST",
		url: "/travel/logout.do",
		dataType: "JSON",
		success: function(data){
			location.href = data.redirect;
		},
		error: function(xhr, error){
			console.log('Ajax fail message: '+error);
		}
	});
})

/* 유효성 검증 영역 */
function validatePeriod(user){ // 여행기간 1~30
	let period = user.period;
	if(period < 1 || period > 30){
		printAlert('여행기간은 1~30일 중에서만 입력해주세요.', 'period');
		return false;
	}
	return true;
}

function validateEmptyField(user){
	let keys = Object.keys(user);
	for(let key of keys){
		if(user[key] === '' || user[key] === undefined){
			let topTh = searchTopTh(key);
			printAlert('"'+topTh+'" 란을 입력하지 않았습니다.', key);
			return false;
		}
	}
	return true;
}

function searchTopTh(key){
	let table = $j('#'+key).closest('table');
	let row = $j('#'+key).closest('tr').index();
	let topTh = table.find('th label').eq(row).text();
	return topTh;
}

/* alert 출력 및 focus */
function printAlert(str, key){
	alert(str);
	$j('#'+key).focus();
	
}