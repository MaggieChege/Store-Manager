// / add product
function setToken(result){
   return localStorage.setItem('access_token', result.body.access_token)
}

function getToken(){
    access_token = localStorage.getItem('access_token');
    return access_token;
}

access_token = getToken()
document.getElementById('add_new_product').addEventListener('click',products)
function products(e){
	e.preventDefault()
  let product_name = document.getElementById("product_name").value;
	let category = document.getElementById("category").value;
  var quantity = document.getElementById("quantity").value;
  var price = document.getElementById("price").value;



	let data = {product_name: product_name,
				category: category,
        price: price,
				quantity: quantity}

    fetch('http://127.0.0.1:5000/api/v2/products',{
    method:"POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json', 
  
      mode: 'cors',
      "Authorization": 'Bearer ' + access_token
    },
    body:JSON.stringify(data)
    })
  .then(result => result.json().then(data => ({status: result.status, body: data})))
  .then(result => {
    console.log(result)
    console.log(result.body.data)
    if(result.status == 201){
      document.getElementById('success_added').innerHTML = result.body.message;
      window.location.reload();
    }else if(result.status == 404){
            document.getElementById('error').innerHTML = result.body.message;
    }else if(result.status == 409){
            document.getElementById('error').innerHTML = result.body.message;
    }else{
            document.getElementById('error').innerHTML = "something wrong happened";
        }
})

}
