using TravelAPI.Dtos;

namespace TravelAPI.Services
{
    public interface ITripService
    {
        public IEnumerable<TripNoteDto> GetAll();
        public TripNoteDto CreateTripNote(TripNoteDto model);
        public TripNoteDto UpdateTripNote(Guid id, TripNoteDto model);
        public bool DeleteTripNote(Guid id);
        public bool DeleteAll();
    }
}
