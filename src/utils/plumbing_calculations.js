function processPlumbingQuery(input, response) {
  if (input.toLowerCase().includes('water pressure')) {
    return calculateWaterPressure(input, response);
  } else if (input.toLowerCase().includes('pipe size')) {
    return calculatePipeSize(input, response);
  } else if (input.toLowerCase().includes('flow rate')) {
    return calculateFlowRate(input, response);
  } else {
    return response;
  }
}

function calculateWaterPressure(input, response) {
  // Simplified water pressure calculation
  const height = extractNumber(input) || 10; // Default to 10 ft if no number found
  const pressure = (height * 0.433).toFixed(2); // 0.433 psi per foot of water
  return `${response}\n\nFor a height of ${height} ft, the estimated water pressure is ${pressure} psi.`;
}

function calculatePipeSize(input, response) {
  // Simplified pipe size calculation
  const flowRate = extractNumber(input) || 10; // Default to 10 GPM if no number found
  const velocity = 5; // Assume 5 ft/s velocity
  const area = (flowRate * 0.002228) / velocity; // 0.002228 converts GPM to ft³/s
  const diameter = Math.sqrt((4 * area) / Math.PI);
  const inchDiameter = (diameter * 12).toFixed(2);
  return `${response}\n\nFor a flow rate of ${flowRate} GPM and a velocity of ${velocity} ft/s, the recommended pipe diameter is approximately ${inchDiameter} inches.`;
}

function calculateFlowRate(input, response) {
  // Simplified flow rate calculation
  const diameter = extractNumber(input) || 1; // Default to 1 inch if no number found
  const velocity = 5; // Assume 5 ft/s velocity
  const area = Math.PI * Math.pow(diameter / 24, 2); // Convert diameter to feet
  const flowRate = (area * velocity * 448.83).toFixed(2); // 448.83 converts ft³/s to GPM
  return `${response}\n\nFor a pipe diameter of ${diameter} inches and a velocity of ${velocity} ft/s, the estimated flow rate is ${flowRate} GPM.`;
}

function extractNumber(input) {
  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

module.exports = { processPlumbingQuery };
