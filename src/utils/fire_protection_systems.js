function processFireProtectionQuery(input, response) {
  if (input.toLowerCase().includes('sprinkler')) {
    return calculateSprinklerCoverage(input, response);
  } else if (input.toLowerCase().includes('fire pump')) {
    return calculateFirePumpCapacity(input, response);
  } else if (input.toLowerCase().includes('fire extinguisher')) {
    return recommendFireExtinguisher(input, response);
  } else {
    return response;
  }
}

function calculateSprinklerCoverage(input, response) {
  // Simplified sprinkler coverage calculation
  const area = extractNumber(input) || 1000; // Default to 1000 sq ft if no number found
  const coveragePerSprinkler = 225; // Assume 225 sq ft per sprinkler
  const sprinklerCount = Math.ceil(area / coveragePerSprinkler);
  return `${response}\n\nFor an area of ${area} sq ft, assuming a coverage of ${coveragePerSprinkler} sq ft per sprinkler, you would need approximately ${sprinklerCount} sprinklers.`;
}

function calculateFirePumpCapacity(input, response) {
  // Simplified fire pump capacity calculation
  const buildingHeight = extractNumber(input) || 50; // Default to 50 ft if no number found
  const baseFlow = 500; // Base flow rate in GPM
  const additionalFlowPerFloor = 250; // Additional GPM per floor
  const floors = Math.ceil(buildingHeight / 10); // Assume 10 ft per floor
  const pumpCapacity = baseFlow + (additionalFlowPerFloor * (floors - 1));
  return `${response}\n\nFor a building height of ${buildingHeight} ft (approximately ${floors} floors), the recommended fire pump capacity is ${pumpCapacity} GPM.`;
}

function recommendFireExtinguisher(input, response) {
  // Simplified fire extinguisher recommendation
  const types = {
    'Class A': 'for ordinary combustibles like wood and paper',
    'Class B': 'for flammable liquids',
    'Class C': 'for electrical equipment',
    'Class D': 'for combustible metals',
    'Class K': 'for cooking oils and fats'
  };
  const randomType = Object.keys(types)[Math.floor(Math.random() * Object.keys(types).length)];
  return `${response}\n\nBased on your query, I recommend a ${randomType} fire extinguisher, which is suitable ${types[randomType]}. However, please consult with a fire safety professional for the most appropriate fire extinguisher for your specific needs.`;
}

function extractNumber(input) {
  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

module.exports = { processFireProtectionQuery };
