import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Fish extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string.isRequired,
			description: PropTypes.string,
			price: PropTypes.number.isRequired,
			status: PropTypes.string.isRequired,
		}),
		addToOrder: PropTypes.func.isRequired,
	};

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

				<p>{description || ''}</p>

				<button
					disabled={!isAvailable}
					onClick={() => this.props.addToOrder(this.props.index)}
				>
					{isAvailable ? 'Add To Cart' : 'Sold out'}
				</button>

				<button
					onClick={() => this.props.removeFromOrder(this.props.index)}
				>
					Remove from order
				</button>
			</li>
		);
	}
}

export default Fish;
