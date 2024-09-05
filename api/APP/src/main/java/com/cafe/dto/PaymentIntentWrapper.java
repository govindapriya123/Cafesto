package com.cafe.dto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stripe.model.PaymentIntent;
import com.stripe.net.StripeResponse;

public class PaymentIntentWrapper {
    private final PaymentIntent paymentIntent;

    public PaymentIntentWrapper(PaymentIntent paymentIntent) {
        this.paymentIntent = paymentIntent;
    }

    @JsonIgnore
    public StripeResponse getLastResponse() {
        return paymentIntent.getLastResponse();
    }

    public String getId() {
        return paymentIntent.getId();
    }

    public String getStatus() {
        return paymentIntent.getStatus();
    }

    // Add other getter methods as needed to expose properties of PaymentIntent
}