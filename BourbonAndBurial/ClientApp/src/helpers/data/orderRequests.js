import axios from 'axios';

const apiUrl = "/api/order";

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((result) => {
      const orderObject = result.data;
      resolve(orderObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleOrder = orderId => new Promise((resolve, reject) => {
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

const deleteOrder = orderId => axios.delete(`${apiUrl}/${orderId}`);

export default {
  getAllOrders,
  getSingleOrder,
  deleteOrder
};