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
import "./subcategory.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { Badge } from 'reactstrap';
import IntlMessages from 'Util/IntlMessages';

const option = {
  filterType: "dropdown",
  selectableRows: false,
  
};
export default class NewListCategory extends React.Component {
  state = {
    loader: true,
    users: [],
    subcategoryData: [],
    columnData: [
      {
        name:"#",
        options:{
          filter: false,
          print:false,
          download:false,
        },
      },
      {
        name:"",
        options:{
          filter: false,
          print:false,
          download:false,
        },
      },
      "Category",
      "Sub Category",
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
      url: baseURL+"/web-fetch-sub-category-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.productSubCategoryList;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              <img src={"https://decopanel.in/storage/app/public/product_sub_category/"+response[i]["product_sub_category_image"]} className="media-object rounded-circle" width="75" height="75" />,
              response[i]["product_category"],
              response[i]["product_sub_category"],
              response[i]['product_sub_category_status'] == 'Active' ? <Badge color="primary"><IntlMessages id="Active" /></Badge> : <Badge color="warning"><IntlMessages id="Inactive" /></Badge>,
              response[i]["id"],
            ]);
          
        }
        this.setState({ subcategoryData: tempRows, loader: false });
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
              title="Sub Categories List"
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
              {this.state.subcategoryData.length > 0 && (
                <MUIDataTable
                  title={"Sub Categories List"}
                  data={this.state.subcategoryData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.subcategoryData.length <= 0 && (
                <MUIDataTable
                  title={"Sub Categories List"}
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
