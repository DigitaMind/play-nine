import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const setClassName = (number) =>{
        if(props.selectedNumbers.indexOf(number) >= 0){
            return "selected";
        }
        if(props.usedNumbers.indexOf(number) >= 0){
            return "used";
        }
    }
    return(
        <div className={"col-12"} align="center">
            <br/>
            <br/>
            <hr/>
            {_.range(1,10).map((number, i) =>
                <span onClick={() => props.selectNumber(number)} key={i} className={setClassName(number)}>{number}</span>
            )}
        </div>
    );
}

export default Numbers;