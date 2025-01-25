import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { questionId, answer, studentId, currentScore, correctAnswers, questionNumber } = body;

    if (!questionId || !answer || !studentId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Extract quiz ID and question number from questionId
    const [quizId, questionNum] = questionId.split('-');

    // Sample feedback logic
    const questionsDatabase = {
      '1': {
        '1': { correctAnswer: '4', feedback: { correct: 'Correct! 2 + 2 equals 4.', incorrect: 'Incorrect. The right answer is 4.' } },
        '2': { correctAnswer: '4', feedback: { correct: 'Correct! The square root of 16 is 4.', incorrect: 'Incorrect. The right answer is 4.' } },
        '3': { correctAnswer: '9', feedback: { correct: 'Correct! 3 * 3 equals 9.', incorrect: 'Incorrect. The right answer is 9.' } },
        '4': { correctAnswer: '5', feedback: { correct: 'Correct! 10 - 5 equals 5.', incorrect: 'Incorrect. The right answer is 5.' } },
        '5': { correctAnswer: '4', feedback: { correct: 'Correct! 8 / 2 equals 4.', incorrect: 'Incorrect. The right answer is 4.' } },
        '6': { correctAnswer: '10', feedback: { correct: 'Correct! 7 + 3 equals 10.', incorrect: 'Incorrect. The right answer is 10.' } },
        '7': { correctAnswer: '12', feedback: { correct: 'Correct! 6 * 2 equals 12.', incorrect: 'Incorrect. The right answer is 12.' } },
        '8': { correctAnswer: '5', feedback: { correct: 'Correct! 20 / 4 equals 5.', incorrect: 'Incorrect. The right answer is 5.' } },
        '9': { correctAnswer: '6', feedback: { correct: 'Correct! 9 - 3 equals 6.', incorrect: 'Incorrect. The right answer is 6.' } },
        '10': { correctAnswer: '25', feedback: { correct: 'Correct! 5 * 5 equals 25.', incorrect: 'Incorrect. The right answer is 25.' } }
      }
    };

    const quiz = questionsDatabase[quizId];
    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    const question = quiz[questionNum];
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const isCorrect = question.correctAnswer === answer;
    const newCorrectAnswers = isCorrect ? (correctAnswers || 0) + 1 : (correctAnswers || 0);
    const quizScore = Math.round((newCorrectAnswers / questionNumber) * 100);

    return NextResponse.json({
      feedback: isCorrect ? question.feedback.correct : question.feedback.incorrect,
      answerIsCorrect: isCorrect,
      correctAnswer: question.correctAnswer,
      quizScore: quizScore
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
