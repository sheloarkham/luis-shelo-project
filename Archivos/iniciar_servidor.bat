REM ========================================================
REM ARCHIVO: iniciar_servidor.bat - Script de Inicio del Servidor
REM PROPÓSITO: Automatiza el inicio del servidor HTTP local de Python
REM           para el desarrollo y pruebas del proyecto Luis Shelo.
REM           Inicia el servidor en puerto 8000 y abre automáticamente
REM           el navegador en la página principal del proyecto.
REM ========================================================
@echo off
echo ================================
echo    INICIANDO SERVIDOR LOCAL
echo ================================
echo.
echo Abriendo servidor en: http://127.0.0.1:8000
echo.
echo Para detener el servidor presiona Ctrl+C
echo.
cd /d "%~dp0"
cd ..
start http://127.0.0.1:8000/Archivos/
python -m http.server 8000