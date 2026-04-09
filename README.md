## Passos executados para criar o Back End

1. Program.cs:
   - `builder.Services.AddControllers()`
   - `builder.Services.AddDbContext<AppDbContext>(...)`
   - `builder.Services.AddCors(...)`
   - `builder.Services.AddEndpointsApiExplorer()`
   - `builder.Services.AddSwaggerGen()`
   - `builder.WebHost.ConfigureKestrel(...)` para ouvir em `http://localhost:5243` e `https://localhost:7243`
   - `app.UseSwagger()` e `app.UseSwaggerUI()` em desenvolvimento
   - `app.UseHttpsRedirection()`, `app.UseAuthorization()`, `app.UseCors("AllowAngular")`, `app.MapControllers()`

2. Configurar o appsettings.json para SQL Server Express:
   - `Server=DESKTOP-GHARTDD\\SQLEXPRESS;Database=TarefasDB;Trusted_Connection=True;TrustServerCertificate=True;`

3. Criar e aplicar migrações do Entity Framework Core:
   - pasta Migrations com `InitialCreate`
   - comando: `dotnet ef database update`

4. Testar a API com Swagger:
   - `https://localhost:7243/swagger`
   - `http://localhost:5243/swagger`
   - `GET /api/tarefas` retornou lista vazia, confirmando que a API está funcionando.

5. Corrigi erros:
   - `CS0103` por `builder` e `app` ausentes
   - `CS1061` em `UseSwagger()`/`UseSwaggerUI()` por falta de `AddSwaggerGen()`
   - `Failed to determine the https port for redirect`
   - `ERR_CONNECTION_REFUSED` por portas incorretas

## Como rodar o backend

1. Entre na pasta TarefasAPI
2. Instale `dotnet ef` se precisar:
   - `dotnet tool install --global dotnet-ef`
3. Adicione pacote de design se necessário:
   - `dotnet add package Microsoft.EntityFrameworkCore.Design`
4. Aplique migrações:
   - `dotnet ef database update`
5. Rode a API:
   - `dotnet run`
6. Acesse o Swagger:
   - `https://localhost:7243/swagger`
   - ou `http://localhost:5243/swagger`

## Endpoints principais

- `GET /api/tarefas`
- `GET /api/tarefas/{id}`
- `POST /api/tarefas`
- `PUT /api/tarefas/{id}`
- `DELETE /api/tarefas/{id}`

## Observações

- Use HTTPS em `https://localhost:7243`
- Ajuste appsettings.json e launchSettings.json se quiser mudar as portas
- A API já está com CORS para `http://localhost:4200`