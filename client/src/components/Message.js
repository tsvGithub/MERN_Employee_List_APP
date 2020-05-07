import React from "react";

//2
//func renderMessageClassName generates the CSS
//func takes in props
const renderMessageClassName = (props) => {
  //set the base 'alert(with space)' as every alert has this in front of it
  let className = "alert ";
  //check what kind of alert need:
  //if  props.message is meassage Error => append class danger
  //oterwise => class success
  if (props.message.msgError) className = className + "alert-danger";
  else className = className + "alert-success";
  className = className + "text-center";
  return className;
};

// 1 Message Component
//use 2 alerts: for success & error
const Message = (props) => {
  //return message {props.message.msgBody}
  //with dynamic className (based on message)
  //execute the func renderMessageClassName (generates the CSS) with props
  return (
    <div className={renderMessageClassName(props)} role="alert">
      {props.message.msgBody}
    </div>
  );
};

export default Message;
