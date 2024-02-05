import React, { Component } from "react";
import QueueAnim from "rc-queue-anim";
import { SessionSlider } from "Components/Widgets";
import { Fab } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppConfig from "Constants/AppConfig";
import { Form, FormGroup } from "reactstrap";
 
class Maintenance extends Component {
 
  render() {
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
            <div className="session-inner-wrapper">
              <div className="container">
                <div className="row row-eq-height">
                  <div className="col-sm-5 col-md-5 col-lg-4">
                    <SessionSlider />
                  </div>
                  <div className="col-sm-8 col-md-8 col-lg-8">
                    <div className="session-body text-center">
                      <div className="session-head mb-30">
                        <img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="90" height="90" />
                      </div>
                      <Form >
                        <FormGroup className="has-wrapper">
                          <p style={{color: "red",fontSize: "26px", fontFamily: "sans-serif"}}>We are upgrading ONZONE, It will live soon.</p>
                        </FormGroup>
                      </Form>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </QueueAnim>
    );
  }
}
export default Maintenance;