using TravelAPI.Dtos;
using TravelAPI.Models;

namespace TravelAPI
{
    public static class TripNoteMapper
    {
        public static TripNoteDto ToTripNoteDtoMap(TripNoteModel tripNote)
        {
            return new TripNoteDto()
            {
                Id = tripNote.Id,
                Place = tripNote.Place,
                DateFrom = tripNote.DateFrom,
                DateTo = tripNote.DateTo,
                Description = tripNote.Description,
                Rating = tripNote.Rating
            };

        }
        public static TripNoteModel ToTripNoteMap(TripNoteDto tripNoteDto)
        {
            return new TripNoteModel()
            {
                Id = tripNoteDto.Id,
                Place = tripNoteDto.Place,
                DateFrom = tripNoteDto.DateFrom,
                DateTo = tripNoteDto.DateTo,
                Description = tripNoteDto.Description,
                Rating = tripNoteDto.Rating
            };
        }
    }
}
