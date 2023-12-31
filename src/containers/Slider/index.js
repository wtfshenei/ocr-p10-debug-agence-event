import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  let timerId = null;

  const byDateDesc =
    data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    ) || [];

  const nextCard = () => {
    timerId = setTimeout(
      () => setIndex(prevIndex => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0), // TODO : Ajout de '- 1' dans la longueur de la condition afin d'enlever l'image blanche
      5000
    );
  };

  useEffect(() => {
    nextCard();
    return () => clearTimeout(timerId)
  }, [[], index]); // TODO : ajout de [] pour monter/démonter le composant au lancement + 'index' à chaque changement de l'index

  // TODO : création d'une fonction pour les boutons de slides
  const handlePaginationClick = (radioIdx) => {
    clearTimeout(timerId);
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}-${Math.random()}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => handlePaginationClick(radioIdx)} // TODO : onChange pour utiliser la fonction des boutons
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
