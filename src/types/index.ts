export interface Character {
  id: string;
  name: string;
  era: string;
  shortBio: string;
  greeting: string;
  image: string;
  personality: string;
  knowledgeAreas: string[];
  category: 'history' | 'science' | 'art' | 'politics' | 'philosophy';
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  senderName: string;
  text: string;
  timestamp: Date;
}