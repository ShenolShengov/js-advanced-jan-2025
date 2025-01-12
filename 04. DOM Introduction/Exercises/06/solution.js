function solve() {
  const text = document.querySelector('textarea').value;

  const sentences = text.split('. ').filter(s => s);

  const paragrpahsSentences = [];

  console.log(sentences);

  while (sentences.length !== 0) {
    paragrpahsSentences.push(sentences.splice(0, 3));
  }

  const outputEl = document.querySelector('#output');
  outputEl.innerHTML = '';

  paragrpahsSentences.forEach(paragraphSentences => {
      outputEl.innerHTML += `<p>${paragraphSentences.join('. ')}</p>`;
  })

}