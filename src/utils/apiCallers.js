import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export function doPost(url, payload, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload, {
        params,
        headers,
      })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data));
  });
}

export function doGet(url, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => reject(err?.response?.data));
  });
}

export function doGetById(url, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params, headers })
      .then(({ data }) => resolve({ ...data }))
      .catch((err) => reject(err?.response?.data));
  });
}

export function doPut(url, payload, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, payload, { params, headers })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data));
  });
}

export function doDelete(url, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { params, headers })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data));
  });
}

export function doPatch(url, payload, params, headers, cancelToken) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, payload, { params, headers })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err?.response?.data?.message));
  });
}

const ApiCallers = {
  doPost,
  doGet,
  doGetById,
  doPut,
  doPatch,
  doDelete,
};

export default ApiCallers;
