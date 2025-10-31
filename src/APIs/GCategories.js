import {api} from './Axios';

// Get All GCategories
export const fetchGCategories = async () => {
    try {
        const response = await api.get('/general-category')
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Get GCategory
export const fetchGCategory = async (id) => {
    try {
        const response = await api.get('/general-category/' + id)
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}


// Add GCategory
export const addGCategory = async (data) => {
    try {
        const response = await api.post('/general-category' , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Add GCategory
export const editGCategory = async (data , id) => {
    try {
        const response = await api.post('/general-category/' + id , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Delete GCategory
export const deleteGCategory = async (id) => {
    try {
        const response = await api.delete('/general-category/' + id)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}