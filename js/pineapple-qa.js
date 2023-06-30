(function(){
    function buildQuiz(){
      const output = [];
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
          const answers = [];
          for(letter in currentQuestion.answers){
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }

          output.push(
            `<div class="slideqa">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );

      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      const answerContainers = quizContainer.querySelectorAll('.answers');

      let numCorrect = 0;

      myQuestions.forEach( (currentQuestion, questionNumber) => {
          const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
          numCorrect++;
  
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else{
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      resultsContainer.innerHTML = `你在${myQuestions.length}題裡答對${numCorrect}題`;
    }
  
    function showSlideqa(n) {
      slidesqa[currentSlideqa].classList.remove('active-slideqa');
      slidesqa[n].classList.add('active-slideqa');
      currentSlideqa = n;
      if(currentSlideqa === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlideqa === slidesqa.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlideqa() {
      showSlideqa(currentSlideqa + 1);
    }
  
    function showPreviousSlideqa() {
      showSlideqa(currentSlideqa - 1);
    }
  
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Q1:誰產量最多?",
        answers: {
          1: "A",
          2: "B",
          3: "C"
        },
        correctAnswer: "3"
      },
      {
        question: "Q2:誰纖維最粗?",
        answers: {
          1: "A",
          2: "B",
          3: "C"
        },
        correctAnswer: "1"
      },
      {
        question: "Q3:誰最營養?",
        answers: {
          1: "A",
          2: "B",
          3: "C"
        },
        correctAnswer: "2"
      }
    ];
  
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slidesqa = document.querySelectorAll(".slideqa");
    let currentSlideqa = 0;

    showSlideqa(currentSlideqa);

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlideqa);
    nextButton.addEventListener("click", showNextSlideqa);
  })();