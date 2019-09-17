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

	componentDidMount() {
		if (this.props.fishes.length === 0) {
			this.setState({ key: '' });
			this.setState({ name: '' });
			this.setState({ description: '' });
			this.setState({ status: '' });
			this.setState({ price: 0 });
			this.setState({ image: '' });
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.fishes.length > 0) {
			const defaultFish = nextProps.fishes[0].fish;
			const defaultFishKey = nextProps.fishes[0].key;

			this.setState({ key: defaultFishKey });
			this.setState({ name: defaultFish.name });
			this.setState({ description: defaultFish.description });
			this.setState({ status: defaultFish.status });
			this.setState({ price: defaultFish.price });
			this.setState({ image: defaultFish.image });
		}
	}

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
			[event.currentTarget.name]: event.currentTarget.value,
		};

		this.props.updateFish(this.state.key, updatedFish);
	};

	render() {
		if (!this.props.fishes || this.props.fishes.length === 0) return null;

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
					key={this.state.key}
					type='text'
					name='name'
					ref={this.keyRef}
					onChange={this.handleChange}
					value={this.state.name}
				/>
				<input
					type='text'
					name='price'
					ref={this.priceRef}
					onChange={this.handleChange}
					value={formatPrice(this.state.price)}
				/>
				<select
					type='text'
					name='status'
					ref={this.statusRef}
					onChange={this.handleChange}
					value={this.state.status}
				>
					<option value='available'>Fresh</option>
					<option value='unavailable'>Sold out</option>
				</select>
				<textarea
					name='description'
					ref={this.descriptionRef}
					onChange={this.handleChange}
					value={this.state.description}
				/>
				<input
					type='text'
					name='image'
					ref={this.imageRef}
					onChange={this.handleChange}
					value={this.state.image}
				/>
				<button onClick={() => this.props.removeFish(this.state.key)}>
					Remove fish
				</button>
			</div>
		);
	}
}

export default EditFishForm;
