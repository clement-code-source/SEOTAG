

const buildPrompt = (name, description) => {
  return `
You are an AI assistant for a sustainable e-commerce platform.

Choose ONE primary category from:
["Home", "Personal Care", "Kitchen", "Office", "Fashion"]

Return strictly valid JSON in this format:

{
  "primaryCategory": "",
  "subCategory": "",
  "seoTags": [],
  "sustainabilityFilters": []
}

Rules:
- seoTags must be 5 to 10 tags
- sustainabilityFilters must only include:
["plastic-free","compostable","vegan","recycled","biodegradable","eco-friendly"]

Product:
Name: ${name}
Description: ${description}
`;
};


module.exports=buildPrompt