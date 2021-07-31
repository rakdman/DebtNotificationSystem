import React from 'react';

let FormInputText= (props) =>
{
    return(
        <div>
            <label> {props.labelname} </label>
            <textarea type={props.type} name={props.fieldname} rows={props.rows} cols={props.cols}></textarea>
        </div>
    );
}

export default FormInputText;