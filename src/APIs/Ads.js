import {api} from './Axios';

// Get All Ads
export const fetchAds = async (page , minPrice, maxPrice, sorting, countries, cities, gcategories, categories, sCategories , status) => {
    try {
        const response = await api.get('/ad' , {
            params : {page , 
                min_price:minPrice, 
                max_price:maxPrice, 
                ...(sorting == 1 ? {newest:1} : {oldest : 1}), 
                countries : countries ? [countries] : "", 
                cities : cities ? [cities] : "", 
                general_categories : gcategories ? [gcategories] : "", 
                main_categories : categories ? [categories] : "", 
                categories : sCategories ? [sCategories] : "",
                status
            }
        })
        return response.data;
    } catch (err) {
        return err
    }
}

// Get Single Ad
export const fetchAd = async (id) => {
    try {
        const response = await api.get('/ad/' + id)
        return response.data;
    } catch (err) {
        return err
    }
}

// Change Ad Status
export const adStatus = async (id , status) => {
    try {
        const response = await api.post('/ad-status' , {id , status})
        return response.data
    } catch (err) {
        return err
    }
}