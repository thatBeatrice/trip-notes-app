using System.Text;
using Newtonsoft.Json;
using TravelAPI.Dtos;

namespace TravelApiIntegrationTests.Controllers
{
    public class TripControllerTests
    {
        readonly string baseUrl = "http://localhost:5174/Trip";

        [Fact]
        public async Task TripController_GetAll_Success()
        {
            var note = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var serializedNote = JsonConvert.SerializeObject(note);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            await client.PostAsync(baseUrl, httpContent);

            var result = await client.GetAsync(baseUrl);
            var resultContent = await result.Content.ReadAsStringAsync();
            var resultContentDeserialized = JsonConvert.DeserializeObject<TripNoteDto[]>(resultContent);

            Assert.NotNull(resultContentDeserialized?.First(n => n.Id == note.Id));

            Assert.Equal(System.Net.HttpStatusCode.OK, result.StatusCode);

            await client.DeleteAsync(baseUrl + "/" + note.Id);

        }

        [Fact]
        public async Task TripController_GetAll_Fail()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            await client.DeleteAsync(baseUrl + "/DeleteAll");

            var result = await client.GetAsync(baseUrl);
            var resultContent = await result.Content.ReadAsStringAsync();
            var resultContentDeserialized = JsonConvert.DeserializeObject<TripNoteDto[]>(resultContent);

            Assert.Null(resultContentDeserialized);
            Assert.Equal(System.Net.HttpStatusCode.NoContent, result.StatusCode);
        }

        [Fact]
        public async Task TripController_CreateTripNote_Success()
        {
            var note = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var serializedNote = JsonConvert.SerializeObject(note);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            var result = await client.PostAsync(baseUrl, httpContent);

            Assert.Equal(System.Net.HttpStatusCode.OK, result.StatusCode);

            await client.DeleteAsync(baseUrl + "/" + note.Id);
        }


        [Fact]
        public async Task TripController_CreateTripNote_Fail()
        {
            var serializedNote = JsonConvert.SerializeObject(null);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            var result = await client.PostAsync(baseUrl, httpContent);

            Assert.Equal(System.Net.HttpStatusCode.BadRequest, result.StatusCode);
        }

        [Fact]
        public async Task TripController_UpdateTripNote_Success()
        {
            var note = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var serializedNote = JsonConvert.SerializeObject(note);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            var updatedNote = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov2",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 4.5f
            };
            var serializedUpdatedNote = JsonConvert.SerializeObject(updatedNote);
            var httpContentUpdated = new StringContent(serializedUpdatedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            await client.PostAsync(baseUrl, httpContent);
            var result = await client.PutAsync(baseUrl + "/" + note.Id, httpContentUpdated);

            Assert.Equal(System.Net.HttpStatusCode.OK, result.StatusCode);

            await client.DeleteAsync(baseUrl + "/" + note.Id);
        }


        [Fact]
        public async Task TripController_UpdateTripNote_Fail()
        {
            var note = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var serializedNote = JsonConvert.SerializeObject(note);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            var serializedUpdatedNote = JsonConvert.SerializeObject(null);
            var httpContentUpdated = new StringContent(serializedUpdatedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            await client.PostAsync(baseUrl, httpContent);
            var result = await client.PutAsync(baseUrl + "/" + note.Id, httpContentUpdated);

            Assert.Equal(System.Net.HttpStatusCode.BadRequest, result.StatusCode);

            await client.DeleteAsync(baseUrl + "/" + note.Id);
        }

        [Fact]
        public async Task TripController_DeleteTripNote_Success()
        {
            var note = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var serializedNote = JsonConvert.SerializeObject(note);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            await client.PostAsync(baseUrl, httpContent);

            var deleteResult = await client.DeleteAsync(baseUrl + "/" + note.Id);

            var result = await client.GetAsync(baseUrl);
            var resultContent = await result.Content.ReadAsStringAsync();
            var resultContentDeserialized = JsonConvert.DeserializeObject<TripNoteDto[]>(resultContent);

            Assert.Null(resultContentDeserialized?.FirstOrDefault(n => n.Id == note.Id));
            Assert.Equal(System.Net.HttpStatusCode.OK, deleteResult.StatusCode);

        }

        [Fact]
        public async Task TripController_DeleteTripNote_Fail()
        {
            var note = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var serializedNote = JsonConvert.SerializeObject(note);
            var httpContent = new StringContent(serializedNote, Encoding.UTF8, "application/json");

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(baseUrl);

            await client.PostAsync(baseUrl, httpContent);

            var deleteResult = await client.DeleteAsync(baseUrl + "/" + Guid.NewGuid());

            var result = await client.GetAsync(baseUrl);
            var resultContent = await result.Content.ReadAsStringAsync();
            var resultContentDeserialized = JsonConvert.DeserializeObject<TripNoteDto[]>(resultContent);

            Assert.NotNull(resultContentDeserialized?.FirstOrDefault(n => n.Id == note.Id));
            Assert.Equal(System.Net.HttpStatusCode.NotFound, deleteResult.StatusCode);

            await client.DeleteAsync(baseUrl + "/" + note.Id);
        }
    }
}
