const collegeModel = require("../models/college");
const internModel = require("../models/intern");
const isValid = function (value) {
  if (typeof value === "undefined" || value === "null") return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidReqBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    const { name, email, mobile } = data;
    if (!isValidReqBody(data)) {
      return res.status(400).send({ msg: "Body not empty" });
    }
    if (!isValid(name)) {
      return res.status(400).send({ msg: "Name not empty" });
    }
    let isNameExists = await internModel.findOne({ name: name });
    if (isNameExists) {
      return res.status(400).send({ msg: "Name already exists" });
    }
    if (!isValid(email)) {
      return res.status(400).send({ msg: "Email is required" });
    }
    let isEmailExists = await internModel.findOne({ email: email });
    if (isEmailExists) {
      return res.status(400).send({ msg: "Email already exists" });
    }
    if (!isValid(mobile)) {
      return res.status(400).send({ msg: "Mobile nb daalo " });
    }
    let isMobExists = await internModel.findOne({ mobile: mobile });
    if (isMobExists) {
      return res.status(400).send({ msg: "Mobile nb hai phle s " });
    }
    const finalIntern = await internModel.create(data);
    res.status(201).send(finalIntern);
  } catch (err) {
    res.status(500).send({ msg: "Server Error" });
  }
};
module.exports.createIntern = createIntern;
