import axios from 'axios';

const apiUrl = 'api/customers';

const getAllCustomers = () => axios.get(`${apiUrl}`);

const getSingleCustomer = firebaseId => axios.get(`${apiUrl}/${firebaseId}`);

const createCustomer = customerObject => axios.post(`${apiUrl}`, (customerObject));

export default {
  getAllCustomers,
  getSingleCustomer,
  createCustomer
}
