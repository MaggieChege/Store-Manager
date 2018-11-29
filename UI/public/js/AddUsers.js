

// ADD USERS
function setToken(result){
   return localStorage.setItem('access_token', result.body.access_token)
}

function getToken(){
    access_token = localStorage.getItem('access_token');
    return access_token;
}

access_token = getToken()
document.getElementById('add_new_user').addEventListener('click', SignUp);
function SignUp(e){
	e.preventDefault()
  
  let username= document.getElementById("username").value;
  let email= document.getElementById("email").value;
  let role=document.getElementById("role").value;
  let password= document.getElementById("password").value;
    
  // save new user

  fetch('http://127.0.0.1:5000/api/v2/auth/user',{
    method:"POST",
    headers:{
      'Accept': 'application/json',
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            mode: 'cors',
            'Authorization':'Bearer ' + access_token

    },
    body:JSON.stringify({username:username,email:email,role:role,password:password})
  })
  .then((res) => res.json().then(data => ({status: res.status, body: data})))
	.then(res => {
    console.log(res)
    console.log(res.body)
    if(res.status == 201){
      document.getElementById('success_added').innerHTML = res.body.message;

		}else if(res.status ==404){
      document.getElementById('error').innerHTML = "Wrong Credentials";
		}else if(res.status ==500){
      document.getElementById('error').innerHTML = "Please Login";
      window.setTimeout("location.href = '../index.html';",3000)
    }
    else if(res.body.message == 'Email exists'){
      document.getElementById('error').innerHTML = res.body.message;
    }else {
      document.getElementById('error').innerHTML = 'Something went wrong';
    }
})
}
