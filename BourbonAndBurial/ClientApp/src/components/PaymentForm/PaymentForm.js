import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import './PaymentForm.scss';

class Payment extends React.Component {
  static propTypes = {
    customerObject: PropTypes.object,
  }

  render() {
    const { customerObject } = this.props;

    return (
      <div className='Payment'>
        <Form >
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
                  value={customerObject.displayName}
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
                  value={customerObject.email}
                  readOnly
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='phone' size='sm' className='modal-label'>Phone Number</Label>
                <Input
                  className='cool-border'
                  type='text'
                  name='phone'
                  id='phoneNumber'
                  onChange={this.phoneNumberChange}
                  value={customerObject.phoneNumber}
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
                  value={customerObject.address1}
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
                  value={customerObject.address2}
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
                  value={customerObject.city}
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
                  value={customerObject.state}
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
                  value={customerObject.zipcode}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Payment;