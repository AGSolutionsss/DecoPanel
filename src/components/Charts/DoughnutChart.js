import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartConfig from 'Constants/chart-config';
import {baseURL} from '../../api';
import dateyear from '../../routes/dateyear';
import axios from "axios";

const data = {
   labels: [
      'OTS',
      'Membership',
      'General'
   ],
   datasets: [{
      data: [250, 25, 125],
      backgroundColor: [
         ChartConfig.color.primary,
         ChartConfig.color.warning,
         ChartConfig.color.info
      ],
      hoverBackgroundColor: [
         ChartConfig.color.primary,
         ChartConfig.color.warning,
         ChartConfig.color.info
      ]
   }]
};

const options = {
   legend: {
      display: false,
      labels: {
         fontColor: ChartConfig.legendFontColor
      }
   },
   cutoutPercentage: 50
};

export default class DoughnutChart extends Component {
   state = {
      labels: [
         'OTS',
         'Membership',
         'General'
      ],
      datasets: [{
         data: [250, 25, 125],
         backgroundColor: [
            ChartConfig.color.primary,
            ChartConfig.color.warning,
            ChartConfig.color.info
         ],
         hoverBackgroundColor: [
            ChartConfig.color.primary,
            ChartConfig.color.warning,
            ChartConfig.color.info
         ]
      }]
    };

    componentDidMount() {

      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        // alert('jaja')
        // this.props.logoutUserFromFirebase();
        browserHistory.push("/logout");
        
      }else{
  
        // alert('mama')
      }
       
  
  
       axios({
         url: baseURL+"/fetch-dashboard-graph-data-by/"+dateyear,
         method: "GET",
         headers: {
           Authorization: `Bearer ${localStorage.getItem("login")}`,
         },
       })
         .then((res) => {
            

           this.setState({ data: res.data.total });
           console.log(res.data.total);
         })
         .catch((res) => {
           alert("Something Went Wrong!");
           
         });
     }



   render() {
      return (
         <Doughnut data={data} options={options} height={100} />
      );
   }
}