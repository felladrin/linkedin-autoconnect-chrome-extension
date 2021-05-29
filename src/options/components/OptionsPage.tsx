import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { useStore } from "effector-react";
import React from "react";
import { darkMuiTheme } from "../../shared/constants/darkMuiTheme";
import { useStyles } from "../constants/useStyles";
import { maximumAutoConnectionsPerSessionChanged } from "../events/maximumAutoConnectionsPerSessionChanged";
import { optionsSubmitted } from "../events/optionsSubmitted";
import { saveOptionsResultMessageClosed } from "../events/saveOptionsResultMessageClosed";
import { isSaveOptionsResultMessageOpenStore } from "../stores/isSaveOptionsResultMessageOpenStore";
import { maximumAutoConnectionsPerSessionStore } from "../stores/maximumAutoConnectionsPerSessionStore";

export function OptionsPage() {
  const classes = useStyles();

  const maximumAutoConnectionsPerSession = useStore(
    maximumAutoConnectionsPerSessionStore
  );

  const isSaveSucceededMessageOpen = useStore(
    isSaveOptionsResultMessageOpenStore
  );

  return (
    <ThemeProvider theme={darkMuiTheme}>
      <CssBaseline />
      <Box className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            LinkedIn AutoConnect Options
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="Maximum auto-connections per session"
                helperText="Automatically stops connecting after reaching this value."
                fullWidth
                type="number"
                value={maximumAutoConnectionsPerSession}
                onChange={(e) =>
                  maximumAutoConnectionsPerSessionChanged(e.target.value)
                }
              />
            </Grid>
          </Grid>
          <Button
            onClick={() => optionsSubmitted()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Options
          </Button>
        </Paper>
      </Box>
      <Snackbar
        open={isSaveSucceededMessageOpen}
        autoHideDuration={3000}
        onClose={() => saveOptionsResultMessageClosed()}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="Options saved!"
      />
    </ThemeProvider>
  );
}
