import React from "react";
import { StartStopButton } from "./StartStopButton";
import { PageSelection } from "./PageSelection";
import Box from "@material-ui/core/Box";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Settings from "@material-ui/icons/Settings";
import { darkMuiTheme } from "../../shared/constants/darkMuiTheme";
import { useStyles } from "../constants/useStyles";

export function Popup() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkMuiTheme}>
      <CssBaseline />
      <Box className={classes.root}>
        <AppBar position="relative" color="default">
          <Toolbar>
            <Typography className={classes.appBarTitle} variant="h6" noWrap>
              LinkedIn AutoConnect
            </Typography>
            <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>
        <PageSelection />
        <StartStopButton />
      </Box>
    </ThemeProvider>
  );
}
