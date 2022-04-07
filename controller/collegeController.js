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

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    if (!isValidReqBody(data)) {
      return res.status(400).send({ message: "Invalid Request" });
    }
    const { name, fullName, logoLink } = data;
    if (!isValid(name)) {
      return res.status(400).send({ message: "college name is required" });
    }
    let isName = await collegeModel.findOne({ name: name });
    if (isName) {
      res.status(400).send({ message: "Name is already registered" });
    }
    if (!isValid(fullName)) {
      return res.status(400).send({ message: "fullName is required" });
    }
    let isFullName = await collegeModel.findOne({ fullName: fullName });
    if (isFullName) {
      return res.status(400).send({ message: "Already Exists" });
    }
    if (!isValid(logoLink)) {
      res.status(400).send({ message: "Logo is required" });
    }
    if (
      !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
        logoLink
      )
    ) {
      return res
        .status(400)
        .send({ status: false, message: `logo should be a valid link` });
    }
    let college = await collegeModel.create(data);

    res.status(200).send(college);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
};

const collegedetails = async function (req, res) {
  let querry = req.query;
  let findCollege = await collegeModel.findOne(querry);
  if (!findCollege) {
    return res.status(400).send({ msg: "college not found" });
  }
  //console.log(findCollege);
  let id = findCollege._id;
  console.log(id);
  let findInterns = await internModel.find({ collegeId: id });
  console.log(findInterns);
  let addedinternd = JSON.parse(JSON.stringify(findCollege)); //same copy of main object
  addedinternd.Interest = [...findInterns];
  return res.status(200).send({ msg: addedinternd });
};

module.exports.collegedetails = collegedetails;

module.exports.createCollege = createCollege;
