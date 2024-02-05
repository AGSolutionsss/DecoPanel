import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';
import MenuItem from "@material-ui/core/MenuItem";

const status = [
    {
      value: "Order",
      label: "Order",
    },
    {
        value: "Quotation",
        label: "Quotation",
    },
    {
        value: "Cancel",
        label: "Cancel",
      },
  ];

const OrderForm = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  const [downloadOrder, setOrderDownload] = useState({
    order_user_id:"",
    order_from_date: "2023-03-01", 
    order_to_date: todayback,
    order_status: ""
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [client, setClient] = useState([]);
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
      .then(data => setClient(data.profile)); 
    }, []);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

    const onInputChange = (e) => {
        setOrderDownload({
            ...downloadOrder,
            [e.target.name]: e.target.value,
        });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
                order_user_id:downloadOrder.order_user_id,
                order_from_date: downloadOrder.order_from_date,
                order_to_date: downloadOrder.order_to_date,
                order_status: downloadOrder.order_status,
        };
        var v = document.getElementById('dowRecp').checkValidity();
        var v = document.getElementById('dowRecp').reportValidity();
        e.preventDefault();

        if(v){
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/download-order-report",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'order_list.csv');
            document.body.appendChild(link);
            link.click();
            NotificationManager.success("Order Report is Downloaded Successfully");
            setIsButtonDisabled(false)
        }).catch((err) =>{
            NotificationManager.error("Order Report is Not Downloaded");
            setIsButtonDisabled(false)
        });
        }
    };

    const onReportView = (e) => {
        e.preventDefault();

        localStorage.setItem('order_user_id',downloadOrder.order_user_id);
        localStorage.setItem('order_from_date',downloadOrder.order_from_date);
        localStorage.setItem('order_to_date',downloadOrder.order_to_date);
        localStorage.setItem('order_status',downloadOrder.order_status);
        history.push("orderReport");
        
    }
  
  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Order" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
            <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    id="select-corrpreffer"
                    select
                    label="Client"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="order_user_id"
                    value={downloadOrder.order_user_id}
                    onChange={(e) => onInputChange(e)}
                    fullWidth
                    >
                        {client.map((fabric, key) => (
                    <MenuItem key={fabric.id} value={fabric.id}>
                        {fabric.full_name}
                    </MenuItem>
                    ))}
                </TextField>
                    
                </div>
                </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
             <div className="form-group">
             <TextField
                 fullWidth
                 label="Order From Date"
                 required
                 type="date"
                 autoComplete="Name"
                 name="order_from_date"
                 InputLabelProps={{ shrink: true }}
                 value={downloadOrder.order_from_date}
                 onChange={(e) => onInputChange(e)}
               />
             </div>
           </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 fullWidth
                 label="Order To Date"
                 type="date"
                 required
                 autoComplete="Name"
                 name="order_to_date"
                 InputLabelProps={{ shrink: true }}
                 value={downloadOrder.order_to_date}
                 onChange={(e) => onInputChange(e)}
               />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 fullWidth
                 label="Status"
                 select
                 autoComplete="Name"
                 name="order_status"
                 SelectProps={{
                    MenuProps: {},
                  }}
                 value={downloadOrder.order_status}
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
            
            
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              
              onClick={(e) => onReportView(e)}
              
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default OrderForm;
