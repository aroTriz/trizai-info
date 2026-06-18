$repoDir = "C:\Triz\integrations\trizai-info"
$files = @("roles.html","skills.html","architecture.html","stack.html","design.html","stash.html")

foreach ($file in $files) {
    $path = Join-Path $repoDir $file
    $content = [System.IO.File]::ReadAllBytes($path)
    $text = [System.Text.Encoding]::UTF8.GetString($content)
    
    $text = $text -replace 'Team Tris', 'TRIZAI'
    $text = $text -replace 'TEAM TRIS', 'TRIZAI'
    $text = $text -replace 'One Team, One Goal', 'God of the Tech Field'
    $text = $text -replace 'We are Team Tris', 'I am TRIZAI'
    
    [System.IO.File]::WriteAllBytes($path, [System.Text.Encoding]::UTF8.GetBytes($text))
    Write-Output ("Fixed: " + $file)
}

Write-Output "DONE"
