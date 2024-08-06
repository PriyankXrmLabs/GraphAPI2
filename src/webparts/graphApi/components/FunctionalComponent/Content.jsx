import React from 'react'
import './Content.scss'

function Content(props) {


  return (
    <div className=' w-full  flex flex-row flex-wrap c'>
        <h1>hello</h1>
        <img src={props.URL} alt="Image" />
        <img src={props.URL} alt="Image" />
    </div>
  )
}

export default Content