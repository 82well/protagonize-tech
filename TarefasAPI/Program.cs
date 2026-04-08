using Microsoft.EntityFrameworkCore;
using TarefasAPI.Data;
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adicione também CORS para o Angular conseguir se comunicar:
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// E no pipeline (depois do builder.Build()):
app.UseCors("AllowAngular");