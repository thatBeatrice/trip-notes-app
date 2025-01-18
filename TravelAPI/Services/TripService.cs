using TravelAPI.Dtos;
using TravelAPI.Models;
using TravelAPI.Repositories;

namespace TravelAPI.Services
{
    public class TripService : ITripService
    {
        private readonly ITripNoteRepository _tripNoteRepository;

        public TripService(ITripNoteRepository tripNoteRepository)
        {
            _tripNoteRepository = tripNoteRepository ?? throw new ArgumentNullException(nameof(tripNoteRepository));
        }

        public IEnumerable<TripNoteDto> GetAll()
        {
            return _tripNoteRepository.GetAll().Result.ToList().ConvertAll(note => TripNoteMapper.ToTripNoteDtoMap(note));
        }

        public TripNoteDto CreateTripNote(TripNoteDto model)
        {
            if (model == null) { return null!;  }

            TripNoteModel newModel = TripNoteMapper.ToTripNoteMap(model);

            var result = _tripNoteRepository.CreateTripNote(newModel);
            return result.Result != null ? TripNoteMapper.ToTripNoteDtoMap(result.Result) : null! ;
        }

        public TripNoteDto UpdateTripNote(Guid id, TripNoteDto model)
        {
            if (model == null) { return null!; }

            var newModel = TripNoteMapper.ToTripNoteMap(model);

            var result = _tripNoteRepository.UpdateTripNote(id, newModel);
            return result.Result != null ? TripNoteMapper.ToTripNoteDtoMap(result.Result) : null!;
        }

        public bool DeleteTripNote(Guid id)
        {
            if (_tripNoteRepository.GetTripNote(id).Result == null) { return false; }
            return _tripNoteRepository.DeleteTripNote(id).Result;
        } 

        public bool DeleteAll()
        {
            return _tripNoteRepository.DeleteAll().Result;
        }
    }
}
