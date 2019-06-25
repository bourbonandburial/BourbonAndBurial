import axios from 'axios';

const apiUrl = 'api/customers';

const getAllCustomers = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}`).then((result) => {
    const customers = result.data;
    resolve(customers);
  }).catch((error) => {
    reject(error);
  });
});

const getSingleCustomer = firebaseId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${firebaseId}`).then((result) => {
    const customerObject = result.data;
    resolve(customerObject[0]);
  })
    .catch((error) => {
      reject(error);
    });
});

const createCustomer = customerObject => axios.post(`${apiUrl}`, (customerObject));

const deleteCustomer = firebaseId => new Promise((resolve, reject) => {
  axios.delete(`${apiUrl}/${firebaseId}`).then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error)
    });
});

const updatedCustomer = customerToUpdate => new Promise((resolve, reject) => {
  axios.put(`${apiUrl}/${customerToUpdate.firebaseId}/update`, customerToUpdate).then((result) => {
    resolve(result.data);
  })
  .catch((error) => {
    reject(error);
  })
})

export default {
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  deleteCustomer,
  updatedCustomer
}
