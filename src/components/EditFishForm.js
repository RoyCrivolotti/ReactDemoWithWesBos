import React from 'react';

import { formatPrice } from '../helpers';

class EditFishForm extends React.Component {
	state = {
		key: {},
		name: {},
		description: {},
		status: {},
		price: {},
		image: {},
	};

	renderFishToEdit = event => {
		let fishToEditKey = event.currentTarget.value;
		let fishToEdit = this.props.fishes.find(el => el.key === fishToEditKey)
			.fish;

		this.setState({ key: fishToEditKey });
		this.setState({ name: fishToEdit.name });
		this.setState({ description: fishToEdit.description });
		this.setState({ status: fishToEdit.status });
		this.setState({ price: fishToEdit.price });
		this.setState({ image: fishToEdit.image });
	};

	handleChange = event => {
		let updatedFish = {
			...this.props.fishes.find(el => el.key === this.state.key).fish,
		};

		updatedFish[event.currentTarget.name] = event.currentTarget.value;
		this.props.updateFish(this.state.key, updatedFish);
	};

	renderBasedOnInput() {
		if (this.props.fishes.length === 0) return null;

		return (
			<div className='fish-edit'>
				<select name='fishes' onChange={this.renderFishToEdit}>
					{this.props.fishes.map(el => (
						<option key={el.key} value={el.key}>
							{el.fish.name}
						</option>
					))}
				</select>

				<input
					type='text'
					name='name'
					onChange={this.handleChange}
					value={this.state.name}
				/>
				<input
					type='text'
					name='price'
					onChange={this.handleChange}
					value={formatPrice(this.state.price)}
				/>
				<select
					type='text'
					name='status'
					onChange={this.handleChange}
					value={this.state.status}
				>
					<option value='available'>Fresh</option>
					<option value='unavailable'>Sold out</option>
				</select>
				<textarea
					name='description'
					onChange={this.handleChange}
					value={this.state.description}
				/>
				<input
					type='text'
					name='image'
					onChange={this.handleChange}
					value={this.state.image}
				/>
			</div>
		);
	}

	render() {
		return this.renderBasedOnInput();
	}
}

export default EditFishForm;
