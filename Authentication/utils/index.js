const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.GenerateSalt = async () => {
    const salt = await bcrypt.genSalt(10);
    return salt;
}
module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };
module.exports.HashPassword = async (password, salt) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

module.exports.ComparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports.GenerateSignature = async(payload) => {
    try {
        const token = await jwt.sign(payload, "process.env.JWT_SECRET");
        return token;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

module.exports.VerifySignature = async(token) => {
    try {
        const payload = await jwt.verify(token, "process.env.JWT_SECRET");
        return payload;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}