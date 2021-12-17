const readline = require('readline');
const fs = require('fs');
const cp = require('child_process');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const input = async question => {return new Promise(r => {rl.question(question, (ans) => {r(ans);});});};

let cl = {};
let v;

const ask = async () => {
    const addGroup = async () => {
        let conf = await input("\nWould you like to add a new group? ");
        if (['y', 'ye', 'yes', 'sure'].includes(conf.trim().toLowerCase())) {
            let gn = await input("What is the group's name? ");
            cl[gn] = [];
            const addItem = async () => {
                let item = await input("Add an item: ");
                if (!['done', ''].includes(item.trim().toLowerCase())) {
                    cl[gn].push(item);
                    await addItem();
                }
            };
            await addItem();
            await addGroup();
        }
    };

    v = await input('What version are you making a changelog for? ');
    await addGroup();

    fs.writeFileSync(`./json/changelogs/${v.trim().toLowerCase()}.json`, JSON.stringify({log: cl, version: {name: "Alpha", semver: v}}));

    await input("I've made the changelog for you! Press enter when you're ready to create the release tag.");

    let msg = await input('What would you like the commit message to be? ');

    console.log('');

    cp.exec('git add .', () => {
        console.log('Staged working directory.\n');
        cp.exec(`npm version ${v.trim().toLowerCase()} -f -m "%s -> ${msg}"`, function(error, stdout, stderr) {
            if (error) {console.error(error);}
            if (stdout) {console.log(stdout);}
            if (stdout) {console.log(stderr);}
        });
    });

    console.log('\nDone!');
};
ask();