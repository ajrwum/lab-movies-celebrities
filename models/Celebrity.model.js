//  Add your code here
// loading necessary stuff form mongoose
const { Schema, model } = require('mongoose');

// creating the schema
const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

// defining the model
const Celebrity = model("celebritie", celebritySchema);

// exporting to enable access from anywhere
module.exports = Celebrity;
