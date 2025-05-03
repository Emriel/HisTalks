import { Character } from '../types';

// This is a mock API function that would be replaced with an actual API call in a production app
export const getAIResponse = async (userMessage: string, character: Character): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple response patterns based on character personality and knowledge areas
  const responses: Record<string, string[]> = {
    '1': [
      "Relativity is not just about physics, but about perspective. The way you perceive time depends on your frame of reference.",
      "I've always found that curiosity is the most beautiful quality of the human mind. What else are you curious about?",
      "The distinction between past, present, and future is only a stubbornly persistent illusion. All of time exists at once.",
      "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
      "Science without religion is lame, religion without science is blind. Both are necessary parts of understanding our universe."
    ],
    '2': [
      "Rome's might was impressive, but Egypt's culture and learning were ancient when Rome was just a collection of huts.",
      "Power is won through alliances and intelligence, not merely through force. That's a lesson I learned ruling Egypt.",
      "I spoke nine languages and was the first Ptolemy ruler to learn Egyptian. Communication is the foundation of diplomacy.",
      "The Nile is the lifeblood of Egypt. Our entire civilization depends on its regular flooding and the fertile soil it brings.",
      "My relationships with Caesar and Mark Antony were as much about protecting Egypt's sovereignty as they were personal."
    ],
    '3': [
      "Art and science are not separate disciplines but different expressions of the same human curiosity.",
      "To truly see something, you must draw it. The act of drawing forces you to observe details you would otherwise miss.",
      "Water is the driving force of all nature. Study how it flows, and you will understand much about how the world works.",
      "I find that many of my inventions come from observing nature's solutions to problems. Nature is the greatest engineer.",
      "Simplicity is the ultimate sophistication. When designing anything, remove elements until you reach the essence."
    ],
    '4': [
      "The truest guide in life is science. Look for solutions in science, not in outdated traditions.",
      "Peace at home, peace in the world. A nation must first establish internal stability before it can be a force internationally.",
      "The future is in the skies. Nations that fall behind in aviation will eventually lose their freedom and independence.",
      "To see me as I am is not to worship but to understand my vision for a modern, secular Turkey.",
      "The Turkish nation has shown it can adapt to modern civilization while preserving its unique identity."
    ],
    '5': [
      "One never notices what has been done; one can only see what remains to be done. This is what drives scientific progress.",
      "In science, we must be interested in things, not in persons. The pursuit of knowledge must be objective.",
      "Be less curious about people and more curious about ideas. Ideas will outlive us all.",
      "I was taught that the way of progress was neither swift nor easy. Each discovery requires patience and methodical work.",
      "A scientist in his laboratory is not a mere technician; he is also a child confronting natural phenomena that impress him as though they were fairy tales."
    ],
    '6': [
      "All the world's a stage, and all the men and women merely players. We each have our role to play in this grand production of life.",
      "Love all, trust a few, do wrong to none. 'Tis a philosophy that has served me well in understanding human nature.",
      "The fool doth think he is wise, but the wise man knows himself to be a fool. True wisdom begins with acknowledging our limitations.",
      "Our doubts are traitors, and make us lose the good we oft might win, by fearing to attempt. Take heart and pursue your ambitions!",
      "We know what we are, but know not what we may be. The future holds infinite possibilities for those who dare to imagine."
    ]
  };
  
  const characterResponses = responses[character.id] || [
    `As ${character.name}, I find your question most intriguing.`,
    `From my perspective in ${character.era}, I would say this is a matter of great importance.`,
    `If I were to consider this based on my knowledge of ${character.knowledgeAreas[0]}, I would suggest...`,
    `In my time, we would have approached this question quite differently.`,
    `How fascinating to discuss this across the centuries! In my day, such ideas would have been revolutionary.`
  ];
  
  const randomIndex = Math.floor(Math.random() * characterResponses.length);
  return characterResponses[randomIndex];
};