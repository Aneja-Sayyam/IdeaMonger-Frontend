import React, { Component } from "react";
import { Panel } from "rsuite";
import styles from "./profile.module.css";

class About extends Component {
  state = {};
  render() {
    return (
      <Panel
        shaded
        collapsible
        defaultExpanded
        bodyFill
        style={{ backgroundColor: "white", margin: "20px 0" }}
        header={<span className={styles.title}>About</span>}
      >
        <div className={styles.cards}>
          <div className={styles.subContext}>Sex : {this.props.sex}</div>
          <div className={styles.subContext}>{this.props.about}</div>
        </div>
      </Panel>
    );
  }
}

export default About;
