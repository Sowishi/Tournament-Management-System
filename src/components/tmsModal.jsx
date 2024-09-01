import { Button, Modal } from "flowbite-react";

const TmsModal = ({
  openModal,
  handleClose,
  title,
  children,
  onSubmit,
  hideFooter,
}) => {
  return (
    <>
      <Modal show={openModal} onClose={handleClose}>
        <Modal.Header>{title}</Modal.Header>

        <Modal.Body>{children}</Modal.Body>

        {!hideFooter && (
          <Modal.Footer className="flex justify-end">
            <Button onClick={onSubmit}>Submit</Button>
            <Button color="gray" onClick={handleClose}>
              Decline
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default TmsModal;
