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

const AddSubCategory = (props) => {
    let history = useHistory();
    const [subcategory, setSubCategory] = useState({
        product_category_id: "",
        product_sub_category: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const onInputChange = (e) => {

        setSubCategory({
        ...subcategory,
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
        data.append("product_category_id",localStorage.getItem('products_catg_id'));
        data.append("product_sub_category",subcategory.product_sub_category);
        var v = document.getElementById("addIndivsub").checkValidity();
        var v = document.getElementById("addIndivsub").reportValidity();
        e.preventDefault();
        if(v){
            setIsButtonDisabled(true);
            axios({
                url: baseURL+"/web-create-sub-category",
                method: "POST",
                data,
                headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                if(res.data.code == '200'){
                    NotificationManager.success("Sub Categories Inserted Sucessfully");
                    
                    props.populateDonorNameSub('hi');
                    <Add message1="Test"/>
                }else{
                    NotificationManager.error("Duplicate Entry");
                }
                
            });
        }
    };

    return(
        <div className="textfields-wrapper">
            <RctCollapsibleCard>
        <form id="addIndivsub" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Sub Category"
                  autoComplete="Name"
                  name="product_sub_category"
                  value={subcategory.product_sub_category}
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
export default AddSubCategory;