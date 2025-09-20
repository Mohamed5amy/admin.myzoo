import {api} from './Axios';

// Get All Categories
export const fetchCategories = async () => {
    try {
        const response = await api.get('/main-category')
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Get Category
export const fetchCategory = async (id) => {
    try {
        const response = await api.get('/main-category/' + id)
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}


// Add Category
export const addCategory = async (data) => {
    try {
        const response = await api.post('/main-category' , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Add Category
export const editCategory = async (data , id) => {
    try {
        const response = await api.post('/main-category/' + id , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Delete Category
export const deleteCategory = async (id) => {
    try {
        const response = await api.delete('/main-category/' + id)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}