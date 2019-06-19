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
import './RegisterModal.scss';

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
    logoutClickEvent: PropTypes.func,
    closeModalEvent: PropTypes.func,
    firebaseUser: PropTypes.object,
    closeModal: PropTypes.func,
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
    const newCustomer = { ...this.state.newCustomer };
    newCustomer.firebaseId = firebaseUser.uid;
    newCustomer.photo = firebaseUser.photoURL;
    newCustomer.email = firebaseUser.email;
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
    //       className='form-control'
    //       type='text'
    //       name='phone'
    //       id='phoneNumber'
    //       placeholder='123-456-7890'
    //       onChange={this.phoneNumberChange}
    //       value={newCustomer.phoneNumber}
    //     />
    //   } else {
    //     return <AvInput
    //       className='form-control'
    //       type='text'
    //       name='phone'
    //       id='phoneNumber'
    //       placeholder={firebaseUser.phoneNumber}
    //       onChange={this.phoneNumberChange}
    //       value={newCustomer.phoneNumber}
    //     />
    //   }
    // }

    return (
      <div className='RegisterModal'>
        <Modal
          className='form-modal'
          isOpen={this.state.modal}
          toggle={e => this.toggle(e)}
          centered
          size='lg'
          backdrop='static'
          id='register-modal'
        >
          <ModalHeader>Customer Registration</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.formSubmit}>
              <Row form>
                <Col md>
                  <FormGroup>
                    <Label for='fullName' size='sm' className='modal-label'>Full Name</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='fullName'
                      id='fullName'
                      placeholder={firebaseUser.displayName}
                      onChange={this.fullNameChange}
                      value={newCustomer.displayName}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for='email' size='sm' className='modal-label'>Email Address</Label>
                    <Input
                      className='cool-border'
                      type='email'
                      name='email'
                      id='customerEmail'
                      value={firebaseUser.email}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for='phone' size='sm' className='modal-label'>Phone Number</Label>
                    {/* {isPhoneNumberNull()} */}
                    <Input
                      className='cool-border'
                      type='text'
                      name='phone'
                      id='phoneNumber'
                      placeholder='123-456-7890'
                      onChange={this.phoneNumberChange}
                      value={newCustomer.phoneNumber}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md>
                  <FormGroup>
                    <Label for='address1' size='sm' className='modal-label'>Address 1</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='address1'
                      id='address1'
                      placeholder='123 Broadway'
                      onChange={this.address1Change}
                      value={newCustomer.address1}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md>
                  <FormGroup>
                    <Label for='address2' size='sm' className='modal-label'>Address 2</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='address2'
                      id='address2'
                      placeholder='apt, unit, etc'
                      onChange={this.address2Change}
                      value={newCustomer.address2}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={5}>
                  <FormGroup>
                    <Label for='city' size='sm' className='modal-label'>City</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='city'
                      id='city'
                      placeholder='Nashville'
                      onChange={this.cityChange}
                      value={newCustomer.city}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for='state' size='sm' className='modal-label'>State</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='state'
                      id='state'
                      placeholder='TN'
                      onChange={this.stateChange}
                      value={newCustomer.state}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={5}>
                  <FormGroup>
                    <Label for='zipcode' size='sm' className='modal-label'>Zipcode</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='zipcode'
                      id='zipcode'
                      placeholder='37204'
                      onChange={this.zipcodeChange}
                      value={newCustomer.zipcode}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
                <Button className='btn submit-btn'>
                  Submit
                </Button>
                <Button className='btn cancel-btn' onClick={this.props.logoutClickEvent}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default RegisterModal;