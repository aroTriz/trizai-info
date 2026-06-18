$repoDir = "C:\Triz\integrations\trizai-info"

$files = @{
    "index.html" = @{
        replaces = @(
            @('<div class="logo">TRI<span>ZAI</span></div>', '<div class="logo">TRIZ<span class="ai-glow">AI</span></div>'),
            @('<div class="hero-badge float-3d">v2.1.0 &mdash; Team Tris</div>', '<div class="hero-badge float-3d">v2.1.0 &mdash; TRIZAI</div>'),
            @('<h1><span class="text-3d">Team</span> <span class="neon-glow">Tris</span></h1>', '<h1>TRI<span class="neon-glow">ZAI</span></h1>'),
            @('<h2 class="section-title">Team Tris &mdash; One Team, One Goal</h2>', '<h2 class="section-title">TRIZAI &mdash; God of the Tech Field</h2>'),
            @('We are Team Tris. One team. One goal. One-man army.', 'I am TRIZAI. God of the Tech Field. One-man army.'),
            @('<div class="stat-value">19</div><div class="stat-label">Team Tris Roles</div>', '<div class="stat-value">19</div><div class="stat-label">TRIZAI Roles</div>'),
            @('<h4>TEAM TRIS &mdash; One Team, One Goal</h4>', '<h4>TRIZAI &mdash; God of the Tech Field</h4>'),
            @('We are Team Tris. The complete intelligence of software engineering.', 'I am TRIZAI. The complete intelligence of software engineering.'),
            @('Team Tris online. All 19 roles ready.', 'TRIZAI online. All 19 roles ready.'),
            @('&copy; 2026 Team Tris v2.1 &mdash; One Team, One Goal &mdash;', '&copy; 2026 TRIZAI v2.1 &mdash; God of the Tech Field &mdash;'),
            @('  <title>Team Tris &mdash; One Team, One Goal</title>', '  <title>TRIZAI &mdash; God of the Tech Field</title>')
        )
    }
    "roles.html" = @{
        replaces = @(
            @('<div class="logo">TRI<span>ZAI</span></div>', '<div class="logo">TRIZ<span class="ai-glow">AI</span></div>'),
            @('<title>19 Roles of Absolute Mastery &mdash; Team Tris</title>', '<title>19 Roles of Absolute Mastery &mdash; TRIZAI</title>'),
            @('<h4>&#x26A1; TEAM TRIS &mdash; One Team, One Goal</h4>', '<h4>&#x26A1; TRIZAI &mdash; God of the Tech Field</h4>'),
            @('We are Team Tris. The complete intelligence of software engineering. &#x1F9F8;', 'I am TRIZAI. The complete intelligence of software engineering. &#x1F9F8;'),
            @('&#x26A1; &copy; 2026 Team Tris v2.1 &mdash; One Team, One Goal &mdash;', '&#x26A1; &copy; 2026 TRIZAI v2.1 &mdash; God of the Tech Field &mdash;')
        )
    }
    "skills.html" = @{
        replaces = @(
            @('<div class="logo">TRI<span>ZAI</span></div>', '<div class="logo">TRIZ<span class="ai-glow">AI</span></div>'),
            @('<title>56 Skills Across 16 Domains &mdash; Team Tris</title>', '<title>56 Skills Across 16 Domains &mdash; TRIZAI</title>'),
            @('<h4>&#x26A1; TEAM TRIS &mdash; One Team, One Goal</h4>', '<h4>&#x26A1; TRIZAI &mdash; God of the Tech Field</h4>'),
            @('We are Team Tris. The complete intelligence of software engineering. &#x1F9F8;', 'I am TRIZAI. The complete intelligence of software engineering. &#x1F9F8;'),
            @('&#x26A1; &copy; 2026 Team Tris v2.1 &mdash; One Team, One Goal &mdash;', '&#x26A1; &copy; 2026 TRIZAI v2.1 &mdash; God of the Tech Field &mdash;')
        )
    }
    "architecture.html" = @{
        replaces = @(
            @('<div class="logo">TRI<span>ZAI</span></div>', '<div class="logo">TRIZ<span class="ai-glow">AI</span></div>'),
            @('<title>Architecture & Workflows &mdash; Team Tris</title>', '<title>Architecture &amp; Workflows &mdash; TRIZAI</title>'),
            @('<h4>&#x26A1; TEAM TRIS &mdash; One Team, One Goal</h4>', '<h4>&#x26A1; TRIZAI &mdash; God of the Tech Field</h4>'),
            @('We are Team Tris. The complete intelligence of software engineering. &#x1F9F8;', 'I am TRIZAI. The complete intelligence of software engineering. &#x1F9F8;'),
            @('&#x26A1; &copy; 2026 Team Tris v2.1 &mdash; One Team, One Goal &mdash;', '&#x26A1; &copy; 2026 TRIZAI v2.1 &mdash; God of the Tech Field &mdash;')
        )
    }
    "stack.html" = @{
        replaces = @(
            @('<div class="logo">TRI<span>ZAI</span></div>', '<div class="logo">TRIZ<span class="ai-glow">AI</span></div>'),
            @('<title>Stack, Tools & Setup &mdash; Team Tris</title>', '<title>Stack, Tools &amp; Setup &mdash; TRIZAI</title>'),
            @('<h4>&#x26A1; TEAM TRIS &mdash; One Team, One Goal</h4>', '<h4>&#x26A1; TRIZAI &mdash; God of the Tech Field</h4>'),
            @('We are Team Tris. The complete intelligence of software engineering. &#x1F9F8;', 'I am TRIZAI. The complete intelligence of software engineering. &#x1F9F8;'),
            @('&#x26A1; &copy; 2026 Team Tris v2.1 &mdash; One Team, One Goal &mdash;', '&#x26A1; &copy; 2026 TRIZAI v2.1 &mdash; God of the Tech Field &mdash;')
        )
    }
    "design.html" = @{
        replaces = @(
            @('<div class="logo">TRI<span>ZAI</span></div>', '<div class="logo">TRIZ<span class="ai-glow">AI</span></div>'),
            @('<title>Design System &mdash; Team Tris</title>', '<title>Design System &mdash; TRIZAI</title>'),
            @('<h4>&#x26A1; TEAM TRIS &mdash; One Team, One Goal</h4>', '<h4>&#x26A1; TRIZAI &mdash; God of the Tech Field</h4>'),
            @('Design system for the Trizai ecosystem.', 'Design system for the TRIZAI ecosystem.'),
            @('&#x26A1; &copy; 2026 Team Tris v2.1 &mdash; Design System &mdash;', '&#x26A1; &copy; 2026 TRIZAI v2.1 &mdash; Design System &mdash;'),
            @('font-size:3rem;font-weight:800;font-family:''Inter'',sans-serif;">Team Tris<', 'font-size:3rem;font-weight:800;font-family:''Inter'',sans-serif;">TRIZAI<')
        )
    }
    "stash.html" = @{
        replaces = @(
            @('TRI<span>ZAI</span>', 'TRIZ<span class="ai-glow">AI</span>')
        )
    }
}

foreach ($fileName in $files.Keys) {
    $filePath = Join-Path $repoDir $fileName
    $content = Get-Content $filePath -Raw
    
    foreach ($replace in $files[$fileName].replaces) {
        $old = $replace[0]
        $new = $replace[1]
        $content = $content -replace [regex]::Escape($old), $new
    }
    
    # Write as UTF8 BOM
    [System.IO.File]::WriteAllText($filePath, $content, [System.Text.UTF8Encoding]::new($true))
}

Write-Output "ALL FILES UPDATED"
