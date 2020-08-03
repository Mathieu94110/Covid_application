import React from "react";
import styles from "./Cards.module.css";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import CountUp from "react-countup";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (confirmed) {
    return (
      <div>
        <Grid container spacing={3} justify="center">
          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.infected)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Contaminés
              </Typography>
              <Typography variant="h5"></Typography>
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>

              <Typography variant="body2">
                Nombre d'individus ayant été contaminés par le COVID-19
              </Typography>
            </CardContent>
          </Grid>

          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.recovered)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Soignés
              </Typography>
              <Typography variant="h5"></Typography>
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant="body2">
                Nombre d'individus ayant été soignés du COVID-19
              </Typography>
            </CardContent>
          </Grid>

          <Grid
            item
            component={Card}
            xs={12}
            md={3}
            className={cx(styles.card, styles.deaths)}
          >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Décédés
              </Typography>
              <Typography variant="h5"></Typography>
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
              <Typography color="textSecondary">
                {new Date(lastUpdate).toDateString()}
              </Typography>
              <Typography variant="body2">
                Nombre d'individus décédés du COVID-19
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return "Chargment en cours ...";
  }
};

export default Cards;
