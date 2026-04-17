param(
    [string]$Title = "",

    [Parameter(Mandatory = $true)]
    [string]$MarkdownFile,

    [ValidateSet("minimal", "official", "khazix", "bijixia")]
    [string]$Theme = "minimal",

    [string]$CoverImagePath = "",

    [string]$ThumbMediaId = "",

    [string]$Author = "",

    [string]$Digest = ""
)

function Get-MarkdownTitle {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $lines = Get-Content -LiteralPath $Path -Encoding UTF8
    foreach ($line in $lines) {
        if ($line -match '^\s*#\s+(.+?)\s*$') {
            return $matches[1].Trim()
        }
    }

    foreach ($line in $lines) {
        if (-not [string]::IsNullOrWhiteSpace($line)) {
            return $line.Trim()
        }
    }

    throw "Could not extract a title from MarkdownFile."
}

$tempHtml = Join-Path ([System.IO.Path]::GetTempPath()) ("wechat-draft-" + [System.Guid]::NewGuid().ToString() + ".html")
$converter = Join-Path $PSScriptRoot "markdown-to-wechat-html.mjs"
$publisher = Join-Path $PSScriptRoot "publish-to-wechat-draft.ps1"

if (-not (Test-Path -LiteralPath $MarkdownFile)) {
    throw "Markdown file not found: $MarkdownFile"
}

if ($CoverImagePath -and -not (Test-Path -LiteralPath $CoverImagePath)) {
    throw "Cover image not found: $CoverImagePath"
}

if (-not $CoverImagePath -and -not $ThumbMediaId) {
    throw "Provide either -CoverImagePath or -ThumbMediaId."
}

try {
    if (-not $Title) {
        $Title = Get-MarkdownTitle -Path $MarkdownFile
    }

    node $converter $MarkdownFile $tempHtml $Theme

    $invokeParams = @{
        Title = $Title
        ContentFile = $tempHtml
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

    $result = & $publisher @invokeParams

    [PSCustomObject]@{
        ok = $result.ok
        mediaId = $result.mediaId
        articleCount = $result.articleCount
        title = $Title
        theme = $Theme
    }
}
finally {
    if (Test-Path $tempHtml) {
        Remove-Item -LiteralPath $tempHtml -Force
    }
}
