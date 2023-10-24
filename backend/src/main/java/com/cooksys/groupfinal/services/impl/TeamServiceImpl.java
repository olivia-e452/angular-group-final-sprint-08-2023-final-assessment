package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.Team;
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

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
        // Checks the incoming request body for all required fields.
        if (teamRequestDto.getDescription() == null || teamRequestDto.getName() == null || teamRequestDto.getName().isEmpty()
                || teamRequestDto.getTeammateIds() == null) {
            throw new BadRequestException("Teams must have a name, description and at least 1 member");
        }
        if (teamRequestDto.getUserCredentials() == null) {
            throw new BadRequestException("User credentials are required.");
        }
        if (teamRequestDto.getCompanyId() == null) {
            throw new BadRequestException("Company Id is required.");
        }

        // Checks to see if the requesting user is Authenticated and Authorized.
        Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(teamRequestDto
                .getUserCredentials().getUsername());
        if (optionalUser.isEmpty()) {
            throw new NotFoundException("User with provided username not found.");
        }
        User creatingUser = optionalUser.get();

        // Checking that the company exists.
        Optional<Company> optionalCompany = companyRepository.findById(teamRequestDto.getCompanyId());
        if (optionalCompany.isEmpty()) {
            throw new NotFoundException("Company not found");
        }
        //Check if creating user is part of company they are trying to create a team in.
        Company company = optionalCompany.get();
        if (!creatingUser.getCompanies().contains(company)) {
            throw new NotAuthorizedException("User not authorized to create a team in this company.");
        }

        if (!creatingUser.getCredentials().getPassword().equals(teamRequestDto.getUserCredentials().getPassword())) {
            throw new NotAuthorizedException("Incorrect password.");
        }
        if (!(creatingUser.isAdmin())) {
            throw new NotAuthorizedException("Admin privileges needed to create a team.");
        }

        Team teamToCreate = teamMapper.requestDtoToEntity(teamRequestDto);

        Set<User> usersToAdd = new HashSet<>(userRepository.findAllById(teamRequestDto.getTeammateIds()));
        if (usersToAdd.size() != teamRequestDto.getTeammateIds().size()) {
            throw new BadRequestException("One or more users not found by provided IDs");
        }

        for (User user : usersToAdd) {
            if (!user.isActive()) {
                throw new BadRequestException("Cannot add an inactive user to a team");
            }
        }
        teamToCreate.setTeammates(usersToAdd);
        teamToCreate.setCompany(company);
        teamRepository.saveAndFlush(teamToCreate);

        for (User user : teamToCreate.getTeammates()) {
            user.getCompanies().add(teamToCreate.getCompany());
            user.getTeams().add(teamToCreate);
            userRepository.saveAndFlush(user);
        }
        return teamMapper.entityToDto(teamToCreate);
    }


    @Override
    public TeamDto updateTeam(Long id, TeamRequestDto teamRequestDto) {
        return null;
    }
}
