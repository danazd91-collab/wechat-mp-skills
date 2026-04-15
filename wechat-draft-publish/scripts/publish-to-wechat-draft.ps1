param(
    [Parameter(Mandatory = $true)]
    [string]$Title,

    [string]$Author = "",

    [string]$Digest = "",

    [string]$ContentHtml = "",

    [string]$ContentFile = "",

    [string]$ThumbMediaId = "",

    [string]$CoverImagePath = "",

    [string]$ContentSourceUrl = "",

    [string]$ServiceUrl = "http://127.0.0.1:8787/api/drafts"
)

if (-not $ContentHtml -and -not $ContentFile) {
    throw "Provide either -ContentHtml or -ContentFile."
}

if ($ContentFile) {
    $ContentHtml = Get-Content -LiteralPath $ContentFile -Raw -Encoding UTF8
}

if (-not $ThumbMediaId -and -not $CoverImagePath) {
    throw "Provide either -ThumbMediaId or -CoverImagePath."
}

$resolvedContentFile = ""
if ($ContentFile) {
    $resolvedContentFile = (Resolve-Path -LiteralPath $ContentFile).Path
}

$resolvedCoverImagePath = ""
if ($CoverImagePath) {
    if (-not (Test-Path -LiteralPath $CoverImagePath)) {
        throw "Cover image not found: $CoverImagePath"
    }
    $resolvedCoverImagePath = (Resolve-Path -LiteralPath $CoverImagePath).Path
}

$payload = @{
    title = $Title
    author = $Author
    digest = $Digest
    content = $ContentHtml
    thumbMediaId = $ThumbMediaId
    coverImagePath = $resolvedCoverImagePath
    contentSourceUrl = $ContentSourceUrl
}

$json = $payload | ConvertTo-Json -Depth 5
try {
    $result = Invoke-RestMethod -Method Post -Uri $ServiceUrl -ContentType "application/json; charset=utf-8" -Body $json
}
catch {
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $body = $reader.ReadToEnd()
        throw "Draft publish failed. Service response: $body"
    }

    throw
}

[PSCustomObject]@{
    ok = $result.ok
    mediaId = $result.mediaId
    articleCount = $result.articleCount
    title = $Title
    contentFile = $resolvedContentFile
    coverImagePath = $resolvedCoverImagePath
}
