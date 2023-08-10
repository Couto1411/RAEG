﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backendcsharp.Entities;

#nullable disable

namespace backendcsharp.Migrations
{
    [DbContext(typeof(ProjetoDbContext))]
    partial class ProjetoDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backendcsharp.Entities.Checkbox", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<bool?>("Opcao1")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao1");

                    b.Property<bool?>("Opcao10")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao10");

                    b.Property<bool?>("Opcao2")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao2");

                    b.Property<bool?>("Opcao3")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao3");

                    b.Property<bool?>("Opcao4")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao4");

                    b.Property<bool?>("Opcao5")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao5");

                    b.Property<bool?>("Opcao6")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao6");

                    b.Property<bool?>("Opcao7")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao7");

                    b.Property<bool?>("Opcao8")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao8");

                    b.Property<bool?>("Opcao9")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("opcao9");

                    b.Property<uint>("QuestaoId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("questaoId");

                    b.Property<uint>("RespostaId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("respostaId");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "QuestaoId" }, "checkbox_questaoid_foreign");

                    b.HasIndex(new[] { "RespostaId" }, "checkbox_respostaid_foreign");

                    b.ToTable("checkbox", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Cursos", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<string>("Curso")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("curso");

                    b.Property<uint>("ResponsavelId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("responsavelId");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "ResponsavelId" }, "cursos_responsavelid_foreign");

                    b.ToTable("cursos", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Destinatario", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<string>("Cpf")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("cpf");

                    b.Property<string>("Curso")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("curso");

                    b.Property<DateTime?>("DataColacao")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("datacolacao");

                    b.Property<string>("Email")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("email");

                    b.Property<uint>("FormId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("formId");

                    b.Property<string>("Matricula")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("matricula");

                    b.Property<string>("Modalidade")
                        .HasMaxLength(1)
                        .HasColumnType("varchar(1)")
                        .HasColumnName("tipodecurso");

                    b.Property<string>("Nome")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("nome");

                    b.Property<short>("Respondido")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint")
                        .HasDefaultValue((short)0)
                        .HasColumnName("respondido");

                    b.Property<string>("Sexo")
                        .HasMaxLength(1)
                        .HasColumnType("varchar(1)")
                        .HasColumnName("sexo");

                    b.Property<string>("Telefone1")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("telefone1");

                    b.Property<string>("Telefone2")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("telefone2");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "Email", "FormId", "Matricula" }, "email_UNIQUE")
                        .IsUnique();

                    b.HasIndex(new[] { "FormId" }, "enviados_formid_foreign");

                    b.ToTable("enviados", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Formulario", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<DateTime?>("DataEnviado")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("dataEnviado");

                    b.Property<uint?>("DerivadoDeId")
                        .HasColumnType("int unsigned");

                    b.Property<string>("MsgEmail")
                        .HasColumnType("longtext")
                        .HasColumnName("msgEmail");

                    b.Property<short>("Notificacao")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint")
                        .HasDefaultValue((short)0)
                        .HasColumnName("notificacao");

                    b.Property<uint>("ResponsavelId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("responsavelId");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("titulo");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "DerivadoDeId" }, "formularios_derivadodeid_foreign");

                    b.HasIndex(new[] { "ResponsavelId" }, "formularios_responsavelid_foreign");

                    b.ToTable("formularios", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Modalidades", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<string>("Modalidade")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("tipo_curso");

                    b.Property<uint>("ResponsavelId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("responsavelId");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "ResponsavelId" }, "tipocursos_responsavelid_foreign");

                    b.ToTable("tipos_cursos", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Questoes", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<uint?>("DerivadaDeId")
                        .HasColumnType("int unsigned");

                    b.Property<uint?>("DerivadaDeOpcao")
                        .HasColumnType("int unsigned")
                        .HasColumnName("derivadaDeOpcao");

                    b.Property<string>("Enunciado")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("enunciado");

                    b.Property<uint>("FormId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("formId");

                    b.Property<uint>("Numero")
                        .HasColumnType("int unsigned")
                        .HasColumnName("numero");

                    b.Property<short>("Obrigatoria")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint")
                        .HasDefaultValue((short)1)
                        .HasColumnName("obrigatoria");

                    b.Property<string>("Opcao1")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao1");

                    b.Property<string>("Opcao10")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao10");

                    b.Property<string>("Opcao2")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao2");

                    b.Property<string>("Opcao3")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao3");

                    b.Property<string>("Opcao4")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao4");

                    b.Property<string>("Opcao5")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao5");

                    b.Property<string>("Opcao6")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao6");

                    b.Property<string>("Opcao7")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao7");

                    b.Property<string>("Opcao8")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao8");

                    b.Property<string>("Opcao9")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("opcao9");

                    b.Property<int>("Type")
                        .HasColumnType("int")
                        .HasColumnName("type");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "DerivadaDeId" }, "questoes_derivadodeid_foreign");

                    b.HasIndex(new[] { "FormId" }, "questoes_formid_foreign");

                    b.ToTable("questoes", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Radiobox", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<uint>("QuestaoId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("questaoId");

                    b.Property<int?>("Radio")
                        .HasColumnType("int")
                        .HasColumnName("radio");

                    b.Property<uint>("RespostaId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("respostaId");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "QuestaoId" }, "radiobox_questaoid_foreign");

                    b.HasIndex(new[] { "RespostaId" }, "radiobox_respostaid_foreign");

                    b.ToTable("radiobox", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Text", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<uint>("QuestaoId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("questaoId");

                    b.Property<uint>("RespostaId")
                        .HasColumnType("int unsigned")
                        .HasColumnName("respostaId");

                    b.Property<string>("Texto")
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("texto");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "QuestaoId" }, "text_questaoid_foreign");

                    b.HasIndex(new[] { "RespostaId" }, "text_respostaid_foreign");

                    b.ToTable("text", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Users", b =>
                {
                    b.Property<uint>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int unsigned")
                        .HasColumnName("id");

                    b.Property<bool>("Admin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasDefaultValue(false)
                        .HasColumnName("admin");

                    b.Property<string>("AppPassword")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("apppassword");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("email");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("nome");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("senha");

                    b.Property<string>("Universidade")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("universidade");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "Email" }, "users_email_unique")
                        .IsUnique();

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("backendcsharp.Entities.Checkbox", b =>
                {
                    b.HasOne("backendcsharp.Entities.Questoes", "Questao")
                        .WithMany("Checkboxes")
                        .HasForeignKey("QuestaoId")
                        .IsRequired()
                        .HasConstraintName("checkbox_questaoid_foreign");

                    b.HasOne("backendcsharp.Entities.Destinatario", "Resposta")
                        .WithMany("Checkboxes")
                        .HasForeignKey("RespostaId")
                        .IsRequired()
                        .HasConstraintName("checkbox_respostaid_foreign");

                    b.Navigation("Questao");

                    b.Navigation("Resposta");
                });

            modelBuilder.Entity("backendcsharp.Entities.Cursos", b =>
                {
                    b.HasOne("backendcsharp.Entities.Users", "Responsavel")
                        .WithMany("Cursos")
                        .HasForeignKey("ResponsavelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("cursos_responsavelid_foreign");

                    b.Navigation("Responsavel");
                });

            modelBuilder.Entity("backendcsharp.Entities.Destinatario", b =>
                {
                    b.HasOne("backendcsharp.Entities.Formulario", "Form")
                        .WithMany("Enviados")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("enviados_formid_foreign");

                    b.Navigation("Form");
                });

            modelBuilder.Entity("backendcsharp.Entities.Formulario", b =>
                {
                    b.HasOne("backendcsharp.Entities.Formulario", "FormularioOrig")
                        .WithMany("Derivados")
                        .HasForeignKey("DerivadoDeId")
                        .HasConstraintName("formularios_derivadodeid_foreign");

                    b.HasOne("backendcsharp.Entities.Users", "Responsavel")
                        .WithMany("Formularios")
                        .HasForeignKey("ResponsavelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("formularios_responsavelid_foreign");

                    b.Navigation("FormularioOrig");

                    b.Navigation("Responsavel");
                });

            modelBuilder.Entity("backendcsharp.Entities.Modalidades", b =>
                {
                    b.HasOne("backendcsharp.Entities.Users", "Responsavel")
                        .WithMany("Modalidades")
                        .HasForeignKey("ResponsavelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("tipocursos_responsavelid_foreign");

                    b.Navigation("Responsavel");
                });

            modelBuilder.Entity("backendcsharp.Entities.Questoes", b =>
                {
                    b.HasOne("backendcsharp.Entities.Questoes", "QuestaoOrig")
                        .WithMany("Derivadas")
                        .HasForeignKey("DerivadaDeId")
                        .HasConstraintName("questoes_derivadodeid_foreign");

                    b.HasOne("backendcsharp.Entities.Formulario", "Form")
                        .WithMany("Questoes")
                        .HasForeignKey("FormId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("questoes_formid_foreign");

                    b.Navigation("Form");

                    b.Navigation("QuestaoOrig");
                });

            modelBuilder.Entity("backendcsharp.Entities.Radiobox", b =>
                {
                    b.HasOne("backendcsharp.Entities.Questoes", "Questao")
                        .WithMany("Radioboxes")
                        .HasForeignKey("QuestaoId")
                        .IsRequired()
                        .HasConstraintName("radiobox_questaoid_foreign");

                    b.HasOne("backendcsharp.Entities.Destinatario", "Resposta")
                        .WithMany("Radioboxes")
                        .HasForeignKey("RespostaId")
                        .IsRequired()
                        .HasConstraintName("radiobox_respostaid_foreign");

                    b.Navigation("Questao");

                    b.Navigation("Resposta");
                });

            modelBuilder.Entity("backendcsharp.Entities.Text", b =>
                {
                    b.HasOne("backendcsharp.Entities.Questoes", "Questao")
                        .WithMany("Texts")
                        .HasForeignKey("QuestaoId")
                        .IsRequired()
                        .HasConstraintName("text_questaoid_foreign");

                    b.HasOne("backendcsharp.Entities.Destinatario", "Resposta")
                        .WithMany("Texts")
                        .HasForeignKey("RespostaId")
                        .IsRequired()
                        .HasConstraintName("text_respostaid_foreign");

                    b.Navigation("Questao");

                    b.Navigation("Resposta");
                });

            modelBuilder.Entity("backendcsharp.Entities.Destinatario", b =>
                {
                    b.Navigation("Checkboxes");

                    b.Navigation("Radioboxes");

                    b.Navigation("Texts");
                });

            modelBuilder.Entity("backendcsharp.Entities.Formulario", b =>
                {
                    b.Navigation("Derivados");

                    b.Navigation("Enviados");

                    b.Navigation("Questoes");
                });

            modelBuilder.Entity("backendcsharp.Entities.Questoes", b =>
                {
                    b.Navigation("Checkboxes");

                    b.Navigation("Derivadas");

                    b.Navigation("Radioboxes");

                    b.Navigation("Texts");
                });

            modelBuilder.Entity("backendcsharp.Entities.Users", b =>
                {
                    b.Navigation("Cursos");

                    b.Navigation("Formularios");

                    b.Navigation("Modalidades");
                });
#pragma warning restore 612, 618
        }
    }
}
