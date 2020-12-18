var readlineSync = require('readline-sync');
var figlet = require('figlet');
var chalk = require('chalk');
var Table = require('cli-table');
const table = new Table({
    head: ['Name', 'Score']
  , colWidths: [30, 30]
});

var score = 0;
var questionBank = [    
  {
    question : 'The conversation between Uma Thurman and John Travolta at Jack Rabbit Slim’s in Pulp Fiction referenced the plot of which future Tarantino movie?',
    options :['Kill Bill', 'Inglorious Basterds', 'Hateful Eight', 'Jackie Brown'],
    corretAnswerIndex : 0
  },
  {
    question : 'In Back to the Future, what year does Marty McFly travel back in time to?',
    options :['1945','1950','1955','1960'],
    corretAnswerIndex : 2
  },  
  {
    question : 'Where did Kevin\'s family travel to in Home Alone?',
    options :['Paris','New York','London','Los Angeles'],
    corretAnswerIndex : 0
  },
  {
    question : 'What are Bruce Wayne’s parents watching on the night that they’re murdered in Batman Begins?',
    options :['Mefistofele','The Mask of Zorro','Doctor Faustus','The Barber of Seville'],
    corretAnswerIndex : 0
  },
  {
    question : 'What is the name of the magazine that Miranda Priestly was editor-in-chief of in The Devil Wears Prada?',
    options :['Mode','Runway','Elegante', 'Fashion'],
    corretAnswerIndex : 1
  },
  {
    question : 'In Black Panther, T\'Challa, Okoye, and Nakia travel to which country in search of vibranium being sold on the black market?',
    options :['Japan','Brazil','South Korea', 'England'],
    corretAnswerIndex : 2
  },
  {
    question : 'In Forrest Gump, which Oscar-winning actor played Forrest\'s mom?',
    options :['Sally Field','Jane Fonda','Meryl Streep', 'Diane Keaton'],
    corretAnswerIndex : 0
  },
  {
    question : 'In The Hunger Games, what District were Katniss and Peeta from?',
    options :['District 5','District 9','District 12', 'District 15'],
    corretAnswerIndex : 2
  },
  {
    question : 'In Avengers: Endgame, when Scott (aka Ant-Man) shows up at the Avengers compound how much time had passed since "the Snap"?',
    options :['2 years','5 years','10 years', '12 years'],
    corretAnswerIndex : 1
  },
  {
    question : 'In which film do we first see an infinity stone?',
    options :['Thor','The Avengers','Captain America : The First Avenger', 'Guardians of the Galaxy'],
    corretAnswerIndex : 2
  },
];
var highScores = [
  {
    name : "Ashwin",
    score : 10,
  },
  {
    name : "Akhil",
    score : 9,
  },
  {
    name : "Anand",
    score : 8,
  },
];

function greet(){
 

  figlet('Movie Quiz' , function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.log(err);
          return;
      }
      console.log(data);
       var userName = readlineSync.question('May I have your name? ');
       console.log('Welcome '+userName+'!');
      dashBoard();
  });
}

function dashBoard(){
  console.log(chalk.yellow('\n-----------DASHBOARD-----------'));
  console.log('Select an option!')
  console.log(' 1. Play \n 2. Rules \n 3. Hall of fame');
  dashBoardChoice();
}

function dashBoardChoice(){  
  var input = readlineSync.keyIn('User input: ');
  switch(input){
      case '1':
        play();
        break;
      case '2':
        rules();
        break;
      case '3':
        displayHighscores();
        break;
      default:
        console.log(chalk.red('Invalid input.'));
        dashBoardChoice();
    }
}

function play(){

  console.log(chalk.yellow('\n-----------PLAY-----------'));

  for(var i = 0 ; i < questionBank.length ; i++){
    console.log(chalk.bold.yellow(`\nQuestion ${i+1}/${questionBank.length}: ${questionBank[i].question}`));
    var options = questionBank[i].options;
    var index =  readlineSync.keyInSelect(options, 'User input: ',{cancel: false});
    if(index === questionBank[i].corretAnswerIndex){
      console.log(chalk.green('Correct answer!'));
      score++;
    }
    else{
      console.log(chalk.red('Oops! Wrong answer.'));
    }
    console.log(chalk.blueBright(`Current score : ${score}`))
  }

  if(score>highScores[2].score){
    console.log(chalk.green('\n\nCongrats! You have entered the hall of fame. Send a screenshot of your score to update the scores.'))
  }
  else{
    console.log(chalk.red('\n\nYou did not enter the hall of fame. :('))
  }
}

function displayHighscores(){
  console.log(chalk.yellow('\n-----------Hall of Fame-----------'));
  for(var i = 0 ; i < highScores.length ; i++){
    table.push([highScores[i].name,highScores[i].score]);
  }

  console.log(table.toString());

  console.log(chalk.green('Returning to dashboard...'));
  dashBoard();
}

function rules(){
  console.log(chalk.yellow('\n-----------RULES-----------'));
  console.log(' 1. Total of 10 questions.');
  console.log(' 2. Each correct answer gets a +1.');
  console.log(' 3. No negs for wrong answers.');
  console.log(' 4. If you make it to the hall of fame, send a screenshot with your score.');
  console.log(' 5. Have fun!');

  console.log(chalk.green('Returning to dashboard...'));
  dashBoard();
}


greet();

