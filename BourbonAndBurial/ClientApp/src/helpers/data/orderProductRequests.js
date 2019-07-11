import axios from 'axios';

const apiUrl = "/api/orderproduct";

const addOrderProduct = newOrderObject => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}`, newOrderObject).then((result) => {
    resolve(result);
  })
    .catch(error => reject(error));
});

const getProductDetailsForOrder = (orderId) => new Promise((resolve, reject) => {
  axios
    .get(`${apiUrl}/${orderId}`)
    .then((results) => {
      const orderFiilteredById = results.data;
      resolve(orderFiilteredById);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  addOrderProduct,
  getProductDetailsForOrder
};