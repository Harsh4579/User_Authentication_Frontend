import React,{useContext} from "react";
import { useHistory } from "react-router-dom";
import './NewPlace.css';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/Util/validators';
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from '../../shared/hooks/form-hook';
const NewPlace = () => {
    const auth= useContext(AuthContext);
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    const [formState, InputHandler]=useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            image:{
                value: null,
                isValid: false
            }
        }, false
    );
    const history = useHistory();
    const placeSubmitHandler = async event => {
        event.preventDefault();
        // console.log(formState.inputs);
        try{
            const formData=new FormData();
            formData.append('title',formState.inputs.title.value);
            formData.append('description',formState.inputs.description.value);
            formData.append('address',formState.inputs.address.value);
            formData.append('creator',auth.userId);
            formData.append('image',formState.inputs.image.value)
            await sendRequest('http://localhost:5000/api/places','POST',formData
        );
        history.push('/');
        }catch(err){}
        
    };
    return (<React.Fragment> 
        <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay/>}
        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter correct Title" onInput={InputHandler} />
        <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter valid description(min. length of 5 characters)" onInput={InputHandler} />
        <Input id="address" element="input" type="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter valid address" onInput={InputHandler} />
        <ImageUpload id='image' onInput={InputHandler} errorText="Please provide an image"/>
        <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
    </React.Fragment>);
};
 export default NewPlace;