const fs = require("fs/promises");
const path = require("path");
const contactsFilePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(contactsData);

    return contacts;
  } catch (error) {
    throw new Error("Error getting contact list");
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const contact = contacts.find((c) => c.id === contactId);

    return contact;
  } catch (error) {
    throw new Error("Error getting contact by ID");
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length !== updatedContacts.length) {
      await fs.writeFile(
        contactsFilePath,
        JSON.stringify(updatedContacts, null, 2)
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error deleting contact by ID");
  }
};

const addContact = async (body) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(contactsData);

    contacts.push(body);

    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

    return body;
  } catch (error) {
    throw new Error("Error adding a new contact");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsData = await fs.readFile(contactsFilePath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      Object.assign(contacts[index], body);

      await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

      return contacts[index];
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Error updating contact by ID");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
