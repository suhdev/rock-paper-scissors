import * as React from 'react';
export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this, this.props.userData);
    }
    onClick(userData, e) {
        this.props.onClick(userData, e);
    }
    shouldComponentUpdate(props) {
        return props.icon !== this.props.icon ||
            props.label !== this.props.label;
    }
    render() {
        let clz = this.props.className || "";
        let icon = this.props.iconRenderer ? this.props.iconRenderer(this.props.userData) : (this.props.icon) ? (React.createElement("i", {className: this.props.icon})) : undefined;
        return (React.createElement("div", {className: "of-btn " + clz, onClick: this.onClick}, icon, React.createElement("span", {className: "btn-label"}, this.props.label)));
    }
}
//# sourceMappingURL=Button.js.map