import React from 'react';

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button onClick={props.acceptAnswer} className={"btn btn-success"}>
                <li className={"fa fa-check"}></li>
            </button>;
        break;
        case false:
            button = <button className={"btn btn-danger"}>
                <li className={"fa fa-times"}></li>
            </button>;
        break;
        default:
            button = <button onClick={props.checkAnswer} className={"btn btn-secondary"} disabled={props.selectedNumbers.length ===0}>=</button>;
    }

    return(
        <div className={"col-2"} align="center">
            {button}
            <br/>
            <br/>
            <button onClick={() => props.redraw()} className={"btn btn-warning btn-sm"}>
                <li className={"fa fa-refresh"}>{props.redrawCount}</li>
            </button>
        </div>
    );
}

export default Button;