package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.services.TeamService;
import lombok.RequiredArgsConstructor;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final BasicUserMapper basicUserMapper;

    @Override
    public Set<BasicUserDto> getAllTeamMembers(Long id) {
        Optional<Team> foundTeam = teamRepository.findById(id);

        if(foundTeam.isEmpty()) {
            throw new NotFoundException("this team does not exists");
        }

        return basicUserMapper.entitiesToBasicUserDtos(foundTeam.get().getTeammates());
    }
}
