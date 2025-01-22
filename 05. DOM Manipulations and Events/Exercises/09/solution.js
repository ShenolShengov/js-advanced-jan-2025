function solve() {
  const mainEl = document.querySelector("#quizzie");

  const quesionAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let rightAnswers = 0;
  let questionNumber = 1;

  mainEl.addEventListener('click', answerQuestion);


  function answerQuestion(e) {
    const answerEl = e.target.closest('.quiz-answer');
    if(!answerEl) return;
    const answer = answerEl.textContent.trim();

    console.log(answer, questionNumber - 1);


    if(quesionAnswers[questionNumber - 1] == answer) rightAnswers++;
    questionNumber++;
    hideCurrentQueston(e);

    if(questionNumber > 3) {
      showResults();
      return;
    }
    showNextQuestion(questionNumber);
  }

  function showResults() {
    const resultEl = document.querySelector('#results');
    resultEl.style.display = 'block';
    resultEl.querySelector('h1').textContent = getQuizResults(rightAnswers);
  }

  function getQuizResults(rightAnswers){
    if (rightAnswers == 3) return 'You are recognized as top JavaScript fan!';
    return `You have ${rightAnswers} right answers`;
  }

  function hideCurrentQueston(e) {
      e.target.closest('section').style.display = 'none';;
  }

  function showNextQuestion(questionNumber){
    document.querySelector(`section:nth-of-type(${questionNumber})`).style.display = 'block';
  }
}