import React from "react";
import IntroSetion from "../componentes/LandingPage/IntroSetion";
import SaberMas from "../componentes/LandingPage/SaberMas";
import Beneficios from "../componentes/LandingPage/Beneficios";

export default function LandingPage() {
  return (
    <React.Fragment>
      <IntroSetion />
      <SaberMas />
      <Beneficios />
    </React.Fragment>
  );
}
