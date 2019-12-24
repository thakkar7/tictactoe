import React,{Component} from 'react';
import Box from './box.js';
import {Link} from 'react-router-dom'
import * as utils from '../utils/functions'
import * as xyz from '../utils/minimax.js'

var cpu_present
var user_play=0
var isFilled
class Board extends React.Component{
	constructor(props){
		super(props)
		this.state={
			boxes : Array(9).fill(null),
			xIsNext : (Math.floor((Math.random()*100)+1)%2),
			gameStarter:0,
			history : [],
			Player_1:"",
			Player_2:"",
			P1_score:0,
			P2_score:0,
			difficulty:0
		}
	}


	componentDidMount = () =>{
    	
    	 cpu_present = localStorage.getItem("CPU_player");
    	if(cpu_present==="1")
    	{
    		this.setState({
    			Player_1 : localStorage.getItem("player_1"),
    			Player_2 : "CPU",
    			difficulty:localStorage.getItem("Difficulty")
    		})	
    	}
    	else
    	{
    		this.setState({
    			Player_1 : localStorage.getItem("player_1"),
    			Player_2 : localStorage.getItem("player_2")
    		})
    		
    	}

    	this.setState({gameStarter:this.state.xIsNext})

    	setTimeout(function(){
    		if(this.state.gameStarter===0 && cpu_present==='1')
    			{
    				this.handleCPUPlayerEasy()
    			}
    	
    		}.bind(this),2000)

    	// console.log(this.state.xIsNext)

    }


	handleCPUPlayerEasy = () =>{
		let cpu_index
		let boxes =this.state.boxes.slice()
		// console.log("CPU chalega")

		if(this.state.difficulty==="1")
			cpu_index = xyz.findAiMove(boxes)
		else
			cpu_index = Math.floor(Math.random()*9)
		
		// console.log(cpu_index,"CPU INDEX")
		if(this.state.boxes[cpu_index])
			{
				console.log(cpu_index)
				this.handleCPUPlayerEasy()
			}
		else
			{
				user_play=1
				this.handleBoxClick(cpu_index)
			}
	    	
	    }


	handleBoxClick(index){
		user_play = !user_play
		const boxes =this.state.boxes.slice()
		let history = this.state.history
		if(utils.findWinner(boxes) || boxes[index]){
			return;
		}

		if(utils.areAllBoxesClicked(boxes) === true)
			return;

		boxes[index] = this.state.xIsNext?'x':'o'

		history.push(this.state.xIsNext?'x':'o')

		this.setState({
			boxes:boxes,
			history:history,
			xIsNext:!this.state.xIsNext
		})
		setTimeout(function(){
		if(cpu_present==="1" && user_play && !utils.findWinner(boxes) && !utils.areAllBoxesClicked(boxes) && !isFilled)
			{
				this.handleCPUPlayerEasy()
			}

	}.bind(this),2000)
	}

	handleBoardRestart = () =>{
		this.setState({
			boxes : Array(9).fill(null),
			xIsNext : (Math.floor((Math.random()*10)+1)%2),
			history : [],
			P1_score:0,
			P2_score:0,
			gameStarter:0
		})
	}

	handleContinueGame = () =>{
		
//******************* try to directly increment the scores without calling the findWinner function twice************************ 
		var winner = utils.findWinner(this.state.boxes)
		if(winner===1)
			this.setState({P1_score:this.state.P1_score+1})
		else if(winner===2)
			this.setState({P2_score:this.state.P2_score+1})

		this.setState({
			boxes : Array(9).fill(null),
			xIsNext : !this.state.gameStarter,
			gameStarter : !this.state.gameStarter,
			history : [],
			user_play:0
		})

		// console.log("GAME STARTER",this.state.gameStarter)
		setTimeout(function(){

			// console.log("GAME STARTER within timeout",this.state.gameStarter)
		if(cpu_present==="1" && !this.state.gameStarter)
			{

				this.handleCPUPlayerEasy()
			}

	}.bind(this),2000)
		// console.log(this.state.xIsNext);
		// console.log(this.state.P1_score);
		// console.log(this.state.P2_score);
	}

	render(){
		var winner = utils.findWinner(this.state.boxes)
		isFilled = utils.areAllBoxesClicked(this.state.boxes)

		var status

		if(winner===1 || winner===2){
			status= `the winner is ${winner}!`
		}else if(!winner && isFilled){
			status="drawn"
		}
		else
		{
			status = `${(this.state.xIsNext?this.state.Player_1:this.state.Player_2)}'s turn.`
		}

		return(
			<div className="bodyDiv" >
				<Link to="/" className="board-link">Restart Game</Link>

				{/* Game Board */}
				{this.state.Player_1}  VS  {this.state.Player_2}
				<div className="board-wrapper">
					<div className="board">
						<h2 className="board-heading">{status}</h2>

						<div className="board-row">
							<button className="board__box" onClick={()=>this.handleBoxClick(0)}/>{this.state.boxes[0]}</button>
							<button className="board__box" onClick={()=>this.handleBoxClick(1)}/>{this.state.boxes[1]}</button>
							<button className="board__box" onClick={()=>this.handleBoxClick(2)}/>{this.state.boxes[2]}</button>
						</div>
						
						<div className="board-row">
							<button className="board__box" onClick={()=>this.handleBoxClick(3)}/>{this.state.boxes[3]}</button>
							<button className="board__box" onClick={()=>this.handleBoxClick(4)}/>{this.state.boxes[4]}</button>
							<button className="board__box" onClick={()=>this.handleBoxClick(5)}/>{this.state.boxes[5]}</button>
						</div>
						
						<div className="board-row">
							<button className="board__box" onClick={()=>this.handleBoxClick(6)}/>{this.state.boxes[6]}</button>
							<button className="board__box" onClick={()=>this.handleBoxClick(7)}/>{this.state.boxes[7]}</button>
							<button className="board__box" onClick={()=>this.handleBoxClick(8)}/>{this.state.boxes[8]}</button>
						</div>
					</div>
				</div>

				<div className="board-history">
	                <h2 className="board-heading">Moves history:</h2>
				 		<ul className="board-historyList">
	                	{this.state.history.length === 0 && <span>No moves to show.</span>}

	                    {this.state.history.length !== 0 && this.state.history.map((move, index) => {
	                        return <li key={index}>Move {index + 1}: <strong>{move}</strong></li>
	                        })}
	                    </ul>
	            </div>

                {/* Button to start new game */}
                {(winner || isFilled) && <button className="btn" onClick={()=>this.handleContinueGame()}>next game</button>}
         		
                
              </div>
        )
	}

}

export default Board;