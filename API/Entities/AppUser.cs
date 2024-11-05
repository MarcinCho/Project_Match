using System;
using API.Extentions;

namespace API.Entities;

public class AppUser
{

    public int Id { get; set; }

    public required string Username { get; set; }

    public required string UserEmail { get; set; }


    public byte[] PasswordHash { get; set; } = [];

    public byte[] PasswordSalt { get; set; } = [];

    public DateTime Created { get; set; } = DateTime.UtcNow;

    public DateTime LastActive { get; set; } = DateTime.UtcNow;

    public required string Location { get; set; }

    public bool Company { get; set; } = false;

    public bool Commercial { get; set; } = false;

    public bool PrivateUser { get; set; } = false;

    public List<Photo> Photos { get; set; } = [];

    public Company? UserCompany { get; set; }

    public int? UserCompanyId { get; set; }




    public int GetLastActive()
    {
        return LastActive.CalculateLastSeen().Hours;
    }

}
