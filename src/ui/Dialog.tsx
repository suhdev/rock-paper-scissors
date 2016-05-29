import * as React from 'react'; 
import {IconButton} from './IconButton';

export interface DialogProps{
	visible: boolean;
	onBackdropClick?: Function;
	onClose: Function;
	className?: string;
}

export interface DialogState {
    
}

export class Dialog extends React.Component<DialogProps,DialogState>{
    constructor(props:DialogProps){
        super(props);
        this.state = {};
    }
    
    render(){
        let props = this.props,
            clz = props.className || '';
        return (
            <div className={"of-dialog " + clz} data-visible={props.visible}>
                <div className="of-backdrop" onClick={props.onBackdropClick}></div>
                <div className="of-dialog-container">
                    <IconButton className="of-close-button" onClick={props.onClose} icon="fa fa-times" />
                    <div className="of-content-container">
                        {props.children}
                    </div>
                </div>
            </div>
        );
    }
}