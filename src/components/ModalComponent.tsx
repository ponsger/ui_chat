import { Modal, Button } from "react-bootstrap"

type ModalComponentProps = {
    setConsent: (consent: boolean) => void;
}

const ModalComponent = ({setConsent}: ModalComponentProps) => {

    const handleClose = () => {
        // Handle modal close logic here
    }

    const handleSaveChanges = () => {
        // Handle save changes logic here
        setConsent(true);
    }

  return (
    <div>
      <Modal show={true} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal body content</p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => handleClose()}>
                Close
            </Button>
            <Button onClick={() => handleSaveChanges()}>
                Save Changes
            </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default ModalComponent;
