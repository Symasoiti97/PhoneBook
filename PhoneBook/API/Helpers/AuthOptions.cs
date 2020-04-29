using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace API.Helpers
{
    public class AuthOptions
    {
        public const string Issuer = "MyAuthServer";
        public const string Audience = "http://localhost:44332/"; 
        private const string Key = "mysupersecret_secretkey!123";   
        public const int Lifetime = 999999;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}