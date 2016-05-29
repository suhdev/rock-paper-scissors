import * as React from 'react';
import { IconButton } from './IconButton';
export class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let props = this.props, clz = props.className || '';
        return (React.createElement("div", {className: "of-dialog " + clz, "data-visible": props.visible}, React.createElement("div", {className: "of-backdrop", onClick: props.onBackdropClick}), React.createElement("div", {className: "of-dialog-container"}, React.createElement(IconButton, {className: "of-close-button", onClick: props.onClose, icon: "fa fa-times"}), React.createElement("div", {className: "of-content-container"}, props.children))));
    }
}
//# sourceMappingURL=Dialog.js.map