import React, { Component } from 'react';
import styles from "./profile.module.css";
import { Panel } from "rsuite";

class Experience extends Component {
    state = {  }
    render() { 
      return (
        <Panel
          shaded
          collapsible
          defaultExpanded
          bodyFill
          style={{ backgroundColor: "white", margin: "20px 0" }}
          header={<span className={styles.title}>Experience</span>}
        >
          <div className={styles.cards}>
            <span className={styles.subContext}>{this.props.experiences}</span>
          </div>
        </Panel>
      );
    }
}
 
export default Experience;