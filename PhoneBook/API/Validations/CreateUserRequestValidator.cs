using DataBase.DtoModels.User;
using FluentValidation;

namespace API.Validations
{
    public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
    {
        public CreateUserRequestValidator()
        {
            RuleFor(i => i.Email).EmailAddress().WithMessage("Не корректный формат email");
            RuleFor(i => i.Password).NotEmpty().Matches("[a-zA-Z0-9]{1,}").WithMessage("Не корректный пароль. Пароль может содержать только латинские буквы и цифры");
        }
    }
}