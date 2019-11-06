// GTA 5 settings.xml parser by Jeroen Baert
// https://github.com/Forceflow/gta5settingsparser

var $xml;

// define value -> setting translation
var DX_VERSION_SETTINGS = {};
DX_VERSION_SETTINGS["0"] = "DirectX 10";
DX_VERSION_SETTINGS["1"] = "DirectX 10.1";
DX_VERSION_SETTINGS["2"] = "DirectX 11";

var valid_xml = true;

$( document ).ready(function() {
    watcharea();
});

function getValuefromXML(a){
	return $xml.find(a).attr("value");
}

function getTextfromXML(a){
	return $xml.find(a).text();
}

function yesorno(value){
	if(value == 0){return "yes";}else{return "no";}
}

function watcharea(){
	$('textarea#inifile').on('change',function(){
		parse();
	});
	$('textarea#inifile').keyup(function(){
		parse();
	});
}

function parseXML() {
	valid_xml = true;
	var inifile = $('textarea#inifile').val();
	if(inifile == ""){
		valid_xml = false;
		return;
	} try {
		var xmlDoc = $.parseXML( inifile );
	} catch(err) {
		valid_xml = false;
		return;
	}
	$xml = $( xmlDoc );
}

function writeLine(line){
	$("#parsed").val($("#parsed").val() + line + "  \n");
}

function writeSettings(){
	// Resolution
	var width = getValuefromXML("screenWidth");
	var height = getValuefromXML("screenHeight");
	var refreshrate = getValuefromXML("refreshRateNumerator");
	var vsync = yesorno(getValuefromXML("Vsync"));
	var windowed = yesorno(getValuefromXML("Windowed"));
	var triplebuffer = yesorno(getValuefromXML("tripleBuffered"));
	var pauseonfocusloss = yesorno(getValuefromXML("pauseOnFocusLoss"));
	var videocard = getTextfromXML("videoCardDescription");
	var api = getTextfromXML("API").split("_")[1];

	writeLine(videocard + ", " + api);
	writeLine(width + " x " + height + ", " + refreshrate + "hz, Windowed: " + windowed + ", Vsync: " + vsync + ", Triple: " +triplebuffer);

	// Video card and DirectX version
	var videocard = $xml.find("VideoCardDescription").text();
	var dx_version = $xml.find("DX_Version").attr("value");
	if(dx_version in DX_VERSION_SETTINGS){
		writeLine(videocard + " - "+ DX_VERSION_SETTINGS[dx_version]);
	}
	
	// Basics: screen width and height, refresh rate, windowed mode and vsync
	
	// var windowed = $xml.find("Windowed").attr("value");
	// if(windowed == 0){windowed = "Fullscreen";}else{windowed = "Windowed";}
	// var vsync = $xml.find("Vsync").attr("value");
	// if(vsync == 0){vsync = "No V-sync";}else{vsync = "V-sync on";}
	
	
	// // Anti-aliasing: FXAA, MSAA, TXAA
	// var FXAA = $xml.find("FXAA_Enabled").attr("value");
	// if(FXAA == "false" || FXAA == "0" ){FXAA = "FXAA off";}else{FXAA = "FXAA on";}
	// var MSAA = $xml.find("MSAA").attr("value");
	// if(MSAA != 0){ // you can only have TXAA when you have MSAA
	// 	MSAA = "MSAA " + MSAA + "x";
	// 	var TXAA = $xml.find("TXAA_Enabled").attr("value");
	// 	if(TXAA == "false" || TXAA == "0"){TXAA = "TXAA off";}else{TXAA = "TXAA on";}
	// 	writeLine(FXAA + ", " + MSAA + ", " + TXAA);
	// } else {
	// 	writeLine(FXAA + ", MSAA off");
	// }
	
	// // Population and distance scaling/variety
	// var population_density = $xml.find("CityDensity").attr("value");
	// population_density = (parseFloat(population_density) * 100).toFixed(0);
	// var population_variety = $xml.find("PedVarietyMultiplier").attr("value");
	// population_variety = (parseFloat(population_variety) * 100).toFixed(0);
	// var distance_scaling = $xml.find("LodScale").attr("value");
	// distance_scaling = (parseFloat(distance_scaling) * 100).toFixed(0);
	// writeLine("Population density: " + population_density + "%");
	// writeLine("Population variety: " + population_variety+ "%");
	// writeLine("Distance scaling: " + distance_scaling+ "%");
	
	// // Texture quality
	// var texture_quality = $xml.find("TextureQuality").attr("value");
	// if(texture_quality in TEXTURE_QUALITY_SETTINGS){
	// 	writeLine("Texture quality: " + TEXTURE_QUALITY_SETTINGS[texture_quality]);
	// } else {writeLine("UNKNOWN TEXTURE QUALITY");}
	
	// // Shader quality
	// var shader_quality = $xml.find("ShaderQuality").attr("value");
	// if(shader_quality in SHADER_QUALITY_SETTINGS){
	// 	writeLine("Shader quality: " + SHADER_QUALITY_SETTINGS[shader_quality]);
	// } else {writeLine("UNKNOWN SHADER QUALITY");}

	// // Shadow quality
	// var shadow_quality = $xml.find("ShadowQuality").attr("value");
	// if(shadow_quality in SHADOW_QUALITY_SETTINGS){
	// 	writeLine("Shadow quality: " + SHADOW_QUALITY_SETTINGS[shadow_quality]);
	// } else {writeLine("UNKNOWN SHADOW QUALITY");}

	// // Reflection quality
	// var reflection_quality = $xml.find("ReflectionQuality").attr("value");
	// if(reflection_quality in REFLECTION_QUALITY_SETTINGS){
	// 	writeLine("Reflection quality: " + REFLECTION_QUALITY_SETTINGS[reflection_quality]);
	// } else {writeLine("UNKNOWN REFLECTION QUALITY");}

	// // Reflection MSAA
	// var reflection_msaa = $xml.find("ReflectionMSAA").attr("value");
	// if(reflection_msaa == 0){
	// 	writeLine("Reflection MSAA: Off");
	// } else {
	// 	writeLine("Reflection MSAA: " + reflection_msaa + "x");
	// }

	// // Water quality
	// var water_quality = $xml.find("WaterQuality").attr("value");
	// if(water_quality in WATER_QUALITY_SETTINGS){
	// 	writeLine("Water quality: " + WATER_QUALITY_SETTINGS[water_quality]);
	// } else {writeLine("UNKNOWN WATER QUALITY");}

	// // Particle quality
	// var particle_quality = $xml.find("ParticleQuality").attr("value");
	// if(particle_quality in PARTICLE_QUALITY_SETTINGS){
	// 	writeLine("Particle quality: " + PARTICLE_QUALITY_SETTINGS[particle_quality]);
	// } else {writeLine("UNKNOWN PARTICLE QUALITY");}

	// // Grass quality
	// var grass_quality = $xml.find("GrassQuality").attr("value");
	// if(grass_quality in GRASS_QUALITY_SETTINGS){
	// 	writeLine("Grass quality: " + GRASS_QUALITY_SETTINGS[grass_quality]);
	// } else {writeLine("UNKNOWN GRASS QUALITY");}

	// // Soft shadows
	// var shadow_softshadows = $xml.find("Shadow_SoftShadows").attr("value");
	// if(shadow_softshadows in SHADOW_SHOFTSHADOWS_SETTINGS){
	// 	writeLine("Soft shadows: " + SHADOW_SHOFTSHADOWS_SETTINGS[shadow_softshadows]);
	// } else {writeLine("UNKNOWN SOFT SHADOW QUALITY");}
	
	// // Post FX
	// var postfx = $xml.find("PostFX").attr("value");
	// if(postfx in POSTFX_SETTINGS){
	// 	writeLine("Post FX: " + POSTFX_SETTINGS[postfx]);
	// } else {writeLine("UNKNOWN POST FX SETTING");}
	
	// // Motion Blur strength
	// var motion_blur_strength = $xml.find("MotionBlurStrength").attr("value");
	// motion_blur_strength = (parseFloat(motion_blur_strength) * 100).toFixed(0);
	// writeLine("Motion Blur: " + motion_blur_strength + "%");
	
	// // Depth Of Field
	// var dof = $xml.find("DoF").attr("value");
	// if(dof == "false" || dof == "0" ){writeLine("Depth of Field: Off");}else{writeLine("Depth of Field: On");}
	
	// // Anisotropic Filtering
	// var anisotropic_filtering = $xml.find("AnisotropicFiltering").attr("value");
	// if(anisotropic_filtering == 0){
	// 	writeLine("Anisotropic Filtering: Off");
	// } else {
	// 	writeLine("Anisotropic Filtering: " + anisotropic_filtering + "x");
	// }
	
	// // Ambient Occlusion
	// var ao = $xml.find("SSAO").attr("value");
	// if(ao in AO_SETTINGS){
	// 	writeLine("Ambient Occlusion: " + AO_SETTINGS[ao]);
	// } else {writeLine("UNKNOWN AMBIENT OCCLUSION SETTING");}
	
	// // Tessellation
	// var tessellation = $xml.find("Tessellation").attr("value");
	// if(tessellation in TESSELLATION_SETTINGS){
	// 	writeLine("Tessellation: " + TESSELLATION_SETTINGS[tessellation]);
	// } else {writeLine("UNKNOWN TESSELLATION SETTING");}

	// // Advanced graphics options
	// var longshadows = $xml.find("Shadow_LongShadows").attr("value");
	// if(longshadows == "true" || longshadows == 1){
	// 	writeLine("Long Shadows: On"); 
	// } else {
	// 	writeLine("Long Shadows: Off");
	// }
	
	// // High resolution shadows
	// var ultrashadows = $xml.find("UltraShadows_Enabled").attr("value");
	// if(ultrashadows =="true" || ultrashadows == 1){
	// 	writeLine("High Resolution Shadows: On"); 
	// } else {
	// 	writeLine("High Resolution Shadows: Off");
	// }

	// // High detail streaming while flying
	// var flying_streaming = $xml.find("HdStreamingInFlight").attr("value");
	// if(flying_streaming =="true" || flying_streaming == 1){
	// 	writeLine("HD Streaming while Flying: On"); 
	// } else {
	// 	writeLine("HD Streaming while Flying: Off");
	// }
	
	// // Extended Distance Scaling
	// var extended_distance_scaling = $xml.find("MaxLodScale").attr("value");
	// extended_distance_scaling = (parseFloat(extended_distance_scaling) * 100).toFixed(0);
	// writeLine("Extended Distance Scaling: " + extended_distance_scaling + "%");
	
	// // Extended shadow distance
	// var extended_shadow_distance = $xml.find("Shadow_Distance").attr("value");
	// extended_shadow_distance = (parseFloat(extended_shadow_distance - 1) * 100).toFixed(0);
	// writeLine("Extended Shadow Distance: " + extended_shadow_distance + "%");
	
}

function parse(){
	$("#parsed").val('');
	parseXML();
	if(!valid_xml){
		writeLine("No XML or invalid XML pasted. Make sure you paste the full contents of your settings.xml file in the area on the left!");
		return;
	}
	writeSettings();
	writeLine("Generated with Forceflow's RDR2 settings parser");
}
