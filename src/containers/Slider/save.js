import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc =
    data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    ) || []; // < au cas ou ça rebug
  const nextCard = () => {
    setIndex((slideIndex) =>
      slideIndex < byDateDesc.length - 1 ? slideIndex + 1 : 0
    );
  };

  useEffect(() => {
    const timerId = setTimeout(nextCard, 5000);
    return () => clearTimeout(timerId);
  }, [index, byDateDesc.length, nextCard]);

  const handlePaginationClick = (radioIdx) => {
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
              {byDateDesc.map((eventFocus, radioIdx) => (
                <input
                  key={`Event-${eventFocus.title}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => handlePaginationClick(radioIdx)}
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
