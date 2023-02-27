import React, { Component } from 'react';
import { Panel } from 'rsuite';
import styles from "./profile.module.css";

class Expertise extends Component {
    state = {  }
    render() { 
      return (
        
        <Panel
          shaded
          collapsible
          defaultExpanded
          bodyFill
          style={{ backgroundColor: "white", margin: "20px 0" }}
          header={<span className={styles.title}>Expertise</span>}
        >
          <div className={styles.cards}>
            <span className={styles.subContext}>{this.props.expertises}</span>
          </div>
        </Panel>
      );
    }
}
 
export default Expertise;