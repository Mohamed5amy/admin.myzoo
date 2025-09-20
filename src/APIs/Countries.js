import {api} from './Axios';

// Get All Countries
export const fetchCountries = async () => {
    try {
        const response = await api.get('/country')
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Get Country
export const fetchCountry = async (id) => {
    try {
        const response = await api.get('/country/' + id)
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}


// Add Country
export const addCountry = async (data) => {
    try {
        const response = await api.post('/country' , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Add Country
export const editCountry = async (data , id) => {
    try {
        const response = await api.put('/country/' + id , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Delete Country
export const deleteCountry = async (id) => {
    try {
        const response = await api.delete('/country/' + id)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}