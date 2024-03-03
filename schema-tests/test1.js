const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "string",
  minLength: 10
}

const data = 'alex1111111111'

const validate = ajv.compile(schema)
const valid = validate(data)
if (!valid) console.log(validate.errors)