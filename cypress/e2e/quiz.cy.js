describe('Quiz', () => {
  context('Start from Start Quiz button', () => {
    beforeEach(() => {
      cy.fixture('question').then((fixture) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: fixture,
        }).as('getRandomQuestions');
      });

      cy.visit('/');
    });

    it('should go through questions and review correctly results', () => {

      cy.findByText('Start Quiz').click();

      cy.fixture('question').then((questions) => {
        cy.wait('@getRandomQuestions');
        for (const question of questions) {
          const answer = question.answers.map((option) => option.isCorrect).indexOf(true) + 1;
          cy.findByText(answer.toString()).click();
        }

        cy.get('.card').should('be.visible');
        cy.findByText('Quiz Completed').should('be.visible');
        cy.findByText(`Your score: ${questions.length}/${questions.length}`).should('be.visible');
        cy.findByText('Take New Quiz').should('be.visible');
      });
    });

    it('should go through questions and show correct results for wrong answers', () => {

      cy.findByText('Start Quiz').click();

      cy.fixture('question').then((questions) => {
        cy.wait('@getRandomQuestions');

        for (const question of questions) {
          const answer = question.answers.map((option) => option.isCorrect).indexOf(true);
          cy.findByText(answer.toString()).click();
        }

        cy.get('.card').should('be.visible');
        cy.findByText('Quiz Completed').should('be.visible');
        cy.findByText(`Your score: 0/${questions.length}`).should('be.visible');
        cy.findByText('Take New Quiz').should('be.visible');
      });
    });
  });

  context('Start from Take New Quiz button', () => {
    beforeEach(() => {
      cy.fixture('question').then((questions) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: questions,
        }).as('getRandomQuestions');
      });
    });

    it('should start again after clicking Take New Quiz button', () => {
      cy.visit('/');

      cy.findByText('Start Quiz').click();

      cy.fixture('question').then((questions) => {
        cy.wait('@getRandomQuestions');

        for (const question of questions) {
          const answer = question.answers.map((option) => option.isCorrect).indexOf(true) + 1;
          cy.findByText(answer.toString()).click();
        }

        cy.findByText('Take New Quiz').click();

        for (const question of questions) {
          const answer = question.answers.map((option) => option.isCorrect).indexOf(true) + 1;
          cy.findByText(answer.toString()).click();
        }

        cy.get('.card').should('be.visible');
        cy.findByText('Quiz Completed').should('be.visible');
        cy.findByText(`Your score: ${questions.length}/${questions.length}`).should('be.visible');
        cy.findByText('Take New Quiz').should('be.visible');
      });
    });
  });
});