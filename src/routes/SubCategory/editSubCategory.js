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
    const [subcategory, setSubCategory] = useState({
        product_category_id: "",
        product_sub_category: "",
        product_sub_category_status: "",
        product_sub_category_image: "",
    });

    const [selectedFile, setSelectedFile] = React.useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const onInputChange = (e) => {

        setSubCategory({
        ...subcategory,
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
            url: baseURL+"/web-fetch-sub-category-by-Id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setSubCategory(res.data.productSubCategory)
      
          });
        }, []);

        const [category, setCategory] = useState([]);
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


        fetch(baseURL+'/web-fetch-category', requestOptions)
        .then(response => response.json())
        .then(data => setCategory(data.productCategory)); 
    }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("product_category_id",subcategory.product_category_id);
        data.append("product_sub_category",subcategory.product_sub_category);
        data.append("product_sub_category_status",subcategory.product_sub_category_status);
        data.append("product_sub_category_image",selectedFile);
       
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-sub-category/"+id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Sub Categories Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Sub Categories" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off" style={{paddingLeft:'10%',paddingRight:'10%'}}>
          <div className="row">
          <div className="col-md-4 col-12 mt-4">
              <img src={"https://decopanel.in/storage/app/public/product_sub_category/"+subcategory.product_sub_category_image} style={{width:'215px',height:'215px'}}/>
            </div>
            <div className="col-md-8 col-12 mt-4">
            <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
              <TextField
                  fullWidth
                  id="select-corrpreffer"
                  required
                  select
                  label="Category"
                  autoComplete="Name"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="product_category_id"
                  value={subcategory.product_category_id}
                  onChange={(e) => onInputChange(e)}
                  
                >
                    {category.map((source, key) => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.product_category}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
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
            </div>
            <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="Image"
                  autoComplete="Name"
                  name="product_sub_category_image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="product_sub_category_status"
                  value={subcategory.product_sub_category_status}
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
