using DataBase.DtoModels.Group;
using FluentValidation;

namespace API.Validations
{
    public class CreateGroupRequestValidator : AbstractValidator<CreateGroupRequest>
    {
        public CreateGroupRequestValidator()
        {
            RuleFor(i => i.Name).NotEmpty().Matches("[a-zA-Zа-яА-Я0-9]{1,}").WithMessage("Имя должно состоять только из букв и цифр");
        }
    }
}