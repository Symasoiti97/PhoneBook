using DataBase.DtoModels.Contact;
using FluentValidation;

namespace API.Validations
{
    public class UpdateContactRequestValidator : AbstractValidator<UpdateContactRequest>
    {
        public UpdateContactRequestValidator()
        {
            //RuleFor(i => i.Name).NotEmpty().WithMessage("Некорректный формат имени");
        }
    }
}