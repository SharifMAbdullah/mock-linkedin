const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const Minio = require("minio");
const { requireAuth } = require("../middleware/authMiddleware");

//////
// Set up MinIO client
const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "U9U4pxLvvyTQNMm3Pcib",
  secretKey: "0XaN5gnJ7wUnpSgn3Fw2b6i6xwP4eHS1QR4FJLrX",
});

// Multer middleware to handle the file upload
const upload = multer({ dest: "uploads/" });

// Serve the HTML file with the image upload form
router.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle the image upload and store it on MinIO
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file found.");
  }

  const filePath = req.file.path;
  const metaData = {
    "Content-Type": req.file.mimetype,
  };

  const bucketName = "linkedin";
  const objectName = req.file.originalname;

  minioClient.fPutObject(
    bucketName,
    objectName,
    filePath,
    metaData,
    (err, etag) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error uploading the image.");
      }

      console.log("Image uploaded successfully: " + objectName);
      return res.status(200).send("Image uploaded successfully.");
    }
  );
});
//////
//create a new post
router.post("/createPost", requireAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newPost = new Post({
      content: req.body.content,
      image: req.body.image,
    });
    const savedPost = await newPost.save();

    res.send({
      success: true,
      message: "New post successsfully created",
    });
  }
  catch (err) {
    console.log(err);
    res.send({ message: "Couldn't create Post!", error: err });
  }
  //res.json(newPost);
});

router.get("/viewPost", async (req, res) => {
  //find latest post of all users
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
