using System;
using System.Net;
using System.Threading.Tasks;
using API.Helpers;
using AutoMapper;
using DataBase;
using DataBase.Mapping;
using DataManager;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        private const string AllowOrigin = "AllowOrigin";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(i => i.AddProfile(new ApiMapperProfile()), typeof(Startup));
            services.AddControllers(op => op.Filters.Add(typeof(ExceptionFilter)))
                .AddFluentValidation(config =>
                {
                    config.LocalizationEnabled = true;
                    config.RegisterValidatorsFromAssembly(GetType().Assembly);
                });

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Events.OnRedirectToAccessDenied = ReplaceRedirector(HttpStatusCode.Forbidden,
                        options.Events.OnRedirectToAccessDenied);
                    options.Events.OnRedirectToLogin =
                        ReplaceRedirector(HttpStatusCode.Unauthorized, options.Events.OnRedirectToLogin);
                    var tokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = AuthOptions.Issuer,
                        ValidateAudience = true,
                        ValidAudience = AuthOptions.Audience,
                        ValidateLifetime = true,
                        IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                        ValidateIssuerSigningKey = true,
                    };

                    options.Cookie.Name = "access_token";
                    options.Cookie.HttpOnly = true;
                    options.TicketDataFormat =
                        new JwtDataFormat(SecurityAlgorithms.HmacSha256, tokenValidationParameters);
                });

            services.AddTransient<IDataBaseService, DataBaseService>();

            services.AddDbContext<PhoneBookContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "PhoneBook API",
                    Description = "ASP.NET Core Web API"
                });
            });

            //services.AddSession(options =>
            //{
            //    options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None;
            //});

            services.AddCors(options =>
            {
                options.AddPolicy(AllowOrigin, builder => builder.WithOrigins("http://localhost:8080")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
            });


            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "PhoneBook API V1"); });

            app.UseRouting();

            app.UseCors(AllowOrigin);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        private static Func<RedirectContext<CookieAuthenticationOptions>, Task> ReplaceRedirector(
            HttpStatusCode statusCode, Func<RedirectContext<CookieAuthenticationOptions>, Task> existingRedirector) =>
            context =>
            {
                if (context.Request.Path.StartsWithSegments("/api"))
                {
                    context.Response.StatusCode = (int) statusCode;
                    return Task.CompletedTask;
                }

                return existingRedirector(context);
            };
    }
}