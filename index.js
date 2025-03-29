#!/usr/bin/env node

import chalk from "chalk";
import inquirer from 'inquirer';
import { pastel } from "gradient-string";
import chalkAnimation from 'chalk-animation'
import figlet from "figlet";
import { exit } from "process";
import { createSpinner } from "nanospinner";

const questions = [
        {
          question: "Which is the largest ocean on Earth?",
          answer: "Pacific Ocean",
          choices: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
        },
        {
          question: "Who painted the Mona Lisa?",
          answer: "Leonardo da Vinci",
          choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"]
        },
        {
          question: "What is the capital of Canada?",
          answer: "Ottawa",
          choices: ["Ottawa", "Toronto", "Vancouver", "Montreal"]
        },
        {
          question: "Which planet in our solar system has the most moons?",
          answer: "Saturn",
          choices: ["Jupiter", "Saturn", "Mars", "Neptune"]
        },
        {
          question: "Which metal is liquid at room temperature?",
          answer: "Mercury",
          choices: ["Mercury", "Gold", "Silver", "Aluminum"]
        },
        {
          question: "Which country is famous for inventing the pizza?",
          answer: "Italy",
          choices: ["Italy", "France", "United States", "Greece"]
        },
        {
          question: "Who discovered gravity when he saw a falling apple?",
          answer: "Isaac Newton",
          choices: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Johannes Kepler"]
        },
        {
          question: "Which language has the most native speakers worldwide?",
          answer: "Mandarin Chinese",
          choices: ["Mandarin Chinese", "English", "Spanish", "Hindi"]
        },
        {
          question: "Which is the smallest country in the world?",
          answer: "Vatican City",
          choices: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"]
        },
        {
          question: "What is the hardest natural substance on Earth?",
          answer: "Diamond",
          choices: ["Diamond", "Quartz", "Graphene", "Titanium"]
        },
        {
          question: "Which continent has the most countries?",
          answer: "Africa",
          choices: ["Africa", "Asia", "Europe", "South America"]
        },
        {
          question: "Which sport uses terms like 'love', 'deuce', and 'ace'?",
          answer: "Tennis",
          choices: ["Tennis", "Badminton", "Squash", "Table Tennis"]
        },
        {
          question: "What does the 'E' in 'E = mc²' stand for?",
          answer: "Energy",
          choices: ["Energy", "Entropy", "Electricity", "Electron"]
        },
        {
          question: "Which famous ship sank after hitting an iceberg in 1912?",
          answer: "Titanic",
          choices: ["Titanic", "Lusitania", "Bismarck", "Queen Mary"]
        },
        {
          question: "Which is the only planet in our solar system that rotates on its side?",
          answer: "Uranus",
          choices: ["Uranus", "Venus", "Neptune", "Mars"]
        },
        {
          question: "Which city hosted the first modern Olympic Games in 1896?",
          answer: "Athens",
          choices: ["Athens", "Paris", "London", "Rome"]
        },
        {
          question: "Which blood type is known as the universal donor?",
          answer: "O negative",
          choices: ["O negative", "AB positive", "A positive", "B negative"]
        },
        {
          question: "Who invented the telephone?",
          answer: "Alexander Graham Bell",
          choices: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"]
        },
        {
          question: "What is the largest desert in the world?",
          answer: "Antarctic Desert",
          choices: ["Antarctic Desert", "Sahara Desert", "Gobi Desert", "Arabian Desert"]
        },
        {
          question: "What is the most abundant gas in Earth's atmosphere?",
          answer: "Nitrogen",
          choices: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"]
        },
        {
          question: "Which chess piece can only move diagonally?",
          answer: "Bishop",
          choices: ["Bishop", "Knight", "Rook", "Pawn"]
        },
        {
          question: "What is the currency of Japan?",
          answer: "Yen",
          choices: ["Yen", "Won", "Rupee", "Baht"]
        },
        {
          question: "Which novel features the character Sherlock Holmes?",
          answer: "A Study in Scarlet",
          choices: ["A Study in Scarlet", "Moby-Dick", "Pride and Prejudice", "Great Expectations"]
        }
    ]

//function to create a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//display welcome message
async function welcome() {
    const title = chalkAnimation.rainbow("Welcome to CLI Quiz!");
    title.start();
    await delay(1000); 
    title.stop();

    console.log(`
        ${chalk.bgBlue(" How To Play? ")}
        You will get 5 questions.
        If you get any question wrong, You ${chalk.bgRed(" Lose ")} 
        If you answer all questions correctly, You ${chalk.bgGreen(" Win ")}
    `);

    await delay(1000);
}

//get player information
let playerName;
async function getPlayerInfo() {
    let answer = await inquirer.prompt({
        type: 'input',
        message: 'Enter your name: ',
        name: 'name',
        default: 'MegaMind'
    })

    playerName = answer.name;

    console.log(`
        Hi ${playerName}, Let's start!
    `)
}

async function checkAnswer(selectedOption, correctOption) {
    const spinner = createSpinner('...').start();
    await delay(1000);

    if(selectedOption === correctOption) {
        spinner.success({text: 'Correct Answer!\n'});
    }
    else {
        spinner.error(`${chalk.bgRed('Wrong Answer. You Lose !\n')}`)
        exit(1);
    }
}

//to get random 5 questions everytime
let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

async function askQuestions() {
    for(let i=0; i<5; i++) {
        let answer = await inquirer.prompt({
            type: 'list',
            name: 'selectedOption',
            message: shuffledQuestions[i].question,
            choices: shuffledQuestions[i].choices,
        });

        await checkAnswer(answer.selectedOption, shuffledQuestions[i].answer);
    }

    const winningMsg = `Congrats, ${playerName}`;

    figlet(winningMsg, (err, data) => {
        console.log(pastel.multiline(data));
    });
}

await welcome();
await getPlayerInfo();
await askQuestions();