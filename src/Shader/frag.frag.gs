const float PI = 3.14159265;

// Função Fresnel-Schlick
float fresnelSchlick(float cosTheta, float F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

// Função de distribuição de normais GGX
float distributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    float denominator = NdotH2 * (a2 - 1.0) + 1.0;
    return a2 / (PI * denominator * denominator);
}

// Função de atenuação geométrica Schlick-GGX
float geometrySchlickGGX(float NdotV, float roughness) {
    float k = (roughness * roughness + 1.0) / 8.0;
    return NdotV / (NdotV * (1.0 - k) + k);
}

