//This file will create path to send requests to: /api/feedback
//Here we don't export components
//Instead we should export a function
//Any code included here will never be exposed to the client side. This code is only sever side

import fs from "fs";
import path from "path";
function handler(req, res) {
  //We can chain methods

  //We need to figure out which kind of request is triggering this function. By default all the methods (GET,POST, etc...) will trigger this request
  if (req.method === "POST") {
    //Extract and store the data in the database (in the case of this project in a file)
    const { email, feedback } = req.body; //next js will automatically parse the body of the incoming request
    const newFeedback = {
      email,
      feedback,
      id: new Date().toISOString(),
    }; //we can now store in the database

    //Construct absolute path to the file
    const filePath = path.join(process.cwd(), "data", "feedback.json"); //process.cwd() refers to the current working directory (overall project directory)
    const fileData = fs.readFileSync(filePath); //read the existing data store in the file
    const data = JSON.parse(fileData);
    data.push(newFeedback); //push the incoming data to the data's array
    fs.writeFileSync(filePath, JSON.stringify(data)); // stringify the data and write the file back to the disk

    //Send back a response:
    res.status(201).json({
      message: "Feedbacl stored in the database.",
      feedback: newFeedback,
    });
  } else {
    res.status(200).json({ message: "Hello Kitzy" });
  }
}
export default handler;
