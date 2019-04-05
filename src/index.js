import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Index";
import Modal from "./components/modal/Index";
import axios from "axios";

import "./styles.css";

const base_url = "https://api.github.com/users";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      userName: "",
      repos: [],
      user: {}
    };
  }

  hadlenOpenModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleSearch = () => {
    const { userName } = this.state;
    if (userName.length !== 0) {
      try {
        axios.get(`${base_url}/${userName.toLowerCase()}`).then(data => {
          this.setState({ user: data });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  changeName = name => {
    this.setState({ userName: name });
  };

  render() {
    console.log(this);

    return (
      <div className="app">
        <Header open={this.hadlenOpenModal} />
        <Modal
          open={this.state.openModal}
          handleOpen={this.hadlenOpenModal}
          name={this.changeName}
          search={this.handleSearch}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
