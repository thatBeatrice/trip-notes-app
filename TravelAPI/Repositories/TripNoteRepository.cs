using System.Threading.Tasks;
using MongoDB.Driver;
using TravelAPI.Models;
using TravelAPI.Settings;

namespace TravelAPI.Repositories
{
    public class TripNoteRepository : ITripNoteRepository
    {

        private readonly IMongoCollection<TripNoteModel> _notes;

        public TripNoteRepository(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _notes = database.GetCollection<TripNoteModel>(settings.TasksCollectionName);
        }

        public async Task<TripNoteModel> CreateTripNote(TripNoteModel tripNote)
        {
            if (tripNote.Id == Guid.Empty)
            {
                tripNote.Id = Guid.NewGuid();
            }
            var exist = (await _notes.FindAsync(note => note.Id == tripNote.Id)).FirstOrDefault();
            if (exist != null)
            {
                return null!;
            }

            await _notes.InsertOneAsync(tripNote);
            return tripNote;
        }

        public async Task<IEnumerable<TripNoteModel>> GetAll()
        {
            var result = await _notes.FindAsync(note => true);
            return result.ToList();
        }

        public async Task<TripNoteModel> GetTripNote(Guid id)
        {
            var note = await _notes.FindAsync(note => note.Id == id);
            return note.FirstOrDefault();
        }

        public async Task<TripNoteModel> UpdateTripNote(Guid id, TripNoteModel tripNote)
        {
            var updateResult = await _notes.UpdateOneAsync(
                Builders<TripNoteModel>.Filter.Eq(n => n.Id, id),
                Builders<TripNoteModel>.Update.Set(n => n.Place, tripNote.Place)
                         .Set(n => n.DateFrom, tripNote.DateFrom).Set(n => n.DateTo, tripNote.DateTo)
                         .Set(n => n.Description, tripNote.Description)
                         .Set(n => n.Rating, tripNote.Rating)
                    );

            if (updateResult.MatchedCount == 1)

            {
                var newTripNote = new TripNoteModel
                {
                    Id = id,
                    Place = tripNote.Place,
                    DateFrom = tripNote.DateFrom,
                    DateTo = tripNote.DateTo,
                    Description = tripNote.Description,
                    Rating = tripNote.Rating
                };

                return newTripNote;
            }

            return null!;
        }

        public async Task<bool> DeleteTripNote(Guid id)
        {
            await _notes.DeleteOneAsync(note => note.Id == id);
            return true;
        }

        public async Task<bool> DeleteAll()
        {
            await _notes.DeleteManyAsync(n => true);
            return true;
        }
    }
}
