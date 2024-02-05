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
      value: "Quotation",
      label: "Quotation",
    },
    {
        value: "Processing",
        label: "Processing",
    },
    {
        value: "Cancel",
        label: "Cancel",
      },
  ];

const QuotationForm = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  const [downloadQuotation, setQuotationDownload] = useState({
    orders_user_id:"",
    quotation_from_date: "2023-03-01", 
    quotation_to_date: todayback,
    quotation_status: ""
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
        setQuotationDownload({
            ...downloadQuotation,
            [e.target.name]: e.target.value,
        });
    };
    
    const onSubmit = (e) => {
        e.preventDefault();
        let data = {
            orders_user_id:downloadQuotation.orders_user_id,
            quotation_from_date: downloadQuotation.quotation_from_date,
            quotation_to_date: downloadQuotation.quotation_to_date,
            quotation_status: downloadQuotation.quotation_status,
        };
        var v = document.getElementById('dowRecp').checkValidity();
        var v = document.getElementById('dowRecp').reportValidity();
        e.preventDefault();

        if(v){
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/download-quotation-report",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'quotation_list.csv');
            document.body.appendChild(link);
            link.click();
            NotificationManager.success("Quotation Report is Downloaded Successfully");
            setIsButtonDisabled(false)
        }).catch((err) =>{
            NotificationManager.error("Quotation Report is Not Downloaded");
            setIsButtonDisabled(false)
        });
        }
    };

    const onReportView = (e) => {
        e.preventDefault();

        localStorage.setItem('orders_user_id',downloadQuotation.orders_user_id);
        localStorage.setItem('quotation_from_date',downloadQuotation.quotation_from_date);
        localStorage.setItem('quotation_to_date',downloadQuotation.quotation_to_date);
        localStorage.setItem('quotation_status',downloadQuotation.quotation_status);
        history.push("quotationReport");
        
    }
  
  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Quotation" match={props.match} />
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
                    name="orders_user_id"
                    value={downloadQuotation.orders_user_id}
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
                 label="Quotation From Date"
                 required
                 type="date"
                 autoComplete="Name"
                 name="quotation_from_date"
                 InputLabelProps={{ shrink: true }}
                 value={downloadQuotation.quotation_from_date}
                 onChange={(e) => onInputChange(e)}
               />
             </div>
           </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
              <TextField
                 fullWidth
                 label="Quotation To Date"
                 type="date"
                 required
                 autoComplete="Name"
                 name="quotation_to_date"
                 InputLabelProps={{ shrink: true }}
                 value={downloadQuotation.quotation_to_date}
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
                 name="quotation_status"
                 SelectProps={{
                    MenuProps: {},
                  }}
                 value={downloadQuotation.quotation_status}
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

export default QuotationForm;
