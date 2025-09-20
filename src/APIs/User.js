import {api} from './Axios';

// Get All Users
export const fetchUsers = async (page , status , search) => {
    try {
        const response = await api.get('/user' , {
            params : {page , is_blocked : status , search}
        })
        return response.data;
    } catch (err) {
        return err
    }
}
// Get Single User
export const fetchUser = async (id) => {
    try {
        const response = await api.get('/user/' + id)
        return response.data;
    } catch (err) {
        return err
    }
}

// Block User
export const blockUser = async (id) => {
    try {
        const response = await api.post('/user-status' , {user_id : id})
        return response.data
    } catch (err) {
        return err
    }
}