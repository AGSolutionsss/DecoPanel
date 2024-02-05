import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./quotation.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import { Badge } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';

const option = {
  filterType: "dropdown",
  selectableRows: false,
  
};
export default class NewListQuotation extends React.Component {
  state = {
    loader: true,
    users: [],
    quotationData: [],
    columnData: [
    {
        name: "#",
        options: {
            filter: false,
            print:false,
            download:false,
        }
    },
      "Quotation Date",
      "Quotation No",
      "User",
      {
        name:"Status",
        options:{
          filter: false,
          print:false,
          download:false,
        },
      },
      {
        name: "View",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: this.state.usertype == 1 ? "none" : "",
                    }}
                      to={"view?id=" + value}
                    >
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/web-fetch-quotation-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.quotation;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                i + 1,
              Moment(response[i]["quotation_date"]).format('DD-MM-YYYY'),
              response[i]["quotation_no"],
              response[i]["full_name"],
              response[i]['quotation_status'] == 'Quotation' ? 
              <Badge color="primary"><IntlMessages id="Quotation" /></Badge> : response[i]['orders_status'] == 'Cancel' ? <Badge color="warning"><IntlMessages id="Cancel" /></Badge> : <Badge color="info"><IntlMessages id="Processing" /></Badge>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ quotationData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    return (
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="All Quotation List"
              match={this.props.match}
            />
            
            <RctCollapsibleCard fullBlock>
              {this.state.quotationData.length > 0 && (
                <MUIDataTable
                  title={"All Quotation List"}
                  data={this.state.quotationData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.quotationData.length <= 0 && (
                <MUIDataTable
                  title={"All Quotation List"}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
