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

const getPackageProducts = (pkg) => new Promise((resolve, reject) => {
  axios.get(`${apiUrl}/${pkg}`)
    .then((result) => {
      const productObject = result.data;
      resolve(productObject);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteProduct = productId => axios.delete(`${apiUrl}/${productId}`);

const getSingleProduct = productId => new Promise((resolve, reject) => {
  axios
    .get(`${apiUrl}/${productId}`)
    .then((results) => {
      const productFilteredById = results.data;
      resolve(productFilteredById);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getAllProducts,
  getPackageProducts,
  deleteProduct,
  getSingleProduct
};