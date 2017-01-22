import React from 'react';
import { Navbar, Glyphicon } from 'react-bootstrap';

const styles = {
	'color' : '#19a0d8',
	'fontSize' : '30px'
}


const NavBar = (props) => (
		<Navbar fixedTop={true}>
				<Glyphicon glyph="star"/>
				    <Navbar.Text style = {styles}>
				        Bushwick Street Art Map
				    </Navbar.Text>
			    <Glyphicon glyph="star" />
		</Navbar>
	)

export default NavBar;