package com.cafe.dto;

public class RegisterUserDto {
    private String email;
    
    private String password;

	public RegisterUserDto setPassword(String password) {
		this.password = password;
        return this;
	}
     
	public RegisterUserDto setEmail(String email) {
		this.email = email;
        return this;
	}

    public String getPassword() {
		return password;
	}

    public String getEmail() {
		return email;
	}
 
    
}
