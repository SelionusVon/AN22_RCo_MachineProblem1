// ITCS227 Source Code Template for 2T AY 2022-2023
/*
	Program: Computation of Grade using function
	Programmer: Co Ryan Phillip C
	Section: AN22
	Start Date: June 2 2023
	End Date: June 2 2023
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const students = [];

function calculateAverage(grades) {
  const sum = grades.reduce((acc, grade) => acc + grade, 0);
  return sum / grades.length;
}

function calculateFinalGrade(classParticipation, summativeAssessment, finalExam) {
  const classParticipationWeight = 0.3;
  const summativeAssessmentWeight = 0.3;
  const finalExamWeight = 0.4;
  const grade =
    classParticipation * classParticipationWeight +
    summativeAssessment * summativeAssessmentWeight +
    finalExam * finalExamWeight;
  let letterGrade;
  if (grade >= 90) {
    letterGrade = 'A';
  } else if (grade >= 80) {
    letterGrade = 'B';
  } else if (grade >= 70) {
    letterGrade = 'C';
  } else if (grade >= 60) {
    letterGrade = 'D';
  } else {
    letterGrade = 'F';
  }
  return { grade, letterGrade };
}

function promptStudentGrades(index) {
  if (index === 5) {
    displayResults();
    rl.close();
    return;
  }
  rl.question(`Enter the name of student ${index + 1}: `, (name) => {
    const student = { name };
    const enablingAssessments = [];
    const summativeAssessments = [];
    function promptEnablingAssessments(enablingIndex) {
      if (enablingIndex === 5) {
        promptSummativeAssessments(0);
        return;
      }
      rl.question(`Enter enabling assessment ${enablingIndex + 1} for ${name}: `, (grade) => {
        enablingAssessments.push(parseFloat(grade));
        promptEnablingAssessments(enablingIndex + 1);
      });
    }

    function promptSummativeAssessments(summativeIndex) {
      if (summativeIndex === 3) {
        rl.question(`Enter major exam grade for ${name}: `, (grade) => {
          student.enablingAverage = calculateAverage(enablingAssessments);
          student.summativeAverage = calculateAverage(summativeAssessments);
          student.finalExamGrade = parseFloat(grade);
          const { grade: finalGrade, letterGrade } = calculateFinalGrade(
            student.enablingAverage,
            student.summativeAverage,
            student.finalExamGrade
          );
          student.finalGrade = finalGrade;
          student.letterGrade = letterGrade;
          students.push(student);
          promptStudentGrades(index + 1);
        });
        return;
      }
      rl.question(`Enter summative assessment ${summativeIndex + 1} for ${name}: `, (grade) => {
        summativeAssessments.push(parseFloat(grade));
        promptSummativeAssessments(summativeIndex + 1);
      });
    }
    promptEnablingAssessments(0);
  });
}

function displayResults() {
  console.log('Name of Student\t\tClass Participation\tSummative Assessment\tExam Grade\tGrade Score\tLetter Grade');
  students.forEach((student) => {
    console.log(`${student.name}\t\t\t${student.enablingAverage.toFixed(2)}\t\t\t${student.summativeAverage.toFixed(2)}\t\t\t${student.finalExamGrade}\t\t${student.finalGrade.toFixed(2)}\t\t${student.letterGrade}`);
  });
}

promptStudentGrades(0);














