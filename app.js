const readline = require('readline');

// Create a readline interface for input/output in the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let people = [];

// Main menu function
function mainMenu() {
    console.log("\nMain Menu:");
    console.log("1. Enter data for 10 people");
    console.log("2. View all people");
    console.log("3. View a specific person by ID");
    console.log("4. Delete all people");
    console.log("5. Delete a specific person by ID");
    console.log("6. Exit");
}
rl.question("Choose an option (1-6): ", option => {
    switch (option) {
        case '1': enterPeopleData(); break;
        case '2': viewAllPeople(); break;
        case '3': viewPerson(); break;
        case '4': deleteAllPeople(); break;
        case '5': deletePerson(); break;
        case '6': exitProgram(); break;
        default: console.log("Invalid option! Please choose again."); mainMenu(); break;
    }
});


// Function to prompt the user to enter data for 10 people
const enterPeopleData=()=> {
    console.log("Enter data for 10 people (format: id, first name, last name, age, city):");

    let count = 0;

    // Function to enter each person's data
    const enterPerson=() =>{
        if (count < 10) {
            rl.question(`Enter data for person ${count + 1}: `, data => {
                const [id, firstName, lastName, age, city] = data.split(',').map(item => item.trim());

                // Check for unique ID
                if (people.some(person => person.id === id)) {
                    console.log(`Error: ID ${id} already exists. Please enter a unique ID.`);
                    enterPerson(); // Retry for the same person
                } else {
                    people.push({ id, firstName, lastName, age: Number(age), city });
                    count++;
                    enterPerson(); // Proceed to the next person
                }
            });
        } else {
            console.log("\nData entry complete. Here is the list of people:");
            people.forEach(person => {
                console.log(`ID: ${person.id}, Name: ${person.firstName} ${person.lastName}, Age: ${person.age}, City: ${person.city}`);
            });
            rl.close();
        }
    }

    enterPerson();
}

// Start data entry process
enterPeopleData();


// Function to view all people
const viewAllPeople=()=>{
    console.log("\nAll People:");
    people.forEach(person => {
        console.log(`ID: ${person.id}, Name: ${person.firstName} ${person.lastName}, Age: ${person.age}, City: ${person.city}`);
    });
    mainMenu();
}

// Function to view a specific person by ID
const viewPerson=()=> {
     const id =readline.question("Enter the ID of the person to view: ")
        const person = people.find(p => p.id === id);
        if (person) {
            console.log(`\nPerson Found: ID: ${person.id}, Name: ${person.firstName} ${person.lastName}, Age: ${person.age}, City: ${person.city}`);
        } else {
            console.log("Person not found.");
        }
        mainMenu();
}

// Function to delete all people
const deleteAllPeople=()=> {
    people = [];
    console.log("All people have been deleted.");
    mainMenu();
}

// Function to delete a specific person by ID
const deletePerson=()=>{
    const id =readline.question("Enter the ID of the person to delete: ")
        const index = people.findIndex(p => p.id === id);
        if (index !== -1) {
            people.splice(index, 1);
            console.log("Person deleted.");
        } else {
            console.log("Person not found.");
        }
        mainMenu();
    }

    // Function to exit the program
    const exitProgram=()=> {
    console.log("Exiting program.");
    rl.close();
}

// Start the program
mainMenu();
