import { useState } from "react";
import { Panel } from "rsuite";
import styles from "./chat.module.css"

const Message = ({ details,user }) => {
  const side = details.fromUser === user ? "right" : "left";
  
    return (
      <Panel
        style={{height:"fit-content", width: "fit-content",marginBottom:8 }}
        className={side === "right" ? styles.right : styles.left}
        shaded
        bodyFill
        collapsible
        header={<span style={{paddingRight:20}}>{details.text}</span>}
      >
        <div style={{marginRight:8,float:"right"}}>
          <span>{details.time}</span>
        </div>
      </Panel>
    );
}
 
export default Message;