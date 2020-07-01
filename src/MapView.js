import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React, { useEffect, useState } from "react";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const screenStyles = {
  display: "flex",
};
const columnStyles1 = {
  flex: "70%",
};
const columnStyles2 = {
  flex: "30%",
};

const mapStyles = {
  width: "70%",
  height: "100%",
};
const accordianStyles = {
  width: "30%",
  height: "100%",
};

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const useStyles3 = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function MapView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const classes2 = useStyles3();
  const [currentWeather, setCurrentWeather] = useState({});
  const [modalStyle] = React.useState(getModalStyle);
  const [points, setPoints] = React.useState([]);
  const [Maplatitude, setMapLatitude] = useState(props.latitude);
  const [Maplongitude, setMapLongitude] = useState(props.longitude);
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);

  const [openSettings, setOpenSettings] = React.useState(false);
  const [Temperature, setTemperature] = React.useState("metric");
  const [Language, setLanguage] = React.useState("en");

  const handleChangeSettings = (event) => {
    console.log(event);
    setTemperature(event.target.value);
  };
  const handleLanguageSettings = (event) => {
    setLanguage(event.target.value);
  };

  const handleClickOpen = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  useEffect(() => {
    getWeather();
  }, [latitude]);

  function getWeather() {
    return fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${props.latitude}&lon=${props.longitude}&APPID=8e006a2065c3a040ce2d9c957050f93c&units=${Temperature}&lang=${Language}`
    )
      .then((res) => {
        console.log("came to then", res);
        return handleResponse(res);
      })
      .then((weather) => {
        console.log(weather);
        setCurrentWeather(weather);
        handleOpen();
        const arr = points;
        arr.push(weather); //just to notify there's something in the array
        setPoints([...arr]);
        localStorage.setItem("arrayOfLocations", JSON.stringify(points));
        localStorage.setItem("Temperature", JSON.stringify(Temperature));
        localStorage.setItem("Language", JSON.stringify(Language));
      });
  }

  function handleResponse(response) {
    console.log("it is in handle response");
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error: Location " + response.statusText.toLowerCase());
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function Accordion() {
    const classes = useStyles2();
    return (
      <div className={classes.root}>
        {points.map((point, index) => (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                className={classes.heading}
                onClick={() => {
                  changelatandlong(index);
                }}
              >
                {point.timezone} {point.current.temp}&#8451;
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
                <Button
                  color="secondary"
                  onClick={() => {
                    deleteWeather(index);
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
  function changelatandlong(index) {
    setMapLatitude(points[index].lat);
    setMapLongitude(points[index].lon);
  }
  function mapClicked(mpros, map, event) {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  }
  function deleteWeather(index) {
    console.log(index, "mouni it is index");
    // points = JSON.parse(localStorage.getItem("arrayOfLocations"));
    console.log(points);
    points.splice(index, 1);
    localStorage.setItem("arrayOfLocations", JSON.stringify(points));
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Want to change location name?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <input
              type="text"
              placeholder={currentWeather.timezone}
              onChange={handleInputChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  function handleInputChange(e) {
    console.log(e, "it is here in handleInputChange");
    points[points.length - 1].timezone = e.target.value;
    localStorage.setItem("arrayOfLocations", JSON.stringify(points));
    return <Accordion />;
  }

  return (
    <div style={screenStyles}>
      <div style={columnStyles1}>
        <Map
          google={props.google}
          onClick={(mpros, map, e) => {
            props.onMapClicked(mpros, map, e);
            mapClicked(mpros, map, e);
          }}
          // onBoundsChanged={centerChanged}
          // onReady={fetchPlaces}
          zoom={14}
          style={mapStyles}
          center={{
            lat: props.latitude,
            lng: props.longitude,
          }}
          initialCenter={{
            lat: props.latitude,
            lng: props.longitude,
          }}
        >
          <Marker
            // onClick={onMarkerClick}
            name={{ lat: props.latitude, lng: props.longitude }}
            position={{ lat: props.latitude, lng: props.longitude }}
          />
          <Marker
            // onClick={onMarkerClick}
            name={{ lat: Maplatitude, lng: Maplongitude }}
            position={{ lat: Maplatitude, lng: Maplongitude }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />

          <MyVerticallyCenteredModal />
        </Map>
      </div>
      <div style={columnStyles2}>
        <div>
          <Button onClick={handleClickOpen}>Open settings</Button>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openSettings}
            onClose={handleCloseSettings}
          >
            <DialogTitle>
              Please change Temperature units and Language you prefer
            </DialogTitle>
            <DialogContent>
              <form className={classes2.container}>
                <FormControl className={classes2.formControl}>
                  <InputLabel htmlFor="demo-dialog-native">
                    Temp units
                  </InputLabel>
                  <Select
                    native
                    value={Temperature}
                    onChange={handleChangeSettings}
                    input={<Input id="demo-dialog-native" />}
                  >
                    <option aria-label="None" value="" />
                    <option value={"metric"}>Celsius</option>
                    <option value={"imperial"}>Fahrenheit</option>
                    <option value={"kelvin"}>Kelvin</option>
                  </Select>
                </FormControl>
                <FormControl className={classes2.formControl}>
                  <InputLabel htmlFor="demo-dialog-native">Language</InputLabel>
                  <Select
                    native
                    value={Language}
                    onChange={handleLanguageSettings}
                    input={<Input />}
                  >
                    <option aria-label="None" value="" />
                    <option value={"en"}>English</option>
                    <option value={"al"}>Albanian</option>
                    <option value={"ar"}>Araibic</option>
                    <option value={"de"}>German</option>
                    <option value={"fr"}>French</option>
                    <option value={"hi"}>Hindi</option>
                    <option value={"it"}>Italian</option>
                    <option value={"ja"}>Japanese</option>
                    <option value={"kr"}>Korean</option>
                    <option value={"nl"}>Dutch</option>
                    <option value={"zh_cn"}>Chinese Simplified</option>
                    <option value={"zu"}>Zulu</option>
                    <option value={"ru"}>Russian</option>
                  </Select>
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSettings} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCloseSettings} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <Accordion style={accordianStyles} />
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA7vWDDkimcvyp1gkM757hfKEO-3v1SR_A",
})(MapView);
