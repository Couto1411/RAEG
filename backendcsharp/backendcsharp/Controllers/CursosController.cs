﻿using Microsoft.AspNetCore.Mvc;
using backendcsharp.Entities;
using backendcsharp.DTO;
using Microsoft.AspNetCore.Authorization;
using backendcsharp.Handles;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backendcsharp.Controllers
{
    [ApiController]
    public class CursosController : Controller
    {
        private readonly ProjetoDbContext ProjetoDbContext;

        public CursosController(ProjetoDbContext ProjetoDbContext)
        {
            this.ProjetoDbContext = ProjetoDbContext;
        }
        public class ObjetoCursos
        {
            public uint? UserId { get; set; }
            public List<ModalidadesDTO> ListaModalidades { get; set; } = new List<ModalidadesDTO>();
            public List<CursosDTO> ListaCursos { get; set; } = new List<CursosDTO>();
        }

        // Adicionar Cursos e suas modalidades a ser enviado
        [HttpPost("users/{Id}/cursos")]
        [Authorize("Bearer")]
        public async Task<ActionResult> InsertCursos([FromBody] ObjetoCursos ListaCurso, [FromRoute] int Id)
        {
            try
            {
                Handlers.ExistsOrError(Id.ToString(), "Id do usuário não informado");
                Handlers.IdNegative(Id, "Id do usuário inválido");

                HashSet<string> cursosDB = new (await ProjetoDbContext.Cursos.Where(s=>s.ResponsavelId==Id).Select(c=>c.Curso).ToListAsync());
                HashSet<string> modalidadeDB = new (await ProjetoDbContext.Modalidades.Where(s => s.ResponsavelId == Id).Select(c => c.Modalidade).ToListAsync());

                foreach (var item in ListaCurso.ListaCursos)
                {
                    var entity = new Cursos()
                    {
                        Curso = item.Curso is not null ? item.Curso: throw new Exception("Um dos itens não possui nome do curso"),
                        ResponsavelId = (uint)Id
                    };
                    if (!cursosDB.Contains(entity.Curso))
                    {
                        ProjetoDbContext.Cursos.Add(entity);
                    }
                }
                foreach (var item in ListaCurso.ListaModalidades)
                {
                    var entity = new Modalidades()
                    {
                        Modalidade = item.Modalidade is not null ? item.Modalidade : throw new Exception("Um dos itens não possui nome da modalidade"),
                        ResponsavelId = (uint)Id
                    };
                    if (!modalidadeDB.Contains(entity.Modalidade))
                    {
                        ProjetoDbContext.Modalidades.Add(entity);
                    }
                }
                await ProjetoDbContext.SaveChangesAsync();
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Modificar Curso
        [HttpPut("users/{Id}/curso/{CursoId}")]
        [Authorize("Bearer")]
        public async Task<ActionResult> UpdateCurso([FromBody] CursosDTO Curso, [FromRoute] int Id, [FromRoute] int CursoId)
        {
            try
            {
                Handlers.ExistsOrError(Curso.Curso, "Curso não informado");
                Handlers.ExistsOrError(Id.ToString(), "Id do responsável não informado");
                Handlers.IdNegative(Id, "Id do usuário inválido");
                Handlers.ExistsOrError(CursoId.ToString(), "Id do curso não informado");
                Handlers.IdNegative(CursoId, "Id do curso inválido");
                Curso.Id = ((uint)CursoId);
                Curso.ResponsavelId = ((uint)Id);
                if (Curso.Id is not null)
                {
                    var entity = await ProjetoDbContext.Cursos.FirstOrDefaultAsync(s => s.Id == CursoId);
                    if (entity != null)
                    {
                        entity.Curso = Curso.Curso is null?"": Curso.Curso;
                        entity.ResponsavelId = Curso.ResponsavelId ?? throw new Exception("Responsavel id não existe");
                        await ProjetoDbContext.SaveChangesAsync();
                        return StatusCode(204);
                    }
                    else throw new Exception("Id não encontrado (UpdateCurso)");
                }
                else throw new Exception("Curso não informado");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Modificar Modalidade
        [HttpPut("users/{Id}/modalidade/{CursoId}")]
        [Authorize("Bearer")]
        public async Task<ActionResult> UpdateModalidade([FromBody] ModalidadesDTO Curso, [FromRoute] int Id, [FromRoute] int CursoId)
        {
            try
            {
                Handlers.ExistsOrError(Curso.Modalidade, "Modalidade não informada");
                Handlers.ExistsOrError(Id.ToString(), "Id do responsável não informado");
                Handlers.IdNegative(Id, "Id do usuário inválido");
                Handlers.ExistsOrError(CursoId.ToString(), "Id do curso não informado");
                Handlers.IdNegative(CursoId, "Id do curso inválido");
                Curso.Id = ((uint)CursoId);
                Curso.ResponsavelId = ((uint)Id);
                if (Curso.Id is not null)
                {
                    var entity = await ProjetoDbContext.Modalidades.FirstOrDefaultAsync(s => s.Id == CursoId);
                    if (entity != null)
                    {
                        entity.Modalidade = Curso.Modalidade is null ? "" : Curso.Modalidade;
                        entity.ResponsavelId = Curso.ResponsavelId ?? throw new Exception("Responsavel id não existe");
                        await ProjetoDbContext.SaveChangesAsync();
                        return StatusCode(204);
                    }
                    else throw new Exception("Id não encontrado (UpdateModalidade)");
                }
                else throw new Exception("Modalidade não informada");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Adicionar Cursos e suas modalidades a ser enviado
        [HttpGet("users/{Id}/cursos")]
        [Authorize("Bearer")]
        public async Task<ActionResult<ObjetoCursos>> GetCursos([FromRoute] int Id)
        {
            try
            {
                ObjetoCursos listaResposta = new();
                Handlers.ExistsOrError(Id.ToString(), "Id do usuário não informado");
                Handlers.IdNegative(Id, "Id do usuário inválido");
                listaResposta.ListaCursos = await ProjetoDbContext.Cursos
                    .Select(s => new CursosDTO
                    {
                        Id = s.Id,
                        Curso = s.Curso,
                        ResponsavelId = s.ResponsavelId
                    })
                    .Where(s => s.ResponsavelId == Id)
                    .ToListAsync();
                listaResposta.ListaModalidades = await ProjetoDbContext.Modalidades
                    .Select(s => new ModalidadesDTO
                    {
                        Id = s.Id,
                        Modalidade = s.Modalidade,
                        ResponsavelId = s.ResponsavelId
                    })
                    .Where(s => s.ResponsavelId == Id)
                    .ToListAsync() ;
                return listaResposta;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Deleta Curso 
        [HttpDelete("users/{Id}/curso/{CursoId}")]
        [Authorize("Bearer")]
        public async Task<ActionResult> DeleteCurso([FromRoute] int CursoId)
        {
            try
            {
                Handlers.ExistsOrError(CursoId.ToString(), "Id do curso não informado");
                Handlers.IdNegative(CursoId, "Id do curso inválido");
                var entity = new Cursos()
                {
                    Id = ((uint)CursoId)
                };
                ProjetoDbContext.Cursos.Remove(entity);
                await ProjetoDbContext.SaveChangesAsync();
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Deleta Modalidade 
        [HttpDelete("users/{Id}/modalidade/{CursoId}")]
        [Authorize("Bearer")]
        public async Task<ActionResult> DeleteModalidade([FromRoute] int CursoId)
        {
            try
            {
                Handlers.ExistsOrError(CursoId.ToString(), "Id do curso não informado");
                Handlers.IdNegative(CursoId, "Id do curso inválido");
                var entity = new Modalidades()
                {
                    Id = ((uint)CursoId)
                };
                ProjetoDbContext.Modalidades.Remove(entity);
                await ProjetoDbContext.SaveChangesAsync();
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}