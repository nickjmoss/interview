import React from 'react';

// Returns a User Modal that is the popup that contains a Users additional info
function UserModal(props) {
    return (
        <div className={props.className}>
            <div className="modalBody">
                {props.user}
                <div className="go-back-container">
                    <div className="go-back-button" onClick={props.onDisplayUser}>Go Back</div>
                </div>
            </div>
        </div>
    )
}

export default UserModal;