import { Alert } from "react-bootstrap";

export default function CardModified() {
 return(
 <div className="justify-center-align-center height52px">
    <Alert
      variant="success"
      style={{ width: "145px", height: "35px" }}
    >
      Card was modified.
    </Alert>
</div>
)
}