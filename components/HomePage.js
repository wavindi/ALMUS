
import React from 'react'
import homePage from "./homepage.png"
import gifHomepage from "../gifHomepage.gif"
import "../App.css"
import {  useNavigate } from 'react-router-dom'
export default function HomePage() {
const style = {
  width : "100%",
  height: "100vh"
  
  
}
const Navigate = useNavigate()
function goToGout(){
  Navigate("/gouts")
}

  return (
    <div className='App-header' style={{margin : 0,padding:0}}>
      
      <img src = {gifHomepage} alt = "homePage" style={style} onClick={goToGout}/>
      {/*<img src = {homePage} alt = "homePage" style={style}/>*/}
     
      
    </div>
  )
}
