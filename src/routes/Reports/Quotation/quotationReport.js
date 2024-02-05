import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Moment from 'moment';
import { Button } from "reactstrap";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

const table_row = {
  border: "1px solid black",
  fontSize: "11px",
  paddingLeft: "30px"
};

const table_row_amount = {
  border: "1px solid black",
  textAlign: "right",
  fontSize: "11px",
  paddingRight: "30px"
};



const table_row_count = {
  border: "1px solid black",
  textAlign: "center",
  fontSize: "11px"
};

const table_head = {
  border: "1px solid black",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "12px"
};

const QuotationsReport = (props) => {
  const componentRef = useRef();
  const [quotationData, setQuotation] = useState({});
  const [loader, setLoader]= useState(true);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }

    let data = {
        orders_user_id:localStorage.getItem("orders_user_id"),
        quotation_from_date: localStorage.getItem("quotation_from_date"), 
        quotation_to_date: localStorage.getItem("quotation_to_date"),
        quotation_status: localStorage.getItem("quotation_status"),
    };
 
    axios({
        url: baseURL+"/web-fetch-quotation-report-list",
        method: "POST",
        data,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
        }
    }).then((res) => {
        setQuotation(res.data.quotation);
        
        setLoader(false)
      
    });
  }, []);
 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
        orders_user_id:localStorage.getItem("orders_user_id"),
        quotation_from_date: localStorage.getItem("quotation_from_date"), 
        quotation_to_date: localStorage.getItem("quotation_to_date"),
        quotation_status: localStorage.getItem("quotation_status"),
       
      
    };
    
    axios({
        url: baseURL+"/download-quotation-report",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          console.log("data : ",res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'quotation_list.csv'); 
          document.body.appendChild(link);
          link.click();
          NotificationManager.success("Quotation Report is Downloaded Successfully");
          
        }).catch((err) =>{
          NotificationManager.error("Quotation Report is Not Downloaded");
          
        });
  
  };

    const  handleExportWithFunction  = (e) => {
    savePDF(componentRef.current, { 
        paperSize:  "A4", 
        orientation: "vertical",
        scale: 0.8,
    });
    }

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Quotation Reports" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
          
            <RctCard>
              <div 
        
                className="invoice-head text-right">
                <ul className="list-inline">
                <li>
                  <a onClick={(e) => handleExportWithFunction(e)}>
                      <i className="mr-10 ti-download"></i> PDF
                    </a>
                    </li>
                  <li>
                    <a  onClick={(e) => onSubmit(e)}>
                      <i className="mr-10 ti-download"></i> Download
                    </a>
                  </li>
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <a>
                          <i className="mr-10 ti-printer"></i> Print
                        </a>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul>
              </div>
              
              <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                <div className="d-flex justify-content-between" style={{fontSize: '16px' }}>
                  <div className="invoice-logo ">
                    
                  </div>
                  <div className="address text-center">
                    
                    <h2 style={{paddingTop: '5px'}}>
                      <strong>
                        <b style={{fontSize: '20px'}}>QUOTATION REPORTS</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                
                <div className="table-responsive">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black', marginTop: '20px'}}>
                      <TableHead>          
                        <TableRow>
                          <TableCell style={table_head}>Quotation Date</TableCell>
                          <TableCell style={table_head}>Client</TableCell>
                          <TableCell style={table_head}>Quotation No</TableCell>
                          <TableCell style={table_head}>Status</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {quotationData.map((dataSumm, key)=>(
                          <TableRow key={dataSumm.quotation_date}>
                            <TableCell style={table_row_count}>{Moment(dataSumm.quotation_date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.full_name}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.quotation_no}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.quotation_status}</TableCell>
                          </TableRow>
                        ))}
                       </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
              
            </RctCard>
            
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default QuotationsReport;
