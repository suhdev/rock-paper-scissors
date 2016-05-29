import * as React from 'react'; 
import * as ReactDOM from 'react-dom'; 


export interface LogoProps{
    image:string;
    className?:string;
}

export interface LogoState {
    
} 

export class Logo extends React.Component<LogoProps,LogoState>{
    constructor(props:LogoProps){
        super(props);
        this.state = {}; 
    }
    
   
    
    shouldComponentUpdate(props:LogoProps){
        return props.image !== this.props.image ||
            props.className !== this.props.className; 
    }
    
    render(){
        let clz = this.props.className || '';
        return (
            <div className={"logo "+clz} ><img src={this.props.image} /></div>
        );
    }
}