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
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

const status = [
    {
      value: "Order",
      label: "Order",
    },
    {
        value: "Cancel",
        label: "Cancel",
      },
  ];

const Edit = (props) => {

    let history = useHistory();
    const [order, setOrder] = useState({
        orders_user_id: "",
        orders_date: "",
        orders_status: "",
        orders_count: "",
        order_sub_data: "",
    });

    const useTemplate = {orders_sub_product_id:"", orders_sub_quantity:"",id:""};
    const [users, setUsers] = useState([useTemplate]);

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const onInputChange = (e) => {

        setOrder({
        ...order,
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
            url: baseURL+"/web-fetch-order-by-Id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setOrder(res.data.order);
            setUsers(res.data.orderSub);
      
          });
        }, []);

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

    const [product, setProducts] = useState([]);
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


        fetch(baseURL+'/web-fetch-product', requestOptions)
        .then(response => response.json())
        .then(data => setProducts(data.products)); 
    }, []);

    const onSubmit = (e) => {
        let data = {
            orders_status: order.orders_status,
            order_sub_data: users,
            orders_count: order.orders_count,
        
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-order/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Order Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Order" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  id="select-corrpreffer"
                  required
                  select
                  label="User"
                  disabled
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
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  required
                  disabled
                  autoComplete="Name"
                  name="orders_date"
                  value={order.orders_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-4 col-md-4 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  autoComplete="Name"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="orders_status"
                  value={order.orders_status}
                  onChange={(e) => onInputChange(e)}
                  
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
            <hr/>
            {
                users.map((user, index)=>(
                    <div className="row" key={index}>
                        <div className="col-sm-12 col-md-12 col-xl-9">
                            <div className="form-group">
                            <TextField
                            fullWidth
                            label="Name"
                            autoComplete="Name"
                            name="id"
                            hidden
                            value={user.id}
                            onChange={e => onChange(e, index)}
                          />
                                <TextField
                                id="select-corrpreffer"
                                select
                                required
                                label="Products"
                                SelectProps={{
                                    MenuProps: {},
                                }}
                                name="orders_sub_product_id"
                                value={user.orders_sub_product_id}
                                onChange={e => onChange(e, index)}
                                fullWidth
                                >
                                    {product.map((fabric, key) => (
                                <MenuItem key={fabric.id} value={fabric.id}>
                                    {fabric.product_category}{"-"}{fabric.product_sub_category}{"-"}{fabric.products_brand}{"-"}{fabric.products_thickness}{"-"}{fabric.products_unit}{"-"}{fabric.products_size1}{"x"}{fabric.products_size2}
                                </MenuItem>
                                ))}
                                </TextField>
                            </div>
                        </div>
                        
                        <div className="col-sm-12 col-md-12 col-xl-3">
                            <div className="form-group">
                                <TextField
                                    fullWidth
                                    required
                                    label="Quantity"
                                    autoComplete="Name"
                                    name="orders_sub_quantity"
                                    value={user.orders_sub_quantity}
                                    onChange={e => onChange(e, index)}
                                />
                            </div>
                        </div>
                    </div>    
                ))
            }
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
