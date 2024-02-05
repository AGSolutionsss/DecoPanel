import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';

const Add = (props) => {

    let history = useHistory();
    const [brand, setBrand] = useState({
        brands_name: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const onInputChange = (e) => {

        setBrand({
        ...brand,
        [e.target.name]: e.target.value,
        });
    
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const onSubmit = (e) => {
        
        const data = new FormData();
        data.append("brands_name",brand.brands_name);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
 
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-brand",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Brand Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Brand" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Brand"
                  autoComplete="Name"
                  name="brands_name"
                  value={brand.brands_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-6">
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
