import React,{Component} from 'react'
import './../styles/box.css'

const Box = (props) =>{
	return(
			<button className="board__box" onClick={props.onClick}>{props.value}</button> 
		)
}

export default Box;