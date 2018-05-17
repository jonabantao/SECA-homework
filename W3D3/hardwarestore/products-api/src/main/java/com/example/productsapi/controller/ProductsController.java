package com.example.productsapi.controller;

import com.example.productsapi.model.Product;
import com.example.productsapi.repository.ProductsRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RestController
public class ProductsController {

    @Autowired
    private ProductsRepository productRepository;

    @GetMapping("/products")
    public Iterable<Product> findAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{productId}")
    public Product findProductById(@PathVariable Long productId) throws NotFoundException {

        Optional<Product> foundProduct = productRepository.findById(productId);

        if (!foundProduct.isPresent()) {
            throw new NotFoundException("Product with ID of " + productId + " was not found!");
        }

        return foundProduct.get();
    }

    @PostMapping("/products")
    public Product createNewProduct(@RequestBody Product newProduct) {
        return productRepository.save(newProduct);
    }

    @DeleteMapping("/products/{productId}")
    public HttpStatus deleteProductById(@PathVariable Long productId) throws EmptyResultDataAccessException {

        productRepository.deleteById(productId);
        return HttpStatus.OK;
    }

    @PatchMapping("/products/{productId}")
    public Product updateProductById(@PathVariable Long productId, @RequestBody Product productRequest) throws NotFoundException {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        Product productFromDb;

        if (!optionalProduct.isPresent()) {
            throw new NotFoundException("Product with ID of " + productId + " was not found!");
        }

        productFromDb = optionalProduct.get();

        productFromDb.setName(productRequest.getName());
        productFromDb.setDescription(productRequest.getDescription());
        productFromDb.setPrice(productRequest.getPrice());

        return productRepository.save(productFromDb);
    }

    // EXCEPTION HANDLERS

    @ExceptionHandler
    void handleProductNotFound(
            NotFoundException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler
    void handleDeleteNotFoundException(
            EmptyResultDataAccessException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value());
    }
}
