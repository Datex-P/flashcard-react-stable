import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Hamburger from './Hamburger';
import '../../styles.scss';
import './menu.css'
import { Context } from '../../Context';
import Icon from './Icon';
import ShowProgressD from '../../LandingPage/ShowProgressDiagram';
import settingsIcon from '../../icons/settings.svg';
import statsIcon from '../../icons/stats.svg'
import logoutIcon from '../../icons/logout.svg'


export default function MenuContainer() {
  const {dataBase, editButtonClicked, showProgressDiagram} = useContext(Context);
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
                  icons={[
                    {
                      src: statsIcon,
                      alt: "statsIcon",
                      href: "stats",
                      style:{
                        textDecoration: 'none',
                        height: '30px',
                        display: 'flex',
                        flex: '1',
                        justifyContent:'center',
                        alignItems:'center'
                      }
                    },
                    {
                      src: settingsIcon,
                      alt: "settingsIcon",
                      href: "settings",
                      style:{
                        textDecoration: 'none',
                        height: '30px',
                        display: 'flex',
                        flex: '1',
                        justifyContent:'center',
                        alignItems:'center',
                        borderLeft: "2px solid black",
                        borderRight: "2px solid black"
                      }
                    },
                    {
                      src: logoutIcon,
                      alt: "logoutIcon",
                      href: "logout",
                      style:{
                        textDecoration: 'none',
                        height: '30px',
                        display: 'flex',
                        flex: '1',
                        justifyContent:'center',
                        alignItems:'center'
                      }
                    },
                  ]}
                />  
              </div>
            </Modal.Body>
          </Modal>
         </div> 
        }
       {
        showProgressDiagram && //dissapears when stats or settings page is open
        dataBase?.DeckNames?.length > 0  //handle case that deck but no cards
          &&
          <ShowProgressD/>
          }  
    </div>
  );
}

function Icons({ icons }) {
  return icons.map((icon, key) => <Icon key={key} {...icon} />);
}
