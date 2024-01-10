
$j(document).ready(function(){

	$j(function(){
		let transports = $j('.user_transport');
		
		for(let i=0; i<transports.length; i++){
			let transport = transports.eq(i).text();
			
			switch(transport){
				case 'B':{
					transport = transport.replace('B', '대중교통');
				}
				case 'R':{
					transport = transport.replace('R', '렌트');
				}
				default:{
					transport = transport.replace('C', '자차');
				}
			}
			transports.eq(i).text(transport);
		}
		
	});

	compareEstimatedVsQuote();
	
	$j(document).on('input', '.transTime', function() {
	    let input = $j(this).val();
	    let regex = /[^0-9]/g;
	    let value = input.replace(regex, '');
	
	    $j(this).val(value);
	});
	$j(document).on('blur', '.transTime', function() {
		let input = $j(this).val();
		if(input !== '' && !input.includes('분')){
	        $j(this).val(`${input}분`);
		}
	});
	
	$j(document).on('input', '.userExpend', function(){
		let input = $j(this).val();
		let regex = /[^0-9]/g;

		let value = input.replace(regex, '');
		let formattedNumber = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		
		$j(this).val(formattedNumber);
	});
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

$j(document).on('change', '.traveCity', function() { // 생성된 plan row에서 main-region을 변경 시 sub-region 변경
	let index = $j(this).closest('tr').index();
	let select = $j('.table_trave .traveCounty').eq(index);

	select.empty();
	let main_region = $j(this).val();
	
	createSubOption(select, main_region);
});

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
let rowNum;
function createTempateTable(){
	let section = $j('#div_table');
	section.empty();
	section.append($j('.template_table').prop('content').cloneNode(true));
	
	const tbody = $j('.table_trave > tbody');
	//tbody.empty();
	
	let session = JSON.parse(sessionStorage.getItem('entitys'));

	createTemplateRowSession(tbody, session);
	
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
				$j(`[name="${key}"]`).eq(i).val(sess[key]);
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
	    
	    if(!$j('[name="seq"]').eq(0).val()){
			$j(`[name="seq"]`).eq(0).val(rowNum);
			print_regions(userTraveCity);
			print_sub_regions();
			rowNum++;
		}
	}
}

let userTraveCity
let period;
function createTemplateRow(tbody){
	let newRows = tbody.append($j('.template_row').prop('content').cloneNode(true));

	let currentRow = $j(tbody).find('tr').length;
	$j(newRows).find('.checkbox').eq(currentRow-1).val(rowNum);
	rowNum++;
    
	print_regions(userTraveCity);
	print_sub_regions();
}

let userSeq;
$j(document).on('click', '#user_list tbody tr', function(){
		sessionStorage.clear();
		let btnDiv = $j('.div_date_btn');
		
		btnDiv.empty();

		traveDay = '1';
		userSeq = $j(this).children().eq(0).find('input[type=hidden]').val();
		userTraveCity = $j(this).children().eq(2).text();
		period = $j(this).children().eq(3).text();
		
		for (let i = 1; i <= period; i++) {
		    let button = $j(`<button type="button" class="date_btn" value="${i}">${i}</button>`);  // 새로운 button 객체를 각 반복에서 생성
		    if (i === 1) {
			    button.addClass("active");
			}
		    
		    btnDiv.append(button);
		    
		    if(i < period){
				let span = $j('<span>|</span>');
				btnDiv.append(span);
			}
		}
		$j('.hidden').css('display','block');
		getUserDetailPlans(userSeq);
});

function getUserDetailPlans(userSeq){
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
			rowNum = data.total + 1;
			createTempateTable();
		},
		error: function(xhr, error){
			console.log('Aajx fail message : '+error);
		}
	});
}

let traveDay = '1';
$j(document).on('click', '.date_btn', function(e){
	let validate = arrayTravelPlan();
	let sessionData;
	
	sessionData = JSON.parse(sessionStorage.getItem('entitys')) || [];
	isDuplicateSession(validate, sessionData);
	console.log(sessionData);
	
	
	$j('.date_btn').removeClass('active');
	$j(this).addClass('active');
	traveDay = $j(this).val();
	
	createTempateTable();
	
});

function isDuplicateSession(validate, sessionData){
	for (let i = 0; i < validate.length; i++) {
        const existingIndex = sessionData.findIndex(item =>
            item.seq == validate[i].seq &&
            item.userSeq == validate[i].userSeq &&
            item.traveDay == validate[i].traveDay
        );

		// 위 조건이 같을 경우 덮어쓰기.
        if (existingIndex !== -1) {
            sessionData[existingIndex] = validate[i];
        } else {
            sessionData.push(validate[i]);
        }
    }

    sessionStorage.setItem('entitys', JSON.stringify(sessionData));
}

$j(document).on('click', '#add', function(){
	const tbody = $j('.table_trave > tbody');
	createTemplateRow(tbody);
});

$j(document).on('click', '#del', function(){
	let checkedArray = [];
	let checked = $j('.checkbox:checked');
	let sessionData = JSON.parse(sessionStorage.getItem('entitys')) || [];
	
	for(let i=0; i<checked.length; i++){
		checked[i].closest('tr').remove();
		
		if(checked.val() !== 'on'){
			checkedArray.push(checked.eq(i).val());
		}
	}
	for(let i=0; i<sessionData.length; i++){
		for(let j=0; j<checkedArray.length; j++){
			if(checkedArray[j] == sessionData[i].seq){
				sessionData.splice(i, 1);
			}
		}
	}
	sessionStorage.setItem('entitys', JSON.stringify(sessionData));
	
	/*AJAX*/
	$j.ajax({
		type: "DELETE",
		url: `/travel/admin.do?traveSeqs=${checkedArray.join(',')}`,
		dataType: 'JSON',
		success: function(data){
			alert('삭제되었습니다.');
			
		},
		error: function(xhr, error){
			console.log('Ajax fail message : '+error);
		}
	})
	
	let emptyEntitys = [];
	for (let data of sessionData) {
	    if (Object.values(data).some(value => value === '')) {
	        emptyEntitys.push(parseInt(data['seq']));
	    }
	}
	for(let i=0; i<sessionData.length; i++){
		let sess = sessionData[i]
		for(let j=0; j<emptyEntitys.length; j++){
			if(emptyEntitys[j] == sess.seq){
				sessionData.splice(i, 1);
			}
		}
	}
	sessionStorage.setItem('entitys', sessionData);
	
	let offeredPrice = changeOfferedPriceValue(sessionData);
	console.log(offeredPrice);
	let table = $j('#user_list');
	let findName = '.userSeq';
	let comparator = userSeq;

	let foundRow = findRowByValue(table, findName, comparator);
	foundRow.find('.offered_price').text(offeredPrice);
	
	compareEstimatedVsQuote();
	
	// 행을 삭제했는데 만약 행이 하나도 남지 않을 겨웅엔 1개를 생성해준다.
	if($j('.table_trave').find('tbody > tr').length < 1){
		const tbody = $j('.table_trave > tbody');
		createTemplateRow(tbody);
	}
	
});

$j(document).on('change', '.traveTime, .traveTrans, .transTime', function() {
    let traveTrans = $j(this).closest('tr').find('.traveTrans').val();
    let transTime = $j(this).closest('tr').find('.transTime').val();
    let traveTime = $j(this).hasClass('traveTime') ? $j(this).val() : $j(this).closest('tr').find('.traveTime').val();
    let traveCost = $j(this).closest('tr').find('.traveCost');

    let $traveCost = travelCostsCalculate(traveTime, traveTrans, transTime);
    traveCost.text(`${$traveCost.toLocaleString()}원`);
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
	let validate = arrayTravelPlan();
	
	for(let i=0; i < validate.length; i++){
		if(!validateEntityEmpty(validate[i], i) || !validateDayTime(validate[i])){
			return;
		}
	}
	if(!isTimeRangeOverlap(validate)){
		return;
	}
	
	let sessionData = JSON.parse(sessionStorage.getItem('entitys')) || [];
	let emptyDay = [];
	let bool = true;
	let fullEntitysSet = new Set();
	let emptySeq = [];
	
	/*for (let data of sessionData) {
	    if (Object.values(data).every(value => value !== '')) {
	        console.log(parseInt(data['traveDay']));
	    }
	}*/
	
	
	for(let i=0; i<sessionData.length; i++){
		let entityKeys = Object.keys(sessionData[i]);
		
		for(let key of entityKeys){
			if(sessionData[i][key] === ''){
				bool = false;
				//break;
			}
		}
		if(bool){
			fullEntitysSet.add(parseInt(sessionData[i]['traveDay']));
		}else{
			emptySeq.push(sessionData[i]['seq']);
		}
		
	}

	for(let i=1; i<=period; i++){
		if(!fullEntitysSet.has(i)){
			emptyDay.push(i);
		}
	}
	
	if(emptyDay.length > 0){
		let $confirm = confirm(`${emptyDay.toString()}일차를 입력하지 않았습니다.\n그래도 저장하시겠습니까?`);
		
		if(!$confirm){
			return;
		}
	}

	for(let i=0; i<sessionData.length; i++){
		for(let j=0; j<emptySeq.length; j++){
			if(emptySeq[j] == sessionData[i].seq){
				sessionData.splice(i, 1);
			}
		}
	}
	sessionStorage.setItem('entitys', JSON.stringify(sessionData));
	
	isDuplicateSession(validate, sessionData);
	console.log(sessionData);
	
	$j.ajax({
		type: 'POST',
		url: '/travel/admin.do',
		data: JSON.stringify({plans : sessionData}),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			if(data.result === 1){
				alert('저장완료');
				let offeredPrice = changeOfferedPriceValue(sessionData);
				let table = $j('#user_list');
				let findName = '.userSeq';
				let comparator = userSeq;
	
				let foundRow = findRowByValue(table, findName, comparator);
				foundRow.find('.offered_price').text(offeredPrice);
				compareEstimatedVsQuote();
			}else{
				alert('저장실패');
			}
		},
		error: function(xhr, error){
			console.log('Ajax fail Message : '+error);
		}
	})
});

function changeOfferedPriceValue(sessionData){
	let offeredPrice = 0;
	for(let i=0; i<sessionData.length; i++){
		let sess = sessionData[i];
		let $traveCost = travelCostsCalculate(sess.traveTime, sess.traveTrans, sess.transTime);
		
		offeredPrice += parseInt($traveCost) + parseInt(sess.useExpend);
	}
	return offeredPrice.toLocaleString('ko-KR');
}


function arrayTravelPlan(){ // array plan 생성
	let arrayPlans = [];
	
	$j('.table_trave  tr.plan_row').each(function(){
		let expend = parseInt($j(this).find('.useExpend').val().replace(/,/g,''));
		
		let plan = {
			seq: $j(this).find('.checkbox').val(),
			userSeq: userSeq,
			traveDay: traveDay,
			traveTime: $j(this).find('.traveTime').val(),
			traveCity: $j(this).find('.traveCity').val(),
			traveCounty: $j(this).find('.traveCounty').val(),
			traveLoc: $j(this).find('.traveLoc').val(),
			traveTrans: $j(this).find('.traveTrans').val(),
			transTime: $j(this).find('.transTime').val(),
			useExpend: isNaN(expend) ? '' : expend,
			traveDetail: $j(this).find('.traveDetail').val()
		};
		
		arrayPlans.push(plan);
	});
	return arrayPlans;
}

function validateEntityEmpty(entity, i){
	let entityKeys = Object.keys(entity);
	if(entityKeys.filter(key => entity[key] !== '').length < 6){
		return false;
	}
	
	for(let key of entityKeys){
		if(entity[key] === ''){
			let topTh = searchTopTh(key);
			printAlert(`"${topTh}" 란이 입력되지 않았습니다.`, $j(`.${key}`).eq(i));
			return false;
		}
	}
	return true;
}

// 시간 유효성 검사
function validateDayTime(plan){
	const openTime = 7;
	const closeTime = 28;

	let startHour = (parseInt(plan.traveTime.split(':')[0]) < 4)?parseInt(plan.traveTime.split(':')[0])+24:parseInt(plan.traveTime.split(':')[0]);
	let endHour = startHour + ((parseInt(plan.traveTime.split(':')[1]) + parseInt(plan.transTime.replace('분', ''))) / 60);

	if(
		!(
			(openTime <= startHour) && (closeTime > startHour)
			&&
			(openTime <= endHour) && (closeTime > endHour)
		)
	){
		let table = $j('.table_trave');
		let findName = '[name="seq"]';
		let comparator = plan.seq;
		
		let foundRow = findRowByValue(table, findName, comparator);
		printAlert('스케쥴은 오전 7시부터 다음날 4시까지 가능합니다.', foundRow.find('.traveTime'));
		return false;
	}
	return true;
}

function isTimeRangeOverlap(plans){

	for(let i=0; i<plans.length; i++){
		const prevTime = plans[i];

		for(let j=i+1; j<plans.length; j++){
			const nextTime = plans[j];
			
			let prevStartTime = parseFloat(prevTime.traveTime.replace(':','.'));
			let nextStartTime = parseFloat(nextTime.traveTime.replace(':','.'));
			let prevEndTime = parseFloat(prevTime.traveTime.split(':')[0]) + (parseInt(prevTime.traveTime.split(':')[1]) + parseInt(prevTime.transTime.replace('분','')))/60;
			let nextEndTime = parseFloat(nextTime.traveTime.split(':')[0]) + (parseInt(nextTime.traveTime.split(':')[1]) + parseInt(nextTime.transTime.replace('분','')))/60;
			
			let timeArray = [prevStartTime, nextStartTime, prevEndTime, nextEndTime];
			for(let i = 0; i < timeArray.length; i++){
			    if(timeArray[i] < 4){
			        timeArray[i] += 24;
			    }
			}

			/* 조건식에 의해 겹치는지 확인 */
			if(
				(
					(timeArray[0] <= timeArray[1]) && (timeArray[2] >= timeArray[1])
					||
					(timeArray[0] <= timeArray[3]) && (timeArray[2] >= timeArray[3])
				)
			){
				let table = $j('.table_trave');
				let findName = '[name="seq"]';
				let comparator = nextTime.seq;
	
				let foundRow = findRowByValue(table, findName, comparator);
				printAlert('시간이 겹칩니다.', foundRow.find('.traveTime'));
				return false;
			}
		}
		
	}
	
	return true;
}

function findRowByValue(table, findName, comparator){
	const $table = table;
	let foundRow = null;
	$table.find('tbody > tr').each(function(){
		let key = $j(this).find(findName).val();
		if(key === comparator){
			foundRow = $j(this);
		}
	});
	return foundRow;
}

function searchTopTh(key){
	let table = $j(`.${key}`).closest('table');
	let column = $j(`.${key}`).closest('td').index(); // closest 말고 parent를 써도 됨. parent는 바로 위의 부모를 찾고 closest는 상위의 모든 태그를 검색할 수 있음. 
	let topTh = table.find('th').eq(column).text();
	return topTh;
}

/* alert 출력 및 focus */
function printAlert(str, key) {
    alert(str);

    // Check if key is a string
    if (typeof key === 'string') {
        $j(`.${key}`).focus();
    } else {
        key.focus();
    }
}

// 예상경비보다 견적경비가 더 클 경우 빨간색
function compareEstimatedVsQuote(){
		let table = $j('#user_list');
		let rows = table.find('tbody > tr');
		
		for(let i=0; i<rows.length; i++){
			let row = rows.eq(i);
			let userExpend = row.find('.user_expend');
			let offeredPrice = row.find('.offered_price');
			let parseUserExpend = parseInt(userExpend.text().replace(/,/g,''));
			let parseOfferedPrice = parseInt(offeredPrice.text().replace(/,/g,''));

			if(parseUserExpend < parseOfferedPrice){
				offeredPrice.css('color','white');
				offeredPrice.closest('td').css('background-color', 'red');
			}
		}
	}
