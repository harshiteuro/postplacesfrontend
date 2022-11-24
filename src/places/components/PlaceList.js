import React from 'react';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import './PlaceList.css';
import Button from '../../shared/components/FormElements/Button';

const PlaceList=(props)=>{
    if(props.items.length===0){
        return <div className='place-list center'>
            <Card>
                <h2>No places found. Maybe create one?</h2>
                <Button to="/places/new">Share Place</Button>
            </Card>
        </div>
    };

    return <ul className='place-list'>
        {props.items.map((place)=>{
            return <PlaceItem key={place.id} id={place.id} image={place.imageUrl} title={place.ttile} description={place.description} address={place.address} createId={place.creator} coordinates={place.location}></PlaceItem>
        })}
    </ul>
}

export default PlaceList;