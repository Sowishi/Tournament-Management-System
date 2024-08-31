import { Button, Modal } from "flowbite-react";

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
          <Button onClick={onSubmit}>Submit</Button>
          <Button color="gray" onClick={handleClose}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
