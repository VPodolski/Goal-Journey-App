import React, {Component} from 'react';
import {Container} from 'reactstrap';

export class Layout extends Component {
    render() {
        return (
            <div className={"desktop-layout"}>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}