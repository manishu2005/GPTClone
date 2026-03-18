import 'dotenv/config';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const getGptResponse = async (message)=> {   
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message
        }
      ],
     model: "llama-3.1-8b-instant"
    });
    return completion.choices[0].message.content;
  

  } catch (error) {
    console.log(error);
    throw new Error("Failed to get GPT response");
  }
}

export default getGptResponse;