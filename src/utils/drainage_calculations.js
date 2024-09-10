function processDrainageQuery(input, response) {
  if (input.toLowerCase().includes('pipe slope')) {
    return calculatePipeSlope(input, response);
  } else if (input.toLowerCase().includes('runoff')) {
    return calculateSurfaceRunoff(input, response);
  } else if (input.toLowerCase().includes('drain size')) {
    return calculateDrainSize(input, response);
  } else {
    return response;
  }
}

function calculatePipeSlope(input, response) {
  // Simplified pipe slope calculation
  const length = extractNumber(input) || 100; // Default to 100 ft if no number found
  const fallInches = 0.25 * length; // Assume 1/4 inch per foot slope
  const slopePercent = ((fallInches / 12) / length * 100).toFixed(2);
  return `${response}\n\nFor a pipe length of ${length} ft with a 1/4 inch per foot slope, the total fall is ${fallInches} inches, and the slope percentage is ${slopePercent}%.`;
}

function calculateSurfaceRunoff(input, response) {
  // Simplified rational method for surface runoff
  const area = extractNumber(input) || 1000; // Default to 1000 sq ft if no number found
  const intensity = 1; // Assume 1 inch per hour rainfall intensity
  const runoffCoefficient = 0.9; // Assume 0.9 for impervious surfaces
  const runoff = (area * intensity * runoffCoefficient / 43560).toFixed(2); // Convert to CFS
  return `${response}\n\nFor an area of ${area} sq ft, with a rainfall intensity of ${intensity} inch/hour and a runoff coefficient of ${runoffCoefficient}, the estimated surface runoff is ${runoff} CFS.`;
}

function calculateDrainSize(input, response) {
  // Simplified drain size calculation
  const flow = extractNumber(input) || 50; // Default to 50 GPM if no number found
  const velocity = 2; // Assume 2 ft/s velocity
  const area = (flow * 0.002228) / velocity; // 0.002228 converts GPM to ft³/s
  const diameter = Math.sqrt((4 * area) / Math.PI);
  const inchDiameter = (diameter * 12).toFixed(2);
  return `${response}\n\nFor a flow rate of ${flow} GPM and a velocity of ${velocity} ft/s, the recommended drain diameter is approximately ${inchDiameter} inches.`;
}

function extractNumber(input) {
  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

module.exports = { processDrainageQuery };
