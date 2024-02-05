import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./appUsers.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { Badge } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';

const option = {
  filterType: "dropdown",
  selectableRows: false,
  
};
export default class NewListUsers extends React.Component {
  state = {
    loader: true,
    users: [],
    userData: [],
    columnData: [
      {
        name:"#",
        options:{
          filter: false,
          print:false,
          download:false,
        },
      },
      "Name",
      "Email",
      "Mobile",
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
                    <a style={{color: 'rgba(13, 126, 247, 0.54)'}} onClick={(e) => this.sendEmail(e,value)}>
                      <EditIcon />
                    </a>
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
      url: baseURL+"/web-fetch-users-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.profile;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
             i + 1,
              response[i]["full_name"],
              response[i]["email"],
              response[i]["mobile"],
              response[i]['user_status'] == 'Active' ? <Badge color="primary"><IntlMessages id="Active" /></Badge> : <Badge color="warning"><IntlMessages id="Inactive" /></Badge>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ userData: tempRows, loader: false });
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
      url: baseURL+"/web-update-users/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        
        this.getData();
        NotificationManager.success("App Users Update Sucessfully");
      
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
              title="App Users List"
              match={this.props.match}
            />
            <RctCollapsibleCard fullBlock>
              {this.state.userData.length > 0 && (
                <MUIDataTable
                  title={"App Users List"}
                  data={this.state.userData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.userData.length <= 0 && (
                <MUIDataTable
                  title={"App Users List"}
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
