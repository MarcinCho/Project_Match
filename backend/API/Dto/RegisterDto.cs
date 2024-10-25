using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public class RegisterDto
{

    [MaxLength(25)]
    public required string Username { get; set; }

    public required string Password { get; set; }

}
