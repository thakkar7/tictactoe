import React,{Component} from 'react'

const Box = (props) =>{
	return(
			<button className="button_instance" onClick={props.onClick}>{props.value}</button> 
		)
}

export default Box;