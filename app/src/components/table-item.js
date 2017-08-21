import React from 'react';
import { Label } from 'react-bootstrap';

const TableItem = (props) => (
    <tr>
        <td>{props.index && props.index + 1}</td>
        <td>{props.data && props.data.name}</td>
        <td>{props.data && props.data.red && <Label bsStyle="danger">yes</Label>}</td>
        <td >{props.data && props.data.green && <Label bsStyle="success" >yes</Label>}</td>
        <td>{props.data && props.data.blue && <Label bsStyle="primary">yes</Label>}</td>
    </tr>
);

export default TableItem;