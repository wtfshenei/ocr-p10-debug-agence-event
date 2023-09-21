import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./index";
import EventList from "../../containers/Events";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it ("a list of events is displayed", async() => {
    render(<EventList/>)

    await waitFor(() => {
      const eventsList = document.querySelector('.ListContainer')
      const eventsCards = document.querySelectorAll('.ListContainer .EventCard')
      console.log(eventsCards.length)
      expect(eventsList).toHaveLength(9)
    });
  })
  it("a list a people is displayed", () => {
    const peopleList = document.querySelectorAll('.PeopleCard');
    expect(peopleList).toHaveLength(6);
  });
  it("a footer is displayed", () => {
    const footerElement = document.querySelector("footer");
    expect(footerElement).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    const lastEventCard = document.querySelector(".presta");
    expect(lastEventCard).toBeInTheDocument();
  });
});
