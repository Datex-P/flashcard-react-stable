import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import Hamburger from "./Hamburger";
import "../../styles.scss";
import { Context } from "../../Context";
import Icon from "./Icon";
import ShowProgressD from "../../LandingPage/ShowProgressDiagram";
const settingsIcon = require("../../icons/settings.svg") as string;
const statsIcon = require("../../icons/stats.svg") as string;
const logoutIcon = require("../../icons/logout.svg") as string;


export default function MenuContainer({showProgressDiagram,setShowProgressDiagram}:any) {
  const [menuOpen, setMenuOpen] = useState(false); //opens the Menu when set to true
  const { dataBase, styles,
     editButtonClicked
     } = useContext(Context);
  const handleClose = () => {setMenuOpen(false)
  console.log('I got clicked')
  }; // closes the Menu when handleclos is triggered

  return (
    <div
      className='mx-auto menuContainer justify-between'
      style={{
        // backgroundColor:
        //   dataBase &&
        //   styles.backgroundColor[dataBase.userPreferences.backgroundColor],
      }}
    >
      <Hamburger
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

       {menuOpen && editButtonClicked && 
         <div style={{ position:'absolute', width:'200px',height:'200px'}}> 
          <Modal
             show={menuOpen}
            // onHide={handleClose}
             contentClassName={"modNew"}
            dialogClassName='align-items-start  pl-3'
            // centered
          >
            <Modal.Body className='p-0 menuContainer__modalbody'>
              <div
                className='menuStyling height100px z-Index5 marginAuto nonDraggableIcon'
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
