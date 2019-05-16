using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DGHackerNews.Lib;
using DGHackerNews.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace DGHackerNews.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HackerNewsController : ControllerBase
    {
        private readonly IHackerNewsAPI _service;
        private readonly IMemoryCache _cache;

        public HackerNewsController(IHackerNewsAPI service, IMemoryCache cache)
        {
            _service = service;
            _cache = cache;
        }

        [HttpGet]
        [Route("GetNewestStories")]
        public async Task<ActionResult<List<int>>> GetNewestStories()
        {
            //List<int> stories = await _service.GetNewestStoriesAsync();
            string getNewStoriesCacheKey = "GetNewestStories";
            List<int> stories = await _cache.GetOrCreateAsync(getNewStoriesCacheKey, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5);
                return _service.GetNewestStoriesAsync();
            });
            

            return Ok(stories);
        }

        [HttpGet]
        [Route("GetItemDetails")]
        public async Task<ActionResult<Item>> GetItemDetails(int id)
        {
            string getItemDetailsCacheKey = "GetItemDetails" + id;

            //Item item = await _service.GetItemDetailsAsync(id);
            //item.url = "the test should fail here";//added this so I can manually cause the test to fail
            Item item = await _cache.GetOrCreateAsync(getItemDetailsCacheKey, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
                return _service.GetItemDetailsAsync(id);
            });

            return Ok(item);
        }
    }
}