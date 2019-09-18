import React from 'react';
import PropTypes from 'prop-types';

const Login = props => (
	<nav className='login'>
		<h2>Inventory login</h2>
		<p>Sign in to manage your store's inventory with</p>
		<button className='google' onClick={() => props.authenticate('Google')}>
			Google
		</button>
		<button className='github' onClick={() => props.authenticate('Github')}>
			GitHub
		</button>
	</nav>
);

Login.propTypes = {
	authenticate: PropTypes.func.isRequired,
};

export default Login;
