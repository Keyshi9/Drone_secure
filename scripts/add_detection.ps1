$url = "http://localhost:5000/api/detections"
$types = @("DJI Mavic 3", "Autel Evo II", "Parrot Anafi", "DIY FPV")
$statuses = @("threat", "friendly", "unknown")

$lat = 48.8566 + (Get-Random -Minimum -0.01 -Maximum 0.01)
$lon = 2.3522 + (Get-Random -Minimum -0.01 -Maximum 0.01)
$rssi = Get-Random -Minimum -90 -Maximum -30

$body = @{
    frequency = if ((Get-Random) % 2 -eq 0) { "2.4 GHz" } else { "5.8 GHz" }
    rssi = $rssi
    position_gps = "$("{0:N4}" -f $lat),$("{0:N4}" -f $lon)"
    drone_id = "DRONE-$(Get-Random -Minimum 1000 -Maximum 9999)"
    detection_type = $types | Get-Random
    status = if ($rssi -gt -50) { "threat" } else { $statuses | Get-Random }
} | ConvertTo-Json

Write-Host "Envoi d'une détection..."
try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Succès! ID: $($response.id)" -ForegroundColor Green
    Write-Host "Données: $body" -ForegroundColor Gray
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
}
