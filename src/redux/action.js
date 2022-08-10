import * as types from "./actionType";
import axios from "axios";
const URL = "http://localhost:5000/user";

//Get User

const getUsers = (users) => ({
  type: types.GET_USER,
  payload: users,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${URL}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getUsers(res.data));
      })
      .catch((err) => console.log(err));
  };
};

//Delete User

const userDeleted = () => ({
  type: types.DELETE_USER,
});

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`${URL}/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(userDeleted(res.data));
      })
      .catch((err) => console.log(err));
  };
};

//Add User
const userAdded = () => ({
  type: types.ADD_USER,
});

export const addUser = (user) => {
  return function (dispatch) {
    axios
      .post(`${URL}`, user)
      .then((res) => {
        console.log(res.data);
        dispatch(userAdded());
      })
      .catch((err) => console.log(err));
  };
};


//Get Single User
const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

export const singleUser = (id) => {
  return function (dispatch) {
    axios
    .get(`${URL}/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(getUser(res.data));
      })
      .catch((err) => console.log(err));
  };
};



//Update User

const userUpdated = (user) => ({
  type: types.UPDATE_USER,
 
});


export const updateUser = (user,id) => {
  return function (dispatch) {
    axios
    .put(`${URL}/${id}`,user)
      .then((res) => {
        console.log(res.data);
        dispatch(userUpdated());
    
      })
      .catch((err) => console.log(err));
  };
};
