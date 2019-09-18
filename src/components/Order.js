import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Order extends React.Component {
	static propTypes = {
		removeFromOrder: PropTypes.func.isRequired,
		fishes: PropTypes.shape({
			key: PropTypes.shape({
				image: PropTypes.string,
				name: PropTypes.string.isRequired,
				description: PropTypes.string,
				price: PropTypes.number.isRequired,
				status: PropTypes.string.isRequired,
			}),
		}),
		order: PropTypes.object.isRequired,
	};

	renderListItem = key => {
		const fish = this.props.fishes[key];
		const amount = this.props.order[key];
		const transitionOptions = {
			classNames: 'order',
			key,
			timeout: { enter: 500, exit: 500 },
		};

		// Confirm elements were loaded before rendering them
		if (!fish) return null;

		const isUnavailable =
			!fish || fish.status.toLowerCase() !== 'available';

		if (isUnavailable) {
			return (
				<CSSTransition {...transitionOptions}>
					<li key={key}>
						Sorry, {fish ? fish.name : 'this product'} is no longer
						available
					</li>
				</CSSTransition>
			);
		}

		return (
			<CSSTransition {...transitionOptions}>
				<li key={key}>
					<span>
						<TransitionGroup component='span' className='count'>
							<CSSTransition
								classNames='count'
								key={amount}
								timeout={{ enter: 500, exit: 500 }}
							>
								<span>{amount}</span>
							</CSSTransition>
						</TransitionGroup>
						&nbsp;- {fish.name} - {formatPrice(amount * fish.price)}
					</span>
					<button onClick={() => this.props.removeFromOrder(key)}>
						<span>&#10799;</span>
					</button>
				</li>
			</CSSTransition>
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
				<TransitionGroup component='ul' className='order'>
					{orderIds.map(this.renderListItem)}
				</TransitionGroup>
				<div className='total'>
					Total <strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
