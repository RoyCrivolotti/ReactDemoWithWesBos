import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
	handleClick = () => this.props.addToOrder(this.props.index);

	render() {
		const { image, name, description, price, status } = this.props.data;
		const isAvailable = status.toLowerCase() === 'available';

		return (
			<li className='menu-fish'>
				<img src={image} alt={name} />

				<h3 className='fish-name'>
					{name}
					<span>{formatPrice(price)}</span>
				</h3>

				<p>{description}</p>

				<button disabled={!isAvailable} onClick={this.handleClick}>
					{isAvailable ? 'Add To Cart' : 'Sold out'}
				</button>
			</li>
		);
	}
}

export default Fish;
