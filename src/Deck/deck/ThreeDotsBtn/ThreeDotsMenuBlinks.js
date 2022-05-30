import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function ThreeDotsMenuBlinks(e, ref,editButtonClicked, menuCloses,saveIconBlinks) {

    console.log('got triggered in outside alerter')
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(e) {

            if ( (ref[0].current && !ref[0].current.contains(e.target)) ) {
                if(editButtonClicked){
                    menuCloses()
                    // ()=>{setShow(false)}
                } else {
                    if(ref[1].current && !ref[1].current.contains(e.target)) {
                        saveIconBlinks()
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }
    //handleClickOutside(e);
    }, [ref,editButtonClicked, menuCloses, saveIconBlinks]);
}

export default ThreeDotsMenuBlinks