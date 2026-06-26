import Destination from '../models/Destination.js';

export const getDestinations = async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = featured ? { featured: true } : {};
    const destinations = await Destination.find(filter).sort('-createdAt');
    res.json({ success: true, count: destinations.length, data: destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }
    const destination = await Destination.create({
      ...req.body,
      image: { url: req.file.path, public_id: req.file.filename },
    });
    res.status(201).json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.image = { url: req.file.path, public_id: req.file.filename };
    }
    const destination = await Destination.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
