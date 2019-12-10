/// <reference types="Cypress" />


context("Tests", () => {
  const getSecretFromPage = () =>
    cy.waitUntil(() =>
      cy
        .contains("Demo Secret")
        .then(
          $el => {
            console.log('log-aa ', $el)
            console.log('log-bb ', $el.parent().parent())
            return $el
            .parent()
            .parent()
            .find("input")[0].value
          }
           
        )
        .then(value => value !== "Loading..." && value)
    );
  const fillFormWithSecret = token => {
    cy.contains("Verify Token").click();
    cy.contains("Please input a token.")
      .then($el => $el.parent().find("input"))
      .type(token);
    cy.contains("The token is valid in this current window.").should("be.visible");
  };

  it("The OTP token generation should work", () => {
    // go to the baseUrl page (see cypress.json)
    cy.visit("/");

    getSecretFromPage().then(secret => {
      cy.task("generateOTP", secret).then(val => fillFormWithSecret(val));
    });
  });

  it("The last OTP secret shuold be used if not passed everytime", () => {
    cy.visit("/");
    getSecretFromPage().then(secret => {
      // secret get in file src/index.js
      cy.task("generateOTP", );
      // generateOTP in file plugin/index.js
      cy.task("generateOTP").then(val => fillFormWithSecret(val));
    });
  });
});
