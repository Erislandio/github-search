import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import Grid from "@material-ui/core/Grid";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    borderRadius: 4,
    maxWidth: "300px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%",
    fontSize: 16
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 10
  },
  button: {
    width: "45%",
    marginTop: 20
  },
  input: {
    display: "none"
  },
  buttonContainer: {
    display: "flex",
    justyfyContent: "space-between",
    width: "100%"
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: "#00695c"
  }
});

class SimpleModal extends React.Component {

  handleChange = name => event => {
    this.props.name(event.target.value);
  };

  handleSearch = (e) => {
    if (e.shiftKey === "Enter") {
      this.props.search()
    }
  }


  render() {
    console.log(this);
    const { classes, open, loading } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.props.handleOpen}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {loading ? (
              <>
                <CircularProgress
                  disableShrink
                  className={classes.progress}
                  size={30}
                  thickness={5}
                />
                Carregando...
              </>
            ) : (
                <>
                  <TextField
                    id="standard-name"
                    label="Nome github"
                    className={classes.textField}
                    onChange={this.handleChange("name")}
                    margin="normal"
                    onKeyUp={e => this.handleSearch(e)}
                  />
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => this.props.search()}
                    >
                      Search
                  </Button>
                    <Button
                      onClick={this.props.handleOpen}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                    >
                      Cancelar
                  </Button>
                  </Grid>
                </>
              )}
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
