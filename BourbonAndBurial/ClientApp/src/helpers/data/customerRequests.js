import axios from 'axios';

const apiUrl = 'api/customers';

const getAllCustomers = () => axios.get(`${apiUrl}`);

// const getAllCustomers = () => new Promise((resolve, reject) => {
//   axios.get(`${apiUrl}`)
//   .then((result) => {
//     resolve(result.data);
//   })
//   .catch((error) => {
//     reject(error);
//   });
// });

const getSingleCustomer = firebaseId => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${firebaseId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

// const getSingleCustomer = firebaseId => axios.get(`${apiUrl}/${firebaseId}`);


const createCustomer = customerObject => axios.post(`${apiUrl}`, (customerObject));

export default {
  getAllCustomers,
  getSingleCustomer,
  createCustomer
}
