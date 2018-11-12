// function setToken(result){
//    return localStorage.setItem('token', result.body.token)
// }

// function getToken(){
//     token = localStorage.getItem('token');
//     return token;
// }

// document.getElementById('loginform').addEventListener('submit', loginform);

// function loginform(e){
// 	e.preventDefault();
// 	let url = 'http://127.0.0.1:5000/api/v2/users/login';
// 	let email = document.getElementById('user_email').value;
// 	let password = document.getElementById('user_password').value;

// 	fetch(url,{
// 		method: 'POST',
// 		headers: {
// 			'Accept':'application/json',
// 			'Content-type':'application/json',

// 			mode: 'cors',

// 		},
// 		body:JSON.stringify({email:email,password:password}),
// 	})
// 	.then((res) => res.json().then(data => ({status: res.status, body: data})))
// 	.then((res) => {
// 		if(res.body.message == "User was logged in succesfully"){
// 				setToken(res)
// 				window.location.href = 'home.html'
// 		}else{
// 				document.getElementById('error').innerHTML = "Wrong Credentials";
// 		}
// })
// }
