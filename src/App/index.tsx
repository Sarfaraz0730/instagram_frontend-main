
import { Router } from '@reach/router';
import React from 'react';
import DemoPage from './DemoPage';

export default function App() {

  return (
    <Router style={{ display: "flex", height: "100%" }}>
      <DemoPage path="demo" default />
    </Router>
  );
}