package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProfileDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final BasicUserMapper basicUserMapper;
	private final CredentialsMapper credentialsMapper;
	private final ProfileMapper profileMapper;
	
	private final CompanyRepository companyRepository;
	
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	private boolean validateUsername(String username) {
        Optional<User> user = userRepository.findByCredentialsUsername(username);
        if (user.isEmpty()) {
            return false;
        }
        return true;
	}
	
	private boolean validateCredentials(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        return true;
	}
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (!validateCredentials(credentialsDto)) {
			return null;
		}
        User userToValidate = findUser(credentialsDto.getUsername());
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

	@Override
	public FullUserDto getUser(String username) {
		return fullUserMapper.entityToFullUserDto(findUser(username));
	}

	@Override
	public boolean validateUserCredentials(CredentialsDto credentialsDto) {
		return validateCredentials(credentialsDto);
	}

	@Override
	public FullUserDto createUser(UserRequestDto userRequestDto) {
		if (userRequestDto.getCredentials() == null || userRequestDto.getCredentials().getUsername() == null || userRequestDto.getCredentials().getPassword()== null) {
			throw new BadRequestException("A username and password are required.");
		}
		if (validateUsername(userRequestDto.getCredentials().getUsername())) {
			throw new BadRequestException("A user with this username already exists.");
		}
		User newUser = basicUserMapper.requestDtoToEntity(userRequestDto);
		newUser.setActive(true);
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(newUser));
	}

	@Override
	public FullUserDto editUserProfile(String username, ProfileDto profileDto) {
		User user = findUser(username);
		user.setProfile(profileMapper.dtoToEntity(profileDto));
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
	}

	@Override
	public FullUserDto editUserCredentials(String username, CredentialsDto credentialsDto) {
		User user = findUser(username);
		user.setCredentials(credentialsMapper.dtoToEntity(credentialsDto));
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
	}

	@Override
	public FullUserDto addUserCompanies(String username, ArrayList<Long> companyIds) {
		User user = findUser(username);
		ArrayList<Company> companies = new ArrayList<Company>();
		for (int i = 0; i < companyIds.size(); i++) {
			Optional<Company> c = companyRepository.findById(companyIds.get(i));
			if (c.isEmpty()) {
				throw new BadRequestException("No company with the id " + companyIds.get(i) + " exists.");
			}
			companies.add(c.get());
		}
		user.getCompanies().addAll(companies);
		return fullUserMapper.entityToFullUserDto(userRepository.saveAndFlush(user));
	}
}
