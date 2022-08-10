import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addUser, singleUser, updateUser } from "../redux/action";
import userReducer from "../redux/reducer"
import { toast } from 'react-toastify';

const EditUser = () => {

    const { id } = useParams();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  //Accessing data from redux
  const user = useSelector((state)=>state.data.user)

  //whenver page open we fetch data of single user through its id
  useEffect(()=>{
 dispatch(singleUser(id))
  },[])

  //If user present then we fill the form with its detail
  useEffect(()=>{
    if(user){
     setState({...user})}
  },[user])

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { name, email, contact, address } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  



  //Update the user on click
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !address) {
      setError(true);
      setTimeout(()=>{
        setError(false);
      },3000)
      return;
    } else {
      dispatch(updateUser(state,id));
      toast.success("User Updated !", {
        position: toast.POSITION.TOP_RIGHT
      });
      navigate("/")
    }
 
  };

  //   console.log(state);
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Typography
            className="add_user_heading"
            fontWeight={600}
            fontSize={25}
            textAlign={"center"}
          >
            Edit User
          </Typography>
          <Grid marginTop="25px" container justifyContent="center">
            <Grid item xs={12} sm={4} lg={3}>
              <Grid>
                {error && (
                  <Typography color="red" textAlign="center">
                    Please fill all the fields
                  </Typography>
                )}
                <TextField
                  className="input_field"
                  id="standard-basic"
                  color="secondary"
                  label="Name"
                  margin="dense"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  name="name"
                  value={name || ""}
                />
              </Grid>
              <Grid>
                <TextField
                  className="input_field"
                  id="standard-basic"
                  color="secondary"
                  label="Email"
                  margin="dense"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  name="email"
                  value={email || ""}
                />
              </Grid>
              <Grid>
                {" "}
                <TextField
                  className="input_field"
                  id="standard-basic"
                  color="secondary"
                  label="Contact"
                  margin="dense"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  name="contact"
                  value={contact || ""}
                />
              </Grid>
              <Grid>
                {" "}
                <TextField
                  className="input_field"
                  id="standard-basic"
                  color="secondary"
                  label="Address"
                  margin="dense"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  name="address"
                  value={address || ""}
                />
              </Grid>

              <Button
                onClick={handleSubmit}
                sx={{ margin: "0 auto" }}
                className="add_user_btn"
                variant="contained"
                fullWidth
                type="submit"
              >
                Update
              </Button>

              <Link style={{ textDecoration: "none" }} to="/">
                <Button
                  sx={{ marginTop: "20px" }}
                  fullWidth
                  className="edit_btn"
                >
                  Go&nbsp;Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default EditUser;
