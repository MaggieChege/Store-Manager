//products test
require("../static/js/admin-products")
describe("Test Add Product", () => {
    let fetchMock;
    let assignMock;
    beforeEach(() => {
        document.body.innerHTML += `
        <form onsubmit="event.preventDefault();">
            <div class="col-75"><label >Product Name</label></div>
            <div class="col-75" class="col-75"><input id="name" type="text"  value="pname"></div>
            <div class="col-75"><label >Number_Of_Items</label></div>
            <div class="col-75"><input id="number" type="text"   value=20></div>
            <div class="col-75"><label >Price KSH</label></div>
            <div class="col-75"><input id="price" type="text"   value=200></div>
            <p id="output"></p>
            <a id="submit" onclick="addProduct()"> <input type="submit" value="AddProduct"></a>
        </form>`;
        fetchMock = jest.spyOn(global, "fetch")
        fetchMock.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ status: "Success!", message: "Product successfully added" })
        }))
        assignMock = jest.spyOn(window.location, "assign")
        assignMock.mockImplementation(() => {})
    })

    //Tear Down
    afterEach(() => {
        fetchMock.mockRestore();
        assignMock.mockRestore();
        jest.resetModules();
    })

    it("User can add a product", async() => {
        document.getElementById("submit").click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        let token = 'null';
        expect(fetchArgs[0]).toBe("https://storemanager-v2.herokuapp.com/api/v2/products");
        expect(fetchArgs[1]).toEqual({
            method: "POST",
            body: JSON.stringify({
                "name": "pname",
                "inventory": Number(20),
                "price": Number(200)
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(document.getElementById("output").innerHTML).toBe("Product successfully added");
        setTimeout(function() {
            expect(assignMock).toHaveBeenCalledTimes(1);
            expect(assignMock.mock.calls[0][0]).toBe("products.html");
        }, 3000)
    })
})
