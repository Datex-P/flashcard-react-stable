import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import Hamburger from "./Hamburger";
import "../../styles.scss";
import './menu.css'
import { Context } from "../../Context";
import Icon from "./Icon";
import ShowProgressD from "../../LandingPage/ShowProgressDiagram";
import settingsIcon from '../../icons/settings.svg';
import statsIcon from '../../icons/stats.svg'
import logoutIcon from '../../icons/logout.svg'


export default function MenuContainer({showProgressDiagram,setShowProgressDiagram,hideCreateDeckBtn}) {
  const [menuOpen, setMenuOpen] = useState(false); //opens the Menu when set to true
  const { dataBase, styles,editButtonClicked, hideMenu} = useContext(Context);
  const handleClose = () => {setMenuOpen(false)}; // closes the Menu when handleclos is triggered

  return (

    <div 
      className='mt-25px height100px'
      style={{display: hideMenu? 'none':'block'}}
    >
      <Hamburger
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        hideCreateDeckBtn={hideCreateDeckBtn}
      />
       {menuOpen && editButtonClicked && 
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
                      // style: {
                      //   width: "calc(100% / 3)",
                      //   padding: "11px 8px 1px 15px",
                      //   textDecoration:'none',
                       
                      // },
                      style:{
                        // width: "33%",
                     
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
                      // style: {
                      //   width: "calc(100% / 3)",
                      //   padding: "11px 8px 1px 15px",
                      //   borderLeft: "2px solid black",
                      //   borderRight: "2px solid black",
                      //   textDecoration: 'none',
                        
                      // },
                      style:{
                        // width: "33%",
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
                      // style: {
                      //   width: "calc(100% / 3)",
                      //   padding: "11px 8px 1px 5px",
                      //   textDecoration: 'none',
                     
                      // },
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
        showProgressDiagram &&
          <ShowProgressD/>
          } 
    </div>
  );
}

function Icons({ icons }) {
  return icons.map((icon, key) => <Icon key={key} {...icon} />);
}
