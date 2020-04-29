using DataBase.DtoModels.Contact;
using FluentValidation;

namespace API.Validations
{
    public class CreateContactRequestValidator : AbstractValidator<CreateEntityRequest>
    {
        public CreateContactRequestValidator()
        {
            RuleFor(i => i.Name).NotEmpty().Matches("[a-zA-Zа-яА-Я0-9]{1,}").WithMessage("Имя должно состоять только из букв и цифр");
        }
    }
}