import React from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Add from "./addOrder";

const option = {
  filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen:true,
  download:false,
  selectableRows: false,
};



export default class AddToGroup extends React.Component {
  
  state = {
    loader: true,
    message:'',
    users: [],
    productData: [],
    columnData: [
      "Category",
      "Sub Category",
      "Braand",
      "Thickness",
      "Size",
      {
        name: "Actions",
        options: {
          filter: true,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" }}>
                <Button onClick={() => this.addDonorToReceipt(value)}>
                  Select
                </Button>
              </div>
            );
          },
        },
      },
    ],
  };
  
  addDonorToReceipt(product_id) {
      this.setState({
        message: product_id, loader: false
    });
        

        this.props.populateProductName(product_id);

        <Add message={this.state.message} />


    
  }

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/web-fetch-product",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        let singleData = [];
        let response = res.data.products;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          tempRows.push([
            response[i]["product_category"],
            response[i]["product_sub_category"],
            response[i]["products_brand"],
            response[i]["products_thickness"]+" "+response[i]["products_unit"],
            response[i]["products_size1"]+"x"+response[i]["products_size2"]+" "+response[i]["products_size_unit"],
            response[i],
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

  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("id");
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
           

            <RctCollapsibleCard fullBlock>
              {this.state.productData.length > 0 && (
                <MUIDataTable
                  data={this.state.productData}
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