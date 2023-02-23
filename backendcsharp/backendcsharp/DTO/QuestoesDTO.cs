﻿namespace backendcsharp.DTO;

public partial class QuestoesDTO
{
    public uint? id { get; set; } = null!;

    public uint numero { get; set; }

    public int type { get; set; }

    public uint? formId { get; set; } = null!;

    public string? enunciado { get; set; } = null!;

    public string? opcao1 { get; set; } = null!;

    public string? opcao2 { get; set; } = null!;

    public string? opcao3 { get; set; } = null!;

    public string? opcao4 { get; set; } = null!;

    public string? opcao5 { get; set; } = null!; 

    public string? opcao6 { get; set; } = null!;

    public string? opcao7 { get; set; } = null!;

    public string? opcao8 { get; set; } = null!;

    public string? opcao9 { get; set; } = null!;

    public string? opcao10 { get; set; } = null!;

    public virtual ICollection<CheckboxDTO> checkboxes { get; } = new List<CheckboxDTO>();

    public virtual FormularioDTO? form { get; set; } = null!;

    public virtual ICollection<RadioboxDTO> radioboxes { get; } = new List<RadioboxDTO>();

    public virtual ICollection<TextDTO> texts { get; } = new List<TextDTO>();
}
