using System.ComponentModel.DataAnnotations;

namespace TarefasAPI.Models;

public class Tarefa
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Titulo { get; set; } = string.Empty;

    [StringLength(500)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    [RegularExpression("Pendente|Concluída", ErrorMessage = "Status deve ser 'Pendente' ou 'Concluída'.")]
    public string Status { get; set; } = "Pendente"; // "Pendente" ou "Concluída"

    public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
}