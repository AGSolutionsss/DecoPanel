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
import CreateCategory from './createCategory';
import CreateSubCategory from './createSubCategory';
import CreateBrand from './createBrand';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const unit = [
  {
    value: "Nos",
    label: "Nos",
  },
  {
    value: "Mtr",
    label: "Mtr",
  },
  {
    value: "Kg",
    label: "Kg",
  },
  {
    value: "MM",
    label: "MM",
  },
];

const iconstyle = {
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'red',
  borderRadius: '50%',
  color:'#fff',
  height:'35px',
  width:'35px',
  cursor: 'pointer'
}

const other_unit = [
  {
    value: "Inch",
    label: "Inch",
  },
  {
    value: "Feet",
    label: "Feet",
  },
];

const Add = (props) => {

    let history = useHistory();
    const [product, setProduct] = useState({
        products_catg_id: "",
        products_sub_catg_id: "",
        products_brand: "",
        products_size1: "",
        products_thickness: "",
        products_unit: "",
        products_size2: "",
        products_size_unit: "",
        products_rate: "",
    });

    const [showmodal, setShowmodal] = useState(false);
    const closegroupModal = () => {
      setShowmodal(false);
    };

    const openmodal = () => {
      setShowmodal(true);
    };

    const [showmodalsubcategory, setShowmodalSubCategory] = useState(false);
    const closegroupSubModal = () => {
      setShowmodalSubCategory(false);
    };

    const openmodalSub = () => {
      setShowmodalSubCategory(true);
      localStorage.setItem('products_catg_id',product.products_catg_id);
    };

    const [showmodalbrand, setShowmodalBrand] = useState(false);
    const closegroupBrandModal = () => {
      setShowmodalBrand(false);
    };

    const openmodalBrand = () => {
      setShowmodalBrand(true);
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyDigits = (inputtxt) => {
      var phoneno = /^\d+$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
         return true;
       }else{
         return false;
       }
    }

    const [datavisible, setDataVisible] = useState(true);

    const onInputChange = (e) => {

      if(e.target.name=="products_thickness"){
        if(validateOnlyDigits(e.target.value)){
          setProduct({
            ...product,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="products_size1"){
        if(validateOnlyDigits(e.target.value)){
          setProduct({
            ...product,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="products_size2"){
        if(validateOnlyDigits(e.target.value)){
          setProduct({
            ...product,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="products_rate"){
        if(validateOnlyDigits(e.target.value)){
          setProduct({
            ...product,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="products_catg_id"){
        
          setProduct({
            ...product,
            [e.target.name]: e.target.value,
          });
          setDataVisible(false);
      }else{

        setProduct({
        ...product,
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

    

    const populateDonorName = (donorName) => {
      setShowmodal(false);
      axios({
        url: baseURL+"/web-fetch-category",
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
    }).then((res) => {
        if(res){
            setCategory(res.data.productCategory);
        }else{
            NotificationManager.error("Duplicate Entry");
        }
        
    });
    }

    const [subcategory, setSubCategory] = useState([]);
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


        fetch(baseURL+'/web-fetch-sub-category/'+product.products_catg_id, requestOptions)
        .then(response => response.json())
        .then(data => setSubCategory(data.productSubCategory)); 
    }, [product.products_catg_id]);

    const populateDonorNameSub = (donorName1) => {
      setShowmodalSubCategory(false);
      axios({
        url: baseURL+"/web-fetch-sub-category/"+product.products_catg_id,
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
    }).then((res) => {
        if(res){
          setSubCategory(res.data.productSubCategory);
        }else{
            NotificationManager.error("Duplicate Entry");
        }
        
    });
    }

    
    
    const [brand, setBrand] = useState([]);
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


        fetch(baseURL+'/web-fetch-brand', requestOptions)
        .then(response => response.json())
        .then(data => setBrand(data.brands)); 
    }, []);
    
    const populateDonorNameBrand = (donorName1) => {
      setShowmodalBrand(false);
      axios({
        url: baseURL+"/web-fetch-brand",
        method: "GET",
        headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
    }).then((res) => {
        if(res){
          setBrand(res.data.brands);
        }else{
            NotificationManager.error("Duplicate Entry");
        }
        
    });
    }

    const onSubmit = (e) => {
        let data = {
            products_catg_id: product.products_catg_id,
            products_sub_catg_id: product.products_sub_catg_id,
            products_brand: product.products_brand,
            products_size1: product.products_size1,
            products_thickness: product.products_thickness,
            products_unit: product.products_unit,
            products_size2: product.products_size2,
            products_size_unit: product.products_size_unit,
            products_rate: product.products_rate
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-product",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Product" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
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
                  name="products_catg_id"
                  value={product.products_catg_id}
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
            <div className="col-sm-12 col-md-12 col-xl-1">
            <div className="form-group">
                      <i className="ti-plus" style={iconstyle} onClick={() => openmodal()}></i>
            </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  select
                  label="Sub Category"
                  autoComplete="Name"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="products_sub_catg_id"
                  value={product.products_sub_catg_id}
                  onChange={(e) => onInputChange(e)}
                >
                    {subcategory.map((source, key) => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.product_sub_category}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-1">
            <div className="form-group">
                      <i className="ti-plus" style={iconstyle} onClick={() => {datavisible == true ? '' : openmodalSub()}}></i>
            </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  label="Brand"
                  autoComplete="Name"
                  name="products_brand"
                  value={product.products_brand}
                  onChange={(e) => onInputChange(e)}
                >
                  {brand.map((source, key) => (
                    <MenuItem key={source.brands_name} value={source.brands_name}>
                      {source.brands_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-1">
            <div className="form-group">
                      <i className="ti-plus" style={iconstyle} onClick={() =>  openmodalBrand()}></i>
            </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Thickness"
                  autoComplete="Name"
                  name="products_thickness"
                  value={product.products_thickness}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Unit"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  autoComplete="Name"
                  name="products_unit"
                  value={product.products_unit}
                  onChange={(e) => onInputChange(e)}
                >
                  {unit.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Length"
                  autoComplete="Name"
                  name="products_size1"
                  value={product.products_size1}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Breadth"
                  autoComplete="Name"
                  name="products_size2"
                  value={product.products_size2}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Size Unit"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  autoComplete="Name"
                  name="products_size_unit"
                  value={product.products_size_unit}
                  onChange={(e) => onInputChange(e)}
                >
                  {other_unit.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Rate"
                  autoComplete="Name"
                  name="products_rate"
                  value={product.products_rate}
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
      <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
        <ModalHeader toggle={() => closegroupModal()}>Create Category</ModalHeader>
        <ModalBody>
          <CreateCategory populateDonorName={populateDonorName}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal isOpen={showmodalsubcategory} toggle={() => closegroupSubModal()}>
        <ModalHeader toggle={() => closegroupSubModal()}>Create Sub Category</ModalHeader>
        <ModalBody>
          <CreateSubCategory populateDonorNameSub={populateDonorNameSub}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

      <Modal isOpen={showmodalbrand} toggle={() => closegroupBrandModal()}>
        <ModalHeader toggle={() => closegroupBrandModal()}>Create Brand</ModalHeader>
        <ModalBody>
          <CreateBrand populateDonorNameBrand={populateDonorNameBrand}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default Add;
