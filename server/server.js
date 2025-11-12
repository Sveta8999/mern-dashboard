import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", ItemSchema);

app.get("/api/items", async (_req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  const item = await Item.create(req.body);
  res.json(item);
});

app.put("/api/items/:id", async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

app.delete("/api/items/:id", async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  res.json(item);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
