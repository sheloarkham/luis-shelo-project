# Servidor Local para Luis Shelo Project - Versión Mejorada
# Este script SIEMPRE inicia desde la ubicación correcta

param()

# Limpiar pantalla
Clear-Host

# Forzar cambio al directorio del script
$ScriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $ScriptDirectory -ErrorAction Stop

Write-Host "================================" -ForegroundColor Cyan
Write-Host "   SERVIDOR LUIS SHELO PROJECT" -ForegroundColor Cyan  
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Directorio: $(Get-Location)" -ForegroundColor White
Write-Host "🌐 URL: http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "⏹️  Para detener: Ctrl+C" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Función de verificación completa
function Test-ProjectStructure {
    $errors = @()
    
    if (-not (Test-Path "shared-navbar.js")) {
        $errors += "❌ shared-navbar.js no encontrado"
    }
    
    if (-not (Test-Path "shared-styles.css")) {
        $errors += "❌ shared-styles.css no encontrado"
    }
    
    $folders = @("Presupuestos", "Proyecto", "Ocio", "Home", "Yeni 💞")
    foreach ($folder in $folders) {
        if (-not (Test-Path $folder)) {
            $errors += "❌ Carpeta '$folder' no encontrada"
        }
    }
    
    if ($errors.Count -gt 0) {
        Write-Host "🚨 ERRORES DETECTADOS:" -ForegroundColor Red
        $errors | ForEach-Object { Write-Host "   $_" -ForegroundColor Red }
        Write-Host ""
        Write-Host "📂 Contenido actual:" -ForegroundColor Yellow
        Get-ChildItem | ForEach-Object { Write-Host "   $($_.Name)" -ForegroundColor Gray }
        Write-Host ""
        Write-Host "💡 Ejecute desde: C:\Users\Asus\Documents\Mio\Pag\luis-shelo-project" -ForegroundColor Yellow
        return $false
    }
    
    return $true
}

# Verificar estructura del proyecto
if (-not (Test-ProjectStructure)) {
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "✅ Verificación completada" -ForegroundColor Green
Write-Host "✅ Estructura del proyecto correcta" -ForegroundColor Green
Write-Host ""

# Abrir navegador
try {
    Start-Process "http://localhost:8000" -ErrorAction Stop
    Write-Host "🌐 Navegador abierto automáticamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Navegador no pudo abrirse automáticamente" -ForegroundColor Yellow
    Write-Host "   Abra manualmente: http://localhost:8000" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🚀 Iniciando servidor Python..." -ForegroundColor Cyan
Write-Host ""

# Iniciar servidor
try {
    & python -m http.server 8000
} catch {
    Write-Host ""
    Write-Host "❌ Error al iniciar servidor" -ForegroundColor Red
    Write-Host "💡 Verifique que Python esté instalado" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host ""
Write-Host "🛑 Servidor detenido" -ForegroundColor Yellow
Read-Host "Presiona Enter para salir"