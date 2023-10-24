package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;
    private final CredentialsMapper credentialsMapper;
    private final CompanyRepository companyRepository;
    private final BasicUserMapper basicUserMapper;
    private final UserRepository userRepository;

    @Override
    public TeamDto createTeam(TeamRequestDto teamRequestDto) {
        if (teamRequestDto.getDescription() == null || teamRequestDto.getName() == null
                || teamRequestDto.getTeammateIds() == null) {
            throw new BadRequestException("Teams must have a name, description and at least 1 member");
        }


        Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(teamRequestDto
                .getUserCredentials().getUsername());
        if (optionalUser.isEmpty()) {
            throw new NotFoundException("User with provided username not found.");
        }
        User user = optionalUser.get();
        basicUserMapper.entityToBasicUserDto(user);

        if (!user.getCredentials().getPassword().equals(teamRequestDto.getUserCredentials().getPassword())) {
            throw new NotAuthorizedException("Incorrect password.");
        }
        if (!(user.isAdmin())) {
            throw new NotAuthorizedException("Admin privileges needed to create a team.");
        }
        return null;







    }


    @Override
    public TeamDto updateTeam(Long id, TeamRequestDto teamRequestDto) {
        return null;
    }
}
