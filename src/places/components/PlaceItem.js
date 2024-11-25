import React, { useState,useContext } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceItem.css'
const PlaceItem = props => {
	const auth = useContext(AuthContext);
	const {isLoading,error,sendRequest,clearError}=useHttpClient();
	const [showMAP, setShowMAP] = useState(false);
	const [showConfirmModal, setshowConfirmeModal] = useState(false);
	const openMAPHandler = () => setShowMAP(true);
	const closeMAPHandler = () => setShowMAP(false);
	const showdeletewarningHandler = () => {
		setshowConfirmeModal(true);
	};
	const canceldeleteHandler = () => {

		setshowConfirmeModal(false);
	};
	const confirmdeleteHandler = async () => {
		setshowConfirmeModal(false);
		try{
			await sendRequest(`http://localhost:5000/api/places/${props.id}`,'DELETE')
			props.onDelete(props.id);
		}catch(err){}
		console.log("Deleting...");
	};
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError}/>
			<Modal show={showMAP} onCancel={closeMAPHandler} header={props.address} contentClass="place-item__modal-content" footerClass="place-item__modal-actions" footer={<Button onClick={closeMAPHandler}>CLOSE</Button>}>
				<div className="map-container">
					<Map center={props.coordinate} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showConfirmModal}
				onCancel={canceldeleteHandler}
				header="Are you sure" footerClass="place-item__modal-actions"
				footer={
					<React.Fragment>
						<Button inverse onClick={canceldeleteHandler}>Cancel</Button>
						<Button inverse onClick={confirmdeleteHandler}>Delete</Button>
					</React.Fragment>
			}>
			<p>Do you want to delete this place?</p>
			</Modal>
		<li className='place-item'>
		<Card className='place-item__content'>
			{isLoading && <LoadingSpinner asOverlay/>}
			<div className='place-item__image'>
				<img src={`http://localhost:5000/${props.image}`} alt={props.title} />
			</div>
			<div className='place-item__info'	>
				<h2>{props.title}</h2>
				<h2>{props.address}</h2>
				<h2>{props.description}</h2>
			</div>
					<div className='place-item__actions'>
						<Button inverse onClick={openMAPHandler}>VIEW ON MAP</Button>

						{auth.isLoggedIn && (
							<Button to={`/places/${props.id}`}>
								EDIT
							</Button>
						)}
						{auth.isLoggedIn && (
							<Button danger onClick={showdeletewarningHandler}>
								DELETE
							</Button>
						)}
			</div>
		</Card>
			</li>
		</React.Fragment>
	);
};
export default PlaceItem;