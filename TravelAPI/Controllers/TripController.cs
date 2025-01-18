using Microsoft.AspNetCore.Mvc;
using TravelAPI.Dtos;
using TravelAPI.Services;

namespace TravelAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService _tripService;
        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tripNotes = _tripService.GetAll();

            return tripNotes.Any() ? Ok(tripNotes) : NoContent();
        }

        [HttpPost]
        public IActionResult CreateTripNote(TripNoteDto model)
        {
            TripNoteDto result = _tripService.CreateTripNote(model);
            if (result == null)
            {
                return BadRequest(null!);
            }

            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTripNote(Guid id, TripNoteDto model)
        {
            TripNoteDto result = _tripService.UpdateTripNote(id, model);
            if (result == null)
            {
                return BadRequest(null!);
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTripNote(Guid id)
        {
            return _tripService.DeleteTripNote(id) ? Ok(id) : NotFound();
        }

        [HttpDelete]
        [Route("DeleteAll")]
        public IActionResult DeleteAll()
        {
            _tripService.DeleteAll();
            return Ok();
        }
    }
}
