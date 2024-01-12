const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error("Error getting contact list");
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error("Error getting contact by ID");
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result !== null;
  } catch (error) {
    throw new Error("Error deleting contact by ID");
  }
};

const addContact = async (body) => {
  try {
    const addedContact = await Contact.create(body);
    return addedContact;
  } catch (error) {
    throw new Error("Error adding a new contact");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    throw new Error("Error updating contact by ID");
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    console.log("Updating contact status:", contactId, body);

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    console.log("Updated contact:", updatedContact);

    return updatedContact;
  } catch (error) {
    console.error("Error updating contact status:", error.message);
    throw new Error("Error updating contact status");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
