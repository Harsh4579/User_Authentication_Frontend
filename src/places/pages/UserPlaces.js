import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import PlaceList from '../components/PlaceList';

const UserPlace = () => {
	const [loadedPlaces,setLoadedPlaces]=useState();
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
	const userId = useParams().userId.trim();
	useEffect(()=>{
		const fetchplaces=async ()=>{
			try{
				const responseData=await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
				setLoadedPlaces(responseData.places);
			}catch(err){}
		};
		fetchplaces();
	},[sendRequest,userId])
	const placeDeleteHandler=deletedPlaceId=>{
		setLoadedPlaces(prevPlaces=>prevPlaces.filter(place=>place.id!==deletedPlaceId));
	}
	// const loadedPlaces = Dummy.filter(place => place.creatorplace === userId);
	return (<React.Fragment>
		<ErrorModal error={error} onClear={clearError}/>
		{isLoading && (
			<div className='center'>
			<LoadingSpinner/>
			</div>)}
		{!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
		</React.Fragment>);
};
export default UserPlace;