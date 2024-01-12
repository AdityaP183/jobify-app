import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
  const error = useRouteError()
  if(error.status === 404){
    return (
      <Wrapper>
        <div>
          <img src={img} alt="" />
          <h3>Ohhh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to={'/dashboard'}>Let's go back home</Link>
        </div>
      </Wrapper>
    )
  } 
  return (
    <div>
      <h3>Something Went Wrong</h3>
    </div>
  )
}

export default Error
