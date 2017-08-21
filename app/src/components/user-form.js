import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Checkbox } from 'react-bootstrap';
import { filter } from 'lodash';

class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isValid: false
        };

        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getValidationState() {
        const length = this.state.value.length;
        if(!length) return;
        if (length > 4 && length < 9 && /^[a-zа-яё\d]{1}[a-zа-яё\d\s]*[a-zа-яё\d]{1}$/i.test(this.state.value)) {
            return 'success'
        } else {
            return 'warning'
        }
    }

    handleChange(e) {
        const value = e.target.value;
        if (value.length > 4 && value.length < 9 && /^[a-zа-яё\d]{1}[a-zа-яё\d\s]*[a-zа-яё\d]{1}$/i.test(value)) {
            this.setState({ value: value, isValid: true});
        } else {
            this.setState({ value: value, isValid: false });
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {name: this.state.value};
        this.checkboxRed.checked ? data.red = true: null;
        this.checkboxGreen.checked ? data.green = true: null;
        this.checkboxBlue.checked ? data.blue = true: null;
        this.props.onCreateUser(data);
        this.setState({ value: '' , isValid: false});
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
                        <Button type="submit" disabled={!this.state.isValid}>Send</Button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FormComponent;