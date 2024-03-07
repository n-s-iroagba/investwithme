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
  },
  getAllManagers :async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const managers = await Manager.find();
      res.json(managers);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  UpdateManager: async (req,res) => {
    const id = req.params.id
    try{
      const manager = Manager.findByPk(id)
      res.status(201).json({ message: 'Manager updated successfully',  newManager });
    }catch(error){
      console.error('Error updating manager:', error);
            res.status(500).json({ error: 'An error occurred while adding the manager' });
    }
  },
  deleteManager:async (req, res) => {
    const id = req.params.id;   
    try {
      const deletedManager = await Manager.destroy({
        where: { id: id }
      });
      if (deletedManager) {
        res.status(200).send('Manager deleted successfully.');
      } else {
        res.status(404).send('Manager not found.');
      }
    } catch (error) {
      res.status(500).send('Error deleting manager: ' + error.message);
    }
  }
}

