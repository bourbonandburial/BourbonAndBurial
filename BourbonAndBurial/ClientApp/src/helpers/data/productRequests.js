import axios from 'axios';

const apiUrl = "/api/product";

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(apiUrl)
    .then((result) => {
      const productObject = result.data;
      resolve(productObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllCremationProducts = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/cremation`)
    .then((result) => {
      const productObject = result.data;
      resolve(productObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteProduct = productId => axios.delete(`${apiUrl}/${productId}`);

export default {
  getAllProducts,
  getAllCremationProducts,
  deleteProduct
};