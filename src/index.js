import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./components/header/Index";
import Modal from "./components/modal/Index";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import Card from "./Card";
import Footer from "./components/Footer";

import "./styles.css";
import Slide from "./components/Slide";

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
      erro: "",
      openSnack: false,
      openUserSlide: false
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
                openModal: false,
                openSnack: true
              });

              setTimeout(() => {
                this.setState({ openSnack: false });
              }, 3000);
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

  hadlenOpenUserSlider = () => {
    this.setState({ openUserSlide: !this.state.openUserSlide });
  };

  render() {
    console.log(this);

    const { repos, userName, erro, user, openSnack } = this.state;

    return (
      <div className="app">
        <Header
          open={this.hadlenOpenModal}
          img={user.avatar_url}
          name={user.name}
          openSlideUser={this.hadlenOpenUserSlider}
        />
        <Slide open={this.state.openUserSlide} img={user.avatar_url} />
        <Modal
          open={this.state.openModal}
          handleOpen={this.hadlenOpenModal}
          name={this.changeName}
          search={this.handleSearch}
          loading={this.state.loading}
          repos={this.state.repos}
          erro={this.state.erro}
        />
        <Card repos={repos} img={user.avatar_url} />
        <Footer />
        <Snackbar
          open={openSnack ? true : false}
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
                Usuário {userName} não pode ser encontrado{" "}
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
