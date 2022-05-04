import React,{useContext} from 'react';
import { Nav } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import {Context} from '../../Context'

 function Icon({ src, alt, href, style = null,history }) {
  const {setShowProgressDiagram} = useContext(Context)

  function clickHandler () {
    setShowProgressDiagram(false)
    history.push('/'+href)
    if (href === 'settings') {
      console.log('settings here huray')
    }
  }

  return (
    <span
      style={{ ...style}}
      className='iconContainer'
      onClick={clickHandler}   
      >
      <img 
        src={src} 
        alt={alt} 
        style={{width: '20px'}} 
        className='nonDraggableIcon'                                              
      />    
      <Nav.Link > 
          {href} 
      </Nav.Link>
    </span>
  )
}

export default withRouter(Icon)
