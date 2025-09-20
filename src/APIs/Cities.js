import {api} from './Axios';

// Get All Cities
export const fetchCities = async () => {
    try {
        const response = await api.get('/city')
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Get City
export const fetchCity = async (id) => {
    try {
        const response = await api.get('/city/' + id)
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}


// Add City
export const addCity = async (data) => {
    try {
        const response = await api.post('/city' , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Add City
export const editCity = async (data , id) => {
    try {
        const response = await api.put('/city/' + id , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Delete City
export const deleteCity = async (id) => {
    try {
        const response = await api.delete('/city/' + id)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}