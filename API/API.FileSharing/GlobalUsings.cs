global using API.FileSharing.ApiVersionSupport;
global using API.FileSharing.Swagger;
global using API.FileSharing.Swagger.Models;
global using API.FileSharing.Controllers;
global using API.FileSharing.Controllers.Base;
global using API.FileSharing.Controllers.Identity;
global using API.FileSharing.Extensions;
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
global using MODELS.FileSharing.Settings;

global using SERVICES.FileSharing.Utilities;
global using SERVICES.FileSharing.Logging.Interfaces;
global using SERVICES.FileSharing.Logging.Configuration;

global using Microsoft.EntityFrameworkCore;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.AspNetCore.Mvc.ApiExplorer;
global using Asp.Versioning;
global using Asp.Versioning.ApiExplorer;
global using Microsoft.AspNetCore.Mvc.Filters;
global using Microsoft.Extensions.Options;
global using Microsoft.OpenApi.Any;
global using Microsoft.OpenApi.Models;
global using Microsoft.AspNetCore.Authentication;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc.Authorization;
global using Microsoft.AspNetCore.Identity;
global using Microsoft.AspNetCore.Identity.Data;
global using Microsoft.IdentityModel.Tokens;

global using Swashbuckle.AspNetCore.Annotations;
global using Swashbuckle.AspNetCore.SwaggerGen;

global using System.Reflection;
global using System.Text.Json;
global using System.Text.Json.Serialization;
global using System.Net.Http.Headers;
global using System.Security.Claims;
global using System.Text;
global using System.Text.Encodings.Web;
global using System.IdentityModel.Tokens.Jwt;
