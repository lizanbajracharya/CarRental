import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// @desc     Create new category
// @route    POST api/categories
// @access   private
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = new Category({
    name,
  });

  const createCategory = await category.save();
  res.status(201).json(createCategory);
});

// @desc     GET all categories
// @route    GET api/categories
// @access   Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.json(categories);
});

// @desc     Get categories by id
// @route    GET api/categories/:id
// @access   Private/Admin
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc     delete category
// @route    DELETE api/category/:id
// @access   Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category Removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export { addCategory, getCategories, getCategoryById, deleteCategory };
