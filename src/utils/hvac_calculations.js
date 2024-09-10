function processHVACQuery(input, response) {
  if (input.toLowerCase().includes('cooling load')) {
    return calculateCoolingLoad(input, response);
  } else if (input.toLowerCase().includes('heating load')) {
    return calculateHeatingLoad(input, response);
  } else if (input.toLowerCase().includes('duct sizing')) {
    return calculateDuctSize(input, response);
  } else {
    return response;
  }
}

function calculateCoolingLoad(input, response) {
  // Simplified cooling load calculation
  const area = extractNumber(input) || 1000; // Default to 1000 sq ft if no number found
  const coolingLoad = area * 25; // Assume 25 BTU/hr per sq ft
  return `${response}\n\nBased on an area of ${area} sq ft, the estimated cooling load is ${coolingLoad} BTU/hr.`;
}

function calculateHeatingLoad(input, response) {
  // Simplified heating load calculation
  const area = extractNumber(input) || 1000; // Default to 1000 sq ft if no number found
  const heatingLoad = area * 35; // Assume 35 BTU/hr per sq ft
  return `${response}\n\nBased on an area of ${area} sq ft, the estimated heating load is ${heatingLoad} BTU/hr.`;
}

function calculateDuctSize(input, response) {
  // Simplified duct sizing calculation
  const airflow = extractNumber(input) || 1000; // Default to 1000 CFM if no number found
  const velocity = 900; // Assume 900 ft/min velocity
  const area = airflow / velocity;
  const diameter = Math.sqrt((4 * area) / Math.PI);
  return `${response}\n\nFor an airflow of ${airflow} CFM and a velocity of ${velocity} ft/min, the recommended round duct diameter is approximately ${diameter.toFixed(2)} inches.`;
}

function extractNumber(input) {
  const match = input.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

module.exports = { processHVACQuery };
