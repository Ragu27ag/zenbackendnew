import client from "./db-client.js";

const getAllEntity = async (name) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({})
    .toArray();
};

const getAllEntityEmail = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({ email: obj })
    .toArray();
};

const getAllEntityType = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({ type: obj })
    .toArray();
};

const getAllEntityEmail1 = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .find({ email: obj.email, type: obj.type })
    .toArray();
};

const getOneEntity = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .findOne({ email: obj }, { _id: 0 });
};

const createEntity = async (name, obj) => {
  return await client.db("zenstudentdashboard").collection(name).insertOne(obj);
};

const editEntity = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, type: obj.type, title: obj.title },
      {
        $set: {
          marks: obj.marks,
          comments: obj.comments,
          evaluated: obj.evaluated,
        },
      }
    );
};

const editEntityLeave = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, date: obj.date, reason: obj.reason },
      {
        $set: {
          approval: obj.approval,
        },
      }
    );
};

const editEntityQuery = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email, quesId: obj.QuesId },
      {
        $push: {
          approval: obj.approval,
        },
      }
    );
};

const editEntityPortFolio = async (name, obj) => {
  return await client
    .db("zenstudentdashboard")
    .collection(name)
    .updateOne(
      { email: obj.email },
      {
        $set: {
          comments: obj.comments,
          evaluated: obj.evaluated,
          reviewedby: obj.reviewedby,
        },
      }
    );
};

export {
  getAllEntity,
  createEntity,
  getOneEntity,
  getAllEntityEmail,
  editEntity,
  getAllEntityEmail1,
  getAllEntityType,
  editEntityLeave,
  editEntityQuery,
  editEntityPortFolio,
};
