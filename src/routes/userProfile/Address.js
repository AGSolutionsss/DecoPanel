import React, { Component, useState, useEffect } from "react";
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
import IntlMessages from "Util/IntlMessages";
import {baseURL} from '../../api';

export default class Address extends Component {
  
  state = {
    old_password: "",
    password: "",
    confirm_password: "",
  };

  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    
  }


  onUpdateProfile = (e) => {
    e.preventDefault();
    if (this.state.password != this.state.confirm_password) {
      NotificationManager.error("Passwords don't match");
      return false;
    }

    let data = {
      old_password: this.state.old_password,
      password: this.state.password,
      username: localStorage.getItem("username"),
    };
    axios({
      url: baseURL+"/change-password",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        NotificationManager.success("Password Updated Successfully!");
        this.setState({ old_password: "" })
        this.setState({ password: "" })
        this.setState({ confirm_password: "" })
      })
      .catch((res) => {
        NotificationManager.error("Please enter valid old password");
        this.setState({ old_password: "" })
        this.setState({ password: "" })
        this.setState({ confirm_password: "" })
      });
  };

  render() {
    return (
      <div className="profile-wrapper w-50">
        <h2 className="heading">
          <IntlMessages id="widgets.personalDetails" />
        </h2>
        <Form onSubmit={(e) => this.onUpdateProfile(e)}>
          <FormGroup row>
            <Label for="oldpassword" sm={3}>
              <IntlMessages id="Old Password" />
            </Label>
            <Col sm={9}>
              <Input
                
                name="oldpassword"
                id="oldpassword"
                className="input-lg"
                type="password"
                value={this.state.old_password}
                onChange={(e) =>
                  this.setState({ old_password: e.target.value })
                }
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="newpassword" sm={3}>
              <IntlMessages id="New Password" />
            </Label>
            <Col sm={9}>
              <Input
                
                name="newpassword"
                id="newpassword"
                className="input-lg"
                type="password"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="confirmpassword" sm={3}>
              <IntlMessages id="Confirm Password" />
            </Label>
            <Col sm={9}>
              <Input
                
                name="confirmpassword"
                id="confirmpassword"
                value={this.state.confirm_password}
                className="input-lg"
                type="password"
                onChange={(e) =>
                  this.setState({ confirm_password: e.target.value })
                }
                required
              />
            </Col>
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            type="submit"
          >
            <IntlMessages id="widgets.updateProfile" />
          </Button>
        </Form>
        <hr />
      </div>
    );
  }
}
