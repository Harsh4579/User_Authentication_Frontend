import React, { useEffect,useState,useContext } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './NewPlace.css';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UpdatePlace = () => {
	const {isLoading,error,sendRequest,clearError}=useHttpClient();
	const [loadedPlaces,setLoadedPlaces]=useState();
	const auth=useContext(AuthContext);
	const placeId = useParams().placeId;
	const history=useHistory();
	const [formState, InputHandler,setFormData]=useForm({
		title: {
			value: '',
			isValid: false
		},
		description: {
			value: '',
			isValid: false
		}
	},
	false
	)
	// const IdentifiedPlace = Dummy.find(p => p.id === placeId);
	useEffect(()=>{
		const fetchplace=async ()=>{
			try{
				const responseData=await sendRequest(`http://localhost:5000/api/places/${placeId}`);
				setLoadedPlaces(responseData.place);
				setFormData({
					title: {
						value: responseData.place.title,
						isValid: true
					},
					description: {
						value: responseData.place.description,
						isValid: true
					},
				}, true);
			}catch(err){}
		}
		fetchplace(); 
	},[sendRequest,placeId,setFormData])
	
	
	const placeUpdateSubmitHandler = async event => {
		event.preventDefault();
		try{
			console.log(formState.inputs);
			await sendRequest(`http://localhost:5000/api/places/${placeId}`,'PATCH',JSON.stringify({
				title: formState.inputs.title.value,
				description: formState.inputs.description.value
			}),{
				'Content-Type': 'application/json'
			})
			history.push('/'+auth.userId+ '/places');
		}catch(err){}
	};
	if (isLoading) {
		return (
			<div className="center"><LoadingSpinner/></div>
		)
	}
	if (!loadedPlaces && !error) {
		return <h2 className="center">Could not find Place :</h2>
	}
	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError}/>
		{!isLoading && loadedPlaces && (<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
		<Input id="title"
			element="input"
			type="text"
			label="Title"
			validators={[VALIDATOR_REQUIRE()]}
			errorText="Plase Enter Valid Title"
			onInput={InputHandler}
			initialValue={loadedPlaces.title}
			valid={true}></Input>
		<Input id="description"
			element="textarea"
			label="Description"
			validators={[VALIDATOR_MINLENGTH(5)]}
			errorText="Plase Enter Valid Description"
			onInput={InputHandler}
			initialValue={loadedPlaces.description}
			valid={true}/>
		<Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
	</form>)}
	</React.Fragment>);
};
export default UpdatePlace;