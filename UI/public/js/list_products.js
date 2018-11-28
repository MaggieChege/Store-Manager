function setToken(result){
   return localStorage.setItem('access_token', result.body.access_token)
}

function getToken(){
    access_token = localStorage.getItem('access_token');
    return access_token;
}

access_token = getToken()


window.onload = function Products(){
 let products_url = 'http://127.0.0.1:5000/api/v2/products';


  fetch(products_url,{
    method:"GET",
    Headers: {
     'Accept':'application/json',
     'Content-type':'application/json',
     "Authorization":'Bearer' + access_token
    },
    })

  .then(respose => respose.json())
  .then((data) =>{
   console.log(data);
   let products = data.products;
   console.log(products)
   let product_table  = document.getElementById('customers');
   header = `
   <tr class="header">
    <th>Product_id</th>
        <th>Product Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Delete</th>
        <th>Update</th>

      </tr>`
    product_table.innerHTML=header

    products.forEach(function(product){
      // console.log(product.price)
      let item=JSON.stringify(product)
      item="  "+ item +"  "
    

      product_table.innerHTML += '<tr>'+
      '<td>'+product.product_id +'</td>'+
      '<td>'+product.product_name+'</td>'+
      '<td>'+product.category+ '</td>'+
      '<td>'+product.quantity + '</td>'+
      '<td>'+product.price+ '</td>'+
      '<td>'+ `<button onclick='setEditForm(${item})'>update</button>` + '</td>'+
      '<td>'+ `<button onclick='DeleteProducts(${product.product_id})'>Delete</button>` + '</td>'+  
              // <td><button onclick="DeleteProducts(`+product.product_id+`)">Delete</button></td>

      '</tr>';

    });
  })
}


// window.onload = function Products(){
// 	let products_url = 'http://127.0.0.1:5000/api/v2/products';


//   fetch(products_url,{
//     method:"GET",
//     Headers: {
// 			'Accept':'application/json',
// 			'Content-type':'application/json',
// 			"Authorization":'Bearer' + access_token
//     },
//     })

//   .then(respose => respose.json())
//   .then((data) =>{
//   	console.log(data);
//   	let products = data.products;
//   	let product_table  = document.getElementById('customers');
//   	let result = `<tr>
//     <th>Product_id</th>
//         <th>Product Name</th>
//         <th>Category</th>
//         <th>Price</th>
//         <th>Quantity</th>
//         <th>Delete</th>
//         <th>Update</th>

//       </tr>`;
//   	products.forEach(product =>{
//       let item=JSON.stringify(product)
//       console.log(item)
//   		item +=`

//       <table id="customers">

      
//       <tr>
//         <td> ${product.product_id}</td>
//         <td> ${product.product_name}</td>
//         <td>${product.category}</td>
//         <td>${product.quantity}</td>
//         <td>${product.price}</td>
        // <td><button onclick="DeleteProducts(`+product.product_id+`)">Delete</button></td>
//         <td><button onclick="setEditForm(`+item+`)">Update</button></td>

//       </tr>
//     </table >
            	

//             `
//             product_table.innerHTML = result;
//             })
//   	        localStorage.setItem('products', JSON.stringify(data.products));

//   	})
//   }

  function Popup(product){
  document.getElementById("myForm").style.display = "block";
  document.getElementById('product_id').value = product_id
  // document.getElementById('product_id').value = product_id
  // document.getElementById('product_id').value = product_id

}
function setEditForm(product){

document.getElementById('product_id').value=product.product_id;
document.getElementById('product_name').value=product.product_name
document.getElementById('category').value=product.category;
document.getElementById('quantity').value=product.quantity
document.getElementById('price').value=product.price

  console.log(product)


}
document.getElementById('update_product').addEventListener('click',UpdateProducts)
function UpdateProducts(e){
  e.preventDefault()
  // document.getElementById("product_id").value =product_id
  // console.log(product_id)
// document.getElementById('product_id').value=product.product_id;

  let product ={
    product_id:document.getElementById("product_id").value,
  product_name:document.getElementById("product_name").value,
  category :document.getElementById("category").value,
  price:document.getElementById("price").value,
  quantity:document.getElementById("quantity").value
  } 
  fetch('http://127.0.0.1:5000/api/v2/products/'.concat(product.product_id),{
    method:'PUT',
    headers:{
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + access_token,
            mode: 'cors'

        },
        body:JSON.stringify(product)
      })
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
      console.log(result.body)
      // window.location.reload();
      if(result.status == 200){
        document.getElementById('success').innerHTML = "Product successfully updated";
      }else if(result.status ==500){
      document.getElementById('error').innerHTML = "Please Login";
      window.setTimeout("location.href = '../index.htmll';",3000)
      }else{
        document.getElementById(error).innerHTML = result.body.message;
      }
    
        // window.location.reload();
    })
}
  // delete product
function DeleteProducts(id) {
    let url = 'http://127.0.0.1:5000/api/v2/products/'.concat(id);

    fetch(url,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization':'Bearer ' + access_token
        }})
    .then(result =>  result.json().then(data => ({status: result.status, body: data})))
    .then(result => {
      console.log(result.body)
      // window.location.reload();
      if(result.status == 200){
        document.getElementById('success').innerHTML = "Deleted Successfully";
            alert("This Product will be deleted!!");
          window.location.reload();


      }else if(result.status == 500){
      document.getElementById('error').innerHTML = "Please Login";
      window.setTimeout("location.href = '../index.html';",3000)
      }else{
        document.getElementById(error).innerHTML = result.body.message;
      }
    
        // window.location.reload();
    })
}

