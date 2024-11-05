using System;
using API.Entities;

namespace API.Dto;

public class AppUserDto
{

    public int Id { get; set; }

    public required string Username { get; set; }

    public required string UserEmail { get; set; }

    public string? PhotoUrl { get; set; }
    public DateTime Created { get; set; }

    public DateTime LastActive { get; set; }

    public string? Location { get; set; }

    public bool? Company { get; set; }

    public bool? Commercial { get; set; }

    public bool? PrivateUser { get; set; }

    public List<PhotoDto>? Photos { get; set; }

    public Company? UserCompany { get; set; }

    public int? UserCompanyId { get; set; }
}
