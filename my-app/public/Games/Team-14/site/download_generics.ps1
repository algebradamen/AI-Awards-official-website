
Write-Host "Laster ned generiske fallback-bilder..."

function Download($url, $name) {
    try { Invoke-WebRequest -Uri $url -OutFile "images\$name" -UserAgent "Mozilla/5.0" } catch {}
}

Download "https://upload.wikimedia.org/wikipedia/commons/f/f2/Coccinella_septempunctata.jpg" "bille_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/4/4c/Push_van_catheter_butterfly.jpg" "sommerfugl_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/c/c5/House_Fly_Musca_domestica_Macro.jpg" "flue_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/4/4d/Apis_mellifera_flying.jpg" "bie_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/a/aa/Small_passerine_bird.jpg" "fugl_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/0/06/Goldfish3.jpg" "fisk_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/d/d1/Libellula_depressa_male.jpg" "øyenstikker_generic.jpg"
Download "https://upload.wikimedia.org/wikipedia/commons/8/88/Acrida_ungarica_top.jpg" "gresshoppe_generic.jpg"
