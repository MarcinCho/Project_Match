using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Data;

public class Seed
{


    public static async Task SeedAppUsers(DataContext context)
    {
        if (await context.AppUsers.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/Init/AppUsers.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null) return;

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            user.Username = user.Username.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Username)); // just for seeding!

            user.PasswordSalt = hmac.Key;

            context.AppUsers.Add(user);

        }

        await context.SaveChangesAsync();
    }

}
