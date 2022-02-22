#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from 'nanospinner';


let playerName;

const sleep = (ms = 200) => new Promise((r) => setTimeout(r, ms));


async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Como você quer ser chamado?'
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`
    ${chalk.blue('COMO JOGAR')}
    Você é um bicheiro procurado pela policia
    Atualmente, você está em uma das suas mansões localizada no topo do morro do dendê
    Responda como sua vida dependesse disso.
  `);
}


async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `A policia continua em sua busca...! \n` });
  } else {
    spinner.error({ text: `💀 A Policia te pegou! 💀` });
    process.exit(1);
  }
}


async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'Qual é o seu nome?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name;
}


async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'Você está no seu quarto, quando você ouve o vapor te alertar que a policia está cercando sua casa... O que você faz?',
    choices: [
      'Verifico o celular',
      'Tento sair pela janela do quarto',
      'Tento sair pela porta do quarto',
      'Ligo a TV e jogo Fifa'
    ],
  });
  return handleAnswer(answers.question_1 === 'Verifico o celular')
}


async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'Entrando no WhatsApp, você nota algumas mensagens do seu amigo Flávio, um parceiro que você tem. \n Ele diz que todo o esquema acabou, e a policia já tinha pego o Jorge \n O que você faz?',
    choices: [
      'Vejo status do zap',
      'Mando meus capangas atrasarem os porcos fardados',
      'Mando mensagem de despedida no grupo da pelada',
      'Manda um nude pra WebGrilo que eu troco mensagem'
    ],
  });
  return handleAnswer(answers.question_2 === 'Mando meus capangas atrasarem os porcos fardados')
}


async function question3() {
  const answer = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: 'Com a policia distraida, você vê uma janela de oportunidade, o que você faz?',
    choices: [
      'Ajudo meus parça descendo chumbo nos alemão',
      'Fujo na surdina pela porta dos fundos',
      'Agora é a hora perfeita para bater um Fifa...',
      'Com a policia distraida, já posso dormir sossegado'
    ],
  });
  return handleAnswer(answer.question_3 == 'Fujo na surdina pela porta dos fundos')
}


async function winner() {
  console.clear();
  figlet(`${playerName} é um ótimo bicheiro!`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        'Obrigado por jogar meu RPG de Bicheiro ~~ Diego Pisani'
      )
    );
    process.exit(0);
  });
};

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
winner();


// Ver o celular -> Manda mensagem pra contenção -> Atrasando a policia, você decide subir o morro -> Você anda o suficiente até encontrar um antigo amigo de escola, onde você cobra um favor que você tinha feito para ele, onde na prova de portugues você tinha empresatado um lápis para ele fazer a prova, a mesma prova que fez ele passar de ano -> Ele te dá uma carona para um aeroporto clandestino -> Você foge
