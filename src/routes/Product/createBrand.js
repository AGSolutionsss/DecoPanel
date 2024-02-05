import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import {  NotificationManager,} from "react-notifications";
import {baseURL} from '../../api';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Add from "./addProduct";

const AddBrand = (props) => {
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
        var v = document.getElementById("addIndivbrands").checkValidity();
        var v = document.getElementById("addIndivbrands").reportValidity();
        e.preventDefault();
        if(v){
            setIsButtonDisabled(true);
            axios({
                url: baseURL+"/web-create-brand",
                method: "POST",
                data,
                headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                if(res.data.code == '200'){
                    NotificationManager.success("Brand Inserted Sucessfully");
                    
                    props.populateDonorNameBrand('hi');
                    <Add message2="Test"/>
                }else{
                    NotificationManager.error("Duplicate Entry");
                }
                
            });
        }
    };

    return(
        <div className="textfields-wrapper">
            <RctCollapsibleCard>
        <form id="addIndivbrands" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
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
            
          </div>
            </div>
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
        </div>
    );
}
export default AddBrand;