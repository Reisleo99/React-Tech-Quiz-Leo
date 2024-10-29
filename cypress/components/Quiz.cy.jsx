describe('Quiz Component', () => {
    beforeEach(() => {
      cy.mount(<Quiz />);
    });
  
    it('renders the start button initially', () => {
      cy.get('[data-cy=start-button]').should('exist').and('contain', 'Start Quiz');
    });
  
    it('displays a question when the start button is clicked', () => {
      cy.get('[data-cy=start-button]').click();
      cy.get('[data-cy=question]').should('exist');
    });
  
    it('shows the next question when an answer is selected', () => {
      cy.get('[data-cy=start-button]').click();
      cy.get('[data-cy=answer-option]').first().click();
      cy.get('[data-cy=question]').should('exist');
    });
  });
  