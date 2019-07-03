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
import './EditModal.scss';

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

class EditModal extends React.Component {
  static propTypes = {
    currentCustomer: PropTypes.object,
    isEditing: PropTypes.bool,
    modalCloseEvent: PropTypes.func,
    editFormSubmitEvent: PropTypes.func,
  }

  state = {
    modal: false,
    customerToUpdate: {},
  };

  toggle() {
    this.setState({
      modal: !this.state,
    });
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempCustomer = { ...this.state.customerToUpdate };
    tempCustomer[name] = e.target.value;
    this.setState({
      customerToUpdate: tempCustomer,
    });
  };


  fullNameChange = e => this.formFieldStringState('displayName', e);

  address1Change = e => this.formFieldStringState('address1', e);

  address2Change = e => this.formFieldStringState('address2', e);

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  zipcodeChange = e => this.formFieldStringState('zipcode', e);

  phoneNumberChange = e => this.formFieldStringState('phoneNumber', e);

  formSubmitEdit = (e) => {
    e.preventDefault();
    const { editFormSubmitEvent, currentCustomer } = this.props;
    const customerToUpdate = { ...this.state.customerToUpdate };
    customerToUpdate.firebaseId = currentCustomer.firebaseId;
    customerToUpdate.photo = currentCustomer.photo;
    customerToUpdate.email = currentCustomer.email;
    editFormSubmitEvent(customerToUpdate);
    this.setState({
      customerToUpdate: defaultCustomer,
    });
  }

  componentWillReceiveProps(props) {
    if (props.isEditing) {
      this.setState({
        isEditing: true,
        customerToUpdate: props.currentCustomer
      });
    }
    this.setState({
      modal: props.showModal,
      customerToUpdate: props.currentCustomer
    });
  }

  render() {
    const { customerToUpdate } = this.state;
    const { modalCloseEvent } = this.props;

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
          <ModalHeader>Edit Customer</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.formSubmitEdit}>
              <Row form>
                <Col md>
                  <FormGroup>
                    <Label for='fullName' size='sm' className='modal-label'>Full Name</Label>
                    <Input
                      className='cool-border'
                      type='text'
                      name='fullName'
                      id='fullName'
                      onChange={this.fullNameChange}
                      value={customerToUpdate.displayName}
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
                      value={customerToUpdate.email}
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
                      type="text"
                      // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      name='phone'
                      id='phoneNumber'
                      onChange={this.phoneNumberChange}
                      value={customerToUpdate.phoneNumber}
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
                      onChange={this.address1Change}
                      value={customerToUpdate.address1}
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
                      onChange={this.address2Change}
                      value={customerToUpdate.address2}
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
                      onChange={this.cityChange}
                      value={customerToUpdate.city}
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
                      onChange={this.stateChange}
                      value={customerToUpdate.state}
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
                      onChange={this.zipcodeChange}
                      value={customerToUpdate.zipcode}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
                <Button className='btn submit-btn'>
                  Submit
                  </Button>
                <Button className='btn cancel-btn' onClick={modalCloseEvent}>
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

export default EditModal;