function getToken(){
    token = localStorage.getItem('token');
    return token;
}

document.getElementById('add_new_user').addEventListener('submit', signuploginform);
function signuploginform(e){
	e.preventDefault()
  let token = getToken();
  const signup_url = 'http://127.0.0.1:5000/api/v2/auth/user';
  let data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    role:document.getElementById("role").value,
    password: document.getElementById("password").value
    }
  // save new user

  fetch(signup_url,{
    method:"POST",
    headers:{
      'Accept':'application/json',
			'Content-type':'application/json',
      "Authorization":'Bearer' + token
    },
    body:JSON.stringify({username:username,email:email,role:role,password:password})
  })
  .then((res) => res.json().then(data => ({status: res.status, body: data})))
	.then(res => {
		if(res.status == 201){
      document.getElementById('success_added')..innerHTML = res.body.message;

		}else if(res.status ==404){
				document.getElementById('error').innerHTML = "Wrong Credentials";
		}else if(res.body.message == 'Email exists'){
      document.getElementById('error_exists').innerHTML = 'Email exists';
    }else {
      document.getElementById('error_exists').innerHTML = 'Something went wrong';
    }
})
}
