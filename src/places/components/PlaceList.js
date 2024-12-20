import React from 'react';
import './PlaceList.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import PlaceItem from './PlaceItem';
const PlaceList = props => {
	if (props.items.length === 0) {
		return <div className="place-list-center">
			<Card>
				<h2>No place found!!</h2>
				<Button to='/a'>Share place</Button>
			</Card>
		</div>
	}
	return <ul className="place-list">
		{props.items.map(place => <PlaceItem key={place.id} 
		id={place.id} 
		image={place.image} 
		title={place.title} 
		description={place.description} 
		address={place.address} 
		creatorplace={place.creatorplace} 
		onDelete={props.onDeletePlace} />)}
	</ul>
};
export default PlaceList;