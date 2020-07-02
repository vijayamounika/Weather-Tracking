import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import Settings from "./settings";

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

function MapView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentWeather, setCurrentWeather] = useState({});
  const [modalStyle] = React.useState(getModalStyle);
  const [points, setPoints] = React.useState([]);
  const [Maplatitude, setMapLatitude] = useState(props.latitude);
  const [Maplongitude, setMapLongitude] = useState(props.longitude);
  const [latitude, setLatitude] = useState(props.latitude);
  const [longitude, setLongitude] = useState(props.longitude);
  const [location, setLocation] = useState();
  const [openSettings, setOpenSettings] = React.useState(false);
  const [Temperature, setTemperature] = React.useState("metric");
  const [Language, setLanguage] = React.useState("en");

  const handleChangeSettings = (event) => {
    console.log(event);
    setTemperature(event.target.value);
    localStorage.setItem("Temperature", JSON.stringify(Temperature));
  };
  const handleLanguageSettings = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem("Language", JSON.stringify(Language));
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
  function changelatandlong(index) {
    setMapLatitude(points[index].lat);
    setMapLongitude(points[index].lon);
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

  function mapClicked(mpros, map, event) {
    setLatitude(event.latLng.lat());
    setLongitude(event.latLng.lng());
  }
  function deleteWeather(indexe) {
    let array = [];
    array = points.filter((ele, index) => {
      return index != indexe;
    });
    //points.splice(index, 1);
    localStorage.setItem("arrayOfLocations", JSON.stringify(array));
    setPoints(array);
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
              id="id1"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  function handleInputChange(e) {
    console.log(e, "it is here in handleInputChange");
    document.getElementById("id1").value = e.target.value;
  }
  function handleSave() {
    if (document.getElementById("id1").value != "") {
      points[points.length - 1].timezone = document.getElementById("id1").value;
      localStorage.setItem("arrayOfLocations", JSON.stringify(points));
      setPoints(points);
    }
    setOpen(false);
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
        <Button onClick={handleClickOpen}>Open settings</Button>
        <Settings
          openSettings={openSettings}
          onhandleCloseSettings={handleCloseSettings}
          Temperature={Temperature}
          Language={Language}
          onhandleChangeSettings={handleChangeSettings}
          onhandleLanguageSettings={handleLanguageSettings}
        />
        <Accordion
          style={accordianStyles}
          points={points}
          onDeleteButtonClicked={deleteWeather}
          onchangelatandlongitude={changelatandlong}
        />
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA7vWDDkimcvyp1gkM757hfKEO-3v1SR_A",
})(MapView);
