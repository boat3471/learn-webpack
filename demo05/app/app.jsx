import React from 'react';
import ReactDOM from 'react-dom';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="box">
                <h1>Hello React</h1>
            </div>
        );
    }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDOM.render(<AppComponent/>, div);