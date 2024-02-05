//Top Headlines widget

import React, { Component, Fragment } from 'react';
import { Badge } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import Modal from 'react-modal';
import Moment from 'moment';
import {baseURL} from '../../api';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// card component
import { RctCardFooter } from 'Components/RctCard';

//Data
const headlinesData = [
   {
      id: 1,
      title: "Telecom Commission approves net neutrality, new telecom policy",
      place: "New Delhi",
      category: "Technology",
      badgeColor: "danger",
      imgUrl: require("Assets/img/gallery-1.jpg"),
      time: "4 Hours Ago",
      date: "July 11 2018"
   },
   {
      id: 2,
      title: "Check status of Mumbai local, long-distance trains as rains continue",
      place: "Mumbai",
      category: "Weather",
      badgeColor: "info",
      imgUrl: require("Assets/img/gallery-2.jpg"),
      time: "6 Hours Ago",
      date: "July 11 2018"
   },
   {
      id: 3,
      title: "Croatia lowest ranked team in history to reach World Cup final",
      place: "Croatia",
      category: "Sports",
      badgeColor: "primary",
      imgUrl: require("Assets/img/gallery-3.jpg"),
      time: "12 Hours Ago",
      date: "July 11 2018"
   },
   {
      id: 4,
      title: "Vistara orders Boeing, Airbus jets worth $3.1 billion",
      place: "USA",
      category: "World",
      badgeColor: "success",
      imgUrl: require("Assets/img/gallery-4.jpg"),
      time: "Yesterday",
      date: "July 10 2018"
   },
   {
      id: 5,
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      place: "India",
      category: "Entertainment",
      badgeColor: "warning",
      imgUrl: require("Assets/img/gallery-5.jpg"),
      time: "1 hour ago",
      date: "July 11 2018"
   }
]

export default class TopHeadlines extends Component {
	
	
   state = {
        notices: [],
        isSuperAdmin:false, 
        modalIsOpen:false,
        noticeName:'',
        noticeDetail:'',
        toBeSentTo:'',
        customStyles:  {content : {
             top: '50%',
             left: '50%',
             width:'50%',
             height:'80%',
             right: 'auto',
             bottom: 'auto',
             marginRight: '-50%',
             transform: 'translate(-50%, -50%)'
         }  }        
   };

	
	constructor(props) {
       super(props);  
       
       this.showAddNoticeModal = this.showAddNoticeModal.bind(this);
       this.closeModal = this.closeModal.bind(this);
       this.addTheNotice = this.addTheNotice.bind(this);   
       this.handleNoticeNameChange = this.handleNoticeNameChange.bind(this);   
       this.handleNoticeDetailChange = this.handleNoticeDetailChange.bind(this);   
       this.handleTargetChange = this.handleTargetChange.bind(this);    
       
   }
   
   
   addTheNotice(){
   	
   	var theLoginToken = localStorage.getItem('login');       
        
      const requestOptions = {
            method: 'POST', 
            headers: {
               'Authorization': 'Bearer '+theLoginToken
            }         
            
      };     

        
       
  	     
  	   fetch(baseURL+'/superadmin-add-notice?notice_name='+this.state.noticeName+'&notice_detail='+this.state.noticeDetail+'&to_be_sent_to='+this.state.toBeSentTo, requestOptions)
         .then(response => response.json())
         .then(data => this.setAddNoticeResult(data));      
   
   }
   
   handleNoticeNameChange(event) {
      this.setState({noticeName: event.target.value});
   }
   
   handleNoticeDetailChange(event) {
      this.setState({noticeDetail: event.target.value});
   }
  
  setAddNoticeResult(data){
       
      this.setState({modalIsOpen: false});
      this.setState({ notices: data.notices })  
  }
   
   
  handleTargetChange(event) {
      this.setState({toBeSentTo: event.target.value});
  }
   
   
   componentDidMount() {
  	
      var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
  	
  	     var theLoginToken = localStorage.getItem('login');   	     
  	     var userTypeId = localStorage.getItem('id');    	     
       
        
        const requestOptions = {
            method: 'GET', 
            headers: {
               'Authorization': 'Bearer '+theLoginToken
            }         
            
        };      
        

        
        if(userTypeId=='3'){
        	
        	  this.setState({ isSuperAdmin: true })   
  	     
  	        fetch(baseURL+'/superadmin-fetch-notices', requestOptions)
            .then(response => response.json())
            .then(data => this.setTheData(data));         
  	     }else{
  	     
  	        fetch(baseURL+'/user-fetch-notices', requestOptions)
            .then(response => response.json())
            .then(data => this.setTheData(data));         
  	     }        
       
   }


   setTheData(data){   	

       this.setState({ notices: data.notices })          
   }
   
    closeModal(){   	

       this.setState({ modalIsOpen: false })          
   }
	
	
	showAddNoticeModal(){
      this.setState({ modalIsOpen: true })      
	}
	
	markNoticeAsRead(noticeId){
      	var theLoginToken = localStorage.getItem('login');       
        
         const requestOptions = {
            method: 'POST', 
            headers: {
               'Authorization': 'Bearer '+theLoginToken
            }         
            
         };        
       
  	     
  	      fetch(baseURL+'/user-mark-a-notice-as-read?notice_id='+noticeId, requestOptions)
           .then(response => response.json())
           .then(data => this.setTheData(data));         
  	      
	}
	
	
   render() {
      return (
         <Fragment>
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={350} autoHide>
               <ul className="top-headlines-widget list-unstyled mb-0">
                  {this.state.notices.map((notice, key) =>
                     <li className="d-flex align-items-center justify-content-between p-20 border-bottom" key={notice.id}>
                        <div className="news-content d-flex">
                           
                           <div className="text-content">

                              <h5 className="mb-2">{notice.notice_name}</h5>
                              <div className="d-flex font-xs fw-light text-muted">
                                 <span className="mx-1">{notice.notice_detail}</span>
                              </div>
                              
                              <div className="d-flex font-xs fw-light text-muted" style={{marginTop:20}}>
                                 <span className="text-muted font-xs"><b>Notice Posted On:</b> {Moment((notice.created_at).substring(0,10)).format('DD-MM-YYYY')}</span>
                              </div>
                              
                              <div className="d-flex font-xs fw-light text-muted" style={{marginTop:5}}>
                                 {notice.is_read == 0 &&
                                   <Button variant="contained" 
                                     className="text-white bg-success px-3 btn-xs" 
                                     onClick={() => { if (window.confirm('Are you sure you have read and understood this notice?')) this.markNoticeAsRead(notice.id) } }

                                     >
                                      Acknowledge that you have read this notice
                                   </Button>
                                 }
                                 
                                 {notice.is_read == 1 &&
                                   <Button variant="contained" 
                                     disabled={true}
                                     style={{backgroundColor:'grey'}}
                                     className="text-white bg-primary px-3 btn-xs" 
                                     >
                                       Acknowledged
                                   </Button>
                                 }
                             </div>                              
                              
                           </div>
                        </div>
                        <div className="news-time w-10 text-right">
                             
                        </div>
                     </li>
                  )}
               </ul>
            </Scrollbars>
            {this.state.isSuperAdmin &&
               <RctCardFooter customClasses="d-flex justify-content-between align-items-center rounded-bottom">
                 <Button variant="contained" onClick={this.showAddNoticeModal} className="text-white bg-success px-3 btn-xs">
                   Add a New Notice</Button>
               </RctCardFooter>
            }
            
            <Modal
                 isOpen={this.state.modalIsOpen}
                 onRequestClose={this.closeModal}
                 style={this.state.customStyles}
                 contentLabel="Example Modal"
            >
 
               <h2>Posting a New Notice</h2>


               <form>
                
                  <input name="notice_name" value={this.state.noticeName} onChange={this.handleNoticeNameChange} placeholder="Notice Title" className="form-control"/>
                  <br/>
                  <label>Notice Detail</label>
                  <br/>
                  <textarea value={this.state.noticeDetail} onChange={this.handleNoticeDetailChange} className="form-control"/><br/>
                  <br/>
                
                  <select className="form-control" value={this.state.toBeSentTo} onChange={this.handleTargetChange}>
                     <option value="all">To All</option>
                     <option value="viewers">To Only Viewers</option>
                     <option value="admins">To Only Admins</option>
                     <option selected value="users">To Only Users</option>                   
                  </select>

                  <br/>

                  <Button variant="contained" onClick={this.addTheNotice} className="text-white bg-success px-3 btn-xs" style={{marginLeft:10, marginBottom:10}}>
                     Submit Notice
                  </Button>
                   
                  <Button variant="contained" onClick={this.closeModal} className="text-white bg-success px-3 btn-xs" style={{marginLeft:10, marginBottom:10}}>
                     Cancel</Button>
              </form>
         </Modal>
         </Fragment>
      )
   }
}