$urls = @{
    "earth-night.jpg" = "https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.3600x1800.jpg"
    "earth-topology.jpg" = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg"
}

$outputDir = "public"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir
}

foreach ($texture in $urls.GetEnumerator()) {
    $outputPath = Join-Path $outputDir $texture.Key
    Write-Host "Downloading $($texture.Key)..."
    Invoke-WebRequest -Uri $texture.Value -OutFile $outputPath
    Write-Host "Downloaded to $outputPath"
}
