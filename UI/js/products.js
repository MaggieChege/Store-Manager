// // get all products
// function getToken(){
//     token = localStorage.getItem('token');
//     return token;
// }
// token = getToken()
// window.onload = function products(){
// 	let products_url = 'http://127.0.0.1:5000/api/v2/products';


//   fetch(products_url,{
//     method:"GET",
//     Headers: {
// 			'Accept':'application/json',
// 			'Content-type':'application/json',
//       "Authorization":'Bearer' + token
//     },
//     })

//   .then(respose => respose.json())
//   .then((data) =>{
//     let products = data.products;
//     let output = '<h1>products</h1>'
//     // let product_table = document.getElementById('my_products');
//     //
//     //
//     //       product_table.innerHTML = th
//           data.forEach(function(products){
//             output +=`
//             <h5>${product.productid}</h5>


//             `

//                   // '<td>'+product.productid+'</td>'+
//                   // '<td>'+product.product_name+'</td>'+
//                   // '<td>'+product.price+'</td>'+
//                   // '<td>'+product.product_quantity+'</td>'+
//                   '<td><a href="edit_product.html"><button id="edit_product">Edit</button></a>'+
//                   '&nbsp;&nbsp;'+
//                   '<button id="delete_product">Delete</button></td>'+
//                   '</tr>';
//           })
//   })
// }
