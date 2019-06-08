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

const getAllMausoleumProducts = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/mausoleum`)
    .then((result) => {
      const productObject = result.data;
      resolve(productObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllBurialProducts = () => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/burial`)
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
  getAllBurialProducts,
  getAllMausoleumProducts,
  deleteProduct
};