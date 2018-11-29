//Login test
require("../UI/public/js/Login")
describe("Test user login", () => {
    let fetchMock;
    let assignMock;
    beforeEach(() => {
        document.body.innerHTML += `
        <div class="container">
    <fieldset>
    <legend align="right"><b>Login</b></legend>
    <form id="loginform">
        <img src="public/img/user_avatar.png">
        <div class="form-input">
            <label class="email_b">
            <input type="text" name="email" id="user_email" placeholder="Enter email" id="envelope" required="">

            </label>
        </div>
        <div class="form-input">
            <label class="pass_b">
            <input type="password" id="user_password" name="password" placeholder="Enter password" class="fa-lock" required="">
            </label>
        </div>
        <form>
        <button id="login_users" value="login" class="btn-login">LOGIN </button></a>
        </form>
        <div class="alert alert-danger"  id="error" style="color:red;">
  <!-- <strong>Danger!</strong> Indicates a dangerous or potentially negative action. -->
</div>


    </form>

    </fieldset>
</div>`;

        fetchMock = jest.spyOn(global, "fetch")
        fetchMock.mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ status: "Success!", access_token: "access_token" })
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

    it("User can login", async() => {
        document.getElementById("submit").click();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const fetchArgs = fetchMock.mock.calls[0];
        expect(fetchArgs[0]).toBe("https://storemanager-v2.herokuapp.com/api/v2/auth/login");
        expect(fetchArgs[1]).toEqual({
            method: "POST",
            body: JSON.stringify({
                email: "email@gmail.com",
                password: "password"
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            }
        })
        await Promise.resolve().then();
        await Promise.resolve().then();
        expect(localStorage.getItem("access_token")).not.toBeNull();
        expect(assignMock).toHaveBeenCalledTimes(1);
        expect(assignMock.mock.calls[0][0]).toBe("products.html");
    })
})
