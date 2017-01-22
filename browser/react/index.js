import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MainMap from './MapContainer.js';
import NavBar from './Navbar.jsx';

ReactDOM.render(
	<div>
		<NavBar/>
		<MainMap/>
	</div>
	,
  	document.getElementById('app')
);
