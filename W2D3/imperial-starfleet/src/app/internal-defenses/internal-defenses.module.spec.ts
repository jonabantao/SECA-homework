import { InternalDefensesModule } from './internal-defenses.module';

describe('InternalDefensesModule', () => {
  let internalDefensesModule: InternalDefensesModule;

  beforeEach(() => {
    internalDefensesModule = new InternalDefensesModule();
  });

  it('should create an instance', () => {
    expect(internalDefensesModule).toBeTruthy();
  });
});
