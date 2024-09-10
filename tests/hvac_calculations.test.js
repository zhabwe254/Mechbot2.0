const { processHVACQuery } = require('../src/utils/hvac_calculations');

describe('HVAC Calculations', () => {
  test('processHVACQuery handles cooling load calculation', () => {
    const input = 'Calculate cooling load for a 2000 sq ft room';
    const response = 'Here is information about cooling load calculations.';
    
    const result = processHVACQuery(input, response);
    
    expect(result).toContain('cooling load is 50000 BTU/hr');
  });

  test('processHVACQuery handles heating load calculation', () => {
    const input = 'Calculate heating load for a 1500 sq ft room';
    const response = 'Here is information about heating load calculations.';
    
    const result = processHVACQuery(input, response);
    
    expect(result).toContain('heating load is 52500 BTU/hr');
  });

  test('processHVACQuery handles duct sizing calculation', () => {
    const input = 'Calculate duct size for 1200 CFM airflow';
    const response = 'Here is information about duct sizing calculations.';
    
    const result = processHVACQuery(input, response);
    
    expect(result).toContain('recommended round duct diameter is approximately');
  });
});
