import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/welcomePage.css'


class frontPage extends React.Component {
  state = {
    player1:"",
    player2:'',
    CPU:0,
    difficulty:0
  }

  handlePlayCpuEasy = () =>{
      this.setState({
        CPU:1,
        difficulty:0
      })
  }

  handlePlayCpuHard = () =>{
      this.setState({
        CPU:1,
        difficulty:1
      })
  }

  handlePlayUser = () =>{
      this.setState({
        CPU:0
      })
  }

  handleName1 = (event) =>{
    this.setState({
      player1:event.target.value
    })

    // console.log(this.state.player1)
  }

  handleName2 = (event) =>{
    this.setState({
      player2:event.target.value
    })
    // console.log(this.state.player2)
  }

  handleSaveNames = () =>{
    localStorage.setItem("CPU_player",this.state.CPU)
    localStorage.setItem("Difficulty",this.state.difficulty)
    localStorage.setItem("player_1",this.state.player1)
    localStorage.setItem("player_2",this.state.player2)
  }

  render() {
    return (
      <div className="game">

        <button className="btn" onClick={()=>this.handlePlayCpuEasy()}>Play against CPU Easy</button>
        <button className="btn" onClick={()=>this.handlePlayUser()}>Two Player Game</button>
        <button className="btn" onClick={()=>this.handlePlayCpuHard()}>Play against CPU AI Bot</button>
        <h1>Enter your names</h1>

        <input type="text" placeholder="Player 1" value={this.state.player1} onChange={this.handleName1} />
        {!this.state.CPU && <input type="text" placeholder="Player 2" value={this.state.player2} onChange={this.handleName2} />}
        <Link to="/board">                                                                                                        
          <button className="btn" onClick={()=>this.handleSaveNames()}>Start new game</button>
        </Link>
      </div>
    )
  }
}

export default Scoreboard;