function testLeftList(lst) {
  lst.forEach((id) => {
    cy.get(".left-side").find(`#${id}`).should("exist");
  });
}

function testRightList(lst) {
  lst.forEach((id) => {
    cy.get(".right-side").find(`#${id}`).should("exist");
  });
}

describe("Sample Test:", () => {
  it("sample", () => {
    cy.visit("index.html");

    cy.get("#item1").check();
    cy.get("#item2").check();
    cy.get(".checked-to-right").click();

    testRightList(["item1", "item2", "item5", "item6", "item7", "item8"]);
    testLeftList(["item3", "item4"]);

    cy.get(".all-to-left").should('not.have.class', 'disabled');
    cy.get(".checked-to-right").should('not.have.class', 'disabled');
    cy.get(".checked-to-left").should('not.have.class', 'disabled');

    cy.get(".all-to-left").click();

    testRightList([]);
    testLeftList(["item1", "item2" ,"item3", "item4", "item5", "item6", "item7", "item8"]);

    cy.get(".all-to-left").should('have.class', 'disabled');
    cy.get(".checked-to-right").should('not.have.class', 'disabled');
    cy.get(".checked-to-left").should('have.class', 'disabled');
  });
});
