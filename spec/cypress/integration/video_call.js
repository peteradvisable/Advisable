context("A video call", () => {
  before(() => {
    cy.app("clean");
    cy.appScenario("video_call");
  });

  describe("when entering a call before the other participant joins", () => {
    before(() => {
      cy.visit(`/calls/vid_abcdefghijklmno`);
      cy.findByLabelText("Email Address").type("videocall@test.com");
      cy.findByLabelText("Password").type("testing123");
      cy.findByRole("button", { name: /login/i }).click();
      cy.findByRole("button", { name: /join/i }).click();

      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "dwight@test.com",
        color: "blue",
      });
    });

    after(() => {
      cy.leaveRoom();
    });

    it("they can see the oter participant", function () {
      cy.getParticipant("Dwight").shouldBeColor("blue");
    });

    it("should remove the participant when they leave", () => {
      cy.task("participantCloseBrowser", "dwight@test.com");
      cy.getParticipant("Dwight").should("not.exist");
    });
  });

  describe("when entering a call after the other participant joins", () => {
    before(() => {
      cy.task("addParticipant", {
        url: "/calls/vid_abcdefghijklmno",
        email: "dwight@test.com",
        color: "blue",
      });

      cy.visit(`/calls/vid_abcdefghijklmno`);
      cy.findByLabelText("Email Address").type("videocall@test.com");
      cy.findByLabelText("Password").type("testing123");
      cy.findByRole("button", { name: /login/i }).click();
      cy.findByRole("button", { name: /join/i }).click();
    });

    after(() => {
      cy.leaveRoom();
    });

    it("they can see the oter participant", function () {
      cy.getParticipant("Dwight").shouldBeColor("blue");
    });
  });
});
