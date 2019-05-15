using DGHackerNews.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Threading.Tasks;

namespace DGHackerNews.Lib
{
    public interface IHackerNewsAPI
    {
        //get the newest stories
        Task<List<int>> GetNewestStoriesAsync();
        //get the details of the item, need to create the model for the item
        Task<Item> GetItemDetailsAsync(int itemId);
    }

    //HTTPS is required. Firebase only responds to encrypted traffic so that your data remains safe. How will I handle this??
    public class HackerNewsAPI : IHackerNewsAPI
    {
        private const string NewStoriesEndPoint = "https://hacker-news.firebaseio.com/v0/newstories.json";
        private const string ItemDetailEndPoint = "https://hacker-news.firebaseio.com/v0/item/{0}.json";

        public async Task<Item> GetItemDetailsAsync(int itemId)
        {
            using (HttpClient client = new HttpClient())
            {
                var serializer = new DataContractJsonSerializer(typeof(Item));
                string endPoint = string.Format(ItemDetailEndPoint, itemId);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                var streamTask = client.GetStreamAsync(endPoint);
                var itemDetails = serializer.ReadObject(await streamTask) as Item;

                return itemDetails;
            }
        }

        public async Task<List<int>> GetNewestStoriesAsync()
        {
            using (HttpClient client = new HttpClient())
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(List<int>));

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                Task<Stream> streamTask = client.GetStreamAsync(NewStoriesEndPoint);
                List<int> newNewsStoriesIds = serializer.ReadObject(await streamTask) as List<int>;

                return newNewsStoriesIds;

            }
        }
    }
}
