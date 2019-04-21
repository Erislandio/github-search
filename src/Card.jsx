import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



function ImgMediaCard(props) {
  const { classes, repos, img } = props;

  console.log(repos)

  return (
    <Grid
      container
      direction="row"
      justify="center"
    >
      <div className="content-card">
        {
          repos.length ? (
            repos.map((repo, index) => {
              return (
                <div className="card" key={index}>
                  <div className="image-card">
                    <img src={img} />
                  </div>
                  <div className="card-info">
                    <h3 className="title-card">
                      {repo.name}
                    </h3>
                    <a href="/">View</a>
                  </div>
                </div>
              )
            })

          ) : null

        }
      </div>
    </Grid>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ImgMediaCard;