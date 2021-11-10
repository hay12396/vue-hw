const suggestions = [
  "Do you have time to meet next week?",
  "I have forwarded this message to the appropriate service rep.",
  "If you're not the right person, can you please put me in touch with whoever is?",
  "Thanks again for chatting today and i look forward to hearing from you!"
];

export default {
  getSuggestionsFor(value) {
    const relevantSuggestions = suggestions.filter(s => s.startsWith(value));
    return relevantSuggestions.length > 0 ? relevantSuggestions[0] : "";
  }
}