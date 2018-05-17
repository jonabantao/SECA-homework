package com.example.productsapi.repository;

import com.example.productsapi.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductsRepository extends CrudRepository<Product, Long> {
}
