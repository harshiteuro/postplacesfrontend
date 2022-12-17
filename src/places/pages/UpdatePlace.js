import React ,{ useContext, useEffect,useState }from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE , VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace=()=>{
    const auth=useContext(AuthContext);
    const {isLoading,error,sendRequest,clearError}=useHttpClient();
    const [loadedPlaces,setLoadedPlaces]=useState();

    const placeId=useParams().placeId;
    const [formState,inputHandler,setFormData] = useForm({
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        }
    },false);

    useEffect(()=>{
        const fetchPlace=async ()=>{
            try{    
                const responseData=await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
                setLoadedPlaces(responseData.place);
                setFormData({
                    title:{
                        value:responseData.place.title,
                        isValid:true
                    },
                    description:{
                        value:responseData.place.description,
                        isValid:true
                    }
                },true);
            }
            catch(err){}
        }
        fetchPlace();
    },[sendRequest,placeId,setFormData])
    const navigate = useNavigate();
    const placeUpdateSubmitHandler=async event=>{
        event.preventDefault();
        try{
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,'PATCH',JSON.stringify({
                title:formState.inputs.title.value,
                description:formState.inputs.description.value
            }),
            {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+auth.token
            }
            );
            navigate('/'+auth.userId+'/places');
        }catch(err){} 
    };

    if(isLoading){
        return (
            <div className='center'>
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }
    if(!loadedPlaces && !error){
        return (
        <Card>
        <div className='center'><h2>Could not find place!</h2></div>
        </Card>
        );
    }
    return (
        <>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        {!isLoading && loadedPlaces && <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} initialValue={loadedPlaces.title} initialValid={true}></Input>
            <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description. (at least 5 characters)" onInput={inputHandler} initialValue={loadedPlaces.description} initialValid={true}></Input>
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
        }
        </>
    );
}

export default UpdatePlace;