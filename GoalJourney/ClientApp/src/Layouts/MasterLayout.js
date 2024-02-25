import React, {Component} from 'react';
import {Container} from 'reactstrap';

export class Layout extends Component {
    render() {
        return (
            <div className={"desktop-layout"}>
                <div className={"col-4"}></div>
                <Container className={"col-4"}>
                    {this.props.children}
                </Container>
                <div className={"col-4"}></div>
            </div>
        );
    }
}