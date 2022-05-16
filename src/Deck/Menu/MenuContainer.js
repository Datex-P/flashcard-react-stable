import React, { useState, useContext } from "react";
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
  const handleClose = () => {setMenuOpen(false)
  console.log('I got clicked')
  }; // closes the Menu when handleclos is triggered
console.log(logoutIcon, 'logiuticon')
  return (
    // <div
    //   className='mx-auto menu__cont justify-between'
    //   style={{
    //     // backgroundColor:
    //     //   dataBase &&
    //     //   styles.backgroundColor[dataBase.userPreferences.backgroundColor],
    //   }}
    // >

  
    <div 
    
    style={{visibility: hideMenu? 'hidden':'visible'}}
    
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
             contentClassName={"modNew"}
             dialogClassName='align-items-start  pl-3'
            // centered
          >
            <Modal.Body className='p-0 menu__modalbody posRelative'>
              <div 
                className='mt-50px menu__cont z-Index5 marginAuto nonDraggableIcon'
                onClick={handleClose}
              >
                 <Icons
                  icons={[
                    {
                      src: statsIcon,
                      alt: "statsIcon",
                      href: "stats",
                      style: {
                        width: "calc(100% / 3)",
                        padding: "3px",
                        paddingLeft: "15px",
                        textDecoration:'none'
                      },
                    },
                    {
                      src: settingsIcon,
                      alt: "settingsIcon",
                      href: "settings",
                      style: {
                        width: "calc(100% / 3)",
                        padding: "3px",
                        borderLeft: "2px solid black",
                        borderRight: "2px solid black",
                        paddingLeft: "15px",
                        textDecoration: 'none'
                      },
                    },
                    {
                      src: logoutIcon,
                      alt: "logoutIcon",
                      href: "logout",
                      style: {
                        width: "calc(100% / 3)",
                        padding: "3px",
                        paddingLeft: "15px",
                        textDecoration: 'none'
                      },
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
