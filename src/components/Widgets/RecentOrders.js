import React, { Component } from 'react';
import {baseURL} from '../../api';
import axios from "axios";
import dateyear from '../../routes/dateyear';
import Moment from 'moment';

class RecentOrders extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}

	// recent orders
	getRecentOrders() {

		axios({
			url: baseURL+"/web-fetch-dashboard-data-by/"+dateyear,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		  })
			.then((res) => {
			  this.setState({ recentOrders: res.data.pendingOrder });
			  
			})
			.catch((res) => {
			  alert("Something Went Wrong!");
			  
			});
	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>Order No</th>
							<th>Order Date</th>
							<th>Client Name</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((order, key) => (
							<tr key={key}>
								<td>{order.orders_no}</td>
								<td>{Moment(order.orders_date).format('DD-MM-YYYY')}</td>
								<td>
									<span className="d-block fw-normal">{order.full_name}</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default RecentOrders;
