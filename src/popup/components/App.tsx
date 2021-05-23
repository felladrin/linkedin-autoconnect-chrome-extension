import React from "react";
import { StartStopButton } from "./StartStopButton";
import { PageSelection } from "./PageSelection";
import { ExtensionTitle } from "./ExtensionTitle";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "250px",
  },
}));

export function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Grid container direction="column">
          <Grid item>
            <ExtensionTitle />
            <Divider />
          </Grid>
          <Grid item>
            <PageSelection />
          </Grid>
          <Grid item>
            <StartStopButton />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
