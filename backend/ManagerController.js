const Manager = require('../models/manager');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};
const upload = multer({ storage, fileFilter })

module.exports={
    addManager: async (req, res)=>{
        try {
            const { firstName, lastName, email, password } = req.body;
            if (!req.file) {
              return res.status(400).json({ error: 'No image provided' });
            }
            const newManager = await Manager.create({
              firstName,
              lastName,
              email,
              password,
              image: req.file.filename
            });
      
            res.status(201).json({ message: 'Manager added successfully',  newManager });
          } catch (error) {
            console.error('Error adding manager:', error);
            res.status(500).json({ error: 'An error occurred while adding the manager' });
          }
  }
}

