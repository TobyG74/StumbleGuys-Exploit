const cfonts = require('cfonts');
const chalk = require('chalk');
const fetch = require('node-fetch');
const rs = require('readline-sync');
const moment = require("moment-timezone");
moment.tz.setDefault('Asia/Jakarta').locale('id')

async function start() {
    
    cfonts.say('STUMBLE GUYS|EXPLOIT', {
        font: 'shade',   
        align: 'center',
        colors: ['yellow','green'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
    });
    console.log(chalk.blue('======================================'))
    console.log(chalk.green('Creator : Tobz'))
    console.log(chalk.green('Instagram : ini.tobz'))
    console.log(chalk.green('WhatsApp : 081311850715'))
    console.log(chalk.blue('======================================'))

    const code = rs.question(chalk.green("[ ! ]") + " Input Your Auth : ");
    if (code.length === 0) { 
        console.log(chalk.red("[ x ]") +  " Please Input Your Auth!");
    }
    console.log(`
[ 1 ] Round 1
[ 2 ] Round 2
[ 3 ] Round 3
`)
    var list = ["1", "2", "3"]
    var round = rs.question(chalk.green("[ ! ]") + " Input Your Round (1, 2, 3) : ");
        if (round.length === 0) {
            console.log(chalk.red("[ x ]") +  " Please Input Round!");
            round = rs.question(chalk.green("[ ! ]") + " Input Your Round (1, 2, 3) : ");
        }
        if (!Number(round)) { 
            console.log(chalk.red("[ x ]") +  " Please Input Round With Numbers Not Letters!");
            round = rs.question(chalk.green("[ ! ]") + " Input Your Round (1, 2, 3): ");
        }
        if (!list.includes(round)) { 
            console.log(chalk.red("[ x ]") +  " Please Input The Number Of Rounds Correctly!");
            round = rs.question(chalk.green("[ ! ]") + " Input Your Round (1, 2, 3): ");
        }
    var delay = rs.question(chalk.green("[ ! ]") + " Input Delay (Minimum : 7) : ");
        if (delay.length === 0) {
            console.log(chalk.red("[ x ]") +  " Please Input Delay!");
            delay = rs.question(chalk.green("[ ! ]") + " Input Delay (Minimum : 7) : ");
        }
        if (!Number(delay)) { 
            console.log(chalk.red("[ x ]") +  " Please Input Delay With Numbers Not Letters!");
            delay = rs.question(chalk.green("[ ! ]") + " Input Delay (Minimum : 7) : ");
        }
        if (delay < 7) {
            console.log(chalk.red("[ x ]") +  " The Minimum Delay Is 7 To Reduce The Risk Of Being Banned!");
            delay = rs.question(chalk.green("[ ! ]") + " Input Delay (Minimum : 7) : ");
        } 

    console.log("")
    
    while(true) {

        const result = await runExploit(code, round)
        if (!result) {
            console.log(chalk.red("[ x ]") + " YOUR AUTH IS INVALID OR HAS EXPIRED!")
            console.log(chalk.red("[ x ]") + " PLEASE CHECK YOUR AUTH TOKEN AGAIN!")
            return
        } else if (result.includes("User")) {
            const data = JSON.parse(result)
            await reqDelay(Number(delay) + "000")
            console.log(chalk.green("[ + ]") + " | " + moment().format("HH:mm:ss") + " | " + chalk.blue(data.User.Username) + " | " +  chalk.red(data.User.Country) + " | " + chalk.yellow(data.User.SkillRating) + " Thropies" + " | " + chalk.yellow(data.User.Crowns) + " Crowns")
        } else if (result.includes("BANNED")) {
          console.log(chalk.red("[ x ]") + " YOUR ACCOUNT HAS BEEN BANNED!")
        }

    }

}
start()

async function runExploit(code, round) {
    return new Promise((resolve, reject) => {
        fetch(`http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/${round}`, {
            method: "GET",
            headers: {
                "authorization": code,
            }
        }).then(res => res.text())
        .then((result) => {
            resolve(result)
        }).catch((e) => {
            console.log(e)
        });
    })
}

async function reqDelay (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}