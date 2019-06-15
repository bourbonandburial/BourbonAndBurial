import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';

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
    console.log('hi');
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
    //     return <AvInput
    //       className="form-control"
    //       type="text"
    //       name="phone"
    //       id="phoneNumber"
    //       placeholder="123-456-7890"
    //       onChange={this.phoneNumberChange}
    //       value={newCustomer.phoneNumber}
    //     />
    //   } else {
    //     return <AvInput
    //       className="form-control"
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
            <AvForm onSubmit={this.formSubmit}>
              <Row form>
                <Col md>
                  <AvGroup>
                    <Label for="fullName">Full Name</Label>
                    <AvInput
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder={firebaseUser.displayName}
                      onChange={this.fullNameChange}
                      value={newCustomer.displayName}
                      required
                    />
                  </AvGroup>
                  <AvFeedback>Please enter valid input.</AvFeedback>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <AvGroup>
                    <Label for="email">Email Address</Label>
                    <AvInput
                      type="email"
                      name="email"
                      id="customerEmail"
                      placeholder={firebaseUser.email}
                      onChange={this.emailChange}
                      value={newCustomer.email}
                      required
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>

                  </AvGroup>
                </Col>
                <Col md={6}>
                  <AvGroup>
                    <Label for="phone">Phone Number</Label>
                    {/* {isPhoneNumberNull()} */}
                    <AvInput
                      type="text"
                      name="phone"
                      id="phoneNumber"
                      placeholder="123-456-7890"
                      onChange={this.phoneNumberChange}
                      value={newCustomer.phoneNumber}
                      required
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>

                  </AvGroup>
                </Col>
              </Row>
              <Row form>
                <Col md>
                  <AvGroup>
                    <Label for="address1">Address 1</Label>
                    <AvInput
                      type="text"
                      name="address1"
                      id="address1"
                      placeholder="123 Broadway"
                      onChange={this.address1Change}
                      value={newCustomer.address1}
                      required
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>

                  </AvGroup>
                </Col>
              </Row>
              <Row form>
                <Col md>
                  <AvGroup>
                    <Label for="address2">Address 2</Label>
                    <AvInput
                      type="text"
                      name="address2"
                      id="address2"
                      placeholder="apt, unit, etc"
                      onChange={this.address2Change}
                      value={newCustomer.address2}
                      required
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>

                  </AvGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={5}>
                  <AvGroup>
                    <Label for="city">City</Label>
                    <AvInput
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Nashville"
                      onChange={this.cityChange}
                      value={newCustomer.city}
                      required
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>

                  </AvGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={2}>
                  <AvGroup>
                    <Label for="state">State</Label>
                    <AvInput
                      type="text"
                      name="state"
                      id="state"
                      placeholder="TN"
                      onChange={this.stateChange}
                      value={newCustomer.state}
                      required
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>

                  </AvGroup>
                </Col>
                <Col md={5}>
                  <AvGroup>
                    <Label for="zipcode">Zipcode</Label>
                    <AvInput
                      required
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder="37204"
                      onChange={this.zipcodeChange}
                      value={newCustomer.zipcode}
                    />
                    <AvFeedback>Please enter valid input.</AvFeedback>
                  </AvGroup>
                </Col>
              </Row>
            </AvForm>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.formSubmit}> */}
            <Button color="primary">
              Submit
            </Button>
            {/* <Button color="secondary" onClick={e => this.toggle(e)}>
              Cancel
            </Button> */}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;