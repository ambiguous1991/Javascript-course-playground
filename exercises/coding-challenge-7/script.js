/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

(function () {
    var Question = function (question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    };

    var questions = [
        new Question('What is my name', ['Kuba', 'Duba', 'Doo'], 0),
        new Question('What is my age', [50, 29, 99], 1),
        new Question('What is my urge', ['To learn javascript!', 'To die in peace', 'To live alone'], 0)
    ];

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (ans) {
        if (ans === this.correct) {
            console.log('Correct answer!');

        } else {
            console.log('Wrong answer. Try again :)')
        }
    };

    var which = Math.floor(Math.random()*questions.length);

    questions[which].displayQuestion();

    var answer = parseInt(prompt('Please select the correct answer.'));

    questions[which].checkAnswer(answer);
})();