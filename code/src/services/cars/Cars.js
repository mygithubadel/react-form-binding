import Axios from 'axios';
import config from '../../config';

const axios = Axios.create({
    baseURL: config.apiBaseUrl
});

export default class CarsService {

    getBrands() {
        return axios.get('/api/car/brands').then((res) => {
            return res.data;
        }).catch((err) => err);
    }

    getModels(id = '') {
        let append = '';
        if(id) append +=`/${id}`;

        return axios.get('/api/car/models'+append).then((res) => {
            return res.data;
        }).catch((err) => err);
    }

}
