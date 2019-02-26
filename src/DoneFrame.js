import React from 'react';

const DoneFrame = (props) => {
    return(
        <div className={"col-12"} align="center">
            <h1>
                {props.doneStatus}
            </h1>
        </div>
    );
}

export default DoneFrame;