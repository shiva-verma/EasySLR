import toast from 'react-hot-toast';
import { showSuccess } from 'appUtils/showSuccess';

describe('Toast Success Functionality', () => {
  let toastSuccessStub: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    toastSuccessStub = cy.stub(toast, 'success').as('toastSuccess');
  });

  it('should call toast.success with the correct message', () => {
    const successMessage = 'This is a success message';

    showSuccess(successMessage);

    expect(toastSuccessStub).to.have.been.calledOnceWith(successMessage);
  });
});
