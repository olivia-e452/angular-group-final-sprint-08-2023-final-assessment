package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import java.util.Set;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;

public interface TeamService {
  
  Set<BasicUserDto> getAllTeamMembers(Long id);
  
  TeamDto createTeam(TeamRequestDto teamRequestDto);
  
  TeamDto updateTeam(Long id, TeamRequestDto teamRequestDto);
}
