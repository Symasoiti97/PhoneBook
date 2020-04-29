using System.Collections;
using System.Linq;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace API.Helpers
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            ErrorResponse response;
            if (context.Exception is ValidationException exception)
            {
                response = new ErrorResponse
                {
                    Message = exception.Errors.First().ErrorMessage,
                    StackTrace = exception.StackTrace,
                    Type = exception.GetType().Name,
                    Data = exception.Errors.GroupBy(k => new {k.PropertyName, k.AttemptedValue}, v => v.ErrorMessage)
                        .Select(r => new
                        {
                            r.Key.PropertyName,
                            r.Key.AttemptedValue,
                            ErrorMessage = r.ToArray()
                        })
                        .ToDictionary(e => e.PropertyName,
                            e => new {e.AttemptedValue, e.ErrorMessage})
                };
            }
            else
            {
                response = new ErrorResponse
                {
                    Message = context.Exception.Message,
                    StackTrace = context.Exception.StackTrace,
                    Type = context.Exception.GetType().Name,
                    Data = context.Exception.Data
                };
            }

            var result = new ContentResult
            {
                StatusCode = context.Exception is ValidationException ? 400 : 500,
                Content = JsonConvert.SerializeObject(response),
                ContentType = "application/json",
            };

            context.Result = result;
        }

        private class ErrorResponse
        {
            public string Message { get; set; }
            public string StackTrace { get; set; }
            public string Type { get; set; }
            public IDictionary Data { get; set; }
        }
    }
}