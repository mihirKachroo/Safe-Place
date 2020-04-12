var Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");

let latitude = 34.0522;
let longitude = -118.2437;


// import settings

// initialise database (firestore)
const firebase = require('firebase/app');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

let db = admin.firestore();

// End firestore

bot.on('ready', () => {
    console.log(`${bot.user.tag} is on!`)
})

bot.on('message', msg => {
    if ((msg.author.bot) || (!msg.content.startsWith(config.prefix))) return;

    const args = msg.content.slice(config.prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    console.log(`Command name:${command}\nArguments:${args}`);

    if (command == "help") {
        msg.author.send(`Here are the commands:
        enter [latitude] [longitude] - enter your latitude and longitude coordinates (We are still experimenting with this so please don't change it for now as it may mess up the data we currently have)
        check - sends request to check the 5 closest stores according to your latitude and longitude coordinates
        `)
    }

    if (command == "enter") {
        latitude = args.slice(0,args.indexOf(','));
        console.log(latitude);
        longitude = args.slice(args.indexOf(','), args.length);
        console.log(longitude);
    }

    if (command == "check") {
        let name;
        let address;
        let geo;
        let squareMeters;
        let numOfPeople;

        db.collection('SafePlace').get().then((snapshot) =>{
            snapshot.docs.forEach(doc => {
                
                name = doc.data().Name;
                address = doc.data().Address;
                geo = doc.data().geo;
                squareFeet = doc.data().squareFeet;
                numOfPeople = doc.data().numOfPeople;
                
                let embed = new Discord.RichEmbed()
                .setTitle(name)
                .setTimestamp()
                .addField("address", `${address}`)
                .addField("square feet of store", squareFeet)
                .addField("Number of people in store", numOfPeople);
    
                
                msg.channel.send(embed);
            })
        }) 
    }
})



function errData(err) {
    console.log("Error")
    console.log(err)
}

bot.login(config.token);