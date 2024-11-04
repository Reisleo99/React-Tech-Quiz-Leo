describe('Quiz Test', () => {

  context('Start quiz on Start button', () => {

    beforeEach(() => {
      cy.fixture('question').then((questions) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: questions,
        }).as('fetchQuestions');
      });
      cy.visit('/');
    });

    it('should complete the quiz with all correct answers and show perfect score', () => {
      cy.findByText('Start Quiz').click();

      cy.wait('@fetchQuestions').then(() => {
        cy.fixture('question').then((questions) => {
          answerQuestions(questions, true);

          cy.get('.card').should('be.visible');
          cy.findByText('Quiz Completed').should('be.visible');
          cy.findByText(`Your score: ${questions.length}/${questions.length}`).should('be.visible');
          cy.findByText('Take New Quiz').should('be.visible');
        });
      });
    });

    it('should complete the quiz with all incorrect answers and show zero score', () => {
      cy.findByText('Start Quiz').click();

      cy.wait('@fetchQuestions').then(() => {
        cy.fixture('question').then((questions) => {
          answerQuestions(questions, false);

          cy.get('.card').should('be.visible');
          cy.findByText('Quiz Completed').should('be.visible');
          cy.findByText(`Your score: 0/${questions.length}`).should('be.visible');
          cy.findByText('Take New Quiz').should('be.visible');
        });
      });
    });
  });

  context('Starting a new quiz button', () => {

    beforeEach(() => {
      cy.fixture('question').then((questions) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: questions,
        }).as('fetchQuestions');
      });
    });

    it('After completed, should restart quiz', () => {
      cy.visit('/');

      cy.findByText('Start Quiz').click();
      cy.wait('@fetchQuestions').then(() => {
        cy.fixture('question').then((questions) => {
          answerQuestions(questions, true);

          cy.findByText('Take New Quiz').click();

          answerQuestions(questions, true);

          cy.get('.card').should('be.visible');
          cy.findByText('Quiz Completed').should('be.visible');
          cy.findByText(`Your score: ${questions.length}/${questions.length}`).should('be.visible');
          cy.findByText('Take New Quiz').should('be.visible');
        });
      });
    });
  });
});
