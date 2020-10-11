//we use this dynamic fetch in any element we want instead of retyping it every where

const URL = "https://mashriq.herokuapp.com/dash/v1/";

export const loginApi = (data, callback) => {
  fetch(`${URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    // using callback to either send data or error
    .then((res) => res.json())
    .then((restult) => callback(null, restult))
    .catch((err) => callback(err, null));
};

export const addData = (data, callback) => {
  fetch(`${URL}article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("blog_token"),
    },
    body: JSON.stringify(data),
  })
    // using callback to either send data or error
    .then((res) => res.json())
    .then((restult) => callback(null, restult))
    .catch((err) => callback(err, null));
};

export const getData = (callback) => {
  fetch(`${URL}articles`)
    // using callback to either send data or error
    .then((res) => res.json())
    .then((restult) => callback(null, restult))
    .catch((err) => callback(err, null));
};

export const editData = (id, data, callback) => {
  fetch(`${URL}article/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("blog_token"),
    },
    body: JSON.stringify(data),
  })
    // using callback to either send data or error
    .then((res) => res.json())
    .then((restult) => callback(null, restult))
    .catch((err) => callback(err, null));
};

export const getOne = (id, callback) => {
  fetch(`${URL}article/${id}`)
    // using callback to either send data or error
    .then((res) => res.json())
    .then((restult) => callback(null, restult))
    .catch((err) => callback(err, null));
};
