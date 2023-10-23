package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.services.TeamService;
import lombok.RequiredArgsConstructor;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamMapper teamMapper;
    private final TeamRepository teamRepository;

    @Override
    public TeamDto getAllTeamMembers(Long id) {
        Optional<Team> foundTeam = teamRepository.findById(id);

        if(foundTeam.isEmpty()) {
            throw new NotFoundException("this team does not exists");
        }

        return teamMapper.entityToDto(foundTeam.get());
    }
}
