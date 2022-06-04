import { Alert } from "react-bootstrap";

export default function CardModified() {
 return(
 <div className='bs-5 justify-center-align-center height52px'>
    <Alert
      variant="success"
      style={{ width: "145px", height: "35px" }}
    >
      Card was modified.
    </Alert>
</div>
)
}