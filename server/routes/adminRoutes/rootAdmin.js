const express = require("express");
const rootAdminRouter = express.Router();
const verifyRootAdmin = require("../middlewares/verifyRootAdmin");
const userModel = require("../../model/user_model");
const instituteModel = require("../../model/institute_model");
const departmentModel = require("../../model/department_model");
rootAdminRouter.post(
  "/makeAdmin1OfInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId, admin1Id } = req.body;
      const institute = await instituteModel.findById(instituteId);
      const admin1 = await userModel.findById(admin1Id);
      if (institute && admin1) {
        institute.admin.admin1 = admin1._id;
        await institute.save();
        res.status(200).send("Admin1 of institute set");
      } else {
        res.status(404).send("Institute or Admin1 not found");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.post(
  "/makeAdmin2OfInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId, admin2Id } = req.body;
      const institute = await instituteModel.findById(instituteId);
      const admin2 = await userModel.findById(admin2Id);
      if (institute && admin2) {
        institute.admin.admin2 = admin2._id;
        await institute.save();
        res.status(200).send("Admin2 of institute set");
      } else {
        res.status(404).send("Institute or Admin2 not found");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.post(
  "/makeAdmin3OfInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId, admin3Id } = req.body;
      const institute = await instituteModel.findById(instituteId);
      const admin3 = await userModel.findById(admin3Id);
      if (institute && admin3) {
        institute.admin.admin3 = admin3._id;
        await institute.save();
        res.status(200).send("Admin3 of institute set");
      } else {
        res.status(404).send("Institute or Admin3 not found");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.delete(
  "/removeAdmin1OfInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId } = req.body;
      const institute = await instituteModel.findById(instituteId);
      if (institute) {
        institute.admin.admin1 = null;
        await institute.save();
        res.status(200).send("Admin1 of institute removed");
      } else {
        res.status(404).send("Institute not found");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.delete(
  "/removeAdmin2OfInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId } = req.body;
      const institute = await instituteModel.findById(instituteId);
      if (institute) {
        institute.admin.admin2 = null;
        await institute.save();
        res.status(200).send("Admin2 of institute removed");
      } else {
        res.status(404).send("Institute not found");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.delete(
  "/removeAdmin3OfInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId } = req.body;
      const institute = await instituteModel.findById(instituteId);
      if (institute) {
        institute.admin.admin3 = null;
        await institute.save();
        res.status(200).send("Admin3 of institute removed");
      } else {
        res.status(404).send("Institute not found");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.post(
  "/addDepartmentToInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId, departmentName } = req.body;
      const institute = await instituteModel.findById(instituteId);
      if (institute) {
        const department = new departmentModel({
          name: departmentName,
          institute: institute._id,
        });
        await department.save();
        res.status(200).send("Department added to institute");
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

rootAdminRouter.get(
  "/allUsersByInstitute",
  verifyRootAdmin,
  async (req, res) => {
    try {
      const { instituteId } = req.body;
      const institute = await instituteModel.findById(instituteId);
      if (institute) {
        res = [];
        for (let i = 0; i < institute.users.length; i++) {
          const user = await userModel.findById(institute.users[i]);
          res.push(user);
        }
      } else {
        res.status(404).send("Institute not found");
      }
      res.status(200).json({ users: res });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);
