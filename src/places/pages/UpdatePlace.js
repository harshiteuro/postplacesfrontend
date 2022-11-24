import React ,{ useEffect,useState }from 'react';
import {useParams} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE , VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
const DUMMY_PLACES=[
    {
        id:'p1',
        title:'Cyber Building',
        description:'For Software enginners',
        imageUrl:'https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=612x612&w=0&k=20&c=RkcUiEmZYarBPnQW8qm7GUJEegE24Molcl2ijMlY3kQ=',
        address:'New York, NY 10001, USA',
        location:{
            lat:40.7485452,
            lng:-73.9857635
        },
        creator:'u1'
    },
    {
        id:'p2',
        title:'Cyber Building',
        description:'For Software enginners',
        imageUrl:'https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=612x612&w=0&k=20&c=RkcUiEmZYarBPnQW8qm7GUJEegE24Molcl2ijMlY3kQ=',
        address:'New York, NY 10001, USA',
        location:{
            lat:40.7485452,
            lng:-73.9857635
        },
        creator:'u2'
    }
];

const UpdatePlace=()=>{
    const [isLoading,setIsLoading]=useState(true);
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

    const identifiedPlace=DUMMY_PLACES.find(p=>p.id===placeId);
    useEffect(()=>{
        if(identifiedPlace){
            setFormData({
                title:{
                    value:identifiedPlace.title,
                    isValid:true
                },
                description:{
                    value:identifiedPlace.description,
                    isValid:true
                }
            },true);
        }
        
        setIsLoading(false);
    },[setFormData,identifiedPlace]);
    
    const placeUpdateSubmitHandler=event=>{
        event.preventDefault();
    }
    
    if(!identifiedPlace){
        return (
        <Card>
        <div className='center'><h2>Could not find place!</h2></div>
        </Card>
        );
    }
    if(isLoading){
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        );
    }
    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title" onInput={inputHandler} initialValue={formState.inputs.title.value} initialValid={formState.inputs.title.isValid}></Input>
            <Input id="description" element="textarea" label="Description" validators={[VALIDATOR_MINLENGTH(5)]} errorText="Please enter a valid description. (at least 5 characters)" onInput={inputHandler} initialValue={formState.inputs.description.value} initialValid={formState.inputs.description.isValid}></Input>
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    );
}

export default UpdatePlace;