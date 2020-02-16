import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "./Layout";
import IntroSetion from "./IntroSetion";
import SaberMas from "./SaberMas";
import Beneficios from "./Beneficios";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <IntroSetion />
        <SaberMas />
        <Beneficios />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
