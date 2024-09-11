
namespace DiscoveryMusic.DTO;

public class PaginationDTO
{

  public int PageIndex { get; set; }
  public int PageSize { get; set; }
  public string? SortColumn { get; set; } = null;
  public string? SortOrder { get; set; } = null;
  public string? FilterColumn { get; set; } = null;
  public string? FilterQuery { get; set; } = null;
}
