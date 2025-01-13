const errorHandler = (err, res) => {
  console.error("wwwwwwwwwwwwwwwww  ",err.stack);

  if (err.name === 'ValidationError') {
    console.log("hittttt");
    
    res.status(400).json({ message: err.message });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    console.log("gytttt");
    
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


export default errorHandler;