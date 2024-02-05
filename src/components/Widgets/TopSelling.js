import React, { Component } from "react";
import Slider from "react-slick";
import IntlMessages from 'Util/IntlMessages';
import {baseURL} from '../../api';
import axios from "axios";
import dateyear from '../../routes/dateyear';

export default class TopSellingWidget extends Component {

	state = {
		products: null
	}

	componentDidMount() {

		axios({
			url: baseURL+"/web-fetch-dashboard-data-by/"+dateyear,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		  })
			.then((res) => {
			  this.setState({ products: res.data.categoryBanner });
			  
			})
			.catch((res) => {
			  alert("Something Went Wrong!");
			  
			});
	}

	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			arrows: false,
			rtl: false
		};
		const { products } = this.state;
		return (
			<div>
				<Slider {...settings}>
					{products && products.map((product, key) => (
						<div key={key}>
						<div className="top-selling">
							<div className="product-img mb-20">
								<img src={"https://decopanel.in/storage/app/public/product_category/"+product.product_category_image} width="600" alt="headphone device" className="img-fluid d-block" />
							</div>
							<div className="product-content text-center">
								<h3>{product.product_category}</h3>
							</div>
						</div>
						
						</div>
					))}
				</Slider>
			</div>
		);
	}
}
