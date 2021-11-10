const suggestions = [
  "Do you have time to meet next week?",
  "I have forwarded this message to the appropriate service rep.",
  "If you're not the right person, can you please put me in touch with whoever is?",
  "Thanks again for chatting today and i look forward to hearing from you!"
];

const THRESHOLD_TO_SHOW_SUGGESTION = 0.4;

export default {
  getSuggestionsFor(value) {
    var textWithNBSpaceReplaced = this.removeNewlines(value);
    if (textWithNBSpaceReplaced.length === 0) return "";

    const relevantSuggestions = suggestions.filter(s => s.startsWith(textWithNBSpaceReplaced));
    for (let i = 0; i < relevantSuggestions.length; i++) {
      const suggestion = relevantSuggestions[i];
      if (textWithNBSpaceReplaced.length / suggestion.length >= THRESHOLD_TO_SHOW_SUGGESTION)
        return suggestion;
    }

    return "";
  },
  removeNewlines(str) {
    str = str.replace(/\s{2,}/g, ' ');
    str = str.replace(/\t/g, ' ');
    str = str.toString().trim().replace(/(\r\n|\n|\r)/g, "");
    return str
  }
}