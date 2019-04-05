import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Index";
import Modal from "./components/modal/Index";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Card from "./Ca";

import "./styles.css";

const base_url = "https://api.github.com/users";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
      userName: "",
      repos: [],
      user: {},
      loading: false,
      erro: ""
    };
  }

  hadlenOpenModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleSearch = () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    if (userName.length !== 0) {
      try {
        axios.get(`${base_url}/${userName.toLowerCase()}`).then(user => {
          this.setState({ user: user.data });
          axios
            .get(`https://api.github.com/users/${userName.toLowerCase()}/repos`)
            .then(repos => {
              this.setState({
                repos: repos.data,
                loading: false,
                openModal: false
              });
            });
        });
      } catch (error) {
        console.log(error);
        this.setState({
          loading: false,
          erro: "Não foi possivel carregar usuário"
        });
      }
    }
  };

  changeName = name => {
    this.setState({ userName: name });
  };

  render() {
    console.log(this);

    const { repos, userName, erro } = this.state;

    return (
      <div className="app">
        <Header open={this.hadlenOpenModal} />
        <Modal
          open={this.state.openModal}
          handleOpen={this.hadlenOpenModal}
          name={this.changeName}
          search={this.handleSearch}
          loading={this.state.loading}
          repos={this.state.repos}
          erro={this.state.erro}
        />
        <Card repos={repos} />
        <Snackbar
          open={repos.length ? true : false}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "snackbar-fab-message-id"
          }}
          message={
            <span id="snackbar-fab-message-id">
              Usuário {userName} encontrado{" "}
            </span>
          }
        />
        {erro && (
          <Snackbar
            open={true}
            autoHideDuration={3000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "snackbar-fab-message-id"
            }}
            message={
              <span id="snackbar-fab-message-id">
                Usuário {userName} nçao pode ser encontrado{" "}
              </span>
            }
          />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
