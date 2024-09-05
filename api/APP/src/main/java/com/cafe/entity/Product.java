package com.cafe.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="product")
public class Product implements java.io.Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int productId; 
	@Column(name = "name", nullable = false)
	private String name;
	@Column(name = "price", nullable = false)
	private double price;
	@Column(name = "description")
	private String description;
	@Column(name = "stock_quantity", columnDefinition = "INT DEFAULT 0")
	private int stockQuantity;
	@Column(name = "is_active", columnDefinition = "BOOLEAN DEFAULT TRUE")
	private boolean isActive;
	@Column(name="vg_ng")
	private String vg_ng;
	@Column(name="dietary_preferences")
	private String dietaryPreferences;
	@Column(name="cuisine_type")
	private String cuisineType;
	@Column(name="price_range")
	private String priceRange;
	@Column(name="rating")
	private int rating;
	@Column(name="in_stock")
	private boolean inStock;
	@Column(name="preparation_time")
	private int preparationTime;
	@Column(name="allergens")
	private String allergens;
	@Column(name="popular_item")
	private boolean popularItem;
	@Column(name="new_arrival")
    private boolean newArrival;
	@ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
	private Category category;
	@Column(name="image_url")
	private String imageUrl;
	@Column(name="special_offers")
	private String specialOffers;
	@Column(name = "serving_size")
    private String servingSize;
    @Column(name = "spiciness_level")
    private String spicinessLevel;



	
//	@OneToMany
//	@JoinColumn(name="OrderItemID")
//	private OrderItem orderitem;
public String getVg_ng() {
	return vg_ng;
}

public void setVg_ng(String vg_ng) {
	this.vg_ng =vg_ng;
}
	
public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

public String getDietaryPreferences() {
	return dietaryPreferences;
}

public void setDietaryPreferences(String dietaryPreferences) {
	this.dietaryPreferences = dietaryPreferences;
}

public String getAllergens() {
	return allergens;
}

public void setAllergens(String allergens) {
	this.allergens = allergens;
}
	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public double getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category i) {
		this.category = i;
	}	
    
	public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
        System.out.println("Stock quantity set to: " + stockQuantity); 
    }
    public int getPreparationTime() {
        return preparationTime;
    }

    public void setPreparationTime(int preparationTime) {
        this.preparationTime = preparationTime;
    }

    public String  getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
       this.isActive = active;
    }
    public boolean getPopularItem() {
        return popularItem ;
    }

    public void setPopularItem(boolean popularItem) {
       this.popularItem = popularItem;
    }
    public boolean getNewArrival() {
        return newArrival ;
    }

    public void setNewArrival(boolean newArrival) {
       this.newArrival = newArrival;
    }
    public Boolean getInStock() {
        return inStock;
    }

    public void setInStock(boolean inStock) {
       this.inStock = inStock;
    }
    public String  getCuisineType() {
    	return cuisineType;
    }
    public void setCuisineType(String cuisineType) {
    	this.cuisineType=cuisineType;
    }
    
    public String  getPriceRange() {
    	return priceRange;
    }
    public void setPriceRange(String priceRange) {
    	this.priceRange=priceRange;
    }
    public String  getSpicyLevel() {
    	return spicinessLevel;
    }
    public void setSpicyLevel(String spicinessLevel) {
		System.out.println("Setting spiciness level to: " + spicinessLevel);
    	this.spicinessLevel=spicinessLevel;
    }
    
    public String  getServngSize() {
    	return servingSize ;
    }
    public void setServingSize(String servingSize) {
		System.out.println("Setting serving size to: " + servingSize);
    	this.servingSize=servingSize;
    }
    
    public String  getSpecialOffers() {
    	return specialOffers ;
    }
    public void setSpecialOffers(String specialOffers) {
    	this.specialOffers=specialOffers;
    }
}