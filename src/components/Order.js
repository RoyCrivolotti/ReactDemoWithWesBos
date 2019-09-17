import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
	renderListItem = key => {
		const fish = this.props.fishes[key];
		const amount = this.props.order[key];

		// Confirm elements were loaded before rendering them
		if (!fish) return null;

		const isUnavailable =
			!fish || fish.status.toLowerCase() !== 'available';

		if (isUnavailable) {
			return (
				<li key={key} className='fish'>
					{`Sorry, ${fish ? fish.name : 'this product'} is no longer
					available`}
				</li>
			);
		}

		return (
			<li key={key} className='fish'>
				{amount} {fish.name} - {formatPrice(amount * fish.price)}
				<button onClick={() => this.props.removeFromOrder(key)}>
					&#10799;
				</button>
			</li>
		);
	};

	render() {
		const orderIds = Object.keys(this.props.order);

		const total = orderIds.reduce((accum, key) => {
			const fish = this.props.fishes[key];

			// Confirm elements were loaded before calculating total
			if (!fish) return null;

			const amount = this.props.order[key];
			const price = this.props.fishes[key].price;
			const isAvailable =
				fish && fish.status.toLowerCase() === 'available';

			return isAvailable ? (accum += price * amount) : accum;
		}, 0);

		return (
			<div className='order-wrap'>
				<h2>Order</h2>
				<ul className='order'>{orderIds.map(this.renderListItem)}</ul>
				<div className='total'>
					Total <strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
