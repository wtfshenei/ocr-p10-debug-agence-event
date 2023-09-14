import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./index";

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
  let renderedPage;

  beforeEach(() => {
    renderedPage = render(<Home />);
  });

  it("a list of events is displayed", () => {
    //
  });
  it("a list a people is displayed", () => {
    const peopleList = renderedPage.getByText("CXO");
    expect(peopleList).toBeInTheDocument();
  });
  it("a footer is displayed", () => {
    const footerElement = renderedPage.getByText("Contactez-nous");
    expect(footerElement).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    const lastEventCard = renderedPage.getByText("Notre derniére prestation");
    expect(lastEventCard).toBeInTheDocument();
  });
});
