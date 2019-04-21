import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    zIndex: 1000
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  header: {
    background: "#2c3e50"
  },
  menu: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: "#fff",
  },
  avatar: {
    margin: 10,
  },
};



class ButtonAppBar extends Component {

  state = {
    anchorEl: null,
    selectedIndex: 1,
  };


  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { anchorEl } = this.state;


    const options = [
      'Show some love to Material-UI',
      'Show all notification content',
      'Hide sensitive notification content',
      'Hide all notification content',
    ];


    const { classes, open, name, img } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={e => this.props.openSlideUser()}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Git-Search
            </Typography>
            {
              name ? (
                <Avatar alt="" src={img} className={classes.avatar} />
              ) : (
                  <Button color="inherit" onClick={e => this.props.open()}>+</Button>
                )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
