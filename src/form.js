import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap';

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 6) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onHandleDate({
      name: this.state.value,
      isRed: this.checkboxRed.checked,
      isGreen: this.checkboxGreen.checked,
      isBlue: this.checkboxBlue.checked
    });
    this.setState({ value: ''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleChange}
              />

              <FormControl.Feedback />
            </FormGroup>
          </div>
          <div className="col-xs-12 text-left">
            <FormGroup>
              <Checkbox inline inputRef={ref => { this.checkboxRed = ref; }} >
                red
              </Checkbox>
              {' '}
              <Checkbox inline inputRef={ref => { this.checkboxGreen = ref; }}>
                green
              </Checkbox>
              {' '}
              <Checkbox inline inputRef={ref => { this.checkboxBlue = ref; }}>
                blue
              </Checkbox>
            </FormGroup>
            <Button type="submit">Send</Button>
          </div>
        </div>
      </form>
    );
  }
}

export default FormComponent;
