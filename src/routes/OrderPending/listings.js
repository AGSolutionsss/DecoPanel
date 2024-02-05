import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./pendingOrder.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import { Badge } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';

const option = {
  filterType: "dropdown",
  selectableRows: false,
  
};
export default class NewListPendingOrder extends React.Component {
  state = {
    loader: true,
    users: [],
    productData: [],
    columnData: [
    {
        name: "#",
        options: {
            filter: false,
            print:false,
            download:false,
        }
    },
      "Order Date",
      "Order No",
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
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Generate Quotation" placement="top">
                  <IconButton
                    aria-label="Generate Quotation"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <a style={{color: 'rgba(13, 126, 247, 0.54)'}} onClick={(e) => this.sendEmail(e,value)}>
                      <ConfirmationNumberIcon />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip title="View" placement="top">
                  <IconButton
                    aria-label="View"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"view?id=" + value}>
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
      url: baseURL+"/web-fetch-pending-order-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.orders;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
                i + 1,
              Moment(response[i]["orders_date"]).format('DD-MM-YYYY'),
              response[i]["orders_no"],
              response[i]["full_name"],
              response[i]['orders_status'] == 'Order' ? 
              <Badge color="primary"><IntlMessages id="Order" /></Badge> : response[i]['orders_status'] == 'Cancel' ? <Badge color="warning"><IntlMessages id="Cancel" /></Badge> : <Badge color="info"><IntlMessages id="Quotation" /></Badge>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ productData: tempRows, loader: false });
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

  sendEmail = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/web-create-quotation/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        this.getData();
        NotificationManager.success("Quotation Created Sucessfully");
      
    })
  };
  
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
              title="Pending Orders List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype != 1 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add New
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.productData.length > 0 && (
                <MUIDataTable
                  title={"Pending Orders List"}
                  data={this.state.productData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.productData.length <= 0 && (
                <MUIDataTable
                  title={"Pending Orders List"}
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
