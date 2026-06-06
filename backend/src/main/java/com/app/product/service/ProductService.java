package com.app.product.service;

import com.app.common.dto.PageResponse;
import com.app.product.dto.ProductRequest;
import com.app.product.dto.ProductResponse;
import com.app.product.entity.Product;
import com.app.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public PageResponse<ProductResponse> getAllProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return PageResponse.from(productRepository.findAll(pageable).map(ProductResponse::from));
    }

    public PageResponse<ProductResponse> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return PageResponse.from(productRepository.searchByKeyword(keyword, pageable).map(ProductResponse::from));
    }

    public PageResponse<ProductResponse> getByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return PageResponse.from(productRepository.findByCategory(category, pageable).map(ProductResponse::from));
    }

    public ProductResponse getProductById(Long id) {
        return productRepository.findById(id)
            .map(ProductResponse::from)
            .orElseThrow(() -> new RuntimeException("Product not found: " + id));
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
            .name(request.getName()).description(request.getDescription())
            .price(request.getPrice()).stock(request.getStock())
            .category(request.getCategory()).imageUrl(request.getImageUrl())
            .build();
        return ProductResponse.from(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found: " + id));
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());
        return ProductResponse.from(productRepository.save(product));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) throw new RuntimeException("Product not found: " + id);
        productRepository.deleteById(id);
    }
}