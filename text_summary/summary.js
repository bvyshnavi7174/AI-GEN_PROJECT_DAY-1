document.getElementById('submitButton').addEventListener('click', function() {
    const textInput = document.getElementById('textInput').value;
    const summaryOutput = document.getElementById('summaryOutput');

    // Split text into sentences
    const sentences = textInput.split('.').filter(sentence => sentence.trim().length > 0);

    // Basic sentence scoring (e.g., word count as score)
    const sentenceScores = sentences.map(sentence => ({
        sentence,
        score: sentence.split(' ').length
    }));

    // Sort sentences by score (length) and take the top 2
    sentenceScores.sort((a, b) => b.score - a.score);
    const summarySentences = sentenceScores.slice(0, 2).map(item => item.sentence);

    // Join sentences to create summary
    const summary = summarySentences.join('. ') + (sentences.length > 2 ? '...' : '');

    summaryOutput.textContent = summary;
});
