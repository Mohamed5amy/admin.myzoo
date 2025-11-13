import {api} from './Axios';

// Get Banner
export const fetchBanner = async () => {
    try {
        const response = await api.get('/slide')
        return response.data;
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}


// Add Banner
export const addBanner = async (data) => {
    try {
        const response = await api.post('/slide' , data , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Add Banner
export const editBanner = async (data , id) => {
    try {
        const response = await api.post('/slide/' + id , data)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}

// Delete Banner
export const deleteBanner = async (id) => {
    try {
        const response = await api.delete('/slide/' + id)
        return response.data
    } catch (err) {
        return err.response.data.message || "Ops, something went wrong";
    }
}