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

const getCustomerOrders = customerId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/customer/${customerId}`)
    .then((result) => {
      resolve(result.data);
    }).catch((error) => {
      reject(error);
    });
});


const getSingleOrder = (orderId) => new Promise((resolve, reject) => {
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

const addOrder = (newOrderObject) => new Promise((resolve, reject) => {
  axios.post(`${apiUrl}/order`, newOrderObject).then((result) => {
    resolve(result);
  })
    .catch(error => reject(error));
});

export default {
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  getCustomerOrders,
  addOrder
};