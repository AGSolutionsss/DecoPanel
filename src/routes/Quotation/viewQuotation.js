import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Moment from 'moment';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';
import NumberFormat from 'react-number-format';

const tablecss ={
    fontSize:'11px'
}

const tablelabel= {
    fontWeight:'600',
    fontSize:'14px'
}

const tablelabels= {
    fontSize:'14px'
}

export default function View(props){
    const componentRef = useRef();
    const [quotation, setQuotation] = useState([]);
    const [quotationSub, setQuotationSub] = useState({});
    const [quotationSubSum, setQuotationSubSum] = useState([]);
    const [loader, setLoader]= useState(true);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
    
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
    
        axios({
            url: baseURL+"/web-fetch-quotation-view-by-Id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            setQuotation(res.data.quotation);
            setQuotationSub(res.data.quotationSub);
            setQuotationSubSum(res.data.quotationSubSum);
          setLoader(false)
        });
      }, []);

      return (
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
                <>
                    <div className="invoice-wrapper">
                        <PageTitleBar title="Quotation" match={props.match} />
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-xl-9 mx-auto" style={{width:'auto'}}>
                                <RctCard>
                                    <div 
                                        style={{
                                        display:
                                            localStorage.getItem("user_type_id") == 4
                                            ? "none" : "",
                                        }} className="invoice-head text-right">
                                        <ul className="list-inline">
                                        <li>
                                            <ReactToPrint
                                            pageStyle="@page { size: 2.5in 4in }"
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
                                    <div className="p-10" ref={componentRef}>
                                        <div className="justify-content-between" style={{marginTop:'1cm',marginLeft: '1cm', marginRight: '1cm',marginBottom: '1cm', fontSize: '16px' }}>
                                            <table style={{width:'51%'}}>
                                                <tr>
                                                    <td><span style={tablelabels}>Quote No</span></td>
                                                    <td><span style={tablelabels}>:</span></td>
                                                    <td><span style={tablelabel}>{quotation.quotation_no}</span></td>
                                                    <td><span style={tablelabels}>Quotation Date</span></td>
                                                    <td><span style={tablelabels}>:</span></td>
                                                    <td><span style={tablelabel}>{Moment(quotation.quotation_date).format('DD-MM-YYYY')}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span style={tablelabels}>Client</span></td>
                                                    <td><span style={tablelabels}>:</span></td>
                                                    <td colSpan={4}><span style={tablelabel}>{quotation.full_name}</span></td>
                                                </tr>
                                            </table>
                                            <hr style={{width:'51%',float:'left',marginTop:'0px',marginBottom:'6px'}}/>
                                            <table style={{width:'51%'}}>
                                                <tr style={{background: '#84B0CA',textAlign: 'center',color: 'white'}}>
                                                    <th style={tablecss}>ITEM</th>
                                                    <th style={tablecss}>SIZE</th>
                                                    <th style={tablecss}>QUANTY</th>
                                                    <th style={tablecss}>RATE</th>
                                                    <th style={tablecss}>AMOUNT</th>
                                                </tr>
                                                {quotationSub.map((quote,key)=>(
                                                    <tr style={{border:"1px solid #8886862e"}}>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"left",paddingLeft: "10px"}}><span style={tablecss}>{quote.quotation_sub_thickness}{quote.quotation_sub_unit}{" "}{quote.product_category}{" "}{quote.product_sub_category}<br/>{"Brand : "}{quote.quotation_sub_brand}</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{quote.quotation_sub_size1 > 1 ? (quote.quotation_sub_size2 > 1 ? quote.quotation_sub_size1 +"x"+quote.quotation_sub_size2 : "") : ""}</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{quote.quotation_sub_quantity}</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"right",paddingRight: "10px"}}><span style={tablecss}>{quote.quotation_sub_rate.toFixed(2)}</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"right",paddingRight: "10px"}}><span style={tablecss}>{quote.quotation_sub_amount.toFixed(2)}</span></td>
                                                    </tr>
                                                ))}
                                            </table>
                                            <div className="row" style={{marginLeft:'0px',marginRight:'0px',marginTop:'0px',width:'51%'}}>
                                                <div className="col-md-7" style={{border:'1px solid rgba(136, 134, 134, 0.18)'}}>
                                                    <label style={{fontSize:'12px',padding:'5px',fontWeight:'600'}}>Billing on Delivery</label>
                                                </div>
                                                <div className="col-md-2" style={{border:'1px solid rgba(136, 134, 134, 0.18)'}}>
                                                    <label style={{fontSize:'12px',padding:'5px',textAlign:'end',fontWeight:'600'}}>Total</label>
                                                </div>
                                                <div className="col-md-3" style={{border:'1px solid rgba(136, 134, 134, 0.18)'}}>
                                                    <label style={{fontSize:'12px',padding:'5px',textAlign:'end',fontWeight:'600'}}>{quotationSubSum.toFixed(2)}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </RctCard>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
      );

}