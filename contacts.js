
const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "/db/contacts.json");
const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data) 
};


async function getContactById(contactId) {

  const contacts = await listContacts();
  
  const result = contacts.find(item => Number(item.id) === contactId);
  
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex(item => Number(item.id) === contactId);

  if (index === -1) {
    return null
  }
  console.log(contacts)
  contacts.splice(index, 1);
  console.log(contacts)
  await updateContacts(contacts)
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;

}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
}