@echo off
REM Forzar cambio al directorio del script
cd /d "%~dp0"
cls

echo ================================
echo    INICIANDO SERVIDOR LOCAL
echo ================================
echo.
echo 📁 Directorio: %CD%
echo 🌐 URL: http://localhost:8000
echo.
echo ⏹️  Para detener: Ctrl+C
echo ================================
echo.

REM Verificar archivos críticos
if not exist "shared-navbar.js" (
    echo ❌ ERROR: Archivo shared-navbar.js no encontrado
    echo 📂 Directorio actual: %CD%
    echo 🔍 Archivos disponibles:
    dir /b *.js *.html
    echo.
    echo ⚠️  Ejecute desde la carpeta raíz del proyecto
    pause
    exit /b 1
)

if not exist "Presupuestos\index.html" (
    echo ❌ ERROR: Carpeta Presupuestos no encontrada
    echo 📂 Directorio actual: %CD%
    echo 🔍 Carpetas disponibles:
    dir /b /ad
    pause
    exit /b 1
)

echo ✅ Verificación completada
echo ✅ Todos los archivos encontrados
echo.
echo 🚀 Iniciando servidor Python...
echo.

REM Abrir navegador en segundo plano
start /b "" "http://localhost:8000"

REM Iniciar servidor
python -m http.server 8000

REM Si llegamos aquí, el servidor se detuvo
echo.
echo 🛑 Servidor detenido
pause