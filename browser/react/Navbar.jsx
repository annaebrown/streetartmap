import React from 'react';
import { Navbar, Glyphicon } from 'react-bootstrap';

const styles = {
	'color' : '#19a0d8',
	'fontSize' : '35px',
	'display': 'inline-block'
}


const NavBar = (props) => (
		<Navbar fixedTop={true}>
				<span><Glyphicon glyph="flash"/></span>
				<span><Glyphicon glyph="flash"/></span>
				<span><Glyphicon glyph="flash"/></span>
				    <Navbar.Text style = {styles}>
				        Bushwick Street Art Map
				    </Navbar.Text>
			    <span><Glyphicon glyph="flash" /></span>
			    <span><Glyphicon glyph="flash"/></span>
			    <span><Glyphicon glyph="flash"/></span>
		</Navbar>
	)

export default NavBar;