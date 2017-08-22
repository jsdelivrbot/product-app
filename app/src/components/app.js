import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import FormComponent from './user-form'
import TableItem from './table-item';
import { connect } from 'react-redux';
import { user, userGetting } from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.onCreateUser = this.onCreateUser.bind(this);
    }
    componentDidMount() {
        this.props.userGetting()
    }
    onCreateUser(data) {
      this.props.user(data)
    }

    render() {
        const { users } = this.props;
        return (
            <div className="App">
                <div className="container">
                    <h2>React App</h2>
                    <FormComponent onCreateUser={this.onCreateUser}/>
                    <br/>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Red</th>
                            <th>Green</th>
                            <th>Blue</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.length ?
                         users.map((item, index) => <TableItem key={index} data={item}
                                                                               index={index}/>) : null}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
const mapStateTOProps = state => {
    return {
        users: state.users
    };
};

export default connect(mapStateTOProps,  { user, userGetting })(App);
