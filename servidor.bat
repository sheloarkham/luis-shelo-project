@echo off
echo ================================
echo    INICIANDO SERVIDOR LOCAL
echo ================================
echo.
echo Abriendo servidor en: http://127.0.0.1:8000
echo.
echo Para detener el servidor presiona Ctrl+C
echo.
cd /d "c:\Users\Asus\Documents\Mio\Pag"
start http://127.0.0.1:8000
python -m http.server 8000