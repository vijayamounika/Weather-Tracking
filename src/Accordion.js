import React, { useState } from "react";
import ChartContainer from "./chart";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import Button from "@material-ui/core/Button";

import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Accordion(props) {
  const classes = useStyles2();
 
  return (
    <div className={classes.root}>
      {props.points.map((point, index) => (
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              className={classes.heading}
              onClick={() => {
                props.onchangelatandlongitude(index);
              }}
            >
              {point.timezone} {point.current.temp}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <ThemeProvider theme={theme}>
                <Typography>Date: {new Date().toLocaleString()}</Typography>
                <Typography>Cloudiness: {point.current.clouds}%</Typography>
                <Typography>
                  Weather:
                  {point.current.weather[0].description}
                </Typography>
                <Typography>
                  Wind_pressure:
                  {point.current.pressure}m/sec
                </Typography>
                <Typography>
                  Humidity:
                  {point.current.humidity}%
                </Typography>
              </ThemeProvider>

              <ChartContainer
                weather={point.daily.map((val) => {
                  return val.temp.day;
                })}
                date={point.daily.map((val) => {
                  return moment.unix(val.dt).format("MMM Do YY");
                })}
              />
              <Button
                color="secondary"
                onClick={() => {
                  props.onDeleteButtonClicked(index);
                }}
              >
                Delete <DeleteIcon />
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

export default Accordion;
