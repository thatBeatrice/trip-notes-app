using Moq;
using TravelAPI;
using TravelAPI.Dtos;
using TravelAPI.Models;
using TravelAPI.Repositories;
using TravelAPI.Services;

namespace TravelApiTests
{
    public class TripNoteServiceTests
    {
        private readonly Mock<ITripNoteRepository> _tripNoteRepositoryMock;

        private readonly ITripNoteRepository _tripNoteRepositoryInstance;

        private TripService _tripNoteService;

        public TripNoteServiceTests()
        {
            _tripNoteRepositoryMock = new Mock<ITripNoteRepository>();

            _tripNoteRepositoryInstance = _tripNoteRepositoryMock.Object;
        }


        [Fact]
        public void TripNoteService_Constructor_Throws_ArgumentNullException()
        {
            var exception = Assert.Throws<ArgumentNullException>(() => new TripService(null!));
            Assert.Equal("tripNoteRepository", exception.ParamName);
        }

        [Fact]
        public void TripNoteService_GetAll_Success()
        {
            var notes = new List<TripNoteModel>([
                    new TripNoteModel {
                        Id = Guid.NewGuid(),
                        Place = "Brasov",
                        DateFrom = new DateTime(),
                        DateTo = new DateTime(), 
                        Description = "testt",
                        Rating = 3.5f
                    },
                     new TripNoteModel {
                        Id = Guid.NewGuid(),
                        Place = "Galati", 
                        DateFrom = new DateTime(),
                        DateTo = new DateTime(), 
                        Description = "testt#2",
                        Rating = 4.5f
                    },
                     new TripNoteModel {
                        Id = Guid.NewGuid(),
                        Place = "Bucuresti",
                        DateFrom = new DateTime(),
                        DateTo = new DateTime(), 
                        Description = "testt#3",
                        Rating = 5f
                    }
                    ]);

            var expectedResult = notes.ConvertAll(note => TripNoteMapper.ToTripNoteDtoMap(note)).AsEnumerable();

            _tripNoteRepositoryMock.Setup(x => x.GetAll()).ReturnsAsync(notes);

            _tripNoteService = new TripService(_tripNoteRepositoryInstance);
            var result = _tripNoteService.GetAll();

            Assert.Equivalent(expectedResult, result);
        }

        [Fact]
        public void TripNoteService_CreateTripNote_Success()
        {
            var newNoteDto = new TripNoteDto
            {
                Id = Guid.NewGuid(),
                Place = "Brasov",
                DateFrom = new DateTime(),
                DateTo = new DateTime(),
                Description = "testt",
                Rating = 3.5f
            };
            var newNote = TripNoteMapper.ToTripNoteMap(newNoteDto);

            _tripNoteRepositoryMock.Setup(x => x.CreateTripNote(It.IsAny<TripNoteModel>())).ReturnsAsync(newNote);

            _tripNoteService = new TripService(_tripNoteRepositoryInstance);

            var result = _tripNoteService.CreateTripNote(newNoteDto);

            Assert.Equivalent(newNoteDto, result);
        }

        [Fact]
        public void TripNoteService_CreateTripNote_Invalid_Parameter()
        {
            _tripNoteService = new TripService(_tripNoteRepositoryInstance);

            var result = _tripNoteService.CreateTripNote(null!);

            Assert.Null(result);
        }

        [Fact]
        public void TripNoteService_UpdateTripNote_Success()
        {
            var notes = new List<TripNoteModel>([
                   new TripNoteModel {
                        Id = Guid.Parse("b352ccf7-3060-4991-a22f-5d0f48638977"),
                        Place = "Brasov", 
                        DateFrom = new DateTime(),
                        DateTo = new DateTime(), 
                        Description = "testt",
                        Rating = 3.5f
                    },
                     new TripNoteModel {
                        Id = Guid.NewGuid(),
                        Place = "Galati", 
                        DateFrom = new DateTime(),
                        DateTo = new DateTime(), 
                        Description = "testt#2",
                        Rating = 4.5f
                    },
                     new TripNoteModel {
                        Id = Guid.NewGuid(),
                        Place = "Bucuresti", 
                        DateFrom = new DateTime(),
                        DateTo = new DateTime(), 
                        Description = "testt#3",
                        Rating = 5f
                    }
                   ]);
            Guid noteId = Guid.Parse("b352ccf7-3060-4991-a22f-5d0f48638977");
            TripNoteDto updatedNote = new TripNoteDto
            {
                Id = Guid.Parse("b352ccf7-3060-4991-a22f-5d0f48638977"),
                Place = "Brasov",
                DateFrom = new DateTime(2010, 12, 10),
                DateTo = new DateTime(2010, 12, 12),
                Description = "not a test",
                Rating = 3.5f
            };


            _tripNoteRepositoryMock.Setup(x => x.UpdateTripNote(noteId, It.IsAny<TripNoteModel>() )).ReturnsAsync(true);

            _tripNoteService = new TripService(_tripNoteRepositoryInstance);

            var result = _tripNoteService.UpdateTripNote(noteId, updatedNote);

            Assert.True(result);
        }

        [Fact]
        public void TripNoteService_DeleteTripNote_Success()
        {
            Guid noteId = Guid.NewGuid();
            var note = new TripNoteModel
            {
                Id = noteId,
                Place = "Brasov",
                DateFrom = new DateTime(2010, 12, 10),
                DateTo = new DateTime(2010, 12, 12),
                Description = "not a test",
                Rating = 3.5f
            };

            _tripNoteRepositoryMock.Setup(x => x.GetTripNote(noteId)).ReturnsAsync(note);
            _tripNoteRepositoryMock.Setup(x => x.DeleteTripNote(noteId)).ReturnsAsync(true);

            _tripNoteService = new TripService(_tripNoteRepositoryInstance);

            var result = _tripNoteService.DeleteTripNote(noteId);

            Assert.True(result);
        }
    }
}