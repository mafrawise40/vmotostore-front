/*import { createContext, useEffect, useState } from 'react';
import Auth from '../utils/AuthUtils';

interface AuthContextData {
    isLogado: boolean,
    logar(),
    logout()


}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
    const [isLogado, setIsLogado] = useState(false);

    useEffect(() => {
        async function getDadosStorage() {
            if (Auth.isAuthTokeExist()) {
                setIsLogado(true);
            }

        }
    }, []);

    async function logar() {
        setIsLogado(true);

    }

    async function logout() {
        setIsLogado(false);

    }

    return (
        <AuthContext.Provider value={{ isLogado: isLogado, logar, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
*/