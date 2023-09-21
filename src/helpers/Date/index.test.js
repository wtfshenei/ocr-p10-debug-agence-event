import { getMonth } from "./index";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      const inputDate = new Date("2022-01-01");
      const result = getMonth(inputDate);
      expect(result).toBe("janvier");
    });
    it("the function return juillet for 2022-07-08 as date", () => {
      const inputDate = new Date("2022-07-08");
      const result = getMonth(inputDate);
      expect(result).toBe("juillet");
    });
  });
});

// TODO : Nouveau test boucle sur les 12 mois

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    const months = [
      "janvier", "février", "mars", "avril", "mai", "juin",
      "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    for(let i = 0; i < months.length; i++) {
      it(`the function returns ${months[i]} for 2022-${String(i+1).padStart(2, '0')}-01 as date`, () => {
        const inputDate = new Date(`2022-${String(i+1).padStart(2, '0')}-01`);
        const result = getMonth(inputDate);
        expect(result).toBe(months[i]);
      });
    }
  });
});