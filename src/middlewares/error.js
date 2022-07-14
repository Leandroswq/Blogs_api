const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'NotFoundError': return res.status(404).json({ message });
    case 'BadRequestError': return res.status(400).json({ message });
    case 'ConflictError': return res.status(409).json({ message });
    case 'UnauthorizedError': return res.status(401).json({ message });
    default: console.log(name, message); return res.status(500).send();
  }
};

module.exports = errorMiddleware;
