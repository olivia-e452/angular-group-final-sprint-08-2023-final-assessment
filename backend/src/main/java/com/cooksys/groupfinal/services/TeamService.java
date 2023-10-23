package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.TeamDto;

public interface TeamService {

    TeamDto getAllTeamMembers(Long id);
}
