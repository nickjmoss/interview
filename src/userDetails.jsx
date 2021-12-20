import React from 'react';

//Returns a div with all the users details provided in props
function UserDetails(props) {
    return (
        <div className="user-details">
            <h1>User</h1>
            <div><img src={props.child.props.profilePic.large} alt={props.child.props.name}></img></div>
            <div>Full Name: {props.child.props.name}</div>
            <div>Phone: {props.child.props.phone}</div>
            <div>Email: <a href={`mailto: ${props.child.props.email}`}>{props.child.props.email}</a></div>
            <div>Address: {`${props.child.props.address.street.number} ${props.child.props.address.street.name} ${props.child.props.address.city}, ${props.child.props.address.state} ${props.child.props.address.country} ${props.child.props.address.postcode}`}</div>
            <div>Date of Birth: {props.child.props.dob}</div>
        </div>
    )
}

export default UserDetails;