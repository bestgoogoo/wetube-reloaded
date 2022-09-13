import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

// 니콜라스는 이렇게 mongoose.connect()에 variable을 넣어줬음. 나는 상관없는 듯...
// mongoose.connect("mongodb://127.0.0.1:27017/wetube", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("🚫 DB Error", error);
db.on("error", handleError);
db.once("open", handleOpen);
