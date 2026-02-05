# Tving sikkerhet og tegnsett
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$OutputEncoding = [System.Text.Encoding]::UTF8

$ae = [char]230
$oe = [char]248
$aa = [char]229

$species_list = @(
    @{n="Nordlig sildem" + $aa + "ke"; s="Larus fuscus fuscus"},
    @{n="eikeblodsmeller"; s="Ampedus hjorti"},
    @{n="strandsekkeedderkopp"; s="Clubiona genevensis"},
    @{n="poppelpraktbille"; s="Poecilonota variolosa"},
    @{n="rustgull" + $oe + "ye"; s="Nothochrysa capitata"},
    @{n="b" + $oe + "rstevedsoppbille"; s="Triphyllus bicolor"},
    @{n="skogr" + $aa + "tevedbille"; s="Hylis foveicollis"},
    @{n="keisergullveps"; s="Chrysis longula"},
    @{n="dyneveiveps"; s="Arachnospila wesmaeli"},
    @{n="kystgullveps"; s="Chrysis vanlithi"},
    @{n="dynegresshoppegraver"; s="Tachysphex jokischianus"},
    @{n="vinterkallhops"; s="Diaptomus castor"},
    @{n="barkhjelmedderkopp"; s="Dipoena torva"},
    @{n="b" + $aa + "ndvedsoppbille"; s="Cis quadridens"},
    @{n="ospevedsoppbille"; s="Xyletinus tremulicola"},
    @{n="r" + $oe + "dknappraktbille"; s="Trachys troglodytes"},
    @{n="ospeblodsmeller"; s="Ampedus nigrinus"},
    @{n="liten gullhale"; s="Euproctis similis"},
    @{n="saltstorbuksv" + $oe + "mmer"; s="Sigara stagnalis"},
    @{n="barksmeller"; s="Denticollis linearis"},
    @{n="liten askegallesuger"; s="Psyllopsis distans"},
    @{n="blank biegullveps"; s="Hedychrum nobile"},
    @{n="furumurerveps"; s="Symmorphus murarius"},
    @{n="skogveiveps"; s="Anoplius nigerrimus"},
    @{n="dyneskoggraver"; s="Pompilus cinereus"},
    @{n="heivepsebie"; s="Nomada lathburiana"},
    @{n="sotsandbie"; s="Andrena nigroenea"},
    @{n="furugnagbille"; s="Zilloa montana"},
    @{n="granr" + $aa + "tevedbille"; s="Peltis grossa"},
    @{n="fjellkrattblomsterflue"; s="Platycheirus hyperboreus"},
    @{n="flekket askegallesuger"; s="Psyllopsis fraxinicola"},
    @{n="hvitflekket plankeveps"; s="Xiphydria prolongata"},
    @{n="veggvedveps"; s="Symmorphus allobrogus"},
    @{n="fiolett kulegullveps"; s="Pseudomalus violaceus"},
    @{n="pollbuksv" + $oe + "mmer"; s="Sigara selecta"},
    @{n="glansmarih" + $oe + "ne"; s="Hyperaspis pseudopustulata"},
    @{n="bronsepraktbille"; s="Buprestis haemorrhoidalis"},
    @{n="lys messingblomsterflue"; s="Callicera aenea"},
    @{n="strandfotblomsterflue"; s="Platycheirus immarginatus"},
    @{n="seksflekket hageblomsterflue"; s="Eupeodes nitens"},
    @{n="m" + $oe + "rk rutevinge"; s="Melitaea diamina"},
    @{n="b" + $oe + "kebarktege"; s="Aneurus laevis"},
    @{n="heistyltetege"; s="Berytinus signoreti"},
    @{n="fl" + $oe + "yelsvever"; s="Agelenatea redii"},
    @{n="gulpudret rotvikler"; s="Dichrorampha flavidorsana"},
    @{n="gulkinnet skogbrynflue"; s="Epistrophe ochrostoma"},
    @{n="b" + $aa + "ndpraktvannymfe"; s="Calopteryx splendens"},
    @{n="fjellskogfotblomsterflue"; s="Platycheirus speighti"},
    @{n="gr" + $aa + " dvergdyneflue"; s="Tethina illota"},
    @{n="bakkeb" + $aa + "ndbie"; s="Halictus leucaheneus"},
    @{n="sumpbladskj" + $ae + "rerveps"; s="Megachile pyrenaea"},
    @{n="blodtoppraktvikler"; s="Aethes sanguinana"},
    @{n="kj" + $oe + "lfotblomsterflue"; s="Platycheirus kimminsi"},
    @{n="klokkesolbie"; s="Dufourea dentiventris"},
    @{n="sporegullveps"; s="Chrysis mediata"},
    @{n="skogbladskj" + $ae + "rerveps"; s="Megachile ligniseca"},
    @{n="linder" + $aa + "tevedbille"; s="Ostoma ferruginea"},
    @{n="humlesmeller"; s="Anthousus humilis"},
    @{n="r" + $aa + "teblodsmeller"; s="Ampedus praeustus"},
    @{n="lys humleflue"; s="Bombylius major"},
    @{n="b" + $oe + "rsterovflue"; s="Dysmachus picipes"},
    @{n="svartskjeggrovflue"; s="Tolmerus atricapillus"},
    @{n="vassild"; s="Argentina silus"},
    @{n="brosme"; s="Brosme brosme"},
    @{n="kvanntannm" + $oe + "ll"; s="Epermenia illigerella"},
    @{n="gr" + $aa + " dvergm" + $aa + "ler"; s="Eupithecia pimpinellata"},
    @{n="hornnettege"; s="Dictyonota fuliginosa"},
    @{n="s" + $oe + "lvullspinnedderkopp"; s="Uloborus walckenaerius"},
    @{n="nebbskate"; s="Leucoraja fullonica"},
    @{n="tiflekkvedsoppbille"; s="Mycetophagus decempunctatus"},
    @{n="frynsegj" + $oe + "dselbille"; s="Aphodius scybalarius"},
    @{n="krattkjeglebie"; s="Coelioxys inermis"}
)

$destFolder = ".\images"
$userAgent = "RodlistetBot/1.4 (Kontakt: edu3650218@hjemme.no)"

if (!(Test-Path $destFolder)) {
    New-Item -ItemType Directory -Path $destFolder
}

function Get-ImageFromGBIF($scientificName) {
    try {
        $match = Invoke-RestMethod -Uri "https://api.gbif.org/v1/species/match?name=$([uri]::EscapeDataString($scientificName))"
        if ($match.usageKey) {
            $occ = Invoke-RestMethod -Uri "https://api.gbif.org/v1/occurrence/search?taxonKey=$($match.usageKey)&mediaType=StillImage&limit=1"
            if ($occ.results.media.identifier) {
                return $occ.results.media[0].identifier
            }
        }
    } catch {}
    return $null
}

function Get-ImageFromWikipedia($term, $lang) {
    try {
        # Søk etter beste treff først
        $search = Invoke-RestMethod -Uri "https://$lang.wikipedia.org/w/api.php?action=query&list=search&srsearch=$([uri]::EscapeDataString($term))&format=json"
        if ($search.query.search.Count -gt 0) {
            $title = $search.query.search[0].title
            $summary = Invoke-RestMethod -Uri "https://$lang.wikipedia.org/api/rest_v1/page/summary/$([uri]::EscapeDataString($title))"
            if ($summary.originalimage) {
                return $summary.originalimage.source
            }
        }
    } catch {}
    return $null
}

foreach ($sp in $species_list) {
    $name = $sp.n
    $scientific = $sp.s
    $destFile = Join-Path $destFolder "$name.jpg"
    
    if (Test-Path -LiteralPath $destFile) {
        Write-Host "[FINNES] $name" -ForegroundColor Cyan
        continue
    }

    Write-Host "[S" + $oe + "KER]  $name ($scientific)..." -NoNewline
    $imageUrl = $null

    # Prioritert rekkefølge for søk
    $searchMethods = @(
        { Get-ImageFromWikipedia $name "no" },        # 1. Norsk Wikipedia (Navn)
        { Get-ImageFromWikipedia $scientific "en" },  # 2. Engelsk Wikipedia (Vitenskapelig)
        { Get-ImageFromGBIF $scientific }             # 3. GBIF (Vitenskapelig - Svært pålitelig)
    )

    foreach ($method in $searchMethods) {
        $imageUrl = & $method
        if ($imageUrl) { break }
    }

    if ($imageUrl) {
        try {
            Invoke-WebRequest -Uri $imageUrl -OutFile $destFile -UserAgent $userAgent -ErrorAction Stop
            Write-Host "`r[OK]     $name" -ForegroundColor Green
            Start-Sleep -Seconds 2
        } catch {
            Write-Host "`r[FEIL]   Kunne ikke laste ned bilde for $name" -ForegroundColor Red
        }
    } else {
        Write-Host "`r[X]      $name (Ikke funnet)" -ForegroundColor Yellow
    }
}
