using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Helpers;
using AutoMapper;
using DataBase.DtoModels.User;
using DataBase.Models;
using DataManager;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UsersController : ControllerBase
    {
        private readonly IDataBaseService _dbService;
        private readonly IMapper _mapper;

        public UsersController(
            IDataBaseService dbService,
            IMapper mapper)
        {
            _dbService = dbService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task Register(CreateUserRequest user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var userDb = await _dbService.Get<UserDb>(i => i.Email == user.Email).SingleOrDefaultAsync();
            if (userDb != null)
                throw new Exception("Пользователь с таким email уже существует");

            if(user.Password != user.ConfirmPassword)
                throw new Exception("Пароли не совпадают");

            var newUserDb = new UserDb
            {
                Email = user.Email,
                Password = user.Password,
                Groups = DefaultGroups()
            };

            await _dbService.Insert(newUserDb);
            var userDto = _mapper.Map<UserDto>(newUserDb);

            var token = Auth(userDto);
            SetToken(token);
        }

        private static List<GroupDb> DefaultGroups()
        {
            var defaultGroups = new List<GroupDb>
            {
                new GroupDb
                {
                    Name = "Семья"
                },
                new GroupDb
                {
                    Name = "Работа"
                },
                new GroupDb
                {
                    Name = "Друзья"
                },
                new GroupDb
                {
                    Name = "Общение"
                }
            };

            return defaultGroups;
        }

        [HttpPost("login")]
        public async Task Login(LoginUserRequest user)
        {
            if(user == null)
                throw new ArgumentNullException(nameof(user));

            var userDb = await _dbService.Get<UserDb>(i => i.Email == user.Email && i.Password == user.Password)
                .SingleOrDefaultAsync();

            if (userDb == null)
                throw new Exception("Неверный логин или пароль");

            var userDto = _mapper.Map<UserDto>(userDb);

            var token = Auth(userDto);
            SetToken(token);
        }

        [HttpPost("logout")]
        public void Logout()
        {
            HttpContext.Response.Cookies.Delete("access_token");
        }


        private void SetToken(string token)
        {
            HttpContext.Response.Cookies.Append("access_token", token);
        }

        private static string Auth(UserDto user)
        {
            var identity = GetIdentity(user);

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.Issuer,
                audience: AuthOptions.Audience,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.Lifetime)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }

        private static ClaimsIdentity GetIdentity(UserDto user)
        {
            if (user == null) return null;

            var claims = new List<Claim>
            {
                new Claim(ClaimsExtensions.UserIdClaimType, user.Id.ToString())
            };

            var claimsIdentity =
                new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            return claimsIdentity;
        }
    }
}

