import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';

const defaultCustomer = {
  displayName: '',
  email: '',
  firebaseId: '',
  isActive: true,
}

class RegisterModal extends React.Component {
  static propTypes = {
    closeModalEvent: PropTypes.func,
  }
  
  state = {
    modal: false,
    newCustomer: defaultCustomer,
  };

  toggle() {
    this.setState({
      modal: !this.state,
    });
  }

  modalClosed() {
    const { closeModalEvent } = this.props;
    closeModalEvent();
    this.setState({
      newCustomer: defaultCustomer,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      modal: props.showModal,
      firebaseUser: props.firebaseUser,
    });
  }

  formFieldStringState = (name, event) => {
    event.preventDefault();
    const tempCustomer = { ...this.state.newCustomer };
    tempCustomer[name] = event.target.value;
    this.setState({
      newCustomer: tempCustomer,
    });
  };

  firstNameChange = event => this.formFieldStringState('firstName', event);

  lastNameChange = event => this.formFieldStringState('lastName', event);

  emailChange = event => this.formFieldStringState('email', event);

  render() {
    const {newCustomer} = this.state;
    const {firebaseUser} = this.props;
    return (
      <div className="RegisterModal">
        <Modal
          className="form-modal"
          isOpen={this.state.modal}
          toggle={e => this.toggle(e)}
          onClosed={e => this.modalClosed(e)}
          centered
          size="lg"
        >
          <ModalHeader toggle={e => this.toggle(e)}>Customer Registration</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="John"
                      onChange={this.firstNameChange}
                      value={newCustomer.firstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Smith"
                      onChange={this.lastNameChange}
                      value={newCustomer.lastName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={10}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      className="form-input"
                      type="email"
                      name="email"
                      id="customerEmail"
                      placeholder={firebaseUser.email}
                      onChange={this.emailChange}
                      value={newCustomer.Email}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.formSubmit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={e => this.toggle(e)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;