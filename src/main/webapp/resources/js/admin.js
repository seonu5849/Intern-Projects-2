
$j(document).ready(function(){
	function replaceUserTransport(){
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
		
	}
	replaceUserTransport();
	
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

function createTempateTable(){
	let section = $j('#div_table');
	section.empty();
	section.append($j('.template_table').prop('content').cloneNode(true));
	
	const tbody = $j('.table_trave > tbody');
	tbody.empty();
	createTemplateRow(tbody);
}
	
let userTraveCity
let period;
function createTemplateRow(tbody){
	tbody.append($j('.template_row').prop('content').cloneNode(true));
	print_regions(userTraveCity);
	print_sub_regions();
}

let userSeq;
$j(document).on('click', '#user_list tbody tr', function(){
		let btnDiv = $j('.div_date_btn');
		
		btnDiv.empty();

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
		createTempateTable();
});

let traveDay = 1;
$j(document).on('click', '.date_btn', function(){
	let $confirm = confirm('저장하지 않고 이동시 데이터가 삭제됩니다.\n이동하시겠습니까?');
	
	if($confirm){
		$j('.date_btn').removeClass('active');
		$j(this).addClass('active');
		traveDay = $j(this).val();
		console.log(traveDay);
		
		createTempateTable();
	}
});

$j(document).on('click', '#add', function(){
	const tbody = $j('.table_trave > tbody');
	createTemplateRow(tbody);
});

$j(document).on('click', '#del', function(){
	let checkedArray = [];
	let checked = $j('.checkbox:checked');
	
	for(let i=0; i<checked.length; i++){
		checked[i].closest('tr').remove();
		
		if(checked.val() !== 'on'){
			checkedArray.push(checked.val());
		}
	}
	/*AJAX*/
	
});

$j(document).on('change', '.traveTime, .traveTrans, .transTime', function() {
    let traveTrans = $j(this).closest('tr').find('.traveTrans').val();
    let transTime = $j(this).closest('tr').find('.transTime').val();
    let traveTime = $j(this).hasClass('traveTime') ? $j(this).val() : $j(this).closest('tr').find('.traveTime').val();
    let traveCost = $j(this).closest('tr').find('.traveCost');

    travelCostsCalculate(traveTime, traveTrans, transTime, traveCost);
});

function travelCostsCalculate(traveTime, traveTrans, transTime, traveCost){
	traveCost.empty();
	let $traveCost = 0;
	let $transTime = transTime.replace('분','');

	switch(traveTrans){
		case 'B':{
			console.log('버스');
			const basicPrice = 1400;
			$traveCost = busAndSubwaySurchargeCalculator(basicPrice, $transTime);
			break;
		}
		case 'S':{
			console.log('지하철');
			const basicPrice = 1450;
			$traveCost = busAndSubwaySurchargeCalculator(basicPrice, $transTime);
			break;
		}
		case 'T':{
			console.log('택시');
			const basicPrice = 3800;
			$traveCost = taxiSurchargeCalculator(basicPrice, traveTime, $transTime);
			
			break;
		}
		case 'R':{
			console.log('렌트');
			const basicPrice = 100000;
			$traveCost = rentSurchargeCalculator(basicPrice, transTime);
			break;
		}
		case 'C':{
			console.log('자차');
			break;
		}
		default:{
			console.log('도보');
		}
	}
	traveCost.text(`${$traveCost.toLocaleString()}원`);
}

function busAndSubwaySurchargeCalculator(basicPrice, transTime){ // 버스, 지하철 교통비 할증 로직
	let $traveCost = basicPrice;
	$traveCost += Math.floor(transTime / 20) * 200;
	return $traveCost;
}

function taxiSurchargeCalculator(basicPrice, traveTime, transTime){ // 택시 교통비 할증 로직
	let $traveCost = basicPrice;
	
	$traveCost += Math.floor(transTime / 10) * 5000;

	if(traveTime > '22' && traveTime < '24'){
		$traveCost = $traveCost + ($traveCost * 0.2);
	}
	if(traveTime > '00' && traveTime < '04'){
		$traveCost = $traveCost + ($traveCost * 0.4);
	}
	return $traveCost;
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
	let plans = validateArrayEntityEmpty(arrayTravelPlan());
	console.log(typeof plans);
	
	console.log(JSON.stringify({plans : plans}));
	$j.ajax({
		type: 'POST',
		url: '/travel/admin.do',
		data: JSON.stringify({plans : plans}),
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			if(data.result === 1){
				alert('저장완료');
			}else{
				alert('저장실패');
			}
		},
		error: function(xhr, error){
			console.log('Ajax fail Message : '+error);
		}
	})
});

function arrayTravelPlan(){ // array plan 생성
	let arrayPlans = [];
	
	$j('.table_trave  tr.plan_row').each(function(){
		let expend = parseInt($j(this).find('.useExpend').val().replace(/,/g,''));
		let cost = parseInt($j(this).find('.traveCost').text().replace(/[원,]/g,''));
		
		let plan = {
			seq: $j(this).find('.seq').val(),
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
		
		if(plan.useExpend){
			let resultCost = (cost === 0) ? '' : cost;
			plan.useExpend = parseInt(plan.useExpend + resultCost).toLocaleString();
		}
		
		arrayPlans.push(plan);
	});
	return arrayPlans;
}

// 배열을 받아와 하나씩 풀어내면서 조건에 해당된다면 배열에 담지 않고, 만족하지 않으면 배열에 담아서 출력한다.
function validateArrayEntityEmpty(arrayEntity){
	let entitys = [];
	entitys = arrayEntity.filter((entity, i) => {
	    if (!validateEntityEmpty(entity, i)) {
	        return false; // 필터링할 요소
	    }
	    return true; // 유지할 요소
	});
	return entitys;
}

function validateEntityEmpty(entity, i){
	let entityKeys = Object.keys(entity);
	if(entityKeys.filter(key => entity[key] !== '').length < 6){
		return;
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

function validateDayTime(traveTime){
	/*let result = (traveTime >)*/
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

