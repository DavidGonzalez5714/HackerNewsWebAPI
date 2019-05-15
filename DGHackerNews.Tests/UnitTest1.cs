using DGHackerNews.Controllers;
using DGHackerNews.Lib;
using DGHackerNews.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace DGHackerNews.Tests
{
    public class UnitTest1
    {
        //HackerNewsController _controller;
        //IHackerNewsAPI _service; 

        //public VerifyGetViewTypeTest()
        //{
        //    var mock = new Mock<IHackerNewsAPI>();
        //    mock.Setup(hn=> hn.)
        //}
        [Fact]
        public void VerifGetNewestStoriesReturnTypeTest()
        {
            //Arrange
            var hackerNewsService = new Mock<IHackerNewsAPI>();
            var cacheService = new MemoryCache(new MemoryCacheOptions());//new Mock<IMemoryCache>();
            var controller = new HackerNewsController(hackerNewsService.Object, cacheService);

            //Act
            var result = controller.GetNewestStories();

            //assert
            Assert.IsType<Task<ActionResult<List<int>>>>(result);
        }

        [Fact]
        public async void AssertGetNewestStoriesReturnsList()
        {
            //Arrange
            var hackerNewsService = new Mock<IHackerNewsAPI>();
            var cacheService = new MemoryCache(new MemoryCacheOptions());//new Mock<IMemoryCache>();

            List<int> ids = new List<int> { 1, 2, 3, 4 };
            hackerNewsService.Setup(x => x.GetNewestStoriesAsync()).ReturnsAsync(ids);
            var controller = new HackerNewsController(hackerNewsService.Object, cacheService);

            //Act
            var actionResult = await controller.GetNewestStories();

            //assert
            //var result = Assert.IsType<ActionResult<List<int>>>(actionResult);
            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            var model = Assert.IsType<List<int>>(result.Value);

            Assert.Equal(4, model.Count);
            //var model = Assert.IsAssignableFrom<OkObjectResult>(result.Value);
            //Assert.Equal(4, result);
        }

        [Fact]
        public async void VerifyValidIdReturnsItem()
        {
            //Arrange
            var hackerNewsService = new Mock<IHackerNewsAPI>();
            var cacheService = new MemoryCache(new MemoryCacheOptions());//new Mock<IMemoryCache>();

            //crate the mock object
            Item item = new Item
            {
                url = "thisisatest.com",
                title = "This is a Test"
            };

            hackerNewsService.Setup(x => x.GetItemDetailsAsync(It.IsInRange<int>(1, 3, Range.Inclusive))).ReturnsAsync(item);

            var controller = new HackerNewsController(hackerNewsService.Object, cacheService);

            //Act
            int testId = 1;
            var actionResult = await controller.GetItemDetails(testId);

            //Assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            var model = Assert.IsType<Item>(result.Value);

            Assert.Equal("thisisatest.com", model.url);
            Assert.Equal("This is a Test", model.title);
        }
    }
}
