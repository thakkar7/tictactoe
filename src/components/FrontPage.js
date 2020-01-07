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
    if(this.state.player1==="")
      localStorage.setItem("player_1","Player_1")
    else
      localStorage.setItem("player_1",this.state.player1)
    
    if(this.state.player2==="")
      localStorage.setItem("player_2","Player_2")
    else
      localStorage.setItem("player_2",this.state.player1)
  }

  render() {
    return (
      <div className="mainDiv">

        <div className="btnGroup">
          <a href="#" onClick={()=>this.handlePlayUser()} className="btnOne">
            2 Player Game
          </a>

          <a href="#" onClick={()=>this.handlePlayCpuHard()} className="btnTwo">
           <strong> vs CPU (Hard) </strong>
          </a>

          <div className="btnBg"></div>

          <a href="#" onClick={()=>this.handlePlayCpuEasy()} className="btnThree">
            vs CPU (Easy)
          </a>  
        </div>


        <h1>Enter your name(s)</h1>

        <input type="text" className="inputBox" placeholder="Player 1" value={this.state.player1} maxlength="50" required onChange={this.handleName1} />
        {!this.state.CPU && <input type="text" className="inputBox" placeholder="Player 2" value={this.state.player2} maxlength="50" required onChange={this.handleName2} />}
        <Link to="/board">                                                                                                        
          <button className="btnNewGame" onClick={()=>this.handleSaveNames()}><strong>Start new game</strong></button>
        </Link>
      </div>
    )
  }
}

export default frontPage;



