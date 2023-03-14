const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message', message => {
	console.log(message.body);
});
 
client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pingponglalala');
	}
});

client.on('message', message => {
    if(message.body===('!wordle')){
        chances=5;
        message.reply(`Welcome to wordle!, guess a five letter word:)\nYou have ${chances} chances`);
        word=getWord();
    }
    if(message.body.length === 5){
         if(chances > 0){
            chances--;
            guess=message.body.toLowerCase();
            response = getResponse(guess,word,chances);
            client.sendMessage(message.from,response); 
            if(guess ===word){
                client.sendMessage(message.from,'Congratuations! You won');
                chances =-1;
            }
            if(chances==0){
                client.sendMessage(message.from,'Game Over');
                chances =-1;  
            }
}}});

function getWord(){

    const fs = require('fs');

    let content= fs.readFileSync('5.txt', 'utf8');
    content=content.split("\n");
    return content[Math.floor(Math.random()* content.length)];
};


var chances =-1;
var word=null;

const getResponse = (input,word,chances) => {
    if(word===null) return "error!!!! AEHHHH";
    let output='⬜⬜⬜⬜⬜';
    let output_l=output.split('');
    let word_l=word.split('');
    let input_l=input.split('');

    for(let i=0;i<5;i++){
        if(word_l[i]===input_l[i]){
            output_l[i]='🟩';
            word_l[i]='#';
            input_l[i]='*';

        }
    }

    for(let i=0;i<5;i++){
        for(let j=0;j<5;j++){
            if(input_l[i] === word_l[j]){
                output_l[i]='🟧';
                input_l[i]='*';
                word_l[i]='#';
            }
        }
    }
    let reply = `\n You have ${chances} chances`
    return output_l.join('').concat(reply);


}
 