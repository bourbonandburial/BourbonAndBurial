import axios from 'axios';

const apiUrl = 'api/customers';

const getAllCustomers = () => axios.get(`${apiUrl}`);

const createCustomer = customerObject => axios.post(`${apiUrl}`, (customerObject));

export default {
  getAllCustomers,
  createCustomer
}
