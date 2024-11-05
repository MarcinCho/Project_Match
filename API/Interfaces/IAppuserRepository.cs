using System;
using API.Dto;
using API.Entities;

namespace API.Interfaces;

public interface IAppUserRepository
{
    void Update(AppUser user);

    Task<bool> SaveAllAsync();

    Task<IEnumerable<AppUser>> GetUsersAsync();

    Task<AppUser?> GetUserByIdAsync(int id);

    Task<AppUser?> GetUserByUsernameAsync(string username);

    Task<AppUser?> GetUserByEmailAsync(string email);

    Task<IEnumerable<AppUserDto>> GetUserDtoAsync();
    Task<AppUserDto?> GetUserDtoIdAsync(int id);
}
