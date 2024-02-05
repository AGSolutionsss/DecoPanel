/**
 * Footer
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from 'Constants/AppConfig';
import dateyear from "../../routes/dateyear";

const Footer = () => (
	<div className="rct-footer d-flex" style={{justifyContent: "space-between"}}>
		
		<h5  className="mb-0 ">Current Year - {dateyear} </h5> 
		
		<h5  className="mb-0 ">{AppConfig.copyRightText}</h5> 
	</div>
);
export default Footer;
