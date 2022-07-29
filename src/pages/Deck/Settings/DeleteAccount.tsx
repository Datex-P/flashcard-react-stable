import React, { useState } from "react";
import Button from './Button';
import { Modal } from "react-bootstrap";

function DeleteAccount() {
  const [deleteAccountPrompt, setDeleteAccountPrompt] = useState(false);

  return (
    <>
      <div
        className='justify-center mt-73px cursorPointer settings__deleteAccount'
        onClick={() => setDeleteAccountPrompt(true)}
      >
        Delete Account
      </div>
      {deleteAccountPrompt &&
        <div className='settings__deleteAccount-cont'>
          <Modal
            show={true}
            backdrop='static'
            keyboard={false}
            id='settings__deleteModal'
            centered
          >
            <Modal.Header>
              <Modal.Title>Delete account</Modal.Title>
            </Modal.Header>
            <Modal.Body className='align-center flex-column'>
              Delete your account now?
            </Modal.Body>
            <div className='width75pc marginAuto posRelative justify-between'>
              <Button setDeleteAccountPrompt={setDeleteAccountPrompt} />
              <Button setDeleteAccountPrompt={setDeleteAccountPrompt} ok />
            </div>
          </Modal>
        </div>
      }
    </>
  );
}

export default DeleteAccount;
