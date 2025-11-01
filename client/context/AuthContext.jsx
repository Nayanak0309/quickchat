import { createContext  } from "react";

const backendUrl = import.meta.evn.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ childern})=>{

    
    const value= {
        axios 

    }
    return(
        <AuthContext.Provider value={value}>
            {childern}
        </AuthContext.Provider>
    )
}