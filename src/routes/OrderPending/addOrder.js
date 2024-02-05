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
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import AddToGroup from "./selectProduct";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Add = (props) => {

    let history = useHistory();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
  
    today = mm + "/" + dd + "/" + yyyy;
    var todayback = yyyy + "-" + mm + "-" + dd;
    const [order, setOrder] = useState({
        orders_year: "2023-24",
        orders_date: todayback,
        orders_user_id: "",
        orders_count: "",
        order_sub_data: "",
    });

    const [order_sub_count, setCount] = useState(1);

    const useTemplate = {orders_sub_product_id:"", orders_sub_catg_id:"",orders_sub_sub_catg_id:"",orders_sub_brand:"",orders_sub_thickness:"",orders_sub_unit:"",orders_sub_size1:"",orders_sub_size_unit:"",orders_sub_size2:"",orders_sub_quantity:""};

    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
        setUsers([...users,useTemplate]);
        setCount(order_sub_count + 1);
    }

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        console.log(updatedUsers);
        setUsers(updatedUsers);
    };

    const removeUser = (index) => {
        const filteredUsers = [...users];
        filteredUsers.splice(index, 1);
        setUsers(filteredUsers);
        setCount(order_sub_count - 1);
    }

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const [showmodal, setShowmodal] = useState(false);
    const closegroupModal = () => {
      setShowmodal(false);
    };

    const openmodal = () => {
      setShowmodal(true);
    };

    const onInputChange = (e) => {

        setOrder({
        ...order,
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

    const [profile, setProfile] = useState([]);
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


        fetch(baseURL+'/web-fetch-users', requestOptions)
        .then(response => response.json())
        .then(data => setProfile(data.profile)); 
    }, []);

    const [activeProductIndex,setActiveProductIndex] = useState(0);
    const populateProductName = (selectedProduct) => {
      const tempUsers = [...users];
      tempUsers[activeProductIndex].orders_sub_product_id = selectedProduct.id;
      tempUsers[activeProductIndex].orders_sub_catg_id = selectedProduct.product_category;
      tempUsers[activeProductIndex].orders_sub_sub_catg_id = selectedProduct.product_sub_category;
      tempUsers[activeProductIndex].orders_sub_brand = selectedProduct.products_brand;
      tempUsers[activeProductIndex].orders_sub_thickness = selectedProduct.products_thickness;
      tempUsers[activeProductIndex].orders_sub_unit = selectedProduct.products_unit;
      tempUsers[activeProductIndex].orders_sub_size1 = selectedProduct.products_size1;
      tempUsers[activeProductIndex].orders_sub_size2 = selectedProduct.products_size2;
      tempUsers[activeProductIndex].orders_sub_size_unit = selectedProduct.products_size_unit;
      setUsers(tempUsers);
        setShowmodal(false); 
    }
    
    const onSubmit = (e) => {
        let data = {
            orders_user_id: order.orders_user_id,
            orders_year: order.orders_year,
            orders_date: order.orders_date,
            orders_count: order_sub_count,
            order_sub_data: users,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-order",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Order Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Order" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  id="select-corrpreffer"
                  required
                  select
                  label="User"
                  autoComplete="Name"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="orders_user_id"
                  value={order.orders_user_id}
                  onChange={(e) => onInputChange(e)}
                  
                >
                    {profile.map((source, key) => (
                    <MenuItem key={source.id} value={source.id}>
                      {source.full_name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            
            <div className="col-sm-4 col-md-4 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  required
                  autoComplete="Name"
                  name="orders_date"
                  value={order.orders_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <hr/>
            {
                users.map((user, index)=>(
                    <div className="row" key={index}>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                InputLabelProps={{style: {fontSize: 12},shrink: !!user.orders_sub_product_id}}
                                label="Products"
                                onClick={() => {
                                  setActiveProductIndex(index)
                                  openmodal();
                                }}
                                name="orders_sub_product_id"
                                value={user.orders_sub_product_id}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                InputLabelProps={{style: {fontSize: 12}}}
                                label="Category"
                                name="orders_sub_catg_id"
                                disabled
                                value={user.orders_sub_catg_id}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-2">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                label="Sub Category"
                                InputLabelProps={{style: {fontSize: 12}}}
                                name="orders_sub_sub_catg_id"
                                disabled
                                value={user.orders_sub_sub_catg_id}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                label="Brand"
                                InputLabelProps={{style: {fontSize: 12}}}
                                name="orders_sub_brand"
                                disabled
                                value={user.orders_sub_brand}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                label="Thickness"
                                InputLabelProps={{style: {fontSize: 12}}}
                                name="orders_sub_thickness"
                                disabled
                                value={user.orders_sub_thickness}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                label="Unit"
                                InputLabelProps={{style: {fontSize: 12}}}
                                name="orders_sub_unit"
                                disabled
                                value={user.orders_sub_unit}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                label="Length"
                                InputLabelProps={{style: {fontSize: 12}}}
                                name="orders_sub_size1"
                                value={user.orders_sub_size1}
                                disabled
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                label="Breadth"
                                InputLabelProps={{style: {fontSize: 12}}}
                                name="orders_sub_size2"
                                disabled
                                value={user.orders_sub_size2}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                id="select-corrpreffer"
                                InputLabelProps={{style: {fontSize: 12}}}
                                label="Size Unit"
                                name="orders_sub_size_unit"
                                disabled
                                value={user.orders_sub_size_unit}
                                onChange={e => onChange(e, index)}
                                fullWidth
                               />
                                    
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                            <div className="form-group">
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    InputLabelProps={{style: {fontSize: 12}}}
                                    autoComplete="Name"
                                    name="orders_sub_quantity"
                                    value={user.orders_sub_quantity}
                                    onChange={e => onChange(e, index)}
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-xl-1">
                          <IconButton onClick={() => removeUser(index)}>
                          <DeleteIcon/>
                          </IconButton>
                        </div>
                    </div>    
                ))
            }
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Button className="mr-10 mb-10" color="primary" style={{width:"100px"}} variant="contained" onClick={(e) => addItem(e)}>
                  Add More</Button>
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
          

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <Modal isOpen={showmodal} toggle={() => closegroupModal()} className="custom-modal-style" style={{maxWidth:'750px'}}>
        <ModalHeader toggle={() => closegroupModal()}>Select Product</ModalHeader>
        <ModalBody>
          <AddToGroup populateProductName={populateProductName}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default Add;