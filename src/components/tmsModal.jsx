import { Button, Modal } from "flowbite-react";

const TmsModal = ({
  openModal,
  handleClose,
  title,
  children,
  onSubmit,
  hideFooter,
  disableButton,
  size,
}) => {
  return (
    <>
      <Modal size={size} show={openModal} onClose={handleClose}>
        <Modal.Header>{title}</Modal.Header>

        <Modal.Body>{children}</Modal.Body>

        {!hideFooter && (
          <Modal.Footer className="flex justify-end">
            <Button disabled={disableButton} onClick={onSubmit}>
              Submit
            </Button>
            <Button color="gray" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default TmsModal;
