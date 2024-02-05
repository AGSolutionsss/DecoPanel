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
    const [category, setCategory] = useState({
        product_category: "",
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

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const onSubmit = (e) => {
        
        const data = new FormData();
        data.append("product_category",category.product_category);
        data.append("product_category_image",selectedFile);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
 
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-category",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Categories Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Categories" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
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
            <div className="col-sm-12 col-md-12 col-xl-6">
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
