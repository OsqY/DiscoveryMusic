using System.Globalization;
using System.Text.RegularExpressions;
using CsvHelper;
using CsvHelper.Configuration;
using DiscoveryMusic.Data.Database;
using DiscoveryMusic.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiscoveryMusic.Controllers;

[Authorize(Roles = "Administrator")]
[ApiController]
[Route("api/[controller]/[action]")]
public class SeedingController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SeedingController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPut]
    public async Task<ActionResult> Seed()
    {
        var path = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Data/Seeding",
            "rym_top_5000_all_time(1).csv"
        );

        using (var reader = new StreamReader(path))
        using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
        {
            var albums = csv.GetRecords<AlbumCsvRecord>().ToList();

            foreach (var record in albums)
            {
                var artist = await _context.Artists.FirstOrDefaultAsync(a =>
                    a.Name == record.ArtistName
                );

                if (artist == null)
                {
                    artist = new Artist
                    {
                        Name = record.ArtistName,
                        CreatedDate = DateTime.Now,
                        LastModifiedDate = DateTime.Now,
                    };
                    await _context.AddAsync(artist);
                    await _context.SaveChangesAsync();
                }

                var releaseDate = ParseDate(record.ReleaseDate) ?? new DateTime(1900, 1, 1);

                var newAlbum = new Album
                {
                    Name = record.Album,
                    ReleaseDate = releaseDate,
                    ArtistId = artist.Id,
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now,
                };

                await _context.AddAsync(newAlbum);
            }
        }
        await _context.SaveChangesAsync();
        return Ok();
    }

    public class AlbumCsvRecord
    {
        public int Ranking { get; set; }
        public string Album { get; set; }
        public string ArtistName { get; set; }
        public string ReleaseDate { get; set; }
    }

    public static DateTime? ParseDate(string dateStr)
    {
        if (string.IsNullOrWhiteSpace(dateStr) || !HasDateLikePattern(dateStr))
        {
            return null;
        }

        string[] formats = { "d MMMM yyyy", "MMMM yyyy", "yyyy" };

        foreach (var format in formats)
        {
            if (
                DateTime.TryParseExact(
                    dateStr,
                    format,
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out DateTime date
                )
            )
            {
                if (format == "MMMM yyyy" || format == "yyyy")
                {
                    return new DateTime(date.Year, date.Month, 1);
                }

                return date;
            }
        }

        return null;
    }

    public static bool HasDateLikePattern(string input)
    {
        return Regex.IsMatch(input, @"\b(?:\d{1,2}\s)?[A-Za-z]+\s\d{4}\b");
    }
}
