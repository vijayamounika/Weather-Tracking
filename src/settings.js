import React from 'react';
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
function Settings(props) {
    const classes2 = useStyles3();
    return (
        <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={props.openSettings}
          onClose={()=>{props.onhandleCloseSettings()}}
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
                  value={props.Temperature}
                  onChange={(event)=>{props.onhandleChangeSettings(event)}}
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
                  value={props.Language}
                  onChange={(event)=>{props.onhandleLanguageSettings(event)}}
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
            <Button onClick={()=>{props.onhandleCloseSettings()}} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>{props.onhandleCloseSettings()}} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
}
export default Settings