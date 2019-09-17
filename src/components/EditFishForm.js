import React from 'react';

import { formatPrice } from '../helpers';

class EditFishForm extends React.Component {
	renderFishToEdit = event => {
		let fishToEdit = event.currentTarget.value;
	};

	handleChange = event => {
		const updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value,
		};

		this.props.updateFish(this.props.index, updatedFish);
	};

	renderBasedOnInput(fishToRender) {
		if (this.props.fishes.length === 0) return null;

		return (
			<div className='fish-edit'>
				<select name='fishes' onChange={this.renderFishToEdit}>
					{this.props.fishes.map(el => (
						<option key={el.key} value={el.fish.name}>
							{el.fish.name}
						</option>
					))}
				</select>

				{this.props.fishes.forEach(el => console.log(el.fish))}
				{console.log(this.props.fishes[0].fish.name)}

				<input
					type='text'
					name='name'
					onChange={this.handleChange}
					value={this.props.fishes[0].fish.name}
				/>
				<input
					type='text'
					name='price'
					onChange={this.handleChange}
					value={formatPrice(this.props.fishes[0].fish.price)}
				/>
				<select
					type='text'
					name='status'
					onChange={this.handleChange}
					value={this.props.fishes[0].fish.status}
				>
					<option value='available'>Fresh</option>
					<option value='unavailable'>Sold out</option>
				</select>
				<textarea
					name='description'
					onChange={this.handleChange}
					value={this.props.fishes[0].fish.description}
				/>
				<input
					type='text'
					name='image'
					onChange={this.handleChange}
					value={this.props.fishes[0].fish.image}
				/>
			</div>
		);
	}

	render() {
		return this.renderBasedOnInput();
	}
}

export default EditFishForm;
