import React, { Component } from "react";
import {
  FormGroup,
  Input,
  Form,
  Label,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import {baseURL} from '../../api';
import IntlMessages from "Util/IntlMessages";

export default class Profile extends Component {
  
  state = {
    userdata: {},
    firstName:'',
    phone:'',
    email:'',
    address: '',
    profileState: '',
    pincode: '',
    loader:false,
  };
  
  getData = () => {
    axios({
      url: baseURL+"/web-fetch-profile",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        this.setState({ firstName: res.data.user.full_name });
        this.setState({ phone: res.data.user.mobile });
        this.setState({ email: res.data.user.email });
        this.setState({ address: res.data.user.address });
        this.setState({ profileState: res.data.user.state });
        this.setState({ pincode: res.data.user.pincode });
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

  onUpdateProfile(e) {
    e.preventDefault();
    if(this.state.firstName == ""){
      NotificationManager.error("Enter Full Name");
      return false;
    }
    if((this.state.phone == "") || (this.state.phone == "NaN")){
      NotificationManager.error("Enter Mobile Number");
      return false;
    }
    let data = {
      first_name: this.state.firstName,
      phone: this.state.phone,
      address: this.state.address,
      state: this.state.profileState,
      pincode: this.state.pincode,
    };
    console.log(data);
    axios({
      url: baseURL+"/web-update-profile",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      NotificationManager.success("Profile Updated Successfully!");
      
    })
    .catch((res) => {
      NotificationManager.error("Profile not Updated");
      
    });
  };

  changeFirstName(e){

    this.setState({ firstName: e.target.value })
  }



  render() {
    return (
      <div className="profile-wrapper w-100">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form >
          <div className="row">
          <div className="col-md-6">
          <FormGroup row>
            <Label for="firstName" sm={3}>
              <IntlMessages id="components.firstName" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="first_name"
                id="fullName"
                className="input-lg"
                required
                value={this.state.firstName}
                onChange={(e) =>
                  
                  this.setState({ firstName: e.target.value })
                  
                }
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="telephone" sm={3}>
              <IntlMessages id="Mobile No" />
            </Label>
            <Col sm={9}>
              <Input
                type="tel"
                name="telephone"
                id="telephone"
                className="input-lg "
                required
                disabled
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 10);
                    
                }}
                value={this.state.phone}
                onChange={(e) =>
                  this.setState({ phone: e.target.value })
                }
              
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="email" sm={3}>
              <IntlMessages id="Email Id" />
            </Label>
            <Col sm={9}>
              <Input
                type="email"
                name="email"
                id="email"
                className="input-lg"
                value={this.state.email}
                disabled
              />
            </Col>
          </FormGroup>
          </div>
          <div className="col-md-6">
          <FormGroup row>
            <Label for="address" sm={3}>
              <IntlMessages id="components.address" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="address"
                id="fullName"
                className="input-lg"
                required
                value={this.state.address}
                onChange={(e) =>
                  
                  this.setState({ address: e.target.value })
                  
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="profileState" sm={3}>
              <IntlMessages id="State" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="profileState"
                id="fullName"
                className="input-lg"
                required
                value={this.state.profileState}
                onChange={(e) =>
                  
                  this.setState({ profileState: e.target.value })
                  
                }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="pincode" sm={3}>
              <IntlMessages id="Pincode" />
            </Label>
            <Col sm={9}>
              <Input
                type="text"
                name="pincode"
                id="fullName"
                className="input-lg"
                required
                value={this.state.pincode}
                onChange={(e) =>
                  
                  this.setState({ pincode: e.target.value })
                  
                }
              />
            </Col>
          </FormGroup>
          </div>
          </div>
        </Form>
        <hr />
        

        <Button
          variant="contained"
          color="primary"
          className="text-white"
          type="submit"
          onClick={(e) => this.onUpdateProfile(e)}
        >
          <IntlMessages id="widgets.updateProfile" />
        </Button>
      </div>
    );
  }
}
