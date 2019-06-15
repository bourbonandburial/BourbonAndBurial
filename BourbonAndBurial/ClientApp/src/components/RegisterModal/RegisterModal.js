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
  phoneNumber: '',
  firebaseId: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipcode: '',
  photo: '',
  isActive: true,
}

class RegisterModal extends React.Component {
  static propTypes = {
    closeModalEvent: PropTypes.func,
    firebaseUser: PropTypes.object,
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

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempCustomer = { ...this.state.newCustomer };
    tempCustomer[name] = e.target.value;
    this.setState({
      newCustomer: tempCustomer,
    });
  };

  fullNameChange = e => this.formFieldStringState('displayName', e);

  emailChange = e => this.formFieldStringState('email', e);

  address1Change = e => this.formFieldStringState('address1', e);

  address2Change = e => this.formFieldStringState('address2', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipcodeChange = e => this.formFieldStringState('zipcode', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, firebaseUser } = this.props;
    console.log(firebaseUser);
    const newCustomer = { ...this.state.newCustomer };
    newCustomer.firebaseId = firebaseUser.uid;
    newCustomer.photo = firebaseUser.photoURL;
    onSubmit(newCustomer);
    this.setState({
      newCustomer: defaultCustomer,
    });
  };

  render() {
    const { newCustomer } = this.state;
    const { firebaseUser } = this.props;

    // const isPhoneNumberNull = () => {
    //   if (firebaseUser.phoneNumber === null) {
    //     return <Input
    //       className="form-input"
    //       type="text"
    //       name="phone"
    //       id="phoneNumber"
    //       placeholder="123-456-7890"
    //       onChange={this.phoneNumberChange}
    //       value={newCustomer.phoneNumber}
    //     />
    //   } else {
    //     return <Input
    //       className="form-input"
    //       type="text"
    //       name="phone"
    //       id="phoneNumber"
    //       placeholder={firebaseUser.phoneNumber}
    //       onChange={this.phoneNumberChange}
    //       value={newCustomer.phoneNumber}
    //     />
    //   }
    // }

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
                <Col md>
                  <FormGroup>
                    <Label for="fullName">Full Name</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder={firebaseUser.displayName}
                      onChange={this.fullNameChange}
                      value={newCustomer.displayName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                      className="form-input"
                      type="email"
                      name="email"
                      id="customerEmail"
                      placeholder={firebaseUser.email}
                      onChange={this.emailChange}
                      value={newCustomer.email}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone Number</Label>
                    {/* {isPhoneNumberNull()} */}
                    <Input
                      className="form-input"
                      type="text"
                      name="phone"
                      id="phoneNumber"
                      placeholder="123-456-7890"
                      onChange={this.phoneNumberChange}
                      value={newCustomer.phoneNumber}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md>
                  <FormGroup>
                    <Label for="address1">Address 1</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="address1"
                      id="address1"
                      placeholder="123 Broadway"
                      onChange={this.address1Change}
                      value={newCustomer.address1}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md>
                  <FormGroup>
                    <Label for="address2">Address 2</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="address2"
                      id="address2"
                      placeholder="apt, unit, etc"
                      onChange={this.address2Change}
                      value={newCustomer.address2}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={5}>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Nashville"
                      onChange={this.cityChange}
                      value={newCustomer.city}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={2}>
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="state"
                      id="state"
                      placeholder="TN"
                      onChange={this.stateChange}
                      value={newCustomer.state}
                    />
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for="zipcode">Zipcode</Label>
                    <Input
                      className="form-input"
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder="37204"
                      onChange={this.zipcodeChange}
                      value={newCustomer.zipcode}
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