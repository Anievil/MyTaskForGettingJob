import axios from 'axios';

const http = axios.create({
    baseURL: 'http://smktesting.herokuapp.com/api/products/',
    responseType: 'json',
});
// получение списка продуктов
const getProduct = async () => {
    try{
        const { data } = await http.get();
        console.log(data)
        return data;
    }
    catch(err){
        console.log(err);
    }
};

export default getProduct;