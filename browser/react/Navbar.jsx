import React from 'react';
import { Navbar } from 'react-bootstrap';

const styles = {
	'fontSize' : '30px'
}

const NavBar = (props) => (
		<Navbar fixedTop={true}>
			<Navbar.Header>
			    <Navbar.Brand>
			        <p style = {styles}>Bushwick Street Art Map</p>
			    </Navbar.Brand>
			</Navbar.Header>
		</Navbar>
	)

export default NavBar;