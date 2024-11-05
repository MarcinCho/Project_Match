using System;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IAppUserRepository appUserRepository, IMapper mapper) : BaseApiController
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUserDto>>> GetUsers()
    {
        var users = await appUserRepository.GetUserDtoAsync();

        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUserDto>> GetUser(int id)
    {
        var user = await appUserRepository.GetUserDtoIdAsync(id);

        if (user == null) return NotFound();

        return user;
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<AppUserDto>> GetUsername(string username)
    {
        var user = await appUserRepository.GetUserByUsernameAsync(username);
        var userToReturn = mapper.Map<AppUserDto>(user);
        if (user == null) return NotFound();

        return userToReturn;
    }

}
