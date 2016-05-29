import * as React from 'react'; 

export interface IconButtonProps{
    icon:string;
    onClick:Function;
    className?:string;
}
export function IconButton(props:IconButtonProps){
    return (
        <div onClick={props.onClick} className={"icon-btn "+(props.className?props.className:"")}><i className={props.icon}></i></div>
    );
}