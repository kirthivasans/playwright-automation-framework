class LoginPage {
    constructor(page){
        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.loginButton = page.getByRole('button', {name: "Login"});
    }
    
    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}

module.exports = LoginPage;