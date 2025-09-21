import mongoose from "mongoose";
import Sweet, { ISweet } from "./models/Sweet"; 

const sweets: ISweet[] = [
  {
    name: "Gulab Jamun",
    category: "Indian Sweets",
    price: 50,
    quantity: 100,
    description: "Soft, syrupy Indian dessert made of milk solids.",
  },
  {
    name: "Rasgulla",
    category: "Indian Sweets",
    price: 45,
    quantity: 80,
    description: "Spongy round sweet made from chhena and soaked in sugar syrup.",
  },
  {
    name: "Chocolate Cake",
    category: "Cakes",
    price: 600,
    quantity: 20,
    description: "Rich and moist chocolate cake topped with ganache.",
  },
  {
    name: "Ladoo",
    category: "Indian Sweets",
    price: 30,
    quantity: 150,
    description: "Sweet round balls made of flour, sugar, and ghee.",
  },
  {
    name: "Macaron",
    category: "Bakery",
    price: 120,
    quantity: 50,
    description: "French meringue-based cookie with a soft filling.",
  },
  {
    name: "Jalebi",
    category: "Indian Sweets",
    price: 25,
    quantity: 200,
    description: "Crispy, syrupy spirals made of deep-fried batter.",
  },
  {
    name: "Red Velvet Cake",
    category: "Cakes",
    price: 650,
    quantity: 15,
    description: "Moist cake with a deep red color and cream cheese frosting.",
  },
  {
    name: "Kaju Katli",
    category: "Indian Sweets",
    price: 80,
    quantity: 70,
    description: "Cashew nut fudge cut into diamond shapes.",
  },
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "";
    await mongoose.connect(uri);
    console.log("MongoDB connected");

    await Sweet.deleteMany({}); 
    await Sweet.insertMany(sweets);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
};

seedDB();
