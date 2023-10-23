class Auth {

    static AUTH_TOKEN_KEY = "token";

    static getHeaderAuth(): any {

        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem(Auth.AUTH_TOKEN_KEY)}`
            }
        };

        console.log(headers);

        return headers;
    }

    static setHeaderAuth(token: any) {
        localStorage.setItem(Auth.AUTH_TOKEN_KEY, token);
    }

    static isAuthTokeExist(): boolean {

        if (localStorage.getItem(Auth.AUTH_TOKEN_KEY)) {
            return true;
        }
        return false;
    }

    static destroStorage() {

        localStorage.clear();
    }


}

export default Auth;