import React,{useContext} from 'react';
import { Nav } from 'react-bootstrap'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {Context} from '../../../context/Context'

  // https://www.dev-eth0.de/2019/09/10/using-withrouter-in-a-typescript-react-component/
  /*link showed how to use typescript with reactrouter */

 function Icon({ src, alt, href, style = null,history }
  
  :RouteComponentProps | any): JSX.Element
  
   {
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
      className='menu__icon-container'
      onClick={clickHandler}   
    >
      <img 
        src={src} 
        alt={alt} 
        className='nonDraggableIcon width20px'                                              
      />    
      <Nav.Link > 
          {href} 
      </Nav.Link>
    </span>
  )
}

export default withRouter(Icon)
