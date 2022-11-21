import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

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

const UserPlaces=()=>{
    const userId=useParams().userId;
    const loadedPlaces=DUMMY_PLACES.filter(place=>place.creator===userId);
    return <PlaceList items={loadedPlaces}></PlaceList>
}
export default UserPlaces;