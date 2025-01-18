using MongoDB.Driver;
using TravelAPI.Models;

namespace TravelAPI.Repositories
{
    public interface ITripNoteRepository
    {
        Task<IEnumerable<TripNoteModel>> GetAll();
        Task<TripNoteModel> GetTripNote(Guid id);
        Task<TripNoteModel> CreateTripNote(TripNoteModel tripNote);
        Task<TripNoteModel> UpdateTripNote(Guid id, TripNoteModel tripNote);
        Task<bool> DeleteTripNote(Guid id);
        Task<bool> DeleteAll();
    }
}
