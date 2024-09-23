const express = require('express');
const multer = require('multer');
const path = require('path');

// Tạo ứng dụng Express
const app = express();

// Cấu hình Multer để lưu trữ tệp tải lên
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Thư mục đích lưu tệp
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Tên tệp sẽ được lưu trữ (sử dụng tên gốc của tệp)
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Tạo một middleware multer với cấu hình lưu trữ
const upload = multer({ storage: storage });

// Tạo thư mục `uploads` nếu nó chưa tồn tại
const fs = require('fs');
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Endpoint để tải tệp lên
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Trả về phản hồi khi tệp đã được tải lên thành công
    res.send(`File uploaded successfully: ${req.file.filename}`);
  } catch (err) {
    res.status(400).send('Error uploading file.');
  }
});

// Route đơn giản để hiển thị form tải tệp lên
app.get('/', (req, res) => {
  res.send(`
    <h2>Upload File</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

// Chạy ứng dụng trên cổng 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
