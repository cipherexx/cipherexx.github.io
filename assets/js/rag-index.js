//simplistic knowledge base for RAG:
const knowledgeBase = GITHUB_PLACEHOLDER2;


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
