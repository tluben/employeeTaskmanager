const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const Employee = require("./lib/Employee")

const inquirer = require("inquirer")
const path = require("path")
const fs = require("fs")

const outputPath = path.resolve(__dirname, "output", "team.html")
const render = require("./lib/htmlRenderer")
const teamMembers = []
const idArray = []


function appMenu() {
    function createManager() {
        console.log("Build your team")
        inquirer.prompt([{
            type: "input",
            name: "managerName",
            message: "What is the manager's name?"
        }, {
            type: "input",
            name: "managerEmail",
            message: "what is the manager's email"
        }, {
            type: "input",
            name: "managerID",
            message: "What is the manager's ID?"
        }, {
            type: "input",
            name: "ManagerOfficeNum",
            message: "What is the manager office number?"
        }]).then(answers => {
            const manager = new Manager(answers.ManagerOfficeNum, answers.managerEmail, answers.managerID, answers.managerName)
            teamMembers.push(manager)
            idArray.push(answers.managerID)
            createTeam()
        })

    }


    function createTeam() {
        inquirer.prompt([{
            type: "list",
            name: "memberChoice",
            message: "What type of member?",
            choices: ["Engineer", "Intern", "No More"]
        }]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer": 
                addEngineer()
                break;
                case "Intern":
                addIntern()
                break;
                default:
                buildTeam()
            }
             
        })
    }
    function addEngineer() {
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?"
        }, {
            type: "input",
            name: "engineerEmail",
            message: "what is the engineer's email"
        }, {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?"
        }, {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's github?"
        }]).then(answers => {
            const engineer = new Engineer(answers.engineerGithub, answers.engineerEmail, answers.engineerID, answers.engineerName)
            teamMembers.push(engineer)
            idArray.push(answers.engineerID)
            createTeam()
        })
    }
        function addEngineer() {
            inquirer.prompt([{
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?"
            }, {
                type: "input",
                name: "engineerEmail",
                message: "what is the engineer's email"
            }, {
                type: "input",
                name: "engineerID",
                message: "What is the engineer's ID?"
            }, {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school?"
            }]).then(answers => {
                const intern = new Intern(answers.internEmail, answers.internID, answers.internName, answers.internSchool)
                teamMembers.push(intern)
                idArray.push(answers.internID)
                createTeam()
            })
        }
        function buildTeam() {
            fs.writeFileSync(outputPath, render(teamMembers),"utf-8")
        } 
        createManager()
}

appMenu();
