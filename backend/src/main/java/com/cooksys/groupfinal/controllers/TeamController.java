package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import org.springframework.web.bind.annotation.*;
import com.cooksys.groupfinal.services.TeamService;
import lombok.RequiredArgsConstructor;
import java.util.Set;

@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public TeamDto createTeam(@RequestBody TeamRequestDto teamRequestDto) {
        return teamService.createTeam(teamRequestDto);
    }

    @PatchMapping("/{teamId}")
    public TeamDto editTeamByTeamId(@PathVariable Long teamId, @RequestBody TeamRequestDto teamRequestDto) {
        return teamService.editTeamByTeamId(teamId, teamRequestDto);
    }

	@GetMapping("/{id}/users")
	public Set<BasicUserDto> getAllTeamMembers(@PathVariable Long id) {
		return teamService.getAllTeamMembers(id);
	}

    @GetMapping("/{id}")
    public TeamDto getTeamInformation(@PathVariable Long id) {
        return teamService.getTeamInfo(id);
    }
}
