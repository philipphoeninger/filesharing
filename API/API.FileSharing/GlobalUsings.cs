global using API.FileSharing.Swagger;
global using API.FileSharing.Swagger.Models;
global using API.FileSharing.Controllers.Base;
//global using API.FileSharing.Filters;
//global using API.FileSharing.Security;

global using DAL.FileSharing.EFStructures;
global using DAL.FileSharing.Initialization;
global using DAL.FileSharing.Exceptions;
global using DAL.FileSharing.Repos;
global using DAL.FileSharing.Repos.Base;
global using DAL.FileSharing.Repos.Interfaces;

global using MODELS.FileSharing.Entities;
global using MODELS.FileSharing.Entities.Base;

global using SERVICES.FileSharing.Utilities;

global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Mvc.ApiExplorer;
global using Microsoft.AspNetCore.Mvc.Filters;
global using Microsoft.Extensions.Options;
global using Microsoft.OpenApi.Any;
global using Microsoft.OpenApi.Models;
global using Microsoft.AspNetCore.Authentication;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc.Authorization;

global using Swashbuckle.AspNetCore.Annotations;
global using Swashbuckle.AspNetCore.SwaggerGen;

global using System.Reflection;
global using System.Text.Json;
global using System.Text.Json.Serialization;
global using System.Net.Http.Headers;
global using System.Security.Claims;
global using System.Text;
global using System.Text.Encodings.Web;
