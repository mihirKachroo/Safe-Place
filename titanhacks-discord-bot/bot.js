var Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");

let latitude = 34.0522;
let longitude = -118.2437;

let name;
let address;
let geo;
let squareFeet;
let numOfPeople;
let safe;

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
    If you don't see a store you're looking for, enter the information using the 'set' command:
        set [name of store] [latitude] [longitude] [number of people inside] [square feet of store] [address] - allows you to manually enter information of a store that you go to.
        **IMPORTANT TO PUT IN ORDER OR THE STORE WILL GET INCORRECT INFORMATION**
        `)
    }

    if (command == "enter") {
        latitude = args.slice(0,args.indexOf(','));
        console.log(latitude);
        longitude = args.slice(args.indexOf(','), args.length);
        console.log(longitude);
    }

    if (command == "check") {

        db.collection('SafePlace').get().then((snapshot) =>{
            snapshot.docs.forEach(doc => {
                
                name = doc.data().Name;
                address = doc.data().Address;
                geo = doc.data().geo;
                squareFeet = doc.data().squareFeet;
                numOfPeople = doc.data().numOfPeople;

                if((squareFeet/numOfPeople) > 36 * Math.PI) {
                    safe = "You are not likely to get COVID-19";
                }
                else if ((squareFeet/numOfPeople) < 36 * Math.PI){
                    safe = "You are likely to get COIVD-19. Find another shop for now";
                }
                else{
                    safe = "Something went wrong with the calculations."
                }

                let embed = new Discord.RichEmbed()
                .setTitle(name)
                .setTimestamp()
                .addField("address", `${address}`)
                .addField("square feet of store", squareFeet)
                .addField("Number of people in store", numOfPeople)
                .addField("Likely hood of getting COVID-19?", safe);
    
                msg.channel.send(embed);
            })
        }) 

    name = "";
    address = "";
    geo = "";
    squareFeet = "";
    numOfPeople = "";
    
    }

    if (command == "set") { 
         for (let index = 4; index < args.length; index++) {
            const element = args[index];
            address += element + " ";
        }

        if(address.search("undefined") != -1) {
            address = address.replace("undefined", "");
        }


        latitude = parseFloat(args[1]);
        longitude = parseFloat(args[2]);

        let data = {
            Name: args[0],
            geo: new admin.firestore.GeoPoint(latitude, longitude),
            numOfPeople: parseInt(args[3]),
            sqareFeet: parseInt(args[4]),
            Address: address
        };

        console.log(data);
        db.collection('SafePlace').doc().set(data);
        address = "";
        latitude = "";
        longitude = "";
    }



})




function errData(err) {
    console.log("Error")
    console.log(err)
}

bot.login(config.token);