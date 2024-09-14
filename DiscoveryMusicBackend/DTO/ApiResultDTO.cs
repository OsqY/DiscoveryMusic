
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace DiscoveryMusic.DTO;

public class ApiResultDTO<T>
{

  private ApiResultDTO(List<T> data, int count, int pageIndex, int pageSize, string? sortColumn,
      string? sortOrder, string? filterColumn = null, string? filterQuery = null)
  {
    Data = data;
    PageIndex = pageIndex;
    PageSize = pageSize;
    SortColumn = sortColumn;
    SortOrder = sortOrder;
    FilterColumn = filterColumn;
    FilterQuery = filterQuery;
    TotalPages = (int)Math.Ceiling(count / (double)pageSize);
  }


  public static async Task<ApiResultDTO<T>> CreateAsync(IQueryable<T> source, PaginationDTO pagination)
  {
    if (!string.IsNullOrEmpty(pagination.FilterColumn) && !string.IsNullOrEmpty(pagination.FilterQuery)
        && IsValidProperty(pagination.FilterColumn))
      source.Where(string.Format("{0}.startsWith(@0)", pagination.FilterColumn), pagination.FilterQuery);

    var count = await source.CountAsync();

    if (!string.IsNullOrEmpty(pagination.SortOrder) && IsValidProperty(pagination.SortColumn))
    {
      pagination.SortOrder = !string.IsNullOrEmpty(pagination.SortOrder)
        && pagination.SortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";
      source = source.OrderBy(string.Format("{0} {1}", pagination.SortColumn, pagination.SortOrder));
    }

    source = source.Skip(pagination.PageIndex * pagination.PageSize).Take(pagination.PageSize);

    var data = await source.ToListAsync();

    return new ApiResultDTO<T>(data, count, pagination.PageIndex,
        pagination.PageSize, pagination.SortColumn,
        pagination.SortOrder, pagination.FilterColumn, pagination.FilterQuery);

  }

  public static bool IsValidProperty(string propertyName, bool throwExceptionIfNotFound = true)
  {
    var prop = typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

    if (prop == null && throwExceptionIfNotFound)
      throw new NotSupportedException(string.Format($"Error: Property '{propertyName} does not exist.'"));

    return prop != null;
  }

  public List<T> Data { get; private set; }
  public int PageIndex { get; private set; }
  public int PageSize { get; private set; }
  public int TotalCount { get; private set; }
  public int TotalPages { get; private set; }
  public bool HasPreviousPage
  {
    get
    {
      return (PageIndex > 0);
    }
  }

  public bool HasNextPage
  {
    get
    {
      return ((PageIndex + 1) < TotalPages);
    }
  }

  public string? SortColumn { get; set; }
  public string? SortOrder { get; set; }
  public string? FilterColumn { get; set; }
  public string? FilterQuery { get; set; }
}

