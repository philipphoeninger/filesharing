global using DAL.FileSharing.Repos;
global using DAL.FileSharing.Repos.Base;
global using DAL.FileSharing.Repos.Interfaces;

global using MODELS.FileSharing.Entities;
global using MODELS.FileSharing.Entities.Base;

global using Microsoft.AspNetCore.Builder;

global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Configuration;
global using Microsoft.Extensions.Hosting;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;

global using Serilog;
global using Serilog.Context;
global using Serilog.Core.Enrichers;
global using Serilog.Events;
global using Serilog.Sinks.MSSqlServer;

global using System.Data;
global using System.Runtime.CompilerServices;
global using System.Net.Http.Headers;
global using System.Net.Http.Json;
global using System.Text;
global using System.Text.Json;

global using SERVICES.FileSharing.DataServices;
//global using SERVICES.FileSharing.DataServices.Api;
//global using SERVICES.FileSharing.DataServices.Api.Base;
//global using SERVICES.FileSharing.DataServices.Interfaces;
global using SERVICES.FileSharing.Logging.Interfaces;
global using SERVICES.FileSharing.Logging.Configuration;
global using SERVICES.FileSharing.Logging.Settings;
global using SERVICES.FileSharing.Utilities;
