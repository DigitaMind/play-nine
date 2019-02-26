import React, {Component} from 'react';
import Stars from "./Stars";
import Button from "./Button";
import Answer from "./Answer";
import "./dist/css/bootstrap.min.css";
import Numbers from "./Numbers";
import './App.css';
import DoneFrame from "./DoneFrame";
import _ from "lodash";


const possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    const listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

class Game extends Component{
    static randomStars = () =>  1 + Math.floor(Math.random()*9);
    state={
        numOfStars: 1+ Math.floor(Math.random() * 9),
        selectedNumbers:[],
        answerIsCorrect:null,
        redrawCount:5,
        usedNumbers:[],
        doneStatus:null
    };

    selectNumber = (number) => {
        if(this.state.selectedNumbers.indexOf(number) >= 0 || this.state.usedNumbers.indexOf(number) >=0) return;
        this.setState((prevState)=>({
            selectedNumbers:prevState.selectedNumbers.concat(number),
            answerIsCorrect: null
        }))
    }

    unSelectNumber = (number) => {
        this.setState((prevState) =>({
            selectedNumbers: prevState.selectedNumbers.filter(x => x !== number)
        }))
    }

    updateStatus = () => {
        this.setState({
            answerIsCorrect:true
        })
    }

    checkAnswer = () => {
        this.setState((prevState)=>({
            answerIsCorrect: prevState.numOfStars === prevState.selectedNumbers.reduce((sum,i) => sum+i,0)
        }))
    }

    redraw = () => {
        if(this.state.redrawCount ===0)
            return;
        this.setState((prevState) => ({
            numOfStars:Game.randomStars(),
            redrawCount:prevState.redrawCount - 1,
            selectedNumbers:[],
            answerIsCorrect:null
        }), this.updateDoneStatus)
    }

    acceptAnswer = () => {
        this.setState((prevState) =>({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numOfStars: Game.randomStars()
        }), this.updateDoneStatus)
    }

    updateDoneStatus = () => {
        this.setState((prevState) => {
            if(prevState.usedNumbers.length === 9)
                return {
                doneStatus:"Done. You Won!"
                }
            if(prevState.redrawCount === 0 && !this.possibleSolution(prevState))
                return{
                doneStatus: "Game Over. Try Again"
                }
        })
    }

    possibleSolution = ({numOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) == -1
        )
        return possibleCombinationSum(possibleNumbers, numOfStars);
    }

    render() {
        const {
            numOfStars,
            selectedNumbers,
            answerIsCorrect,
            redrawCount,
            usedNumbers,
            doneStatus
        } = this.state;
        return(
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-2"}></div>
                    <div className={"col-8"}>
                        <h2>Play Nine</h2>
                        <hr/>
                        <div className={"row"}>
                            <Stars numOfStars={numOfStars} />
                            <Button
                                acceptAnswer={this.acceptAnswer}
                                redrawCount={redrawCount}
                                redraw={this.redraw}
                                checkAnswer={this.checkAnswer}
                                updateStatus={this.updateStatus}
                                answerIsCorrect={answerIsCorrect}
                                selectedNumbers={selectedNumbers}
                                numOfStars={numOfStars}
                            />
                            <Answer
                                unSelectNumber={this.unSelectNumber}
                                selectedNumbers={selectedNumbers}
                            />
                            {
                                doneStatus?
                                    <DoneFrame doneStatus={doneStatus}/>:
                                    <Numbers
                                        usedNumbers={usedNumbers}
                                        selectNumber={this.selectNumber}
                                        selectedNumbers={selectedNumbers}
                                    />
                            }
                        </div>
                    </div>
                    <div className={"col-2"}></div>
                </div>
            </div>
        );
    }

}

export default Game;