import React from "react";
import { Alert } from "react-bootstrap";

/*
https://stackoverflow.com/questions/64656055/react-refers-to-a-umd-global-but-the-current-file-is-a-module
'React' refers to a UMD global, but the current file is a module.
 Consider adding an import instead.
*/

export default function CardModified() {
 return(
 <div className='bs-5 justify-center-align-center height52px'>
    <Alert
      variant="success"
      style={{width: '145px', height: '35px'}}
    >
      Card was modified.
    </Alert>
</div>
)
}