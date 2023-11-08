const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const Minio = require("minio");
const { requireAuth } = require("../middleware/authMiddleware");
const axios = require("axios");
require("dotenv").config();

const minioClient = new Minio.Client({
  endPoint: "minio",
  port: 9000,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
  useSSL: false,
});

const bucketName = "linkedin";
const policy =
`{
  "Version":"2012-10-17",
    "Statement":
    [
      {
        "Effect":"Allow",
        "Principal":{"AWS":["*"]},
        "Action":["s3:GetObject"],
        "Resource":["arn:aws:s3:::${bucketName}/*"]
      }
    ]
}`;

minioClient
  .makeBucket(bucketName, "us-east-1")
  .then(() => {
    minioClient.setBucketPolicy(bucketName, policy, function (err) {
      if (err) return console.log("Error setting bucket policy.", err);
      console.log("Bucket policy set to allow public access.");
    });
  })
  .catch((err) => {
    console.log("Error creating bucket.", err);
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

        const savedPost = await newPost.save();
        console.log("New post saved:", savedPost._id.toString());
        // Notify all other users
        axios.post(
          "http://notificationservice:5656/notification/notifyAllUsers",
          {
            postId: savedPost._id,
            username: username,
          },
          {
            json: true,
          }
        );

        // console.log("New post saved:", savedPost._id);
        return res.send({
          success: true,
          message: "New post successfully created",
        });
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
        async (err, etag) => {
          if (err) {
            console.log("Error uploading image:", err);
            return res.status(500).send("Error uploading the image.");
          }

          console.log("Image uploaded successfully: ", objectName);

          const username = req.user.username;
          const newPost = new Post({
            content: req.body.content,
            image: "http://localhost:9000/linkedin/" + objectName,
            username: username,
          });

          const savedPost = await newPost.save();
          await axios.post(
            "http://notificationservice:5656/notification/notifyAllUsers",
            {
              postId: savedPost._id,
              message: "New post created",
              username: username,
            }
          );
          console.log("New post saved:", savedPost);
          return res.send({
            success: true,
            message: "New post successfully created",
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

router.get("/viewPost/single", async (req, res) => {
  console.log("ekhane ashse");

  const postId = req.query.postId;
  try {
    // Find the post with the given postId
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
});

module.exports = router;
