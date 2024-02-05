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
import MenuItem from "@material-ui/core/MenuItem";

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];

const Edit = (props) => {

    let history = useHistory();
    const [category, setCategory] = useState({
        product_category: "",
        product_category_status: "",
        product_category_image: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const [selectedFile, setSelectedFile] = React.useState(null);

    const onInputChange = (e) => {

        setCategory({
        ...category,
        [e.target.name]: e.target.value,
        });
    
    };

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-category-by-Id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setCategory(res.data.productCategory)
      
          });
        }, []);

    const onSubmit = (e) => {
        
        const data = new FormData();
        data.append("product_category",category.product_category);
        data.append("product_category_status",category.product_category_status);
        data.append("product_category_image",selectedFile);
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-category/"+id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Categories Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Categories" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off" style={{paddingLeft:'10%',paddingRight:'10%'}}>
          <div className="row">
          <div className="col-md-4 col-12 mt-4">
              <img src={"https://decopanel.in/storage/app/public/product_category/"+category.product_category_image} style={{width:'215px',height:'215px'}}/>
            </div>
            <div className="col-md-8 col-12 mt-4">
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Category"
                  autoComplete="Name"
                  name="product_category"
                  value={category.product_category}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="Image"
                  autoComplete="Name"
                  name="product_category_image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="product_category_status"
                  value={category.product_category_status}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Update
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

export default Edit;
