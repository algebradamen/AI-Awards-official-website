
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $url = "https://en.wikipedia.org/api/rest_v1/page/summary/Larus_fuscus"
    $res = Invoke-RestMethod -Uri $url -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    Write-Host "Suksess! Fant: $($res.title)" -ForegroundColor Green
} catch {
    Write-Host "FEILMELDING: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.InnerException) {
        Write-Host "INDRE FEIL: $($_.Exception.InnerException.Message)" -ForegroundColor Red
    }
}
