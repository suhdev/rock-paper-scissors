import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 


export interface ButtonProps{
    onClick:Function; 
    label:string; 
    className?:string;
    userData?:any; 
    icon?:string;
    iconRenderer?:(userData:any)=>React.ReactElement<any>; 
}

export interface ButtonState {
    
} 

export class Button extends React.Component<ButtonProps,ButtonState>{
    constructor(props:ButtonProps){
        super(props);
        this.state = {}; 
        this.onClick = this.onClick.bind(this,this.props.userData);
    }
    
    onClick(userData:any,e:any){
        this.props.onClick(userData,e);
    }
    
    shouldComponentUpdate(props:ButtonProps){
        return props.icon !== this.props.icon ||
            props.label !== this.props.label; 
    }
    
    render(){
        let clz = this.props.className || ""; 
        let icon = this.props.iconRenderer?this.props.iconRenderer(this.props.userData):(this.props.icon)?(<i className={this.props.icon}></i>):undefined;
        return (
            <div className={"of-btn "+clz} onClick={this.onClick}>{icon}<span className="btn-label">{this.props.label}</span></div>
        );
    }
}