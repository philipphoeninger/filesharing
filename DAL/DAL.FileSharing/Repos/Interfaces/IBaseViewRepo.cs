﻿namespace DAL.FileSharing.Repos.Interfaces;

public interface IBaseViewRepo<T> : IDisposable where T : class, new()
{
    ApplicationDBContext Context { get; }
    IEnumerable<T> ExecuteSqlString(string sql);
    IEnumerable<T> GetAll();
    IEnumerable<T> GetAllIgnoreQueryFilters();
}
