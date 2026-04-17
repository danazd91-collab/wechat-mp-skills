param(
    [Parameter(Mandatory = $true)]
    [string]$MarkdownFile,

    [string]$Title = "",

    [ValidateSet("minimal", "official", "khazix", "bijixia")]
    [string]$Theme = "minimal",

    [string]$CoverImagePath = "",

    [string]$ThumbMediaId = "",

    [string]$Author = "",

    [string]$Digest = ""
)

function Test-BridgeHealth {
    param(
        [string]$Url = "http://127.0.0.1:8787/health"
    )

    try {
        return Invoke-RestMethod -Uri $Url -Method Get -TimeoutSec 5
    }
    catch {
        throw "WeChat draft bridge is not reachable at $Url. Start the service with start-wechat-draft-service.ps1 first."
    }
}

$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Get-Content -LiteralPath $envFile -Encoding UTF8 | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*)=(.*)$') {
            [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
        }
    }
}

if (-not (Test-Path -LiteralPath $MarkdownFile)) {
    throw "Markdown file not found: $MarkdownFile"
}

if ($CoverImagePath -and -not (Test-Path -LiteralPath $CoverImagePath)) {
    throw "Cover image not found: $CoverImagePath"
}

if (-not $CoverImagePath -and -not $ThumbMediaId) {
    throw "Provide either -CoverImagePath or -ThumbMediaId."
}

$health = Test-BridgeHealth

$script = Join-Path $PSScriptRoot "scripts\publish-markdown-to-wechat-draft.ps1"
$invokeParams = @{
    MarkdownFile = $MarkdownFile
    Theme = $Theme
}

if ($Title) {
    $invokeParams.Title = $Title
}

if ($CoverImagePath) {
    $invokeParams.CoverImagePath = $CoverImagePath
}

if ($ThumbMediaId) {
    $invokeParams.ThumbMediaId = $ThumbMediaId
}

if ($Author) {
    $invokeParams.Author = $Author
}

if ($Digest) {
    $invokeParams.Digest = $Digest
}

$publishResult = & $script @invokeParams

[PSCustomObject]@{
    ok = $publishResult.ok
    mediaId = $publishResult.mediaId
    articleCount = $publishResult.articleCount
    title = if ($publishResult.title) { $publishResult.title } else { $Title }
    theme = if ($publishResult.theme) { $publishResult.theme } else { $Theme }
    markdownFile = (Resolve-Path -LiteralPath $MarkdownFile).Path
    coverImagePath = if ($CoverImagePath) { (Resolve-Path -LiteralPath $CoverImagePath).Path } else { "" }
    service = $health.service
}
