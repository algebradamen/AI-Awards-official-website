shader_type canvas_item;

uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;

// Hovedkontrollen for hvor uskarpt det skal være.
// Høyere tall = mer "tåkete". Går opp til 6.0 som er maks for de fleste skjermer.
uniform float blur_amount : hint_range(0.0, 6.0) = 4.0;

// Justerer hvor bredt den jevner ut kantene.
// Hold denne lav (rundt 1.0-2.0) for best resultat.
uniform float blur_radius : hint_range(0.0, 4.0) = 1.5;

void fragment() {
	vec3 col = vec3(0.0);
	// Vi gjør radiusen litt større for at effekten skal synes godt
	vec2 pixel_scale = SCREEN_PIXEL_SIZE * blur_radius * 2.0;

	// Vi tar 16 prøver i en sirkel rundt sentrum.
	// Dette er nok til å fjerne "spøkelsesbildene" og gjøre det mykt.
	float total_samples = 16.0;
	float pi = 3.14159265359;

	for(float i = 0.0; i < total_samples; i++) {
		// Regn ut vinkelen for denne prøven
		float angle = (i / total_samples) * 2.0 * pi;

		// Finn posisjonen (offset) basert på vinkel og radius
		vec2 offset = vec2(cos(angle), sin(angle)) * pixel_scale;

		// Hent fargen med høy 'blur_amount' (LOD)
		col += textureLod(SCREEN_TEXTURE, SCREEN_UV + offset, blur_amount).rgb;
	}

	// Del på antall prøver for å få gjennomsnittet
	COLOR.rgb = col / total_samples;
}