import axios from 'axios';

const apiUrl = 'api/payments';

const getActivePayments = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}`).then((result) => {
    const activePayments = result.data;
    resolve(activePayments);
  }).catch((error) => {
    reject(error);
  });
});

const getAllPayments = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/all`).then((result) => {
    const allPayments = result.data;
    resolve(allPayments);
  }).catch((error) => {
    reject(error);
  });
});

const getCustomerPayments = customerId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${customerId}`).then((result) => {
    const customerActivePayments = result.data;
    resolve(customerActivePayments);
  }).catch((error) => {
    reject(error);
  });
});

const createCustomerPayment = customerPaymentObject => axios.post(`${apiUrl}`, (customerPaymentObject));

export default {
  getActivePayments,
  getAllPayments,
  getCustomerPayments,
  createCustomerPayment,
}