import {api} from './Axios';

// Get All Categories
export const fetchSCategories = async () => {
    try {
        const response = await api.get('/category')
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Get Category
export const fetchSCategory = async (id) => {
    try {
        const response = await api.get('/category/' + id)
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}


// Add Category
export const addSCategory = async (data) => {
    try {
        const response = await api.post('/category' , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Add Category
export const editSCategory = async (data , id) => {
    try {
        const response = await api.post('/category/' + id , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Delete Category
export const deleteSCategory = async (id) => {
    try {
        const response = await api.delete('/category/' + id)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}