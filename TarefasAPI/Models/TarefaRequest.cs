using System.ComponentModel.DataAnnotations;

namespace TarefasAPI.Models;

public class CreateTarefaRequest
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Titulo { get; set; } = string.Empty;

    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [RegularExpression("Pendente|Concluída", ErrorMessage = "Status deve ser 'Pendente' ou 'Concluída'.")]
    public string Status { get; set; } = "Pendente";
}

public class UpdateTarefaRequest : CreateTarefaRequest
{
    [Required]
    public int Id { get; set; }
}
