const { Configuration, OpenAIApi } = require('openai');
const hvacCalculations = require('./utils/hvac_calculations');
const plumbingCalculations = require('./utils/plumbing_calculations');
const drainageCalculations = require('./utils/drainage_calculations');
const fireProtectionSystems = require('./utils/fire_protection_systems');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function handleChatbotInput(input) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: generatePrompt(input),
      max_tokens: 150,
      temperature: 0.7,
    });

    const botResponse = response.data.choices[0].text.trim();
    return processResponse(botResponse, input);
  } catch (error) {
    console.error('Error:', error);
    return 'I apologize, but I encountered an error while processing your request. Please try again later.';
  }
}

function generatePrompt(input) {
  return `You are a knowledgeable chatbot for mechanical engineering construction engineers. Provide helpful and accurate information about HVAC systems, plumbing, drainage, fire protection systems, and general construction techniques. Respond to the following input:

Input: ${input}

Response:`;
}

function processResponse(response, input) {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('hvac calculation')) {
    return hvacCalculations.processHVACQuery(input, response);
  } else if (lowerInput.includes('plumbing calculation')) {
    return plumbingCalculations.processPlumbingQuery(input, response);
  } else if (lowerInput.includes('drainage calculation')) {
    return drainageCalculations.processDrainageQuery(input, response);
  } else if (lowerInput.includes('fire protection calculation')) {
    return fireProtectionSystems.processFireProtectionQuery(input, response);
  }
  return response;
}

module.exports = { handleChatbotInput };
