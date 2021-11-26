using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    [Controller]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        [Authorize]
        [HttpGet("check")]
        public IActionResult Check()
        {
            return Ok("OK");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromQuery] string name)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, name)
            };
            await HttpContext.SignInAsync(
                new  ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)),
                new AuthenticationProperties
                {
                    IsPersistent = true
                }
            );
            return Accepted();
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Accepted();
        }
    }
}
