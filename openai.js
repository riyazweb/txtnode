import openai from 'openai';

openai.apiKey = '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';

export const generatePrompts = async (model, prompt) => {
  const response = await openai.Completion.create({
    model: model,
    prompt: prompt,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.5
  });
  return response.choices[0].text;
};
