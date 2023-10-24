package com.cooksys.groupfinal.dtos;

import java.util.Set;

import com.cooksys.groupfinal.entities.Team;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TeamRequestDto {

    private String name;

    private String description;

    private Set<Long> teammateIds;

    private BasicUserDto requestingUser;

    private CredentialsDto userCredentials;

}
