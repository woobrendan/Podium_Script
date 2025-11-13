/// <reference types="cypress" />
import { getToday } from "../../src/functions/dateFuncs";

describe("Creating New Podiums", () => {
  const formatDate = () => {
    const day = [];
    const splitDay = getToday().split("-");
    day.push(splitDay[2], splitDay[0], splitDay[1]);
    return day.join("-");
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    //select event then series
    cy.get('[data-testid="event_dropdown"]').click();
    cy.get('[data-testid="Sonoma Raceway"]').click();

    cy.get('[data-testid="series_dropdown"]').click();
    cy.get('[data-testid="GT World Challenge America"]').click();
  });

  it("Should render table at end with chosen results", () => {
    const proEntry = "#3 - Misha Goikhberg & Jordan Pepper";
    cy.get('[data-testid="firstPlace_podium_1"]').click();
    cy.get("li").contains(proEntry).click();
    cy.get('[data-testid="firstPlace_podium_1"]').contains(proEntry);
  });
});
