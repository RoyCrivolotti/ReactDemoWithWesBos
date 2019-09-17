import React from 'react';

class StorePicker extends React.Component {
	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }

	storeNameInput = React.createRef();

	// properties are bound to the instance by default, methods must be manually bound in the ctor
	goToStore = event => {
		event.preventDefault();
		const storeName = this.storeNameInput.current.value;
		this.props.history.push(`/store/${storeName}`);
	};

	// goToStore(event) {
	// 	console.log(this);
	// }

	render() {
		// return React.createElement('h2', { className: 'asd' }, 'Hello world!');
		// return <h2>Hello world!</h2>;
		return (
			// <React.Fragment>
			<>
				<h1>This is a form</h1>
				<form className='store-selector' onSubmit={this.goToStore}>
					<h2> Hello world!</h2>

					<input type='text' required placeholder='Store name' ref={this.storeNameInput} name='' id='' />
					<button type='submit'>Visit store</button>
				</form>
			</>
			// </React.Fragment>
		);
	}
}

export default StorePicker;
