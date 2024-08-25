"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export function TmsModal({
  openModal,
  handleClose,
  title,
  children,
  onSubmit,
}) {
  return (
    <>
      <Modal show={openModal} onClose={handleClose}>
        <Modal.Header>{title}</Modal.Header>
        {children}
        <Modal.Footer className="flex justify-end">
          <Button onClick={onSubmit}>I accept</Button>
          <Button color="gray" onClick={handleClose}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
