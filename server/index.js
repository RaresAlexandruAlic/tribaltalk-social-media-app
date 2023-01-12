import { posts, users } from "./mockdata/index.js";

import Post from "./models/Post.js";
import User from "./models/User.js";
import authRoutes from "./routes/authenticate.js";
import bodyParser from "body-parser"
import cors from "cors"
import { createPost } from "./controllers/postsController.js"
import dotenv from "dotenv"
import express from "express"
import { fileURLToPath } from "url"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import multer from "multer"
import path from "path"
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/authenticationController.js"
import userRoutes from "./routes/users.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* STORAGE */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

/* ROUTES WITH FILES */
app.use("/authenticate/register", upload.single("picture"), register);
app.use("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/authenticate", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    //Uncomment and run this only once for demo data to load
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`The connection could not be established.\n[ERROR]: ${error}`));