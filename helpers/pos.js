const axios = require('axios');

function getPrice(posId) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://pos-api.locafox.de/${process.env.TENANT_ID}/prices/?product_id=${posId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.POS_TOKEN}`,
    },
  };

  return axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return response.data.data;
    })
    .catch((error) => {
      console.log(error?.response?.data, error?.response?.data?.data);
      return {
        err: error?.response?.data,
        msg: 'POS get inventory changes error',
      };
    });
}

function updatePrice(posProduct, variant_id) {
  let data = JSON.stringify(posProduct);

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://pos-api.locafox.de/${process.env.TENANT_ID}/prices/1/${variant_id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.POS_TOKEN}`,
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response.data.success;
    })
    .catch((error) => {
      console.log(error?.response?.data, error?.response?.data?.data);
      return false;
    });
}

module.exports = { getPrice, updatePrice };
