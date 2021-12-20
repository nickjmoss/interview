import React from 'react';

// Returns a container for a User component that adds functionality for click events
function UserContainer(props) {
    return (
        //When UserContainer is clicked it will return the user it contains
        <li className='userItem' onClick={() => props.onDisplayUser(props.user)}>{props.user}</li>
    )
}

export default UserContainer