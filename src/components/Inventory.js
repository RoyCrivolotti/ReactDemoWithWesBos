import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import { firebaseApp } from '../base';

class Inventory extends React.Component {
	static propTypes = {
		addFish: PropTypes.func.isRequired,
		updateFish: PropTypes.func.isRequired,
		removeFish: PropTypes.func.isRequired,
		loadSampleFishes: PropTypes.func,
		fishes: PropTypes.shape({
			key: PropTypes.shape({
				image: PropTypes.string,
				name: PropTypes.string.isRequired,
				description: PropTypes.string,
				price: PropTypes.number.isRequired,
				status: PropTypes.string.isRequired,
			}),
		}),
	};

	authenticate = provider => {
		console.log(`Authenticating with '${provider}'`);

		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		console.log(`Provider object`);
		console.log(authProvider);
		console.log(firebaseApp.options.apiKey);
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler)
			.catch(error => {
				console.log(error);
				console.error(`Error code: ${error.code}`);
				console.error(`Error message: ${error.message}`);
			});
	};

	authHandler = async authData => {
		console.log(`In auth handler`);
		console.log(authData);

		var token = authData.credential.accessToken;
		var user = authData.user;
		console.log(`Token: ${token}, user: ${user}`);
	};

	render() {
		return <Login authenticate={this.authenticate} />;
		return (
			<div className='inventory'>
				<h2>Inventory</h2>
				<EditFishForm
					fishes={Object.keys(this.props.fishes).map(key => ({
						key: key,
						fish: this.props.fishes[key],
					}))}
					updateFish={this.props.updateFish}
					removeFish={this.props.removeFish}
				/>
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSampleFishes}>
					Load sample fishes
				</button>
			</div>
		);
	}
}

export default Inventory;
