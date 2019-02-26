import React from 'react';

const Answer = (props) => {
    return(
        <div className={"col-5"} style={{"border":"solid #aaa", "borderRadius":"5px"}}>
            {props.selectedNumbers.map((number, i)=> <span onClick={() => props.unSelectNumber(number)} key={i}>{number}</span>)}
        </div>
    );
}

export default Answer;