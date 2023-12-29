<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/views/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>login</title>
<style>
	*{
		margin: 0;
		padding: 0;
	}
	.container {
		width: 100%;
		height: 100vh;
	}
	.container .loginTable {
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%, -50%);
		border: 1px solid black;
		text-align: center;
		font-weight: bold;
	}
	.loginTable > tr, td {
		border: 1px solid black;
	}
	.loginTable input[type=text] {
		width: 200px;
	}
	input::placeholder {
		text-align: center;
	}

</style>
</head>
<body>
	<div class="container">
		<form class="loginForm">
			<table class="loginTable">
				<tr>
					<td>
						<label for="name">이름</label>
					</td>
					<td>
						<input type="text" name="name" id="name" placeholder="한글만 입력"/>
					</td>
				</tr>
				<tr>
					<td>
						<label for="phone">휴대폰번호</label>
					</td>
					<td>
						<input type="text" name="phone" id="phone" maxlength="13" placeholder="숫자만 입력해주세요."/>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="button" id="submit" value="로그인"/>
					</td>
				</tr>
			</table>
		</form>
	</div>
<script type="text/javascript">
	
	$j(document).ready(function(){
		
		$j("#name").on("input", function(e){
			let input = $j(this).val();
			const regex = /[a-zA-Z0-9]/g;
			
			let value = input.replace(regex, '');

			$j(this).val(value);
			
		});
		
		$j("#phone").on("input", function(e){
			let input = $j(this).val();
			const regex = /[^0-9]/g;
			
			let value = input.replace(regex, '');
			if(value.length > 3){
				value = value.slice(0,3)+"-"+value.slice(3);
			}
			if(value.length > 8){
				value = value.slice(0,8)+"-"+value.slice(8);
			}
				
			$j(this).val(value);
			
		});
		
		function blurPhone(){
			let input = $j('#phone').val();
			const regex = /^\d{3}-\d{3,4}-\d{4}$/
			
			// !! 는 boolean으로 강제형변환 시킨다.
			// !!이 붙은 input은 비어있다면 false 채워져있다면 true를 반환한다.
			if(!regex.test(input) && !!input){
				alert('휴대폰번호를 확인해주세요.');
				$j('#phone').focus();
				return false;
			}
			return true;
		};
		
		$j('#submit').on('click', function(){
			let login = {
					name : $j('#name').val(),
					phone : $j('#phone').val()
			};
			
			if(!validateInput() || !validateText(login) || !blurPhone()){
				return;
			}

			 $j.ajax({
				type: "POST",
				url: "/travel/login.do",
				data: JSON.stringify(login),
				dataType: 'json',
				contentType : "application/json;charset=UTF-8",
				success: function(data){
					if (data.redirect) {
	                    window.location.href = data.redirect; // 리다이렉트
	                }else{
	                	alert('다시 시도해주세요.');
	                }
				},
				error: function(xhr, error){
					console.log('Ajax error: '+error);
				}
			});
		});
		
		function validateText(input){
			let keys = Object.keys(input);

		    for (let key of keys) {
		        if(input[key] === ''){
		        	switch(key){
				        case 'name': {
				        	alert("이름을 입력하지 않았습니다.");
				        	break;
				        }
				        case 'phone': {
				        	alert("휴대폰번호를 입력하지 않았습니다.");
				        	break;
				        }
			        }
		        	$j('#'+key).focus();
			        return false;
		        }
		    }
			return true;
		}
		
		function validateInput(){
			let inputs = $j('input[type=text]');
			
			for(let i=0; i<inputs.length; i++){
				let input = inputs.eq(i).val();
				let inputLength = getByteLength(input);
				
				if(inputLength > 255){
					alert('입력값이 너무 깁니다.\n'+input);
					inputs.eq(i).focus();
					return false;
				}
			}
			
			return true;
		}
		
		function getByteLength(str){
			let byteLength = 0;
			
			for(let i=0; i<str.length; i++){
				const charCode = str.charCodeAt(i);
				if (charCode <= 0x007F) {
		            byteLength += 1;
		        } else if (charCode <= 0x07FF) {
		            byteLength += 2;
		        } else {
		            byteLength += 3;
		        } // if-elseif-else
			} // if
			
			return byteLength;
		}; // getByteLength

	});
	
</script>
</body>
</html>