namespace TravelAPI.Dtos
{
    public class TripNoteDto 
    {
        public Guid Id { get; set; }
        public required string Place { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public required string Description { get; set; }
        public float Rating { get; set; }
    }
}
