import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from 'reactstrap';
import './PaymentForm.scss';

const defaultPayment = {
  paymentName: '',
  cardName: '',
  acctNumber: '',
  expDate: '',
  CVV: '',
  customerId: 0,
  isActive: true,
}

class PaymentForm extends React.Component {
  static propTypes = {
    customerObject: PropTypes.object,
    onSubmit: PropTypes.func,
  }

  state = {
    newPayment: defaultPayment,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempPayment = { ...this.state.newPayment };
    tempPayment[name] = e.target.value;
    this.setState({ newPayment: tempPayment });
  }

  formFieldNumberState = (name, e) => {
    const tempPayment = { ...this.state.newPayment };
    tempPayment[name] = e.target.value * 1;
    this.setState({ newPayment: tempPayment });
  }

  formFieldDateState = (name, e) => {
    const tempPayment = { ...this.state.newPayment };
    tempPayment[name] = e.target.value;
    this.setState({ newPayment: tempPayment });
    // tempPayment[name] = e.target.value.substring(0, 2) + "/" + e.target.value.substring(2, 4);
    // this.setState({ newPayment: tempPayment });
    // const dateTest = e.target.value.substring(0, 2) + "/" + e.target.value.substring(2, 4);
    // console.log(dateTest);
  }

  cardNameChange = e => this.formFieldStringState('cardName', e);
  paymentNameChange = e => this.formFieldStringState('paymentName', e);
  cardNumberChange = e => this.formFieldNumberState('acctNumber', e);
  expDateChange = e => this.formFieldDateState('expDate', e);
  cvvChange = e => this.formFieldNumberState('CVV', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { customerObject, onSubmit } = this.props;
    const newPayment = { ...this.state.newPayment };
    newPayment.customerId = customerObject.customerId;
    onSubmit(newPayment);
    this.setState({
      newPayment: defaultPayment,
    });
  };

  render() {
    const { newPayment } = this.state;

    return (
      <div className='PaymentForm'>
        <Form className='container' onSubmit={this.formSubmit}>
          <Row>
            <h4 className='form-title'>New Payment</h4>
          </Row>
          <Row form>
            <Col md>
              <FormGroup>
                <Label for='cardName' size='sm' className='modal-label'>Card Name</Label>
                <Input
                  className='cool-border'
                  type='text'
                  name='cardName'
                  placeholder="Maggie's Visa"
                  id='cardName'
                  onChange={this.cardNameChange}
                  value={newPayment.cardName}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={2}>
              <FormGroup>
                <Label for='paymentName' size='sm' className='modal-label'>Payment Type</Label>
                <Input type='select' id='paymentName' className='cool-border' name='paymentName' value={newPayment.paymentName} onChange={this.paymentNameChange}>
                  <option value="" disabled className="text-hide">-Select-</option>
                  <option value='Visa'>Visa</option>
                  <option value='MasterCard'>MasterCard</option>
                  <option value='American Express'>American Express</option>
                  <option value='Discover'>Discover</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for='acctNumber' size='sm' className='modal-label'>Card Number</Label>
                <Input
                  className='cool-border'
                  type='text'
                  name='acctNumber'
                  id='acctNumber'
                  placeholder='1234123412341234'
                  onChange={this.cardNumberChange}
                  value={newPayment.acctNumber}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for='expDate' size='sm' className='modal-label'>Exp Date</Label>
                <Input
                  className='cool-border'
                  name='expDate'
                  id='expDate'
                  // type='text'
                  // placeholder='MM/YY'
                  type="date"
                  onChange={this.expDateChange}
                  value={newPayment.expDate}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for='CVV' size='sm' className='modal-label'>CVV</Label>
                <Input
                  className='cool-border'
                  type='text'
                  name='CVV'
                  id='CVV'
                  placeholder='123'
                  onChange={this.cvvChange}
                  value={newPayment.CVV}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          {/* <Row form>
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
          </Row> */}
          <Button color="secondary">Add Payment</Button>
        </Form>
      </div>
    )
  }
}

export default PaymentForm;
