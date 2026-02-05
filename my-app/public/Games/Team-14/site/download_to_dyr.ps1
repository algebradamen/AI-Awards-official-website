# Tving sikkerhet og tegnsett
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$OutputEncoding = [System.Text.Encoding]::UTF8

$ae = [char]230
$oe = [char]248
$aa = [char]229

$species_list = @(
    @{n="Nordlig sildem" + $aa + "ke"; s="Larus fuscus"},
    @{n=$oe + "rekyt"; s="Phoxinus phoxinus"},
    @{n="eikeblodsmeller"; s="Ampedus hjorti"},
    @{n="poppelkvistvikler"; s="Gypsonoma oppressana"},
    @{n="m" + $oe + "rk rosevikler"; s="Celypha rosaceana"},
    @{n="v" + $aa + "rsolvikler"; s="Pammene giganteana"},
    @{n="sandvoksmott"; s="Syndemis musculana"},
    @{n="dvergnebbmott"; s="Crambus perlella"},
    @{n="kjempesivmott"; s="Schoenobius gigantella"},
    @{n="vasspestdammott"; s="Parapoynx stratiotata"},
    @{n="gr" + $oe + "nn engmott"; s="Anania hortulata"},
    @{n="pudderengmott"; s="Udea lutealis"},
    @{n="bj" + $oe + "rkespinner"; s="Endromis versicolora"},
    @{n="gresspinner"; s="Euthrix potatoria"},
    @{n="taigaspinner"; s="Spatalia argentina"},
    @{n="hagtornsommerfugl"; s="Aporia crataegi"},
    @{n="klippebl" + $aa + "vinge"; s="Scolitantides orion"},
    @{n="niobeperlemorvinge"; s="Argynnis niobe"},
    @{n="seljel" + $oe + "vm" + $aa + "ler"; s="Epione repandaria"},
    @{n="r" + $oe + "dtopplundm" + $aa + "ler"; s="Perizoma affinitata"},
    @{n="blek dvergm" + $aa + "ler"; s="Eupithecia centaureata"},
    @{n="kystdvergm" + $aa + "ler"; s="Eupithecia irriguata"},
    @{n="strybarkm" + $aa + "ler"; s="Alcis jubata"},
    @{n="heiduskfly"; s="Polia bombycina"},
    @{n="smalringr" + $oe + "rfly"; s="Archanara dissoluta"},
    @{n="sivfly"; s="Arenostola phragmitidis"},
    @{n="hvitt strandengfly"; s="Mythimna pallens"},
    @{n="sumpgressfly"; s="Longalatedes elymi"},
    @{n="lemen"; s="Lemmus lemmus"},
    @{n="trollflaggermus"; s="Pipistrellus nathusii"},
    @{n="kvitskjeving"; s="Lagenorhynchus acutus"},
    @{n="gulflekkmetallibelle"; s="Somatochlora flavomaculata"},
    @{n="storbl" + $aa + "libelle"; s="Orthetrum cancellatum"},
    @{n=$oe + "resikade"; s="Ledra aurita"},
    @{n="strandsekkeedderkopp"; s="Clubiona reclusa"},
    @{n="hummer"; s="Homarus gammarus"},
    @{n="kystnebbmott"; s="Anania fuscalis"},
    @{n="poppelpraktbille"; s="Poecilonota variolosa"},
    @{n="rustgull" + $oe + "ye"; s="Chrysopa pallens"},
    @{n="brungull" + $oe + "ye"; s="Chrysopa perla"},
    @{n="b" + $oe + "rstevedsoppbille"; s="Mycetophagus atomarius"},
    @{n="myntepraktvikler"; s="Cochylis mussehliana"},
    @{n="skogr" + $aa + "tevedbille"; s="Peltis ferruginea"},
    @{n="pileordensb" + $aa + "nd"; s="Catocala nupta"},
    @{n="sandnebbmott"; s="Agriphila inquinatella"},
    @{n="suter"; s="Tinca tinca"},
    @{n="dvergsneglespinner"; s="Heterogenea asella"},
    @{n="sei"; s="Pollachius virens"},
    @{n="hjortetr" + $oe + "stfj" + $ae + "rm" + $oe + "ll"; s="Adaina microdactyla"},
    @{n="storsalamander"; s="Triturus cristatus"},
    @{n="eikegullbasse"; s="Protaetia marmorata"},
    @{n="makrell"; s="Scomber scombrus"},
    @{n="svarteburknem" + $oe + "ll"; s="Psychoides verhuella"},
    @{n="epleglassvinge"; s="Synanthedon myopaeformis"},
    @{n="flekksivmott"; s="Calamotropha paludella"},
    @{n=$oe + "stlig skogbrynflue"; s="Epistrophe nitidicollis"},
    @{n="vortebiter"; s="Decticus verrucivorus"},
    @{n="sandgresshoppe"; s="Sphingonotus caerulans"},
    @{n="viergullveps"; s="Chrysis ignita"},
    @{n="keisergullveps"; s="Chrysis iris"},
    @{n="humlemaurveps"; s="Mutilla europaea"},
    @{n="skyggemaur"; s="Lasius umbratus"},
    @{n="firflekkmaur"; s="Dolichoderus quadripunctatus"},
    @{n="h" + $aa + "ret jordmaur"; s="Lasius psammophilus"},
    @{n="dyneveiveps"; s="Anoplius caviventris"},
    @{n="skogkjeglebie"; s="Coelioxys elongata"},
    @{n="engvepsebie"; s="Nomada fabriciana"},
    @{n="fjellhumle"; s="Bombus alpinus"},
    @{n="sl" + $aa + "ttehumle"; s="Bombus subterraneus"},
    @{n="r" + $oe + "dknappsandbie"; s="Andrena hattorfiana"},
    @{n="gulljordbie"; s="Lasius fuliginosus"},
    @{n="kystjordbie"; s="Lasius meridionalis"},
    @{n="sl" + $aa + "petornsmalmott"; s="Eurhodope rosella"},
    @{n="brunkuleskrukketroll"; s="Armadillidium pulchellum"},
    @{n="skiferkuleskrukketroll"; s="Armadillidium pictum"},
    @{n="kystgullveps"; s="Chrysis longula"},
    @{n="hultrem" + $oe + "ll"; s="Niditinea fuscella"},
    @{n="einerlavspinner"; s="Eilema depuncta"},
    @{n="bredringr" + $oe + "rfly"; s="Nonagria typhae"},
    @{n="damfrosk"; s="Pelophylax lessonae"},
    @{n="dynegresshoppegraver"; s="Tachysphex helveticus"},
    @{n="snelleprydvikler"; s="Lobesia reliquana"},
    @{n="moseprydvikler"; s="Epinotia nanana"},
    @{n="stor ramsl" + $oe + "kflue"; s="Portevinia maculata"},
    @{n="vinterkallhops"; s="Cixius cunicularius"},
    @{n="barkhjelmedderkopp"; s="Doliomhala schultzi"},
    @{n="gr" + $oe + "nn barkm" + $aa + "ler"; s="Cleora cinctaria"},
    @{n="stripenebbmott"; s="Agriphila tristella"},
    @{n="laks"; s="Salmo salar"},
    @{n="takr" + $oe + "rglansm" + $oe + "ll"; s="Cosmopterix lienigiella"},
    @{n="nyseryllikrotvikler"; s="Dichrorampha petiverella"},
    @{n="regnlaue"; s="Alburnus alburnus"},
    @{n="firflekket hettebladbille"; s="Cryptocephalus quadripunctatus"},
    @{n="b" + $aa + "ndvedsoppbille"; s="Mycetophagus decempunctatus"},
    @{n="ospevedsoppbille"; s="Mycetophagus populi"},
    @{n="r" + $oe + "dknappraktbille"; s="Trachys scrobiculatus"},
    @{n="kobberpraktbille"; s="Coraebus elatus"},
    @{n="ospeblodsmeller"; s="Ampedus nigrinus"},
    @{n="trekantgullsnipeflue"; s="Chrysopilus cristatus"},
    @{n="sumpglansblomsterflue"; s="Orthonevra geniculata"},
    @{n="kilekulehaleflue"; s="Eumerus strigatus"},
    @{n="liten gullhale"; s="Eupeodes lundbecki"},
    @{n="kveite"; s="Hippoglossus hippoglossus"},
    @{n="trapesreirm" + $oe + "ll"; s="Hyprion trapeziella"},
    @{n="svart algesekkspinner"; s="Dahlica lazuri"},
    @{n="vassgropraktvikler"; s="Gynnidomorpha alisma"},
    @{n="bredb" + $aa + "ndpraktvikler"; s="Aethes hartmanniana"},
    @{n="bremstilkvikler"; s="Endothenia marginana"}
)

$destFolder = ".\dyr"
$userAgent = "RodlistetBot/1.1 (Kontakt: edu3650218@hjemme.no)"

foreach ($sp in $species_list) {
    $name = $sp.n
    $scientific = $sp.s
    $destFile = Join-Path $destFolder "$name.jpg"
    
    if (Test-Path -LiteralPath $destFile) {
        Write-Host "[HOPPER OVER] $name" -ForegroundColor Cyan
        continue
    }

    $found = $false
    # Forsøk 1: Norsk Wikipedia (Navn)
    # Forsøk 2: Engelsk Wikipedia (Vitenskapelig)
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
                Write-Host "[OK]      $name" -ForegroundColor Green
                $found = $true
                Start-Sleep -Seconds 5
            }
        } catch {
            if ($_.Exception.Message -match "429") {
                Write-Host "[BLOKKERT] Wikipedia ber oss vente. Pauser i 60 sekunder..." -ForegroundColor Red
                Start-Sleep -Seconds 60
            }
        }
    }

    if (-not $found) {
        Write-Host "[X]       $name (Ikke funnet)" -ForegroundColor Yellow
    }
}