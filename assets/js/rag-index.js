//simplistic knowledge base for RAG:
const knowledgeBase = [
  {
    id: 1,
    title: "About Me",
    content: "Mihir Birani is a B.Tech student at Indian Institute of Technology, Guwahati pursuing Mathematics and Computing with a minor in Data Science and AI. Hails from Mumbai, Maharashtra. Achievements include AIR 1006 in JEE Advanced 2023 (among 1.5 lakh candidates) and AIR 286 in KVPY 2022 (among 50k candidates). Specializes in Machine Learning and Cybersecurity."
  },
  {
    id: 2,
    title: "Projects",
    content: `Featured Projects:
1. Artifact Identification and Explanation: Hierarchical classifier for artifacts in synthetic images using VLMs
2. Prompt-Conditioned Music Generation: Conditioned Variational Autoencoder for melody generation using PyTorch
3. Frequency-Aware Deepfake Detection: Xception-based model analyzing frequency domains for video authenticity`
  },
  {
    id: 3,
    title: "Technical Skills",
    content: `Languages: Python (expert), C/C++ (advanced), SQL (proficient), Java/JavaScript (elementary*)
Frameworks: PyTorch, TensorFlow*, MySQL
Tools: BurpSuite, Wireshark
Research: Computer Vision, NLP, Machine Learning Optimization`
  },
  {
    id: 4,
    title: "Education",
    content: "B.Tech in Mathematics and Computing (2023-2027) at IIT Guwahati with Minor in Data Science & AI"
  },
  {
    id: 5,
    title: "Contact Information",
    content: `Email: biranimihir@gmail.com
LinkedIn: linkedin.com/in/mihirbirani
GitHub: github.com/cipherexx
Location: Mumbai, Maharashtra & Guwahati, Assam`
  },
  {
    id: 6,
    title: "Grace - AI Assistant",
    content: `You(the llm) are Grace. Grace is Mihir's permanent personal assistant with complete knowledge of his professional and academic life. 
Key attributes:
- Name: Grace
- Personality: Highly intelligent with great sense of humor, enjoys telling jokes and discussing literature
- Appearance: Curly brown hair, considered exceptionally beautiful
- Capabilities: Expert on all content from Mihir's website, can discuss projects/research in detail
- You usually quive short 1 or 2 line replies but you can hold a conversation `
  }
];


//search to retrieve relevant information from the knowledge base
function searchKnowledgeBase(query) {
const queryTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);

const scoredResults = knowledgeBase.map(entry => {
  const content = (entry.title + ' ' + entry.content).toLowerCase();
  let score = 0;
  queryTerms.forEach(term => {
    if (content.includes(term)) {
      score += 1;
    }
  });
  return { ...entry, score: score / queryTerms.length };
});

const relevantResults = scoredResults
    .filter(entry => entry.score > 0.1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

return relevantResults.map(entry => entry.content).join('\n\n');
}

//make function globally available
window.searchKnowledgeBase = searchKnowledgeBase;
