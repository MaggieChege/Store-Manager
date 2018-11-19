function logout() {
    access_token = getToken()
    token_clear = localStorage.clear();
    window.location.href = 'index.html'
    // window.location.href = 'admin.html'
}
window.onload = function users(){
  let products_url = 'http://127.0.0.1:5000/api/v2/users';


  fetch(products_url,{
    method:"GET",
    Headers: {
      'Accept':'application/json',
      'Content-type':'application/json',
      // "Authorization":'Bearer' + access_token
    },
    })

  .then(respose => respose.json())
  .then((data) =>{
    console.log(data);
    let users = data.Users;
    let product_table  = document.getElementById('customers');
    let result =`<tr>
    <th>id</th>
        <th>Username</th>
        <th>Email</th>
        <th>Role</th>
       
      </tr>`;
    users.forEach(users =>{
      result +=`

      <table id="customers" >

      
      <tr>
         <td> ${users.id}</td>
         <td> ${users.username}</td>
        <td>${users.email}</td>
        <td>${users.role}</td>
        <td><button onclick="delete_products(`+users.product_id+`)">Delete</button></td>

      </tr>
    </table >
              

            `
            product_table.innerHTML = result;
            })
            localStorage.setItem('products', JSON.stringify(data.users));

    })
  }
