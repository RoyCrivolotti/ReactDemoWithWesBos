import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

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

	state = {
		uid: null,
		owner: null,
	};
	
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) this.authHandler({ user });
		});
	}

	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		let alternativeProvider;

		if (provider === 'Google') alternativeProvider = new firebase.auth.GithubAuthProvider();
		else if (provider === 'Github') alternativeProvider = new firebase.auth.GoogleAuthProvider();
		else return null;

		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler)
			.catch(error => {
				if (error.code === 'auth/account-exists-with-different-credential') {
					firebase
					.auth()
					.signInWithPopup(alternativeProvider)
					.then(this.authHandler)
					.then(() => {
						firebase.auth().currentUser.linkWithPopup(authProvider);
						console.log(`Logged in with ${alternativeProvider} and linked your account to ${authProvider} so that you can now sign in with either directly!`);
					})
					.catch(this.handleAuthError);
				}
				
				else this.handleAuthError(error);
			});
	};

	handleAuthError = error => {
		console.error(`Error code: ${error.code}`);
		console.error(`Error message: ${error.message}`);

		throw error;
	}

	authHandler = async authData => {
		const store = await base
			.fetch(this.props.storeId, { context: this })
			.catch(error => {
				console.log(`Error: ${error.message}`);
			});

		if (!store.owner) {
			base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid,
			});
		}

		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid,
		});
	};

	logout = async () => {
		console.log('Logging out!');
		await firebase.auth().signOut();
		this.setState({ uid: null });
	};

	render() {
		const logout = <button onClick={() => this.logout()}>Log out</button>;

		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<h3>Sorry, you are not this store's owner</h3>
					{logout}
				</div>
			);
		}

		console.log(this.props.fishes);

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
				<div>
					{logout}
				</div>
			</div>
		);
	}
}

export default Inventory;
