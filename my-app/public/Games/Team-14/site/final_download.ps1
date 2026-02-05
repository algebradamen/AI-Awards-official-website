# Tving sikkerhet og tegnsett
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$OutputEncoding = [System.Text.Encoding]::UTF8

$ae = [char]230
$oe = [char]248
$aa = [char]229

$species_list = @(
    @{n="eikeblodsmeller"; s="Ampedus hjorti"},
    @{n="strandsekkeedderkopp"; s="Clubiona reclusa"},
    @{n="poppelpraktbille"; s="Poecilonota variolosa"},
    @{n="rustgull" + $oe + "ye"; s="Chrysopa pallens"},
    @{n="b" + $oe + "rstevedsoppbille"; s="Mycetophagus atomarius"},
    @{n="skogr" + $aa + "tevedbille"; s="Peltis ferruginea"},
    @{n="keisergullveps"; s="Chrysis iris"},
    @{n="dyneveiveps"; s="Anoplius caviventris"},
    @{n="kystgullveps"; s="Chrysis longula"},
    @{n="dynegresshoppegraver"; s="Tachysphex helveticus"},
    @{n="vinterkallhops"; s="Cixius cunicularius"},
    @{n="barkhjelmedderkopp"; s="Doliomhala schultzi"},
    @{n="b" + $aa + "ndvedsoppbille"; s="Mycetophagus decempunctatus"},
    @{n="ospevedsoppbille"; s="Mycetophagus populi"},
    @{n="r" + $oe + "dknappraktbille"; s="Trachys scrobiculatus"},
    @{n="ospeblodsmeller"; s="Ampedus nigrinus"},
    @{n="liten gullhale"; s="Eupeodes lundbecki"},
    @{n="r" + $oe + "dknappvikler"; s="Cochylis roseana"},
    @{n="skogsalatengvikler"; s="Eucosma conterminana"},
    @{n="lakrismjeltfr" + $oe + "vikler"; s="Grapholita pallifrontana"},
    @{n="bergknappsmalmott"; s="Euzophera fuliginosella"},
    @{n="tistelsmalmott"; s="Myelois circumvoluta"},
    @{n="purpurengm" + $aa + "ler"; s="Idaea muricata"},
    @{n="strandm" + $aa + "ler"; s="Aspitates gilvaria"},
    @{n="r" + $oe + "sslyngm" + $aa + "ler"; s="Chloroclysta miata"},
    @{n="bl" + $aa + "hodefly"; s="Diloba caeruleocephala"},
    @{n="okerfly"; s="Eremobia ochroleuca"},
    @{n="brunt v" + $aa + "rfly"; s="Orthosia gothicina"},
    @{n="toflekklibelle"; s="Epitheca bimaculata"},
    @{n="saltstorbuksv" + $oe + "mmer"; s="Sigara stagnalis"},
    @{n="flikengm" + $aa + "ler"; s="Ennomos erosaria"},
    @{n="heivargedderkopp"; s="Pardosa nigriceps"},
    @{n="barksmeller"; s="Danosoma fasciata"},
    @{n="liten askegallesuger"; s="Psyllopsis distinguenda"},
    @{n="svevebladbille"; s="Cryptocephalus hyoscyami"},
    @{n="eikemaurbladbille"; s="Clytra laeviuscula"},
    @{n="heibladm" + $aa + "ler"; s="Pachycnemia hippocastanaria"},
    @{n="prikkrutevinge"; s="Melitaea cinxia"},
    @{n="stokkmaurm" + $oe + "ll"; s="Myrmecozela ochraceella"},
    @{n="elegant midjeblomsterflue"; s="Sphegina elegans"},
    @{n="lodde"; s="Mallotus villosus"},
    @{n="lyr"; s="Pollachius pollachius"},
    @{n="øyep" + $aa + "l"; s="Trisopterus esmarkii"},
    @{n="lindekrattm" + $oe + "ll"; s="Incurvaria masculella"},
    @{n="blank biegullveps"; s="Chrysis nitidula"},
    @{n="furumurerveps"; s="Symmorphus fuscipes"},
    @{n="hjerteveiveps"; s="Anoplius concinnus"},
    @{n="skogveiveps"; s="Priocnemis schiodtei"},
    @{n="dyneskoggraver"; s="Mimesa bruxellensis"},
    @{n="heivepsebie"; s="Nomada lathburiana"},
    @{n="alpehumle"; s="Bombus alpinus"},
    @{n="sotsandbie"; s="Andrena nigroenea"},
    @{n="brun bredm" + $oe + "ll"; s="Oegoconia deauratella"},
    @{n="skogdvergmaur"; s="Leptothorax muscorum"},
    @{n="kvelstoffkreps"; s="Bythotrephes longimanus"},
    @{n="skittendamhops"; s="Daphnia pulex"},
    @{n="liten husmygg"; s="Culex pipiens"},
    @{n="askegallesuger"; s="Psyllopsis fraxini"},
    @{n="l" + $oe + "vvever"; s="Linyphia triangularis"},
    @{n="sl" + $aa + "ttegresshoppe"; s="Chorthippus albomarginatus"},
    @{n="svartfottreblomsterflue"; s="Blera fallax"},
    @{n="kreklingsmalmott"; s="Pyla fusca"},
    @{n="lundengfly"; s="Eremobia ochroleuca"},
    @{n="vintereiksmalmott"; s="Acrobasis sodalella"},
    @{n="stormsvale"; s="Hydrobates pelagicus"},
    @{n="furugnagbille"; s="Stephanopachys linearis"},
    @{n="granr" + $aa + "tevedbille"; s="Ostoma ferruginea"},
    @{n="fjellkrattblomsterflue"; s="Eupeodes nielseni"},
    @{n="havni" + $oe + "ye"; s="Petromyzon marinus"},
    @{n="gulpebollem" + $oe + "ll"; s="Niditinea fuscella"},
    @{n="malurtsmalmott"; s="Euzophera cinerosella"},
    @{n="trollb" + $ae + "rdvergm" + $aa + "ler"; s="Eupithecia immundata"},
    @{n="vinkelm" + $aa + "ler"; s="Euphyia biangulata"},
    @{n="fjellmetallibelle"; s="Somatochlora alpestris"},
    @{n="lyngtrespringer"; s="Xysticus cristatus"},
    @{n="flekket askegallesuger"; s="Psyllopsis fraxinicola"},
    @{n="elver" + $oe + "ver"; s="Laphria flava"},
    @{n="heikanttege"; s="Rhacognathus punctatus"},
    @{n="kystperikumfly"; s="Chloantha hyperici"},
    @{n="gulkrageglassvinge"; s="Sesamia nonagrioides"},
    @{n="hvitflekket snutev" + $aa + "penflue"; s="Nemotelus pantherinus"},
    @{n="eikemuslingm" + $oe + "ll"; s="Incurvaria koerneriella"},
    @{n="sumpflatvikler"; s="Acleris lorquiniana"},
    @{n="myrkleggpraktvikler"; s="Falseuncaria degreyana"},
    @{n="koppergullveps"; s="Chrysis cuprea"},
    @{n="hvitflekket plankeveps"; s="Xiphydria camelus"},
    @{n="veggvedveps"; s="Symmorphus murarius"},
    @{n="markveiveps"; s="Anoplius viaticus"},
    @{n="kystfluegraver"; s="Mellinus arvensis"},
    @{n="lundgj" + $oe + "khumle"; s="Bombus sylvestris"},
    @{n="lyngblodbie"; s="Sphecodes hyalinatus"},
    @{n="kystskrukketroll"; s="Ligia oceanica"},
    @{n="gulflekket plankeveps"; s="Xiphydria prolongata"},
    @{n="kystsaksedyr"; s="Forficula lesnei"},
    @{n="fiolett kulegullveps"; s="Omalus violaceus"},
    @{n="solsandbie"; s="Andrena fulva"},
    @{n="pollbuksv" + $oe + "mmer"; s="Sigara selecta"},
    @{n="s" + $oe + "lvflekket sorgflue"; s="Anthrax anthrax"},
    @{n="vannliljetorvlibelle"; s="Leucorrhinia caudalis"},
    @{n="enghettebladbille"; s="Cryptocephalus punctiger"},
    @{n="eikegnagbille"; s="Stephanopachys substriatus"}
)

$destFolder = ".\images"
$userAgent = "RodlistetBot/1.2 (Kontakt: edu3650218@hjemme.no)"

foreach ($sp in $species_list) {
    $name = $sp.n
    $scientific = $sp.s
    $destFile = Join-Path $destFolder "$name.jpg"
    
    if (Test-Path -LiteralPath $destFile) {
        Write-Host "[FINNES] $name" -ForegroundColor Cyan
        continue
    }

    $found = $false
    # Forsøk 1: Norsk Wikipedia
    # Forsøk 2: Engelsk Wikipedia
    $urls = @(
        "https://no.wikipedia.org/api/rest_v1/page/summary/$([uri]::EscapeDataString($name))",
        "https://en.wikipedia.org/api/rest_v1/page/summary/$($scientific.Replace(' ', '_'))"
    )

    foreach ($url in $urls) {
        if ($found) { break }
        try {
            $res = Invoke-RestMethod -Uri $url -UserAgent $userAgent -ErrorAction Stop
            if ($res.originalimage) {
                Invoke-WebRequest -Uri $res.originalimage.source -OutFile $destFile -UserAgent $userAgent -ErrorAction Stop
                Write-Host "[OK]     $name" -ForegroundColor Green
                $found = $true
                Start-Sleep -Seconds 5 # Polite delay
            }
        } catch {
            if ($_.Exception.Message -match "429") {
                Write-Host "[BLOCK]  Wikipedia ber oss vente. Pauser i 60 sekunder..." -ForegroundColor Red
                Start-Sleep -Seconds 60
            }
        }
    }

    if (-not $found) {
        Write-Host "[X]      $name (Ikke funnet)" -ForegroundColor Yellow
    }
}