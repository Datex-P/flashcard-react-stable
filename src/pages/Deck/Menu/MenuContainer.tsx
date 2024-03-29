import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Hamburger from './Hamburger';
import '../../../styles.scss';
import './menu.css'
import { Context } from '../../../context/Context';
import Icon from './Icon';
//import ShowProgressD from '../../LandingPage/ShowProgressDiagram';
import {iconsArr} from './iconsArr'


export default function MenuContainer() {

  const {
   // dataBase, 
    editButtonClicked, showProgressDiagram, setShowProgressDiagram} = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false); //opens the Menu when set to true
  const handleClose = () => {setMenuOpen(false)}; // closes the Menu when handleclos is triggered




  useEffect(()=>{
    console.log(showProgressDiagram, 'show progress here')
  },[showProgressDiagram])

  return (
    <div className='mt-25px height100px justify-between pl-20px pr-10px'>
      <Hamburger
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
       {
       menuOpen && 
       editButtonClicked && 
        <div className='posAbsolute width200px height200px'> 
          <Modal
             show={menuOpen}
            // onHide={handleClose}
            //  contentClassName={"modNew"}
             dialogClassName='align-items-start  pl-3 outline-none'
            // centered
          > 
            <Modal.Body className='p-0 menu__modalbody posRelative'>
              <div 
                className='d-flex mt-50px menu__cont z-Index5 marginAuto nonDraggableIcon'
                onClick={handleClose}
              >
                 <Icons
                  icons={iconsArr}
                  setShowProgressDiagram={setShowProgressDiagram}
                />  
              </div>
            </Modal.Body>
          </Modal>
         </div> 
        }
       {/* {
        showProgressDiagram && //dissapears when stats or settings page is open
        dataBase?.DeckNames?.length > 0  //handle case that deck but no cards
          &&
          <ShowProgressD/>
          }   */}
    </div>
  );
}

function Icons({ icons, setShowProgressDiagram }) {
  return icons.map((icon, key) => <Icon key={key} {...icon} />);
}
