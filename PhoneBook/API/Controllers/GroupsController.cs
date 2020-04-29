using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using AutoMapper;
using DataBase.DtoModels.Group;
using DataBase.Models;
using DataManager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/group")]
    public class GroupsController : Controller
    {
        private readonly IDataBaseService _dbService;
        private readonly IMapper _mapper;

        public GroupsController(
            IDataBaseService dbService,
            IMapper mapper)
        {
            _dbService = dbService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<GroupDto>> Get()
        {
            var userId = User.Claims.GetUserId();

            var groups = await _dbService.Get<GroupDb>().Where(i => i.User.Id == userId).ToListAsync();

            return _mapper.Map<List<GroupDto>>(groups);
        }

        [HttpPost]
        public async Task CreateGroup(CreateGroupRequest request)
        {
            if(string.IsNullOrEmpty(request.Name))
                throw new ArgumentNullException(nameof(request.Name));

            var userId = User.Claims.GetUserId();

            var groupDb = new GroupDb
            {
                UserId = userId,
                Name = request.Name
            };

            await _dbService.Insert(groupDb);
        }

        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            var group = await _dbService.Get<GroupDb>().FirstOrDefaultAsync(x => x.Id == id);
            if (group == null)
                throw new Exception("Группа не существует");
            
            await _dbService.Delete(group);
        }
    }
}
