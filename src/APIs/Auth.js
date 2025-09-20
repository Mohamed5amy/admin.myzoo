import {api} from './Axios';

// Login API that can login with (phone or email) and password 
export const loginRequest = async (email, password) => {
    try {
        const response = await api.post('/login' , {email,password})
        return {success : true , data: response.data.data};
    } catch (err) {
        return {success: false, error: err.response.data.message || "Ops, Something went wrong"};
    }
}