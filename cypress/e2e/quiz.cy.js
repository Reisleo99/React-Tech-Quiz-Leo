/// <reference types="cypress" />
import Quiz from '../../src/components/Quiz';
import '../../src/App.css';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.fixture('questions').then((questions) => {
      cy.intercept('GET', '**/api/questions', questions).as('getQuestions');
      cy.mount(<Quiz />);
    });
  });

  it('should render the start button initially', () => {
    cy.get('button').contains('Start Quiz').should('be.visible');
  });

  it('should start the quiz and display the first question', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('contain.text', 'What is the capital of France?');
  });

  it('should display options and handle answer selection', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.get('[data-cy=answer-option]').should('have.length', 4);

    cy.get('[data-cy=answer-option]').first().click();
    cy.get('h2').should('not.contain.text', 'What is the capital of France?');
  });

  it('should complete the quiz and show the score', () => {
    cy.get('button').contains('Start Quiz').click();
    cy.wait('@getQuestions');

    cy.get('[data-cy=answer-option]').each((button) => {
      cy.wrap(button).click();
    });

    cy.get('h2').should('contain.text', 'Quiz Completed');
    cy.get('.alert-success').should('contain.text', 'Your score:');
  });
});
