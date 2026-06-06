package com.app.product.dto;

import com.app.product.entity.Product;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String category;
    private String imageUrl;
    private LocalDateTime createdAt;

    public static ProductResponse from(Product p) {
        return ProductResponse.builder()
            .id(p.getId()).name(p.getName()).description(p.getDescription())
            .price(p.getPrice()).stock(p.getStock()).category(p.getCategory())
            .imageUrl(p.getImageUrl()).createdAt(p.getCreatedAt()).build();
    }
}