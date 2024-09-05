package com.cafe.controller;

import com.cafe.dto.PaymentIntentWrapper;
import com.cafe.entity.Customer;
import com.cafe.entity.Order;
import com.cafe.repository.OrderRepository;
import com.cafe.services.CustomerService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.RequestOptions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "https://r.stripe.com/b")
@RestController
@RequestMapping("/api/payment")
// public class PaymentController {
// @Value("${stripe.api.key}")
// private String stripeApiKey;
// private final OrderRepository orderRepository;

// // Constructor injection
// public PaymentController(OrderRepository orderRepository) {
// this.orderRepository = orderRepository;
// }

// @PostMapping
// public Map<String, Object> createPaymentIntent(@RequestBody Map<String,
// Object> request) {
// RequestOptions requestOptions =
// RequestOptions.builder().setApiKey(stripeApiKey).build();
// Map<String, Object> response = new HashMap<>();

// try {
// if (request.containsKey("amount") && request.get("amount") != null &&
// request.containsKey("currency") && request.get("currency") != null &&
// request.containsKey("paymentMethodId") && request.get("paymentMethodId") !=
// null) {
// // System.out.println("amount in x"+request.get("amount").toString());
// long amount = Long.parseLong(request.get("amount").toString()); // Convert to
// long
// String currency = request.get("currency").toString();
// String paymentMethodId = request.get("paymentMethodId").toString();
// System.out.println("amount"+amount);
// String email = request.get("email").toString();
// String address = request.get("address").toString();
// String city = request.get("city").toString();
// String country = request.get("country").toString();
// String zipCode = request.get("zipCode").toString();
// Map<String, Object> params = new HashMap<>();
// params.put("amount", amount*100);
// params.put("currency",currency);
// params.put("payment_method", paymentMethodId);
// params.put("confirmation_method", "manual");
// params.put("confirm", true);

// Order order = new Order();
// order.setCustomerEmail(email);
// order.setDeliveryAddress(address);
// order.setCity(city);
// order.setCountry(country);
// order.setZipCode(zipCode);
// order.setTotalAmount(amount);
// order.setStatus("pending"); // Initially set status to pending

// orderRepository.save(order);

// PaymentIntent paymentIntent = PaymentIntent.create(params, requestOptions);

// response.put("success", true);
// response.put("paymentIntent", new PaymentIntentWrapper(paymentIntent));
// response.put("orderId", order.getId());
// } else {
// response.put("success", false);
// response.put("error", "Missing required fields.");
// }
// } catch (StripeException e) {
// response.put("success", false);
// response.put("error", e.getMessage());
// } catch (NumberFormatException e) {
// response.put("success", false);
// response.put("error", "Invalid amount format.");
// }

// return response;
// }

// }

public class PaymentController {
  @Value("${stripe.api.key}")
  private String stripeApiKey;

  @Autowired
    private OrderRepository orderRepository;

  @Autowired
    private CustomerService customerService;

  @PostMapping
  public Map<String, Object> createPaymentIntent(@RequestBody Map<String, Object> request) {
    RequestOptions requestOptions = RequestOptions.builder().setApiKey(stripeApiKey).build();
    Map<String, Object> response = new HashMap<>();

    System.out.println("Received request: " + request);
    try {
      // Validate required fields
      if (request.containsKey("amount") && request.get("amount") != null &&
          request.containsKey("currency") && request.get("currency") != null &&
          request.containsKey("paymentMethodId") && request.get("paymentMethodId") != null) {
  
          // Extract and parse values
          long amount = Long.parseLong(request.get("amount").toString());
          String currency = request.get("currency").toString();
          String paymentMethodId = request.get("paymentMethodId").toString();
  
          // Create payment intent
          Map<String, Object> params = new HashMap<>();
          params.put("amount", amount * 100);  // Stripe accepts amounts in cents
          params.put("currency", currency);
          params.put("payment_method", paymentMethodId);
          params.put("confirmation_method", "manual");
          params.put("confirm", true);
  
          PaymentIntent paymentIntent = PaymentIntent.create(params, requestOptions);
  
          // Validate and process optional order details
          if (request.containsKey("orderDetails") && request.get("orderDetails") != null) {
            Map<String, Object> orderDetails = (Map<String, Object>) request.get("orderDetails");

            // Extract individual fields from orderDetails
            String email = orderDetails.get("email").toString();
            String address = orderDetails.get("address").toString();
            String city = orderDetails.get("city").toString();
            String country = orderDetails.get("country").toString();
            String zipCode = orderDetails.get("zip").toString();
              Order order = new Order();
              order.setCity(city);
              order.setCountry(country);
              order.setCustomerEmail(email);
              order.setDeliveryAddress(address);
              order.setStatus("pending");
              order.setTotalAmount(amount);
              order.setZipCode(zipCode);
              Customer customer = customerService.getCustomerByEmail(email);
              System.out.println("Customer ID: " + (customer != null ? customer.getId() : "null"));
              order.setCustomer(customer);
              System.out.println("Order: " + order);
  
              orderRepository.save(order);
  
              response.put("orderStatus", "Order added successfully");
          } else {
              response.put("orderStatus", "Order addition failed: Missing order details");
          }
  
          response.put("success", true);
          response.put("paymentIntent", paymentIntent);
      } else {
          response.put("success", false);
          response.put("error", "Missing required payment fields.");
      }
  } catch (StripeException e) {
      response.put("success", false);
      System.out.println("Stripe error: " + e.getMessage());
      response.put("error", e.getMessage());
  } catch (NumberFormatException e) {
      response.put("success", false);
      response.put("error", "Invalid amount format.");
  }
  
    System.out.println("-response--"+response);
    return response;
  }
}
