package com.cafe.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cafe.entity.Category;
import com.cafe.entity.Product;
import com.cafe.repository.CategoryRepository;
import com.cafe.repository.CategoryServiceRepository;
import com.cafe.repository.ProductRepository;


@Service
@Transactional
public class CategoryService implements CategoryServiceRepository {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    // Admin: Add Category
    @Override
    public void addCategory(Category category) {
        categoryRepository.save(category);
    }

    // Cafe: Get all Categories
    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Cafe: Get Category by ID
    @Override
    public Category getCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    // Cafe: Add Product to Category
    @Override
    public void addProductToCategory(int categoryId, Product product) {
        Category category = getCategoryById(categoryId);
        if (category != null) {
            product.setCategory(category);
            productRepository.save(product);
        } else {
            // Handle the case where the category with the given ID doesn't exist.
            // You may throw an exception or handle it according to your business logic.
        }
    }
    
    public List<Category> fetchAll() {
        return categoryRepository.findAll();
    }

    public List<Product> getProductsByCategoryId(int categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        
        if (categoryOptional.isPresent()) {
            return categoryOptional.get().getProducts();
        } else {
            return null; // or handle differently based on your application logic
        }
    }
}
