
document.getElementById('loginform').addEventListener('submit', LoginForm);

function LoginForm(e){
	e.preventDefault();
	let url = 'http://127.0.0.1:5000/api/v2/users/login';
	let email = document.getElementById('user_email').value;
	let password = document.getElementById('user_password').value;

	fetch(url,{
		method: 'POST',
		headers: {
			'Accept':'application/json',
			'Content-type':'application/json',

			mode: 'cors',

		},
		body:JSON.stringify({email:email,password:password}),
	})
	.then((res) => res.json().then(data => ({status: res.status, body: data})))
	.then((result) => {
		console.log(result.body);
		console.log(result.body.role);

		if(result.body.role == "Admin"){
				setToken(result)
				window.location.href = 'public/admin.html'
		}else if(result.body.role == "User"){
			setToken(result)
			window.location.href = 'public/home.html'

		
		}else{
				document.getElementById('error').innerHTML = result.body.message;
		}
})
}
