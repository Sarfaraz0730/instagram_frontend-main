import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { DialogHelper } from 'ap-components';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from "react-loadable";
import "reflect-metadata";
import Loading from './Common/Loading';
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import theme from './theme';

const AsyncApp = Loadable({ loader: () => import("./App"), loading: () => <Loading ></Loading>, delay: 300 });

ReactDOM.render(
  <ThemeProvider theme={theme} >
    <CssBaseline />
    <AsyncApp />
    <DialogHelper key={'apDialogHelper'} />
  </ThemeProvider>,
  document.querySelector('#root'),
);


console.log("Environment", process.env.NODE_ENV);

serviceWorkerRegistration.unregister();

// reportWebVitals(console.log);