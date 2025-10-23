import multer from 'multer';

// Use memoryStorage to keep the file as a buffer in req.file.buffer
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });