package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;

import java.util.Set;

public interface TeamService {

    Set<BasicUserDto> getAllTeamMembers(Long id);
}
