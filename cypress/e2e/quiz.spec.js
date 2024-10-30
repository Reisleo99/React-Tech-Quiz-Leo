/// <reference types="cypress" />

describe('Tech Quiz E2E', () => {
    beforeEach(() => {
      cy.fixture('questions').then((questions) => {
        cy.intercept('GET', '**/api/questions', questions).as('getQuestions');
      });
      cy.visit('/');
    });
  
    it('should load the quiz page and start the quiz', () => {
      cy.get('[data-cy=start-quiz-button]').click();
      cy.wait('@getQuestions');
      cy.get('h2').should('contain.text', 'What is the capital of France?');
    });
  
    it('should complete the quiz and display the final score', () => {
      cy.get('[data-cy=start-quiz-button]').click();
      cy.wait('@getQuestions');
      cy.get('[data-cy=answer-option]').each((button) => {
        cy.wrap(button).click();
      });
  
      cy.get('h2').should('contain.text', 'Quiz Completed');
      cy.get('.alert-success').should('contain.text', 'Your score:');
    });
  });
  