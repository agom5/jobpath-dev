import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import rateLimit from 'express-rate-limit';
import auth from '../middleware/auth.js';

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per user
  message: {
    error: 'Too many AI requests. Please try again in a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(aiLimiter);

router.post('/summarize-job', auth, async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'AI service configuration error',
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const { description, position = '', company = '' } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        error: 'Job description is required',
      });
    }

    console.log(`AI summary requested by user ${req.user.id}`);

    const prompt = `Summarize this job posting in plain text format only. Do NOT use any markdown formatting like **, __, *, _, or any other special characters for formatting.

    Job Description:
    ${description}
    
    Provide a simple summary with:
    1. Key responsibilities 
    2. Required qualifications 
    3. Important details
    
    Use only:
    - Plain text
    - Simple bullet points with -
    - Line breaks for sections
    - NO bold, italic, or markdown formatting
    
    Keep under 300 words.`;

    const result = await model.generateContent(prompt);
    let summary = result.response.text();

    // Clean up any markdown formatting
    summary = summary
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
      .replace(/\*(.*?)\*/g, '$1') // Remove italic *text*
      .replace(/__(.*?)__/g, '$1') // Remove bold __text__
      .replace(/_(.*?)_/g, '$1') // Remove italic _text_
      .trim();

    if (!summary) {
      return res.status(500).json({
        error: 'Failed to generate summary',
      });
    }

    res.json({ summary });
  } catch (error) {
    console.error('AI summarization error:', error.message);

    if (error.message?.includes('quota') || error.message?.includes('limit')) {
      return res.status(429).json({
        error: 'AI service temporarily unavailable. Please try again later.',
      });
    }

    if (error.message?.includes('API key')) {
      return res.status(500).json({
        error: 'AI service configuration error',
      });
    }

    res.status(500).json({
      error: 'Failed to generate summary',
    });
  }
});

export default router;
