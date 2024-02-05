import React, { Component } from "react";
 import { connect } from "react-redux";
 import Button from "@material-ui/core/Button";
 import AppBar from "@material-ui/core/AppBar";
 import Toolbar from "@material-ui/core/Toolbar";
 import { Link } from "react-router-dom";
 import { Form, FormGroup, Input } from "reactstrap";
 import LinearProgress from "@material-ui/core/LinearProgress";
 import QueueAnim from "rc-queue-anim";
 import { Fab } from "@material-ui/core";
 import { Redirect } from "react-router-dom";
 import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
 import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import './login.css';

 import {
   NotificationContainer,
   NotificationManager,
 } from "react-notifications";
 
 import { SessionSlider } from "Components/Widgets";
 import AppConfig from "Constants/AppConfig";
 import {baseURL} from '../api';
 import {
   signinUserInFirebase,
   signinUserWithFacebook,
   signinUserWithGoogle,
   signinUserWithGithub,
   signinUserWithTwitter,
   signinUser,
 } from "Actions";
 
 import Auth from "../Auth/Auth";
 
 const auth = new Auth();
 
 class Signin extends Component {
   state = {
     email: "",
     password: "",
     login: false,
     token: null,
     errorShown:false,
   };
 
 
   componentDidMount(){
     
     fetch(
       encodeURI(baseURL+'/web-check-status'),
       {
         method: "GET",
       }
     )
       .then((response) => response.json())
       .then((data) => {
        
         if (JSON.stringify(data).includes("ok")) {
           
          
         }else{
         
           this.props.history.push("/maintenance");
         }
         
        
 
       })
       .catch((err) => {
 
        
        
       });
   } 
 
   onUserLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
       
       let formData = new FormData();   
 
       formData.append('username', this.state.email);   
       formData.append('password', this.state.password);
 
 
       fetch(
         encodeURI(baseURL+'/web-login'),
         {
           method: "POST",
           body:formData
         }
       )
         .then((response) => response.json())
         .then((data) => {
          localStorage.setItem("id", data.UserInfo.user.user_type_id);
           localStorage.setItem("name", data.UserInfo.user.name);
           localStorage.setItem("username", data.UserInfo.user.name);
           localStorage.setItem("user_type_id", data.UserInfo.user.user_type_id);
 
           if (data.UserInfo.token) {
             localStorage.setItem("login", data.UserInfo.token);
             this.props.history.push("/app/dashboard");
             this.setState({
               login: true,
               token: data.UserInfo.token,
             });
           }
           
           if(JSON.stringify(data).includes("Unauthorised")) {
           
               NotificationManager.error("Username or password incorrect");
               this.setState({
                 errorShown: true,
               });
          
           }
 
 
         })
         .catch((err) => {
 
          
           if(!this.state.errorShown){
               NotificationManager.error("Username or password incorrect");
               this.setState({
                 errorShown: true,
               });
           }
         });
     } else {
       if(!this.state.errorShown){
         NotificationManager.error("Please enter Username or Password");
         this.setState({
           errorShown: true,
         });
     }
     } 
   }
 
  
   onUserSignUp() {
     this.props.history.push("/signup");
   }

   loginAuth0() {
     auth.login();
   }
 
   facbooklink = (link) => {
     window.location.href = "http://www.facebook.com/FTSIndia111";
   };
   userWithYoutube = (link) => {
     window.location.href = "http://www.youtube.com/c/FTS_India1";
   };
   userWithTwitter = (link) => {
     window.location.href = "http://www.twitter.com/FTS_India1";
   };
   userWithlinkedin = (link) => {
     window.location.href = "http://www.linkedin.com/in/FTSIndia1";
   };
   userWithInstagram = (link) => {
     window.location.href = "http://www.instagram.com/FTS_India1 ";
   };
   userWithPinterest = (link) => {
     window.location.href = "http://www.pinterest.com/FTS_India1";
   };
 
   render() {
     let x = document.getElementById("pwd");
     if (x) {

       x.addEventListener("keyup", function (event) {

         if (event.keyCode === 13) {

           event.preventDefault();

           document.getElementById("signin").click();
         }
       });
     }
     if (this.state.login) <Redirect to="/app/dashboard" />;
     const { email, password } = this.state;
 
     const { loading } = this.props;
     return (
       <QueueAnim type="bottom" duration={2000}>
         
           {loading && <LinearProgress />}
           <div className="session-inner-wrapper">
             <div className="container-fluid">
               
                  <div className="row">
                  <div className="col-md-8 desktop">
                  
                  </div>
                  <div className="col-md-4 login">
                   <div className="session-body text-center" style={{backgroundColor:'transparent'}}>
                     <div className="session-head mb-20">
                     <h1 className="login-heading">DECO PANEL</h1>
                       
                     </div>
                     <Form style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                       <FormGroup className="has-wrapper" style={{width:'70%'}}>
                         <Input
                           type="text"
                           autoFocus="autoFocus"
                           value={email}
                           name="user-mail"
                           className="has-input input-lg"
                           placeholder="Username"
                           onChange={(event) =>
                             this.setState({ email: event.target.value })
                           }
                         />
                         
                         <span className="has-icon">
                           <PersonOutlineOutlinedIcon />
                         </span>
                       </FormGroup>
                       <FormGroup className="has-wrapper" style={{width:'70%'}}>
                         <Input
                           value={password}
                           type="Password"
                           name="user-pwd"
                           // id="pwd"
                           className="has-input input-lg"
                           placeholder="Password"
                           onChange={(event) =>
                             this.setState({ password: event.target.value })
                           }
                           required
                         />
                         <span className="has-icon"><i className="ti-lock"></i></span>
                         
                       </FormGroup>
                       <FormGroup className="mb-15" style={{paddingLeft:'80px',paddingRight:'80px',width:'70%'}}>
                         <Button color="primary" className="btn-block text-white w-100"
                           variant="contained"
                           size="large"
                           id="signin"
                           onClick={() => this.onUserLogin()}
                         > Sign In
                         </Button>
                       </FormGroup>
                      </Form>
                     <Link to="session/forgot-password">Forget Password</Link>
                    </div>
                 </div>
                 </div>
                 
             </div>
           </div>
         
       </QueueAnim>
     );
   }
 }
 
 // map state to props
 const mapStateToProps = ({ authUser }) => {
   const { user, loading } = authUser;
   return { user, loading };
 };
 
 export default connect(mapStateToProps, {
  //  signinUserInFirebase,
  //  signinUserWithFacebook,
  //  signinUserWithGoogle,
  //  signinUserWithGithub,
  //  signinUserWithTwitter,
   signinUser,
 })(Signin);
 