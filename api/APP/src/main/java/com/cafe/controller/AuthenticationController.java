package com.cafe.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cafe.entity.Customer;
import com.cafe.repository.CustomerRepository;
import com.cafe.services.JwtService;
import com.cafe.services.AuthenticationService;
import com.cafe.Responses.LoginResponse;
import com.cafe.dto.RegisterUserDto;
import com.cafe.dto.LoginUserDto;

import java.util.Optional;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    @Autowired
    private CustomerRepository customerRepo;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }
    @PostMapping("/signup")
    public ResponseEntity<Customer> register(@RequestBody RegisterUserDto entity) {
        //TODO: process POST request
        Optional<Customer>customer=customerRepo.findByEmail(entity.getEmail());
        if(customer.isPresent()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else{
            try{
                Customer registeredCustomer=authenticationService.signup(entity);
                System.out.println(registeredCustomer);
                return new ResponseEntity<>(registeredCustomer,HttpStatus.OK);

            }catch(Exception e){

            }
        }
        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto entity) {
       Customer authenticatedCustomer=authenticationService.authenticate(entity);
       String jwtToken = jwtService.generateToken(authenticatedCustomer);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);


    }
    
    

    
}
