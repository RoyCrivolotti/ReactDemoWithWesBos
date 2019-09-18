import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Fish from './Fish';

class Menu extends React.Component {
	static propTypes = {
		addToOrder: PropTypes.func.isRequired,
		removeFromOrder: PropTypes.func.isRequired,
		loadSampleFishes: PropTypes.func,
		fishes: PropTypes.shape({
			key: PropTypes.shape({
				image: PropTypes.string,
				name: PropTypes.string.isRequired,
				description: PropTypes.string,
				price: PropTypes.number.isRequired,
				status: PropTypes.string.isRequired,
			}),
		}),
	};

	render() {
		return (
			<div className='menu'>
				<Header tagline='Fresh Seafood Market' />
				<ul className='fishes'>
					{Object.keys(this.props.fishes).map(key => (
						<Fish
							key={key}
							index={key}
							data={this.props.fishes[key]}
							addToOrder={this.props.addToOrder}
							removeFromOrder={this.props.removeFromOrder}
						></Fish>
					))}
				</ul>
			</div>
		);
	}
}

export default Menu;
