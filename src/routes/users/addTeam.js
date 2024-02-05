import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';

const Add = (props) => {

    let history = useHistory();
    const [team, setTeam] = useState({
        full_name: "",
        name: "",
        email: "",
        mobile: "",
        address: "",
        state: "",
        pincode: "",
        password: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
           return true;
         }else{
           return false;
         }
      }

    const onInputChange = (e) => {
        if(e.target.name=="mobile"){
            if(validateOnlyDigits(e.target.value)){
                setTeam({
                ...team,
                [e.target.name]: e.target.value,
              });
            }
        }else if(e.target.name=="pincode"){
            if(validateOnlyDigits(e.target.value)){
                setTeam({
                ...team,
                [e.target.name]: e.target.value,
              });
            }
        }else{
            setTeam({
                ...team,
                [e.target.name]: e.target.value,
            });
        }
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const [state, setState] = useState([]);
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        var theLoginToken = localStorage.getItem('login');       
            
        const requestOptions = {
                method: 'GET', 
                headers: {
                'Authorization': 'Bearer '+theLoginToken
                }             
        };     


        fetch(baseURL+'/web-fetch-state', requestOptions)
        .then(response => response.json())
        .then(data => setState(data.state)); 
    }, []);
    

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("full_name",team.full_name);
        data.append("name",team.name);
        data.append("email",team.email);
        data.append("mobile",team.mobile);
        data.append("address",team.address);
        data.append("state",team.state);
        data.append("pincode",team.pincode);
        data.append("password",team.password);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-team",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Team Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Team" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="select-corrpreffer"
                  required
                  label="Full Name"
                  autoComplete="Name"
                  name="full_name"
                  value={team.full_name}
                  onChange={(e) => onInputChange(e)}
                  
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Username"
                  autoComplete="Name"
                  name="name"
                  value={team.name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="email"
                  required
                  label="Email"
                  autoComplete="Name"
                  name="email"
                  value={team.email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile"
                  required
                  autoComplete="Name"
                  name="mobile"
                  value={team.mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-8">
              <div className="form-group">
                <TextField
                  fullWidth
                    label="Address"
                  autoComplete="Name"
                  name="address"
                  value={team.address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="State"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  autoComplete="Name"
                  name="state"
                  value={team.state}
                  onChange={(e) => onInputChange(e)}
                >
                     {state.map((source, key) => (
                    <MenuItem key={source.state} value={source.state}>
                      {source.state}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Pincode"
                  autoComplete="Name"
                  name="pincode"
                  value={team.pincode}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Password"
                  required
                  autoComplete="Name"
                  name="password"
                  value={team.password}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
            <Link to="listing">
              <Button className="mr-10 mb-10" color="success">
                Back
              </Button>
            </Link>
          </div>
            </div>
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;
