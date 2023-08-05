const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const Minio = require("minio");
const { requireAuth } = require("../middleware/authMiddleware");

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "U9U4pxLvvyTQNMm3Pcib",
  secretKey: "0XaN5gnJ7wUnpSgn3Fw2b6i6xwP4eHS1QR4FJLrX",
});

const upload = multer({ dest: "uploads/" });

router.post(
  "/createPost",
  requireAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Create Post Request Data:", req.body);

      // Check if image was provided
      if (!req.file) {
        // Create post without image
        const username = req.user.username;
        const newPost = new Post({
          content: req.body.content,
          username: username,
        });

        newPost
          .save()
          .then((savedPost) => {
            console.log("New post saved:", savedPost);
            return res.send({
              success: true,
              message: "New post successfully created",
            });
          })
          .catch((err) => {
            console.log("Error creating post:", err);
            return res.send({ message: "Couldn't create Post!" });
          });

        return;
      }

      // Image was provided, proceed with processing
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
            console.log("Error uploading image:", err);
            return res.status(500).send("Error uploading the image.");
          }

          console.log("Image uploaded successfully: ", objectName);

          const username = req.user.username;
          const newPost = new Post({
            content: req.body.content,
            image: req.file.path,
            username: username,
          });

          newPost
            .save()
            .then((savedPost) => {
              console.log("New post saved:", savedPost);
              return res.send({
                success: true,
                message: "New post successfully created",
              });
            })
            .catch((err) => {
              console.log("Error creating post:", err);
              return res.send({ message: "Couldn't create Post!" });
            });
        }
      );
    } catch (err) {
      console.log("Error creating post:", err);
      return res.send({ message: "Couldn't create Post!" });
    }
  }
);

router.get("/viewPost", async (req, res) => {
  // Find the latest posts of all users
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
