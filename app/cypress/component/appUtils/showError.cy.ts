import toast from 'react-hot-toast';
import { showError } from 'appUtils/showError';

describe('showError Functionality', () => {
  let toastErrorStub: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    toastErrorStub = cy.stub(toast, 'error').as('toastError');
  });

  it('should call toast.error with the correct message', () => {
    const errorMessage = 'This is an error message';

    showError(errorMessage);

    expect(toastErrorStub).to.have.been.calledOnceWith(errorMessage);
  });
});

