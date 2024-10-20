namespace API.FileSharing.Controllers;

public static class IdentityUserEndpoints
{
    public static IEndpointRouteBuilder MapIdentityUserEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/signIn", SignInAsync);
        return app;
    }

    private static async Task<IResult> SignInAsync(
        UserManager<User> userManager,
        [FromBody] LoginRequest loginRequest,
        IOptions<JWTSettings> jwtSettings)
    {
        User? user = await userManager.FindByEmailAsync(loginRequest.Email);
        if (user != null && await userManager.CheckPasswordAsync(user, loginRequest.Password))
        {
            SymmetricSecurityKey signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Value.Key));
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserID", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(
                    signInKey,
                    SecurityAlgorithms.HmacSha256Signature
                    )
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(securityToken);
            return Results.Ok(new { token });
        }
        else return Results.BadRequest(new { message = "Username or password is incorrect." });
    }
}
