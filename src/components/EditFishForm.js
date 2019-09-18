import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class EditFishForm extends React.Component {
	static propTypes = {
		removeFish: PropTypes.func.isRequired,
		updateFish: PropTypes.func.isRequired,
		fishes: PropTypes.arrayOf(
			PropTypes.shape({
				key: PropTypes.string,
				fish: PropTypes.shape({
					image: PropTypes.string,
					name: PropTypes.string.isRequired,
					description: PropTypes.string,
					price: PropTypes.number.isRequired,
					status: PropTypes.string.isRequired,
				}),
			}),
		),
	};

	state = {
		key: {},
		name: {},
		description: {},
		status: {},
		price: {},
		image: {},
	};

	setStateFromObj = propsObject => {
		this.setState({ key: propsObject.key });
		this.setState({ name: propsObject.name });
		this.setState({ description: propsObject.description });
		this.setState({ status: propsObject.status });
		this.setState({ price: propsObject.price });
		this.setState({ image: propsObject.image });
	};

	componentWillMount() {
		this.setStateFromObj({
			key: '',
			name: '',
			description: '',
			status: '',
			price: 0,
			image: '',
		});
	}

	componentDidMount() {
		if (this.props.fishes.length > 0 && this.state.key.length === 0) {
			const defaultFish = this.props.fishes[0];
			this.setStateFromObj({ key: defaultFish.key, ...defaultFish.fish });
		}
	}

	renderFishToEdit = event => {
		let fishToEditKey = event.currentTarget.value;
		let fishToEdit = this.props.fishes.find(el => el.key === fishToEditKey)
			.fish;

		this.setStateFromObj({ key: fishToEditKey, ...fishToEdit });
	};

	handleChange = event => {
		let updatedFish = {
			...this.props.fishes.find(el => el.key === this.state.key).fish,
			[event.currentTarget.name]: event.currentTarget.value,
		};

		this.props.updateFish(this.state.key, updatedFish);
	};

	render() {
		if (!this.state || !this.state.key) return null;

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
