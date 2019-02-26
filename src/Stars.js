import React from 'react';
import _ from 'lodash';

const Stars = (props) => {
    return(
        <div className={"col-5"}>
            {_.range(props.numOfStars).map((i)=> <li key={i} className={"fa fa-star"}></li>)}
        </div>
    );
}

export default Stars;