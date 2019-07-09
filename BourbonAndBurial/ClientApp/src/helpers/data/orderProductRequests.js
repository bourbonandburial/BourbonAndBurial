import axios from 'axios';

const apiUrl = "/api/orderproduct";

const addOrderProduct = newOrderObject => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}`, newOrderObject).then((result) => {
    resolve(result);
  })
    .catch(error => reject(error));
});

export default {
  addOrderProduct,
};