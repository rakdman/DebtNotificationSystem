import React from 'react';

let FormInput= (props) =>
{
    return(
        <div>
            <label> {props.labelname} </label>
            <input type={props.type} name={props.fieldname}></input>
        </div>
    );
}

export default FormInput;