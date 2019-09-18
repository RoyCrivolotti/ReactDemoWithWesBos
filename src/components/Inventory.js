import React from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

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

	render() {
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
