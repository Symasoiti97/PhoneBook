using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Security.Claims;

namespace API.Helpers
{
    public static class ClaimsExtensions
    {
        public const string UserIdClaimType = "UserIdClaimType";

        public static Guid GetUserId([NotNull] this IEnumerable<Claim> claims)
        {
            if (claims == null) throw new ArgumentNullException(nameof(claims));

            return Guid.Parse(claims.Single(c => c.Type == UserIdClaimType).Value);
        }

        public static Guid? TryGetUserId(this IEnumerable<Claim> claims)
        {
            var claim = claims.SingleOrDefault(c => c.Type == UserIdClaimType);
            return claim != null ? Guid.Parse(claim.Value) : (Guid?)null;
        }
    }
}