using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {

        [HttpPost("register")] //account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            return Ok();
            // if (await UsernameInUse(registerDto.Username.ToLower())) return BadRequest("Username is already in use");

            // using var hmac = new HMACSHA512();

            // var user = new AppUser
            // {
            //     Username = registerDto.Username.ToLower(),
            //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            //     PasswordSalt = hmac.Key
            // };

            // context.AppUsers.Add(user);
            // await context.SaveChangesAsync();


            // return new UserDto
            // {
            //     Username = user.Username,
            //     Token = tokenService.CreateToken(user)

            // };
        }

        [HttpPost("login")] //account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await context.AppUsers.FirstOrDefaultAsync(x => x.Username.ToLower() == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Wrong password!");
            }


            return new UserDto
            {
                Username = user.Username,
                Token = tokenService.CreateToken(user)

            };
        }



        private async Task<bool> UsernameInUse(string username)
        {
            return await context.AppUsers.AnyAsync(x => x.Username.ToLower() == username);
        }

    }
}
