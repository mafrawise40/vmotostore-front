import axios from "axios";

class AuthService {


    static async logIn(formulario: any): Promise<any> {

        try {
            let response;

            response = await axios.post(`${import.meta.env.VITE_URL_BACK_NODE}/user/login`, formulario);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }

    }




}


export default AuthService;