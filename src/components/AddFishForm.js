import React from 'react';

class AddFishForm extends React.Component {
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descriptionRef = React.createRef();
	imageRef = React.createRef();
	submitRef = React.createRef();

	addFish = event => {
		event.preventDefault();
		const fishElement = {
			name: this.nameRef.current.value,
			price: parseFloat(this.priceRef.current.value),
			status: this.statusRef.current.value,
			description: this.descriptionRef.current.value,
			image: this.imageRef.current.value,
			submit: this.submitRef.current.value,
		};

		this.props.addFish(fishElement);

		event.currentTarget.reset();
	};

	render() {
		return (
			<form action='' className='fish-edit' onSubmit={this.addFish}>
				<input
					name='name'
					ref={this.nameRef}
					type='text'
					placeholder='Name'
				></input>

				<input
					name='price'
					ref={this.priceRef}
					type='text'
					placeholder='Price'
				></input>

				<select name='status' ref={this.statusRef}>
					<option value='available'>Fresh</option>
					<option value='unavailable'>Sold out</option>
				</select>

				<textarea
					name='description'
					ref={this.descriptionRef}
					type='text'
					placeholder='Description'
				></textarea>

				<input
					name='image'
					ref={this.imageRef}
					type='text'
					placeholder='Image'
				></input>

				<button type='submit' ref={this.submitRef}>
					+ add fish
				</button>
			</form>
		);
	}
}

export default AddFishForm;
