package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
	
	private final AnnouncementMapper announcementMapper;
	private final AnnouncementRepository announcementRepository;
	
	private final CredentialsMapper credentialsMapper;
	
	private final UserRepository userRepository;
	
	@Override
	public AnnouncementDto addAnnouncement(AnnouncementRequestDto announcementRequestDto) {
		//check if title is provided in dto
        if(announcementRequestDto.getTitle() == null) {
        	throw new BadRequestException("provided title is null");
        }
		
        //check if message is provided in dto
        if(announcementRequestDto.getMessage() == null) {
        	throw new BadRequestException("provided message is null");
        }
        
		//check if credentials are provided in dto
        if(announcementRequestDto.getAuthor().getCredentials() == null) {
        	throw new BadRequestException("provided credentials are null");
        }
        
        //check if profile was provided in Dto
        if(announcementRequestDto.getAuthor().getProfile() == null) {
        	throw new BadRequestException("provided profile is null");
        }
        
		//verify author credentials
		Credentials credentials = credentialsMapper.dtoToEntity(announcementRequestDto.getAuthor().getCredentials());
        
		//check if user exists in DB with provided username
		Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(credentials.getUsername());
		if(optionalUser.get() == null) {
			throw new BadRequestException("user with propvided credentials not found");
		}
		User user = optionalUser.get();
		
		//check if password matches
		if(!(credentials.getPassword().equals(user.getCredentials().getPassword()))) {
			throw new BadRequestException("incorrect password provided for user");
		}
		
		//convert dto to entity and set values before saving new announcement
		Announcement newAnnouncement = announcementMapper.requestDtoToEntity(announcementRequestDto);
		newAnnouncement.setAuthor(user);
		
		if (user.isAdmin()) {
			//find out which company id they are currently logged in with
			//picking first company id for now.
			newAnnouncement.setCompany(user.getCompanies().iterator().next());
			
		} else {
			if(user.getCompanies().isEmpty()) {
				throw new BadRequestException("user is not assigned to any companies. cannot post announcement");
			}
			newAnnouncement.setCompany(user.getCompanies().iterator().next());
		}
		
		//save announcement to repository and return dto
		return announcementMapper.entityToDto(announcementRepository.saveAndFlush(newAnnouncement));
		
	}

}