import axios from 'axios';

const apiUrl = 'api/customers';

const getAllCustomers = () => axios.get(`${apiUrl}`);

const getSingleCustomer = firebaseId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${firebaseId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

const createCustomer = customerObject => axios.post(`${apiUrl}`, (customerObject));

export default {
  getAllCustomers,
  getSingleCustomer,
  createCustomer
}
