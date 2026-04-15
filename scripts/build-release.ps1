param(
    [string]$SkillName = "wechat-draft-publish"
)

$repoRoot = Split-Path -Parent $PSScriptRoot
$skillDir = Join-Path $repoRoot $SkillName
$releaseDir = Join-Path $repoRoot "releases"
$skillPackagePath = Join-Path $releaseDir "$SkillName.skill"
$tempZipPath = Join-Path ([System.IO.Path]::GetTempPath()) ("{0}-{1}.zip" -f $SkillName, [guid]::NewGuid().ToString("N"))

if (-not (Test-Path -LiteralPath $skillDir)) {
    throw "Skill directory not found: $skillDir"
}

New-Item -ItemType Directory -Force -Path $releaseDir | Out-Null

if (Test-Path -LiteralPath $skillPackagePath) {
    Remove-Item -LiteralPath $skillPackagePath -Force
}

if (Test-Path -LiteralPath $tempZipPath) {
    Remove-Item -LiteralPath $tempZipPath -Force
}

Compress-Archive -Path (Join-Path $skillDir '*') -DestinationPath $tempZipPath -Force
Copy-Item -LiteralPath $tempZipPath -Destination $skillPackagePath -Force
Remove-Item -LiteralPath $tempZipPath -Force

[PSCustomObject]@{
    ok = $true
    skill = $SkillName
    package = $skillPackagePath
}
