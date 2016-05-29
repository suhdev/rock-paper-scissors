import * as React from 'react';
export function IconButton(props) {
    return (React.createElement("div", {onClick: props.onClick, className: "icon-btn " + (props.className ? props.className : "")}, React.createElement("i", {className: props.icon})));
}
//# sourceMappingURL=IconButton.js.map