const argv = require("yargs").argv;
const contacts = require("./contacts.js")


const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            break;
        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;
        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            break;
        case "remove":
            const contactToDelete = await contacts.removeContact(id);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!")
    }
}


invokeAction(argv)
