import React from "react";
import "./MainSection.css";

const MainSection = () => {
  return (
    <main className="main-section">
      <section className="intro">
        <h2>Descubra sua próxima aventura</h2>
        <p>
          Junte-se a nós para explorar os lugares mais deslumbrantes da Terra.
        </p>
        <button>Iniciar</button>
      </section>
      <section className="features">
        <div className="feature">
          <h3>Locais Exóticos</h3>
          <p>Viaje para os locais mais exóticos do mundo.</p>
        </div>
        <div className="feature">
          <h3>Atividades de aventura</h3>
          <p>
            Experimente atividades emocionantes feitas sob medida para
            entusiastas de aventura.
          </p>
        </div>
        <div className="feature">
          <h3>Pacotes Exclusivos</h3>
          <p>
            Obtenha pacotes de viagem exclusivos projetados para a melhor
            aventura.
          </p>
        </div>
      </section>
    </main>
  );
};

export default MainSection;
