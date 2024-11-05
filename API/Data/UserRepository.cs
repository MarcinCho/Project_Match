using System;
using API.Dto;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppUserRepository(DataContext context, IMapper mapper) : IAppUserRepository
{
    public async Task<AppUser?> GetUserByEmailAsync(string email)
    {
        return await context.AppUsers.SingleOrDefaultAsync(x => x.UserEmail == email);
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.AppUsers
        .Include(x => x.Photos)
        .SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.AppUsers
        .Include(x => x.Photos)
        .SingleOrDefaultAsync(x => x.Username == username);
    }

    public async Task<IEnumerable<AppUserDto>> GetUserDtoAsync()
    {
        return await context.AppUsers
        .ProjectTo<AppUserDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<AppUserDto?> GetUserDtoIdAsync(int id)
    {
        return await context.AppUsers
.Where(x => x.Id == id)
.ProjectTo<AppUserDto>(mapper.ConfigurationProvider)
.SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.AppUsers.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
