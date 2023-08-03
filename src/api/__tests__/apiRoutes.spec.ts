import * as apiRoutes from '@/api/apiRoutes';

describe('apiRoutes', () => {
  it('trustAccountChecksRoute should return correct url', () => {
    const result = apiRoutes.trustAccountChecksRoute('300');
    expect(result).toBe('/trust_accounts/300/checks');
  });

  it('chartOfAccountsChecksRoute should return correct url', () => {
    const result = apiRoutes.chartOfAccountsChecksRoute('300');
    expect(result).toBe('/chart_of_accounts/300/checks');
  });

  it('updateTransaction should return correct url', () => {
    const result = apiRoutes.updateTransaction('300');
    expect(result).toBe('checks/300');
  });
});
