import React from 'react';

//Returns a User component that contains a summary of a user
function User(props) {
    return (
        <div className="userBlock">
            <div className="thumbnail-container"><img className="thumbnail" src={props.profilePic.thumbnail} alt={props.name}></img></div>
            <div className="userBody">
                <div>Name: {props.name}</div> 
                <div>Email: {props.email}</div>
                <div>City: {props.address.city}</div>
                <div>Country: {props.address.country}</div>
            </div>
        </div>
    )
}

export default User;