const express = require("express");
const router = express.Router();
const contactModel = require("../../models/contacts");
const Joi = require("joi");

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await contactModel.listContacts();

    res.header("Content-Type", "application/json");

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await contactModel.getContactById(id);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await contactModel.removeContact(id);

    if (result) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContactId = generateUniqueId();

    const newContact = { id: newContactId, ...req.body };

    const addedContact = await contactModel.addContact(newContact);

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    const updatedContact = await contactModel.updateContact(id, req.body);

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
