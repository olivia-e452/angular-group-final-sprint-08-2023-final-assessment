package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/login")
	@CrossOrigin(origins="*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }
	
	@GetMapping("/{username}")
	public FullUserDto getUser(@PathVariable String username) {
		return userService.getUser(username);
	}
	
	@GetMapping("/validate")
	public boolean validateUserCredentials(@RequestBody CredentialsDto credentialsDto) {
		return userService.validateUserCredentials(credentialsDto);
	}
	
	@PostMapping("/new")
	public FullUserDto createUser(@RequestBody UserRequestDto userRequestDto) {
		return userService.createUser(userRequestDto);
	}
	
	@PatchMapping("/{username}/profile")
	public FullUserDto editUserProfile(@PathVariable String username, @RequestBody ProfileDto profileDto) {
		return userService.editUserProfile(username, profileDto);
	}
	
	@PatchMapping("/{username}/credentials")
	public FullUserDto editUserCredentials(@PathVariable String username, @RequestBody CredentialsDto credentialsDto) {
		return userService.editUserCredentials(username, credentialsDto);
	}
	
	@PatchMapping("/{username}/admin/{adminStatus}")
	public FullUserDto editUserAdmin(@PathVariable String username, @PathVariable boolean adminStatus) {
		return userService.editUserAdmin(username, adminStatus);
	}
	
	@PatchMapping("/{username}/active/{activeStatus}")
	public FullUserDto editUserActive(@PathVariable String username, @PathVariable boolean activeStatus) {
		return userService.editUserActive(username, activeStatus);
	}
}
