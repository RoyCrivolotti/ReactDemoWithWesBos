import React from 'react';
import Order from './Order';
import Inventory from './Inventory';

import SampleFishes from '../sample-fishes';
import Menu from './Menu';

import base from '../base';

class App extends React.Component {
	state = {
		fishes: {},
		order: {},
	};

	componentDidMount() {
		this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
			context: this,
			state: 'fishes',
		});

		const localStorageOrderRef = localStorage.getItem(
			`${this.props.match.params.storeId}`,
		);

		if (localStorageOrderRef) {
			this.setState({ order: JSON.parse(localStorageOrderRef) });
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order),
		);
	}

	loadSampleFishes = () => {
		this.setState({ fishes: SampleFishes });
	};

	addFish = fishElement => {
		const fishes = { ...this.state.fishes };
		fishes.push(fishElement);
		this.setState({ fishes });
	};

	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = updatedFish;
		this.setState({ fishes });
	};

	removeFish = key => {
		const fishes = { ...this.state.fishes };
		fishes[key] = null;
		this.setState({ fishes });
	};

	removeFromOrder = key => {
		const order = { ...this.state.order };

		if (!order[key]) return;

		if (order[key] === 1) {
			delete order[key];
			localStorage.setItem(
				this.props.match.params.storeId,
				JSON.stringify(this.state.order),
			);
		} else order[key] = order[key] === 1 ? null : order[key] - 1;

		this.setState({ order });
	};

	addToOrder = key => {
		const order = { ...this.state.order };
		const isAvailable =
			this.state.fishes[key] !== undefined &&
			this.state.fishes[key].status.toLowerCase() === 'available';

		if (!isAvailable) return;

		order[key] = order[key] + 1 || 1;
		this.setState({ order: order });
	};

	render() {
		return (
			<div className='catch-of-the-day'>
				<Menu
					fishes={this.state.fishes}
					tagline={this.state.tagline}
					addToOrder={this.addToOrder}
					removeFromOrder={this.removeFromOrder}
				/>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					fishes={this.state.fishes}
					addFish={this.addFish}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					loadSampleFishes={this.loadSampleFishes}
				/>
			</div>
		);
	}
}

export default App;
