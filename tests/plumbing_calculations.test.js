const { processPlumbingQuery } = require('../src/utils/plumbing_calculations');

describe('Plumbing Calculations', () => {
  test('processPlumbingQuery handles water pressure calculation', () => {
    const input = 'Calculate water pressure for a 20 ft height';
    const response = 'Here is information about water pressure calculations.';
    
    const result = processPlumbingQuery(input, response);
    
    expect(result).toCont
