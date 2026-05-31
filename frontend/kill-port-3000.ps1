$port = 3000
Write-Host "Verificando puerto $port..." -ForegroundColor Yellow

try {
    $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    
    if ($connections) {
        $processIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique | Where-Object { $_ -gt 0 }
        
        foreach ($processId in $processIds) {
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Matando proceso: $($process.ProcessName) (PID: $processId)" -ForegroundColor Red
                Stop-Process -Id $processId -Force
                Write-Host "Proceso eliminado exitosamente" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "Puerto $port esta libre" -ForegroundColor Green
    }
} catch {
    Write-Host "Error al verificar puerto: $_" -ForegroundColor Red
}
