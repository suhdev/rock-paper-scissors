import * as React from 'react';
export class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(props) {
        return props.image !== this.props.image ||
            props.className !== this.props.className;
    }
    render() {
        let clz = this.props.className || '';
        return (React.createElement("div", {className: "logo " + clz}, React.createElement("img", {src: this.props.image})));
    }
}
//# sourceMappingURL=Logo.js.map