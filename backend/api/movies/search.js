module.exports = async (req, res, prisma) => {
  const {value} = req.body;

  console.log('search goes on')
  console.log(value);

  const searchedMovies = await prisma.movies.findMany({
    where: {
      name: {
        contains: value
      }
    }
  });

  return {
    data: searchedMovies
  }
}