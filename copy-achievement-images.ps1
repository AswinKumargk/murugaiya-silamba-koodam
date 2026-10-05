# Copy new achievement images from project root to public/
# Run this script after adding i10.jpeg, i11.jpeg, i12.jpeg, i13.jpeg to the root folder.

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$public = Join-Path $root "public"

$images = @("i10.jpeg", "i11.jpeg", "i12.jpeg", "i13.jpeg")

foreach ($img in $images) {
    $src = Join-Path $root $img
    $dst = Join-Path $public $img
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        Write-Host "Copied $img to public/" -ForegroundColor Green
    } else {
        Write-Host "$img not found in project root - please add it first." -ForegroundColor Red
    }
}

Write-Host "Done. Refresh the browser to see the new achievement images." -ForegroundColor Cyan
