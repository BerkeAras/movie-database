const jwt = require("jsonwebtoken");
const { validate } = require("../../lib/mainFunctions");

module.exports = async (req, res, prisma) => {
  const {userId} = req.body;

  validate.authToken(req.signedCookies.authToken).orDie();

  const decoded = jwt.verify(req.signedCookies.authToken, process.env.TOKEN_SECRET);

  const user = await prisma.userdata.findUnique({
    where: {
      userId: userId ? userId : decoded._id 
    },
    select: {
      createdAt: true,
      email: userId ? true : false,
      name: true,
      surname: true,
    }
  });

  return {
    return: `${user.name} ${user.surname}`,
    data: user
  }
}