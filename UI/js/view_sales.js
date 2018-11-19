	let products_url = 'http://127.0.0.1:5000/api/v2/sales';


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
  	let sales = data.sales;
  	let product_table  = document.getElementById('customers');
  	let result = `<tr>
   
    <th>Sale id</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>remaining_quantity</th>

      </tr>`;
  	sales.forEach(sales =>{
  		result +=`
            	<table>
          
                    <tr>
                    <td>${sales.sale_id}</td>
                    <td>${sales.product_name}</td>
                    <td>${sales.price}</td>
                    <td>${sales.quantity}</td>
                    <td>${sales.remaining_quantity}</td>
                    
                    </tr>
               
                
            </table>

            `
            product_table.innerHTML = result;
            })
  	        localStorage.setItem('sales', JSON.stringify(data.sales));

  	})