using System;

namespace API.Entities;

public class Company
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string PhoneNumber { get; set; }
}
