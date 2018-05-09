import { ExternalDefensesModule } from './external-defenses.module';

describe('ExternalDefensesModule', () => {
  let externalDefensesModule: ExternalDefensesModule;

  beforeEach(() => {
    externalDefensesModule = new ExternalDefensesModule();
  });

  it('should create an instance', () => {
    expect(externalDefensesModule).toBeTruthy();
  });
});
