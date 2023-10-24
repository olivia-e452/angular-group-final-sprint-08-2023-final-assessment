package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;

	@PostMapping
	public TeamDto createTeam(@RequestBody TeamRequestDto teamRequestDto){
		return teamService.createTeam(teamRequestDto);
	}

	@PatchMapping("/update/{id}")
	public TeamDto updateTeam(@PathVariable Long id, @RequestBody TeamRequestDto teamRequestDto){
		return teamService.updateTeam(id, teamRequestDto);
	}

}
