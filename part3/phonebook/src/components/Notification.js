import React from 'react';

const Notification = ({ message }) => {
    const {type, msg} = message;
    if (msg === null) {
        return null;
    }
    
    return (
        <div className={"notification "+type}>
            {msg}
        </div>
    );
};

export default Notification;
