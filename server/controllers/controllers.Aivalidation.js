const Product = require("../models/models.products");
const AILog = require("../models/models.Ailog");
const  buildPrompt  = require("../services/services.prompt");
const  generateResponse  = require("../services/services.category");

const allowedCategories = ["Home", "Personal Care", "Kitchen", "Office", "Fashion"];
const allowedFilters = [
  "plastic-free",
  "compostable",
  "vegan",
  "recycled",
  "biodegradable",
  "eco-friendly"
];

const result = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description required" });
    }

    
    const prompt = buildPrompt(name, description);

    
    const aiResult = await generateResponse(prompt);

   
    if (!allowedCategories.includes(aiResult.primaryCategory)) {
      return res.status(400).json({ error: "Invalid primary category from ai" });
    }

    aiResult.sustainabilityFilters = aiResult.sustainabilityFilters.filter(f =>
      allowedFilters.includes(f)
    );

    if (aiResult.seoTags.length < 5) {
      return res.status(400).json({ error: "Not enough SEO tags generated" });
    }

   
    const product = await Product.create({
      name,
      description,
      aiInfo: aiResult
    });

    
    await AILog.create({
      product:product._id,
      prompt,
      response: aiResult
    });

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
   console.error("full error:", error);

res.status(500).json({
  error: error.message,
  details: error
});
  }
};

module.exports=result