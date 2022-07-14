const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'NotFoundError': return res.status(404).json({ message });
    case 'BadRequestError': return res.status(400).json({ message });
    case 'UnprocessableEntityError': return res.status(422).json({ message });
    default: return res.status(500).send();
  }
};

module.exports = errorMiddleware;
