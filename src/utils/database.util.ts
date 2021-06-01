import mongoose from "mongoose";
          
export const connect = () => {
    return new Promise(async (resolve, reject) => {
        try {
          console.log("[Database] Connecting");
          const db = await mongoose.connect(
            "mongodb+srv://phamhoangnam55:hkOydlE5LMReg7Ty@cluster0.du6yr.mongodb.net/ToDoApp",
            { useNewUrlParser: true, useUnifiedTopology: true }
          );
          console.log("[Database] Connected");
          return resolve(db);
        } catch (error) {
          console.log(error);
          return reject();
        }
      });
};

export const close = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log("[Database] Disconnecting");
      await mongoose.connection.close()
      console.log("[Database] Disonnected");
      return resolve();
    } catch (error) {
      console.log(error);
      return reject();
    }
  });
}
  